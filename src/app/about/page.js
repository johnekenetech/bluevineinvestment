'use client';

import { useState, useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";

export default function AboutPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 px-4 flex items-center justify-between z-50">
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
          <Link href="/checking" className="text-gray-600 hover:text-blue-600 font-semibold">Checking Account</Link>
          <Link href="/business-loan" className="text-gray-600 hover:text-blue-600 font-semibold">Business Loan</Link>
          <Link href="/about" className="text-gray-600 hover:text-blue-600 font-semibold">About</Link>
        </nav>

        {/* Hamburger Menu Button - Only visible on mobile */}
        <button
          onClick={toggleMenu}
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
            <Link href="/checking" className="block text-white hover:text-white/90 font-bold">Checking Account</Link>
            <Link href="/business-loan" className="block text-white hover:text-white/90 font-bold">Business Loan</Link>
            <Link href="/about" className="block text-white hover:text-white/90 font-bold">About</Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-16">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">About Bluevine</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Our Mission</h2>
              <p className="text-gray-600 mb-4">
                Bluevine is dedicated to helping small businesses thrive by providing innovative financial solutions. We believe that every business deserves access to the tools and resources they need to grow and succeed.
              </p>
              <p className="text-gray-600">
                Our platform combines cutting-edge technology with personalized service to deliver a seamless banking experience for business owners.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Why Choose Us</h2>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <span className="text-blue-600 mr-2">✓</span>
                  Fast and easy application process
                </li>
                <li className="flex items-center">
                  <span className="text-blue-600 mr-2">✓</span>
                  24/7 customer support
                </li>
                <li className="flex items-center">
                  <span className="text-blue-600 mr-2">✓</span>
                  Secure online banking
                </li>
                <li className="flex items-center">
                  <span className="text-blue-600 mr-2">✓</span>
                  Competitive rates and fees
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
} 