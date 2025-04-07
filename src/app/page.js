'use client';

import { useState, useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [hasFocused, setHasFocused] = useState({});
  const [showNotification, setShowNotification] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // 1.5 seconds loading time

    return () => clearTimeout(timer);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    validateField(field);
  };

  const handleFocus = (field) => {
    setHasFocused(prev => ({ ...prev, [field]: true }));
  };

  const validateField = (field) => {
    let newErrors = { ...errors };
    
    if (field === 'email') {
      if (!email) {
        newErrors.email = 'Email is required';
      } else if (!validateEmail(email)) {
        newErrors.email = 'Please enter a valid email address';
      } else {
        delete newErrors.email;
      }
    }

    if (field === 'password') {
      if (!password) {
        newErrors.password = 'Password is required';
      } else if (!validatePassword(password)) {
        newErrors.password = 'Password must be at least 8 characters long';
      } else {
        delete newErrors.password;
      }
    }

    setErrors(newErrors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate all fields
    validateField('email');
    validateField('password');

    // If there are no errors, proceed with form submission
    if (Object.keys(errors).length === 0) {
      // Check for specific credentials
      if (email === 'Racedanicapatrick@gmail.com' && password === 'Danica@2012') {
        // Handle successful login
        console.log('Login successful');
        // Redirect to dashboard
        window.location.href = '/dashboard';
      } else {
        // Show error message for invalid credentials
        setErrors(prev => ({
          ...prev,
          email: 'Invalid email or password',
          password: 'Invalid email or password'
        }));
      }
    }
  };

  const handleNavClick = (e) => {
    e.preventDefault();
    setIsExiting(false);
    setShowNotification(true);
    setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => {
        setShowNotification(false);
      }, 300);
    }, 2700);
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
          <Link href="/checking" onClick={handleNavClick} className="text-blue-600 hover:text-blue-700 font-semibold">Checking Account</Link>
          <Link href="/business-loan" onClick={handleNavClick} className="text-blue-600 hover:text-blue-700 font-semibold">Business Loan</Link>
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
            <Link href="/checking" onClick={handleNavClick} className="block text-white hover:text-white/90 font-bold">Checking Account</Link>
            <Link href="/business-loan" onClick={handleNavClick} className="block text-white hover:text-white/90 font-bold">Business Loan</Link>
          </nav>
        </div>
      </header>

      {/* Notification Message */}
      {showNotification && (
        <div className={`fixed top-20 right-8 z-50 ${isExiting ? 'animate-slide-out-right' : 'animate-slide-in-right'}`}>
          <div className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Please sign in to access this feature</span>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="pt-16">
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
          <div className="w-full max-w-md mx-auto px-4">
            <div className="w-full p-8 bg-white rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold text-blue-600 mb-8 text-center">Welcome to Bluevine Investments</h2>
              <form className="space-y-6" onSubmit={handleSubmit}>
                {/* Email Field */}
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={() => handleBlur('email')}
                    onFocus={() => handleFocus('email')}
                    className={`peer w-full h-12 px-4 border rounded-lg focus:outline-none text-black ${
                      touched.email && errors.email
                        ? 'border-red-500 focus:border-red-500'
                        : 'border-gray-300 focus:border-blue-600'
                    }`}
                    placeholder=" "
                  />
                  <label
                    htmlFor="email"
                    className={`absolute left-4 transition-all duration-200 
                      ${hasFocused.email ? '-top-2.5 text-sm' : 'top-1/2 -translate-y-1/2 text-base'}
                      ${touched.email && errors.email ? 'text-red-500' : 'text-gray-500 peer-focus:text-blue-600'}
                      bg-white px-1`}
                  >
                    Email
                  </label>
                  {touched.email && errors.email && (
                    <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                  )}
                </div>

                {/* Password Field */}
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onBlur={() => handleBlur('password')}
                    onFocus={() => handleFocus('password')}
                    className={`peer w-full h-12 px-4 border rounded-lg focus:outline-none text-black ${
                      touched.password && errors.password
                        ? 'border-red-500 focus:border-red-500'
                        : 'border-gray-300 focus:border-blue-600'
                    }`}
                    placeholder=" "
                  />
                  <label
                    htmlFor="password"
                    className={`absolute left-4 transition-all duration-200 
                      ${hasFocused.password ? '-top-2.5 text-sm' : 'top-1/2 -translate-y-1/2 text-base'}
                      ${touched.password && errors.password ? 'text-red-500' : 'text-gray-500 peer-focus:text-blue-600'}
                      bg-white px-1`}
                  >
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                  >
                    {showPassword ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    )}
                  </button>
                  {touched.password && errors.password && (
                    <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                  )}
                </div>

                {/* Sign In Button */}
                <button
                  type="submit"
                  className="w-full h-12 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 
                    transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                    disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={Object.keys(errors).length > 0}
                >
                  Sign In
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
