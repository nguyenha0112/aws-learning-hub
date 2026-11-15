import { readFile } from "node:fs/promises";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const filePath = "C:\\Users\\Admin\\Downloads\\toeic_part5_study4_101_130.json";
  try {
    const contents = await readFile(filePath, "utf8");
    return new NextResponse(contents, { headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json({ error: "TOEIC source file is not available on this machine." }, { status: 404 });
  }
}
