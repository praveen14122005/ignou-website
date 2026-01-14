'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  FileText, 
  Upload, 
  LogOut, 
  BookOpen, 
  FileQuestion, 
  FileCheck, 
  StickyNote,
  Menu,
  X
} from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Don't show sidebar on login page
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  // Handle responsive sidebar
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsMobile(true);
        setIsSidebarOpen(false);
      } else {
        setIsMobile(false);
        setIsSidebarOpen(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.dispatchEvent(new Event('auth-change'));
    router.push('/admin/login');
  };

  const navItems = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'All PDFs', href: '/admin/pdfs', icon: FileText },
    { name: 'Assignments', href: '/admin/pdfs?type=assignment', icon: FileCheck },
    { name: 'PYQs', href: '/admin/pdfs?type=pyq', icon: FileQuestion },
    { name: 'Guess Papers', href: '/admin/pdfs?type=guess-paper', icon: BookOpen },
    { name: 'Study Notes', href: '/admin/pdfs?type=notes', icon: StickyNote },
    { name: 'Upload New', href: '/admin/upload', icon: Upload },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900">
      {/* Mobile Sidebar Toggle */}
      <button
        className="md:hidden fixed bottom-4 right-4 z-50 bg-blue-600 text-white p-3 rounded-full shadow-lg"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <X /> : <Menu />}
      </button>

      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transform md:translate-x-0 transition-transform duration-200 ease-in-out fixed md:sticky top-20 left-0 h-[calc(100vh-5rem)] w-64 bg-white border-r border-gray-200 overflow-y-auto z-40`}
      >
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6 px-2">Admin Panel</h2>
          <nav className="space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href.split('?')[0] && 
                (item.href.includes('?') ? window.location.search.includes(item.href.split('?')[1]) : !window.location.search);
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-600 font-medium'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                  onClick={() => isMobile && setIsSidebarOpen(false)}
                >
                  <item.icon className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-gray-400'}`} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
            
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-colors mt-8"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-8 overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}
