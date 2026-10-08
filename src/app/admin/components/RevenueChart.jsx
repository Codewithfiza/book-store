"use client";
import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const MONTH_NAMES = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const RevenueChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/dashboard/revenue')
      .then((res) => res.json())
      .then((json) => {
        const formatted = json.map((entry) => ({
          month: MONTH_NAMES[entry._id.month],
          revenue: entry.totalRevenue,
        }));
        setData(formatted);
        setLoading(false);
      });
  }, []);

  return (
    <div className="border border-wood rounded-xl bg-surface p-5">
      <p className="text-xs text-dim mb-4">Monthly Revenue</p>
      {loading ? (
        <p className="text-sm text-muted">Loading...</p>
      ) : (
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={data}>
            <CartesianGrid stroke="#3a2a1f" strokeDasharray="3 3" />
            <XAxis dataKey="month" stroke="#8b7355" fontSize={12} />
            <YAxis stroke="#8b7355" fontSize={12} />
            <Tooltip
              contentStyle={{ background: '#2c1b12', border: '1px solid #3a2a1f', borderRadius: 8 }}
              labelStyle={{ color: '#eadccb' }}
            />
            <Line type="monotone" dataKey="revenue" stroke="#e0a85a" strokeWidth={2} dot={{ fill: '#c2a46d' }} />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default RevenueChart;