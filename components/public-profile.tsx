"use client";

import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";

export function PublicProfile({ username }: { username: string }) {
  const [message, setMessage] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);

  const fetchSuggestions = async () => {
    setIsLoadingSuggestions(true);

    try {
      const response = await fetch("/api/user/suggestions");
      const data = (await response.json()) as { suggestions?: string[] };
      setSuggestions(data.suggestions ?? []);
    } finally {
      setIsLoadingSuggestions(false);
    }
  };

  const sendMessage = async () => {
    const response = await fetch("/api/user/send-message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        message
      })
    });

    const data = (await response.json()) as { message: string };

    if (!response.ok) {
      toast.error(data.message);
      return;
    }

    toast.success(data.message);
    setMessage("");
  };

  return (
    <main className="mx-auto min-h-screen max-w-4xl px-6 py-12 text-[var(--ink)]">
      <div className="funk-panel card-pop rounded-[2rem] bg-[#fffaf4]/95 p-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="inline-flex rounded-full border-2 border-[var(--line)] bg-[#fff0a8] px-4 py-2 text-xs font-extrabold uppercase tracking-[0.18em] text-[var(--ink)]">
            Send something honest
          </p>
        </div>
        <h1 className="funk-title mt-5 text-center text-5xl font-bold">Public profile link</h1>
        <p className="mt-4 text-center text-sm font-medium text-[var(--muted)]">
          Send anonymous feedback to @{username}
        </p>
        <textarea
          value={message}
          placeholder="Write your anonymous message here"
          className="mt-5 min-h-32 w-full rounded-[1.8rem] border-2 border-[var(--line)] bg-[#fff5ee] px-5 py-4 text-sm text-[var(--ink)] outline-none placeholder:text-[var(--muted)]"
          onChange={(event) => setMessage(event.target.value)}
        />
        <div className="mt-4 flex justify-center">
          <button
            className="rounded-full border-2 border-[var(--line)] bg-[#ffb9a7] px-6 py-3 text-sm font-extrabold uppercase tracking-[0.14em] text-[var(--ink)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
            disabled={!message}
            onClick={sendMessage}
          >
            Send it
          </button>
        </div>
      </div>

      <div className="funk-panel card-pop mt-8 rounded-[2rem] bg-[#f7ffef]/95 p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="funk-title text-3xl font-bold">Suggested prompts</h2>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Click any suggestion to drop it into the message box.
            </p>
          </div>
          <button
            className="rounded-full border-2 border-[var(--line)] bg-[#d9f6df] px-5 py-3 text-sm font-extrabold uppercase tracking-[0.14em] transition hover:-translate-y-0.5"
            onClick={fetchSuggestions}
          >
            {isLoadingSuggestions ? "Loading..." : "Suggest messages"}
          </button>
        </div>

        <div className="mt-6 grid gap-4">
          {suggestions.map((suggestion) => (
            <button
              key={suggestion}
              className="rounded-[1.7rem] border-2 border-[var(--line)] bg-[#fffdf8] px-4 py-4 text-left text-sm font-semibold text-[var(--ink)] transition hover:-translate-y-0.5"
              onClick={() => setMessage(suggestion)}
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 text-center text-sm text-[var(--muted)]">
        Need your own board?{" "}
        <Link href="/sign-up" className="font-extrabold text-[#b45e40]">
          Create your account
        </Link>
      </div>
    </main>
  );
}
