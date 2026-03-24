import { redirect } from "next/navigation";

import { requireCurrentUser } from "@/lib/auth";
import { DashboardShell } from "@/components/dashboard-shell";

export default async function DashboardPage() {
  const user = await requireCurrentUser();

  if (!user) {
    redirect("/sign-in");
  }

  return <DashboardShell initialUser={user} />;
}
