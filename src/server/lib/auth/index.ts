import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { authConfig } from "./config";
import { comparePassword } from "./crypto";

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },
      authorize: async (credentials) => {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string() })
          .safeParse(credentials);
        if (!parsedCredentials.success) return null;

        const { email, password } = parsedCredentials.data;

        // FAKE, ideally we will pull the user from DB
        const user = { email: "valid@mail.com", password: "1234" };

        const isPasswordMatched = await comparePassword(
          password,
          user.password,
        );
        if (!isPasswordMatched) return null;

        return user;
      },
    }),
  ],
});
