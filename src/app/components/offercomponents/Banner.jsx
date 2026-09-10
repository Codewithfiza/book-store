"use client";
import React from 'react'
import { motion } from "framer-motion";

const Banner = () => {
  return (
   <section className="relative w-full h-[45vh] md:h-[55vh] flex items-center justify-center overflow-hidden bg-wood">
      <img
        src="/images/bannerdesktop.png"
        alt="Book Offers"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-[image:var(--background-image-hero-overlay)]" />
  <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 text-center px-4"
      >
        <span className="uppercase tracking-[0.3em] text-accent text-sm md:text-base">
          Limited Time
        </span>
        <h1 className="mt-3 text-3xl md:text-5xl lg:text-6xl font-display text-paper drop-shadow-[0_0_25px_rgba(245,215,161,0.35)]">
          Book Offers & Deals
        </h1>
        <p className="mt-4 text-muted text-sm md:text-lg max-w-xl mx-auto">
          Handpicked reads at prices too good to shelve.
        </p>
         </motion.div>
    </section>
  )
}

export default Banner