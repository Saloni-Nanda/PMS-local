"use client"
import { Search, ChevronDown, ListFilterIcon } from 'lucide-react';
import React, { useState } from 'react';
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from "@headlessui/react";
import Link from 'next/link';

interface BookingData {
    id: number;
    arrivalDate: Date;
    reservationDate: Date;
    bookingNumber: string;
    status: string;
    nights: number;
    guestName: string;
    specialRequests: string;
    total: string;
    currency: string;
    ratePlan: string;
}

const Page: React.FC = () => {
    const [fromDate, setFromDate] = useState(new Date("2022-08-20"));
    const [toDate, setToDate] = useState(new Date("2022-08-20"));
    //const [searchBy, setSearchBy] = useState('Arrival Date');
    const [searchTerm, setSearchTerm] = useState('');
    const [_, setCurrentPage] = useState(1);
    const options = ["Arrival Date", "Booking Date"];
    const [searchBy, setSearchBy] = useState(options[0]);

    const bookings: BookingData[] = [
        {
            id: 1,
            arrivalDate: new Date("2022-03-17"),
            reservationDate: new Date("2022-03-17"),
            bookingNumber: 'MX120043-W2200002',
            status: 'New',
            nights: 1,
            guestName: 'Benjamin Bravo Lopez',
            specialRequests: '-',
            total: '100',
            currency: 'MXN',
            ratePlan: 'RACK'
        },
        {
            id: 2,
            arrivalDate: new Date("2022-03-17"),
            reservationDate: new Date("2022-03-17"),
            bookingNumber: 'MX120043-W2200001',
            status: 'New',
            nights: 1,
            guestName: 'javier ibarra',
            specialRequests: '-',
            total: '140.00',
            currency: 'MXN',
            ratePlan: 'RACK'
        }
    ];

    const filteredBookings = bookings.filter(booking =>
        booking.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.bookingNumber.toLowerCase().includes(searchTerm.toLowerCase())
    );


    const SortIcon: React.FC = () => (
        <span className="ml-1 text-gray-400 text-xs">⇅</span>
    );

    return (
        <div className=" bg-gray-50  ">
            <div className="bg-white rounded-lg  overflow-hidden ">
                {/* Header Section */}
                <div className="py-5 px-2 border-b border-gray-200">
                    {/* Filter Row */}
                    <div className="flex flex-wrap items-center gap-4 mb-5">
                        <div className="flex items-center gap-2">
                            <label className="font-normal text-gray-600 whitespace-nowrap">From:</label>
                            <input
                                type="date"
                                value={fromDate ? fromDate.toISOString().split("T")[0] : ""}
                                onChange={(e) =>
                                    setFromDate(new Date(e.target.value))
                                }
                                className="px-3 py-2 border border-gray-300 rounded-md text-sm bg-white min-w-[200px] text-gray-600 focus:border-sky-300  focus:outline-none
"
                            />

                        </div>

                        <div className="flex items-center gap-2">
                            <label className="font-normal text-gray-600 whitespace-nowrap">To:</label>
                            <input
                                type="date"
                                value={toDate ? toDate.toISOString().split("T")[0] : ""}
                                onChange={(e) => setToDate(new Date(e.target.value))}
                                className="px-3 py-2 border border-gray-300 rounded-md text-sm bg-white min-w-[200px] text-gray-600 focus:border-sky-300  focus:outline-none"
                                placeholder="dd/mm/yyyy"
                            />
                        </div>

                        {/* <div className="flex items-center gap-2">
                            <label className="font-normal text-gray-600 whitespace-nowrap">
                                Search by:
                            </label>
                            <select
                                value={searchBy}
                                onChange={(e) => setSearchBy(e.target.value)}
                                className="px-3 py-2 border border-gray-300 rounded-md text-sm bg-white min-w-[200px] 
               hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 transition"
                            >
                                <option>Arrival Date</option>
                                <option>Booking Date</option>
                            </select>
                        </div> */}

                        <div className="flex items-center gap-2">
                            <label className="font-normal text-gray-600 whitespace-nowrap">
                                Search by:
                            </label>

                            <div className="relative min-w-[200px]">
                                <Listbox value={searchBy} onChange={setSearchBy}>
                                    {/* Button */}
                                    <ListboxButton
                                        className="w-full flex items-center justify-between px-3 py-2 border border-gray-300 
                   rounded-md text-sm bg-white text-gray-600 font-normal 
                   hover:bg-gray-100 focus:border-sky-300 focus:outline-none transition"
                                    >
                                        {searchBy}
                                        <ChevronDown className="w-4 h-4 text-gray-500 ml-2" />
                                    </ListboxButton>

                                    {/* Options */}
                                    <ListboxOptions className="absolute mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10">
                                        {options.map((option) => (
                                            <ListboxOption
                                                key={option}
                                                value={option}
                                                className="px-3 py-2 cursor-pointer text-sm flex justify-between items-center 
                       text-gray-600 font-normal data-[focus]:bg-gray-200 data-[focus]:text-gray-600 
                       data-[selected]:font-semibold"
                                            >
                                                {option}
                                            </ListboxOption>
                                        ))}
                                    </ListboxOptions>
                                </Listbox>
                            </div>
                        </div>



                        <button className="px-6 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-600 cursor-pointer flex items-center gap-2 hover:bg-gray-50 focus:border-sky-300  focus:outline-none">
                            <span><ListFilterIcon size={10} /></span>
                            Filter
                        </button>
                    </div>

                    {/* Export and Search Row */}
                    <div className="flex justify-between items-center flex-wrap gap-4">
                        <div className="flex gap-2">
                            <button
                                className="px-5 py-2 bg-gray-600 text-white text-sm font-normal cursor-pointer"
                            >
                                Export Excel
                            </button>
                            <button
                                className="px-5 py-2 bg-sky-300 text-white text-sm font-normal cursor-pointer"
                            >
                                Export PDF
                            </button>
                        </div>

                        <div className="flex items-center gap-2">
                            <div className="relative">
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
                    <table className="w-full border-collapse min-w-[600px]">
                        <thead>
                            <tr>
                                <th className="bg-gray-50 px-2 py-3 text-left font-medium text-xs text-gray-400 uppercase tracking-wide border-b border-gray-200 w-20">
                                    <div className="flex justify-between items-start">
                                        <div className="leading-tight">
                                            ARRIVAL<br />DATE
                                        </div>
                                        <SortIcon />
                                    </div>
                                </th>
                                <th className="bg-gray-50 px-2 py-3 text-left font-medium text-xs text-gray-400 uppercase tracking-wide border-b border-gray-200 w-20">
                                    <div className="flex justify-between items-start">
                                        <div className="leading-tight">
                                            RESERVATION<br />DATE
                                        </div>
                                        <SortIcon />
                                    </div>
                                </th>
                                <th className="bg-gray-50 px-2 py-3 text-left font-medium text-xs text-gray-400 uppercase tracking-wide border-b border-gray-200 w-20">
                                    <div className="flex justify-between items-start">
                                        <div className="leading-tight">
                                            BOOKING<br />NUMBER
                                        </div>
                                        <SortIcon />
                                    </div>
                                </th>
                                <th className="bg-gray-50 px-2 py-3 text-left font-medium text-xs text-gray-400 uppercase tracking-wide border-b border-gray-200 w-16">
                                    <div className="flex justify-between items-start">
                                        <div>STATUS<br />&nbsp;</div>
                                        <SortIcon />
                                    </div>
                                </th>
                                <th className="bg-gray-50 px-2 py-3 text-left font-medium text-xs text-gray-400 uppercase tracking-wide border-b border-gray-200 w-12">
                                    <div className="flex justify-between items-start">
                                        <div>NIGHTS<br />&nbsp;</div>
                                        <SortIcon />
                                    </div>
                                </th>
                                <th className="bg-gray-50 px-2 py-3 text-left font-medium text-xs text-gray-400 uppercase tracking-wide border-b border-gray-200 w-24">
                                    <div className="flex justify-between items-start">
                                        <div className="leading-tight">
                                            GUEST<br />NAME
                                        </div>
                                        <SortIcon />
                                    </div>
                                </th>
                                <th className="bg-gray-50 px-2 py-3 text-left font-medium text-xs text-gray-400 uppercase tracking-wide border-b border-gray-200 w-20">
                                    <div className="flex justify-between items-start">
                                        <div className="leading-tight">
                                            SPECIAL<br />REQUESTS
                                        </div>
                                        <SortIcon />
                                    </div>
                                </th>
                                <th className="bg-gray-50 px-2 py-3 text-left font-medium text-xs text-gray-400 uppercase tracking-wide border-b border-gray-200 w-16">
                                    <div className="flex justify-between items-start">
                                        <div>TOTAL<br />&nbsp;</div>
                                        <SortIcon />
                                    </div>
                                </th>
                                <th className="bg-gray-50 px-2 py-3 text-left font-medium text-xs text-gray-400 uppercase tracking-wide border-b border-gray-200 w-20">
                                    <div className="flex justify-between items-start">
                                        <div className="leading-tight">
                                            RATE<br />PLAN
                                        </div>
                                        <SortIcon />
                                    </div>
                                </th>
                                <th className="bg-gray-50 px-2 py-3 text-left font-medium text-xs text-gray-400 uppercase tracking-wide border-b border-gray-200 w-12">
                                    ACTION<br />&nbsp;
                                </th>
                            </tr>
                        </thead>
                        <tbody className='text-gray-600'>
                            {filteredBookings.map((booking) => (
                                <tr key={booking.id} className="hover:bg-gray-50">
                                    <td className="px-2 py-3 border-b border-gray-100 text-sm align-middle">
                                        {booking.arrivalDate.toLocaleDateString()}
                                    </td>
                                    <td className="px-2 py-3 border-b border-gray-100 text-sm align-middle">
                                        {booking.reservationDate.toLocaleDateString()}
                                    </td>
                                    <td className="px-2 py-3 border-b border-gray-100 text-sm align-middle">
                                        {booking.bookingNumber}
                                    </td>
                                    <td className="px-2 py-3 border-b border-gray-100 text-sm align-middle">
                                        {booking.status}
                                    </td>
                                    <td className="px-2 py-3 border-b border-gray-100 text-sm align-middle">
                                        {booking.nights}
                                    </td>
                                    <td className="px-2 py-3 border-b border-gray-100 text-sm align-middle">
                                        {booking.guestName}
                                    </td>
                                    <td className="px-2 py-3 border-b border-gray-100 text-sm align-middle">
                                        {booking.specialRequests}
                                    </td>
                                    <td className="px-2 py-3 border-b border-gray-100 text-sm align-middle">
                                        {booking.total}<br />{booking.currency}
                                    </td>
                                    <td className="px-2 py-3 border-b border-gray-100 text-sm align-middle">
                                        {booking.ratePlan}
                                    </td>
                                    <td className="px-2 py-3 border-b border-gray-100 text-sm align-middle">
                                        <Link href="/bookings/search/see">
                                            <Search size={16} />
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Section */}
                <div className="px-5 py-4 flex justify-between items-center border-t border-gray-200 flex-wrap gap-2">
                    <div className="text-gray-600 text-sm">
                        Showing 1 to 10 of 20 rows
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            disabled
                            className="px-3 py-2  bg-white text-gray-400 rounded text-sm cursor-not-allowed"
                        >
                            ≪ First
                        </button>
                        <button
                            disabled
                            className="px-3 py-2  bg-white text-gray-400 rounded text-sm cursor-not-allowed"
                        >
                            Previous
                        </button>
                        <button className="px-3 py-2 border-b border-blue-500 bg-blue-500 text-white rounded text-sm">
                            1
                        </button>
                        <button
                            onClick={() => setCurrentPage(2)}
                            className="px-3 py-2  bg-white text-gray-700 rounded text-sm cursor-pointer hover:bg-gray-50"
                        >
                            Next
                        </button>
                        <button
                            onClick={() => setCurrentPage(2)}
                            className="px-3 py-2  bg-white text-gray-700 rounded text-sm cursor-pointer hover:bg-gray-50"
                        >
                            Last ≫
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
