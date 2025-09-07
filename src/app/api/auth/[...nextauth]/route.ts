import dbConnect from "@/lib/mongodb";
import { User } from "@/models/user";
import { compare } from "bcryptjs";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    Credentials({
      id: "credentials",
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        await dbConnect();
        if (!credentials?.password || !credentials?.email) {
          throw new Error("Email and Password requred");
        }
        const user = await User.findOne({ email: credentials.email });
        if (!user) {
          throw new Error("Email doesn't exist");
        }
        const isCorrectPassword = await compare(
          credentials.password,
          user.password
        );
        if (!isCorrectPassword) {
          throw new Error("Incorrect Passord");
        }
        return user;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
});
