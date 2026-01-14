import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/middleware';
import { getAllPDFs, createPDF } from '@/lib/db';
import { PDF, ContentType, Course, Session } from '@/types';
import fs from 'fs';
import path from 'path';
import { adminDb } from '@/lib/firebaseAdmin';

// Ensure PDFs directory exists
const PDFS_DIR = path.join(process.cwd(), 'public', 'pdfs');
if (!fs.existsSync(PDFS_DIR)) {
  fs.mkdirSync(PDFS_DIR, { recursive: true });
}

export async function GET(request: NextRequest) {
  const auth = requireAdmin(request);
  if (!auth) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  // If Firestore admin is configured, read from Firestore; otherwise use JSON file DB
  if (adminDb) {
    try {
      const snapshot = await adminDb.collection('pdfs').get();
      const pdfs: PDF[] = [];
      snapshot.forEach((doc) => {
        pdfs.push(doc.data() as PDF);
      });
      return NextResponse.json(pdfs);
    } catch (error) {
      console.error('Error fetching PDFs from Firestore, falling back to JSON DB:', error);
    }
  }

  const pdfs = getAllPDFs();
  return NextResponse.json(pdfs);
}

export async function POST(request: NextRequest) {
  const auth = requireAdmin(request);
  if (!auth) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const subjectCode = formData.get('subjectCode') as string;
    const subjectName = formData.get('subjectName') as string;
    const course = formData.get('course') as Course;
    const contentType = formData.get('contentType') as ContentType;
    const session = formData.get('session') as Session;
    const isFree = formData.get('isFree') === 'true';
    const price = formData.get('price') ? parseFloat(formData.get('price') as string) : 0;
    const description = formData.get('description') as string | null;

    if (!file || !subjectCode || !subjectName || !course || !contentType || !session) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Save file
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileName = `${subjectCode}-${Date.now()}-${file.name}`;
    const filePath = path.join(PDFS_DIR, fileName);
    
    fs.writeFileSync(filePath, buffer);

    // Create PDF record
    const pdf: PDF = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      subjectCode,
      subjectName,
      course,
      contentType,
      session,
      fileName: file.name,
      filePath: fileName,
      isFree,
      price: isFree ? undefined : price,
      uploadDate: new Date().toISOString(),
      downloadCount: 0,
      description: description || undefined,
    };

    // If Firestore admin is configured, write to Firestore as primary storage
    if (adminDb) {
      try {
        await adminDb.collection('pdfs').doc(pdf.id).set(pdf);
      } catch (error) {
        console.error('Error saving PDF to Firestore:', error);
      }
    }

    // Always also write to existing JSON DB as fallback
    const createdPDF = createPDF(pdf);
    return NextResponse.json(createdPDF, { status: 201 });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
