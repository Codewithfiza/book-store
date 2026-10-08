import React from "react";
import GenreGrid from "../components/shopComponents/GenreGrid";



export default async function ShopPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/genres`, {cache:'no-store',});
  if (!res.ok) {
  throw new Error(`Failed to fetch genres: ${res.status}`);
}
   const genres = await res.json();

  return (
    <div className="max-w-5xl mx-auto px-6 py-20">
      <h1 className="font-display text-2xl text-glow mb-8">Shop by Genre</h1>
      <GenreGrid genres={genres} />
    </div>
  );
}