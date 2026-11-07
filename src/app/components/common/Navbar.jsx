"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  List,
  X,
  ShoppingCart,
  Envelope,
  UserCircle,
  SignOut,
} from "@phosphor-icons/react";
import CartIcon from "./CartIcon";
import { useCustomer } from "../auth/CustomerContext";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const accountRef = useRef(null);
  const pathname = usePathname();
  const router = useRouter();
  const { customer, loading, logout } = useCustomer();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the account dropdown when clicking anywhere outside it
  useEffect(() => {
    const onClick = (e) => {
      if (accountRef.current && !accountRef.current.contains(e.target)) {
        setAccountOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const handleLogout = async () => {
    await logout();
    setAccountOpen(false);
    setMenuOpen(false);
    router.push("/");
    router.refresh();
  };

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
            <Link href="/feedback" className="transition-colors hover:text-glow">
              Feedback
            </Link>
          </li>
          <li>
            <Link href="/about" className="transition-colors hover:text-glow">
              About us
            </Link>
          </li>
        </ul>

        {/* Right icons */}
        <div className="flex items-center gap-4">
          <CartIcon />

          <a
            href="mailto:hello@scriptorium.com"
            aria-label="Email"
            className="hidden rounded-full p-2 text-text transition-colors hover:bg-wood/60 hover:text-glow md:inline-flex"
          >
            <Envelope size={22} weight="thin" />
          </a>

          {/* Account: login icon when logged out, name + dropdown when logged in */}
          <div ref={accountRef} className="relative ">
            {loading ? (
              <span className="block h-9 w-9" />
            ) : customer ? (
              <>
                <button
                  onClick={() => setAccountOpen((o) => !o)}
                  aria-label="Account menu"
                  className="flex items-center gap-2 rounded-full p-2 text-text transition-colors hover:bg-wood/60 hover:text-glow"
                >
                  <UserCircle size={22} weight="thin" />
                 <span className="hidden max-w-[8rem] truncate text-sm sm:inline">
  {customer.name.split(" ")[0]}
</span>
                </button>

                {accountOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-lg border border-wood bg-surface p-1 shadow-soft">
                    <p className="truncate px-3 py-2 text-xs text-dim">
                      {customer.email}
                    </p>
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-muted transition-colors hover:bg-wood/60 hover:text-glow"
                    >
                      <SignOut size={18} />
                      Log out
                    </button>
                  </div>
                )}
              </>
            ) : (
              <Link
                href="/account"
                aria-label="Log in"
                className="inline-flex rounded-full p-2 text-text transition-colors hover:bg-wood/60 hover:text-glow"
              >
                <UserCircle size={22} weight="thin" />
              </Link>
            )}
          </div>

          <button
            aria-label="Toggle menu"
             onClick={() => {
    setMenuOpen((o) => !o);
    setAccountOpen(false);
  }}
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
                href="/feedback"
                onClick={() => setMenuOpen(false)}
                className="block transition-colors hover:text-glow"
              >
                Feedback
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                onClick={() => setMenuOpen(false)}
                className="block transition-colors hover:text-glow"
              >
                About us
              </Link>
            </li>
          
          </ul>
        </div>
      )}
    </header>
  );
}