"use client";
import { useState } from "react";
import {
  Star,
  PaperPlaneTilt,
  CircleNotch,
  CheckCircle,
  WarningCircle,
} from "@phosphor-icons/react";

const FeedbackPage = () => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [form, setForm] = useState({ name: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.name.trim() || !form.message.trim() || rating === 0) {
      setError("Please add your name, a message, and a rating.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          message: form.message,
          rating,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Submission failed");
      }

      setSubmitted(true);
    } catch (err) {
      console.error("Failed to submit feedback:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <section className="flex min-h-[70vh] w-full items-center justify-center bg-[var(--color-bg)] px-4">
        <div className="max-w-md text-center">
          <CheckCircle
            size={56}
            weight="fill"
            className="mx-auto mb-4 text-[var(--color-accent)]"
          />
          <h2 className="font-[var(--font-display)] text-2xl font-semibold text-[var(--color-text)] sm:text-3xl">
            Thanks for your feedback
          </h2>
          <p className="mt-3 text-[var(--color-muted)]">
            It's been submitted for review and will appear on the site once approved.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full bg-[var(--color-bg)] px-4 py-16 sm:py-24">
      <div className="mx-auto max-w-xl">
        <h2 className="pt-10 text-center font-[var(--font-display)] text-2xl font-semibold uppercase tracking-wide text-[var(--color-text)] sm:text-3xl">
          Share Your Feedback
        </h2>
        <p className="mt-3 text-center text-sm text-[var(--color-muted)] sm:text-base">
          Tell us what you think — your review may be featured on our homepage.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-10 flex flex-col gap-6 rounded-3xl border border-white/10 bg-[var(--color-surface)] p-6 shadow-[var(--shadow-soft)] sm:p-10"
        >
          <div>
            <label className="mb-2 block text-sm font-semibold text-[var(--color-text)]">
              Your Rating
            </label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="transition-colors"
                  aria-label={`${star} star`}
                >
                  <Star
                    size={28}
                    weight={star <= (hoverRating || rating) ? "fill" : "regular"}
                    color={
                      star <= (hoverRating || rating)
                        ? "var(--color-accent)"
                        : "var(--color-dim)"
                    }
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="name" className="mb-2 block text-sm font-semibold text-[var(--color-text)]">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-white/10 bg-[var(--color-wood)] px-4 py-3 text-[var(--color-text)] placeholder-[var(--color-dim)] outline-none focus:border-[var(--color-accent)]"
              placeholder="Your name"
            />
          </div>

          <div>
            <label htmlFor="message" className="mb-2 block text-sm font-semibold text-[var(--color-text)]">
              Your Feedback
            </label>
            <textarea
              id="message"
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              rows={5}
              maxLength={400}
              className="w-full resize-none rounded-xl border border-white/10 bg-[var(--color-wood)] px-4 py-3 text-[var(--color-text)] placeholder-[var(--color-dim)] outline-none focus:border-[var(--color-accent)]"
              placeholder="What did you think?"
            />
            <p className="mt-1 text-right text-xs text-[var(--color-dim)]">
              {form.message.length}/400
            </p>
          </div>

          {error && (
            <p className="flex items-center gap-2 text-sm text-[var(--color-accent)]">
              <WarningCircle size={18} weight="fill" />
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="mt-2 inline-flex w-fit items-center justify-center gap-2 rounded-full bg-[var(--color-accent)] px-8 py-3 font-[var(--font-display)] text-sm font-semibold uppercase tracking-wide text-[var(--color-bg)] transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {submitting ? (
              <>
                <CircleNotch size={18} className="animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <PaperPlaneTilt size={18} weight="fill" />
                Submit Feedback
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  );
};

export default FeedbackPage;