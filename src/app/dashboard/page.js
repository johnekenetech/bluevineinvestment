'use client';

import { useState, useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import { toast } from 'react-hot-toast';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Navbar from '@/components/Navbar';

export default function Dashboard() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [transferAmount, setTransferAmount] = useState('');
  const [selectedBank, setSelectedBank] = useState('');
  const [accountType, setAccountType] = useState('');
  const [accountName, setAccountName] = useState('')
  const [accountNumber, setAccountNumber] = useState('');
  const [accountNumberError, setAccountNumberError] = useState('');
  const [copied, setCopied] = useState(false);
  const [routingNumber, setRoutingNumber] = useState('');
  const [balance, setBalance] = useState(23451673.72);
  const [showAllTransactions, setShowAllTransactions] = useState(false);

  const chartData = [
    { name: 'Apr', amount: 408000 },
    { name: 'May', amount: 92000 },
    { name: 'Jun', amount: 789000 },
    { name: 'Jul', amount: 89000 },
    { name: 'Aug', amount: 87000 },
    { name: 'Sep', amount: 112000 },
    { name: 'Oct', amount: 321000 },
    { name: 'Nov', amount: 45000 },
    { name: 'Dec', amount: 98000 },
    { name: 'Jan', amount: 219000 },
    { name: 'Feb', amount: 110000 },
    { name: 'Mar', amount: 276000 },
  ];

  const transactions = [
    { id: 1, type: 'Deposit', source: 'STEWART HAAS RACING LLC', date: 'Mar 15, 2024', amount: 2850000.00, ref: '120713185572167' },
    { id: 2, type: 'Interest', source: 'STEWART HAAS RACING LLC', date: 'Dec 20, 2023', amount: 1750000.00, ref: '728302827392837' },
    { id: 3, type: 'Deposit', source: 'STEWART HAAS RACING LLC', date: 'Aug 05, 2023', amount: 3200000.00, ref: '397372127582106' },
    { id: 4, type: 'Interest', source: 'STEWART HAAS RACING LLC', date: 'Apr 12, 2023', amount: 1950000.00, ref: '926373662835357' },
    { id: 5, type: 'Deposit', source: 'STEWART HAAS RACING LLC', date: 'Jan 30, 2023', amount: 2100000.00, ref: '728221198936308' },
    { id: 6, type: 'Interest', source: 'STEWART HAAS RACING LLC', date: 'Oct 15, 2022', amount: 1800000.00, ref: '283047474837648' },
    { id: 7, type: 'Deposit', source: 'STEWART HAAS RACING LLC', date: 'Jun 28, 2022', amount: 2300000.00, ref: '892737372773568' },
    { id: 8, type: 'Interest', source: 'STEWART HAAS RACING LLC', date: 'Mar 10, 2022', amount: 1650000.00, ref: '822531998273648' },
    { id: 9, type: 'Deposit', source: 'STEWART HAAS RACING LLC', date: 'Dec 05, 2021', amount: 2450000.00, ref: '997210837263547' },
    { id: 10, type: 'Interest', source: 'STEWART HAAS RACING LLC', date: 'Sep 18, 2021', amount: 1900000.00, ref: '129031736485968' },
    { id: 11, type: 'Deposit', source: 'STEWART HAAS RACING LLC', date: 'Jun 22, 2021', amount: 2750000.00, ref: '301761847263548' },
    { id: 12, type: 'Interest', source: 'STEWART HAAS RACING LLC', date: 'Mar 14, 2021', amount: 1550000.00, ref: '470133847263547' },
    { id: 13, type: 'Deposit', source: 'STEWART HAAS RACING LLC', date: 'Nov 30, 2020', amount: 2900000.00, ref: '248201736485967' },
    { id: 14, type: 'Interest', source: 'STEWART HAAS RACING LLC', date: 'Aug 15, 2020', amount: 1700000.00, ref: '573928374658293' },
    { id: 15, type: 'Deposit', source: 'STEWART HAAS RACING LLC', date: 'May 02, 2020', amount: 2250000.00, ref: '847362538495867' },
    { id: 16, type: 'Interest', source: 'STEWART HAAS RACING LLC', date: 'Jan 20, 2020', amount: 1850000.00, ref: '937463526374857' },
    { id: 17, type: 'Deposit', source: 'STEWART HAAS RACING LLC', date: 'Oct 08, 2019', amount: 2150000.00, ref: '847263547384756' },
    { id: 18, type: 'Interest', source: 'STEWART HAAS RACING LLC', date: 'Jun 15, 2019', amount: 1950000.00, ref: '736485967384756' },
    { id: 19, type: 'Deposit', source: 'STEWART HAAS RACING LLC', date: 'Mar 22, 2019', amount: 2650000.00, ref: '847263547384756' },
    { id: 20, type: 'Interest', source: 'STEWART HAAS RACING LLC', date: 'Dec 10, 2018', amount: 1600000.00, ref: '736485967384756' },
    { id: 21, type: 'Deposit', source: 'STEWART HAAS RACING LLC', date: 'Aug 05, 2018', amount: 2400000.00, ref: '847263547384756' },
    { id: 22, type: 'Interest', source: 'STEWART HAAS RACING LLC', date: 'Apr 18, 2018', amount: 1750000.00, ref: '736485967384756' },
    { id: 23, type: 'Deposit', source: 'STEWART HAAS RACING LLC', date: 'Jan 25, 2018', amount: 2850000.00, ref: '847263547384756' },
    { id: 24, type: 'Interest', source: 'STEWART HAAS RACING LLC', date: 'Oct 12, 2017', amount: 1900000.00, ref: '736485967384756' },
    { id: 25, type: 'Deposit', source: 'STEWART HAAS RACING LLC', date: 'Jul 28, 2017', amount: 2200000.00, ref: '847263547384756' },
  ];

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

  const handleTransfer = async (e) => {
    e.preventDefault();
    
    if (!selectedBank || !routingNumber || !accountNumber || !transferAmount) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      setShowTransferModal(false);
      setShowPaymentModal(true);
      
      // Reset form fields
      setSelectedBank('');
      setRoutingNumber('');
      setAccountNumber('');
      setTransferAmount('');
    } catch (error) {
      console.error('Transfer error:', error);
      toast.error('An error occurred during transfer');
    }
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
      <Navbar />
      
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
          
          {/* Top Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Balance Card */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Balance</h2>
              <p className="text-3xl font-bold text-blue-600">${balance.toLocaleString()}</p>
              <p className="text-sm text-gray-500 mt-1 mb-6">Available Balance</p>
              
              {/* Virtual Card Display */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-6 text-white shadow-lg mb-6">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <img src="/bluevine-white.png" alt="Bluevine" className="h-8" />
                  </div>
                  <div>
                    <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 10H21M7 15H8M12 15H13M6 19H18C19.6569 19 21 17.6569 21 16V8C21 6.34315 19.6569 5 18 5H6C4.34315 5 3 6.34315 3 8V16C3 17.6569 4.34315 19 6 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <p className="text-lg tracking-wider">**** **** **** 2238</p>
                    <p className="text-sm">DEBIT</p>
                  </div>
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-xs opacity-75 mb-1">CARD HOLDER</p>
                      <p className="text-sm tracking-wider">Danica Patrick</p>
                    </div>
                    <div>
                      <p className="text-xs opacity-75 mb-1">EXPIRES</p>
                      <p className="text-sm">12/26</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Account Details */}
              <div className="space-y-3">
                <p className="text-sm">
                  <span className="text-gray-600 font-medium">Account Number: </span>
                  <span className="text-black">850002238582</span>
                </p>
                <p className="text-sm">
                  <span className="text-gray-600 font-medium">Routing Number: </span>
                  <span className="text-black">125109006</span>
                </p>
              </div>
            </div>

            {/* Chart Card */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Balance Overview</h2>
                <select 
                  className="text-sm border rounded-md px-2 py-1 text-gray-600"
                  defaultValue="7days"
                >
                  <option value="7days">Last 7 days</option>
                  <option value="30days">Last 30 days</option>
                  <option value="90days">Last 90 days</option>
                </select>
              </div>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={chartData}
                    margin={{
                      top: 5,
                      right: 10,
                      left: 10,
                      bottom: 5,
                    }}
                  >
                    <defs>
                      <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis 
                      dataKey="name" 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#6B7280', fontSize: 12 }}
                    />
                    <YAxis 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#6B7280', fontSize: 12 }}
                      tickFormatter={(value) => `$${value.toLocaleString()}`}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#fff',
                        border: '1px solid #e5e7eb',
                        borderRadius: '0.5rem',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                      }}
                      formatter={(value) => [`$${value.toLocaleString()}`, 'Balance']}
                    />
                    <Area
                      type="monotone"
                      dataKey="amount"
                      stroke="#2563eb"
                      strokeWidth={2}
                      fill="url(#colorAmount)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Support Card */}
            <div className="bg-white rounded-lg shadow p-6 h-[400px]">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Support</h2>
              <p className="text-gray-600 mb-4">Need assistance? Our support team is here to help.</p>
              <button
                onClick={() => window.location.href = 'mailto:support@example.com'}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Contact Support
              </button>
            </div>

            {/* Transaction Card */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Recent Transactions</h2>
                <button 
                  onClick={() => setShowAllTransactions(!showAllTransactions)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  {showAllTransactions ? 'Show Less' : 'View All'}
                </button>
              </div>
              <div className="space-y-4">
                {(showAllTransactions ? transactions : transactions.slice(0, 6)).map((transaction) => (
                  <div key={transaction.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-full ${transaction.type === 'Deposit' ? 'bg-green-100' : 'bg-blue-100'} flex items-center justify-center`}>
                        {transaction.type === 'Deposit' ? (
                          <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                          </svg>
                        ) : (
                          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{transaction.type}</p>
                        <p className="text-sm text-gray-500">{transaction.source}</p>
                        <p className="text-xs text-gray-400">Ref: {transaction.ref}</p>
                        <p className="text-sm text-gray-500">{transaction.date}</p>
                      </div>
                    </div>
                    <span className={`font-semibold ${transaction.type === 'Deposit' ? 'text-green-600' : 'text-blue-600'}`}>
                      +${transaction.amount.toLocaleString()}
                    </span>
                  </div>
                ))}
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
              <p className="text-gray-700">To proceed with your investment withdrawal <span className="font-semibold">${parseFloat(transferAmount).toLocaleString()}</span> to {selectedBank}, a payment of <span className="font-semibold">$70,355 insurance charges</span> (0.003% of your investment amount) is required.</p>
              
              {!selectedPaymentMethod ? (
                <div className="mt-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Select Payment Method</h4>
                  <div className="space-y-4">
                    {/* Wire Transfer Option */}
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
                            <h5 className="font-medium text-gray-900">Wire Transfer</h5>
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
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-gray-900">Wire Transfer Instructions</h4>
                    <p className="text-gray-700">Please send your wire transfer to:</p>
                    <div className="bg-gray-50 text-black text-sm p-4 rounded-lg space-y-2">
                      <p><span className="font-semibold">Recipient:</span> Bluevine investment company</p>
                      <p><span className="font-semibold">Account number:</span> 10765197161</p>
                      <p><span className="font-semibold">Routing number:</span> 125109006</p>
                      <p><span className="font-semibold">Bank:</span> Coastal Community Bank</p>
                      <p><span className="font-semibold">Bank Address:</span> 5415 Evergreen way, Everett, Washington 98203</p>
                    </div>
                    <p className="text-sm text-gray-500">Once we receive your wire transfer, we will process your transfer.</p>
                  </div>
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
            <div>
              <p className='text-red-500 text-[12px] mb-3'><span className='border rounded-full border-red-500 px-[7px] mr-1'>!</span>This account must belong to Danica Patrick or Richard Wilson otherwise your transfer will be cancelled!</p>
            </div>
            <form onSubmit={handleTransfer} className="space-y-4">
          
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Bank
                </label>
                <select
                  value={selectedBank}
                  onChange={(e) => setSelectedBank(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-black"
                  required
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

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Routing Number
                </label>
                <input
                  type="text"
                  value={routingNumber}
                  onChange={(e) => setRoutingNumber(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-black"
                  placeholder="Enter routing number"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Account Number
                </label>
                <input
                  type="text"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-black"
                  placeholder="Enter account number"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Bank
                </label>
                <select
                  value={accountType}
                  onChange={(e) => setAccountType(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-black"
                  required
                >
                  <option value="">Select Account Type</option>
                  <option value="Savings">Savings</option>
                  <option value="Checkings">Checkings</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Amount
                </label>
                <input
                  type="number"
                  value={transferAmount}
                  onChange={(e) => setTransferAmount(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-black"
                  placeholder="Enter amount"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Account Name
                </label>
                <input
                  type="text"
                  value={accountName}
                  onChange={(e) => setAccountName(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-black"
                  required
                  placeholder='Enter account name'
                />
              </div>

              <button
                onClick={handleTransferSubmit}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Transfer
              </button>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
} 