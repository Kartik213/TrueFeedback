import { auth } from "@/auth";
import { connectToDatabase } from "@/lib/db";
import { serializeUser, type RawUser } from "@/lib/serialize";
import "@/models/Message";
import User from "@/models/User";

export async function requireCurrentUser() {
  const session = await auth();

  if (!session?.user?.id) {
    return null;
  }

  await connectToDatabase();

  const user = (await User.findById(session.user.id)
    .populate("messages")
    .lean()) as RawUser | null;

  if (!user) {
    return null;
  }

  return serializeUser(user);
}
