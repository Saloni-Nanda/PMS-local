"use client"
import React, { useState } from 'react';
import { CustomListbox } from '@/components/ui/Listbox';

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
        emailUse: '',
        email: '',
        website: '',
        companionInfo: ''
    });

    return (
        <div className="flex bg-gray-50 min-h-screen">
            <div className="bg-white p-1 sm:p-2 lg:p-4 rounded-md w-full max-w-4xl">
                <h2 className="text-base sm:text-lg font-medium text-gray-900 mb-6">Guest Information</h2>

                <div className="space-y-8">
                    {/* General Info Section */}
                    <div>
                        <h3 className="text-sm font-medium text-gray-700 mb-4">General Info</h3>

                        <div className="space-y-4">
                            {/* First Name & Last Name */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm text-gray-600 mb-2">Title</label>
                                    <input
                                        type="text"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        className="w-full px-2 py-2 border border-gray-300 rounded-md bg-gray-50 
                  text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 
                  focus:ring-[#076DB3] focus:border-transparent text-xs sm:text-sm"
                                        placeholder=""
                                    />
                                </div>
                                <div></div>
                                <div>
                                    <label className="block text-sm text-gray-600 mb-2">First Name</label>
                                    <input
                                        type="text"
                                        value={formData.firstName}
                                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                        className="w-full px-2 py-2 border border-gray-300 rounded-md bg-gray-50 
                    text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 
                    focus:ring-[#076DB3] focus:border-transparent text-xs sm:text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-600 mb-2">Last Name</label>
                                    <input
                                        type="text"
                                        value={formData.lastName}
                                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                        className="w-full px-2 py-2 border border-gray-300 rounded-md bg-gray-50 
                    text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 
                    focus:ring-[#076DB3] focus:border-transparent text-xs sm:text-sm"
                                    />
                                </div>
                            </div>

                            {/* Gender & Birth Date */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <CustomListbox
                                    label="Gender"
                                    value={formData.gender}
                                    onChange={(val) => setFormData({ ...formData, gender: val })}
                                    options={genderOptions}
                                    placeholder='select'
                                />

                                <div>
                                    <label className="block text-sm text-gray-600 mb-2">Birth Date</label>
                                    <div className="relative">
                                        <input
                                            type="date"
                                            value={formData.birthDate}
                                            onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                                            className="w-full px-2 py-2 border border-gray-300 rounded-md bg-gray-50 
                      text-gray-900 focus:outline-none focus:ring-1 
                      focus:ring-[#076DB3] focus:border-transparent text-xs sm:text-sm"
                                        />

                                    </div>
                                </div>
                            </div>

                            {/* Marital Status & Nationality */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <CustomListbox
                                    label="Marital Status"
                                    value={formData.maritalStatus}
                                    onChange={(val) => setFormData({ ...formData, maritalStatus: val })}
                                    options={maritalStatusOptions}
                                    placeholder='select'
                                />
                                <div>
                                    <label className="block text-sm text-gray-600 mb-2">Nationality</label>
                                    <input
                                        type="text"
                                        value={formData.nationality}
                                        onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
                                        className="w-full px-2 py-2 border border-gray-300 rounded-md bg-gray-50 
                    text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 
                    focus:ring-[#076DB3] focus:border-transparent text-xs sm:text-sm"
                                    />
                                </div>
                            </div>

                            {/* Document & Profession */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <CustomListbox
                                    label="Document"
                                    value={formData.document}
                                    onChange={(val) => setFormData({ ...formData, document: val })}
                                    options={documentOptions}
                                    placeholder='select'
                                />

                                <CustomListbox
                                    label="Profession"
                                    value={formData.profession}
                                    onChange={(val) => setFormData({ ...formData, profession: val })}
                                    options={professionOptions}
                                    placeholder='select'
                                />

                            </div>

                            {/* Document Nr & Company */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                                <div>
                                    <label className="block text-sm text-gray-600 mb-2">Document Nr.</label>
                                    <input
                                        type="text"
                                        value={formData.documentNr}
                                        onChange={(e) => setFormData({ ...formData, documentNr: e.target.value })}
                                        className="w-full px-2 py-2 border border-gray-300 rounded-md bg-gray-50 
                    text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 
                    focus:ring-[#076DB3] focus:border-transparent text-xs sm:text-sm"
                                        placeholder=""
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-600 mb-2">Company</label>
                                    <input
                                        type="text"
                                        value={formData.company}
                                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                        className="w-full px-2 py-2 border border-gray-300 rounded-md bg-gray-50 
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
                                <CustomListbox
                                    label="Country"
                                    value={formData.country}
                                    onChange={(val) => setFormData({ ...formData, country: val })}
                                    options={countries}
                                    placeholder='select'
                                />

                                <CustomListbox
                                    label="City"
                                    value={formData.city}
                                    onChange={(val) => setFormData({ ...formData, city: val })}
                                    options={cities}
                                    placeholder='select'
                                />

                            </div>

                            {/* Province/State & Neighborhood */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                                <CustomListbox
                                    label="Province/State"
                                    value={formData.provinceState}
                                    onChange={(val) => setFormData({ ...formData, provinceState: val })}
                                    options={provinces}
                                    placeholder='select'
                                />

                                <div>
                                    <label className="block text-sm text-gray-600 mb-2">Neighborhood</label>
                                    <input
                                        type="text"
                                        value={formData.neighborhood}
                                        onChange={(e) => setFormData({ ...formData, neighborhood: e.target.value })}
                                        className="w-full px-2 py-2 border border-gray-300 rounded-md bg-gray-50 
                    text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 
                    focus:ring-[#076DB3] focus:border-transparent text-xs sm:text-sm"
                                        placeholder=""
                                    />
                                </div>
                            </div>

                            {/* Street & Number */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm text-gray-600 mb-2">Street</label>
                                    <input
                                        type="text"
                                        value={formData.street}
                                        onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                                        className="w-full px-2 py-2 border border-gray-300 rounded-md bg-gray-50 
                    text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 
                    focus:ring-[#076DB3] focus:border-transparent text-xs sm:text-sm"
                                        placeholder=""
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-600 mb-2">Number</label>
                                    <input
                                        type="text"
                                        value={formData.number}
                                        onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                                        className="w-full px-2 py-2 border border-gray-300 rounded-md bg-gray-50 
                    text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 
                    focus:ring-[#076DB3] focus:border-transparent text-xs sm:text-sm"
                                        placeholder=""
                                    />
                                </div>
                            </div>

                            {/* Floor & Apartment Nr */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm text-gray-600 mb-2">Floor</label>
                                    <input
                                        type="text"
                                        value={formData.floor}
                                        onChange={(e) => setFormData({ ...formData, floor: e.target.value })}
                                        className="w-full px-2 py-2 border border-gray-300 rounded-md bg-gray-50 
                    text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 
                    focus:ring-[#076DB3] focus:border-transparent text-xs sm:text-sm"
                                        placeholder=""
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-600 mb-2">Apartment Nr.</label>
                                    <input
                                        type="text"
                                        value={formData.apartmentNr}
                                        onChange={(e) => setFormData({ ...formData, apartmentNr: e.target.value })}
                                        className="w-full px-2 py-2 border border-gray-300 rounded-md bg-gray-50 
                    text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 
                    focus:ring-[#076DB3] focus:border-transparent text-xs sm:text-sm"
                                        placeholder=""
                                    />
                                </div>
                            </div>

                            {/* Zip Code - Half Width */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm text-gray-600 mb-2">Zip Code</label>
                                    <input
                                        type="text"
                                        value={formData.zipCode}
                                        onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                                        className="w-full px-2 py-2 border border-gray-300 rounded-md bg-gray-50 
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
                                <CustomListbox
                                    label="Type"
                                    value={formData.phoneType}
                                    onChange={(val) => setFormData({ ...formData, phoneType: val })}
                                    options={phoneTypes}
                                    placeholder="select"
                                />

                                <div>
                                    <label className="block text-sm text-gray-600 mb-2">Area Code</label>
                                    <input
                                        type="text"
                                        value={formData.areaCode}
                                        onChange={(e) => setFormData({ ...formData, areaCode: e.target.value })}
                                        className="w-full px-2 py-2 border border-gray-300 rounded-md bg-gray-50 
                    text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 
                    focus:ring-[#076DB3] focus:border-transparent text-xs sm:text-sm"
                                        placeholder=""
                                    />
                                </div>
                            </div>

                            {/* Phone Nr - Half Width */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm text-gray-600 mb-2">Phone Nr.</label>
                                    <input
                                        type="text"
                                        value={formData.phoneNr}
                                        onChange={(e) => setFormData({ ...formData, phoneNr: e.target.value })}
                                        className="w-full px-2 py-2 border border-gray-300 rounded-md bg-gray-50 
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
                                    <label className="block text-sm text-gray-600 mb-2">Email Use</label>
                                    <input
                                        type="email"
                                        value={formData.emailUse}
                                        onChange={(e) => setFormData({ ...formData, emailUse: e.target.value })}
                                        className="w-full px-2 py-2 border border-gray-300 rounded-md bg-gray-50 
                    text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 
                    focus:ring-[#076DB3] focus:border-transparent text-xs sm:text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-600 mb-2">Email</label>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full px-2 py-2 border border-gray-300 rounded-md bg-gray-50 
                    text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 
                    focus:ring-[#076DB3] focus:border-transparent text-xs sm:text-sm"
                                        placeholder=""
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-600 mb-2">Website</label>
                                    <input
                                        type="text"
                                        value={formData.website}
                                        onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                                        className="w-full px-2 py-2 border border-gray-300 rounded-md bg-gray-50 
                    text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 
                    focus:ring-[#076DB3] focus:border-transparent text-xs sm:text-sm"
                                        placeholder=""
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm text-gray-600 mt-3 mb-2">Companion Info</label>
                                <textarea
                                    value={formData.companionInfo}
                                    onChange={(e) => setFormData({ ...formData, companionInfo: e.target.value })}
                                    className="w-full px-2 py-2 border border-gray-300 rounded-md bg-gray-50 
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