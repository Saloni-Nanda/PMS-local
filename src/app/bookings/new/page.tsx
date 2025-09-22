"use client"
import { useState } from 'react';
import { Calendar } from 'lucide-react';

export default function Page() {
  const [corporateBooking, setCorporateBooking] = useState(false);
  const [extemporaryBooking, setExtemporaryBooking] = useState(false);
  const [company, setCompany] = useState('Apple');

  return (
    <div className="p-6 bg-white">
      <h2 className="text-xl font-medium text-gray-900 mb-6">New</h2>
      
      <div className="space-y-6">
        {/* Date Range */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm text-gray-600 mb-2">From</label>
            <div className="relative">
              <input
                type="text"
                placeholder="01/01/2022"
                className="w-full px-3 py-2 border border-sky-300 rounded-md bg-gray-50 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-transparent pr-10"
              />
              <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
          </div>
          
          <div>
            <label className="block text-sm text-gray-600 mb-2">To</label>
            <div className="relative">
              <input
                type="text"
                placeholder="31/12/2022"
                className="w-full px-3 py-2 border border-sky-300 rounded-md bg-gray-50 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-transparent pr-10"
              />
              <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Corporate Booking */}
        <div>
          <label className="block text-sm text-gray-600 mb-3">Corporate Booking</label>
          <button
            onClick={() => setCorporateBooking(!corporateBooking)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-sky-300 focus:ring-offset-2 ${
              corporateBooking ? 'bg-gray-800' : 'bg-gray-300'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                corporateBooking ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
          <span className="ml-2 text-sm text-gray-700">
            {corporateBooking ? 'Yes' : 'No'}
          </span>
        </div>

        {/* Company Dropdown */}
        <div>
          <label className="block text-sm text-gray-600 mb-2">Company</label>
          <div className="relative">
            <select 
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full px-3 py-2 border border-sky-300 rounded-md bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-transparent appearance-none pr-8"
            >
              <option value="Apple">Apple</option>
              {/* <option value="Google">Google</option>
              <option value="Microsoft">Microsoft</option>
              <option value="Amazon">Amazon</option> */}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Extemporary Booking */}
        <div>
          <label className="block text-sm text-gray-600 mb-3">Extemporary Booking</label>
          <button
            onClick={() => setExtemporaryBooking(!extemporaryBooking)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-sky-300 focus:ring-offset-2 ${
              extemporaryBooking ? 'bg-gray-800' : 'bg-gray-300'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                extemporaryBooking ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
          <span className="ml-2 text-sm text-gray-700">
            {extemporaryBooking ? 'Yes' : 'No'}
          </span>
        </div>

        {/* Search Button */}
        <div className="pt-4">
          <button className="px-6 py-2 bg-sky-400 text-white text-sm font-medium rounded-md hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:ring-offset-2 transition-colors">
            Search
          </button>
        </div>
      </div>
    </div>
  );
}