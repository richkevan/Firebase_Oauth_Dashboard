export const prerender = false

export async function GET({request, cookies, redirect}) {
  cookies.delete("__session", {path: "/"})
  return redirect("/login");
}