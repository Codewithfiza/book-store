// Genre.jsx
import GenreType from "../common/GenreType"

const genres = [
  { name: "Mystery & Thriller", image: "/images/genres/mystery.png", href: "/shop/mystery" },
  { name: "Romance", image: "/images/genres/romance.png", href: "/shop/romance" },
  { name: "Sci-Fi & Fantasy", image: "/images/genres/sciFiction.png", href: "/shop/scifi-fantasy" },
  { name: "Self-Help & Non-Fiction", image: "/images/genres/selfhelp.png", href: "/shop/self-help" },
]

export default function Genre() {
  return (
    <section className="overflow-hidden px-4 sm:px-8 py-12 md:py-20 bg-[var(--color-bg)]">
       
      <h2 className="text-center font-[var(--font-display)] text-[var(--color-text)] text-2xl sm:text-3xl md:text-4xl font-semibold mb-8 md:mb-12">
        Explore by Genre
      </h2>
      <GenreType genres={genres} />
    </section>
  )
}