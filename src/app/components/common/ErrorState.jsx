"use client";

import Link from "next/link";
import { BooksIcon } from "@phosphor-icons/react";

export default function ErrorState({
  title = "Our shelves are taking a break",
  message = "We couldn't load this page right now. Please try again in a moment.",
  reset,
}) {
  return (
    <main className="flex min-h-dvh items-center justify-center bg-bg px-4 pb-12 pt-28 sm:px-6 sm:pt-32">
      <div className="w-full max-w-md rounded-2xl border border-wood bg-surface p-8 text-center shadow-soft">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-wood text-primary shadow-glow">
          <BooksIcon size={28} weight="duotone" />
        </div>

        <h2 className="font-display text-2xl font-semibold text-glow">{title}</h2>
        <p className="mt-3 font-body text-muted">{message}</p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            onClick={() => reset()}
            className="rounded-lg bg-primary px-5 py-2.5 font-body font-medium text-bg transition hover:bg-glow hover:shadow-glow"
          >
            Try again
          </button>
          <Link
            href="/"
            className="rounded-lg border border-dim px-5 py-2.5 font-body text-text transition hover:border-primary hover:text-primary"
          >
            Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}