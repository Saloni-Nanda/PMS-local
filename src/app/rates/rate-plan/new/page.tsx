"use client"
import { useState } from 'react';
import { Calendar, ChevronDown } from 'lucide-react';
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import { useRouter } from 'next/navigation';

export default function Page() {
    const rateTypes = ['NET']
    const policies = ['xyz']
    const types = ["Percentage", "Fixed"];
    const currencies = ["Mexico, Pesos", "USD", "EUR", "INR"];
    const mealPlans = ["American", "Continental", "European"];
    const [rateData, setRateData] = useState({
        ratePlan: 'COMERCIAL',
        rateName: 'xyz',
        rateType: rateTypes[0],
        status: 'Closed',
        notes: '',
        policy: policies[0],
        policyNotes: '',
        type: types[0],
        amount: '',
        currency: currencies[0],
        mealPlan: mealPlans[0],
        bookingEngine: "No",
        commissionable: "No",
        gds: "No",
        taxFree: "No",
        taxIncluded: "No",
    })

    const toggles = [
        { key: "bookingEngine", label: "Booking Engine" },
        { key: "commissionable", label: "Commissionable" },
        { key: "gds", label: "GDS" },
        { key: "taxFree", label: "Tax Free" },
        { key: "taxIncluded", label: "Tax Included" },
    ];


    const router = useRouter()

    const handleSubmit = () => {
        //alert(`Room ${selectedRoom} selected for booking ${currentBooking?.bookingNumber}`);
        router.back()
    };


    return (
        <div className="flex px-6 bg-gray-50 min-h-screen">
            <div className="bg-white p-4 sm:p-6 rounded-md w-full max-w-2xl">
                <h2 className="text-base sm:text-lg font-medium text-gray-900 mb-4 ">Upadate Rate</h2>

                <div className="space-y-4">
                    {/* 1st line */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">Rate Plan</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={rateData.ratePlan}
                                    onChange={(e) => setRateData({ ...rateData, ratePlan: e.target.value })}
                                    placeholder="Rate Plan"
                                    className="w-full px-2 py-1.5 border border-[#076DB3] rounded-md bg-gray-50 
                  text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 
                  focus:ring-[#076DB3] focus:border-transparent pr-8 text-xs sm:text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm text-gray-600 mb-1">Rate Name</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={rateData.rateName}
                                    onChange={(e) => setRateData({ ...rateData, rateName: e.target.value })}
                                    placeholder="Rate Name"
                                    className="w-full px-2 py-1.5 border border-[#076DB3] rounded-md bg-gray-50 
                  text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 
                  focus:ring-[#076DB3] focus:border-transparent pr-8 text-xs sm:text-sm"
                                />
                            </div>
                        </div>

                    </div>

                    {/* 2nd line */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1">
                            <label className="text-xs sm:text-sm text-gray-600 whitespace-nowrap">
                                Rate Type
                            </label>
                            <div className="relative min-w-[120px] sm:min-w-[250px]">
                                <Listbox value={rateData.rateType}
                                    onChange={(val) => setRateData({ ...rateData, rateType: val })}
                                >
                                    <ListboxButton className="w-full flex items-center justify-between px-2 py-1.5 
                border border-[#076DB3] rounded-md text-xs sm:text-sm bg-gray-50 text-gray-900 
                hover:bg-gray-100 focus:border-[#076DB3] focus:outline-none transition">
                                        {rateData.rateType}
                                        <ChevronDown className="w-3.5 h-3.5 text-gray-500 ml-1" />
                                    </ListboxButton>
                                    <ListboxOptions className="absolute mt-1 py-2 w-full bg-white border border-[#076DB3] 
                rounded-md shadow-md z-10 text-xs sm:text-sm">
                                        {rateTypes.map((c) => (
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
                        <div className="flex flex-col gap-2">
                            <label className="text-sm text-gray-700">Status</label>
                            <div className="inline-flex">
                                {["Open", "Closed"].map((s) => (
                                    <button
                                        key={s}
                                        type="button"
                                        onClick={() => setRateData({ ...rateData, status: s })}
                                        className={`px-4 py-2 text-sm font-medium ${rateData.status === s
                                            ? "bg-gray-800 text-white"
                                            : "bg-white text-gray-700 hover:bg-gray-100"
                                            }`}
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>

                        </div>

                    </div>

                    {/* 3rd line */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">Notes</label>
                            <div className="relative">
                                <textarea
                                    value={rateData.notes}
                                    rows={4}
                                    onChange={(e) => setRateData({ ...rateData, notes: e.target.value })}
                                    placeholder="Notes"
                                    className="w-full px-2 py-1.5 border border-[#076DB3] rounded-md bg-gray-50 
                  text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 
                  focus:ring-[#076DB3] focus:border-transparent pr-8 text-xs sm:text-sm"
                                />
                            </div>
                        </div>
                        <div className='flex flex-col'>
                            <div className="flex flex-col gap-1">
                                <label className="text-xs sm:text-sm text-gray-600 whitespace-nowrap">
                                    Policy
                                </label>
                                <div className="relative min-w-[120px] sm:min-w-[250px]">
                                    <Listbox value={rateData.policy}
                                        onChange={(value) => setRateData({ ...rateData, policy: value })}

                                    >
                                        <ListboxButton className="w-full flex items-center justify-between px-2 py-1.5 
                border border-[#076DB3]  rounded-t-md text-xs sm:text-sm bg-gray-50 text-gray-900 
                hover:bg-gray-100 focus:border-[#076DB3] focus:outline-none transition">
                                            {rateData.policy}
                                            <ChevronDown className="w-3.5 h-3.5 text-gray-500 ml-1" />
                                        </ListboxButton>
                                        <ListboxOptions className="absolute mt-1 py-2 w-full bg-white border border-[#076DB3] 
                rounded-md shadow-md z-10 text-xs sm:text-sm">
                                            {policies.map((c) => (
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

                            <div className="relative">
                                <textarea
                                    value={rateData.policyNotes}
                                    rows={3}
                                    onChange={(e) => setRateData({ ...rateData, policyNotes: e.target.value })}
                                    placeholder="Notes"
                                    className="w-full px-2 py-1.5 border border-[#076DB3] rounded-b-md bg-gray-50 
                  text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 
                  focus:ring-[#076DB3] focus:border-transparent pr-8 text-xs sm:text-sm"
                                />
                            </div>

                        </div>
                    </div>

                    {/* 4th line */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Type Dropdown */}
                        <div className="flex flex-col gap-1">
                            <label className="text-xs sm:text-sm text-gray-600 whitespace-nowrap">
                                Type
                            </label>
                            <div className="relative min-w-[120px] sm:min-w-[250px]">
                                <Listbox
                                    value={rateData.type}
                                    onChange={(val) => setRateData({ ...rateData, type: val })}
                                >
                                    <ListboxButton className="w-full flex items-center justify-between px-2 py-1.5 
                    border border-[#076DB3] rounded-md text-xs sm:text-sm bg-gray-50 text-gray-900 
                    hover:bg-gray-100 focus:border-[#076DB3] focus:outline-none transition">
                                        {rateData.type}
                                        <ChevronDown className="w-3.5 h-3.5 text-gray-500 ml-1" />
                                    </ListboxButton>
                                    <ListboxOptions className="absolute mt-1 py-2 w-full bg-white border border-[#076DB3] 
                    rounded-md shadow-md z-10 text-xs sm:text-sm">
                                        {types.map((c) => (
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

                        {/* Amount Input */}
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">Amount</label>
                            <div className="flex">
                                <span className="inline-flex items-center px-2 border border-r-0 border-[#076DB3] rounded-l-md bg-gray-100 text-gray-600 text-sm">
                                    {rateData.type === "Percentage" ? "%" : "$"}
                                </span>
                                <input
                                    type="number"
                                    step={0.1}
                                    value={rateData.amount}
                                    onChange={(e) =>
                                        setRateData({ ...rateData, amount: e.target.value })
                                    }
                                    placeholder="Amount"
                                    className="w-full px-2 py-1.5 border border-[#076DB3] rounded-r-md bg-gray-50 
                    text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 
                    focus:ring-[#076DB3] focus:border-transparent text-xs sm:text-sm"
                                />
                            </div>
                        </div>
                    </div>

                    {/* 5th line */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Currency Dropdown */}
                        <div className="flex flex-col gap-1">
                            <label className="text-xs sm:text-sm text-gray-600 whitespace-nowrap">
                                Currency
                            </label>
                            <div className="relative min-w-[120px] sm:min-w-[250px]">
                                <Listbox
                                    value={rateData.currency}
                                    onChange={(val) => setRateData({ ...rateData, currency: val })}
                                >
                                    <ListboxButton className="w-full flex items-center justify-between px-2 py-1.5 
                    border border-[#076DB3] rounded-md text-xs sm:text-sm bg-gray-50 text-gray-900 
                    hover:bg-gray-100 focus:border-[#076DB3] focus:outline-none transition">
                                        {rateData.currency}
                                        <ChevronDown className="w-3.5 h-3.5 text-gray-500 ml-1" />
                                    </ListboxButton>
                                    <ListboxOptions className="absolute mt-1 py-2 w-full bg-white border border-[#076DB3] 
                    rounded-md shadow-md z-10 text-xs sm:text-sm">
                                        {currencies.map((c) => (
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

                        {/* Meal Plans Dropdown */}
                        <div className="flex flex-col gap-1">
                            <label className="text-xs sm:text-sm text-gray-600 whitespace-nowrap">
                                Meal Plans
                            </label>
                            <div className="relative min-w-[120px] sm:min-w-[250px]">
                                <Listbox
                                    value={rateData.mealPlan}
                                    onChange={(val) => setRateData({ ...rateData, mealPlan: val })}
                                >
                                    <ListboxButton className="w-full flex items-center justify-between px-2 py-1.5 
                    border border-[#076DB3] rounded-md text-xs sm:text-sm bg-gray-50 text-gray-900 
                    hover:bg-gray-100 focus:border-[#076DB3] focus:outline-none transition">
                                        {rateData.mealPlan}
                                        <ChevronDown className="w-3.5 h-3.5 text-gray-500 ml-1" />
                                    </ListboxButton>
                                    <ListboxOptions className="absolute mt-1 py-2 w-full bg-white border border-[#076DB3] 
                    rounded-md shadow-md z-10 text-xs sm:text-sm">
                                        {mealPlans.map((c) => (
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
                    </div>

                    {/* 6th line */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 mt-5">
                        {toggles.map((toggle) => (
                            <div key={toggle.key} className="flex flex-col items-center gap-2">
                                <label className="block text-xs sm:text-sm text-gray-600">
                                    {toggle.label}
                                </label>
                                <button
                                    onClick={() =>
                                        setRateData((prev) => ({
                                            ...prev,
                                            [toggle.key]:
                                                prev[toggle.key as keyof typeof prev] === "Yes" ? "No" : "Yes",
                                        }))
                                    }
                                    className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors 
          focus:outline-none focus:ring-1 focus:ring-[#076DB3] focus:ring-offset-1 ${rateData[toggle.key as keyof typeof rateData] === "Yes"
                                            ? "bg-gray-800"
                                            : "bg-gray-300"
                                        }`}
                                >
                                    <span
                                        className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${rateData[toggle.key as keyof typeof rateData] === "Yes"
                                                ? "translate-x-4"
                                                : "translate-x-1"
                                            }`}
                                    />
                                </button>
                            </div>
                        ))}
                    </div>


                    {/* Search Button */}
                    <div className="pt-2 flex ">
                        <button className="px-5 py-2 bg-[#076DB3] text-white text-xs sm:text-sm 
            font-medium rounded-md hover:bg-[#054f80] focus:outline-none focus:ring-1 
            focus:ring-[#076DB3] focus:ring-offset-1 transition-colors"
                            onClick={handleSubmit}>
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
