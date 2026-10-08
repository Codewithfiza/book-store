"use client";
import React from 'react'
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeftIcon } from "@phosphor-icons/react";
import Link from "next/link";
import { useDispatch } from 'react-redux';
import { addToCart } from '@/app/store/cartSlice';
import toast from 'react-hot-toast';


const OfferDetailClient = ({ offer }) => {
    const { image, title, price, offerPrice, description, _id } = offer;
    const discount = Math.round((1 - offerPrice / price) * 100);
    const [quantity, setQuantity] = useState(1);
    const dispatch = useDispatch();

    const increase = () => setQuantity((q) => q + 1);
    const decrease = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

    const handleAddToCart = () => {
        dispatch(addToCart({
            id: _id,
            title,
            price: offerPrice,
            image,
            quantity,
        }));
        toast.success(`${title} added to cart!`);
    };

    return (
        <main className="bg-background min-h-screen pt-28 md:pt-32 pb-10 md:pb-16 px-4 sm:px-6 md:px-10 lg:px-16">
            <div className="max-w-5xl mx-auto">

                <Link
                    href="/offerPage"
                    className="inline-flex items-center gap-2 text-muted hover:text-accent transition-colors duration-300 mb-6 md:mb-8 text-sm md:text-base"
                >
                    <ArrowLeftIcon size={18} />
                    Back to Offers
                </Link>

                <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="relative w-full h-[280px] md:h-[450px] sm:h-[380px] lg:h-[500px] rounded-xl overflow-hidden bg-surface shadow-soft max-w-[420px] md:max-w-none"
                    >
                        {discount > 0 && (
                            <span className="absolute top-4 left-4 z-10 bg-accent text-bg text-sm font-semibold px-3 py-1 rounded-full">
                                {discount}% OFF
                            </span>
                        )}
                        <img
                            src={image}
                            alt={title}
                            className="w-full h-full object-cover"
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                        className="flex flex-col gap-5"
                    >
                        <h1 className="text-foreground font-display text-2xl md:text-4xl">
                            {title}
                        </h1>

                        <div className="flex items-center gap-3">
                            <span className="text-primary font-semibold text-2xl md:text-3xl">
                                Rs {offerPrice}
                            </span>
                            <span className="text-dim line-through text-lg">
                                Rs {price}
                            </span>
                        </div>

                        <p className="text-muted text-sm md:text-base leading-relaxed">
                            {description}
                        </p>

                        <div className="flex items-center gap-4 mt-2">
                            <span className="text-foreground text-sm">Quantity</span>
                            <div className="flex items-center border border-wood rounded-lg overflow-hidden">
                                <button onClick={decrease} className="px-4 py-2 text-primary hover:bg-surface transition-colors">−</button>
                                <span className="px-5 py-2 text-foreground min-w-[3rem] text-center">{quantity}</span>
                                <button onClick={increase} className="px-4 py-2 text-primary hover:bg-surface transition-colors">+</button>
                            </div>
                        </div>

                        <p className="text-muted text-sm">
                            Total: <span className="text-primary font-medium">Rs {offerPrice * quantity}</span>
                        </p>

                        <button
                            onClick={handleAddToCart}
                            className="mt-4 w-full md:w-fit px-8 py-3 rounded-lg bg-primary text-bg font-medium hover:bg-glow hover:shadow-glow transition-all duration-300"
                        >
                            Add to Cart
                        </button>
                    </motion.div>
                </div>
            </div>
        </main>
    )
}

export default OfferDetailClient