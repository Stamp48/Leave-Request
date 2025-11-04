export async function GET() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_ORIGIN}/api/employees`, {
    cache: "no-store",
  });
  return new Response(await res.text(), { status: res.status, headers: { "Content-Type":"application/json" }});
}