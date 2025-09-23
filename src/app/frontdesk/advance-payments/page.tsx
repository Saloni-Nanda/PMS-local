"use client"
import { Search, ChevronDown, ListFilterIcon } from 'lucide-react';
import React, { useState } from 'react';
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from "@headlessui/react";
import Link from 'next/link';

interface AdvancePayments {
  id: string;
  bookingNumber: string;
  arrivalDate: Date;
  guestName: string;
  paymentMethod: string;
  advancePayment: number;
  notAssigned: number;
  currency: string;
}

const Page: React.FC = () => {
  const [fromDate, setFromDate] = useState(new Date("2022-08-20"));
  const [toDate, setToDate] = useState(new Date("2022-08-20"));
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const statusOptions = ["Non Selected"];
  const [selectedStatus, setSelectedStatus] = useState(statusOptions[0]);

  const advancePayments: AdvancePayments[] = [
    {
      id: "00041",
      bookingNumber: "MX120043-W2000011",
      arrivalDate: new Date("2020-07-07"),
      guestName: "Daniel Torres",
      paymentMethod: "I Hope",
      advancePayment: 100.00,
      notAssigned: 0.00,
      currency: "USD"
    },
    {
      id: "00040",
      bookingNumber: "MX120043-W2000006",
      arrivalDate: new Date("2020-02-21"),
      guestName: "Oscar Arriaga",
      paymentMethod: "Transfer",
      advancePayment: 10.00,
      notAssigned: 0.00,
      currency: "MXN"
    },
    {
      id: "00039",
      bookingNumber: "MX120043-W1900140",
      arrivalDate: new Date("2019-12-03"),
      guestName: "Berenice Campos",
      paymentMethod: "Transfer",
      advancePayment: 500.00,
      notAssigned: 0.00,
      currency: "MXN"
    },
  ];

  const filteredBookings = advancePayments.filter(advancePayments =>
    advancePayments.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    advancePayments.bookingNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const SortIcon: React.FC = () => (
    <span className="ml-1 text-gray-400 text-xs">⇅</span>
  );

  return (
    <div className="">
      <div className="bg-white rounded-lg  overflow-hidden ">
        {/* Header Section */}
        <div className="p-3 sm:p-4 lg:p-5 border-b border-gray-200">
          {/* Filter Row */}
          <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-5">
            {/* Date Inputs */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <label className="font-normal text-gray-600 text-sm sm:text-base whitespace-nowrap">From:</label>
                <input
                  type="date"
                  value={fromDate ? fromDate.toISOString().split("T")[0] : ""}
                  onChange={(e) => setFromDate(new Date(e.target.value))}
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm bg-white w-full sm:min-w-[160px] lg:min-w-[200px] text-gray-600 focus:border-[#076DB3] focus:outline-none"
                />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <label className="font-normal text-gray-600 text-sm sm:text-base whitespace-nowrap">To:</label>
                <input
                  type="date"
                  value={toDate ? toDate.toISOString().split("T")[0] : ""}
                  onChange={(e) => setToDate(new Date(e.target.value))}
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm bg-white w-full sm:min-w-[160px] lg:min-w-[200px] text-gray-600 focus:border-[#076DB3] focus:outline-none"
                />
              </div>
            </div>

            {/* Status Filter and Filter Button */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <label className="font-normal text-gray-600 text-sm sm:text-base whitespace-nowrap">
                  Status:
                </label>
                <div className="relative w-full sm:min-w-[160px] lg:min-w-[200px]">
                  <Listbox value={selectedStatus} onChange={setSelectedStatus}>
                    <ListboxButton className="w-full flex items-center justify-between px-3 py-2 border border-gray-300 rounded-md text-sm bg-white text-gray-600 font-normal hover:bg-gray-100 focus:border-[#076DB3] focus:outline-none transition">
                      {selectedStatus}
                      <ChevronDown className="w-4 h-4 text-gray-500 ml-2" />
                    </ListboxButton>
                    <ListboxOptions className="absolute py-2 mt-1 w-full bg-white border border-[#076DB3] rounded-md shadow-lg z-10">
                      {statusOptions.map((option) => (
                        <ListboxOption
                          key={option}
                          value={option}
                          className="px-3 py-2 cursor-pointer text-sm flex justify-between items-center text-gray-600 font-normal data-[focus]:bg-gray-200 data-[focus]:text-gray-600 data-[selected]:font-semibold"
                        >
                          {option}
                        </ListboxOption>
                      ))}
                    </ListboxOptions>
                  </Listbox>
                </div>
              </div>

              <button className="px-4 sm:px-6 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-600 cursor-pointer flex items-center justify-center gap-2 hover:bg-gray-50 focus:border-[#076DB3] focus:outline-none">
                <ListFilterIcon size={14} />
                <span className="hidden sm:inline">Filter</span>
              </button>
            </div>
          </div>

          {/* Export and Search Row */}
          <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 sm:gap-4">
            <div className="flex flex-col sm:flex-row gap-2 order-2 sm:order-1">
              <button
                className="px-4 sm:px-5 py-2 bg-[#076DB3] hover:bg-[#054f80] rounded-md text-white text-sm font-normal cursor-pointer"
              >
                Add
              </button>
              <button
                className="px-4 sm:px-5 py-2 bg-gray-500 hover:bg-gray-700 rounded-md text-white text-sm font-normal cursor-pointer"
              >
                Export Excel
              </button>
              <button
                className="px-4 sm:px-5 py-2 bg-[#076DB3] hover:bg-[#054f80] rounded-md text-white text-sm font-normal cursor-pointer"
              >
                Export PDF
              </button>
            </div>

            <div className="flex items-center gap-2 order-1 sm:order-2">
              <div className="relative w-full sm:w-auto">
                <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-gray-400">
                  <Search size={16} />
                </span>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 pr-3 py-2 border border-gray-300 rounded-md text-sm min-w-[200px] focus:ring focus:ring-blue-200"
                  placeholder="Search..."
                />
              </div>
            </div>

          </div>
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto">
          <table className="w-full border-1 min-w-[900px]">
            <thead>
              <tr>
                <th className="bg-gray-50 px-2 py-3 text-left font-medium text-xs text-gray-400 uppercase tracking-wide border-b border-gray-200 w-28">
                  <div className="flex justify-center gap-1 items-center">
                    <div className="leading-tight">
                      NO ADVANCE<br />PAYMENT
                    </div>
                    <SortIcon />
                  </div>
                </th>
                <th className="bg-gray-50 px-2 py-3 text-left font-medium text-xs text-gray-400 uppercase tracking-wide border-b border-gray-200 w-30">
                  <div className="flex justify-center gap-1 items-center">
                    <div className="leading-tight">
                      BOOKING<br />NUMBER
                    </div>
                    <SortIcon />
                  </div>
                </th>
                <th className="bg-gray-50 px-2 py-3 text-left font-medium text-xs text-gray-400 uppercase tracking-wide border-b border-gray-200 w-20">
                  <div className="flex justify-center gap-1 items-center">
                    <div className="leading-tight">
                      ARRIVAL<br />DATE
                    </div>
                    <SortIcon />
                  </div>
                </th>
                <th className="bg-gray-50 px-2 py-3 text-left font-medium text-xs text-gray-400 uppercase tracking-wide border-b border-gray-200 w-16">
                  <div className="flex justify-center gap-1 items-center">
                    <div className="leading-tight">
                      GUEST<br />NAME
                    </div>
                    <SortIcon />
                  </div>
                </th>
                <th className="bg-gray-50 px-2 py-3 text-left font-medium text-xs text-gray-400 uppercase tracking-wide border-b border-gray-200 w-16">
                  <div className="flex justify-center gap-1 items-center">
                    <div className="leading-tight">
                      PAYMENT<br />METHOD
                    </div>
                    <SortIcon />
                  </div>
                </th>
                <th className="bg-gray-50 px-2 py-3 text-left font-medium text-xs text-gray-400 uppercase tracking-wide border-b border-gray-200 w-16">
                  <div className="flex justify-center gap-1 items-center">
                    <div className="leading-tight">
                      ADVANCE<br />PAYMENT
                    </div>
                    <SortIcon />
                  </div>
                </th>
                <th className="bg-gray-50 px-2 py-3 text-left font-medium text-xs text-gray-400 uppercase tracking-wide border-b border-gray-200 w-16">
                  <div className="flex justify-center gap-1 items-center">
                    <div className="leading-tight">
                      NOT<br />ASSIGNED
                    </div>
                    <SortIcon />
                  </div>
                </th>
                <th className="bg-gray-50 px-2 py-3 text-left font-medium text-xs text-gray-400 uppercase tracking-wide border-b border-gray-200 w-12">
                  <div className="flex justify-center gap-1 items-center">
                    <div>CURRENCY</div>
                    <SortIcon />
                  </div>
                </th>
                <th className="bg-gray-50 px-2 py-3 text-left font-medium text-xs text-gray-400 uppercase tracking-wide border-b border-gray-200 w-12">
                  ACTION
                </th>
              </tr>
            </thead>
            <tbody className='text-gray-600'>
              {filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-3 py-8 text-center text-gray-500">
                    No records found matching your search criteria.
                  </td>
                </tr>
              ) : (
                filteredBookings.map((payment) => (
                  <tr key={payment.id} className="hover:bg-gray-50">
                    <td className="px-2 py-3 border-b border-gray-100 text-xs align-middle text-center">
                      {payment.id}
                    </td>
                    <td className="px-2 py-3 border-b border-gray-100 text-xs align-middle text-center">
                      {payment.bookingNumber}
                    </td>
                    <td className="px-2 py-3 border-b border-gray-100 text-xs align-middle text-center">
                      {payment.arrivalDate.toLocaleDateString('en-GB')}
                    </td>
                    <td className="px-2 py-3 border-b border-gray-100 text-xs align-middle text-center">
                      {payment.guestName}
                    </td>
                    <td className="px-2 py-3 border-b border-gray-100 text-xs align-middle text-center">
                      {payment.paymentMethod}
                    </td>
                    <td className="px-2 py-3 border-b border-gray-100 text-xs align-middle text-center">
                      {payment.advancePayment}
                    </td>
                    <td className="px-2 py-3 border-b border-gray-100 text-xs align-middle text-center">
                      {payment.notAssigned}
                    </td>
                    <td className="px-2 py-3 border-b border-gray-100 text-xs align-middle text-center">
                      {payment.currency}
                    </td>
                    <td className="px-2 py-3 border-b border-gray-100 text-xs align-middle">
                      <Link href="advance-payments/see-advance-payments">
                        <button className="text-gray-600 items-center">
                          <Search size={16} />
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>

          </table>
        </div>


        {/* Pagination Section */}
        <div className="px-3 sm:px-5 py-4 flex flex-col sm:flex-row justify-between items-center border-t border-gray-200 gap-3">
          <div className="text-gray-600 text-sm order-2 sm:order-1">
            Showing {filteredBookings.length > 0 ? 1 : 0} to {Math.min(10, filteredBookings.length)} of {filteredBookings.length} rows
          </div>

          <div className="flex items-center gap-1 sm:gap-2 order-1 sm:order-2 flex-wrap justify-center">
            <button
              disabled
              className="px-2 sm:px-3 py-2 bg-white text-gray-400 rounded text-xs sm:text-sm cursor-not-allowed"
            >
              <span className="hidden sm:inline">≪ First</span>
              <span className="sm:hidden">≪</span>
            </button>
            <button
              disabled
              className="px-2 sm:px-3 py-2 bg-white text-gray-400 rounded text-xs sm:text-sm cursor-not-allowed"
            >
              <span className="hidden sm:inline">Previous</span>
              <span className="sm:hidden">‹</span>
            </button>
            <button className="px-2 sm:px-3 py-1 border-b-2 border-[#076DB3] bg-white text-[#076DB3] rounded text-xs sm:text-sm">
              1
            </button>
            <button
              onClick={() => setCurrentPage(2)}
              className="px-2 sm:px-3 py-2 bg-white text-gray-700 rounded text-xs sm:text-sm cursor-pointer hover:bg-gray-50"
            >
              <span className="hidden sm:inline">Next</span>
              <span className="sm:hidden">›</span>
            </button>
            <button
              onClick={() => setCurrentPage(2)}
              className="px-2 sm:px-3 py-2 bg-white text-gray-700 rounded text-xs sm:text-sm cursor-pointer hover:bg-gray-50"
            >
              <span className="hidden sm:inline">Last ≫</span>
              <span className="sm:hidden">≫</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
