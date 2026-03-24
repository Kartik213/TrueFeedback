import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { z } from "zod";

import { connectToDatabase } from "@/lib/db";
import User from "@/models/User";

const registerSchema = z.object({
  username: z
    .string()
    .trim()
    .min(3, "Username must be at least 3 characters")
    .regex(/^[A-Za-z0-9_]+$/, "Username must not contain special characters"),
  email: z.string().trim().email("Invalid email"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must include at least one uppercase letter")
    .regex(/[a-z]/, "Password must include at least one lowercase letter")
    .regex(/\d/, "Password must include at least one number")
    .regex(/[^A-Za-z0-9]/, "Password must include at least one special character")
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsedBody = registerSchema.safeParse(body);

    if (!parsedBody.success) {
      return NextResponse.json(
        { message: parsedBody.error.issues[0]?.message ?? "Invalid request" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const { username, email, password } = parsedBody.data;

    const usernameExists = await User.exists({ username });
    if (usernameExists) {
      return NextResponse.json({ message: "Username already taken" }, { status: 400 });
    }

    const emailExists = await User.exists({ email: email.toLowerCase() });
    if (emailExists) {
      return NextResponse.json({ message: "Email already in use" }, { status: 400 });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? new URL(request.url).origin;

    await User.create({
      username,
      email: email.toLowerCase(),
      password: passwordHash,
      url: `${baseUrl}/u/${username}`,
      acceptMessages: false
    });

    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to register user" }, { status: 500 });
  }
}
