'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

type Notice = {
  title: string;
  link: string;
  date?: string;
  isNew?: boolean;
};

export default function Notifications() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/api/notifications', { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to load notifications');
        const data = await res.json();
        setNotices(data.notices || []);
      } catch (e) {
        console.error(e);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-white via-slate-50/50 to-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center mb-12 md:mb-16">
          <div className="flex items-center space-x-3 bg-white/60 backdrop-blur-xl px-6 py-3 rounded-2xl border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.06)]">
            <svg className="w-6 h-6 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
            </svg>
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Latest IGNOU Notifications
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto mb-10">
          {loading &&
            Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="bg-white/70 backdrop-blur-xl rounded-3xl border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.06)] p-8 animate-pulse"
              >
                <div className="h-4 bg-slate-200 rounded w-3/4 mb-3" />
                <div className="h-4 bg-slate-200 rounded w-1/2 mb-2" />
                <div className="h-4 bg-slate-200 rounded w-2/3" />
              </div>
            ))}

          {!loading && notices.length === 0 && (
            <div className="md:col-span-3 text-center text-gray-600">
              {error ? 'Unable to load notifications right now.' : 'No notifications available.'}
            </div>
          )}

          {!loading &&
            notices.map((notice, idx) => (
              <div
                key={notice.link || idx}
                className="group bg-white/70 backdrop-blur-xl rounded-3xl border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-[0_20px_60px_rgb(0,0,0,0.12)] transition-all duration-500 p-8 transform hover:-translate-y-2"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-500/30">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Link
                        href={notice.link || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-900 font-semibold hover:text-blue-600 transition"
                      >
                        {notice.title}
                      </Link>
                      {notice.isNew && (
                        <span className="text-xs font-bold text-white bg-green-500 px-2 py-1 rounded-full shadow-md">
                          NEW
                        </span>
                      )}
                    </div>
                    {notice.date && <p className="text-xs text-gray-500">Date: {notice.date}</p>}
                  </div>
                </div>
              </div>
            ))}
        </div>

        <div className="text-center">
          <Link
            href="https://www.ignou.ac.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gradient-to-r from-blue-600 to-blue-700 text-white px-10 py-4 rounded-2xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-[0_10px_40px_rgba(59,130,246,0.3)] hover:shadow-[0_20px_60px_rgba(59,130,246,0.4)] transform hover:-translate-y-1 hover:scale-105"
          >
            View All Notices
          </Link>
        </div>
      </div>
    </section>
  );
}
