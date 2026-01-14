import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getSubjectsByCourse } from '@/lib/db';
import { Course } from '@/types';
import { GraduationCap } from 'lucide-react';

const courseNames: Record<Course, string> = {
  BA: 'Bachelor of Arts',
  MA: 'Master of Arts',
  BCA: 'Bachelor of Computer Applications',
  MCA: 'Master of Computer Applications',
  BCOM: 'Bachelor of Commerce',
  MCOM: 'Master of Commerce',
  CBCS: 'Choice Based Credit System',
  OTHER: 'Other Courses',
};

const courseColors: Record<Course, string> = {
  BA: 'from-blue-500 to-blue-600',
  MA: 'from-purple-500 to-purple-600',
  BCA: 'from-green-500 to-green-600',
  MCA: 'from-teal-500 to-teal-600',
  BCOM: 'from-orange-500 to-orange-600',
  MCOM: 'from-pink-500 to-pink-600',
  CBCS: 'from-indigo-500 to-indigo-600',
  OTHER: 'from-slate-500 to-slate-600',
};

export default function CoursePage({ params }: { params: { course: string } }) {
  const course = params.course.toUpperCase() as Course;
  
  if (!Object.keys(courseNames).includes(course)) {
    notFound();
  }

  const subjects = getSubjectsByCourse(course);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <GraduationCap className="w-8 h-8 text-blue-600" />
          <h1 className="text-4xl font-bold">{course}</h1>
        </div>
        <p className="text-xl text-gray-600">{courseNames[course]}</p>
      </div>

      {subjects.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-xl text-gray-600 mb-4">No subjects available for this course yet.</p>
          <p className="text-gray-500">Check back soon or search for a specific subject code.</p>
        </div>
      ) : (
        <div>
          <p className="text-gray-600 mb-6">
            Found {subjects.length} subject{subjects.length !== 1 ? 's' : ''} for {course}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subjects.map((subject) => (
              <Link
                key={subject.code}
                href={`/subject/${subject.code}`}
                className={`group relative bg-gradient-to-br ${courseColors[course]} rounded-3xl p-6 text-white hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden`}
              >
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <h3 className="font-bold text-xl mb-2">{subject.code}</h3>
                  <p className="text-white/90 mb-4">{subject.name}</p>
                  <div className="flex items-center justify-between text-sm text-white/80">
                    <span>
                      {subject.pdfs.length} PDF{subject.pdfs.length !== 1 ? 's' : ''} available
                    </span>
                    <span className="font-semibold">View →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
