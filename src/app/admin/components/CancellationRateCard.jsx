"use client";
import { useState, useEffect } from 'react';

const MONTH_NAMES = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const CancellationRateCard = () => {
  const [months, setMonths] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/dashboard/cancellation-rate')
      .then((res) => res.json())
      .then((json) => { setMonths(json); setLoading(false); });
  }, []);

  const current = months[months.length - 1];

  return (
    <div className="border border-wood rounded-xl bg-surface p-5">
      <p className="text-xs text-dim mb-2">Cancellation Rate</p>
      {loading ? (
        <p className="text-sm text-muted">Loading...</p>
      ) : (
        <>
          <p className="font-display text-2xl text-glow">{current?.cancellationRate ?? 0}%</p>
          <p className="text-xs text-muted mt-1">{MONTH_NAMES[current?._id.month]} this month</p>
        </>
      )}
    </div>
  );
};

export default CancellationRateCard;