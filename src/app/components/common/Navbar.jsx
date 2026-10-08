"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { List, X, ShoppingCart, Envelope } from "@phosphor-icons/react";
import CartIcon from "./CartIcon";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
   const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

   if (pathname.startsWith("/admin")) return null;
   
  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-bg/80 backdrop-blur-md shadow-soft "
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/logo.jpeg"
            alt="Scriptorium logo"
            width={40}
            height={40}
            className="object-contain"
            priority
          />
          <span className="font-display text-lg text-text tracking-wide">
            Scriptorium
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8 font-body text-sm text-muted">
          <li>
            <Link href="/" className="transition-colors hover:text-glow">
              Home
            </Link>
          </li>
          <li>
            <Link href="/shop" className="transition-colors hover:text-glow">
              Shop
            </Link>
          </li>
          <li>
            <Link href="/about" className="transition-colors hover:text-glow">
              About
            </Link>
          </li>
          <li>
            <Link href="/contact" className="transition-colors hover:text-glow">
              Contact
            </Link>
          </li>
        </ul>

        {/* Right icons */}
        <div className="flex items-center gap-4">
         <CartIcon/>

          <a
            href="mailto:hello@scriptorium.com"
            aria-label="Email"
            className="hidden rounded-full p-2 text-text transition-colors hover:bg-wood/60 hover:text-glow md:inline-flex"
          >
            <Envelope size={22} weight="thin" />
          </a>

          <button
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((o) => !o)}
            className="rounded-full p-2 text-text hover:bg-wood/60 md:hidden"
          >
            {menuOpen ? <X size={24} weight="thin" /> : <List size={24} weight="thin" />}
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}

      {menuOpen && (
        <div className="md:hidden bg-surface/95 backdrop-blur-md border-t border-wood/40 px-6 py-4">
          <ul className="flex flex-col gap-4 font-body text-sm text-muted">
            <li>
              <Link
                href="/"
                onClick={() => setMenuOpen(false)}
                className="block transition-colors hover:text-glow"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/shop"
                onClick={() => setMenuOpen(false)}
                className="block transition-colors hover:text-glow"
              >
                Shop
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                onClick={() => setMenuOpen(false)}
                className="block transition-colors hover:text-glow"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                onClick={() => setMenuOpen(false)}
                className="block transition-colors hover:text-glow"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}