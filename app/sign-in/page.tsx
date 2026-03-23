import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { AuthCard } from "@/components/auth-card";
import { SignInForm } from "@/components/sign-in-form";

export default async function SignInPage() {
  const session = await auth();

  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-8 sm:px-6 sm:py-12">
      <AuthCard
        title="Welcome back"
        subtitle="Slip back into your board and check what people have been brave enough to say."
      >
        <SignInForm />
      </AuthCard>
    </main>
  );
}
