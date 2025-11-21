import Link from 'next/link';
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-xl font-bold text-gray-900">ArcSight</div>
          <div className="flex items-center gap-6 text-sm">
            <Link href="/" className="text-gray-600 hover:text-black transition">
              Home
            </Link>
            <Link href="/demo" className="text-gray-600 hover:text-black transition">
              Demo
            </Link>
            <Link href="/arc-drift" className="text-gray-600 hover:text-black transition">
              Drift Data
            </Link>
          </div>
        </div>
      </nav>
      <main className="max-w-4xl mx-auto px-6 py-10">
        {children}
      </main>
    </div>
  );
}

