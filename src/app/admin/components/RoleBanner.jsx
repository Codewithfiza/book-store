"use client";
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

const RoleBanner = () => {
  const [role, setRole] = useState(null);
  const pathname = usePathname();

  useEffect(() => {
     if (pathname === '/admin/login') {
    setRole(null);
    return;
  }
    fetch('/api/auth/me')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => setRole(data?.role ?? null));
  }, [pathname]);

  if (pathname === '/admin/login' || !role) return null;

  if (role === 'viewer') {
    return (
      <div className="mb-6 rounded-lg border border-accent/40 bg-accent/10 px-4 py-3 text-sm text-accent">
        You're logged in as a <b>viewer</b>. You can browse everything, but you can't add, edit, or delete anything.
      </div>
    );
  }

  return (
    <p className="mb-6 text-xs text-dim">
      Logged in as <span className="text-glow">admin</span>
    </p>
  );
};

export default RoleBanner;