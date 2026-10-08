"use client";

import React, { useEffect, useRef, useState } from 'react'
import gsap from "gsap";
import Link from "next/link";
import { ArrowLeftIcon, MinusIcon, PlusIcon } from "@phosphor-icons/react";

import ReviewSection from './ReviewSection';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/app/store/cartSlice';
import toast from 'react-hot-toast';

// show "Only X left" when stock is at or below this number
const LOW_STOCK_LIMIT = 5;

const BookDetail = ({ book }) => {
  const { title, author, price, image, description, slug, genre, _id } = book;

  const stock = book.stock ?? 0; // older books may not have stock yet
  const inStock = stock > 0;
  const isLowStock = inStock && stock <= LOW_STOCK_LIMIT;

  const imageRef = useRef(null);
  const contentRef = useRef(null);
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);

  const increaseQty = () => setQty((prev) => Math.min(stock, prev + 1));
  const decreaseQty = () => setQty((prev) => Math.max(1, prev - 1));

  const handleAddToCart = () => {
    if (!inStock) return;

    dispatch(addToCart({
      id: _id,
      title,
      author,
      price,
      image,
      stock, // sent along so the cart can also cap quantity
      quantity: Math.min(qty, stock),
    }));
    toast.success(`${title} added to cart!`);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        imageRef.current,
        { opacity: 0, x: -40 },
        { opacity: 1, x: 0, duration: 0.8 }
      ).fromTo(
        contentRef.current.children,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.12 },
        "-=0.5" // overlap with image animation
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 pt-24 sm:pt-32 pb-10 sm:pb-16">

      {/* Go back link */}
      <Link
        href={`/shop/${genre.slug}`}
        className="inline-flex items-center gap-2 mb-6 sm:mb-8 font-body text-sm text-dim hover:text-primary transition-colors duration-300"
      >
        <ArrowLeftIcon size={18} />
        Back to {genre.name.charAt(0).toUpperCase() + genre.name.slice(1)}
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
        {/* Book image — padded wrapper, capped width */}
        <div className="p-4 sm:p-6 border border-wood rounded-xl bg-surface shadow-soft max-w-xs sm:max-w-sm mx-auto md:mx-0">
          <div
            ref={imageRef}
            className="relative w-full aspect-[2/3] rounded-lg overflow-hidden opacity-0"
          >
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Book details */}
        <div ref={contentRef} className="flex flex-col gap-4">
          <h1 className="font-display text-2xl sm:text-3xl text-glow opacity-0">
            {title}
          </h1>
          <p className="font-body text-sm sm:text-base text-dim opacity-0">
            by {author}
          </p>
          <p className="font-accent text-xl sm:text-2xl text-primary opacity-0">
            ${price}
          </p>

          {/* Stock status */}
          <p
            className={`font-body text-sm opacity-0 ${
              !inStock ? 'text-red-500' : isLowStock ? 'text-accent' : 'text-dim'
            }`}
          >
            {!inStock ? 'Out of stock' : isLowStock ? `Only ${stock} left` : 'In stock'}
          </p>

          <p className="font-body text-sm sm:text-base text-muted leading-relaxed opacity-0">
            {description}
          </p>

          {/* Quantity stepper — only when the book can be bought */}
          {inStock && (
            <div className="flex items-center gap-4 opacity-0">
              <div className="flex items-center border border-wood rounded-md overflow-hidden">
                <button
                  onClick={decreaseQty}
                  disabled={qty <= 1}
                  className="px-3 py-2 hover:bg-surface transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  aria-label="Decrease quantity"
                >
                  <MinusIcon size={16} />
                </button>
                <span className="px-4 font-body text-sm">{qty}</span>
                <button
                  onClick={increaseQty}
                  disabled={qty >= stock}
                  className="px-3 py-2 hover:bg-surface transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  aria-label="Increase quantity"
                >
                  <PlusIcon size={16} />
                </button>
              </div>
            </div>
          )}

          <button
            onClick={handleAddToCart}
            disabled={!inStock}
            className="mt-4 w-fit inline-flex items-center gap-2 px-6 py-3 rounded-md font-accent text-sm bg-accent text-bg shadow-glow transition-shadow duration-300 hover:shadow-glow-lg opacity-0 disabled:bg-wood disabled:text-dim disabled:shadow-none disabled:hover:shadow-none disabled:cursor-not-allowed"
          >
            {inStock ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
      </div>

      <ReviewSection bookId={_id} initialReviews={book.reviews} />
    </section>
  )
}

export default BookDetail