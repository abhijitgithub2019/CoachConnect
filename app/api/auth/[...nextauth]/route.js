import Credentials from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import NextAuth from "next-auth/next";

const pris = new PrismaClient();

export const authOptions = {
  providers: [
    Credentials({
      name: "credentails",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(Credentials) {
        const user = await pris.user.findUnique({
          where: { email: Credentials.email },
        });
        if (!user) throw new Error("No user found with this email");
        const isValid = await bcrypt.compare(
          Credentials.password,
          user.password
        );
        if (!isValid) throw new Error("Incorrect password");
        return { id: user.id, name: user.name, email: user.email };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
