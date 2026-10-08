"use client";
import React from "react";
import { ArrowRight, Tag } from "@phosphor-icons/react";
import Link from "next/link";



export default function OfferBanner({ offer }) {
  if (!offer) return null;

  return (
    <div className="relative w-full rounded-lg overflow-hidden aspect-[4/5] sm:aspect-[2.9/1]">
      {/* Mobile image — visible below sm breakpoint */}
      <img
        src={offer.imageMobile}
        alt={offer.title}
        className="absolute inset-0 w-full h-full object-cover sm:hidden"
      />
      {/* Desktop image — visible at sm breakpoint and up */}
      <img
        src={offer.imageDesktop}
        alt={offer.title}
        className="absolute inset-0 w-full h-full object-cover hidden sm:block"
      />

      {/* Mobile gradient — dark fading up from the bottom */}
      <div
        className="absolute inset-0 sm:hidden"
        style={{
          background:
            "linear-gradient(0deg, rgba(20,18,24,0.85) 0%, rgba(20,18,24,0.55) 35%, rgba(20,18,24,0) 65%)",
        }}
      />
      {/* Desktop gradient — dark fading right from the left */}
      <div
        className="absolute inset-0 hidden sm:block"
        style={{
          background:
            "linear-gradient(90deg, rgba(20,18,24,0.78) 0%, rgba(20,18,24,0.45) 55%, rgba(20,18,24,0.15) 100%)",
        }}
      />

      <div className="absolute inset-0 z-10 flex flex-col justify-end sm:justify-center items-start px-6 py-8 sm:px-10 sm:py-10 max-w-md sm:max-w-lg">
        <div
          className="inline-flex items-center gap-1.5 w-fit px-3 py-1.5 rounded-full text-[14px] sm:text-[15px] mb-4"
          style={{ background: "#C9A227", color: "#1F1B12" }}
        >
          <Tag size={16} weight="fill" />
          {offer.discountPercent}% OFF
        </div>

        <h2
          className="text-white text-[30px] sm:text-[42px] leading-tight mb-3"
          style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
        >
          {offer.title}
        </h2>
        <p className="text-[16px] sm:text-[19px] mb-7" style={{ color: "#E7E2D6" }}>
          {offer.subtitle}
        </p>

        <Link
          href={"/offerPage"}
          className="inline-flex items-center gap-2 w-fit px-6 py-3 rounded-md text-[16px] transition-opacity hover:opacity-90"
          style={{ background: "#7C3F58", color: "#FAF7F2" }}
        >
          See all offers
          <ArrowRight size={18} weight="bold" />
        </Link>
      </div>
    </div>
  );
}