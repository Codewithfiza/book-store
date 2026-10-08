"use client";

import { useState, useEffect } from 'react';
import { TrashIcon, Star } from "@phosphor-icons/react";
import toast from 'react-hot-toast';

const AdminReviewsPage = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReviews = async () => {
    setLoading(true);
    const res = await fetch('/api/books');
    const books = await res.json();

    // flatten: pull every review out of every book, tagging each with its parent book's info
    const allReviews = books.flatMap((book) =>
      book.reviews.map((review) => ({
        ...review,
        bookId: book._id,
        bookTitle: book.title,
      }))
    );

    setReviews(allReviews);
    setLoading(false);
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleDelete = async (review) => {
    const confirmed = window.confirm(
      `Delete this review by "${review.name}" on "${review.bookTitle}"?`
    );
    if (!confirmed) return;

    const res = await fetch(`/api/books/${review.bookId}/reviews/${review._id}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      toast.success('Review deleted');
      fetchReviews();
    } else {
      const data = await res.json();
      toast.error(data.error || 'Failed to delete');
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-3 sm:px-6 pt-28 sm:pt-32 pb-10 sm:pb-16">
      <h1 className="font-display text-xl sm:text-2xl md:text-3xl text-glow mb-4 sm:mb-8">
        Manage Reviews
      </h1>

      {loading ? (
        <p className="text-dim text-sm">Loading reviews...</p>
      ) : reviews.length === 0 ? (
        <p className="text-dim text-sm">No reviews yet.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="border border-wood rounded-lg bg-surface p-3 sm:p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-xs text-primary mb-1 truncate">
                    on "{review.bookTitle}"
                  </p>
                  <div className="flex items-center gap-2">
                    <p className="font-body text-sm sm:text-base text-foreground">
                      {review.name}
                    </p>
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={12}
                          weight={star <= review.rating ? "fill" : "regular"}
                          className={star <= review.rating ? "text-accent" : "text-dim"}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-dim mt-1">{review.comment}</p>
                </div>

                <button
                  onClick={() => handleDelete(review)}
                  className="text-dim hover:text-red-500 transition-colors p-1 flex-shrink-0"
                  aria-label="Delete review"
                >
                  <TrashIcon size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminReviewsPage;