import { NextRequest, NextResponse } from "next/server";
import { getContent, saveContent, type Content } from "@/lib/content";

export async function GET() {
  try {
    const content = await getContent();
    const res = NextResponse.json(content);
    // Dynamic content from DB: short cache so admin changes appear soon
    res.headers.set("Cache-Control", "private, max-age=60, stale-while-revalidate=120");
    return res;
  } catch (error) {
    console.error("Failed to load content:", error);
    return NextResponse.json({ error: "Failed to load content" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const password = request.headers.get("x-admin-password")?.trim();
    const expected = process.env.ADMIN_PASSWORD || "vinulab-admin";
    if (!password || password !== expected) {
      return NextResponse.json(
        { error: "Invalid admin password. Default is vinulab-admin (or set ADMIN_PASSWORD in .env.local)." },
        { status: 401 }
      );
    }

    const body = (await request.json()) as Content;
    await saveContent(body);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to save content:", error);
    return NextResponse.json({ error: "Failed to save content" }, { status: 500 });
  }
}
