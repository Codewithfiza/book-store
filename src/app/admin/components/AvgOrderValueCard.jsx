"use client";
import { useState, useEffect } from 'react';

const AvgOrderValueCard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/dashboard/avg-order-value')
      .then((res) => res.json())
      .then((json) => { setData(json); setLoading(false); });
  }, []);

  return (
    <div className="border border-wood rounded-xl bg-surface p-5">
      <p className="text-xs text-dim mb-2">Average Order Value</p>
      {loading ? (
        <p className="text-sm text-muted">Loading...</p>
      ) : (
        <>
          <p className="font-display text-2xl text-glow">
            Rs {data.avgOrderValue.toLocaleString()}
          </p>
          <p className="text-xs text-muted mt-1">{data.totalDelivered} delivered orders</p>
        </>
      )}
    </div>
  );
};

export default AvgOrderValueCard;