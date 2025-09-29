"use client"
import { useState } from 'react';
import { Calendar, ChevronDown } from 'lucide-react';
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import CustomDatePicker from '@/components/ui/customDatePicker';
import Link from 'next/link';

interface FormState {
  fromDate: Date
  toDate: Date
  corporateBooking: boolean;
  company: string;
  extemporaryBooking: boolean;
}

export default function Page() {
  const companies: string[] = ["Apple", "Google", "Microsoft", "Amazon"];

  // Consolidated state object
  const [formState, setFormState] = useState<FormState>({
    fromDate: new Date("2025-04-23"),
    toDate: new Date("2025-04-25"),
    corporateBooking: false,
    company: companies[0],
    extemporaryBooking: false
  });

  // Separate onChange handlers
  const handleFromDateChange = (date: Date): void => {
    setFormState(prev => ({ ...prev, fromDate: date }));
  };

  const handleToDateChange = (date: Date): void => {
    setFormState(prev => ({ ...prev, toDate: date }));
  };

  const handleCorporateBookingChange = (): void => {
    setFormState(prev => ({ ...prev, corporateBooking: !prev.corporateBooking }));
  };

  const handleCompanyChange = (value: string): void => {
    setFormState(prev => ({ ...prev, company: value }));
  };

  const handleExtemporaryBookingChange = (): void => {
    setFormState(prev => ({ ...prev, extemporaryBooking: !prev.extemporaryBooking }));
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <div className="bg-white p-4 sm:p-6 rounded-md w-full max-w-md">
        <h2
          className="text-xl sm:text-3xl font-extrabold tracking-wide
    text-[#076DB3] mb-6 relative inline-block
    after:content-[''] after:block after:w-12 after:h-[3px]
    after:bg-[#076DB3] after:mt-2 after:rounded-lg"
        >
          New
        </h2>

        <div className="space-y-4">
          {/* Date Range */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-600 mb-1">From</label>
              <div className="relative">
                <CustomDatePicker
                  selectedDate={formState.fromDate}
                  onChange={handleFromDateChange}
                  placeholder="Select From Date"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-gray-600 mb-1">To</label>
              <div className="relative">
                <CustomDatePicker
                  selectedDate={formState.toDate}
                  onChange={handleToDateChange}
                  placeholder="Select To Date"
                  minDate={formState.fromDate}
                />
              </div>
            </div>
          </div>

          {/* Corporate Booking */}
          <div className="flex items-center gap-2">
            <label className="block text-xs sm:text-sm text-gray-600">Corporate Booking</label>
            <button
              onClick={handleCorporateBookingChange}
              className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors 
              focus:outline-none focus:ring-1 focus:ring-[#076DB3] focus:ring-offset-1 ${formState.corporateBooking ? 'bg-gray-800' : 'bg-gray-300'
                }`}
            >
              <span
                className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${formState.corporateBooking ? 'translate-x-4' : 'translate-x-1'
                  }`}
              />
            </button>
            {/* <span className="text-xs sm:text-sm text-gray-700">
              {formState.corporateBooking ? 'Yes' : 'No'}
            </span> */}
          </div>

          {/* Company Dropdown */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <label className="text-xs sm:text-sm text-gray-600 whitespace-nowrap">
              Company
            </label>
            <div className="relative min-w-[120px] sm:min-w-[250px]">
              <Listbox value={formState.company} onChange={handleCompanyChange}>
                <ListboxButton className="w-full flex items-center justify-between px-2 py-2 
                border border-gray-400 hover:border-[#076DB3] rounded-md text-xs sm:text-sm bg-gray-50 text-gray-900 
                hover:bg-gray-100 focus:border-[#076DB3] focus:outline-none transition">
                  {formState.company}
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
              onClick={handleExtemporaryBookingChange}
              className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors 
              focus:outline-none focus:ring-1 focus:ring-[#076DB3] focus:ring-offset-1 ${formState.extemporaryBooking ? 'bg-gray-800' : 'bg-gray-300'
                }`}
            >
              <span
                className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${formState.extemporaryBooking ? 'translate-x-4' : 'translate-x-1'
                  }`}
              />
            </button>
            {/* <span className="text-xs sm:text-sm text-gray-700">
              {formState.extemporaryBooking ? 'Yes' : 'No'}
            </span> */}
          </div>

          {/* Search Button */}
          <div className="pt-2 flex">
            <Link href={'/bookings/new/search'}>
              <button
                className="px-5 py-2 bg-[#076DB3] text-white text-xs sm:text-sm 
              font-medium rounded-md hover:bg-[#054f80] focus:outline-none focus:ring-1 
              focus:ring-[#076DB3] focus:ring-offset-1 transition-colors cursor-pointer"
              >
                Search
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}