"use client";
import { useEffect, useState } from "react";
import { Star, CircleNotch } from "@phosphor-icons/react";

const StarRating = ({ rating, max = 5 }) => (
  <div className="flex items-center gap-1">
    {Array.from({ length: max }).map((_, i) => (
      <Star
        key={i}
        size={16}
        weight={i < rating ? "fill" : "regular"}
        className={i < rating ? "text-[var(--color-primary)]" : "text-black/20"}
      />
    ))}
  </div>
);

const ReviewCard = ({ name, rating, message }) => (
  <div className="flex w-[340px] sm:w-[400px] flex-shrink-0 flex-col justify-center gap-3 border border-black/10 bg-white p-6">
    <StarRating rating={rating} />
    <p className="line-clamp-4 text-sm leading-relaxed text-black/70">
      "{message}"
    </p>
    <p className="font-[var(--font-display)] text-sm font-semibold text-black">
      — {name}
    </p>
  </div>
);

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApproved = async () => {
      try {
        const res = await fetch("/api/feedback"); // defaults to status=approved
        if (!res.ok) throw new Error("Failed to fetch reviews");
        const data = await res.json();
        setReviews(data);
      } catch (err) {
        console.error("Failed to load reviews:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchApproved();
  }, []);

  if (loading) {
    return (
      <section className="flex w-full items-center justify-center gap-2 bg-[var(--color-bg)] py-16 text-[var(--color-text)]">
        <CircleNotch size={20} className="animate-spin" />
        Loading reviews...
      </section>
    );
  }

  if (reviews.length === 0) {
    return null; // nothing approved yet — don't show an empty section
  }

  // Only loop the marquee if there's enough content to make it feel continuous
  const looped = reviews.length >= 3 ? [...reviews, ...reviews] : reviews;

  return (
    <section className="relative w-full overflow-hidden bg-[var(--color-bg)] py-16">
      <h2 className="mb-10 text-center font-[var(--font-display)] text-2xl font-semibold uppercase tracking-wide text-[var(--color-text)] sm:text-3xl">
        What Readers Are Saying
      </h2>

      <div className="reviews-fade relative w-full overflow-hidden">
        <div className="animate-marquee flex w-max gap-6 px-4">
          {looped.map((r, i) => (
            <ReviewCard key={`${r._id}-${i}`} name={r.name} rating={r.rating} message={r.message} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;