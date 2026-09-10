"use client";
import React from "react";
import { Star } from "@phosphor-icons/react";

const reviews = [
  {
    id: 1,
    name: "Ayesha K.",
    rating: 5,
    text: "Package arrived in two days, wrapped so carefully the cover wasn't even bent. Ordering again.",
    image: "https://picsum.photos/seed/book1/300/220",
  },
  {
    id: 2,
    name: "Hamza R.",
    rating: 4,
    text: "Good packaging, slight delay in delivery but the book itself was in perfect condition.",
    image: "https://picsum.photos/seed/book2/300/220",
  },
  {
    id: 3,
    name: "Zainab M.",
    rating: 5,
    text: "Loved the little bookmark they added inside the box. Small touch, made my day.",
    image: "https://picsum.photos/seed/book3/300/220",
  },
  {
    id: 4,
    name: "Bilal S.",
    rating: 5,
    text: "This was my third order from them. Every single time the packaging is spotless.",
    image: "https://picsum.photos/seed/book4/300/220",
  },
  {
    id: 5,
    name: "Nimra F.",
    rating: 4,
    text: "Box was slightly dented from courier handling but the seal inside kept the book safe.",
    image: "https://picsum.photos/seed/book5/300/220",
  },
  {
    id: 6,
    name: "Usman T.",
    rating: 5,
    text: "Exactly as pictured. Fast shipping and the box smelled like fresh paper, weirdly satisfying.",
    image: "https://picsum.photos/seed/book6/300/220",
  },
];

function StarRow({ rating }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={15}
          weight={i < rating ? "fill" : "regular"}
          color={i < rating ? "#C9A227" : "#D8D2C3"}
        />
      ))}
    </div>
  );
}

function ReviewCard({ review }) {
  return (
    <div
      className="flex-shrink-0 w-[260px] rounded-md border border-[#E5DFD3] bg-white overflow-hidden mx-3"
      style={{ boxShadow: "0 1px 2px rgba(43,42,51,0.06)" }}
    >
      <img
        src={review.image}
        alt="Package received by customer"
        className="w-full h-[140px] object-cover"
      />
      <div className="p-4">
        <StarRow rating={review.rating} />
        <p className="mt-2 text-[13.5px] leading-relaxed text-[#3A3A3A]">
          {review.text}
        </p>
        <p
          className="mt-3 text-[13px] text-[#7C3F58]"
          style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
        >
          {review.name}
        </p>
      </div>
    </div>
  );
}

export const ReviewCarousel = () => {
  const track = [...reviews, ...reviews];

  return (
    <div
      className="w-full py-10"
      style={{ background: "#FAF7F2", fontFamily: "system-ui, sans-serif" }}
    >
      <h2
        className="text-center text-[22px] mb-8 text-[#2B2A33]"
        style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
      >
        What readers are saying
      </h2>

      <div className="relative overflow-hidden group">
        <div
          className="flex w-max"
          style={{
            animation: "scrollReviews 28s linear infinite",
          }}
        >
          {track.map((review, i) => (
            <ReviewCard key={`${review.id}-${i}`} review={review} />
          ))}
        </div>

        {/* edge fade */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#FAF7F2] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#FAF7F2] to-transparent" />
      </div>

      <style>{`
        @keyframes scrollReviews {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .group:hover > div {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}