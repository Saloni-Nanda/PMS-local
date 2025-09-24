"use client"
import { ChevronDown } from 'lucide-react';
import React, { useState } from 'react';
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from "@headlessui/react";
import { useRouter } from "next/navigation";

const Page: React.FC = () => {
  // Form state
  const [roomNumber, setRoomNumber] = useState("101");
  const [assignedTo, setAssignedTo] = useState("Borja de la Fuente");
  const [causeReason, setCauseReason] = useState("Leaks");
  const [priority, setPriority] = useState("High");
  const [statusAfterMaintenance, setStatusAfterMaintenance] = useState("Clean");
  const [nights, setNights] = useState("10");
  const [notes, setNotes] = useState("Reparar puerta");
  const [outOfOrder, setOutOfOrder] = useState(true);

  // Dropdown options
  const roomNumbers = ["101", "102", "103", "104", "105"];
  const assignedToOptions = ["Borja de la Fuente", "Maria Garcia", "Carlos Rodriguez", "Ana Martinez"];
  const causeReasonOptions = ["Leaks", "Electrical Issues", "Plumbing", "HVAC", "Furniture Repair", "Cleaning"];
  const priorityOptions = ["High", "Medium", "Low"];
  const statusOptions = ["Clean", "Dirty", "Needs Inspection", "Ready"];

  const router = useRouter()

  const handleSubmit = (action: string) => {
    router.back()
  };

  return (
    <div className="bg-white rounded-lg p-6 max-w-4xl mx-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Update Maintenance Status</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-4">
          {/* Room Number */}
          <div>
            <label className="block text-sm text-gray-600 mb-2">Room Number</label>
            <Listbox value={roomNumber} onChange={setRoomNumber}>
              <div className="relative">
                <ListboxButton className="w-full flex items-center justify-between px-3 py-2 border border-gray-300 rounded-md text-sm bg-white text-gray-600 font-normal hover:bg-gray-100 focus:border-[#076DB3] focus:outline-none transition">
                  {roomNumber}
                  <ChevronDown className="w-4 h-4 text-gray-500 ml-2" />
                </ListboxButton>
                <ListboxOptions className="absolute py-2 mt-1 w-full bg-white border border-[#076DB3] rounded-md shadow-lg z-10">
                  {roomNumbers.map((room) => (
                    <ListboxOption
                      key={room}
                      value={room}
                      className="px-3 py-2 cursor-pointer text-sm flex justify-between items-center text-gray-600 font-normal data-[focus]:bg-gray-200 data-[focus]:text-gray-600 data-[selected]:font-semibold"
                    >
                      {room}
                    </ListboxOption>
                  ))}
                </ListboxOptions>
              </div>
            </Listbox>
          </div>

          {/* Cause/Reason */}
          <div>
            <label className="block text-sm text-gray-600 mb-2">Cause/Reason</label>
            <Listbox value={causeReason} onChange={setCauseReason}>
              <div className="relative">
                <ListboxButton className="w-full flex items-center justify-between px-3 py-2 border border-gray-300 rounded-md text-sm bg-white text-gray-600 font-normal hover:bg-gray-100 focus:border-[#076DB3] focus:outline-none transition">
                  {causeReason}
                  <ChevronDown className="w-4 h-4 text-gray-500 ml-2" />
                </ListboxButton>
                <ListboxOptions className="absolute py-2 mt-1 w-full bg-white border border-[#076DB3] rounded-md shadow-lg z-10">
                  {causeReasonOptions.map((cause) => (
                    <ListboxOption
                      key={cause}
                      value={cause}
                      className="px-3 py-2 cursor-pointer text-sm flex justify-between items-center text-gray-600 font-normal data-[focus]:bg-gray-200 data-[focus]:text-gray-600 data-[selected]:font-semibold"
                    >
                      {cause}
                    </ListboxOption>
                  ))}
                </ListboxOptions>
              </div>
            </Listbox>
          </div>

          {/* Status After Maintenance */}
          <div>
            <label className="block text-sm text-gray-600 mb-2">Status After Maintenance</label>
            <Listbox value={statusAfterMaintenance} onChange={setStatusAfterMaintenance}>
              <div className="relative">
                <ListboxButton className="w-full flex items-center justify-between px-3 py-2 border border-gray-300 rounded-md text-sm bg-white text-gray-600 font-normal hover:bg-gray-100 focus:border-[#076DB3] focus:outline-none transition">
                  {statusAfterMaintenance}
                  <ChevronDown className="w-4 h-4 text-gray-500 ml-2" />
                </ListboxButton>
                <ListboxOptions className="absolute py-2 mt-1 w-full bg-white border border-[#076DB3] rounded-md shadow-lg z-10">
                  {statusOptions.map((status) => (
                    <ListboxOption
                      key={status}
                      value={status}
                      className="px-3 py-2 cursor-pointer text-sm flex justify-between items-center text-gray-600 font-normal data-[focus]:bg-gray-200 data-[focus]:text-gray-600 data-[selected]:font-semibold"
                    >
                      {status}
                    </ListboxOption>
                  ))}
                </ListboxOptions>
              </div>
            </Listbox>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm text-gray-600 mb-2">Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white text-gray-600 focus:border-[#076DB3] focus:outline-none resize-none"
              rows={4}
              placeholder="Enter maintenance notes..."
            />
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          {/* Assigned To */}
          <div>
            <label className="block text-sm text-gray-600 mb-2">Assigned To</label>
            <Listbox value={assignedTo} onChange={setAssignedTo}>
              <div className="relative">
                <ListboxButton className="w-full flex items-center justify-between px-3 py-2 border border-gray-300 rounded-md text-sm bg-white text-gray-600 font-normal hover:bg-gray-100 focus:border-[#076DB3] focus:outline-none transition">
                  {assignedTo}
                  <ChevronDown className="w-4 h-4 text-gray-500 ml-2" />
                </ListboxButton>
                <ListboxOptions className="absolute py-2 mt-1 w-full bg-white border border-[#076DB3] rounded-md shadow-lg z-10">
                  {assignedToOptions.map((person) => (
                    <ListboxOption
                      key={person}
                      value={person}
                      className="px-3 py-2 cursor-pointer text-sm flex justify-between items-center text-gray-600 font-normal data-[focus]:bg-gray-200 data-[focus]:text-gray-600 data-[selected]:font-semibold"
                    >
                      {person}
                    </ListboxOption>
                  ))}
                </ListboxOptions>
              </div>
            </Listbox>
          </div>

          {/* Priority */}
          <div>
            <label className="block text-sm text-gray-600 mb-2">Priority</label>
            <Listbox value={priority} onChange={setPriority}>
              <div className="relative">
                <ListboxButton className="w-full flex items-center justify-between px-3 py-2 border border-gray-300 rounded-md text-sm bg-white text-gray-600 font-normal hover:bg-gray-100 focus:border-[#076DB3] focus:outline-none transition">
                  {priority}
                  <ChevronDown className="w-4 h-4 text-gray-500 ml-2" />
                </ListboxButton>
                <ListboxOptions className="absolute py-2 mt-1 w-full bg-white border border-[#076DB3] rounded-md shadow-lg z-10">
                  {priorityOptions.map((priorityOption) => (
                    <ListboxOption
                      key={priorityOption}
                      value={priorityOption}
                      className="px-3 py-2 cursor-pointer text-sm flex justify-between items-center text-gray-600 font-normal data-[focus]:bg-gray-200 data-[focus]:text-gray-600 data-[selected]:font-semibold"
                    >
                      {priorityOption}
                    </ListboxOption>
                  ))}
                </ListboxOptions>
              </div>
            </Listbox>
          </div>

          {/* Nights */}
          <div>
            <label className="block text-sm text-gray-600 mb-2">Nights</label>
            <input
              type="number"
              value={nights}
              onChange={(e) => setNights(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white text-gray-600 focus:border-[#076DB3] focus:outline-none"
              placeholder="Enter number of nights"
            />
          </div>

          {/* Out of Order */}
          <div>
            <label className="block text-sm text-gray-600 mb-2">Out of Order</label>
            <div className="flex items-center">
              <div 
                onClick={() => setOutOfOrder(!outOfOrder)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                  outOfOrder ? 'bg-[#076DB3]' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    outOfOrder ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </div>
              <span className="ml-3 text-sm text-gray-600">
                {outOfOrder ? 'Yes' : 'No'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 mt-8 pt-6 border-t border-gray-200">
        <button
          onClick={() => handleSubmit('Maintenance Completed')}
          className="px-6 py-2 bg-gray-500 hover:bg-gray-700 rounded-md text-white text-sm font-normal cursor-pointer transition-colors"
        >
          Maintenance Completed
        </button>
        <button
          onClick={() => handleSubmit('Accept')}
          className="px-6 py-2 bg-[#076DB3] hover:bg-[#054773] rounded-md text-white text-sm font-normal cursor-pointer transition-colors"
        >
          Accept
        </button>
      </div>
    </div>
  );
};

export default Page;