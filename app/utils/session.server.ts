import { createCookieSessionStorage } from "@remix-run/node";

if (!process.env.SESSION_SECRET) {
    throw new Error('session secret is required');
}

const sessionStorage = createCookieSessionStorage ({
    cookie : {
        name: "_session",
        sameSite: "lax",
        path: "/",
        httpOnly: true,
        secrets: [process.env.SESSION_SECRET],
        secure: process.env.NODE_ENV === "production"
    }
})
export { sessionStorage };
export let { getSession, commitSession, destroySession } = sessionStorage;
