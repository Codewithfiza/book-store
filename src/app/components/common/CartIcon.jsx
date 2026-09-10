"use client";

import { useSelector } from 'react-redux';
import { ShoppingCartIcon } from "@phosphor-icons/react";
import Link from "next/link";

const CartIcon = () => {
  const items = useSelector((state) => state.cart.items);
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <Link href="/cart" className="relative inline-flex items-center">
      <ShoppingCartIcon size={24} />
      {itemCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-accent text-bg text-xs font-semibold rounded-full h-5 w-5 flex items-center justify-center">
          {itemCount}
        </span>
      )}
    </Link>
  );
};

export default CartIcon;