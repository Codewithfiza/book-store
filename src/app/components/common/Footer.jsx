"use client";

import Link from "next/link";
import {
  InstagramLogoIcon,
  FacebookLogo,
  TwitterLogo,
  EnvelopeSimple,
  Phone,
  MapPin,
  BookOpen,
} from "@phosphor-icons/react";

const footerLinks = {
  Shop: [
    { label: "New Arrivals", href: "/shop/new" },
    { label: "Best Sellers", href: "/shop/best-sellers" },
    { label: "Genres", href: "/genres" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Blog", href: "/blog" },
  ],
  Support: [
    { label: "FAQs", href: "/faq" },
    { label: "Shipping", href: "/shipping" },
    { label: "Returns", href: "/returns" },
  ],
};

const socials = [
  { icon: InstagramLogoIcon, href: "https://instagram.com", label: "Instagram" },
  { icon: FacebookLogo, href: "https://facebook.com", label: "Facebook" },
  { icon: TwitterLogo, href: "https://twitter.com", label: "Twitter" },
];

export default function Footer() {
  return (
    <footer className="relative bg-[url('/images/footerMob.png')] md:bg-[url('/images/footer.png')] bg-cover bg-center bg-no-repeat">
      {/* Blend the navy photo into your brand palette */}
      <div className="absolute inset-0 bg-linear-to-t from-bg via-bg/50 to-bg/10" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-20 pb-8 md:px-10">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-5">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <BookOpen size={28} weight="thin" className="text-glow" />
              <span className="font-display text-xl text-text">Scriptorium</span>
            </div>
            <p className="font-body mt-4 max-w-xs text-sm text-muted">
              A quiet corner for readers — curated books, delivered with care.
            </p>

            <div className="mt-6 flex items-center gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="rounded-full border border-wood/60 p-2 text-text transition-colors hover:border-glow hover:text-glow"
                >
                  <Icon size={18} weight="thin" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="font-display text-sm uppercase tracking-wider text-glow">
                {heading}
              </h4>
              <ul className="font-body mt-4 space-y-2 text-sm text-muted">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="transition-colors hover:text-text">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact strip */}
        <div className="mt-12 flex flex-wrap items-center gap-6 border-t border-wood/40 pt-8 text-sm text-muted">
          <span className="flex items-center gap-2">
            <EnvelopeSimple size={16} weight="thin" />
            hello@scriptorium.com
          </span>
          <span className="flex items-center gap-2">
            <Phone size={16} weight="thin" />
            +92 300 1234567
          </span>
          <span className="flex items-center gap-2">
            <MapPin size={16} weight="thin" />
            Lahore, Pakistan
          </span>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 border-t border-wood/40 pt-6 text-center text-xs text-dim">
          © {new Date().getFullYear()} Scriptorium. All rights reserved.
        </div>
      </div>
    </footer>
  );
}