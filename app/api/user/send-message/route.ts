import { NextResponse } from "next/server";
import { z } from "zod";

import { connectToDatabase } from "@/lib/db";
import Message from "@/models/Message";
import User from "@/models/User";

const messageSchema = z.object({
  username: z.string().trim().min(1, "Username is required"),
  message: z.string().trim().min(1, "Message is required")
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsedBody = messageSchema.safeParse(body);

    if (!parsedBody.success) {
      return NextResponse.json(
        { message: parsedBody.error.issues[0]?.message ?? "Invalid request" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const user = await User.findOne({ username: parsedBody.data.username });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    if (!user.acceptMessages) {
      return NextResponse.json(
        { message: "User is not accepting messages" },
        { status: 400 }
      );
    }

    const newMessage = await Message.create({ message: parsedBody.data.message });
    user.messages.push(newMessage._id);
    await user.save();

    return NextResponse.json({ message: "Message sent successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to send message" }, { status: 500 });
  }
}
