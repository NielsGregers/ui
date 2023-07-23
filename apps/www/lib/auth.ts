import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github"
import AzureADProvider from "next-auth/providers/azure-ad";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.SECRET,
  providers: [
    // EmailProvider({
    //   server: process.env.EMAIL_SERVER,
    //   from: process.env.EMAIL_FROM,
    // }),
    // AppleProvider({
    //   clientId: process.env.APPLE_ID,
    //   clientSecret: {
    //     appleId: process.env.APPLE_ID,
    //     teamId: process.env.APPLE_TEAM_ID,
    //     privateKey: process.env.APPLE_PRIVATE_KEY,
    //     keyId: process.env.APPLE_KEY_ID,
    //   },
    // }),
    
      GithubProvider({
              // @ts-ignore
        // eslint-disable-next-line turbo/no-undeclared-env-vars
        clientId: process.env.GITHUB_ID,
            // @ts-ignore
        // eslint-disable-next-line turbo/no-undeclared-env-vars
        clientSecret: process.env.GITHUB_SECRET,
        // https://docs.github.com/en/developers/apps/building-oauth-apps/scopes-for-oauth-apps
        // @ts-ignore
        scope: "read:user",
      }),
      AzureADProvider({
        clientId: process.env.AZURE_AD_CLIENT_ID as string,
        clientSecret: process.env.AZURE_AD_CLIENT_SECRET as string,
        tenantId: process.env.AZURE_AD_TENANT_ID as string,
      }),
    
    
  ],
};
