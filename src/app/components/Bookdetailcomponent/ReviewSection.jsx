"use client";
import React from 'react'
import { useState, useRef, useEffect } from "react";
import { Star } from "@phosphor-icons/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const dummyReviews = [
  { id: 1, name: "Ayesha K.", rating: 5, comment: "Couldn't put it down. Loved the pacing." },
  { id: 2, name: "Hamza R.", rating: 4, comment: "Great read, though the ending felt rushed." },
];


const ReviewSection = () => {
     const [reviews, setReviews] = useState(dummyReviews);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
           }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;
 const newReview = {
      id: Date.now(),
      name,
      rating,
      comment,
    };

    setReviews((prev) => [newReview, ...prev]);
    setName("");
    setComment("");
    setRating(5);
  };


  return (
   <div ref={sectionRef} className="mt-14 sm:mt-20 opacity-0">
      <h2 className="font-display text-xl sm:text-2xl text-glow mb-6">
        Reader Reviews
      </h2>

      {/* Add review form */}
       <form
        onSubmit={handleSubmit}
        className="rounded-xl border border-wood bg-surface p-5 sm:p-6 mb-8 flex flex-col gap-4"
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="flex-1 px-4 py-2.5 rounded-md border border-wood bg-bg font-body text-sm text-primary placeholder:text-dim focus:outline-none focus:ring-2 focus:ring-accent"
          />
           <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                type="button"
                key={star}
                onClick={() => setRating(star)}
              >
                <Star
                  size={22}
                  weight={star <= rating ? "fill" : "regular"}
                  className={star <= rating ? "text-accent" : "text-dim"}
                />
              </button>
               ))}
          </div>
        </div>

        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your thoughts on this book..."
          rows={3}
          className="w-full px-4 py-2.5 rounded-md border border-wood bg-bg font-body text-sm text-primary placeholder:text-dim resize-none focus:outline-none focus:ring-2 focus:ring-accent"
        />
        <button
          type="submit"
          className="w-fit px-5 py-2.5 rounded-md font-accent text-sm bg-accent text-bg shadow-glow transition-shadow duration-300 hover:shadow-glow-lg"
        >
          Post Review
        </button>
      </form>
      {/* Reviews list */}
      <div className="flex flex-col gap-4">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="rounded-xl border border-wood bg-surface p-4 sm:p-5"
          >
            <div className="flex items-center justify-between mb-2">
              <p className="font-display text-sm sm:text-base text-glow">
                {review.name}
              </p>
               <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={14}
                    weight={star <= review.rating ? "fill" : "regular"}
                    className={star <= review.rating ? "text-accent" : "text-dim"}
                  />
                ))}
              </div>
            </div>
            <p className="font-body text-sm text-muted leading-relaxed">
              {review.comment}
            </p>
          </div>
        ))}
         </div>
    </div>
  )
}

export default ReviewSection