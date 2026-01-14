export default function Banner() {
  return (
    <div className="relative w-full min-h-screen overflow-hidden flex items-center justify-center">
      {/* Banner Background Image - uses /public/banner.png */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-[0]"
        style={{ backgroundImage: "url('/banner.png')" }}
      >
        {/* Neutral Dark Overlay for text readability */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-4 py-20 pb-40">
        <div className="max-w-5xl mx-auto text-center">
          {/* Logo Section */}
          <div className="flex items-center justify-center mb-10">
            <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-xl px-6 py-4 rounded-2xl border border-white/20 shadow-2xl">
              {/* Logo Icon */}
              <div className="relative">
                <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                  {/* Open Book - Left Page (Orange) */}
                  <path
                    d="M10 15C10 13.8954 10.8954 13 12 13H22C23.1046 13 24 13.8954 24 15V40C24 41.1046 23.1046 42 22 42H12C10.8954 42 10 41.1046 10 40V15Z"
                    fill="#FF6B35"
                  />
                  {/* Open Book - Right Page (Blue) */}
                  <path
                    d="M24 15C24 13.8954 24.8954 13 26 13H36C37.1046 13 38 13.8954 38 15V40C38 41.1046 37.1046 42 36 42H26C24.8954 42 24 41.1046 24 40V15Z"
                    fill="#3B82F6"
                  />
                  {/* Book Spine */}
                  <path d="M22 13H24V42H22V13Z" fill="#1E3A8A" />
                  {/* Book Base */}
                  <path d="M10 40H38V42H10V40Z" fill="#1E3A8A" />
                  {/* Graduation Cap */}
                  <g transform="translate(15, 5)">
                    <rect x="8" y="7" width="12" height="2.5" fill="#111827" rx="0.5" />
                    <rect x="7" y="9.5" width="14" height="2" fill="#1F2937" rx="0.3" />
                    <line x1="15" y1="11.5" x2="14" y2="18" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" />
                    <circle cx="14" cy="19" r="2.5" fill="#1F2937" />
                  </g>
                </svg>
              </div>
              {/* Logo Text */}
              <div>
                <div className="flex items-baseline space-x-2">
                  <span className="text-3xl font-bold text-white">IGNOU</span>
                  <span className="text-2xl font-bold text-blue-300 italic">With Us</span>
                </div>
                <div className="text-xs text-gray-200 mt-0.5 tracking-wide">
                  Assignments • Notes • Guidance
                </div>
              </div>
            </div>
          </div>

          {/* Main Slogan */}
          <div className="mb-8 space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight drop-shadow-lg leading-tight">
              Your Partner in <br/>
              <span className="text-white">
                IGNOU Success!
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-100 max-w-3xl mx-auto font-light leading-relaxed drop-shadow-md">
              Get everything you need to ace your exams with confidence.
            </p>
          </div>

          {/* Services Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-2 mb-10 text-white shadow-lg backdrop-blur-sm">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="font-medium">Solved Assignments • Study Notes • Exam Help</span>
          </div>

          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-4">
            <a
              href="/search"
              className="group relative bg-white text-blue-700 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-blue-50 transition-all duration-300 shadow-[0_10px_40px_rgba(255,255,255,0.2)] hover:shadow-[0_20px_60px_rgba(255,255,255,0.3)] transform hover:-translate-y-1"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Search by Subject Code
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </a>
            <a
              href="/study-material"
              className="group relative bg-white/10 backdrop-blur-xl border border-white/30 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white/20 transition-all duration-300 shadow-lg transform hover:-translate-y-1"
            >
              Browse Material
            </a>
          </div>
        </div>
      </div>

      {/* Wavy divider at bottom */}
      <div className="absolute bottom-0 w-full leading-none z-20">
        <svg
          className="block w-full h-24 sm:h-32 lg:h-48 text-slate-50"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="currentColor"
            fillOpacity="1"
            d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,261.3C960,256,1056,224,1152,197.3C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </div>
  );
}
