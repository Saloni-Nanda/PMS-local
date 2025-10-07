"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { CustomListbox } from "@/components/ui/Listbox";

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
    <div className="flex p-6 bg-gray-50 ">
      <div className="bg-white p-4 sm:p-6 rounded-md w-full max-w-2xl">
        <h2 className="text-base sm:text-lg font-medium text-gray-900 mb-4">
          New Relationship
        </h2>

        <div className="space-y-4">
          {/* 1st line */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Rate Base */}
            <CustomListbox
              label="Rate Base"
              value={rateRelationData.rateBase}
              onChange={(val) => setRateRelationData({ ...rateRelationData, rateBase: val })}
              options={rateBases}
            />

            {/* Rate Derived */}
            <CustomListbox
              label="Rate Derived"
              value={rateRelationData.rateDerived}
              onChange={(val) => setRateRelationData({ ...rateRelationData, rateDerived: val })}
              options={rateDerived}
            />
          </div>

          {/* 2nd line */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Relation Type */}
            <CustomListbox
              label="Relation Type"
              value={rateRelationData.relationType}
              onChange={(val) => setRateRelationData({ ...rateRelationData, relationType: val })}
              options={relationTypes}
            />

            {/* Increase/Decrease */}
            <CustomListbox
              label="Increase / Decrease"
              value={rateRelationData.incDec}
              onChange={(val) => setRateRelationData({ ...rateRelationData, incDec: val })}
              options={incDecOptions}
            />

          </div>

          {/* Value */}
          <div>
            <label className="block text-sm text-gray-600 mb-2">Value</label>
            <input
              type="number"
              step={0.1}
              value={rateRelationData.value}
              onChange={(e) =>
                setRateRelationData({ ...rateRelationData, value: e.target.value })
              }
              placeholder="Enter value"
              className="w-full px-2 py-2 border border-gray-300 rounded-md bg-gray-50 
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