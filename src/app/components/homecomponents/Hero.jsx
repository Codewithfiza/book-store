"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import WaveDivider from "../common/WaveDivider";


export default function Hero() {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".hero-eyebrow", { opacity: 0, y: 20, duration: 0.6 })
        .from(
          ".hero-line",
          { opacity: 0, y: 40, duration: 0.8, stagger: 0.15 },
          "-=0.3"
        )
        .from(".hero-subtext", { opacity: 0, y: 20, duration: 0.6 }, "-=0.4")
       .from(".hero-cta-group", { opacity: 0, y: 20, duration: 0.5 }, "-=0.3");
    },
    { scope: containerRef }
  );

  return (
    <>
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden"
    >
      {/* Desktop background */}
      <Image
        src="/images/heroDesktopimage.png"
        alt="A candlelit library desk with a globe, open antique books, and a fireplace"
        fill
        priority
        sizes="100vw"
        className="hidden object-cover md:block"
      />

      {/* Mobile background */}
      <Image
        src="/images/heromobile.png"
        alt="A candlelit library desk with a globe, open antique books, and a fireplace"
        fill
        priority
        sizes="100vw"
        className="object-cover md:hidden"
      />

      {/* Gradient overlay for text contrast */}
      <div className="absolute inset-0 bg-gradient-to-r from-bg/90 via-bg/60 to-transparent md:via-bg/40" />

      {/* Content */}
      <div className="relative z-10 flex h-full items-center px-6 md:px-10">
        <div className="max-w-xl">
          <p className="hero-eyebrow font-accent text-sm uppercase tracking-[0.2em] text-accent">
            Welcome to the Scriptorium Literary Bookstore
          </p>

          <h1 className="mt-4 font-display text-4xl leading-tight text-text sm:text-5xl md:text-6xl">
            <span className="hero-line block">Step into a world</span>
            <span className="hero-line block">of timeless stories</span>
          </h1>

          <p className="hero-subtext mt-6 max-w-md font-body text-base text-muted md:text-lg">
            Discover forgotten tales, ancient knowledge, and endless
            adventures.
          </p>

          <div className=" hero-cta-group mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              href="/shop"
              className=" w-full rounded-md bg-accent px-8 py-3 text-center font-body text-sm font-bold uppercase tracking-wide text-bg transition-transform hover:scale-[1.03] sm:w-auto"
            >
              Browse Collection
            </Link>

            <Link
              href="/reading-room"
              className=" w-full rounded-md border border-accent px-8 py-3 text-center font-body text-sm font-bold uppercase tracking-wide text-accent transition-colors hover:bg-accent/10 sm:w-auto"
            >
              Enter Reading Room
            </Link>
          </div>
        </div>
      </div>
     
     
    </section>
    <WaveDivider/>
    
    </>
    
  );
}