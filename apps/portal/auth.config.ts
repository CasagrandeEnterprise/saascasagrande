import type { NextAuthConfig } from "next-auth";

import {
  portalHubUrl,
  portalLoginUrl,
  sharedAuthBase,
} from "@casagrande/auth";

export const authConfig = {
  ...sharedAuthBase,
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const path = nextUrl.pathname;
      const isLogin = path === "/login";
      const isHub = path === "/hub" || path.startsWith("/hub/");
      const origin = nextUrl.origin;

      if (isLogin) {
        if (isLoggedIn) {
          return Response.redirect(new URL(portalHubUrl(origin)));
        }
        return true;
      }

      if (isHub) {
        if (!isLoggedIn) {
          return Response.redirect(new URL(portalLoginUrl(origin)));
        }
        return true;
      }

      return true;
    },
  },
} satisfies NextAuthConfig;
