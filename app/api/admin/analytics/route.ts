import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/middleware';
import { getAllPDFs, getAllUsers, getAllPurchases } from '@/lib/db';

export async function GET(request: NextRequest) {
  const auth = requireAdmin(request);
  if (!auth) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  const pdfs = getAllPDFs();
  const users = getAllUsers();
  const purchases = getAllPurchases();

  const totalDownloads = pdfs.reduce((sum, pdf) => sum + pdf.downloadCount, 0);
  const totalRevenue = purchases.reduce((sum, p) => sum + p.amount, 0);

  // Top subjects by downloads
  const subjectDownloads = new Map<string, number>();
  pdfs.forEach(pdf => {
    const current = subjectDownloads.get(pdf.subjectCode) || 0;
    subjectDownloads.set(pdf.subjectCode, current + pdf.downloadCount);
  });

  const topSubjects = Array.from(subjectDownloads.entries())
    .map(([subjectCode, downloadCount]) => ({ subjectCode, downloadCount }))
    .sort((a, b) => b.downloadCount - a.downloadCount)
    .slice(0, 10);

  // Recent uploads
  const recentUploads = pdfs
    .sort((a, b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime())
    .slice(0, 10);

  return NextResponse.json({
    totalPDFs: pdfs.length,
    totalDownloads,
    totalUsers: users.length,
    totalRevenue,
    topSubjects,
    recentUploads,
  });
}
