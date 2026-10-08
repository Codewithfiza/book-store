"use client";
import React from 'react'
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const OfferCard = ({offer}) => {
    const { _id, image, title, price, offerPrice } = offer;
    const discount = Math.round((1 - offerPrice / price) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ y: -6 }}
      className="group relative w-full rounded-xl overflow-hidden bg-surface border border-wood shadow-soft hover:shadow-glow transition-shadow duration-300"
    >
      {discount > 0 && (
        <span className="absolute top-3 left-3 z-10 bg-accent text-bg text-xs font-semibold px-2 py-1 rounded-full">
          {discount}% OFF
        </span>
      )}
      <div className="relative w-full h-48 sm:h-56 md:h-64 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="p-4 flex flex-col gap-2">
        <h3 className="text-foreground font-display text-base md:text-lg line-clamp-1">
          {title}
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-primary font-semibold text-lg">Rs {offerPrice}</span>
          <span className="text-dim line-through text-sm">Rs {price}</span>
        </div>

        <Link
          href={`/offerPage/${_id}`}
          className="mt-2 inline-block text-center text-sm font-medium text-bg bg-primary hover:bg-glow transition-colors duration-300 rounded-lg py-2"
        >
          Read More
        </Link>
      </div>
    </motion.div>
  )
}

export default OfferCard