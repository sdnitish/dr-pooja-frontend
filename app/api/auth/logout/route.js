export async function POST() {
  const cookie = `token=; Path=/; HttpOnly; Max-Age=0; SameSite=Lax;`;
  return new Response(JSON.stringify({ message: "Logged out" }), {
    status: 200,
    headers: { "Set-Cookie": cookie, "Content-Type": "application/json" },
  });
}
