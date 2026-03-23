import Link from "next/link";

import { auth } from "@/auth";

export async function SiteHeader() {
  const session = await auth();

  return (
    <nav className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-5 sm:px-6 md:px-10">
      <Link
        href="/"
        className="funk-title max-w-[10rem] text-lg font-bold tracking-tight text-[var(--ink)] sm:max-w-none sm:text-2xl"
      >
        True Feedback
      </Link>
      <div className="flex items-center gap-3">
        {session?.user ? (
          <Link
            href="/dashboard"
            className="rounded-full border-2 border-[var(--line)] bg-[#d9f6df] px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--ink)] transition hover:-translate-y-0.5 sm:px-5 sm:text-sm sm:normal-case sm:tracking-normal"
          >
            Dashboard
          </Link>
        ) : (
          <Link
            href="/sign-in"
            className="rounded-full border-2 border-[var(--line)] bg-[#fff0a8] px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--ink)] transition hover:-translate-y-0.5 sm:px-5 sm:text-sm sm:normal-case sm:tracking-normal"
          >
            Sign in
          </Link>
        )}
      </div>
    </nav>
  );
}
