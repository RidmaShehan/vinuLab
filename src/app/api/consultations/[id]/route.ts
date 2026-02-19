import { NextRequest, NextResponse } from "next/server";
import { updateConsultationGotIt } from "@/lib/consultations";
import { isAdminRequest } from "@/lib/auth";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const { id } = await params;
    const body = await request.json().catch(() => ({}));
    const { gotIt } = body;
    if (typeof gotIt !== "boolean") {
      return NextResponse.json({ error: "gotIt must be boolean" }, { status: 400 });
    }
    const updated = await updateConsultationGotIt(id, gotIt);
    if (!updated) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json(updated);
  } catch (err) {
    console.error("Consultation update error:", err);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}
