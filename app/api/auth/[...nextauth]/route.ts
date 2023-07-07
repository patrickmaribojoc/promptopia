import NextAuth from "next-auth/next";
import { Profile, Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "@utils/database";
import { CredentialInput } from "next-auth/providers";
import { AdapterUser } from "next-auth/adapters";
import User from "@models/user";

interface GoogleProfile extends Profile {
  picture?: string
}

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }: { session: Session }) {
      const sessionUser = await User.findOne({
        email: session.user?.email,
      });
      session.user = {};
      session.user.id = sessionUser._id.toString();
      session.user.email = sessionUser.email;
      session.user.username = sessionUser.username;
      session.user.image = sessionUser.image;
      return session;
    },
    async signIn({
      profile,
    }: {
      profile?: GoogleProfile;
    }) {
      try {
        await connectToDB();

        // check if user already exists
        const userExists = await User.findOne({
          email: profile?.email,
        });
        // else, create user
        if (!userExists) {
          await User.create({
            email: profile?.email,
            username: profile?.name?.replace(" ", "").toLowerCase(),
            image: profile?.picture,
          });
        }

        return true;
      } catch (error) {
        console.log("error", error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
