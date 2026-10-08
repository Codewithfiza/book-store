"use client";
import { useState, useEffect } from 'react';

const TotalRevenueCard = () => {
  const [months, setMonths] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/dashboard/revenue')
      .then((res) => res.json())
      .then((json) => { setMonths(json); setLoading(false); });
  }, []);

  const totalRevenue = months.reduce((sum, m) => sum + m.totalRevenue, 0);
  const current = months[months.length - 1];
  const previous = months[months.length - 2];
  const change = previous && previous.totalRevenue > 0
    ? (((current.totalRevenue - previous.totalRevenue) / previous.totalRevenue) * 100).toFixed(1)
    : null;
  const isUp = change !== null && Number(change) >= 0;

  return (
    <div className="border border-wood rounded-xl bg-surface p-5">
      <p className="text-xs text-dim mb-2">
        Total Revenue ({months.length} {months.length === 1 ? 'month' : 'months'})
      </p>
      {loading ? (
        <p className="text-sm text-muted">Loading...</p>
      ) : (
        <>
          <p className="font-display text-2xl text-glow">Rs {totalRevenue.toLocaleString()}</p>
          {change !== null && (
            <p className={`text-xs mt-1 ${isUp ? 'text-green-400' : 'text-red-400'}`}>
             {isUp ? '▲' : '▼'} {Math.abs(change)}% vs last month (month to date)
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default TotalRevenueCard;