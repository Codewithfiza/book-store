import React from "react";
import GenreGrid from "../components/shopComponents/GenreGrid";

const genres = [
  {
    name: "Fiction",
    slug: "fiction",
    description: "Stories that pull you in and don't let go — novels, short stories, and everything in between.",
    image: "https://picsum.photos/seed/fiction/600/375",
    bookCount: 42,
  },
  {
    name: "Self-Help",
    slug: "self-help",
    description: "Practical ideas for building better habits, clearer thinking, and a calmer mind.",
    image: "https://picsum.photos/seed/selfhelp/600/375",
    bookCount: 27,
  },
  {
    name: "Academic",
    slug: "academic",
    description: "Textbooks and reference titles across science, history, and the humanities.",
    image: "https://picsum.photos/seed/academic/600/375",
    bookCount: 18,
  },
  {
    name: "Mystery",
    slug: "mystery",
    description: "Whodunits, thrillers, and slow-burn suspense to keep you guessing till the last page.",
    image: "https://picsum.photos/seed/mystery/600/375",
    bookCount: 31,
  },
  {
    name: "Romantic",
    slug: "romantic",
    description: "Practical ideas for building better habits, clearer thinking, and a calmer mind.",
    image: "https://picsum.photos/seed/selfhelp/600/375",
    bookCount: 27,
  },
  {
    name: "Dark Fantasy",
    slug: "dark-fantasy",
    description: "Textbooks and reference titles across science, history, and the humanities.",
    image: "https://picsum.photos/seed/academic/600/375",
    bookCount: 18,
  },
  {
    name: "Comedy",
    slug: "comedy",
    description: "Whodunits, thrillers, and slow-burn suspense to keep you guessing till the last page.",
    image: "https://picsum.photos/seed/mystery/600/375",
    bookCount: 31,
  }
];

export default function ShopPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-20">
      <h1 className="font-display text-2xl text-glow mb-8">Shop by Genre</h1>
      <GenreGrid genres={genres} />
    </div>
  );
}