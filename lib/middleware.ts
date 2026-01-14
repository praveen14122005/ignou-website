import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from './auth';

export function requireAuth(request: NextRequest): { userId: string; role: string } | null {
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }

  const token = authHeader.substring(7);
  const payload = verifyToken(token);
  
  return payload ? { userId: payload.userId, role: payload.role } : null;
}

export function requireAdmin(request: NextRequest): { userId: string } | null {
  const auth = requireAuth(request);
  if (!auth || auth.role !== 'admin') {
    return null;
  }
  return { userId: auth.userId };
}
