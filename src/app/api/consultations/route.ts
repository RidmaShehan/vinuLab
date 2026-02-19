import { NextRequest, NextResponse } from "next/server";
import { addConsultation, getConsultations } from "@/lib/consultations";
import { isAdminRequest } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const { name = "", email = "", message = "" } = body;
    const record = await addConsultation({
      name: String(name).slice(0, 200),
      email: String(email).slice(0, 256),
      message: String(message).slice(0, 2000),
    });
    return NextResponse.json({ ok: true, id: record.id });
  } catch (err) {
    console.error("Consultation submit error:", err);
    return NextResponse.json({ error: "Submit failed" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const list = await getConsultations();
    return NextResponse.json(list);
  } catch (err) {
    console.error("Consultations fetch error:", err);
    return NextResponse.json({ error: "Fetch failed" }, { status: 500 });
  }
}
