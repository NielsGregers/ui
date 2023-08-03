import type { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import AzureADProvider from "next-auth/providers/azure-ad";

/**
 * Takes a token, and returns a new token with updated
 * `accessToken` and `accessTokenExpires`. If an error occurs,
 * returns the old token and an error property
 */
async function refreshAccessToken(token : JWT) {
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
export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.SECRET,
  callbacks: {
    jwt: async ({ token, account,user }) => {
      
      //console.log("jwt callback", account)
      if (account) {
        console.log("auth","account callback",)
        token.accessToken = account?.access_token
        token.accessTokenExpires = (account.expires_at as number)* 1000 ;
        if (account.id_token) {
          const [header, payload, sig] = account.id_token.split('.')
          const idToken = JSON.parse(Buffer.from(payload, 'base64').toString('utf8'))
          token.roles = [...idToken.roles]
         // token.accessTokenExpires = Date.now() + account.expires_in * 1000,
        }


        return token
      }
      if (Date.now() < (token.accessTokenExpires as number)) {
        console.log("auth","return existing token",)
        return token;
      }

      return refreshAccessToken(token);
    },
    session: async ({ session, token }: { session: any, token: any }) => {
     // console.log("session callback", session, token.accessTokenExpires)
      session.roles = [...token.roles]
      session.accessToken = token.accessToken

      return session
    }
  },
  providers: [


    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID as string,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET as string,
      tenantId: process.env.AZURE_AD_TENANT_ID as string,
      authorization: {
        params: {
          scope: "openid offline_access Directory.Read.All People.Read User.Read",
        },
      }
    }),


  ],
};
