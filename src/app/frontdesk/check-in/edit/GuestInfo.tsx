"use client"
import React, { useState } from 'react';
import { ChevronDown, Calendar, Plus } from 'lucide-react';
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';

const GuestInfo = () => {
    const genderOptions = ['Male', 'Female', 'Other', 'Prefer not to say'];
    const maritalStatusOptions = ['Single', 'Married', 'Divorced', 'Widowed'];
    const documentOptions = ['Passport', 'Driver License', 'National ID', 'Birth Certificate'];
    const professionOptions = ['Engineer', 'Doctor', 'Teacher', 'Business Owner', 'Student', 'Other'];
    const countries = ['Mexico', 'USA', 'Canada', 'Spain', 'France', 'Germany', 'Italy'];
    const provinces = ['', 'Campeche', 'Yucatan', 'Quintana Roo', 'Tabasco', 'Veracruz'];
    const cities = ['', 'Campeche', 'Merida', 'Cancun', 'Villahermosa', 'Veracruz'];
    const phoneTypes = ['Mobile', 'Home', 'Work', 'Fax'];

    const [formData, setFormData] = useState({
        // General Info
        title: '',
        firstName: 'Javier',
        lastName: 'Garcia',
        gender: '',
        birthDate: '',
        maritalStatus: '',
        nationality: 'Mexico',
        document: '',
        documentNr: '',
        profession: '',
        company: '',

        // Address
        country: 'Mexico',
        city: '',
        provinceState: '',
        neighborhood: '',
        street: '',
        number: '',
        floor: '',
        apartmentNr: '',
        zipCode: '',

        // Phone & Email
        phoneType: '',
        areaCode: '',
        phoneNr: '',
        emailUse: 'test@test.com',
        email: '',
        website: '',
        companionInfo: ''
    });

    const handleCloseModal = () => {
        // Handle close logic
    };

    const handleAccept = () => {
        // Handle accept logic
    };

    const handleAddProfession = () => {
        // Handle add profession logic
    };

    return (
        <div className="flex px-6 bg-gray-50 min-h-screen">
            <div className="bg-white p-4 sm:p-6 rounded-md w-full max-w-4xl">
                <h2 className="text-base sm:text-lg font-medium text-gray-900 mb-6">Guest Information</h2>

                <div className="space-y-8">
                    {/* General Info Section */}
                    <div>
                        <h3 className="text-sm font-medium text-gray-700 mb-4">General Info</h3>

                        <div className="space-y-4">
                            {/* First Name & Last Name */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs text-gray-600 mb-1">Title</label>
                                    <input
                                        type="text"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        className="w-full px-2 py-1.5 border border-[#076DB3] rounded-md bg-gray-50 
                  text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 
                  focus:ring-[#076DB3] focus:border-transparent text-xs sm:text-sm"
                                        placeholder=""
                                    />
                                </div>
                                <div></div>
                                <div>
                                    <label className="block text-xs text-gray-600 mb-1">First Name</label>
                                    <input
                                        type="text"
                                        value={formData.firstName}
                                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                        className="w-full px-2 py-1.5 border border-[#076DB3] rounded-md bg-gray-50 
                    text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 
                    focus:ring-[#076DB3] focus:border-transparent text-xs sm:text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs text-gray-600 mb-1">Last Name</label>
                                    <input
                                        type="text"
                                        value={formData.lastName}
                                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                        className="w-full px-2 py-1.5 border border-[#076DB3] rounded-md bg-gray-50 
                    text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 
                    focus:ring-[#076DB3] focus:border-transparent text-xs sm:text-sm"
                                    />
                                </div>
                            </div>

                            {/* Gender & Birth Date */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs text-gray-600 mb-1">Gender</label>
                                    <div className="relative">
                                        <Listbox value={formData.gender}
                                            onChange={(val) => setFormData({ ...formData, gender: val })}
                                        >
                                            <ListboxButton className="w-full flex items-center justify-between px-2 py-1.5 
                      border border-[#076DB3] rounded-md text-xs sm:text-sm bg-gray-50 text-gray-900 
                      hover:bg-gray-100 focus:border-[#076DB3] focus:outline-none transition">
                                                {formData.gender || 'Select'}
                                                <ChevronDown className="w-3.5 h-3.5 text-gray-500 ml-1" />
                                            </ListboxButton>
                                            <ListboxOptions className="absolute mt-1 py-2 w-full bg-white border border-[#076DB3] 
                      rounded-md shadow-md z-10 text-xs sm:text-sm max-h-40 overflow-y-auto">
                                                {genderOptions.map((option) => (
                                                    <ListboxOption
                                                        key={option}
                                                        value={option}
                                                        className="px-2 py-1 cursor-pointer text-gray-600 data-[focus]:bg-gray-200 data-[selected]:font-semibold"
                                                    >
                                                        {option}
                                                    </ListboxOption>
                                                ))}
                                            </ListboxOptions>
                                        </Listbox>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs text-gray-600 mb-1">Birth Date</label>
                                    <div className="relative">
                                        <input
                                            type="date"
                                            value={formData.birthDate}
                                            onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                                            className="w-full px-2 py-1.5 border border-[#076DB3] rounded-md bg-gray-50 
                      text-gray-900 focus:outline-none focus:ring-1 
                      focus:ring-[#076DB3] focus:border-transparent text-xs sm:text-sm"
                                        />

                                    </div>
                                </div>
                            </div>

                            {/* Marital Status & Nationality */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs text-gray-600 mb-1">Marital Status</label>
                                    <div className="relative">
                                        <Listbox value={formData.maritalStatus}
                                            onChange={(val) => setFormData({ ...formData, maritalStatus: val })}
                                        >
                                            <ListboxButton className="w-full flex items-center justify-between px-2 py-1.5 
                      border border-[#076DB3] rounded-md text-xs sm:text-sm bg-gray-50 text-gray-900 
                      hover:bg-gray-100 focus:border-[#076DB3] focus:outline-none transition">
                                                {formData.maritalStatus || 'Select'}
                                                <ChevronDown className="w-3.5 h-3.5 text-gray-500 ml-1" />
                                            </ListboxButton>
                                            <ListboxOptions className="absolute mt-1 py-2 w-full bg-white border border-[#076DB3] 
                      rounded-md shadow-md z-10 text-xs sm:text-sm max-h-40 overflow-y-auto">
                                                {maritalStatusOptions.map((option) => (
                                                    <ListboxOption
                                                        key={option}
                                                        value={option}
                                                        className="px-2 py-1 cursor-pointer text-gray-600 data-[focus]:bg-gray-200 data-[selected]:font-semibold"
                                                    >
                                                        {option}
                                                    </ListboxOption>
                                                ))}
                                            </ListboxOptions>
                                        </Listbox>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs text-gray-600 mb-1">Nationality</label>
                                    <input
                                        type="text"
                                        value={formData.nationality}
                                        onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
                                        className="w-full px-2 py-1.5 border border-[#076DB3] rounded-md bg-gray-50 
                    text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 
                    focus:ring-[#076DB3] focus:border-transparent text-xs sm:text-sm"
                                    />
                                </div>
                            </div>

                            {/* Document & Profession */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs text-gray-600 mb-1">Document</label>
                                    <div className="relative">
                                        <Listbox value={formData.document}
                                            onChange={(val) => setFormData({ ...formData, document: val })}
                                        >
                                            <ListboxButton className="w-full flex items-center justify-between px-2 py-1.5 
                      border border-[#076DB3] rounded-md text-xs sm:text-sm bg-gray-50 text-gray-900 
                      hover:bg-gray-100 focus:border-[#076DB3] focus:outline-none transition">
                                                {formData.document || 'Select'}
                                                <ChevronDown className="w-3.5 h-3.5 text-gray-500 ml-1" />
                                            </ListboxButton>
                                            <ListboxOptions className="absolute mt-1 py-2 w-full bg-white border border-[#076DB3] 
                      rounded-md shadow-md z-10 text-xs sm:text-sm max-h-40 overflow-y-auto">
                                                {documentOptions.map((option) => (
                                                    <ListboxOption
                                                        key={option}
                                                        value={option}
                                                        className="px-2 py-1 cursor-pointer text-gray-600 data-[focus]:bg-gray-200 data-[selected]:font-semibold"
                                                    >
                                                        {option}
                                                    </ListboxOption>
                                                ))}
                                            </ListboxOptions>
                                        </Listbox>
                                    </div>
                                </div>
                                <div className="relative">
                                    <label className="block text-xs text-gray-600 mb-1">Profession</label>
                                    <div className="relative">
                                        <Listbox value={formData.profession}
                                            onChange={(val) => setFormData({ ...formData, profession: val })}
                                        >
                                            <ListboxButton className="w-full flex items-center justify-between px-2 py-1.5 
                      border border-[#076DB3] rounded-md text-xs sm:text-sm bg-gray-50 text-gray-900 
                      hover:bg-gray-100 focus:border-[#076DB3] focus:outline-none transition">
                                                {formData.profession || 'Select'}
                                                <ChevronDown className="w-3.5 h-3.5 text-gray-500 ml-1" />
                                            </ListboxButton>
                                            <ListboxOptions className="absolute mt-1 py-2 w-full bg-white border border-[#076DB3] 
                      rounded-md shadow-md z-10 text-xs sm:text-sm max-h-40 overflow-y-auto">
                                                {professionOptions.map((option) => (
                                                    <ListboxOption
                                                        key={option}
                                                        value={option}
                                                        className="px-2 py-1 cursor-pointer text-gray-600 data-[focus]:bg-gray-200 data-[selected]:font-semibold"
                                                    >
                                                        {option}
                                                    </ListboxOption>
                                                ))}
                                            </ListboxOptions>
                                        </Listbox>
                                        <button
                                            type="button"
                                            onClick={handleAddProfession}
                                            className="absolute right-0 top-0 mt-1.5 mr-1 p-1 bg-gray-100 hover:bg-gray-200 
                      border border-gray-300 rounded text-gray-600 transition-colors"
                                        >
                                            <Plus className="w-3 h-3" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Document Nr & Company */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs text-gray-600 mb-1">Document Nr.</label>
                                    <input
                                        type="text"
                                        value={formData.documentNr}
                                        onChange={(e) => setFormData({ ...formData, documentNr: e.target.value })}
                                        className="w-full px-2 py-1.5 border border-[#076DB3] rounded-md bg-gray-50 
                    text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 
                    focus:ring-[#076DB3] focus:border-transparent text-xs sm:text-sm"
                                        placeholder=""
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs text-gray-600 mb-1">Company</label>
                                    <input
                                        type="text"
                                        value={formData.company}
                                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                        className="w-full px-2 py-1.5 border border-[#076DB3] rounded-md bg-gray-50 
                    text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 
                    focus:ring-[#076DB3] focus:border-transparent text-xs sm:text-sm"
                                        placeholder=""
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Address Section */}
                    <div>
                        <h3 className="text-sm font-medium text-gray-700 mb-4">Address</h3>

                        <div className="space-y-4">
                            {/* Country & City */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs text-gray-600 mb-1">Country</label>
                                    <div className="relative">
                                        <Listbox value={formData.country}
                                            onChange={(val) => setFormData({ ...formData, country: val })}
                                        >
                                            <ListboxButton className="w-full flex items-center justify-between px-2 py-1.5 
                      border border-[#076DB3] rounded-md text-xs sm:text-sm bg-gray-50 text-gray-900 
                      hover:bg-gray-100 focus:border-[#076DB3] focus:outline-none transition">
                                                {formData.country}
                                                <ChevronDown className="w-3.5 h-3.5 text-gray-500 ml-1" />
                                            </ListboxButton>
                                            <ListboxOptions className="absolute mt-1 py-2 w-full bg-white border border-[#076DB3] 
                      rounded-md shadow-md z-10 text-xs sm:text-sm max-h-40 overflow-y-auto">
                                                {countries.map((option) => (
                                                    <ListboxOption
                                                        key={option}
                                                        value={option}
                                                        className="px-2 py-1 cursor-pointer text-gray-600 data-[focus]:bg-gray-200 data-[selected]:font-semibold"
                                                    >
                                                        {option}
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
                                                {formData.city || 'Select'}
                                                <ChevronDown className="w-3.5 h-3.5 text-gray-500 ml-1" />
                                            </ListboxButton>
                                            <ListboxOptions className="absolute mt-1 py-2 w-full bg-white border border-[#076DB3] 
                      rounded-md shadow-md z-10 text-xs sm:text-sm max-h-40 overflow-y-auto">
                                                {cities.map((option) => (
                                                    <ListboxOption
                                                        key={option}
                                                        value={option}
                                                        className="px-2 py-1 cursor-pointer text-gray-600 data-[focus]:bg-gray-200 data-[selected]:font-semibold"
                                                    >
                                                        {option || 'Select'}
                                                    </ListboxOption>
                                                ))}
                                            </ListboxOptions>
                                        </Listbox>
                                    </div>
                                </div>
                            </div>

                            {/* Province/State & Neighborhood */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs text-gray-600 mb-1">Province/State</label>
                                    <div className="relative">
                                        <Listbox value={formData.provinceState}
                                            onChange={(val) => setFormData({ ...formData, provinceState: val })}
                                        >
                                            <ListboxButton className="w-full flex items-center justify-between px-2 py-1.5 
                      border border-[#076DB3] rounded-md text-xs sm:text-sm bg-gray-50 text-gray-900 
                      hover:bg-gray-100 focus:border-[#076DB3] focus:outline-none transition">
                                                {formData.provinceState || 'Select'}
                                                <ChevronDown className="w-3.5 h-3.5 text-gray-500 ml-1" />
                                            </ListboxButton>
                                            <ListboxOptions className="absolute mt-1 py-2 w-full bg-white border border-[#076DB3] 
                      rounded-md shadow-md z-10 text-xs sm:text-sm max-h-40 overflow-y-auto">
                                                {provinces.map((option, index) => (
                                                    <ListboxOption
                                                        key={index}
                                                        value={option}
                                                        className="px-2 py-1 cursor-pointer text-gray-600 data-[focus]:bg-gray-200 data-[selected]:font-semibold"
                                                    >
                                                        {option || 'Select'}
                                                    </ListboxOption>
                                                ))}
                                            </ListboxOptions>
                                        </Listbox>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs text-gray-600 mb-1">Neighborhood</label>
                                    <input
                                        type="text"
                                        value={formData.neighborhood}
                                        onChange={(e) => setFormData({ ...formData, neighborhood: e.target.value })}
                                        className="w-full px-2 py-1.5 border border-[#076DB3] rounded-md bg-gray-50 
                    text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 
                    focus:ring-[#076DB3] focus:border-transparent text-xs sm:text-sm"
                                        placeholder=""
                                    />
                                </div>
                            </div>

                            {/* Street & Number */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs text-gray-600 mb-1">Street</label>
                                    <input
                                        type="text"
                                        value={formData.street}
                                        onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                                        className="w-full px-2 py-1.5 border border-[#076DB3] rounded-md bg-gray-50 
                    text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 
                    focus:ring-[#076DB3] focus:border-transparent text-xs sm:text-sm"
                                        placeholder=""
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs text-gray-600 mb-1">Number</label>
                                    <input
                                        type="text"
                                        value={formData.number}
                                        onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                                        className="w-full px-2 py-1.5 border border-[#076DB3] rounded-md bg-gray-50 
                    text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 
                    focus:ring-[#076DB3] focus:border-transparent text-xs sm:text-sm"
                                        placeholder=""
                                    />
                                </div>
                            </div>

                            {/* Floor & Apartment Nr */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs text-gray-600 mb-1">Floor</label>
                                    <input
                                        type="text"
                                        value={formData.floor}
                                        onChange={(e) => setFormData({ ...formData, floor: e.target.value })}
                                        className="w-full px-2 py-1.5 border border-[#076DB3] rounded-md bg-gray-50 
                    text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 
                    focus:ring-[#076DB3] focus:border-transparent text-xs sm:text-sm"
                                        placeholder=""
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs text-gray-600 mb-1">Apartment Nr.</label>
                                    <input
                                        type="text"
                                        value={formData.apartmentNr}
                                        onChange={(e) => setFormData({ ...formData, apartmentNr: e.target.value })}
                                        className="w-full px-2 py-1.5 border border-[#076DB3] rounded-md bg-gray-50 
                    text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 
                    focus:ring-[#076DB3] focus:border-transparent text-xs sm:text-sm"
                                        placeholder=""
                                    />
                                </div>
                            </div>

                            {/* Zip Code - Half Width */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs text-gray-600 mb-1">Zip Code</label>
                                    <input
                                        type="text"
                                        value={formData.zipCode}
                                        onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                                        className="w-full px-2 py-1.5 border border-[#076DB3] rounded-md bg-gray-50 
                    text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 
                    focus:ring-[#076DB3] focus:border-transparent text-xs sm:text-sm"
                                        placeholder=""
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Phone Section */}
                    <div>
                        <h3 className="text-sm font-medium text-gray-700 mb-4">Phone</h3>

                        <div className="space-y-4">
                            {/* Type & Area Code */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs text-gray-600 mb-1">Type</label>
                                    <div className="relative">
                                        <Listbox value={formData.phoneType}
                                            onChange={(val) => setFormData({ ...formData, phoneType: val })}
                                        >
                                            <ListboxButton className="w-full flex items-center justify-between px-2 py-1.5 
                      border border-[#076DB3] rounded-md text-xs sm:text-sm bg-gray-50 text-gray-900 
                      hover:bg-gray-100 focus:border-[#076DB3] focus:outline-none transition">
                                                {formData.phoneType || 'Select'}
                                                <ChevronDown className="w-3.5 h-3.5 text-gray-500 ml-1" />
                                            </ListboxButton>
                                            <ListboxOptions className="absolute mt-1 py-2 w-full bg-white border border-[#076DB3] 
                      rounded-md shadow-md z-10 text-xs sm:text-sm max-h-40 overflow-y-auto">
                                                {phoneTypes.map((option) => (
                                                    <ListboxOption
                                                        key={option}
                                                        value={option}
                                                        className="px-2 py-1 cursor-pointer text-gray-600 data-[focus]:bg-gray-200 data-[selected]:font-semibold"
                                                    >
                                                        {option}
                                                    </ListboxOption>
                                                ))}
                                            </ListboxOptions>
                                        </Listbox>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs text-gray-600 mb-1">Area Code</label>
                                    <input
                                        type="text"
                                        value={formData.areaCode}
                                        onChange={(e) => setFormData({ ...formData, areaCode: e.target.value })}
                                        className="w-full px-2 py-1.5 border border-[#076DB3] rounded-md bg-gray-50 
                    text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 
                    focus:ring-[#076DB3] focus:border-transparent text-xs sm:text-sm"
                                        placeholder=""
                                    />
                                </div>
                            </div>

                            {/* Phone Nr - Half Width */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs text-gray-600 mb-1">Phone Nr.</label>
                                    <input
                                        type="text"
                                        value={formData.phoneNr}
                                        onChange={(e) => setFormData({ ...formData, phoneNr: e.target.value })}
                                        className="w-full px-2 py-1.5 border border-[#076DB3] rounded-md bg-gray-50 
                    text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 
                    focus:ring-[#076DB3] focus:border-transparent text-xs sm:text-sm"
                                        placeholder=""
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Email/Website Section */}
                    <div>
                        <h3 className="text-sm font-medium text-gray-700 mb-4">Email/Website</h3>

                        <div className="space-y-4">
                            {/* Email Use & Email */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs text-gray-600 mb-1">Email Use</label>
                                    <input
                                        type="text"
                                        value={formData.emailUse}
                                        onChange={(e) => setFormData({ ...formData, emailUse: e.target.value })}
                                        className="w-full px-2 py-1.5 border border-[#076DB3] rounded-md bg-gray-50 
                    text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 
                    focus:ring-[#076DB3] focus:border-transparent text-xs sm:text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs text-gray-600 mb-1">Email</label>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full px-2 py-1.5 border border-[#076DB3] rounded-md bg-gray-50 
                    text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 
                    focus:ring-[#076DB3] focus:border-transparent text-xs sm:text-sm"
                                        placeholder=""
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs text-gray-600 mb-1">Website</label>
                                    <input
                                        type="text"
                                        value={formData.website}
                                        onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                                        className="w-full px-2 py-1.5 border border-[#076DB3] rounded-md bg-gray-50 
                    text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 
                    focus:ring-[#076DB3] focus:border-transparent text-xs sm:text-sm"
                                        placeholder=""
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs text-gray-600 mt-3 mb-1">Companion Info</label>
                                <textarea
                                    value={formData.companionInfo}
                                    onChange={(e) => setFormData({ ...formData, companionInfo: e.target.value })}
                                    className="w-full px-2 py-1.5 border border-[#076DB3] rounded-md bg-gray-50 
      text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 
      focus:ring-[#076DB3] focus:border-transparent text-xs sm:text-sm resize-none"
                                    placeholder=""
                                    rows={3}
                                />
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
export default GuestInfo;