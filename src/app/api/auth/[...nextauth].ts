import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb-client";
import { User } from "@/models/user";
import dbConnect from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export default NextAuth({
  adapter: MongoDBAdapter(clientPromise),

  // -----------------------------------------------------------

  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await dbConnect();
        const user = await User.findOne({ email: credentials?.email });
        if (!user) {
          throw new Error("No user found with that email");
        }

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isValid) {
          throw new Error("incorrect Password");
        }

        return {
          id: user._id.tostring(),
          email: user.email,
          name: user.name,
          image: user.image,
        };
      },
    }),
  ],

  // ---------------------------------------------------

  session: {
    strategy: "jwt",
  },

  // -----------------------------------------------

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },

  // -----------------------------------------------------

  pages: {
    signIn: "/register",
  },
});
