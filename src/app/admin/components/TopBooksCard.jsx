"use client";
import { useState, useEffect } from 'react';

const TopBooksCard = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/dashboard/top-books')
      .then((res) => res.json())
      .then((json) => { setBooks(json); setLoading(false); });
  }, []);

  return (
    <div className="border border-wood rounded-xl bg-surface p-5">
      <p className="text-xs text-dim mb-3">Top Selling Books</p>
      {loading ? (
        <p className="text-sm text-muted">Loading...</p>
      ) : (
        <div className="flex flex-col gap-2.5">
          {books.map((book, i) => (
            <div key={book._id} className="flex items-center justify-between gap-3">
              <p className="text-sm text-foreground truncate">
                <span className="text-dim mr-2">{i + 1}.</span>{book.title}
              </p>
              <p className="text-sm text-accent flex-shrink-0">{book.totalSold} sold</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TopBooksCard;