'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from "@/components/Footer";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Danica Patrick',
    email: 'danica.patrick@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Racing Street, Charlotte, NC 28202',
    businessName: 'STEWART HAAS RACING LLC',
    businessType: 'Sports & Entertainment',
    ein: '12-3456789',
    accountType: 'Business Checking',
    accountNumber: '850002238582',
    routingNumber: '125109006',
  });

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically make an API call to save the changes
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Main Content */}
      <main className="pt-16">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              {isEditing ? 'Save Changes' : 'Edit Profile'}
            </button>
          </div>

          <div className="space-y-8">
            {/* Personal Information */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Personal Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                  ) : (
                    <p className="text-gray-900">{profile.name}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                  ) : (
                    <p className="text-gray-900">{profile.email}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                  ) : (
                    <p className="text-gray-900">{profile.phone}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profile.address}
                      onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                  ) : (
                    <p className="text-gray-900">{profile.address}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Business Information */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Business Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Business Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profile.businessName}
                      onChange={(e) => setProfile({ ...profile, businessName: e.target.value })}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                  ) : (
                    <p className="text-gray-900">{profile.businessName}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Business Type</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profile.businessType}
                      onChange={(e) => setProfile({ ...profile, businessType: e.target.value })}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                  ) : (
                    <p className="text-gray-900">{profile.businessType}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">EIN</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profile.ein}
                      onChange={(e) => setProfile({ ...profile, ein: e.target.value })}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                  ) : (
                    <p className="text-gray-900">{profile.ein}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Account Information */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Account Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Account Type</label>
                  <p className="text-gray-900">{profile.accountType}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Account Number</label>
                  <p className="text-gray-900">{profile.accountNumber}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Routing Number</label>
                  <p className="text-gray-900">{profile.routingNumber}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
} 