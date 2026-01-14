import Link from 'next/link';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="mb-4">
              <Logo />
            </div>
            <p className="text-gray-400 text-sm mt-2">
              Your Partner in IGNOU Success! Providing Solved Assignments, PYQs, Guess Papers, and Study Notes.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/" className="hover:text-white">Home</Link></li>
              <li><Link href="/study-material" className="hover:text-white">Study Material</Link></li>
              <li><Link href="/datesheet" className="hover:text-white">Datesheet</Link></li>
              <li><Link href="/result" className="hover:text-white">Result</Link></li>
            </ul>
          </div>

          {/* Courses */}
          <div>
            <h3 className="font-semibold mb-4">Courses</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/course/BA" className="hover:text-white">B.A</Link></li>
              <li><Link href="/course/MA" className="hover:text-white">M.A</Link></li>
              <li><Link href="/course/BCA" className="hover:text-white">BCA</Link></li>
              <li><Link href="/course/BCOM" className="hover:text-white">B.COM</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Email: learningacc012@gmail.com</li>
              <li>
                <a href="https://t.me/+3HycgyCyuwJjYzll" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  Telegram Channel
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} IGNOU With Us. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
