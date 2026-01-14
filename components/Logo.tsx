export default function Logo() {
  return (
    <div className="flex items-center space-x-3">
      {/* Logo Icon - Book with Graduation Cap */}
      <div className="relative flex-shrink-0">
        <svg
          width="50"
          height="50"
          viewBox="0 0 50 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Open Book - Left Page (Orange) */}
          <path
            d="M8 14C8 12.8954 8.89543 12 10 12H19C20.1046 12 21 12.8954 21 14V38C21 39.1046 20.1046 40 19 40H10C8.89543 40 8 39.1046 8 38V14Z"
            fill="#FF6B35"
          />
          {/* Open Book - Right Page (Blue) */}
          <path
            d="M21 14C21 12.8954 21.8954 12 23 12H32C33.1046 12 34 12.8954 34 14V38C34 39.1046 33.1046 40 32 40H23C21.8954 40 21 39.1046 21 38V14Z"
            fill="#2563EB"
          />
          {/* Book Spine (Dark Blue) */}
          <path
            d="M19 12H21V40H19V12Z"
            fill="#1E3A8A"
          />
          {/* Book Base */}
          <path
            d="M8 38H34V40H8V38Z"
            fill="#1E3A8A"
          />
          
          {/* Graduation Cap */}
          <g transform="translate(13, 2)">
            {/* Cap Top Square */}
            <rect x="7" y="6" width="10" height="2" fill="#111827" rx="0.5" />
            {/* Cap Base/Tassel Holder */}
            <rect x="6" y="8" width="12" height="1.5" fill="#1F2937" rx="0.3" />
            {/* Tassel String */}
            <line x1="12" y1="9.5" x2="11" y2="16" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" />
            {/* Tassel Ball */}
            <circle cx="11" cy="17" r="2" fill="#1F2937" />
          </g>
        </svg>
      </div>

      {/* Logo Text */}
      <div>
        <div className="flex items-baseline space-x-1.5">
          <span className="text-2xl font-bold text-blue-600 tracking-tight">IGNOU</span>
          <span className="text-xl font-bold text-orange-500 tracking-tight">With Us</span>
        </div>
        <div className="text-xs text-gray-600 mt-0.5 font-normal">
          Assignments • Notes • Guidance
        </div>
      </div>
    </div>
  );
}
