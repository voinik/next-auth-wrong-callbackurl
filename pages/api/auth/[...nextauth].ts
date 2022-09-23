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
