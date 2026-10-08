"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import ShopCartActions from "../common/ShopCartIcons";



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
  const contain = useRef(null);
   const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { scrollYProgress } = useScroll({
    target: contain,
    offset: ["start end", "end start"],
  });



  const fetchFeatured = async () => {
      try {
        const res = await fetch("/api/featured-books");
        const data = await res.json();

        const formatted = data.map((f) => ({
          title: f.book.title,
          author: f.book.author,
          blurb: f.book.description,
          src: f.book.image,
          href: `/shop/${f.book.slug}`,
        }));
         setBooks(formatted);
      } catch (error) {
        console.error("Failed to load featured books:", error);
      } finally {
        setLoading(false);
      }
    };


    useEffect(()=>{
      fetchFeatured();
    }, [])

    if (loading || books.length === 0) return null;

   
  return (
    <section className="relative w-full bg-[var(--color-bg)]">
      <h2 className="relative mb-10 pt-16 text-center font-[var(--font-display)] text-2xl font-semibold uppercase tracking-wide text-[var(--color-text)] sm:text-3xl">
        Best Selling Books
      </h2>

      <main ref={contain} className="relative flex w-full flex-col items-center ">
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