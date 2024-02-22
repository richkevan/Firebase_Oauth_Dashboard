export const prerender = false
import { auth } from "../../../firebase/server";

export async function GET({request, cookies, redirect}) {
  const idToken = request.headers.get("Authorization")?.split("Bearer ")[1];
  const crsfToken = cookies.get("crsfToken");

  if (!idToken) {
    return new Response("Unauthorized", {status: 401});
  }

  try {
    const user = await auth.verifyIdToken(idToken);
  } catch (error) {
    return new Response("Unauthorized", {status: 401});
  }

  const expiresIn = 60 * 60 * 24 * 1 * 1000;
  const sessionCookie = await auth.createSessionCookie(idToken, {expiresIn});

  cookies.set("__session", sessionCookie, {httpOnly: true, secure: false, path: "/", expiresIn});

  return redirect("/");
}