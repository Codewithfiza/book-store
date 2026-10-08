"use client";
import { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const STATUS_COLORS = {
  pending: '#facc15',
  shipped: '#60a5fa',
  delivered: '#4ade80',
  cancelled: '#f87171',
};

const OrderStatusPieChart = () => {
  const [raw, setRaw] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/dashboard/orders-summary')
      .then((res) => res.json())
      .then((json) => { setRaw(json); setLoading(false); });
  }, []);

  const byStatus = raw.reduce((acc, r) => {
    acc[r._id.status] = (acc[r._id.status] || 0) + r.count;
    return acc;
  }, {});
  const chartData = Object.entries(byStatus).map(([name, value]) => ({ name, value }));

  return (
    <div className="border border-wood rounded-xl bg-surface p-5">
      <p className="text-xs text-dim mb-4">Order Status Breakdown</p>
      {loading ? (
        <p className="text-sm text-muted">Loading...</p>
      ) : (
       <ResponsiveContainer width="100%" height={220}>
  <PieChart>
    <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70}>
      {chartData.map((entry) => (
        <Cell key={entry.name} fill={STATUS_COLORS[entry.name] || '#8b7355'} />
      ))}
    </Pie>
    <Tooltip contentStyle={{ background: '#2c1b12', border: '1px solid #3a2a1f', borderRadius: 8 }} />
    <Legend wrapperStyle={{ fontSize: 12, color: '#cbb9a0' }} />
  </PieChart>
</ResponsiveContainer>
      )}
    </div>
  );
};

export default OrderStatusPieChart;