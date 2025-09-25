"use client"
import React, { useState } from 'react';

const Page = () => {
  const [paymentData] = useState({
    paymentNumber: 'PAY-001234',
    bookingNumber: 'BK-567890',
    paymentMethod: 'Credit Card',
    reference: 'REF-ABC123',
    unassignedAmount: '0.00',
    currency: 'USD',
    guest: 'John Smith',
    payment: '250.00',
    notes: 'Payment received for room reservation. Guest requested early check-in.'
  });

  const [roomDetails] = useState([
    {
      roomType: 'D1',
      roomNumber: 'D1_4',
      assignmentDate: '07/07/2020',
      assignedAmount: '100'
    },
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
                <div className="w-full px-2 py-1.5 border border-[#076DB3] rounded-md bg-gray-50 
                text-gray-900 text-xs sm:text-sm">
                  {paymentData.paymentNumber || '-'}
                </div>
              </div>

              <div>
                <label className="block text-xs text-gray-600 mb-1">Booking Number</label>
                <div className="w-full px-2 py-1.5 border border-[#076DB3] rounded-md bg-gray-50 
                text-gray-900 text-xs sm:text-sm">
                  {paymentData.bookingNumber || '-'}
                </div>
              </div>

              <div>
                <label className="block text-xs text-gray-600 mb-1">Reference</label>
                <div className="w-full px-2 py-1.5 border border-[#076DB3] rounded-md bg-gray-50 
                text-gray-900 text-xs sm:text-sm">
                  {paymentData.reference || '-'}
                </div>
              </div>

              <div>
                <label className="block text-xs text-gray-600 mb-1">Unassigned Amount</label>
                <div className="w-full px-2 py-1.5 border border-[#076DB3] rounded-md bg-gray-50 
                text-gray-900 text-xs sm:text-sm">
                  ${paymentData.unassignedAmount || '0.00'}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs text-gray-600 mb-1">Guest</label>
                <div className="w-full px-2 py-1.5 border border-[#076DB3] rounded-md bg-gray-50 
                text-gray-900 text-xs sm:text-sm">
                  {paymentData.guest || '-'}
                </div>
              </div>

              <div>
                <label className="block text-xs text-gray-600 mb-1">Payment Method</label>
                <div className="w-full px-2 py-1.5 border border-[#076DB3] rounded-md bg-gray-50 
                text-gray-900 text-xs sm:text-sm">
                  {paymentData.paymentMethod || '-'}
                </div>
              </div>

              <div>
                <label className="block text-xs text-gray-600 mb-1">Payment</label>
                <div className="w-full px-2 py-1.5 border border-[#076DB3] rounded-md bg-gray-50 
                text-gray-900 text-xs sm:text-sm">
                  ${paymentData.payment || '0.00'}
                </div>
              </div>

              <div>
                <label className="block text-xs text-gray-600 mb-1">Currency</label>
                <div className="w-full px-2 py-1.5 border border-[#076DB3] rounded-md bg-gray-50 
                text-gray-900 text-xs sm:text-sm">
                  {paymentData.currency || '-'}
                </div>
              </div>
            </div>
          </div>

          {/* Notes Section */}
          <div>
            <label className="block text-xs text-gray-600 mb-1">Notes</label>
            <div className="w-full px-2 py-1.5 border border-[#076DB3] rounded-md bg-gray-50 
            text-gray-900 text-xs sm:text-sm min-h-[80px]">
              {paymentData.notes || '-'}
            </div>
          </div>

          {/* Details Section */}
          <div className="pt-4">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Details</h3>
            
            <div className="overflow-x-auto border border-[#076DB3] rounded-md">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr className='border-b border-[#076DB3]'>
                    <th className="text-center py-2 px-3 text-xs text-gray-600 font-medium">
                      Room Type
                    </th>
                    <th className="text-center py-2 px-3 text-xs text-gray-600 font-medium">
                      Room Number
                    </th>
                    <th className="text-center py-2 px-3 text-xs text-gray-600 font-medium">
                      Assignment Date
                    </th>
                    <th className="text-center py-2 px-3 text-xs text-gray-600 font-medium">
                      Assigned Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {roomDetails.map((room, index) => (
                    <tr key={index} className="border-t border-gray-200">
                      <td className="py-2 px-3 text-xs sm:text-sm text-gray-900 text-center">{room.roomType}</td>
                      <td className="py-2 px-3 text-xs sm:text-sm text-gray-700 text-center">{room.roomNumber}</td>
                      <td className="py-2 px-3 text-xs sm:text-sm text-gray-700 text-center">{room.assignmentDate}</td>
                      <td className="py-2 px-3 text-xs sm:text-sm text-gray-900 text-center">${room.assignedAmount}</td>
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