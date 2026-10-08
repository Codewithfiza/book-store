"use client";
import { useState, useEffect } from 'react';

const OrdersSummaryCard = () => {
  const [raw, setRaw] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/dashboard/orders-summary')
      .then((res) => res.json())
      .then((json) => { setRaw(json); setLoading(false); });
  }, []);

  const totalOrders = raw.reduce((sum, r) => sum + r.count, 0);

  return (
    <div className="border border-wood rounded-xl bg-surface p-5">
      <p className="text-xs text-dim mb-2">Total Orders</p>
      {loading ? <p className="text-sm text-muted">Loading...</p> : (
        <p className="font-display text-2xl text-glow">{totalOrders}</p>
      )}
    </div>
  );
};

export default OrdersSummaryCard;