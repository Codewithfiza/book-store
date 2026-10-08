"use client";
import { useState, useEffect } from 'react';

const PendingAgingCard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/dashboard/pending-aging')
      .then((res) => res.json())
      .then((json) => { setData(json); setLoading(false); });
  }, []);

  return (
    <div className="border border-wood rounded-xl bg-surface p-5">
      <p className="text-xs text-dim mb-2">Pending Orders (3+ days)</p>
      {loading ? (
        <p className="text-sm text-muted">Loading...</p>
      ) : (
        <>
          <p className={`font-display text-2xl ${data.count > 0 ? 'text-accent' : 'text-glow'}`}>
            {data.count}
          </p>
          {data.count > 0 && (
            <div className="mt-3 flex flex-col gap-1.5">
              {data.orders.map((o) => (
                <p key={o._id} className="text-xs text-muted truncate">
                  {o.orderNumber} · {o.customer.firstName} {o.customer.lastName}
                </p>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PendingAgingCard;