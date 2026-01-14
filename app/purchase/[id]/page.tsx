'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Lock, Download } from 'lucide-react';
import { PDF } from '@/types';

export default function PurchasePage() {
  const params = useParams();
  const router = useRouter();
  const [pdf, setPdf] = useState<PDF | null>(null);
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push(`/login?redirect=/purchase/${params.id}`);
      return;
    }

    // Get user info
    fetch('/api/auth/me', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          router.push(`/login?redirect=/purchase/${params.id}`);
        } else {
          setUser(data);
          // Check if already purchased
          if (data.purchasedPDFs?.includes(params.id)) {
            // Already purchased, redirect to download
            router.push(`/subject/${pdf?.subjectCode}`);
          }
        }
      });

    // Get PDF info
    fetch(`/api/admin/pdfs/${params.id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          alert('PDF not found');
          router.push('/');
        } else {
          setPdf(data);
        }
      })
      .finally(() => setLoading(false));
  }, [params.id, router]);

  const handlePurchase = async () => {
    if (!pdf || !user) return;

    setPurchasing(true);
    // TODO: Integrate with payment gateway (Razorpay, Stripe, etc.)
    // For now, we'll simulate a successful purchase
    
    // In a real implementation, you would:
    // 1. Create a payment session with Razorpay/Stripe
    // 2. Redirect to payment gateway
    // 3. Handle payment callback
    // 4. Mark PDF as purchased for user
    // 5. Allow download

    alert('Payment integration coming soon! For now, this is a demo. In production, this would integrate with Razorpay or Stripe.');
    setPurchasing(false);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!pdf) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p className="text-xl text-gray-600">PDF not found</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <Lock className="w-16 h-16 text-blue-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-2">Purchase PDF</h1>
          <p className="text-gray-600">Complete your purchase to download this PDF</p>
        </div>

        <div className="border-t border-b border-gray-200 py-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold">{pdf.subjectCode}</h2>
              <p className="text-gray-600">{pdf.subjectName}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Price</p>
              <p className="text-2xl font-bold text-blue-600">₹{pdf.price || 0}</p>
            </div>
          </div>
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>Content Type:</span>
              <span className="capitalize">{pdf.contentType.replace('-', ' ')}</span>
            </div>
            <div className="flex justify-between">
              <span>Session:</span>
              <span>{pdf.session}</span>
            </div>
            <div className="flex justify-between">
              <span>Course:</span>
              <span>{pdf.course}</span>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-blue-800">
            <strong>Note:</strong> After successful payment, you'll be able to download this PDF immediately. 
            The download link will be available in your account.
          </p>
        </div>

        <button
          onClick={handlePurchase}
          disabled={purchasing}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center space-x-2 disabled:opacity-50"
        >
          {purchasing ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Processing...</span>
            </>
          ) : (
            <>
              <Download className="w-5 h-5" />
              <span>Proceed to Payment</span>
            </>
          )}
        </button>

        <p className="text-center text-sm text-gray-500 mt-4">
          Secure payment powered by Razorpay (Coming Soon)
        </p>
      </div>
    </div>
  );
}
