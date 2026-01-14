const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(process.cwd(), 'data');
const PDFS_FILE = path.join(DATA_DIR, 'pdfs.json');
const PDFS_DIR = path.join(process.cwd(), 'public', 'pdfs');

// Ensure directories exist
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(PDFS_DIR)) {
  fs.mkdirSync(PDFS_DIR, { recursive: true });
}

function uploadPDF(pdfPath, metadata) {
  // Read existing PDFs
  let pdfs = [];
  try {
    if (fs.existsSync(PDFS_FILE)) {
      const data = fs.readFileSync(PDFS_FILE, 'utf-8');
      pdfs = JSON.parse(data);
    }
  } catch (error) {
    console.error('Error reading PDFs file:', error);
    pdfs = [];
  }

  // Check if PDF file exists
  if (!fs.existsSync(pdfPath)) {
    console.error(`PDF file not found: ${pdfPath}`);
    process.exit(1);
  }

  // Copy PDF to public/pdfs directory
  const fileName = `${metadata.subjectCode}-${Date.now()}-${path.basename(pdfPath)}`;
  const destPath = path.join(PDFS_DIR, fileName);
  fs.copyFileSync(pdfPath, destPath);

  // Create PDF record
  const pdf = {
    id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
    subjectCode: metadata.subjectCode,
    subjectName: metadata.subjectName,
    course: metadata.course,
    contentType: metadata.contentType,
    session: metadata.session,
    fileName: path.basename(pdfPath),
    filePath: fileName,
    isFree: metadata.isFree !== false,
    price: metadata.isFree === false ? (metadata.price || 0) : undefined,
    uploadDate: new Date().toISOString(),
    downloadCount: 0,
    description: metadata.description || undefined,
  };

  pdfs.push(pdf);
  fs.writeFileSync(PDFS_FILE, JSON.stringify(pdfs, null, 2));

  console.log('PDF uploaded successfully!');
  console.log(`Subject Code: ${pdf.subjectCode}`);
  console.log(`Subject Name: ${pdf.subjectName}`);
  console.log(`File: ${pdf.fileName}`);
  console.log(`ID: ${pdf.id}`);
}

// Parse command line arguments
const args = process.argv.slice(2);
if (args.length < 2) {
  console.log('Usage: node scripts/upload-pdf.js <pdf-file-path> <subject-code> [options]');
  console.log('');
  console.log('Options:');
  console.log('  --subject-name <name>     Subject name (default: inferred from code)');
  console.log('  --course <course>         Course: BA, MA, BCA, MCA, BCOM, MCOM, CBCS (default: BCA)');
  console.log('  --content-type <type>     assignment, pyq, guess-paper, notes (default: pyq)');
  console.log('  --session <session>        Session: 2024-2025, 2025-2026, etc. (default: 2025-2026)');
  console.log('  --free                    Mark as free (default: true)');
  console.log('  --price <amount>          Price in rupees (if not free)');
  console.log('  --description <text>     Description');
  console.log('');
  console.log('Example:');
  console.log('  node scripts/upload-pdf.js "BCS 053 KKRISHHUMAI.pdf" BCS-053 --subject-name "Web Programming" --course BCA --content-type pyq --session 2025-2026');
  process.exit(1);
}

const pdfPath = args[0];
const subjectCode = args[1];

// Parse options
const options = {};
for (let i = 2; i < args.length; i += 2) {
  const key = args[i].replace('--', '');
  const value = args[i + 1];
  options[key] = value;
}

// Default subject names
const subjectNames = {
  'BCS-053': 'Web Programming',
  'BCS-054': 'Computer Oriented Numerical Techniques',
  // Add more as needed
};

const metadata = {
  subjectCode: subjectCode.toUpperCase(),
  subjectName: options['subject-name'] || subjectNames[subjectCode.toUpperCase()] || subjectCode,
  course: options.course || 'BCA',
  contentType: options['content-type'] || 'pyq',
  session: options.session || '2025-2026',
  isFree: options.free !== 'false',
  price: options.price ? parseFloat(options.price) : 0,
  description: options.description || undefined,
};

uploadPDF(pdfPath, metadata);
