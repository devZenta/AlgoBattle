import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Discord from "next-auth/providers/discord";
import type { NextAuthConfig } from "next-auth";


export default {
    providers: [
        GitHub({
          clientId: process.env.GITHUB_ID,
          clientSecret: process.env.GITHUB_SECRET,
        }),
        Google({
          clientId: process.env.GOOGLE_ID,
          clientSecret: process.env.GOOGLE_SECRET,
        }),
        Discord({
          clientId: process.env.DISCORD_ID,
          clientSecret: process.env.DISCORD_SECRET,
        }),
      ],
} satisfies NextAuthConfig;