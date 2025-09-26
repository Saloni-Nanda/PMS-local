import React from 'react';
import { ChevronDown, X } from 'lucide-react';
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from "@headlessui/react";

interface RoomData {
    id: string;
    roomNumber: string;
    bookingNumber: string;
    ratePlan: string;
    roomType: string;
    arrivalDate: Date;
    departureDate: Date;
    guestName: string;
    numberOfRooms: string;
}

interface RoomAssignmentModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAccept: () => void;
    currentBooking: RoomData | null;
    selectedRoom: string;
    setSelectedRoom: (room: string) => void;
    roomOptions: Array<{ value: string; label: string }>;
}

const RoomAssignmentModal: React.FC<RoomAssignmentModalProps> = ({
    isOpen,
    onClose,
    onAccept,
    currentBooking,
    selectedRoom,
    setSelectedRoom,
    roomOptions
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-[#0000005c] flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-96 max-w-[90vw] mx-4">
                {/* Modal Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900">Select Room</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Modal Body */}
                <div className="p-6">
                    {/* Current Room Info */}
                    <div className="bg-blue-50 rounded-lg p-4 mb-6 flex justify-between items-center">
                        <span className="text-gray-700 font-medium">Current Room</span>
                        <span className="text-gray-900 font-medium">
                            Room {currentBooking?.roomNumber}
                        </span>
                    </div>

                    {/* Room Selection Dropdown */}
                    <div className="mb-6 relative">
                        <Listbox value={selectedRoom} onChange={setSelectedRoom}>
                            <ListboxButton className="w-full flex items-center justify-between px-3 py-3 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#076DB3] focus:border-[#076DB3] font-medium">
                                {roomOptions.find(option => option.value === selectedRoom)?.label || "Select Room"}
                                <ChevronDown className="w-4 h-4 text-gray-500 ml-2" />
                            </ListboxButton>

                            <ListboxOptions className="absolute mt-1 py-2 w-full bg-white border border-[#076DB3] rounded-lg shadow-lg z-10">
                                {roomOptions.map((option) => (
                                    <ListboxOption
                                        key={option.value}
                                        value={option.value}
                                        className="px-3 py-2 cursor-pointer text-sm flex justify-between items-center text-gray-700 font-normal data-[focus]:bg-gray-100 data-[focus]:text-gray-700 data-[selected]:font-semibold"
                                    >
                                        {option.label}
                                    </ListboxOption>
                                ))}
                            </ListboxOptions>
                        </Listbox>
                    </div>

                    {/* Modal Actions */}
                    <div className="flex gap-3">
                        <button
                            onClick={onClose}
                            className="flex-1 px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 font-medium cursor-pointer"
                        >
                            Close
                        </button>
                        <button
                            onClick={onAccept}
                            className="flex-1 px-6 py-2 bg-[#076DB3] text-white rounded-lg hover:bg-[#054f80] font-medium cursor-pointer"
                        >
                            Accept
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoomAssignmentModal;