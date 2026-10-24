"use client";

import Image from "next/image";
// If your project uses the older package, change this to: from "framer-motion"
import { motion, useReducedMotion } from "motion/react";

// Swap this one line to change the image later
const STORY_IMAGE = "/images/heromobile.png";

const points = [
  ["01", "Start from the shelf", "Browse by genre instead of searching blind."],
  ["02", "Pay on arrival", "Cash on delivery, no card needed."],
  ["03", "Deals you can see", "Offers are marked right on the book."],
];

export default function AboutStory() {
  const reduce = useReducedMotion();
  const dist = reduce ? 0 : 40;

  return (
    <section className="bg-black/20 px-6 py-16 md:px-12 md:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
        {/* Image card */}
        <motion.div
          initial={{ opacity: 0, x: -dist }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="overflow-hidden rounded-xl border border-[#d4a24c]/25 bg-[#2a1d16] shadow-lg shadow-black/30"
        >
          <div className="relative h-64 w-full md:h-80">
            <Image
              src={STORY_IMAGE}
              alt="Shelves at Scriptorium"
              fill
              sizes="(min-width: 1024px) 560px, 100vw"
              className="object-cover object-[center_70%]"
            />
          </div>
          <div className="px-5 py-4">
            <p className="text-sm text-foreground">Every book has a shelf</p>
            <p className="text-xs text-dim">That is where Scriptorium starts</p>
          </div>
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: dist }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <p className="mb-4 text-sm uppercase tracking-widest text-dim">
            Our story
          </p>
          <h2 className="font-display text-3xl leading-tight text-foreground md:text-5xl">
            Why Scriptorium exists
          </h2>
          <p className="mt-6 max-w-md text-base text-dim">
            Big online stores sell everything and help you find nothing.
            Scriptorium starts from the shelf: pick a genre, see what is
            there, order, and pay when the book arrives.
          </p>

          <ul className="mt-8 space-y-5">
            {points.map(([num, title, text], i) => (
              <motion.li
                key={num}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.12 }}
                className="flex gap-4"
              >
                <span className="font-display text-sm text-[#d4a24c]">
                  {num}
                </span>
                <div>
                  <p className="text-sm text-foreground">{title}</p>
                  <p className="text-sm text-dim">{text}</p>
                </div>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}