"use client";

import Link from "next/link";
import { ShoppingBagIcon, ShoppingCartIcon } from "@phosphor-icons/react";

export default function ShopCartActions() {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 px-4 sm:px-0 py-8">
      <Link
        href="/shop"
        className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3 rounded-full 
                   bg-primary text-bg font-display font-medium tracking-wide
                   hover:bg-glow transition-colors duration-300"
      >
        <ShoppingBagIcon size={18} weight="bold" />
        Go to Shop
      </Link>

      <Link
        href="/cart"
        className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3 rounded-full 
                   border border-wood text-text font-display font-medium tracking-wide
                   hover:border-primary hover:text-primary transition-colors duration-300"
      >
        <ShoppingCartIcon size={18} weight="bold" />
        See Cart
      </Link>
    </div>
  );
}