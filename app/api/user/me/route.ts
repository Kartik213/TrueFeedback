import { NextResponse } from "next/server";

import { requireCurrentUser } from "@/lib/auth";

export async function GET() {
  const user = await requireCurrentUser();

  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({ user });
}
