import type { NextAuthOptions } from "next-auth";
import AzureADProvider from "next-auth/providers/azure-ad";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.SECRET,
  callbacks: {
    jwt: async ({ token, account }) => {
      if (account?.id_token) {
        debugger
        const [header, payload, sig] = account.id_token.split('.')
        const idToken = JSON.parse(Buffer.from(payload, 'base64').toString('utf8'))

        token.roles = [...idToken.roles]
      }

      return token
    },
    session: async ({ session, token }: { session: any, token: any }) => {
      session.roles = [...token.roles]

      return session
    }
  },
  providers: [


    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID as string,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET as string,
      tenantId: process.env.AZURE_AD_TENANT_ID as string,
    }),


  ],
};
