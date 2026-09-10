"use client";
import { Star } from "@phosphor-icons/react";

const reviews = [
  {
    id: 1,
    name: "Ayesha K.",
    rating: 5,
    review: "The box alone made me want to keep it. Books arrived wrapped like a gift, not a shipment.",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400",
  },
  {
    id: 2,
    name: "Hamza R.",
    rating: 4,
    review: "Fast delivery and the packaging kept the cover corners from getting dinged. Small thing that matters a lot.",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400",
  },
  {
    id: 3,
    name: "Sara M.",
    rating: 5,
    review: "Ordered Moby-Dick as a gift and the recipient sent me a photo before I even asked. That's rare.",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400",
  },
  {
    id: 4,
    name: "Bilal T.",
    rating: 5,
    review: "Genuinely didn't expect a tissue-wrapped bookmark tucked inside. Small touches like this build loyalty.",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400",
  },
  {
    id: 5,
    name: "Fatima N.",
    rating: 4,
    review: "Solid packaging, on-time delivery. Would've liked a thank-you note but overall a smooth first order.",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400",
  },
];

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

const ReviewCard = ({ name, rating, review, image }) => (
  <div className="flex w-[420px] sm:w-[520px] flex-shrink-0 items-center gap-6 border border-black/10 bg-white p-6">
    <div className="flex flex-1 flex-col gap-3">
      <StarRating rating={rating} />
      <p className="line-clamp-4 text-sm leading-relaxed text-black/70">
        "{review}"
      </p>
      <p className="font-[var(--font-display)] text-sm font-semibold text-black">
        — {name}
      </p>
    </div>

    <div className="flex flex-shrink-0 items-center justify-center p-3">
      <img
        src={image}
        alt={`Package received by ${name}`}
        className="h-32 w-32 object-cover sm:h-36 sm:w-36"
      />
    </div>
  </div>
);

const Reviews = () => {
  const looped = [...reviews, ...reviews];

  return (
    <section className="relative w-full overflow-hidden bg-[var(--color-bg)] py-16">
      <h2 className="mb-10 text-center font-[var(--font-display)] text-2xl font-semibold uppercase tracking-wide text-[var(--color-text)] sm:text-3xl">
        What Readers Are Saying
      </h2>

      <div className="reviews-fade relative w-full overflow-hidden">
        <div className="animate-marquee flex w-max gap-6 px-4">
          {looped.map((r, i) => (
            <ReviewCard key={`${r.id}-${i}`} {...r} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;