'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle2, Eye, EyeOff, Lock, Mail } from 'lucide-react';
import Logo from '@/components/Logo';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Login failed');
        return;
      }

      localStorage.setItem('token', data.token);
      router.push(redirect);
    } catch (error) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      <div className="min-h-screen flex">
        {/* Left promo panel */}
        <div className="hidden lg:flex lg:w-1/2 relative bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/banner.png')" }}>
          {/* Soft overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/5 to-black/20" />
          <div className="relative z-10 flex flex-col justify-between p-10 xl:p-12 w-full text-white">
            <div className="flex items-center gap-3">
              <div className="bg-white/80 backdrop-blur-xl rounded-2xl px-4 py-3 border border-white/50 shadow-[0_10px_40px_rgba(0,0,0,0.18)]">
                <Logo />
              </div>
            </div>

            <div className="mt-10">
              <div className="space-y-4 max-w-md drop-shadow-[0_8px_18px_rgba(0,0,0,0.35)]">
                <div className="flex items-center gap-3 text-2xl font-semibold">
                  <CheckCircle2 className="w-7 h-7 text-green-300" />
                  <span>Solved Assignments</span>
                </div>
                <div className="flex items-center gap-3 text-2xl font-semibold">
                  <CheckCircle2 className="w-7 h-7 text-green-300" />
                  <span>Study Notes</span>
                </div>
                <div className="flex items-center gap-3 text-2xl font-semibold">
                  <CheckCircle2 className="w-7 h-7 text-green-300" />
                  <span>Exam Help</span>
                </div>
              </div>

              <div className="mt-10">
                <a
                  href="#"
                  className="inline-flex items-center justify-center bg-white/85 backdrop-blur-xl text-blue-700 font-semibold px-6 py-3 rounded-2xl border border-white/60 shadow-[0_10px_40px_rgba(255,255,255,0.18)] hover:bg-white transition"
                >
                  Join Free Updates
                </a>
              </div>
            </div>

            <div className="text-white/80 text-sm font-light">
              Assignments • Notes • Guidance
            </div>
          </div>
        </div>

        {/* Right form panel */}
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-12 py-12">
          <div className="w-full max-w-md">
            <div className="flex justify-center mb-6">
              <div className="lg:hidden">
                <Logo />
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-white/60 shadow-[0_20px_80px_rgba(0,0,0,0.10)] p-8 sm:p-10">
              <div className="text-center">
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
                  Welcome back <span className="align-middle">👋</span>
                </h1>
                <p className="mt-2 text-gray-600 font-light">Sign in to your account</p>
              </div>

              <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-2xl">
                    {error}
                  </div>
                )}

                <div className="space-y-3">
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 rounded-2xl border border-gray-200 bg-white/70 backdrop-blur-xl focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-300 text-gray-900 placeholder:text-gray-400 shadow-sm"
                      placeholder="Email address"
                    />
                  </div>

                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="current-password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-11 pr-12 py-3 rounded-2xl border border-gray-200 bg-white/70 backdrop-blur-xl focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-300 text-gray-900 placeholder:text-gray-400 shadow-sm"
                      placeholder="Password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Link href="/forgot-password" className="text-sm text-blue-700 hover:text-blue-800 font-medium">
                    Forgot password?
                  </Link>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-2xl font-semibold shadow-[0_10px_40px_rgba(59,130,246,0.35)] hover:from-blue-700 hover:to-blue-800 transition disabled:opacity-60"
                >
                  {loading ? 'Signing in...' : 'Sign In'}
                </button>

                <div className="flex items-center justify-center gap-2 text-sm text-gray-600 pt-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-600" />
                  <span>
                    Secure login • Used by <span className="font-semibold text-gray-900">10,000+</span> IGNOU students
                  </span>
                </div>
              </form>
            </div>

            <p className="text-center text-sm text-gray-600 mt-6">
              Don&apos;t have an account?{' '}
              <Link href="/register" className="font-semibold text-blue-700 hover:text-blue-800">
                Create one
              </Link>{' '}
              <span aria-hidden="true">›</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
