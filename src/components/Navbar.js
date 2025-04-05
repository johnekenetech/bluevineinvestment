'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 px-8 flex items-center justify-between z-50">
      {/* Logo */}
      <Link href="/" className="flex items-center h-full cursor-pointer">
        <Image
          src="/bluevinelogo.png"
          alt="Bluevine Logo"
          width={128}
          height={32}
          className="object-contain"
          priority
        />
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center space-x-8">
        <Link href="/dashboard" className="text-blue-600 hover:text-blue-700 font-semibold">Dashboard</Link>
        <Link href="/checking" className="text-blue-600 hover:text-blue-700 font-semibold">Checking Account</Link>
        <Link href="/business-loan" className="text-blue-600 hover:text-blue-700 font-semibold">Business Loan</Link>
        <Link href="/profile" className="text-blue-600 hover:text-blue-700 font-semibold">Profile</Link>
        <Link href="/settings" className="text-blue-600 hover:text-blue-700 font-semibold">Settings</Link>
        <button 
          onClick={() => setShowLogoutModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-semibold flex items-center space-x-2 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span>Logout</span>
        </button>
      </nav>

      {/* Hamburger Menu Button - Only visible on mobile */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="md:hidden flex items-center h-full p-2 cursor-pointer"
        aria-label="Toggle menu"
      >
        <div className="w-6 h-5 flex flex-col justify-between">
          <span className={`block w-full h-0.5 bg-gray-600 transform transition-transform duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`block w-full h-0.5 bg-gray-600 transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block w-full h-0.5 bg-gray-600 transform transition-transform duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </div>
      </button>

      {/* Mobile Menu */}
      <div className={`md:hidden fixed top-16 right-0 w-64 bg-blue-600 border-l border-blue-700 h-[calc(100vh-4rem)] transform transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <nav className="p-4 space-y-4">
          <Link href="/dashboard" className="block text-white hover:text-white/90 font-bold">Dashboard</Link>
          <Link href="/checking" className="block text-white hover:text-white/90 font-bold">Checking Account</Link>
          <Link href="/business-loan" className="block text-white hover:text-white/90 font-bold">Business Loan</Link>
          <Link href="/profile" className="block text-white hover:text-white/90 font-bold">Profile</Link>
          <Link href="/settings" className="block text-white hover:text-white/90 font-bold">Settings</Link>
          <button 
            onClick={() => setShowLogoutModal(true)}
            className="w-full text-left text-white hover:text-white/90 font-bold flex items-center space-x-2 bg-blue-600 p-3 rounded-lg"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span>Logout</span>
          </button>
        </nav>
      </div>
    </header>
  );
} 