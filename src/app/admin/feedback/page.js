
"use client";
import { useEffect, useState } from "react";
import {
  Star,
  CheckCircle,
  XCircle,
  CircleNotch,
  ChatCircleDots,
} from "@phosphor-icons/react";

const AdminFeedbackPage = () => {
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actingId, setActingId] = useState(null);
  const [error, setError] = useState("");

  const fetchPending = async () => {
    try {
      const res = await fetch("/api/feedback?status=pending");
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setFeedback(data);
    } catch (err) {
      console.error("Failed to load pending feedback:", err);
      setError("Couldn't load pending feedback. Try refreshing.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPending();
  }, []);

  const handleAction = async (_id, status) => {
    setActingId(_id);
    setError("");
    try {
      const res = await fetch(`/api/feedback/${_id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (!res.ok) throw new Error("Failed to update status");

      // Remove it from the pending list locally instead of refetching everything
      setFeedback((prev) => prev.filter((f) => f._id !== _id));
    } catch (err) {
      console.error(`Failed to ${status} feedback:`, err);
      setError(`Failed to ${status} that feedback. Try again.`);
    } finally {
      setActingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center gap-2 bg-[var(--color-bg)] text-[var(--color-text)]">
        <CircleNotch size={20} className="animate-spin" />
        Loading...
      </div>
    );
  }

  return (
    <section className="min-h-screen w-full bg-[var(--color-bg)] px-4 py-16">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 flex items-center gap-3">
          <ChatCircleDots size={28} weight="fill" className="text-[var(--color-accent)]" />
          <h1 className="font-[var(--font-display)] text-2xl font-semibold text-[var(--color-text)]">
            Pending Feedback
          </h1>
        </div>

        {error && (
          <p className="mb-6 text-sm text-red-400">{error}</p>
        )}

        {feedback.length === 0 ? (
          <p className="text-[var(--color-muted)]">No pending feedback.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {feedback.map((f) => (
              <div
                key={f._id}
                className="rounded-2xl border border-white/10 bg-[var(--color-surface)] p-6"
              >
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-[var(--color-text)]">{f.name}</p>
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={18}
                        weight={star <= f.rating ? "fill" : "regular"}
                        color={
                          star <= f.rating
                            ? "var(--color-accent)"
                            : "var(--color-dim)"
                        }
                      />
                    ))}
                  </div>
                </div>
                <p className="mt-2 text-sm text-[var(--color-muted)]">{f.message}</p>

                <div className="mt-4 flex gap-3">
                  <button
                    onClick={() => handleAction(f._id, "approved")}
                    disabled={actingId === f._id}
                    className="inline-flex items-center gap-2 rounded-full bg-[var(--color-accent)] px-5 py-2 text-sm font-semibold text-[var(--color-bg)] disabled:opacity-50"
                  >
                    {actingId === f._id ? (
                      <CircleNotch size={16} className="animate-spin" />
                    ) : (
                      <CheckCircle size={16} weight="fill" />
                    )}
                    Approve
                  </button>
                  <button
                    onClick={() => handleAction(f._id, "rejected")}
                    disabled={actingId === f._id}
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2 text-sm font-semibold text-[var(--color-text)] disabled:opacity-50"
                  >
                    {actingId === f._id ? (
                      <CircleNotch size={16} className="animate-spin" />
                    ) : (
                      <XCircle size={16} weight="fill" />
                    )}
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default AdminFeedbackPage;