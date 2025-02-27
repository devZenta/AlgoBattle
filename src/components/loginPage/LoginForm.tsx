'use client';

import { signIn } from "next-auth/react";

export function LoginForm () {
    return (
        <div>
            <button onClick={() => signIn("github", { redirectTo: "/"})}>Sign in with GitHub</button>
            <button onClick={() => signIn("google", { redirectTo: "/"})}>Sign in with Google</button>
            <button onClick={() => signIn("discord", { redirectTo: "/"})}>Sign in with Discord</button>
        </div>
    )
}