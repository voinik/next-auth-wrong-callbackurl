import NextAuth, { NextAuthOptions } from "next-auth";
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
  ],
  pages: {
    signIn: "/login",
  },
  theme: {
    colorScheme: "light",
  },
  callbacks: {
    async jwt({ token }) {
      token.userRole = "admin";
      return token;
    },
    // Uncmomenting the code below is how I managed to circumvent the issue for my own project

    // async redirect({ baseUrl, url }) {
    //   const redirectUrl = decodeURIComponent(url);
    //   const callbackIndex = redirectUrl.indexOf("callbackUrl=");
    //   if (callbackIndex > -1) {
    //     const callbackPath = redirectUrl.slice(callbackIndex + 12);
    //     // If I try to login from my homepage, the nested callbackUrl contains the full baseUrl.
    //     // This behavior seems to be triggerd if you call `signIn()` from a page.
    //     return callbackPath.includes(baseUrl)
    //       ? callbackPath
    //       : baseUrl + callbackPath;
    //   }
    //   return url;
    // },
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
