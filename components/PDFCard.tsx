'use client';

import { PDF } from '@/types';
import { Download, FileText, Lock } from 'lucide-react';
import { useState } from 'react';
import { formatDate } from '@/lib/utils';

interface PDFCardProps {
  pdf: PDF;
}

export default function PDFCard({ pdf }: PDFCardProps) {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    if (pdf.isFree) {
      // Free PDF - direct download
      setDownloading(true);
      try {
        const response = await fetch(`/api/download/${pdf.id}`);
        if (response.ok) {
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = pdf.fileName;
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
          document.body.removeChild(a);
        }
      } catch (error) {
        console.error('Download error:', error);
        alert('Failed to download PDF. Please try again.');
      } finally {
        setDownloading(false);
      }
    } else {
      // Paid PDF - add to cart or redirect to purchase/login
      const token = localStorage.getItem('token');
      if (!token) {
        if (confirm('You need to login to purchase this PDF. Redirect to login?')) {
          window.location.href = `/login?redirect=/subject/${pdf.subjectCode}`;
        }
        return;
      }
      
      // Add to cart
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const exists = cart.find((item: any) => item.id === pdf.id);
      if (!exists) {
        cart.push({
          id: pdf.id,
          subjectCode: pdf.subjectCode,
          subjectName: pdf.subjectName,
          contentType: pdf.contentType,
          session: pdf.session,
          price: pdf.price || 0,
        });
        localStorage.setItem('cart', JSON.stringify(cart));
        // Trigger cart update event
        window.dispatchEvent(new Event('cartUpdated'));
      }
      
      // Redirect to cart
      window.location.href = '/cart';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition p-6">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <FileText className="w-5 h-5 text-blue-600" />
            <span className="text-xs font-semibold text-gray-500 uppercase">
              {pdf.contentType.replace('-', ' ')}
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-1">Session: {pdf.session}</p>
          {pdf.description && (
            <p className="text-sm text-gray-500 mt-2">{pdf.description}</p>
          )}
        </div>
        {pdf.isFree ? (
          <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded whitespace-nowrap">
            FREE
          </span>
        ) : (
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded whitespace-nowrap">
            ₹{pdf.price || 0}
          </span>
        )}
      </div>

      <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
        <span>{pdf.downloadCount} download{pdf.downloadCount !== 1 ? 's' : ''}</span>
        <span>{formatDate(pdf.uploadDate)}</span>
      </div>

      <button
        onClick={handleDownload}
        disabled={downloading}
        className={`w-full flex items-center justify-center space-x-2 py-2 rounded-lg font-semibold transition ${
          pdf.isFree
            ? 'bg-green-600 text-white hover:bg-green-700'
            : 'bg-blue-600 text-white hover:bg-blue-700'
        } ${downloading ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {downloading ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            <span>Downloading...</span>
          </>
        ) : (
          <>
            {pdf.isFree ? (
              <>
                <Download className="w-4 h-4" />
                <span>Download Free</span>
              </>
            ) : (
              <>
                <Lock className="w-4 h-4" />
                <span>Purchase & Download</span>
              </>
            )}
          </>
        )}
      </button>
    </div>
  );
}
