import { NextResponse } from "next/server";
import { isValidObjectId } from "mongoose";

import { auth } from "@/auth";
import { connectToDatabase } from "@/lib/db";
import Message from "@/models/Message";
import User from "@/models/User";

type RouteContext = {
  params: Promise<{ messageId: string }>;
};

export async function DELETE(_: Request, context: RouteContext) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { messageId } = await context.params;

  if (!isValidObjectId(messageId)) {
    return NextResponse.json({ message: "Invalid message id" }, { status: 400 });
  }

  try {
    await connectToDatabase();

    const user = await User.findById(session.user.id);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    await Message.deleteOne({ _id: messageId });
    await User.findByIdAndUpdate(session.user.id, {
      $pull: { messages: messageId }
    });

    return NextResponse.json({ message: "Message deleted successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to delete message" }, { status: 500 });
  }
}
