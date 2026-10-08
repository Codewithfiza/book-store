"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error || 'Login failed');
      return;
    }

    router.push('/admin');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-sm border border-wood rounded-xl bg-surface p-6 flex flex-col gap-4">
        <h1 className="font-display text-xl text-glow mb-2">Admin Login</h1>

        <div>
          <label className="block text-xs text-dim mb-1.5">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full bg-bg border border-wood rounded-md px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary"
          />
        </div>

        <div>
          <label className="block text-xs text-dim mb-1.5">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full bg-bg border border-wood rounded-md px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary"
          />
        </div>

        {error && <p className="text-xs text-red-400">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="mt-2 w-full px-6 py-2.5 rounded-md font-accent text-sm bg-accent text-bg shadow-glow hover:shadow-glow-lg transition-shadow disabled:opacity-50"
        >
          {loading ? 'Logging in...' : 'Log In'}
        </button>
      </form>
    </div>
  );
}