"use client";
import { useState, useEffect } from 'react';

const DeliveryFeesCard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/dashboard/delivery-fees')
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      });
  }, []);

  return (
    <div className="border border-wood rounded-xl bg-surface p-5">
      <p className="text-xs text-dim mb-2">Delivery Fees Collected</p>
      {loading ? (
        <p className="text-sm text-muted">Loading...</p>
      ) : (
        <p className="font-display text-2xl text-glow">
          Rs {data.totalDeliveryFees.toLocaleString()}
        </p>
      )}
    </div>
  );
};

export default DeliveryFeesCard;