import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      fullName,
      email,
      attending,
      guestCount,
      dietaryPreferences,
      dietaryOther,
      arrivingByAir,
      airport,
      arrivalDatetime,
      needAccommodation,
      checkInDate,
      checkOutDate,
      notes,
    } = body;

    // Validate required fields
    if (!fullName || typeof fullName !== "string" || fullName.trim() === "") {
      return NextResponse.json(
        { error: "Full name is required" },
        { status: 400 }
      );
    }

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { error: "A valid email is required" },
        { status: 400 }
      );
    }

    if (attending === null || attending === undefined) {
      return NextResponse.json(
        { error: "Please indicate if you are attending" },
        { status: 400 }
      );
    }

    const { error } = await supabase.from("rsvps").insert({
      full_name: fullName.trim(),
      email: email.trim().toLowerCase(),
      attending: Boolean(attending),
      guest_count: attending ? Math.max(1, Math.min(10, Number(guestCount) || 1)) : 0,
      dietary_preferences: Array.isArray(dietaryPreferences)
        ? dietaryPreferences
        : [],
      dietary_other: dietaryOther?.trim() || null,
      arriving_by_air: attending ? Boolean(arrivingByAir) : false,
      airport: arrivingByAir ? airport?.trim() || null : null,
      arrival_datetime: arrivingByAir && arrivalDatetime ? arrivalDatetime : null,
      need_accommodation: arrivingByAir ? Boolean(needAccommodation) : false,
      check_in_date: needAccommodation && checkInDate ? checkInDate : null,
      check_out_date: needAccommodation && checkOutDate ? checkOutDate : null,
      notes: notes?.trim() || null,
    });

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { error: "Failed to save RSVP. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Invalid request" },
      { status: 400 }
    );
  }
}
