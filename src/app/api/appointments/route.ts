import { NextResponse } from "next/server";
import { bookFormServerSchema } from "@/lib/validations";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { error: "Appointment storage is not configured." },
      { status: 503 },
    );
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = bookFormServerSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Validation failed.",
        fieldErrors: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  const data = parsed.data;

  try {
    const supabase = getSupabaseAdmin();

    const { error } = await supabase.from("appointment_requests").insert({
      full_name: data.name,
      email: data.email,
      phone: data.phone,
      preferred_date: data.preferredDate,
      preferred_time: data.preferredTime,
      service: data.service,
      patient_type: data.patientType,
      notes: data.notes?.trim() || null,
      locale: data.locale ?? "en",
    });

    if (error) {
      console.error("Supabase insert failed:", error);
      return NextResponse.json(
        { error: "Unable to save appointment request." },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Appointment API error:", error);
    return NextResponse.json(
      { error: "Unable to save appointment request." },
      { status: 500 },
    );
  }
}
