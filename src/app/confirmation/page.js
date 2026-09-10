"use client";

import { useEffect, useState } from 'react';
import Link from "next/link";
import { CheckCircleIcon, PackageIcon } from "@phosphor-icons/react";

const ConfirmationPage = () => {
  const [order, setOrder] = useState(null);
  const [orderNo] = useState(() => Math.floor(10000000 + Math.random() * 90000000));

  useEffect(() => {
    const saved = localStorage.getItem('lastOrder');
    if (saved) setOrder(JSON.parse(saved));
  }, []);

  if (!order) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-20 sm:py-28 text-center">
        <p className="text-muted mb-4">No recent order found.</p>
        <Link href="/shop" className="text-primary underline">Browse books</Link>
      </div>
    );
  }

  const { items, subtotal, deliveryFee, total, customer, placedAt } = order;
  const orderDate = new Date(placedAt).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 pt-24 sm:pt-28 pb-16">
      <div className="border border-wood rounded-xl bg-surface overflow-hidden">
        {/* Header */}
        <div className="text-center px-6 sm:px-10 pt-10 sm:pt-12 pb-8">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-primary flex items-center justify-center mx-auto mb-5">
            <CheckCircleIcon size={36} className="text-primary" />
          </div>
          <h1 className="font-display text-xl sm:text-2xl text-glow mb-2">
            Thanks for your order, {customer.firstName}.
          </h1>
          <p className="text-sm text-dim">Order No. {orderNo}</p>
        </div>

        {/* Shipping / date info */}
        <div className="border-t border-wood px-6 sm:px-10 py-8 grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm">
          <div>
            <p className="text-primary text-xs uppercase tracking-wide mb-2">Shipping to</p>
            <p className="text-foreground">{customer.firstName} {customer.lastName}</p>
            <p className="text-muted">{customer.address}</p>
            <p className="text-muted">{customer.city}</p>
          </div>
          <div>
            <p className="text-primary text-xs uppercase tracking-wide mb-2">Payment</p>
            <p className="text-foreground">Cash on Delivery</p>
          </div>
          <div>
            <p className="text-primary text-xs uppercase tracking-wide mb-2">Date ordered</p>
            <p className="text-foreground">{orderDate}</p>
          </div>
        </div>

        {/* Status message + track button */}
        <div className="border-t border-wood px-6 sm:px-10 py-8 text-center">
          <div className="flex items-center justify-center gap-2 text-dim text-sm mb-6">
            <PackageIcon size={18} />
            <span>Your order is being prepared. We'll notify you when it ships.</span>
          </div>
          <button
            disabled
            className="px-8 py-3 rounded-md font-accent text-sm bg-wood text-muted cursor-not-allowed"
            title="Order tracking coming soon"
          >
            Track your order
          </button>
        </div>

        {/* Order summary */}
        <div className="border-t border-wood px-6 sm:px-10 py-8">
          <p className="font-display text-base mb-6 text-center sm:text-left">Your Order Summary</p>

          <div className="flex flex-col gap-5">
            {items.map((item) => (
              <div key={item.id} className="flex flex-col sm:flex-row gap-4">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-20 h-24 sm:w-16 sm:h-20 object-cover rounded-lg flex-shrink-0 mx-auto sm:mx-0"
                />
                <div className="flex-1 flex flex-col sm:flex-row sm:justify-between gap-1 text-center sm:text-left">
                  <div>
                    <p className="text-sm text-foreground">{item.title}</p>
                    {item.author && <p className="text-xs text-dim">by {item.author}</p>}
                    <p className="text-xs text-dim mt-1">Quantity: {item.quantity}</p>
                  </div>
                  <p className="text-sm text-primary flex-shrink-0">
                    Rs {item.price * item.quantity}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-wood mt-6 pt-6 flex flex-col gap-2 text-sm">
            <div className="flex justify-between text-muted">
              <span>Subtotal</span>
              <span>Rs {subtotal}</span>
            </div>
            <div className="flex justify-between text-muted">
              <span>Delivery</span>
              <span>Rs {deliveryFee}</span>
            </div>
            <div className="flex justify-between items-center pt-3 mt-1 border-t border-wood">
              <span className="font-body text-base">Total</span>
              <span className="font-accent text-xl text-primary">Rs {total}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-bg border-t border-wood px-6 sm:px-10 py-6 text-center">
          <Link href="/shop" className="text-sm text-primary underline">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPage;