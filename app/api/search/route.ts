import { NextRequest, NextResponse } from 'next/server';
import { searchPDFs } from '@/lib/db';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q');

  if (!query || query.trim().length === 0) {
    return NextResponse.json([]);
  }

  const results = searchPDFs(query.trim());
  return NextResponse.json(results);
}
