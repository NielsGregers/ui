import type { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import AzureADProvider from "next-auth/providers/azure-ad";
import { MongoDBAdapter } from "./mongodb/nextauth-mongoadapter"
import { MongoClient } from "mongodb";
import { AdapterUser } from "next-auth/adapters";
import { https } from "./httphelper";

/**
 * Takes a token, and returns a new token with updated
 * `accessToken` and `accessTokenExpires`. If an error occurs,
 * returns the old token and an error property
 */
async function refreshAccessToken(token: JWT) {
  try {

    const url = `https://login.microsoftonline.com/${process.env.AZURE_AD_TENANT_ID}/oauth2/v2.0/token`

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `grant_type=refresh_token`
        + `&client_secret=${process.env.AZURE_AD_CLIENT_SECRET as string}`
        + `&refresh_token=${token.refreshToken}`
        + `&client_id=${process.env.AZURE_AD_CLIENT_ID as string}`
    })


    const refreshedTokens = await response.json()

    if (!response.ok) {
      throw refreshedTokens
    }

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
    }
  } catch (error) {
    console.log(error)

    return {
      ...token,
      error: "RefreshAccessTokenError",
    }
  }
}
const options = {};

let client;
let clientPromise: Promise<MongoClient>;
const uri = (process.env.MONGODB as string)
client = new MongoClient(uri, options);
clientPromise = client.connect();

const USERINFOURL = "https://graph.microsoft.com/v1.0/me?$select=id,userPrincipalName,accountEnabled,userType,givenName,surname"

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "database",
  },
  secret: process.env.SECRET,
  debug: true,
  callbacks: {
 
    signIn: async (params) => {

      // if (params.account?.access_token) {
      //   const [header, payload, sig] = params.account?.access_token.split('.')
      //   if (payload) {
      //     const auth: any = JSON.parse(Buffer.from(payload, 'base64').toString('utf8'))
      //     if (auth.name && auth.upn) {
      //       MongoDBAdapter(clientPromise, { databaseName: "nextauth" }).updateUser({ id: params.user.id, name: auth.name, email: auth.upn })
      //     }
      //   }
      // }
      console.log("auth", "signin callback", params)
      return true
    },
    jwt: async ({ token, account, user }) => {

      //console.log("jwt callback", account)
      if (account) {
        console.log("auth", "account callback",)
        token.accessToken = account?.access_token
        token.accessTokenExpires = (account.expires_at as number) * 1000;
        if (account.id_token) {
          // token.accessTokenExpires = Date.now() + account.expires_in * 1000
        }


        return token
      }

      if (Date.now() < (token.accessTokenExpires as number)) {
        console.log("auth", "return existing token",)
        return token;
      }

      return refreshAccessToken(token);
    },
    session: async ({ session, token, user }: { session: any, token: any, user: AdapterUser }) => {
      
      // console.log("session callback", session, token.accessTokenExpires)
      if (user) {
      //  MongoDBAdapter(clientPromise, { databaseName: "nextauth" })
        session.roles = (user as any).roles
        session.accessToken = (user as any).accessToken
      }

      return session
    }
  },

  providers: [


    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID as string,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET as string,
      tenantId: process.env.AZURE_AD_TENANT_ID as string,

      userinfo: {
        url: USERINFOURL,

        async request(context) {
          
          const response = await https(context?.tokens?.access_token as string, "GET", USERINFOURL)


          const newProfile: any = response.data

          return {
            profileId: newProfile.id,
            id: newProfile.id,
            email: newProfile.userPrincipalName,
            firstName: newProfile.givenName,
            lastName: newProfile.surname,
            userType: newProfile.userType,
            accountStatus: newProfile.accountEnabled
          };
        }

      },
     
      async profile(userinfo, tokens) {
        
            const response = await fetch(
          `https://graph.microsoft.com/v1.0/me/photos/${48}x${48}/$value`,
          { headers: { Authorization: `Bearer ${tokens.access_token}` } }
        )

        // Confirm that profile photo was returned
        let image
        // TODO: Do this without Buffer
        if (response.ok && typeof Buffer !== "undefined") {
          try {
            const pictureBuffer = await response.arrayBuffer()
            const pictureBase64 = Buffer.from(pictureBuffer).toString("base64")
            image = `data:image/jpeg;base64, ${pictureBase64}`
          } catch { }
        }


        var roles: [] = []
        if (tokens?.id_token) {
          const [header, payload, sig] = tokens.id_token.split('.')
          const idToken = JSON.parse(Buffer.from(payload, 'base64').toString('utf8'))
          roles = idToken.roles
        }
        return {
          id: userinfo.id,
          name: userinfo.firstName + " " + userinfo.lastName,
          email: userinfo.email,
          image: image ?? null,
          accessToken : tokens?.access_token,
          accessTokenExpires : (tokens?.expires_at as number) * 1000,
          roles: roles,
        };
      },
      authorization: {
        params: {
          scope: "openid offline_access Directory.Read.All People.Read User.Read",
        },
      }
    }),


  ],
  adapter: MongoDBAdapter(clientPromise, { databaseName: "nextauth" })
};
