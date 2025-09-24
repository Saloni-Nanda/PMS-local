"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";
import { useRouter } from "next/navigation";

export default function Page() {
  const rateBases = ["RACK", "BAR", "CORPORATE"];
  const rateDerived = ["AGENT", "NET", "OTA"];
  const relationTypes = ["Percentage", "Fixed"];
  const incDecOptions = ["Increase", "Decrease"];

  const [rateRelationData, setRateRelationData] = useState({
    rateBase: rateBases[0],
    rateDerived: rateDerived[0],
    relationType: relationTypes[0],
    incDec: incDecOptions[1],
    value: "",
  });

  const router = useRouter();

  const handleSubmit = () => {
    router.back();
  };

  return (
    <div className="flex p-6 bg-gray-50">
      <div className="bg-white p-4 sm:p-6 rounded-md w-full max-w-2xl">
        <h2 className="text-base sm:text-lg font-medium text-gray-900 mb-4">
          Rate List Update
        </h2>

        <div className="space-y-4">
          {/* 1st line */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Rate Base */}
            <div className="flex flex-col gap-1">
              <label className="text-xs sm:text-sm text-gray-600">Rate Base</label>
              <div className="relative">
                <Listbox
                  value={rateRelationData.rateBase}
                  onChange={(val) => setRateRelationData({ ...rateRelationData, rateBase: val })}
                >
                  <ListboxButton className="w-full flex items-center justify-between px-2 py-1.5 
                    border border-[#076DB3] rounded-md text-xs sm:text-sm bg-gray-50 text-gray-900 
                    hover:bg-gray-100 focus:border-[#076DB3] focus:outline-none transition">
                    {rateRelationData.rateBase}
                    <ChevronDown className="w-3.5 h-3.5 text-gray-500 ml-1" />
                  </ListboxButton>
                  <ListboxOptions className="absolute mt-1 py-2 w-full bg-white border border-[#076DB3] 
                    rounded-md shadow-md z-10 text-xs sm:text-sm max-h-60 overflow-auto">
                    {rateBases.map((item) => (
                      <ListboxOption
                        key={item}
                        value={item}
                        className="px-2 py-1 cursor-pointer text-gray-600 
                          data-[focus]:bg-gray-200 data-[selected]:font-semibold"
                      >
                        {item}
                      </ListboxOption>
                    ))}
                  </ListboxOptions>
                </Listbox>
              </div>
            </div>

            {/* Rate Derived */}
            <div className="flex flex-col gap-1">
              <label className="text-xs sm:text-sm text-gray-600">Rate Derived</label>
              <div className="relative">
                <Listbox
                  value={rateRelationData.rateDerived}
                  onChange={(val) => setRateRelationData({ ...rateRelationData, rateDerived: val })}
                >
                  <ListboxButton className="w-full flex items-center justify-between px-2 py-1.5 
                    border border-[#076DB3] rounded-md text-xs sm:text-sm bg-gray-50 text-gray-900 
                    hover:bg-gray-100 focus:border-[#076DB3] focus:outline-none transition">
                    {rateRelationData.rateDerived}
                    <ChevronDown className="w-3.5 h-3.5 text-gray-500 ml-1" />
                  </ListboxButton>
                  <ListboxOptions className="absolute mt-1 py-2 w-full bg-white border border-[#076DB3] 
                    rounded-md shadow-md z-10 text-xs sm:text-sm max-h-60 overflow-auto">
                    {rateDerived.map((item) => (
                      <ListboxOption
                        key={item}
                        value={item}
                        className="px-2 py-1 cursor-pointer text-gray-600 
                          data-[focus]:bg-gray-200 data-[selected]:font-semibold"
                      >
                        {item}
                      </ListboxOption>
                    ))}
                  </ListboxOptions>
                </Listbox>
              </div>
            </div>
          </div>

          {/* 2nd line */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Relation Type */}
            <div className="flex flex-col gap-1">
              <label className="text-xs sm:text-sm text-gray-600">Relation Type</label>
              <div className="relative">
                <Listbox
                  value={rateRelationData.relationType}
                  onChange={(val) => setRateRelationData({ ...rateRelationData, relationType: val })}
                >
                  <ListboxButton className="w-full flex items-center justify-between px-2 py-1.5 
                    border border-[#076DB3] rounded-md text-xs sm:text-sm bg-gray-50 text-gray-900 
                    hover:bg-gray-100 focus:border-[#076DB3] focus:outline-none transition">
                    {rateRelationData.relationType}
                    <ChevronDown className="w-3.5 h-3.5 text-gray-500 ml-1" />
                  </ListboxButton>
                  <ListboxOptions className="absolute mt-1 py-2 w-full bg-white border border-[#076DB3] 
                    rounded-md shadow-md z-10 text-xs sm:text-sm max-h-60 overflow-auto">
                    {relationTypes.map((item) => (
                      <ListboxOption
                        key={item}
                        value={item}
                        className="px-2 py-1 cursor-pointer text-gray-600 
                          data-[focus]:bg-gray-200 data-[selected]:font-semibold"
                      >
                        {item}
                      </ListboxOption>
                    ))}
                  </ListboxOptions>
                </Listbox>
              </div>
            </div>

            {/* Increase/Decrease */}
            <div className="flex flex-col gap-1">
              <label className="text-xs sm:text-sm text-gray-600">Increase / Decrease</label>
              <div className="relative">
                <Listbox
                  value={rateRelationData.incDec}
                  onChange={(val) => setRateRelationData({ ...rateRelationData, incDec: val })}
                >
                  <ListboxButton className="w-full flex items-center justify-between px-2 py-1.5 
                    border border-[#076DB3] rounded-md text-xs sm:text-sm bg-gray-50 text-gray-900 
                    hover:bg-gray-100 focus:border-[#076DB3] focus:outline-none transition">
                    {rateRelationData.incDec}
                    <ChevronDown className="w-3.5 h-3.5 text-gray-500 ml-1" />
                  </ListboxButton>
                  <ListboxOptions className="absolute mt-1 py-2 w-full bg-white border border-[#076DB3] 
                    rounded-md shadow-md z-10 text-xs sm:text-sm max-h-60 overflow-auto">
                    {incDecOptions.map((item) => (
                      <ListboxOption
                        key={item}
                        value={item}
                        className="px-2 py-1 cursor-pointer text-gray-600 
                          data-[focus]:bg-gray-200 data-[selected]:font-semibold"
                      >
                        {item}
                      </ListboxOption>
                    ))}
                  </ListboxOptions>
                </Listbox>
              </div>
            </div>
          </div>

          {/* Value */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">Value</label>
            <input
              type="number"
              step={0.1}
              value={rateRelationData.value}
              onChange={(e) =>
                setRateRelationData({ ...rateRelationData, value: e.target.value })
              }
              placeholder="Enter value"
              className="w-full px-2 py-1.5 border border-[#076DB3] rounded-md bg-gray-50 
                text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 
                focus:ring-[#076DB3] focus:border-transparent text-xs sm:text-sm"
            />
          </div>

          {/* Save Button */}
          <div className="pt-2 flex">
            <button
              className="px-5 py-2 bg-[#076DB3] text-white text-xs sm:text-sm 
                font-medium rounded-md hover:bg-[#054f80] focus:outline-none focus:ring-1 
                focus:ring-[#076DB3] focus:ring-offset-1 transition-colors"
              onClick={handleSubmit}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}