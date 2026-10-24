"use client";

import Image from "next/image";
import Link from "next/link";

import { motion, useReducedMotion } from "motion/react";

// Swap this one line to change the image later
const HERO_IMAGE = "/images/heromobile.png";

const card =
  "rounded-xl border border-[#d4a24c]/25 bg-[#2a1d16] shadow-lg shadow-black/30";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: "easeOut" },
});

export default function AboutHero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden px-6 pb-16 pt-24 md:px-12 md:pb-20 md:pt-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
        {/* Text */}
        <div>
          <motion.p
            {...fadeUp(0)}
            className="mb-4 text-sm uppercase tracking-widest text-dim"
          >
            About Scriptorium
          </motion.p>
          <motion.h1
            {...fadeUp(0.1)}
            className="font-display text-4xl leading-tight text-foreground md:text-5xl lg:text-6xl"
          >
            A quiet corner
            <br />
            for loud stories.
          </motion.h1>
          <motion.p
            {...fadeUp(0.2)}
            className="mt-6 max-w-md text-base text-dim"
          >
            Scriptorium is a small online bookshop built around browsing by
            genre, honest prices, and paying only when the book reaches your
            door.
          </motion.p>

          <motion.div {...fadeUp(0.3)} className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/shop"
              className="rounded-full bg-[#d4a24c] px-6 py-3 text-sm font-medium text-black transition hover:opacity-90"
            >
              Browse the shelves
            </Link>
           
          </motion.div>
        </div>

        {/* Card cluster */}
        <div className="w-full max-w-xl justify-self-center">
          {/* genre chips with dashed connectors that draw in */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            {["Fantasy", "Mystery", "History"].map((g, i) => (
              <div key={g} className="flex flex-col items-center">
                <motion.span
                  {...fadeUp(0.2 + i * 0.1)}
                  className="rounded-full border border-[#d4a24c]/50 bg-[#2a1d16] px-4 py-1.5 text-xs text-foreground"
                >
                  {g}
                </motion.span>
                <motion.span
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                  style={{ originY: 0 }}
                  className="h-5 border-l border-dashed border-[#d4a24c]/50"
                />
              </div>
            ))}
          </div>

          {/* middle row: big image card + text card */}
          <div className="grid gap-3 sm:grid-cols-5">
            <motion.div
              {...fadeUp(0.5)}
              className={`${card} overflow-hidden sm:col-span-3`}
            >
              <div className="relative h-40 w-full overflow-hidden">
                <motion.div
                  className="absolute inset-0"
                  initial={{ scale: 1 }}
                  animate={reduce ? { scale: 1 } : { scale: 1.08 }}
                  transition={{ duration: 8, ease: "easeOut" }}
                >
                  <Image
                    src={HERO_IMAGE}
                    alt="Scriptorium bookshop"
                    fill
                    sizes="(min-width: 640px) 300px, 100vw"
                    className="object-cover"
                    priority
                  />
                </motion.div>
              </div>
              <div className="px-4 py-3">
                <p className="text-sm text-foreground">The Reading Room</p>
                <p className="text-xs text-dim">Fantasy · Mystery · History</p>
              </div>
            </motion.div>

            <motion.div
              {...fadeUp(0.6)}
              className={`${card} flex flex-col justify-center gap-3 p-4 sm:col-span-2`}
            >
              <p className="w-fit rounded-lg bg-[#d4a24c]/15 px-3 py-2 text-xs text-foreground">
                How do I pay?
              </p>
              <p className="rounded-lg border border-[#d4a24c]/60 px-3 py-2 text-xs text-foreground">
                Cash on delivery. Pay when the book reaches your door.
              </p>
            </motion.div>
          </div>

          {/* bottom row: three small cards */}
          <div className="mt-3 grid grid-cols-1 gap-3 min-[420px]:grid-cols-3">
            {[
              ["Shelves", "Browse by genre"],
              ["Payment", "Cash on delivery"],
              ["Deals", "Book offers"],
            ].map(([label, title], i) => (
              <motion.div
                key={label}
                {...fadeUp(0.7 + i * 0.1)}
                whileHover={reduce ? undefined : { y: -4 }}
                className={`${card} px-3 py-3`}
              >
                <p className="text-[10px] uppercase tracking-widest text-dim">
                  {label}
                </p>
                <p className="mt-1 text-sm text-foreground">{title}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}