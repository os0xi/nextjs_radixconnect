export async function POST(req: Request, _res: Response) {
  const { input } = await req.json();
  const responseBody = JSON.stringify(true);
  const headers = {
    "Content-Type": "application/json",
  };
  return new Response(responseBody, { headers });
}
