"use client"
import React, { useState } from 'react';
import { CustomListbox } from '@/components/ui/Listbox';

const RoomSelection = () => {
  const roomNumbers = ['D1_1', 'D1_2', 'D1_3', 'D2_1', 'D2_2', 'D3_1'];
  const countries = ['Mexico', 'USA', 'Canada', 'Spain', 'France'];
  const provinces = ['Campeche', 'Yucatan', 'Quintana Roo', 'Tabasco', 'Veracruz'];
  const cities = ['Campeche', 'Merida', 'Cancun', 'Villahermosa', 'Veracruz'];

  const [formData, setFormData] = useState({
    roomNumber: roomNumbers[0],
    totalCost: '15.00',
    originCountry: countries[0],
    destinationCountry: '',
    province: provinces[0],
    destinationProvince: '',
    city: cities[0],
    destinationCity: ''
  });

  return (
    <div className="flex  bg-gray-50">
      <div className="bg-white rounded-md w-full max-w-4xl">
        <h2 className="text-base sm:text-lg font-medium text-gray-900 mb-4">Room Booking Info</h2>

        <div className="space-y-4">
          {/* Room and Cost Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <CustomListbox
              label="Select Room Number"
              value={formData.roomNumber}
              onChange={(val) => setFormData({ ...formData, roomNumber: val })}
              options={roomNumbers}
            />

            <div>
              <label className="block text-sm text-gray-600 mb-2">Total Cost</label>
              <input
                type="text"
                value={formData.totalCost}
                onChange={(e) => setFormData({ ...formData, totalCost: e.target.value })}
                className="w-full px-2 py-2 border border-gray-300 rounded-md bg-gray-50 
                text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 
                focus:ring-[#076DB3] focus:border-transparent text-xs sm:text-sm"
                placeholder="0.00"
              />
            </div>
          </div>

          {/* Origin and Destination Section */}
          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-700 mb-4">Origin and Destination</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Left Column - Origin */}
              <div className="space-y-4">
                <CustomListbox
                  label="Country"
                  value={formData.originCountry}
                  onChange={(val) => setFormData({ ...formData, originCountry: val })}
                  options={countries}
                />

                <CustomListbox
                  label="Province"
                  value={formData.province}
                  onChange={(val) => setFormData({ ...formData, province: val })}
                  options={provinces}
                />

                <CustomListbox
                  label="City"
                  value={formData.city}
                  onChange={(val) => setFormData({ ...formData, city: val })}
                  options={cities}
                />

              </div>

              {/* Right Column - Destination */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-2">Country</label>
                  <input
                    type="text"
                    value={formData.destinationCountry}
                    onChange={(e) => setFormData({ ...formData, destinationCountry: e.target.value })}
                    className="w-full px-2 py-2 border border-gray-300 rounded-md bg-gray-50 
                    text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 
                    focus:ring-[#076DB3] focus:border-transparent text-xs sm:text-sm"
                    placeholder="NA"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-2">Country</label>
                  <input
                    type="text"
                    value={formData.destinationProvince}
                    onChange={(e) => setFormData({ ...formData, destinationProvince: e.target.value })}
                    className="w-full px-2 py-2 border border-gray-300 rounded-md bg-gray-50 
                    text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 
                    focus:ring-[#076DB3] focus:border-transparent text-xs sm:text-sm"
                    placeholder="NA"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-2">City</label>
                  <input
                    type="text"
                    value={formData.destinationCity}
                    onChange={(e) => setFormData({ ...formData, destinationCity: e.target.value })}
                    className="w-full px-2 py-2 border border-gray-300 rounded-md bg-gray-50 
                    text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 
                    focus:ring-[#076DB3] focus:border-transparent text-xs sm:text-sm"
                    placeholder="NA"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>


      </div>
    </div>
  );
};

export default RoomSelection;