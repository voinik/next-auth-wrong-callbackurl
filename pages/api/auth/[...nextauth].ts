import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import GithubProvider from "next-auth/providers/github";
import TwitterProvider from "next-auth/providers/twitter";
import Auth0Provider from "next-auth/providers/auth0";
import EmailProvider, {
  SendVerificationRequestParams,
} from "next-auth/providers/email";
export const authOptions: NextAuthOptions = {
  adapter: {
    getUserByEmail: async (email: string) => ({
      emailVerified: true,
      id: "123",
      email: "foo@bar.com",
    }),
  } as any,
  providers: [
    EmailProvider({
      server: {
        host: "host",
        port: "port",
        auth: {
          user: "user",
          pass: "pass",
        },
      },
      from: "foo@bar.com",
      sendVerificationRequest: dummySendEmailVerificationRequest,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_ID,
      clientSecret: process.env.TWITTER_SECRET,
    }),
    Auth0Provider({
      clientId: process.env.AUTH0_ID,
      clientSecret: process.env.AUTH0_SECRET,
      issuer: process.env.AUTH0_ISSUER,
    }),
  ],
  theme: {
    colorScheme: "light",
  },
  callbacks: {
    async jwt({ token }) {
      token.userRole = "admin";
      return token;
    },
  },
};

async function dummySendEmailVerificationRequest({
  url,
  identifier,
}: SendVerificationRequestParams) {
  console.log("identifier: ", identifier);
  console.log("url: ", url);
}

export default NextAuth(authOptions);
