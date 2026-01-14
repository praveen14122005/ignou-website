import { notFound } from 'next/navigation';
import { getPDFsBySubjectCode } from '@/lib/db';
import PDFCard from '@/components/PDFCard';
import { FileText } from 'lucide-react';

export default function SubjectPage({ params }: { params: { code: string } }) {
  const pdfs = getPDFsBySubjectCode(params.code);

  if (pdfs.length === 0) {
    notFound();
  }

  const subject = pdfs[0];
  const assignments = pdfs.filter(p => p.contentType === 'assignment');
  const pyqs = pdfs.filter(p => p.contentType === 'pyq');
  const guessPapers = pdfs.filter(p => p.contentType === 'guess-paper');
  const notes = pdfs.filter(p => p.contentType === 'notes');

  const sections = [
    { title: 'Solved Assignments', pdfs: assignments, icon: '📝' },
    { title: 'Previous Year Question Papers', pdfs: pyqs, icon: '📚' },
    { title: 'Guess / Sure-Shot Papers', pdfs: guessPapers, icon: '🎯' },
    { title: 'Study Notes', pdfs: notes, icon: '📖' },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Subject Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg p-8 mb-8">
        <h1 className="text-4xl font-bold mb-2">{subject.subjectCode}</h1>
        <p className="text-xl opacity-90">{subject.subjectName}</p>
        <div className="mt-4 flex items-center space-x-4 text-sm">
          <span>Course: {subject.course}</span>
          <span>•</span>
          <span>{pdfs.length} PDF{pdfs.length !== 1 ? 's' : ''} available</span>
        </div>
      </div>

      {/* PDF Sections */}
      {sections.map((section) => {
        if (section.pdfs.length === 0) return null;
        
        return (
          <div key={section.title} className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center space-x-2">
              <span>{section.icon}</span>
              <span>{section.title}</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {section.pdfs.map((pdf) => (
                <PDFCard key={pdf.id} pdf={pdf} />
              ))}
            </div>
          </div>
        );
      })}

      {pdfs.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-xl text-gray-600">No PDFs available for this subject yet.</p>
        </div>
      )}
    </div>
  );
}
