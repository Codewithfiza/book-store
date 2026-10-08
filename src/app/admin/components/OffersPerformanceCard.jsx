"use client";
import { useState, useEffect } from 'react';

const OffersPerformanceCard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/dashboard/offers-performance')
      .then((res) => res.json())
      .then((json) => { setData(json); setLoading(false); });
  }, []);

  const total = data ? data.offerRevenue + data.regularRevenue : 0;
  const offerShare = total > 0 ? ((data.offerRevenue / total) * 100).toFixed(1) : 0;

  return (
    <div className="border border-wood rounded-xl bg-surface p-5">
      <p className="text-xs text-dim mb-2">Offers Performance</p>
      {loading ? (
        <p className="text-sm text-muted">Loading...</p>
      ) : (
        <>
          <p className="font-display text-2xl text-glow">{offerShare}%</p>
          <p className="text-xs text-muted mt-1">
            Rs {data.offerRevenue.toLocaleString()} from offers · Rs {data.regularRevenue.toLocaleString()} regular
          </p>
        </>
      )}
    </div>
  );
};

export default OffersPerformanceCard;