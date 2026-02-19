import { NextRequest, NextResponse } from "next/server";
import { getContent, saveContent, type Content } from "@/lib/content";

export async function GET() {
  try {
    const content = await getContent();
    return NextResponse.json(content);
  } catch (error) {
    console.error("Failed to load content:", error);
    return NextResponse.json({ error: "Failed to load content" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const password = request.headers.get("x-admin-password");
    const expected = process.env.ADMIN_PASSWORD || "vinulab-admin";
    if (password !== expected) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = (await request.json()) as Content;
    await saveContent(body);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to save content:", error);
    return NextResponse.json({ error: "Failed to save content" }, { status: 500 });
  }
}
