import { NextRequest, NextResponse } from 'next/server';
import { getPDFById, incrementDownloadCount } from '@/lib/db';
import fs from 'fs';
import path from 'path';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const pdf = getPDFById(params.id);
    
    if (!pdf) {
      return NextResponse.json(
        { error: 'PDF not found' },
        { status: 404 }
      );
    }

    // Check if user has access (for paid PDFs)
    if (!pdf.isFree) {
      const authHeader = request.headers.get('authorization');
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return NextResponse.json(
          { error: 'Authentication required for paid PDFs' },
          { status: 401 }
        );
      }

      // TODO: Verify user has purchased this PDF
      // For now, we'll allow if authenticated
    }

    const filePath = path.join(process.cwd(), 'public', 'pdfs', pdf.filePath);
    
    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: 'PDF file not found on server' },
        { status: 404 }
      );
    }

    // Increment download count
    incrementDownloadCount(pdf.id);

    const fileBuffer = fs.readFileSync(filePath);
    
    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${pdf.fileName}"`,
      },
    });
  } catch (error) {
    console.error('Download error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
