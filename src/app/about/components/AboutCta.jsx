"use client";

import Link from "next/link";
// If your project uses the older package, change this to: from "framer-motion"
import { motion } from "motion/react";

export default function AboutCta() {
  return (
    <section className="px-6 pb-20 pt-4 md:px-12 md:pb-28">
      <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
        {/* dashed connector that draws in, echoing the hero */}
        <motion.span
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, amount: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{ originY: 0 }}
          className="mb-8 h-14 border-l border-dashed border-[#d4a24c]/50"
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
        >
          <h2 className="font-display text-3xl leading-tight text-foreground md:text-5xl">
            Find your next book
          </h2>
          <p className="mx-auto mt-4 max-w-md text-base text-dim">
            Pick a genre, see what is on the shelf, and pay when it reaches
            your door.
          </p>
          <Link
            href="/shop"
            className="mt-8 inline-block rounded-full bg-[#d4a24c] px-7 py-3 text-sm font-medium text-black transition hover:opacity-90"
          >
            Browse the shelves
          </Link>
        </motion.div>
      </div>
    </section>
  );
}