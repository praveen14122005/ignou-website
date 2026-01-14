import Link from 'next/link';
import { BookOpen, FileText, FileQuestion, FileCheck, GraduationCap } from 'lucide-react';
import { getAllPDFs } from '@/lib/db';
import { Course } from '@/types';
import Banner from '@/components/Banner';
import Notifications from '@/components/Notifications';

export default function HomePage() {
  // Get featured PDFs (most recent or most downloaded)
  const allPDFs = getAllPDFs();
  const featuredPDFs = allPDFs
    .sort((a, b) => b.downloadCount - a.downloadCount)
    .slice(0, 6);

  const courses: { code: Course; name: string; color: string }[] = [
    { code: 'BA', name: 'Bachelor of Arts', color: 'bg-blue-500' },
    { code: 'MA', name: 'Master of Arts', color: 'bg-purple-500' },
    { code: 'BCA', name: 'Bachelor of Computer Applications', color: 'bg-green-500' },
    { code: 'BCOM', name: 'Bachelor of Commerce', color: 'bg-orange-500' },
    { code: 'MCOM', name: 'Master of Commerce', color: 'bg-pink-500' },
    { code: 'CBCS', name: 'Choice Based Credit System', color: 'bg-indigo-500' },
  ];

  return (
    <div>
      {/* Hero Section with Banner */}
      <Banner />

      {/* Features Section - Ultra Clean SaaS Design */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-slate-50 via-white to-slate-50 relative overflow-hidden">
        
        {/* Smooth Bottom Curve */}
        <div className="absolute -bottom-1 left-0 right-0 z-0 w-full">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-24 md:h-32" preserveAspectRatio="none">
            <path 
              d="M0,50 C180,90 360,70 540,60 C720,50 900,60 1080,65 C1260,70 1440,60 1440,60 L1440,120 L0,120 Z" 
              fill="#F8FAFC"
            />
          </svg>
        </div>
        
        {/* Content Container */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-12 md:py-16">
          {/* Heading Section */}
          <div className="text-center mb-16 md:mb-20">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent mb-4 md:mb-6">
              What We Offer
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto font-light">
              Everything an IGNOU student needs in one place
            </p>
          </div>
          
          {/* Feature Cards Grid - Glassmorphism */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-7xl mx-auto">
            {/* Card 1: Solved Assignments */}
            <div className="group relative bg-white/70 backdrop-blur-xl p-8 rounded-3xl border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-[0_20px_60px_rgb(0,0,0,0.12)] transition-all duration-500 transform hover:-translate-y-3 hover:scale-[1.02]">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
                    <span className="text-white font-bold text-xl">01</span>
                  </div>
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-600/40">
                    <FileCheck className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h3 className="font-bold text-xl text-gray-900 mb-3 leading-tight">
                  Solved Assignments
                </h3>
                <p className="text-gray-600 text-base leading-relaxed font-light">
                  Complete solved assignments for all sessions
                </p>
              </div>
            </div>

            {/* Card 2: PYQs */}
            <div className="group relative bg-white/70 backdrop-blur-xl p-8 rounded-3xl border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-[0_20px_60px_rgb(0,0,0,0.12)] transition-all duration-500 transform hover:-translate-y-3 hover:scale-[1.02]">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
                    <span className="text-white font-bold text-xl">02</span>
                  </div>
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-purple-700 flex items-center justify-center shadow-lg shadow-purple-600/40">
                    <FileQuestion className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h3 className="font-bold text-xl text-gray-900 mb-3 leading-tight">
                  PYQs organized by year and session
                </h3>
                <p className="text-gray-600 text-base leading-relaxed font-light">
                  Previous year's question papers categorized for easy access
                </p>
              </div>
            </div>

            {/* Card 3: Guess Papers */}
            <div className="group relative bg-white/70 backdrop-blur-xl p-8 rounded-3xl border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-[0_20px_60px_rgb(0,0,0,0.12)] transition-all duration-500 transform hover:-translate-y-3 hover:scale-[1.02]">
              <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg shadow-green-500/30">
                    <span className="text-white font-bold text-xl">03</span>
                  </div>
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-600 to-green-700 flex items-center justify-center shadow-lg shadow-green-600/40">
                    <FileText className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h3 className="font-bold text-xl text-gray-900 mb-3 leading-tight">
                  Sure-shot questions for exam preparation
                </h3>
                <p className="text-gray-600 text-base leading-relaxed font-light">
                  Important questions curated for effective exam practice
                </p>
              </div>
            </div>

            {/* Card 4: Study Notes */}
            <div className="group relative bg-white/70 backdrop-blur-xl p-8 rounded-3xl border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-[0_20px_60px_rgb(0,0,0,0.12)] transition-all duration-500 transform hover:-translate-y-3 hover:scale-[1.02]">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/30">
                    <span className="text-white font-bold text-xl">04</span>
                  </div>
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-600 to-orange-700 flex items-center justify-center shadow-lg shadow-orange-600/40">
                    <BookOpen className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h3 className="font-bold text-xl text-gray-900 mb-3 leading-tight">
                  Comprehensive study material in PDF format
                </h3>
                <p className="text-gray-600 text-base leading-relaxed font-light">
                  Downloadable study material covering all subjects
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Section - Ultra Clean SaaS Design */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-white to-slate-50/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent mb-4">
              Browse by Course
            </h2>
            <p className="text-lg text-gray-600 font-light">Choose your program and start learning</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
            {courses.map((course) => (
              <Link
                key={course.code}
                href={`/course/${course.code}`}
                className="group"
              >
                <div className={`relative bg-gradient-to-br ${course.color} p-8 rounded-3xl text-white hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-[1.02] overflow-hidden`}>
                  {/* Glassmorphism Overlay */}
                  <div className="absolute inset-0 bg-white/10 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  {/* Content */}
                  <div className="relative z-10">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                      <GraduationCap className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-3xl font-bold mb-3">{course.code}</h3>
                    <p className="text-white/90 font-light text-lg">{course.name}</p>
                  </div>
                  {/* Shine Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Content - Ultra Clean SaaS Design */}
      {featuredPDFs.length > 0 && (
        <section className="py-20 md:py-28 bg-gradient-to-b from-slate-50/50 to-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent mb-4">
                Popular Subjects
              </h2>
              <p className="text-lg text-gray-600 font-light">Most downloaded study materials</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
              {featuredPDFs.map((pdf) => (
                <Link
                  key={pdf.id}
                  href={`/subject/${pdf.subjectCode}`}
                  className="group"
                >
                  <div className="bg-white/70 backdrop-blur-xl rounded-3xl border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-[0_20px_60px_rgb(0,0,0,0.12)] transition-all duration-500 p-8 transform hover:-translate-y-3 overflow-hidden">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="font-bold text-xl text-gray-900 mb-2">{pdf.subjectCode}</h3>
                        <p className="text-sm text-gray-600 font-light">{pdf.subjectName}</p>
                      </div>
                      {pdf.isFree ? (
                        <span className="bg-gradient-to-br from-green-500 to-green-600 text-white text-xs font-semibold px-3 py-1.5 rounded-xl shadow-lg shadow-green-500/30 ml-3">FREE</span>
                      ) : (
                        <span className="bg-gradient-to-br from-blue-500 to-blue-600 text-white text-xs font-semibold px-3 py-1.5 rounded-xl shadow-lg shadow-blue-500/30 ml-3">
                          ₹{pdf.price || 0}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center text-sm text-gray-500 font-light pt-4 border-t border-gray-100">
                      <span className="capitalize">{pdf.contentType.replace('-', ' ')}</span>
                      <span className="mx-2">•</span>
                      <span>{pdf.session}</span>
                    </div>
                    {/* Hover Gradient Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 to-purple-50/0 group-hover:from-blue-50/50 group-hover:to-purple-50/50 transition-all duration-500 rounded-3xl pointer-events-none"></div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Premium CTA Section - Ultra Clean SaaS Design */}
      <section className="relative py-24 md:py-32 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 overflow-hidden">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-indigo-600/20 animate-pulse"></div>
          {/* Soft Glowing Orbs */}
          <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-3xl"></div>
        </div>

        {/* Glassmorphism Content Container */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Glass Card */}
            <div className="bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-2xl p-12 md:p-16">
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 md:mb-8 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
                Ready to Ace Your IGNOU Exams? 🎯
              </h2>
              <p className="text-lg md:text-xl text-white/80 mb-10 md:mb-12 max-w-2xl mx-auto font-light leading-relaxed">
                Join 10,000+ IGNOU students using solved assignments, PYQs & sure-shot questions to score better.
              </p>
              
              {/* CTA Buttons - Glassmorphism */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10 md:mb-12">
                <Link
                  href="/search"
                  className="group relative bg-white text-blue-600 px-10 py-4 rounded-2xl font-semibold hover:bg-blue-50 transition-all duration-300 shadow-[0_10px_40px_rgba(255,255,255,0.2)] hover:shadow-[0_20px_60px_rgba(255,255,255,0.3)] transform hover:-translate-y-1 hover:scale-105 w-full sm:w-auto"
                >
                  <span className="relative z-10">Get Started Now</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-white rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
                <Link
                  href="/search"
                  className="group relative bg-white/10 backdrop-blur-xl border-2 border-white/30 text-white px-10 py-4 rounded-2xl font-semibold hover:bg-white/20 hover:border-white/50 transition-all duration-300 shadow-[0_10px_40px_rgba(255,255,255,0.1)] hover:shadow-[0_20px_60px_rgba(255,255,255,0.2)] transform hover:-translate-y-1 hover:scale-105 w-full sm:w-auto"
                >
                  <span className="relative z-10">View Assignments</span>
                </Link>
              </div>

              {/* Trust Indicators - Glassmorphism */}
              <div className="flex flex-wrap justify-center gap-6 md:gap-8">
                <div className="flex items-center space-x-2 bg-white/5 backdrop-blur-xl px-4 py-2 rounded-xl border border-white/10">
                  <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm md:text-base text-white/90 font-light">Updated every session</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/5 backdrop-blur-xl px-4 py-2 rounded-xl border border-white/10">
                  <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm md:text-base text-white/90 font-light">IGNOU-focused</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/5 backdrop-blur-xl px-4 py-2 rounded-xl border border-white/10">
                  <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm md:text-base text-white/90 font-light">Secure payments</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Smooth Curvy Wave Transition */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-24 md:h-32" preserveAspectRatio="none">
            <path 
              d="M0,60 C180,20 360,40 540,50 C720,60 900,50 1080,45 C1260,40 1440,50 1440,50 L1440,120 L0,120 Z" 
              fill="white" 
            />
          </svg>
        </div>
      </section>

      <Notifications />
    </div>
  );
}
