"use client";

import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { useTransition } from "react";

export function LogoutButton() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleLogout = () => {
    startTransition(async () => {
      await signOut({ redirect: false });
      router.push("/");
      router.refresh();
    });
  };

  return (
    <button
      type="button"
      className="rounded-full border-2 border-[var(--line)] bg-[#ffb9a7] px-4 py-2 text-xs font-extrabold uppercase tracking-[0.14em] text-[var(--ink)] transition hover:-translate-y-0.5 disabled:opacity-60 sm:px-5 sm:text-sm"
      onClick={handleLogout}
      disabled={isPending}
    >
      {isPending ? "Logging out..." : "Logout"}
    </button>
  );
}
