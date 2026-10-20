'use client';

import { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
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

function SidebarContent({ isSidebarOpen, setIsSidebarOpen, isMobile }: { 
  isSidebarOpen: boolean; 
  setIsSidebarOpen: (open: boolean) => void;
  isMobile: boolean;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

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
    <aside
      className={`${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } transform md:translate-x-0 transition-transform duration-200 ease-in-out fixed md:sticky top-20 left-0 h-[calc(100vh-5rem)] w-64 bg-white border-r border-gray-200 overflow-y-auto z-40`}
    >
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6 px-2">Admin Panel</h2>
        <nav className="space-y-2">
          {navItems.map((item) => {
            const itemSearchParams = item.href.includes('?') ? item.href.split('?')[1] : '';
            const isActive = pathname === item.href.split('?')[0] && 
              (itemSearchParams ? searchParams.toString().includes(itemSearchParams) : searchParams.toString() === '');
            
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
                <item.icon className="w-5 h-5" />
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
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle responsive sidebar
  useEffect(() => {
    if (!mounted || isLoginPage) return;

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
  }, [isLoginPage, mounted]);

  if (!mounted) {
    return <div className="min-h-screen bg-gray-50" />;
  }

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900 overflow-x-hidden">
      {!isLoginPage && (
        <>
          {/* Mobile Sidebar Toggle */}
          <button
            className="md:hidden fixed bottom-4 right-4 z-50 bg-blue-600 text-white p-3 rounded-full shadow-lg"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? <X /> : <Menu />}
          </button>

          {/* Sidebar with Suspense */}
          <Suspense fallback={<div className="w-64 bg-white border-r border-gray-200 h-screen sticky top-0"></div>}>
            <SidebarContent 
              isSidebarOpen={isSidebarOpen} 
              setIsSidebarOpen={setIsSidebarOpen} 
              isMobile={isMobile} 
            />
          </Suspense>
        </>
      )}

      {/* Main Content */}
      <main className={`flex-1 overflow-x-hidden ${isLoginPage ? '' : 'p-4 md:p-8'}`}>
        {children}
      </main>
    </div>
  );
}
