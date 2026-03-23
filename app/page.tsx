import Link from "next/link";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex flex-1 items-center justify-center px-6 py-10 md:px-10 md:py-14">
        <div className="mx-auto grid w-full max-w-6xl gap-8 lg:grid-cols-[1.25fr_0.9fr]">
          <section className="funk-panel card-pop rounded-[2rem] bg-[#fff7ef]/95 p-8 md:p-12">
            <p className="mb-5 inline-flex rounded-full border-2 border-[var(--line)] bg-[#fff0a8] px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] text-[var(--ink)]">
              Honest feedback, less vanilla UI
            </p>
            <h1 className="funk-title max-w-3xl text-5xl font-bold leading-[0.92] text-[var(--ink)] md:text-7xl">
              Anonymous feedback with a sticker-book attitude.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--muted)]">
              Collect blunt compliments, weird confessions, and kind chaos on a
              public board that feels playful instead of sterile. The auth got
              stricter. The visuals got looser.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/sign-up"
                className="rounded-full border-2 border-[var(--line)] bg-[#ffb9a7] px-7 py-3 text-sm font-extrabold uppercase tracking-[0.16em] text-[var(--ink)] transition hover:-translate-y-0.5"
              >
                Start your board
              </Link>
              <Link
                href="/sign-in"
                className="rounded-full border-2 border-[var(--line)] bg-[#d9f6df] px-7 py-3 text-sm font-bold uppercase tracking-[0.16em] text-[var(--ink)] transition hover:-translate-y-0.5"
              >
                Sign in
              </Link>
            </div>
          </section>
          <section className="grid gap-6">
            <div className="funk-panel funk-doodle card-pop rounded-[2rem] bg-[#ffe3d6]/90 p-7">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                Moodboard
              </p>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="rounded-[1.5rem] border-2 border-[var(--line)] bg-[#fff0a8] p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--muted)]">
                    Public link
                  </p>
                  <p className="mt-3 text-3xl">🔗</p>
                </div>
                <div className="rounded-[1.5rem] border-2 border-[var(--line)] bg-[#d9f6df] p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--muted)]">
                    Anonymous notes
                  </p>
                  <p className="mt-3 text-3xl">💌</p>
                </div>
              </div>
              <p className="mt-5 max-w-sm text-sm leading-7 text-[var(--muted)]">
                Share your page, keep your identity wall up, and let people say
                things they would never drop in a group chat.
              </p>
            </div>
            <div className="funk-panel card-pop rounded-[2rem] bg-[#f8ffef]/95 p-7">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                Why this feels different
              </p>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-[var(--ink)]">
                <li>Pastel paper-card visuals instead of default SaaS gradients.</li>
                <li>Secure sessions without localStorage token juggling.</li>
                <li>Fast public posting flow with playful prompt suggestions.</li>
              </ul>
            </div>
          </section>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
