import type { NextAuthConfig } from "next-auth";
import { z } from "zod";

declare module "next-auth" {
  interface Session {
    user?: {
      name: string;
      email: string;
    };
  }
}

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized: ({ auth, request: { nextUrl } }) => {
      const isLoggedIn = !!auth?.user;
      const isOnProtectedRoute = nextUrl.pathname.startsWith("/");
      if (isOnProtectedRoute) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      }
      if (isLoggedIn) {
        return Response.redirect(new URL("/", nextUrl));
      }
      return true;
    },
    session: ({ session }) => {
      return {
        ...session,
        user: z
          .object({
            name: z.string(),
            email: z.string().email(),
          })
          .optional()
          .parse(session.user),
      };
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
