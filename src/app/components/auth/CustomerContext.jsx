"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const CustomerContext = createContext(null);

export function CustomerProvider({ children }) {
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);

  // Ask the server: who is logged in right now?
  const refresh = useCallback(async () => {
    try {
      const res = await fetch("/api/customer/status", { cache: "no-store" });
      setCustomer(res.ok ? await res.json() : null);
    } catch {
      setCustomer(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // Runs once when the site loads
  useEffect(() => {
    refresh();
  }, [refresh]);

  const logout = useCallback(async () => {
    try {
      await fetch("/api/customer/logout", { method: "POST" });
    } catch {}
    setCustomer(null);
  }, []);

  return (
    <CustomerContext.Provider value={{ customer, loading, refresh, logout }}>
      {children}
    </CustomerContext.Provider>
  );
}

export function useCustomer() {
  const ctx = useContext(CustomerContext);
  if (!ctx) {
    throw new Error("useCustomer must be used inside CustomerProvider");
  }
  return ctx;
}