"use client";
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ChartLineIcon, BookOpenIcon, PackageIcon, TagIcon,
  ImageIcon, ChatCircleIcon, ListIcon, XIcon, SignOutIcon
} from "@phosphor-icons/react";

const NAV_ITEMS = [
  { href: '/admin', label: 'Dashboard', icon: ChartLineIcon },
  { href: '/admin/book', label: 'Books', icon: BookOpenIcon },
  { href: '/admin/orders', label: 'Orders', icon: PackageIcon },
  { href: '/admin/genres', label: 'Genres', icon: TagIcon },
  { href: '/admin/banner', label: 'Offer Banner', icon: ImageIcon },
  { href: '/admin/feedback', label: 'Feedback', icon: ChatCircleIcon },
];

const SidebarContent = ({ pathname, onNavigate, onLogout }) => (
  <>
    <div className="font-display text-lg text-glow px-2 pb-5 mb-5 border-b border-wood">
      Scriptorium
    </div>
    <nav className="flex flex-col gap-1 flex-1">
      {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
        const isActive = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            onClick={onNavigate}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-body transition-colors ${
              isActive
                ? 'bg-wood text-glow border-l-2 border-accent'
                : 'text-muted hover:bg-wood/60 hover:text-foreground'
            }`}
          >
            <Icon size={18} />
            {label}
          </Link>
        );
      })}
    </nav>
    <button
      onClick={onLogout}
      className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-body text-muted hover:bg-wood/60 hover:text-red-400 transition-colors mt-4 border-t border-wood pt-4"
    >
      <SignOutIcon size={18} />
      Log Out
    </button>
  </>
);

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  if (pathname === '/admin/login') return null;

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    window.location.href = '/admin/login';
  };

  return (
    <>
      {/* Mobile top bar with hamburger toggle */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 border-b border-wood bg-surface">
        <span className="font-display text-base text-glow">Scriptorium</span>
        <button
          onClick={() => setIsOpen(true)}
          className="text-muted p-1"
          aria-label="Open menu"
        >
          <ListIcon size={22} />
        </button>
      </div>

      {/* Desktop sidebar — always visible */}
      <aside className="hidden md:flex md:flex-col w-60 flex-shrink-0 bg-surface border-r border-wood p-5 h-screen sticky top-0">
        <SidebarContent pathname={pathname} onNavigate={() => {}} onLogout={handleLogout} />
      </aside>

      {/* Mobile drawer overlay */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/60"
            onClick={() => setIsOpen(false)}
          />
          <aside className="relative w-64 bg-surface border-r border-wood p-5 h-full overflow-y-auto flex flex-col">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-muted p-1"
              aria-label="Close menu"
            >
              <XIcon size={20} />
            </button>
            <SidebarContent pathname={pathname} onNavigate={() => setIsOpen(false)} onLogout={handleLogout} />
          </aside>
        </div>
      )}
    </>
  );
};

export default Sidebar;