"use client"
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';

const Page = () => {
  const [paymentData, setPaymentData] = useState({
    paymentNumber: '',
    bookingNumber: '',
    reference: '',
    unassignedAmount: '',
    guest: '',
    payment: '',
    notes: ''
  });

  const paymentMethods = ['I Hope', 'Credit Card', 'Cash', 'Bank Transfer', 'PayPal'];
  const currencies = ['USD', 'EUR', 'GBP', 'CAD', 'AUD'];


  const [paymentMethod, setPaymentMethod] = useState(paymentMethods[0]);
  const [currency, setCurrency] = useState(currencies[0]);

  
  const [roomDetails] = useState([
    {
      roomType: 'D1',
      roomNumber: 'D1_4',
      assignmentDate: '07/07/2020',
      assignedAmount: '100'
    }
  ]);

  return (
    <div className="flex px-6 bg-gray-50 min-h-screen">
      <div className="bg-white p-4 sm:p-6 rounded-md w-full max-w-4xl">
        <h2 className="text-base sm:text-lg font-medium text-gray-900 mb-4">Payment Info</h2>

        <div className="space-y-4">
          {/* Payment Information Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Left Column */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs text-gray-600 mb-1">Payment Nr.</label>
                <input
                  type="text"
                  value={paymentData.paymentNumber}
                  onChange={(e) => setPaymentData({...paymentData, paymentNumber: e.target.value})}
                  className="w-full px-2 py-1.5 border border-[#076DB3] rounded-md bg-gray-50 
                  text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 
                  focus:ring-[#076DB3] focus:border-transparent text-xs sm:text-sm"
                  placeholder="Enter payment number"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-600 mb-1">Booking Number</label>
                <input
                  type="text"
                  value={paymentData.bookingNumber}
                  onChange={(e) => setPaymentData({...paymentData, bookingNumber: e.target.value})}
                  className="w-full px-2 py-1.5 border border-[#076DB3] rounded-md bg-gray-50 
                  text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 
                  focus:ring-[#076DB3] focus:border-transparent text-xs sm:text-sm"
                  placeholder="Enter booking number"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-600 mb-1">Reference</label>
                <input
                  type="text"
                  value={paymentData.reference}
                  onChange={(e) => setPaymentData({...paymentData, reference: e.target.value})}
                  className="w-full px-2 py-1.5 border border-[#076DB3] rounded-md bg-gray-50 
                  text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 
                  focus:ring-[#076DB3] focus:border-transparent text-xs sm:text-sm"
                  placeholder="Enter reference"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-600 mb-1">Unassigned Amount</label>
                <input
                  type="text"
                  value={paymentData.unassignedAmount}
                  onChange={(e) => setPaymentData({...paymentData, unassignedAmount: e.target.value})}
                  className="w-full px-2 py-1.5 border border-[#076DB3] rounded-md bg-gray-50 
                  text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 
                  focus:ring-[#076DB3] focus:border-transparent text-xs sm:text-sm"
                  placeholder="0.00"
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs text-gray-600 mb-1">Guest</label>
                <input
                  type="text"
                  value={paymentData.guest}
                  onChange={(e) => setPaymentData({...paymentData, guest: e.target.value})}
                  className="w-full px-2 py-1.5 border border-[#076DB3] rounded-md bg-gray-50 
                  text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 
                  focus:ring-[#076DB3] focus:border-transparent text-xs sm:text-sm"
                  placeholder="Enter guest name"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-600 mb-1">Payment Method</label>
                <div className="relative">
                  <Listbox value={paymentMethod} onChange={setPaymentMethod}>
                    <ListboxButton className="w-full flex items-center justify-between px-2 py-1.5 
                    border border-[#076DB3] rounded-md text-xs sm:text-sm bg-gray-50 text-gray-900 
                    hover:bg-gray-100 focus:border-[#076DB3] focus:outline-none transition">
                      {paymentMethod}
                      <ChevronDown className="w-3.5 h-3.5 text-gray-500 ml-1" />
                    </ListboxButton>
                    <ListboxOptions className="absolute mt-1 py-2 w-full bg-white border border-[#076DB3] 
                    rounded-md shadow-md z-10 text-xs sm:text-sm">
                      {paymentMethods.map((method) => (
                        <ListboxOption
                          key={method}
                          value={method}
                          className="px-2 py-1 cursor-pointer text-gray-600 data-[focus]:bg-gray-200 data-[selected]:font-semibold"
                        >
                          {method}
                        </ListboxOption>
                      ))}
                    </ListboxOptions>
                  </Listbox>
                </div>
              </div>

              <div>
                <label className="block text-xs text-gray-600 mb-1">Payment</label>
                <input
                  type="text"
                  value={paymentData.payment}
                  onChange={(e) => setPaymentData({...paymentData, payment: e.target.value})}
                  className="w-full px-2 py-1.5 border border-[#076DB3] rounded-md bg-gray-50 
                  text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 
                  focus:ring-[#076DB3] focus:border-transparent text-xs sm:text-sm"
                  placeholder="Enter payment amount"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-600 mb-1">Currency</label>
                <div className="relative">
                  <Listbox value={currency} onChange={setCurrency}>
                    <ListboxButton className="w-full flex items-center justify-between px-2 py-1.5 
                    border border-[#076DB3] rounded-md text-xs sm:text-sm bg-gray-50 text-gray-900 
                    hover:bg-gray-100 focus:border-[#076DB3] focus:outline-none transition">
                      {currency}
                      <ChevronDown className="w-3.5 h-3.5 text-gray-500 ml-1" />
                    </ListboxButton>
                    <ListboxOptions className="absolute mt-1 py-2 w-full bg-white border border-[#076DB3] 
                    rounded-md shadow-md z-10 text-xs sm:text-sm">
                      {currencies.map((curr) => (
                        <ListboxOption
                          key={curr}
                          value={curr}
                          className="px-2 py-1 cursor-pointer text-gray-600 data-[focus]:bg-gray-200 data-[selected]:font-semibold"
                        >
                          {curr}
                        </ListboxOption>
                      ))}
                    </ListboxOptions>
                  </Listbox>
                </div>
              </div>
            </div>
          </div>

          {/* Notes Section */}
          <div>
            <label className="block text-xs text-gray-600 mb-1">Notes</label>
            <textarea
              rows={4}
              value={paymentData.notes}
              onChange={(e) => setPaymentData({...paymentData, notes: e.target.value})}
              className="w-full px-2 py-1.5 border border-[#076DB3] rounded-md bg-gray-50 
              text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 
              focus:ring-[#076DB3] focus:border-transparent text-xs sm:text-sm resize-none"
              placeholder="Enter any additional notes..."
            />
          </div>

          {/* Details Section */}
          <div className="pt-4">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Details</h3>
            
            <div className="overflow-x-auto border border-[#076DB3] rounded-md">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-2 px-3 text-xs text-gray-600 font-medium">
                      Room Type
                    </th>
                    <th className="text-left py-2 px-3 text-xs text-gray-600 font-medium">
                      Room Number
                    </th>
                    <th className="text-left py-2 px-3 text-xs text-gray-600 font-medium">
                      Assignment Date
                    </th>
                    <th className="text-left py-2 px-3 text-xs text-gray-600 font-medium">
                      Assigned Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {roomDetails.map((room, index) => (
                    <tr key={index} className="border-t border-gray-200">
                      <td className="py-2 px-3 text-xs sm:text-sm text-gray-900">{room.roomType}</td>
                      <td className="py-2 px-3 text-xs sm:text-sm text-gray-700">{room.roomNumber}</td>
                      <td className="py-2 px-3 text-xs sm:text-sm text-gray-700">{room.assignmentDate}</td>
                      <td className="py-2 px-3 text-xs sm:text-sm text-gray-900 font-medium">${room.assignedAmount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

         
        </div>
      </div>
    </div>
  );
};

export default Page;