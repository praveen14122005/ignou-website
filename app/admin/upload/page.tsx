'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Upload, X } from 'lucide-react';
import { Course, ContentType, Session } from '@/types';

export default function UploadPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    file: null as File | null,
    subjectCode: '',
    subjectName: '',
    course: 'BA' as Course,
    contentType: 'assignment' as ContentType,
    session: '2025-2026' as Session,
    isFree: true,
    price: '0',
    description: '',
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, file: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setLoading(true);

    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/admin/login');
      return;
    }

    if (!formData.file) {
      setError('Please select a PDF file');
      setLoading(false);
      return;
    }

    try {
      const uploadData = new FormData();
      uploadData.append('file', formData.file);
      uploadData.append('subjectCode', formData.subjectCode);
      uploadData.append('subjectName', formData.subjectName);
      uploadData.append('course', formData.course);
      uploadData.append('contentType', formData.contentType);
      uploadData.append('session', formData.session);
      uploadData.append('isFree', formData.isFree.toString());
      if (!formData.isFree) {
        uploadData.append('price', formData.price);
      }
      if (formData.description) {
        uploadData.append('description', formData.description);
      }

      const response = await fetch('/api/admin/pdfs', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: uploadData,
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Upload failed');
        return;
      }

      setSuccess(true);
      setTimeout(() => {
        router.push('/admin/pdfs');
      }, 2000);
    } catch (error) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <h1 className="text-4xl font-bold mb-8">Upload PDF</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
          PDF uploaded successfully! Redirecting...
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-6">
        {/* File Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            PDF File *
          </label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-600">
                <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500">
                  <span>Upload a file</span>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="sr-only"
                    required
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              {formData.file && (
                <p className="text-xs text-gray-500 mt-2">{formData.file.name}</p>
              )}
            </div>
          </div>
        </div>

        {/* Subject Code */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Subject Code *
          </label>
          <input
            type="text"
            value={formData.subjectCode}
            onChange={(e) => setFormData({ ...formData, subjectCode: e.target.value.toUpperCase() })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., BHDE-144"
            required
          />
        </div>

        {/* Subject Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Subject Name *
          </label>
          <input
            type="text"
            value={formData.subjectName}
            onChange={(e) => setFormData({ ...formData, subjectName: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., छायावाद"
            required
          />
        </div>

        {/* Course & Content Type */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Course *
            </label>
            <select
              value={formData.course}
              onChange={(e) => setFormData({ ...formData, course: e.target.value as Course })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="BA">BA</option>
              <option value="MA">MA</option>
              <option value="BCA">BCA</option>
              <option value="MCA">MCA</option>
              <option value="BCOM">BCOM</option>
              <option value="MCOM">MCOM</option>
              <option value="CBCS">CBCS</option>
              <option value="OTHER">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Content Type *
            </label>
            <select
              value={formData.contentType}
              onChange={(e) => setFormData({ ...formData, contentType: e.target.value as ContentType })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="assignment">Solved Assignment</option>
              <option value="pyq">Previous Year Question Paper</option>
              <option value="guess-paper">Guess / Sure-Shot Paper</option>
              <option value="notes">Study Notes</option>
            </select>
          </div>
        </div>

        {/* Session */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Session *
          </label>
          <select
            value={formData.session}
            onChange={(e) => setFormData({ ...formData, session: e.target.value as Session })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="2024-2025">2024-2025</option>
            <option value="2025-2026">2025-2026</option>
            <option value="2026-2027">2026-2027</option>
            <option value="OTHER">Other</option>
          </select>
        </div>

        {/* Pricing */}
        <div>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={formData.isFree}
              onChange={(e) => setFormData({ ...formData, isFree: e.target.checked })}
              className="rounded"
            />
            <span className="text-sm font-medium text-gray-700">Free PDF</span>
          </label>
          {!formData.isFree && (
            <div className="mt-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price (₹)
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required={!formData.isFree}
              />
            </div>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description (Optional)
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Additional information about this PDF..."
          />
        </div>

        {/* Submit */}
        <div className="flex space-x-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {loading ? 'Uploading...' : 'Upload PDF'}
          </button>
          <button
            type="button"
            onClick={() => router.push('/admin')}
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
