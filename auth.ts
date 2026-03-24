import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { z } from "zod";

import { connectToDatabase } from "@/lib/db";
import User from "@/models/User";

type AuthorizedUser = {
  _id: { toString(): string };
  email: string;
  username: string;
  password: string;
};

const credentialsSchema = z.object({
  emailOrUsername: z.string().trim().min(1, "Email or username is required"),
  password: z.string().min(1, "Password is required")
});

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  secret: process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET,
  trustHost: true,
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: "/sign-in"
  },
  providers: [
    Credentials({
      credentials: {
        emailOrUsername: {},
        password: {}
      },
      authorize: async (credentials) => {
        const parsedCredentials = credentialsSchema.safeParse(credentials);

        if (!parsedCredentials.success) {
          return null;
        }

        await connectToDatabase();

        const { emailOrUsername, password } = parsedCredentials.data;
        const normalizedIdentifier = emailOrUsername.trim();
        const normalizedEmail = normalizedIdentifier.toLowerCase();
        const identifierPattern = new RegExp(`^${escapeRegExp(normalizedIdentifier)}$`, "i");

        const user = (await User.findOne({
          $or: [
            { email: normalizedEmail },
            { username: identifierPattern }
          ]
        }).lean()) as AuthorizedUser | null;

        if (!user) {
          return null;
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return null;
        }

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.username,
          username: user.username
        };
      }
    })
  ],
  callbacks: {
    authorized: async ({ auth: session, request }) => {
      const isDashboardRoute = request.nextUrl.pathname.startsWith("/dashboard");

      if (!isDashboardRoute) {
        return true;
      }

      return !!session?.user;
    },
    jwt: async ({ token, user }) => {
      if (user) {
        token.userId = user.id;
        token.username = user.username ?? user.name ?? "";
      }

      return token;
    },
    session: async ({ session, token }) => {
      if (session.user) {
        session.user.id = String(token.userId ?? "");
        session.user.username = String(token.username ?? "");
      }

      return session;
    }
  }
});
