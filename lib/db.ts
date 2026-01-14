import fs from 'fs';
import path from 'path';
import { PDF, User, Purchase, Subject, Course, ContentType, Session } from '@/types';

const DATA_DIR = path.join(process.cwd(), 'data');
const PDFS_FILE = path.join(DATA_DIR, 'pdfs.json');
const USERS_FILE = path.join(DATA_DIR, 'users.json');
const PURCHASES_FILE = path.join(DATA_DIR, 'purchases.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initialize files if they don't exist
function ensureFile(filePath: string, defaultValue: any) {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify(defaultValue, null, 2));
  }
}

ensureFile(PDFS_FILE, []);
ensureFile(USERS_FILE, []);
ensureFile(PURCHASES_FILE, []);

// PDF Operations
export function getAllPDFs(): PDF[] {
  try {
    const data = fs.readFileSync(PDFS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export function getPDFById(id: string): PDF | null {
  const pdfs = getAllPDFs();
  return pdfs.find(p => p.id === id) || null;
}

export function getPDFsBySubjectCode(subjectCode: string): PDF[] {
  const pdfs = getAllPDFs();
  return pdfs.filter(p => p.subjectCode.toLowerCase() === subjectCode.toLowerCase());
}

export function getPDFsByCourse(course: Course): PDF[] {
  const pdfs = getAllPDFs();
  return pdfs.filter(p => p.course === course);
}

export function createPDF(pdf: PDF): PDF {
  const pdfs = getAllPDFs();
  pdfs.push(pdf);
  fs.writeFileSync(PDFS_FILE, JSON.stringify(pdfs, null, 2));
  return pdf;
}

export function updatePDF(id: string, updates: Partial<PDF>): PDF | null {
  const pdfs = getAllPDFs();
  const index = pdfs.findIndex(p => p.id === id);
  if (index === -1) return null;
  
  pdfs[index] = { ...pdfs[index], ...updates };
  fs.writeFileSync(PDFS_FILE, JSON.stringify(pdfs, null, 2));
  return pdfs[index];
}

export function deletePDF(id: string): boolean {
  const pdfs = getAllPDFs();
  const filtered = pdfs.filter(p => p.id !== id);
  if (filtered.length === pdfs.length) return false;
  
  fs.writeFileSync(PDFS_FILE, JSON.stringify(filtered, null, 2));
  return true;
}

export function incrementDownloadCount(id: string): void {
  const pdf = getPDFById(id);
  if (pdf) {
    updatePDF(id, { downloadCount: pdf.downloadCount + 1 });
  }
}

// User Operations
export function getAllUsers(): User[] {
  try {
    const data = fs.readFileSync(USERS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export function getUserByEmail(email: string): User | null {
  const users = getAllUsers();
  return users.find(u => u.email === email) || null;
}

export function getUserById(id: string): User | null {
  const users = getAllUsers();
  return users.find(u => u.id === id) || null;
}

export function createUser(user: User): User {
  const users = getAllUsers();
  users.push(user);
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
  return user;
}

export function updateUser(id: string, updates: Partial<User>): User | null {
  const users = getAllUsers();
  const index = users.findIndex(u => u.id === id);
  if (index === -1) return null;
  
  users[index] = { ...users[index], ...updates };
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
  return users[index];
}

// Purchase Operations
export function getAllPurchases(): Purchase[] {
  try {
    const data = fs.readFileSync(PURCHASES_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export function createPurchase(purchase: Purchase): Purchase {
  const purchases = getAllPurchases();
  purchases.push(purchase);
  fs.writeFileSync(PURCHASES_FILE, JSON.stringify(purchases, null, 2));
  return purchase;
}

export function getPurchasesByUserId(userId: string): Purchase[] {
  const purchases = getAllPurchases();
  return purchases.filter(p => p.userId === userId);
}

// Subject grouping
export function getSubjectsByCourse(course: Course): Subject[] {
  const pdfs = getPDFsByCourse(course);
  const subjectMap = new Map<string, PDF[]>();
  
  pdfs.forEach(pdf => {
    const key = pdf.subjectCode.toLowerCase();
    if (!subjectMap.has(key)) {
      subjectMap.set(key, []);
    }
    subjectMap.get(key)!.push(pdf);
  });
  
  return Array.from(subjectMap.entries()).map(([code, pdfs]) => ({
    code: pdfs[0].subjectCode,
    name: pdfs[0].subjectName,
    course: pdfs[0].course,
    pdfs,
  }));
}

export function searchPDFs(query: string): PDF[] {
  const pdfs = getAllPDFs();
  const lowerQuery = query.toLowerCase();
  return pdfs.filter(p => 
    p.subjectCode.toLowerCase().includes(lowerQuery) ||
    p.subjectName.toLowerCase().includes(lowerQuery)
  );
}
