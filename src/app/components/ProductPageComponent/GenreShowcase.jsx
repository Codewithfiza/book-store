"use client";
import React from 'react'

import GenreSearchBar from './GenreSearchBar';
import BookCard from './BookCard';
import { useState, useMemo } from "react";
import Link from 'next/link';

const GenreShowcase = ({genre, books}) => {
    const [query, setQuery] = useState("");

  const genreName = genre.charAt(0).toUpperCase() + genre.slice(1);

  
  const filteredBooks = useMemo(() => {
    if (!query.trim()) return books;
    return books.filter((book) =>
      book.title.toLowerCase().includes(query.toLowerCase())
    );
  }, [books, query]);


  return (
   <section className=" max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
      <h1 className=" py-10 font-display text-2xl sm:text-3xl text-glow mb-2 text-center">
        {genreName} Books
      </h1>
      <Link href={"/shop"}  className='text-dim'>Back to shop</Link>
       <p className="font-body text-sm text-dim text-center mb-8">
        {books.length} {books.length === 1 ? "book" : "books"} found
      </p>
       <GenreSearchBar query={query} setQuery={setQuery} genreName={genreName} />

       {filteredBooks.length === 0 ? (
        <p className="text-center font-body text-dim py-16">
          No books match "{query}" in {genreName}.
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
          {filteredBooks.map((book, i) => (
            <BookCard key={book.id} book={book} index={i} />
          ))}
        </div>
      )}
    </section>
  )
}

export default GenreShowcase