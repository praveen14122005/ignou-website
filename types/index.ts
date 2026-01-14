export type ContentType = 'assignment' | 'pyq' | 'guess-paper' | 'notes';
export type Course = 'BA' | 'MA' | 'BCA' | 'MCA' | 'BCOM' | 'MCOM' | 'CBCS' | 'OTHER';
export type Session = '2024-2025' | '2025-2026' | '2026-2027' | 'OTHER';

export interface PDF {
  id: string;
  subjectCode: string;
  subjectName: string;
  course: Course;
  contentType: ContentType;
  session: Session;
  fileName: string;
  filePath: string;
  isFree: boolean;
  price?: number;
  uploadDate: string;
  downloadCount: number;
  description?: string;
}

export interface Subject {
  code: string;
  name: string;
  course: Course;
  pdfs: PDF[];
}

export interface User {
  id: string;
  email: string;
  name: string;
  password: string; // hashed
  role: 'user' | 'admin';
  createdAt: string;
  purchasedPDFs: string[]; // PDF IDs
}

export interface Purchase {
  id: string;
  userId: string;
  pdfId: string;
  amount: number;
  date: string;
}

export interface Analytics {
  totalPDFs: number;
  totalDownloads: number;
  totalUsers: number;
  totalRevenue: number;
  topSubjects: { subjectCode: string; downloadCount: number }[];
  recentUploads: PDF[];
}
