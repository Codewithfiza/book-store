"use client";

import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '@/app/store/cartSlice';
import { ArrowLeftIcon, TruckIcon, MoneyIcon } from "@phosphor-icons/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from 'react-hot-toast';

const CheckoutPage = () => {
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const router = useRouter();

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    city: '',
  });
  const [errors, setErrors] = useState({});

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = 150;
  const total = subtotal + deliveryFee;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.firstName.trim()) newErrors.firstName = "Required";
    if (!form.lastName.trim()) newErrors.lastName = "Required";
    if (!form.phone.trim()) newErrors.phone = "Required";
    else if (!/^[0-9+\s-]{10,15}$/.test(form.phone)) newErrors.phone = "Enter a valid phone number";
    if (!form.address.trim()) newErrors.address = "Required";
    if (!form.city.trim()) newErrors.city = "Required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    if (!validate()) {
      toast.error("Please fill in all required fields");
      return;
    }

    // No backend yet — stash the order locally so the confirmation page can read it
    const order = {
      items,
      subtotal,
      deliveryFee,
      total,
      customer: form,
      placedAt: new Date().toISOString(),
    };
    localStorage.setItem('lastOrder', JSON.stringify(order));

    dispatch(clearCart());
    toast.success("Order placed!");
    router.push('/confirmation');
  };

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-20 sm:py-28 text-center">
        <p className="text-muted mb-4">Your cart is empty — nothing to check out.</p>
        <Link href="/shop" className="text-primary underline">Browse books</Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-24 sm:pt-28 pb-16">
      <Link
        href="/cart"
        className="inline-flex items-center gap-2 mb-6 sm:mb-8 font-body text-sm text-dim hover:text-primary transition-colors duration-300"
      >
        <ArrowLeftIcon size={18} />
        Back to Cart
      </Link>

      <h1 className="font-display text-2xl sm:text-3xl text-glow mb-8 sm:mb-10">Checkout</h1>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
        {/* Left: form */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          {/* Delivery address */}
          <div>
            <h2 className="font-display text-lg mb-4">Delivery Address</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-dim mb-1.5">First Name*</label>
                <input
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  className="w-full bg-bg border border-wood rounded-md px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary"
                />
                {errors.firstName && <p className="text-xs text-red-400 mt-1">{errors.firstName}</p>}
              </div>
              <div>
                <label className="block text-xs text-dim mb-1.5">Last Name*</label>
                <input
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  className="w-full bg-bg border border-wood rounded-md px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary"
                />
                {errors.lastName && <p className="text-xs text-red-400 mt-1">{errors.lastName}</p>}
              </div>
              <div>
                <label className="block text-xs text-dim mb-1.5">Phone Number*</label>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="03xx-xxxxxxx"
                  className="w-full bg-bg border border-wood rounded-md px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary"
                />
                {errors.phone && <p className="text-xs text-red-400 mt-1">{errors.phone}</p>}
              </div>
              <div>
                <label className="block text-xs text-dim mb-1.5">City*</label>
                <input
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  className="w-full bg-bg border border-wood rounded-md px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary"
                />
                {errors.city && <p className="text-xs text-red-400 mt-1">{errors.city}</p>}
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs text-dim mb-1.5">Address*</label>
                <textarea
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  rows={3}
                  className="w-full bg-bg border border-wood rounded-md px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary resize-none"
                />
                {errors.address && <p className="text-xs text-red-400 mt-1">{errors.address}</p>}
              </div>
            </div>
          </div>

          {/* Delivery option — static */}
          <div>
            <h2 className="font-display text-lg mb-4">Delivery Option</h2>
            <div className="flex items-center gap-3 border border-primary rounded-lg p-4 bg-surface">
              <TruckIcon size={22} className="text-primary flex-shrink-0" />
              <div>
                <p className="text-sm text-foreground">Standard Delivery</p>
                <p className="text-xs text-dim">2–4 business days · Rs {deliveryFee}</p>
              </div>
            </div>
          </div>

          {/* Payment method — static */}
          <div>
            <h2 className="font-display text-lg mb-4">Payment Method</h2>
            <div className="flex items-center gap-3 border border-primary rounded-lg p-4 bg-surface">
              <MoneyIcon size={22} className="text-primary flex-shrink-0" />
              <div>
                <p className="text-sm text-foreground">Cash on Delivery</p>
                <p className="text-xs text-dim">Pay when your order arrives</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: order summary */}
        <div className="lg:col-span-1">
          <div className="border border-wood rounded-xl bg-surface p-5 sm:p-7 sticky top-24">
            <h2 className="font-display text-lg mb-5">Order Summary</h2>

            <div className="flex flex-col gap-4 mb-5 max-h-64 overflow-y-auto pr-1">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-12 h-16 object-cover rounded flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground truncate">{item.title}</p>
                    <p className="text-xs text-dim">Qty: {item.quantity}</p>
                  </div>
                  <p className="text-sm text-primary flex-shrink-0">
                    Rs {item.price * item.quantity}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-3 text-sm border-t border-wood pt-4">
              <div className="flex justify-between text-muted">
                <span>Subtotal</span>
                <span>Rs {subtotal}</span>
              </div>
              <div className="flex justify-between text-muted">
                <span>Delivery Fee</span>
                <span>Rs {deliveryFee}</span>
              </div>
            </div>

            <div className="border-t border-wood mt-4 pt-4 flex justify-between items-center">
              <span className="font-body text-base">Total</span>
              <span className="font-accent text-xl text-primary">Rs {total}</span>
            </div>

            <button
              type="submit"
              className="mt-6 w-full inline-flex justify-center items-center px-6 py-3.5 rounded-md font-accent text-sm bg-accent text-bg shadow-glow transition-shadow duration-300 hover:shadow-glow-lg"
            >
              Place Order
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CheckoutPage;