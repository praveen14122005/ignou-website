'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Upload, BarChart3, FileText, Users, DollarSign, TrendingUp, BookOpen, FileQuestion, FileCheck, StickyNote } from 'lucide-react';

export default function AdminDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/admin/login');
      return;
    }

    fetch('/api/auth/me', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        if (data.error || data.role !== 'admin') {
          router.push('/admin/login');
        } else {
          setUser(data);
          loadAnalytics(token);
        }
      })
      .catch(() => {
        router.push('/admin/login');
      })
      .finally(() => setLoading(false));
  }, [router]);

  const loadAnalytics = async (token: string) => {
    try {
      const res = await fetch('/api/admin/analytics', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setAnalytics(data);
    } catch (error) {
      console.error('Failed to load analytics:', error);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Dashboard Overview</h1>
        <p className="text-gray-600">Welcome back, {user?.name}</p>
      </div>

      {/* Stats */}
      {analytics && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Total PDFs</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">{analytics.totalPDFs}</p>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg">
                <FileText className="w-8 h-8 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Total Downloads</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">{analytics.totalDownloads}</p>
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Total Users</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">{analytics.totalUsers}</p>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Total Revenue</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">₹{analytics.totalRevenue.toFixed(2)}</p>
              </div>
              <div className="bg-yellow-50 p-3 rounded-lg">
                <DollarSign className="w-8 h-8 text-yellow-600" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Manage Sections */}
      <h2 className="text-xl font-bold mb-6 text-gray-800">Manage Documents</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <Link
          href="/admin/pdfs?type=assignment"
          className="group bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all hover:border-blue-200"
        >
          <div className="flex items-center space-x-4">
            <div className="bg-indigo-50 p-3 rounded-lg group-hover:bg-indigo-100 transition-colors">
              <FileCheck className="w-8 h-8 text-indigo-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Assignments</h3>
              <p className="text-sm text-gray-500 mt-1">Manage solved assignments</p>
            </div>
          </div>
        </Link>

        <Link
          href="/admin/pdfs?type=pyq"
          className="group bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all hover:border-blue-200"
        >
          <div className="flex items-center space-x-4">
            <div className="bg-orange-50 p-3 rounded-lg group-hover:bg-orange-100 transition-colors">
              <FileQuestion className="w-8 h-8 text-orange-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Previous Year Papers</h3>
              <p className="text-sm text-gray-500 mt-1">Manage PYQs</p>
            </div>
          </div>
        </Link>

        <Link
          href="/admin/pdfs?type=guess-paper"
          className="group bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all hover:border-blue-200"
        >
          <div className="flex items-center space-x-4">
            <div className="bg-teal-50 p-3 rounded-lg group-hover:bg-teal-100 transition-colors">
              <BookOpen className="w-8 h-8 text-teal-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Guess Papers</h3>
              <p className="text-sm text-gray-500 mt-1">Manage guess papers</p>
            </div>
          </div>
        </Link>

        <Link
          href="/admin/pdfs?type=notes"
          className="group bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all hover:border-blue-200"
        >
          <div className="flex items-center space-x-4">
            <div className="bg-pink-50 p-3 rounded-lg group-hover:bg-pink-100 transition-colors">
              <StickyNote className="w-8 h-8 text-pink-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Study Notes</h3>
              <p className="text-sm text-gray-500 mt-1">Manage notes</p>
            </div>
          </div>
        </Link>

        <Link
          href="/admin/upload"
          className="group bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all hover:border-blue-200"
        >
          <div className="flex items-center space-x-4">
            <div className="bg-blue-50 p-3 rounded-lg group-hover:bg-blue-100 transition-colors">
              <Upload className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Upload New</h3>
              <p className="text-sm text-gray-500 mt-1">Add new documents</p>
            </div>
          </div>
        </Link>

        <Link
          href="/admin/pdfs"
          className="group bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all hover:border-blue-200"
        >
          <div className="flex items-center space-x-4">
            <div className="bg-gray-50 p-3 rounded-lg group-hover:bg-gray-100 transition-colors">
              <FileText className="w-8 h-8 text-gray-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">All Documents</h3>
              <p className="text-sm text-gray-500 mt-1">View all uploads</p>
            </div>
          </div>
        </Link>
      </div>

      {/* Top Subjects */}
      {analytics && analytics.topSubjects.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4">Top Subjects by Downloads</h2>
          <div className="space-y-2">
            {analytics.topSubjects.slice(0, 5).map((subject: any, index: number) => (
              <div key={subject.subjectCode} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <div className="flex items-center space-x-3">
                  <span className="text-gray-500 font-semibold">#{index + 1}</span>
                  <span className="font-semibold">{subject.subjectCode}</span>
                </div>
                <span className="text-blue-600 font-semibold">{subject.downloadCount} downloads</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
