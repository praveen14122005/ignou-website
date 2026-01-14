'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Menu, X, User, ShoppingCart, Send } from 'lucide-react';
import { useState, useEffect } from 'react';
import Logo from './Logo';

const courses = [
  { name: 'CBCS', href: '/course/CBCS' },
  { name: 'B.A', href: '/course/BA' },
  { name: 'M.A', href: '/course/MA' },
  { name: 'B.COM', href: '/course/BCOM' },
  { name: 'M.COM', href: '/course/MCOM' },
  { name: 'BCA', href: '/course/BCA' },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
    
    // Function to update cart
    const updateCart = () => {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      setCartCount(cart.length);
      const total = cart.reduce((sum: number, item: any) => sum + (item.price || 0), 0);
      setCartTotal(total);
    };
    
    // Initial cart load
    updateCart();
    
    // Listen for cart updates
    window.addEventListener('cartUpdated', updateCart);
    
    return () => {
      window.removeEventListener('cartUpdated', updateCart);
    };
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-2xl border-b border-gray-100/60 shadow-[0_10px_40px_rgba(15,23,42,0.06)]">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-3">
              <a
                href="https://t.me/+3HycgyCyuwJjYzll"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Join our Telegram channel"
                className="group flex items-center"
              >
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#24A1DE] to-[#2AB1E8] border border-blue-200/50 flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.06)] group-hover:shadow-[0_4px_12px_rgba(0,0,0,0.10)] transition-all duration-300">
                  <Send className="w-4 h-4 text-white" />
                </div>
              </a>
              <Link href="/">
                <Logo />
              </Link>
            </div>

            <nav className="hidden md:flex items-center gap-1 px-2 py-1 rounded-full bg-white/60 backdrop-blur-xl border border-gray-200/60 shadow-[0_6px_24px_rgba(15,23,42,0.06)]">
              <Link 
                href="/" 
                className={`px-4 py-2 text-sm font-semibold rounded-full transition-all duration-300 ${
                  pathname === '/' 
                    ? 'text-white bg-gradient-to-r from-blue-600 to-indigo-600 shadow-[0_8px_20px_rgba(37,99,235,0.4)]' 
                    : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50/60'
                }`}
              >
                HOME
              </Link>
              {courses.map((course) => (
                <Link
                  key={course.name}
                  href={course.href}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50/60 rounded-full transition-all duration-300"
                >
                  {course.name}
                </Link>
              ))}
              <Link 
                href="/study-material" 
                className="px-4 py-2 text-sm font-semibold text-gray-800 hover:text-blue-600 hover:bg-blue-50/60 rounded-full transition-all duration-300"
              >
                STUDY MATERIAL
              </Link>
            </nav>

            <div className="hidden md:flex items-center gap-4">
              <Link href={isLoggedIn ? "/account" : "/login"} className="group flex items-center space-x-2 hover:opacity-90 transition-all duration-300">
                <div className="relative">
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-pink-100 to-pink-50 border border-pink-200/50 flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.08)] group-hover:shadow-[0_8px_20px_rgba(0,0,0,0.12)] transition-all duration-300">
                    <User className="w-5 h-5 text-red-600" />
                  </div>
                </div>
                <div className="hidden lg:flex flex-col">
                  <span className="text-xs font-medium text-gray-700">My Account</span>
                  <span className="text-xs font-semibold text-red-600">{isLoggedIn ? "Account" : "Sign In"}</span>
                </div>
              </Link>

              <Link href="/cart" className="group flex items-center space-x-2 hover:opacity-90 transition-all duration-300">
                <div className="relative">
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-pink-100 to-pink-50 border border-pink-200/50 flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.08)] group-hover:shadow-[0_8px_20px_rgba(0,0,0,0.12)] transition-all duration-300">
                    <ShoppingCart className="w-5 h-5 text-red-600" />
                  </div>
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-red-600 to-red-700 text-white rounded-full flex items-center justify-center text-xs font-bold shadow-lg">
                      {cartCount}
                    </span>
                  )}
                </div>
                <div className="hidden lg:flex flex-col">
                  <span className="text-xs font-medium text-gray-700">My Cart</span>
                  <span className="text-xs font-semibold text-red-600">₹{cartTotal.toFixed(2)}</span>
                </div>
              </Link>

              <form onSubmit={handleSearch} className="flex items-center">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search by Subject Code..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-11 pr-4 py-2.5 bg-white/80 backdrop-blur-xl border border-gray-200/70 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-300 w-64 text-black placeholder:text-gray-400 shadow-[0_6px_20px_rgba(15,23,42,0.08)] hover:shadow-[0_10px_32px_rgba(15,23,42,0.12)] transition-all duration-300 font-light"
                  />
                  <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                </div>
              </form>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="container mx-auto px-4 space-y-2">
              <a
                href="https://t.me/+3HycgyCyuwJjYzll"
                target="_blank"
                rel="noopener noreferrer"
                className="block py-2 font-medium text-blue-600"
              >
                Join Telegram
              </a>
              <Link href="/" className="block py-2 font-medium text-gray-700">HOME</Link>
              {courses.map((course) => (
                <Link
                  key={course.name}
                  href={course.href}
                  className="block py-2 font-medium text-gray-700"
                >
                  {course.name}
                </Link>
              ))}
              <form onSubmit={handleSearch} className="pt-2">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search by Subject Code..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                </div>
              </form>
            </div>
          </div>
        )}
      </header>

      {/* Trending Now Bar - Glassmorphism */}
      <div className="bg-gradient-to-r from-yellow-50/80 via-yellow-50/60 to-yellow-50/80 backdrop-blur-xl border-b border-yellow-100/50 py-3 shadow-[0_2px_10px_rgba(0,0,0,0.04)]">
        <div className="container mx-auto px-4 flex items-center space-x-4">
          <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 px-5 py-1.5 font-bold text-sm rounded-xl shadow-lg shadow-yellow-400/30">TRENDING NOW</span>
          <span className="text-sm text-gray-700 font-light">
            BHDLA-135 हिंदी भाषा: विरिल प्रदीप Solved Assignment. 2025-2026
          </span>
        </div>
      </div>
    </>
  );
}
