import Link from 'next/link';
import { Landmark, Menu } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo & Emblem */}
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="flex flex-col items-center justify-center">
                <Landmark className="text-navy-800 w-8 h-8" strokeWidth={1.5} />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-navy-800 tracking-tight leading-none group-hover:text-navy-600 transition-colors">
                  CIVIC EYE
                </span>
                <span className="text-xs uppercase tracking-wide text-slate-500 leading-none mt-1">
                  Government of Rajasthan
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 items-center">
            <Link
              href="/"
              className="text-base font-medium text-slate-700 hover:text-navy-800 hover:underline hover:decoration-2 underline-offset-4 transition-colors"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-base font-medium text-slate-700 hover:text-navy-800 hover:underline hover:decoration-2 underline-offset-4 transition-colors"
            >
              About
            </Link>
            <Link
              href="/dashboard"
              className="text-base font-medium text-slate-700 hover:text-navy-800 hover:underline hover:decoration-2 underline-offset-4 transition-colors"
            >
              Dashboard
            </Link>
          </nav>

          {/* Right Action */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/register"
              className="bg-navy-800 hover:bg-navy-900 text-white text-base font-semibold py-2.5 px-6 rounded-md transition-colors duration-150 focus:ring-2 focus:ring-offset-2 focus:ring-navy-800 shadow-md"
            >
              Register Camera
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <div className="cursor-pointer text-slate-500 hover:text-navy-800">
               <Menu className="w-8 h-8" strokeWidth={1.5} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
