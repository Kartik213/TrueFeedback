import Link from "next/link";

import { auth } from "@/auth";

export async function SiteHeader() {
  const session = await auth();

  return (
    <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6 md:px-10">
      <Link href="/" className="funk-title text-2xl font-bold tracking-tight text-[var(--ink)]">
        True Feedback
      </Link>
      <div className="flex items-center gap-3">
        {session?.user ? (
          <Link
            href="/dashboard"
            className="rounded-full border-2 border-[var(--line)] bg-[#d9f6df] px-5 py-2 text-sm font-semibold text-[var(--ink)] transition hover:-translate-y-0.5"
          >
            Dashboard
          </Link>
        ) : (
          <Link
            href="/sign-in"
            className="rounded-full border-2 border-[var(--line)] bg-[#fff0a8] px-5 py-2 text-sm font-semibold text-[var(--ink)] transition hover:-translate-y-0.5"
          >
            Sign in
          </Link>
        )}
      </div>
    </nav>
  );
}
