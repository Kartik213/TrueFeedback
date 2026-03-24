"use client";

import { useState, useTransition } from "react";
import { LuRefreshCw } from "react-icons/lu";
import { toast } from "react-toastify";

import type { MessageRecord, UserRecord } from "@/types";

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true
  });
}

export function DashboardShell({ initialUser }: { initialUser: UserRecord }) {
  const [user, setUser] = useState(initialUser);
  const [isMutating, startTransition] = useTransition();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [messagePendingDelete, setMessagePendingDelete] = useState<MessageRecord | null>(null);

  const refreshUser = async () => {
    setIsRefreshing(true);

    try {
      const response = await fetch("/api/user/me", { cache: "no-store" });
      const data = (await response.json()) as { user: UserRecord; message?: string };

      if (!response.ok) {
        toast.error(data.message ?? "Failed to load user");
        return;
      }

      setUser(data.user);
    } finally {
      setIsRefreshing(false);
    }
  };

  const toggleAcceptMessages = () => {
    startTransition(async () => {
      const response = await fetch("/api/user/accept-messages", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          acceptMessages: !user.acceptMessages
        })
      });

      const data = (await response.json()) as {
        acceptMessages?: boolean;
        message: string;
      };

      if (!response.ok || typeof data.acceptMessages !== "boolean") {
        toast.error(data.message);
        return;
      }

      setUser((current) => ({
        ...current,
        acceptMessages: data.acceptMessages as boolean
      }));
      toast.success(data.message);
    });
  };

  const deleteMessage = (messageId: string) => {
    startTransition(async () => {
      const response = await fetch(`/api/user/messages/${messageId}`, {
        method: "DELETE"
      });

      const data = (await response.json()) as { message: string };

      if (!response.ok) {
        toast.error(data.message);
        return;
      }

      setUser((current) => ({
        ...current,
        messages: current.messages.filter((message) => message._id !== messageId)
      }));
      setMessagePendingDelete(null);
      toast.success(data.message);
    });
  };

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(user.url);
      toast.success("URL copied!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to copy URL.");
    }
  };

  return (
    <div className="min-h-screen">
      <main className="mx-auto max-w-6xl px-4 py-4 text-[var(--ink)] sm:px-6 sm:py-6">
        <section className="funk-panel card-pop rounded-[1.7rem] bg-[#fffaf4]/95 p-5 sm:rounded-[2rem] sm:p-6 md:p-8">
          <h1 className="funk-title mt-4 text-3xl font-bold sm:text-4xl">Welcome, {user.username}</h1>
          <p className="mt-2 max-w-xl text-sm leading-7 text-[var(--muted)]">
            Copy your public link, flip message mode on, and keep the good weirdness coming.
          </p>
          <div className="mt-6 flex flex-col gap-3 md:flex-row">
            <p className="w-full break-all rounded-[1.4rem] border-2 border-[var(--line)] bg-[#fff5ee] px-4 py-3 text-sm text-[var(--ink)]">
              {user.url}
            </p>
            <button
              className="rounded-[1.4rem] border-2 border-[var(--line)] bg-[#d9f6df] px-5 py-3 text-sm font-extrabold uppercase tracking-[0.14em] text-[var(--ink)] transition hover:-translate-y-0.5 md:min-w-[7rem]"
              onClick={handleCopyUrl}
            >
              Copy
            </button>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3 sm:gap-4">
            <button
              type="button"
              aria-pressed={user.acceptMessages}
              onClick={toggleAcceptMessages}
              disabled={isMutating}
              className={`flex h-7 w-14 items-center rounded-full px-1 transition ${
                user.acceptMessages ? "bg-[#ffb9a7]" : "bg-[#d7d0d8]"
              }`}
            >
              <span
                className={`h-5 w-5 rounded-full bg-[#fffdf8] shadow transition ${
                  user.acceptMessages ? "translate-x-7" : "translate-x-0"
                }`}
              />
            </button>
            <p className="text-sm font-semibold text-[var(--ink)]">
              Accept Messages: {user.acceptMessages ? "On" : "Off"}
            </p>
            <button
              className="flex h-10 w-10 items-center justify-center rounded-[1rem] border-2 border-[var(--line)] bg-[#fff0a8] transition hover:-translate-y-0.5"
              onClick={refreshUser}
              disabled={isRefreshing}
            >
              {isRefreshing ? (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-[rgba(43,33,49,0.2)] border-t-[var(--ink)]" />
              ) : (
                <LuRefreshCw />
              )}
            </button>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="funk-title text-2xl font-bold">Messages</h2>
          {user.messages.length === 0 ? (
            <div className="funk-panel mt-4 rounded-[1.7rem] border-dashed bg-[#fffdf8]/85 p-6 text-[var(--muted)] sm:rounded-[2rem] sm:p-8">
              No messages yet. Share your public link to get started.
            </div>
          ) : (
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {user.messages.map((message: MessageRecord) => (
                <article
                  key={message._id}
                  className="funk-panel card-pop flex flex-col gap-4 rounded-[1.7rem] bg-[#fffdf8]/90 p-5 sm:rounded-[2rem] sm:p-6 md:flex-row md:items-start md:justify-between"
                >
                  <div>
                    <p className="text-xl font-semibold tracking-tight text-[var(--ink)]">{message.message}</p>
                    <p className="mt-2 text-sm text-[var(--muted)]">{formatDate(message.createdAt)}</p>
                  </div>
                  <button
                    className="w-full rounded-[1.1rem] border-2 border-[var(--line)] bg-[#ffc7b7] px-3 py-2 text-sm font-extrabold uppercase tracking-[0.14em] text-[var(--ink)] transition hover:-translate-y-0.5 sm:w-auto"
                    onClick={() => setMessagePendingDelete(message)}
                    disabled={isMutating}
                  >
                    Delete
                  </button>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>

      {messagePendingDelete ? (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-[rgba(43,33,49,0.28)] p-3 backdrop-blur-sm sm:items-center sm:p-6">
          <div className="funk-panel card-pop w-full max-w-md rounded-[1.7rem] bg-[#fffaf4] p-5 sm:rounded-[2rem] sm:p-7">
            <p className="inline-flex rounded-full border-2 border-[var(--line)] bg-[#fff0a8] px-3 py-2 text-[0.65rem] font-extrabold uppercase tracking-[0.14em] text-[var(--ink)] sm:px-4 sm:text-xs sm:tracking-[0.18em]">
              Delete note
            </p>
            <h3 className="funk-title mt-4 text-2xl font-bold text-[var(--ink)] sm:mt-5 sm:text-3xl">
              Remove this message?
            </h3>
            <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
              This action cannot be undone. The selected message will disappear from your board.
            </p>
            <div className="mt-5 rounded-[1.5rem] border-2 border-[var(--line)] bg-[#fff5ee] p-4 text-sm font-semibold text-[var(--ink)]">
              {messagePendingDelete.message}
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button
                className="rounded-[1.1rem] border-2 border-[var(--line)] bg-[#d9f6df] px-5 py-3 text-sm font-extrabold uppercase tracking-[0.14em] text-[var(--ink)] transition hover:-translate-y-0.5"
                onClick={() => setMessagePendingDelete(null)}
                disabled={isMutating}
              >
                Keep it
              </button>
              <button
                className="rounded-[1.1rem] border-2 border-[var(--line)] bg-[#ffc7b7] px-5 py-3 text-sm font-extrabold uppercase tracking-[0.14em] text-[var(--ink)] transition hover:-translate-y-0.5 disabled:opacity-60"
                onClick={() => deleteMessage(messagePendingDelete._id)}
                disabled={isMutating}
              >
                {isMutating ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
