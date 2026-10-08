"use client";

import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';



const AdminBannerPage = ()=>{
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState({
        title:'', subtitle: '', discountPercent:'', imageDesktop:'',imageMobile:'', endDate:'', isActive: true,
    });
    const [status, setStatus] = useState(null);


     const fetchBanner = async () => {
    setLoading(true);
    const res = await fetch('/api/banner');
    const data = await res.json();

    if (data) {
      setForm({
        title: data.title || '',
        subtitle: data.subtitle || '',
        discountPercent: data.discountPercent || '',
        imageDesktop: data.imageDesktop || '',
        imageMobile: data.imageMobile || '',
        endDate: data.endDate ? data.endDate.slice(0, 10) : '', // format for <input type="date">
        isActive: data.isActive,
      });
      setStatus({ isExpired: data.isExpired, isCurrentlyVisible: data.isCurrentlyVisible });
    }
    setLoading(false);
    };

  useEffect(() => {
    fetchBanner();
  }, []);

   const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('/api/banner', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, discountPercent: Number(form.discountPercent) }),
    });

    if (res.ok) {
      toast.success('Banner updated');
      fetchBanner();
    } else {
      const data = await res.json();
      toast.error(data.error || 'Something went wrong');
    }
  };

   if (loading) return <p className="text-dim text-sm pt-32 px-6">Loading banner...</p>;



    return (
    <div className="w-full max-w-3xl mx-auto px-3 sm:px-6 pt-28 sm:pt-32 pb-10 sm:pb-16">
      <h1 className="font-display text-xl sm:text-2xl md:text-3xl text-glow mb-4 sm:mb-8">
        Manage Homepage Banner
      </h1>

      {status && (
        <div className={`mb-6 px-4 py-3 rounded-lg text-sm border ${
          status.isCurrentlyVisible
            ? 'border-green-600 text-green-400 bg-green-950/30'
            : 'border-red-600 text-red-400 bg-red-950/30'
        }`}>
            {status.isCurrentlyVisible
            ? 'Currently showing on homepage'
            : status.isExpired
              ? 'Hidden — end date has passed'
              : 'Hidden — manually turned off'}
        </div>
      )}

      <form onSubmit={handleSubmit} className="border border-wood rounded-xl bg-surface p-4 sm:p-6 flex flex-col gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Title (e.g. Monsoon Reading Sale)"
            required
             className="w-full bg-bg border border-wood rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-primary"
          />
          <input
            name="discountPercent"
            type="number"
            min="0"
            max="100"
            value={form.discountPercent}
            onChange={handleChange}
            placeholder="Discount %"
            required
            className="w-full bg-bg border border-wood rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-primary"
          />
        </div>

        <input
         name="subtitle"
          value={form.subtitle}
          onChange={handleChange}
          placeholder="Subtitle"
          className="w-full bg-bg border border-wood rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-primary"
        />

        <input
          name="imageDesktop"
          value={form.imageDesktop}
          onChange={handleChange}
          placeholder="Desktop image URL"
          className="w-full bg-bg border border-wood rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-primary"
        />

        <input
        name="imageMobile"
          value={form.imageMobile}
          onChange={handleChange}
          placeholder="Mobile image URL"
          className="w-full bg-bg border border-wood rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-primary"
        />

        <div>
          <label className="block text-xs text-dim mb-1.5">Sale end date</label>
          <input
            name="endDate"
            type="date"
            value={form.endDate}
            onChange={handleChange}
            className="w-full bg-bg border border-wood rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-primary"
          />
        </div>
         <label className="flex items-center gap-2 text-sm cursor-pointer">
          <input
            type="checkbox"
            name="isActive"
            checked={form.isActive}
            onChange={handleChange}
            className="w-4 h-4"
          />
          Show banner on homepage (manual switch)
        </label>

        <button
          type="submit"
          className="w-full sm:w-auto px-6 py-2.5 rounded-md font-accent text-sm bg-accent text-bg shadow-glow hover:shadow-glow-lg transition-shadow"
        >
          Save Banner
        </button>
         </form>
    </div>
  );

}

export default AdminBannerPage;