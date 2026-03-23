import { NextResponse } from "next/server";
import { z } from "zod";

import { auth } from "@/auth";
import { connectToDatabase } from "@/lib/db";
import User from "@/models/User";

const acceptanceSchema = z.object({
  acceptMessages: z.boolean()
});

export async function PATCH(request: Request) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const parsedBody = acceptanceSchema.safeParse(body);

    if (!parsedBody.success) {
      return NextResponse.json({ message: "Invalid request" }, { status: 400 });
    }

    await connectToDatabase();

    const updatedUser = await User.findByIdAndUpdate(
      session.user.id,
      { acceptMessages: parsedBody.data.acceptMessages },
      { new: true }
    ).lean();

    if (!updatedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      acceptMessages: parsedBody.data.acceptMessages,
      message: "Message acceptance updated successfully"
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to update message settings" }, { status: 500 });
  }
}
