"use client"
import { useState } from 'react';
import { Calendar, ChevronDown } from 'lucide-react';
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';

export default function Page() {
  const [corporateBooking, setCorporateBooking] = useState(false);
  const [extemporaryBooking, setExtemporaryBooking] = useState(false);

  const companies = ["Apple", "Google", "Microsoft", "Amazon"];
  const [company, setCompany] = useState(companies[0]);

  return (
    <div className="flex px-6 bg-gray-50 min-h-screen">
      <div className="bg-white p-4 sm:p-6 rounded-md w-full max-w-2xl">
        <h2 className="text-base sm:text-lg font-medium text-gray-900 mb-4 ">New</h2>

        <div className="space-y-4">
          {/* Date Range */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-600 mb-1">From</label>
              <div className="relative">
                <input
                  type="date"
                  placeholder="dd/mm/yyyy"
                  className="w-full px-2 py-1.5 border border-[#076DB3] rounded-md bg-gray-50 
                  text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 
                  focus:ring-[#076DB3] focus:border-transparent pr-8 text-xs sm:text-sm"
                />
                {/* <Calendar className="absolute right-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" /> */}
              </div>
            </div>

            <div>
              <label className="block text-xs text-gray-600 mb-1">To</label>
              <div className="relative">
                <input
                  type="date"
                  placeholder="dd/mm/yyyy"
                  className="w-full px-2 py-1.5 border border-[#076DB3] rounded-md bg-gray-50 
                  text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 
                  focus:ring-[#076DB3] focus:border-transparent pr-8 text-xs sm:text-sm"
                />
                {/* <Calendar className="absolute right-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" /> */}
              </div>
            </div>
          </div>

          {/* Corporate Booking */}
          <div className="flex items-center gap-2">
            <label className="block text-xs sm:text-sm text-gray-600">Corporate Booking</label>
            <button
              onClick={() => setCorporateBooking(!corporateBooking)}
              className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors 
              focus:outline-none focus:ring-1 focus:ring-[#076DB3] focus:ring-offset-1 ${
                corporateBooking ? 'bg-gray-800' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
                  corporateBooking ? 'translate-x-4' : 'translate-x-1'
                }`}
              />
            </button>
            <span className="text-xs sm:text-sm text-gray-700">
              {corporateBooking ? 'Yes' : 'No'}
            </span>
          </div>

          {/* Company Dropdown */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <label className="text-xs sm:text-sm text-gray-600 whitespace-nowrap">
              Company
            </label>
            <div className="relative min-w-[120px] sm:min-w-[250px]">
              <Listbox value={company} onChange={setCompany}>
                <ListboxButton className="w-full flex items-center justify-between px-2 py-1.5 
                border border-[#076DB3] rounded-md text-xs sm:text-sm bg-gray-50 text-gray-900 
                hover:bg-gray-100 focus:border-[#076DB3] focus:outline-none transition">
                  {company}
                  <ChevronDown className="w-3.5 h-3.5 text-gray-500 ml-1" />
                </ListboxButton>
                <ListboxOptions className="absolute mt-1 py-2 w-full bg-white border border-[#076DB3] 
                rounded-md shadow-md z-10 text-xs sm:text-sm">
                  {companies.map((c) => (
                    <ListboxOption
                      key={c}
                      value={c}
                      className="px-2 py-1 cursor-pointer flex justify-between items-center 
                      text-gray-600 data-[focus]:bg-gray-200 data-[selected]:font-semibold"
                    >
                      {c}
                    </ListboxOption>
                  ))}
                </ListboxOptions>
              </Listbox>
            </div>
          </div>

          {/* Extemporary Booking */}
          <div className="flex items-center gap-2">
            <label className="block text-xs sm:text-sm text-gray-600">Extemporary Booking</label>
            <button
              onClick={() => setExtemporaryBooking(!extemporaryBooking)}
              className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors 
              focus:outline-none focus:ring-1 focus:ring-[#076DB3] focus:ring-offset-1 ${
                extemporaryBooking ? 'bg-gray-800' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
                  extemporaryBooking ? 'translate-x-4' : 'translate-x-1'
                }`}
              />
            </button>
            <span className="text-xs sm:text-sm text-gray-700">
              {extemporaryBooking ? 'Yes' : 'No'}
            </span>
          </div>

          {/* Search Button */}
          <div className="pt-2 flex ">
            <button className="px-5 py-2 bg-[#076DB3] text-white text-xs sm:text-sm 
            font-medium rounded-md hover:bg-[#054f80] focus:outline-none focus:ring-1 
            focus:ring-[#076DB3] focus:ring-offset-1 transition-colors">
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
