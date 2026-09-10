"use client";

import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQty } from '@/app/store/cartSlice';
import { TrashIcon, MinusIcon, PlusIcon, ArrowLeftIcon } from "@phosphor-icons/react";
import { ShoppingCartIcon } from "@phosphor-icons/react";
import Link from "next/link";
import toast from 'react-hot-toast';

const CartPage = () => {
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = items.length > 0 ? 150 : 0;
  const total = subtotal + deliveryFee;

  const handleRemove=(item)=>{
    dispatch(removeFromCart(item.id));
    toast(`${item.title} removed from cart!`, {icon: '🗑️'});
  }

  
if (items.length === 0) {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-20 sm:py-28 flex flex-col items-center text-center">

          <Link
          href="/shop"
          className="inline-flex items-center gap-2 mb-6 sm:mb-8 font-body text-sm text-dim hover:text-primary transition-colors duration-300"
        >
          <ArrowLeftIcon size={18} />
          Back to Shop
        </Link>

      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border border-wood flex items-center justify-center mb-6">
        <ShoppingCartIcon size={36} className="text-dim" />
      </div>
      <h2 className="font-display text-xl sm:text-2xl text-glow mb-2">Your cart is empty</h2>
      <p className="text-sm sm:text-base text-muted mb-8">
        Looks like you haven't added any books yet.
      </p>
      <Link
        href="/shop"
        className="px-8 py-3 rounded-md font-accent text-sm bg-accent text-bg shadow-glow transition-shadow duration-300 hover:shadow-glow-lg"
      >
       Browse Books
      </Link>
      </div>
  );
}
    


  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-24 sm:pt-28 pb-16">
      <Link
        href="/shop"
        className="inline-flex items-center gap-2 mb-5 sm:mb-6 font-body text-sm text-dim hover:text-primary transition-colors duration-300"
      >
        <ArrowLeftIcon size={18} />
        Back to Shop
      </Link>

      <h1 className="font-display text-2xl sm:text-3xl text-glow mb-8 sm:mb-10">Your Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
        {/* Items list */}
        <div className="lg:col-span-2 flex flex-col gap-5">
          {items.map((item) => (
            <div
              key={item.id}
              className="relative border border-wood rounded-xl bg-surface p-5 sm:p-6"
            >
              {/* Remove — top right corner, out of the flow */}
              <button
                onClick={() =>handleRemove(item)}
                className="absolute top-4 right-4 sm:top-5 sm:right-5 text-dim hover:text-red-500 transition-colors"
                aria-label="Remove item"
              >
                <TrashIcon size={20} />
              </button>

              {/* image is now a left-aligned thumbnail on mobile instead of a stacked full-width row */}
              <div className="flex items-start sm:items-center gap-4 sm:gap-6">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-20 h-24 sm:w-28 sm:h-32 object-cover rounded-lg flex-shrink-0"
                />

                {/* Details — spreads out on desktop, stacks on mobile */}
                <div className="flex-1 min-w-0 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 pr-6 sm:pr-10">
                  <div className="flex-1 min-w-0">
                    <p className="font-body text-base sm:text-lg text-foreground truncate pr-2">
                      {item.title}
                    </p>
                    {item.author && (
                      <p className="text-sm text-dim mt-1">by {item.author}</p>
                    )}
                    <p className="font-accent text-primary text-base sm:text-lg mt-2 sm:hidden">
                      Rs {item.price}
                    </p>
                  </div>

                  <p className="hidden sm:block font-accent text-primary text-base sm:text-lg w-20 flex-shrink-0">
                    Rs {item.price}
                  </p>

                  <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-6">
                    <div className="flex items-center border border-wood rounded-md overflow-hidden">
                      <button
                        onClick={() => dispatch(updateQty({ id: item.id, quantity: item.quantity - 1 }))}
                        className="px-3 py-1.5 hover:bg-bg transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <MinusIcon size={14} />
                      </button>
                      <span className="px-4 text-sm">{item.quantity}</span>
                      <button
                        onClick={() => dispatch(updateQty({ id: item.id, quantity: item.quantity + 1 }))}
                        className="px-3 py-1.5 hover:bg-bg transition-colors"
                        aria-label="Increase quantity"
                      >
                        <PlusIcon size={14} />
                      </button>
                    </div>

                    <p className="text-sm text-dim">
                      = Rs {item.price * item.quantity}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order summary */}
        <div className="lg:col-span-1">
          <div className="border border-wood rounded-xl bg-surface p-6 sm:p-7 sticky top-24">
            <h2 className="font-display text-lg mb-5">Order Summary</h2>

            <div className="flex flex-col gap-3 text-sm">
              <div className="flex justify-between text-muted">
                <span>Subtotal</span>
                <span>Rs {subtotal}</span>
              </div>
              <div className="flex justify-between text-muted">
                <span>Delivery Fee</span>
                <span>Rs {deliveryFee}</span>
              </div>
            </div>

            <div className="border-t border-wood mt-5 pt-5 flex justify-between items-center">
              <span className="font-body text-base">Total</span>
              <span className="font-accent text-xl text-primary">Rs {total}</span>
            </div>

            <Link
              href="/checkout"
              className="mt-6 w-full inline-flex justify-center items-center px-6 py-3.5 rounded-md font-accent text-sm bg-accent text-bg shadow-glow transition-shadow duration-300 hover:shadow-glow-lg"
            >
              Go to Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;