"use client";

import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { CaretDownIcon, CaretUpIcon, PackageIcon } from "@phosphor-icons/react";

const STATUS_OPTIONS = ['pending', 'shipped', 'delivered', 'cancelled'];

const STATUS_STYLES = {
  pending:   'bg-yellow-400/10 text-yellow-400 border-yellow-400/30',
  shipped:   'bg-blue-400/10 text-blue-400 border-blue-400/30',
  delivered: 'bg-green-400/10 text-green-400 border-green-400/30',
  cancelled: 'bg-red-400/10 text-red-400 border-red-400/30',
};

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);

  const fetchOrders = async () => {
    setLoading(true);
    const res = await fetch('/api/orders');
    const data = await res.json();
    setOrders(data);
    setLoading(false);
  };

  useEffect(() => { fetchOrders(); }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    const res = await fetch(`/api/orders/${orderId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    });
    if (res.ok) {
      toast.success(`Status updated to "${newStatus}"`);
      setOrders((prev) =>
        prev.map((o) => (o._id === orderId ? { ...o, status: newStatus } : o))
      );
    } else {
      toast.error('Failed to update status');
    }
  };

  const pendingCount = orders.filter((o) => o.status === 'pending').length;

  return (
    <div className="w-full px-4 sm:px-6 lg:px-10 pt-24 sm:pt-28 pb-16">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-8">
        <h1 className="font-display text-2xl sm:text-3xl text-glow">Orders</h1>
        {pendingCount > 0 && (
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 text-xs font-accent w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
            {pendingCount} pending
          </span>
        )}
      </div>

      {loading ? (
        <p className="text-dim text-sm">Loading orders...</p>
      ) : orders.length === 0 ? (
        <div className="flex flex-col items-center py-20 text-center">
          <PackageIcon size={40} className="text-dim mb-4" />
          <p className="text-dim text-sm">No orders yet.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {orders.map((order) => (
            <div
              key={order._id}
              className="w-full border border-wood rounded-xl bg-surface overflow-hidden"
            >
              {/* Order summary row */}
              <div
                className="w-full flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 p-4 sm:p-5 cursor-pointer hover:bg-bg/40 transition-colors"
                onClick={() => setExpandedId(expandedId === order._id ? null : order._id)}
              >
                {/* Order number + status badge */}
                <div className="flex items-center gap-2 flex-wrap flex-1 min-w-0">
                  <p className="font-body text-sm text-foreground">{order.orderNumber}</p>
                  <span className={`text-xs font-accent px-2 py-0.5 rounded-full border ${STATUS_STYLES[order.status]}`}>
                    {order.status}
                  </span>
                </div>

                {/* Customer + meta */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground truncate">
                    {order.customer.firstName} {order.customer.lastName}
                  </p>
                  <p className="text-xs text-dim">
                    {order.customer.city} · {order.items.length} item{order.items.length !== 1 ? 's' : ''} · {new Date(order.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </p>
                </div>

                {/* Total + dropdown + chevron */}
                <div className="flex items-center gap-3 flex-shrink-0">
                  <p className="font-accent text-primary text-sm">Rs {order.total}</p>

                  <select
                    value={order.status}
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                    className="bg-bg border border-wood rounded-md px-2 py-1.5 text-xs focus:outline-none focus:border-primary cursor-pointer"
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>

                  {expandedId === order._id
                    ? <CaretUpIcon size={16} className="text-dim flex-shrink-0" />
                    : <CaretDownIcon size={16} className="text-dim flex-shrink-0" />
                  }
                </div>
              </div>

              {/* Expanded detail */}
              {expandedId === order._id && (
                <div className="border-t border-wood px-4 sm:px-5 py-5 flex flex-col gap-5">

                  {/* Items */}
                  <div>
                    <p className="text-xs text-dim uppercase tracking-widest mb-3">Items</p>
                    <div className="flex flex-col gap-3">
                      {order.items.map((item) => (
                        <div key={item._id} className="flex items-center gap-3">
                          {item.image && (
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-10 h-12 sm:w-12 sm:h-14 object-cover rounded-md flex-shrink-0"
                            />
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-foreground truncate">{item.title}</p>
                            <p className="text-xs text-dim">Qty: {item.quantity} · Rs {item.price} each</p>
                          </div>
                          <p className="text-sm text-primary flex-shrink-0 font-accent">
                            Rs {item.price * item.quantity}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Customer + totals */}
                  <div className="border-t border-wood pt-4 grid grid-cols-1 sm:grid-cols-2 gap-5">

                    {/* Shipping info */}
                    <div className="flex flex-col gap-1 text-sm">
                      <p className="text-xs text-dim uppercase tracking-widest mb-1">Ship to</p>
                      <p className="text-foreground">{order.customer.firstName} {order.customer.lastName}</p>
                      <p className="text-dim">{order.customer.address}</p>
                      <p className="text-dim">{order.customer.city}</p>
                      <p className="text-dim mt-1">{order.customer.phone}</p>
                    </div>

                    {/* Totals */}
                    <div className="flex flex-col gap-2 text-sm">
                      <p className="text-xs text-dim uppercase tracking-widest mb-1">Summary</p>
                      <div className="flex justify-between text-dim">
                        <span>Subtotal</span><span>Rs {order.subtotal}</span>
                      </div>
                      <div className="flex justify-between text-dim">
                        <span>Delivery</span><span>Rs {order.deliveryFee}</span>
                      </div>
                      <div className="flex justify-between text-foreground font-body pt-2 border-t border-wood mt-1">
                        <span>Total</span>
                        <span className="text-primary font-accent">Rs {order.total}</span>
                      </div>
                      <p className="text-xs text-dim mt-1">Cash on Delivery</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminOrdersPage;