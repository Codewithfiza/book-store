"use client";

import React from 'react'

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const BookCard = ({book, index=0}) => {
    const { title, author, price, image, slug, genre } = book;
     const cardRef = useRef(null);

     useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          delay: (index % 4) * 0.08,
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        }
      );
    }, cardRef);

    return () => ctx.revert();
  }, [index]);


  return (
    <div
      ref={cardRef}
      className="book-card group relative rounded-xl overflow-hidden border border-wood shadow-soft bg-surface opacity-0"
    >
      {/* padding added here — image no longer touches card edges */}
      <div className="p-4 pb-0">
        <div className="relative w-full aspect-[2/3] overflow-hidden rounded-lg">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </div>
      </div>
       <div className="p-4 flex flex-col gap-1">
        <h3 className="font-display text-base sm:text-lg text-glow break-words line-clamp-1">
          {title}
        </h3>
        <p className="font-body text-xs sm:text-sm text-dim">{author}</p>
        <p className="font-accent text-sm sm:text-base text-primary mt-1">
          ${price}
        </p>

        <Link
          href={`/shop/${genre}/${slug}`}
          className="mt-3 inline-flex items-center justify-center gap-2 w-full px-4 py-2 rounded-md font-accent text-[13px] sm:text-sm bg-accent text-bg shadow-glow transition-shadow duration-300 hover:shadow-glow-lg whitespace-nowrap"
        >
          Read More
        </Link>
      </div>
       </div>
  )
}

export default BookCard