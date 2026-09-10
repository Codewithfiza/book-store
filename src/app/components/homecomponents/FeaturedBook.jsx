"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import React, { useRef } from "react";
import ShopCartActions from "../common/ShopCartIcons";

const books = [
  {
    title: "Pride and Prejudice",
    author: "Jane Austen",
    blurb:
      "Elizabeth Bennet navigates love, family pressure, and her own prejudice as she clashes with the proud Mr. Darcy — a sharp, witty look at manners and marriage in Regency England.",
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1pxqTTmRLO2TOVKgpHL9gzqLYg5lJiNRhiHsDo6KE8g&s=10",
    href: "/shop/romance/pride-and-prejudice",
  },
  {
    title: "Frankenstein",
    author: "Mary Shelley",
    blurb:
      "A brilliant but reckless scientist gives life to a creature of his own making — and unravels his own life in the process. A haunting meditation on ambition and responsibility.",
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1pxqTTmRLO2TOVKgpHL9gzqLYg5lJiNRhiHsDo6KE8g&s=10",
    href: "/shop/frankenstein",
  },
  {
    title: "Dracula",
    author: "Bram Stoker",
    blurb:
      "A young solicitor's visit to a remote Transylvanian castle unleashes an ancient evil upon England. The novel that defined the modern vampire myth.",
    src: "https://covers.openlibrary.org/b/isbn/9780141439846-L.jpg",
    href: "/shop/dracula",
  },
  {
    title: "The Picture of Dorian Gray",
    author: "Oscar Wilde",
    blurb:
      "A young man remains eternally youthful while his portrait bears the marks of his moral decay — a dark, glittering fable about vanity and hidden sin.",
    src: "https://covers.openlibrary.org/b/isbn/9780141439570-L.jpg",
    href: "/shop/dorian-gray",
  },
  {
    title: "Moby-Dick",
    author: "Herman Melville",
    blurb:
      "Captain Ahab's obsessive hunt for the white whale becomes a sprawling, philosophical voyage into obsession, fate, and the vastness of the sea.",
    src: "https://covers.openlibrary.org/b/isbn/9780142437247-L.jpg",
    href: "/shop/moby-dick",
  },
];

const StickyCard_001 = ({ i, title, author, blurb, src, href, progress, range, targetScale }) => {
  const container = useRef(null);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div ref={container} className="sticky top-0 flex h-screen items-center justify-center px-4">
      <motion.div
        style={{ scale, top: `calc(-5vh + ${i * 20 + 20}px)`, zIndex: i }}
        className="relative -top-1/4 flex w-full max-w-4xl origin-top flex-col overflow-hidden rounded-3xl border border-white/10 bg-[var(--color-surface)]/30 shadow-[0_8px_40px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:min-h-[420px] sm:flex-row"
      >
        <div className="flex w-full flex-shrink-0 items-center justify-center p-6 sm:w-[42%] sm:p-8">
          <img
            src={src}
            alt={title}
            className="h-[180px] w-full rounded-xl object-cover sm:h-full sm:max-h-[360px]"
          />
        </div>

        <div className="flex flex-1 flex-col justify-center gap-3 p-6 sm:p-10">
          <h3 className="font-[var(--font-display)] text-xl font-semibold text-[var(--color-text)] sm:text-2xl md:text-3xl">
            {title}
          </h3>
          <p className="text-sm text-[var(--color-text)]/70">{author}</p>
          <p className="line-clamp-4 text-sm leading-relaxed text-[var(--color-text)]/80 sm:text-base">
            {blurb}
          </p>
          <a
            href={href}
            className="mt-2 inline-flex w-fit items-center gap-2 font-[var(--font-display)] text-sm font-semibold uppercase tracking-wide text-[var(--color-accent)] transition-colors hover:text-[var(--color-primary)]"
          >
            Read More <span aria-hidden="true">→</span>
          </a>
        </div>
      </motion.div>
    </div>
  );
};

const FeaturedBook = () => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  return (
    <section className="relative w-full bg-[var(--color-bg)]">
      <h2 className="relative mb-10 pt-16 text-center font-[var(--font-display)] text-2xl font-semibold uppercase tracking-wide text-[var(--color-text)] sm:text-3xl">
        Best Selling Books
      </h2>

      <main ref={container} className="relative flex w-full flex-col items-center ">
        {books.map((book, i) => {
          const targetScale = Math.max(0.5, 1 - (books.length - i - 1) * 0.1);
          return (
            <StickyCard_001
              key={`book_${i}`}
              i={i}
              {...book}
              progress={scrollYProgress}
              range={[i * 0.25, 1]}
              targetScale={targetScale}
            />
          );
        })}
      </main>

      <ShopCartActions />
    </section>
  );
};

export { FeaturedBook, StickyCard_001 };
export default FeaturedBook;