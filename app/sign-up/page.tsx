import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { AuthCard } from "@/components/auth-card";
import { SignUpForm } from "@/components/sign-up-form";

export default async function SignUpPage() {
  const session = await auth();

  if (session?.user) {
    redirect("/dashboard");
  }

  return (
      <main className="flex items-center justify-center px-4 py-6 sm:px-6 sm:py-10">
        <AuthCard
          title="Join True Feedback"
          subtitle="Claim your colorful little corner of the internet and start collecting anonymous notes."
        >
          <SignUpForm />
        </AuthCard>
      </main>
  );
}
