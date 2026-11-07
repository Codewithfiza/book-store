"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function CheckoutGuard({ children }) {
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function check() {
      try {
        const res = await fetch("/api/customer/status");
        if (cancelled) return;

        if (res.ok) {
          setChecked(true); // logged in, show checkout
        } else {
          router.replace("/account?redirect=/checkout");
        }
      } catch {
        if (!cancelled) router.replace("/account?redirect=/checkout");
      }
    }

    check();
    return () => {
      cancelled = true;
    };
  }, [router]);

  if (!checked) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-muted">
        Checking your account...
      </div>
    );
  }

  return children;
}