"use client"
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';

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

  const handleCloseModal = () => {
    // Handle close logic
  };

  const handleAccept = () => {
    // Handle accept logic
  };

  return (
    <div className="flex px-6 bg-gray-50">
      <div className="bg-white rounded-md w-full max-w-4xl">
        <h2 className="text-base sm:text-lg font-medium text-gray-900 mb-4">Room Booking Info</h2>

        <div className="space-y-4">
          {/* Room and Cost Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-600 mb-1">Select Room Number</label>
              <div className="relative">
                <Listbox value={formData.roomNumber}
                  onChange={(val) => setFormData({ ...formData, roomNumber: val })}
                >
                  <ListboxButton className="w-full flex items-center justify-between px-2 py-1.5 
                  border border-[#076DB3] rounded-md text-xs sm:text-sm bg-gray-50 text-gray-900 
                  hover:bg-gray-100 focus:border-[#076DB3] focus:outline-none transition">
                    {formData.roomNumber}
                    <ChevronDown className="w-3.5 h-3.5 text-gray-500 ml-1" />
                  </ListboxButton>
                  <ListboxOptions className="absolute mt-1 py-2 w-full bg-white border border-[#076DB3] 
                  rounded-md shadow-md z-10 text-xs sm:text-sm">
                    {roomNumbers.map((room) => (
                      <ListboxOption
                        key={room}
                        value={room}
                        className="px-2 py-1 cursor-pointer text-gray-600 data-[focus]:bg-gray-200 data-[selected]:font-semibold"
                      >
                        {room}
                      </ListboxOption>
                    ))}
                  </ListboxOptions>
                </Listbox>
              </div>
            </div>

            <div>
              <label className="block text-xs text-gray-600 mb-1">Total Cost</label>
              <input
                type="text"
                value={formData.totalCost}
                onChange={(e) => setFormData({ ...formData, totalCost: e.target.value })}
                className="w-full px-2 py-1.5 border border-[#076DB3] rounded-md bg-gray-50 
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
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Country</label>
                  <div className="relative">
                    <Listbox value={formData.originCountry}
                      onChange={(val) => setFormData({ ...formData, originCountry: val })}
                    >
                      <ListboxButton className="w-full flex items-center justify-between px-2 py-1.5 
                      border border-[#076DB3] rounded-md text-xs sm:text-sm bg-gray-50 text-gray-900 
                      hover:bg-gray-100 focus:border-[#076DB3] focus:outline-none transition">
                        {formData.originCountry}
                        <ChevronDown className="w-3.5 h-3.5 text-gray-500 ml-1" />
                      </ListboxButton>
                      <ListboxOptions className="absolute mt-1 py-2 w-full bg-white border border-[#076DB3] 
                      rounded-md shadow-md z-10 text-xs sm:text-sm">
                        {countries.map((country) => (
                          <ListboxOption
                            key={country}
                            value={country}
                            className="px-2 py-1 cursor-pointer text-gray-600 data-[focus]:bg-gray-200 data-[selected]:font-semibold"
                          >
                            {country}
                          </ListboxOption>
                        ))}
                      </ListboxOptions>
                    </Listbox>
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-gray-600 mb-1">Province</label>
                  <div className="relative">
                    <Listbox value={formData.province}
                      onChange={(val) => setFormData({ ...formData, province: val })}
                    >
                      <ListboxButton className="w-full flex items-center justify-between px-2 py-1.5 
                      border border-[#076DB3] rounded-md text-xs sm:text-sm bg-gray-50 text-gray-900 
                      hover:bg-gray-100 focus:border-[#076DB3] focus:outline-none transition">
                        {formData.province}
                        <ChevronDown className="w-3.5 h-3.5 text-gray-500 ml-1" />
                      </ListboxButton>
                      <ListboxOptions className="absolute mt-1 py-2 w-full bg-white border border-[#076DB3] 
                      rounded-md shadow-md z-10 text-xs sm:text-sm">
                        {provinces.map((province) => (
                          <ListboxOption
                            key={province}
                            value={province}
                            className="px-2 py-1 cursor-pointer text-gray-600 data-[focus]:bg-gray-200 data-[selected]:font-semibold"
                          >
                            {province}
                          </ListboxOption>
                        ))}
                      </ListboxOptions>
                    </Listbox>
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-gray-600 mb-1">City</label>
                  <div className="relative">
                    <Listbox value={formData.city}
                      onChange={(val) => setFormData({ ...formData, city: val })}
                    >
                      <ListboxButton className="w-full flex items-center justify-between px-2 py-1.5 
                      border border-[#076DB3] rounded-md text-xs sm:text-sm bg-gray-50 text-gray-900 
                      hover:bg-gray-100 focus:border-[#076DB3] focus:outline-none transition">
                        {formData.city}
                        <ChevronDown className="w-3.5 h-3.5 text-gray-500 ml-1" />
                      </ListboxButton>
                      <ListboxOptions className="absolute mt-1 py-2 w-full bg-white border border-[#076DB3] 
                      rounded-md shadow-md z-10 text-xs sm:text-sm">
                        {cities.map((city) => (
                          <ListboxOption
                            key={city}
                            value={city}
                            className="px-2 py-1 cursor-pointer text-gray-600 data-[focus]:bg-gray-200 data-[selected]:font-semibold"
                          >
                            {city}
                          </ListboxOption>
                        ))}
                      </ListboxOptions>
                    </Listbox>
                  </div>
                </div>
              </div>

              {/* Right Column - Destination */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Country</label>
                  <input
                    type="text"
                    value={formData.destinationCountry}
                    onChange={(e) => setFormData({ ...formData, destinationCountry: e.target.value })}
                    className="w-full px-2 py-1.5 border border-[#076DB3] rounded-md bg-gray-50 
                    text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 
                    focus:ring-[#076DB3] focus:border-transparent text-xs sm:text-sm"
                    placeholder="NA"
                  />
                </div>

                <div>
                  <label className="block text-xs text-gray-600 mb-1">Country</label>
                  <input
                    type="text"
                    value={formData.destinationProvince}
                    onChange={(e) => setFormData({ ...formData, destinationProvince: e.target.value })}
                    className="w-full px-2 py-1.5 border border-[#076DB3] rounded-md bg-gray-50 
                    text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 
                    focus:ring-[#076DB3] focus:border-transparent text-xs sm:text-sm"
                    placeholder="NA"
                  />
                </div>

                <div>
                  <label className="block text-xs text-gray-600 mb-1">City</label>
                  <input
                    type="text"
                    value={formData.destinationCity}
                    onChange={(e) => setFormData({ ...formData, destinationCity: e.target.value })}
                    className="w-full px-2 py-1.5 border border-[#076DB3] rounded-md bg-gray-50 
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