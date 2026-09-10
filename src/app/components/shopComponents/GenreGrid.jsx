"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GenreCard from "./GenreCard";


gsap.registerPlugin(ScrollTrigger);

export default function GenreGrid({ genres }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const cards = containerRef.current.querySelectorAll(".genre-card");

    gsap.set(cards, { x: -80, opacity: 0 });

    const triggers = [];
    cards.forEach((card) => {
      const tween = gsap.to(card, {
        x: 0,
        opacity: 1,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
      triggers.push(tween.scrollTrigger);
    });

    return () => triggers.forEach((t) => t && t.kill());
  }, [genres]);

  return (
    <div
      ref={containerRef}
      className="grid grid-cols-1 md:grid-cols-2 gap-6"
    >
      {genres.map((genre) => (
        <GenreCard key={genre.slug} genre={genre} />
      ))}
    </div>
  );
}