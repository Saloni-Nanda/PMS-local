import React from 'react';
import { ChevronDown, X } from 'lucide-react';
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from "@headlessui/react";

interface RoomChangeData {
    roomNumber: string;
    folioNr: string;
    bookingNumber: string;
    roomType: string;
    arrivalDate: Date;
    departureDate: Date;
    guestName: string;
}

interface RoomChangeModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAccept: () => void;
    currentBooking: RoomChangeData | null;
    roomTypeOption: 'same' | 'change';
    setRoomTypeOption: (option: 'same' | 'change') => void;
    roomForm: {
        roomType: string;
        roomNumber: string;
        rate: string;
        totalCharge: string;
    };
    setRoomForm: React.Dispatch<React.SetStateAction<{
        roomType: string;
        roomNumber: string;
        rate: string;
        totalCharge: string;
    }>>;
    roomTypeOptions: string[];
    roomNumberOptions: string[];
    rateOptions: string[];
    totalChargeOptions: string[];
}

const RoomChangeModal: React.FC<RoomChangeModalProps> = ({
    isOpen,
    onClose,
    onAccept,
    currentBooking,
    roomTypeOption,
    setRoomTypeOption,
    roomForm,
    setRoomForm,
    roomTypeOptions,
    roomNumberOptions,
    rateOptions,
    totalChargeOptions
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-[#00000059] flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 max-h-[90vh] overflow-auto">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b">
                    <h2 className="text-lg font-semibold text-gray-900">Select Room</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    {/* Current Room Info */}
                    <div className="bg-blue-50 rounded-lg p-4">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <div className="font-medium text-gray-700">Current Room: {currentBooking?.roomNumber}</div>
                                <div className="text-gray-600 mt-1 text-xs">Total Stay : 36.00 MXN</div>
                                <div className="text-gray-600 text-xs">Total Charge : 24.00 MXN</div>
                            </div>
                            <div>
                                <div className="font-medium text-gray-700">Rate Plan: RACK</div>
                                <div className="text-gray-600 mt-1 text-xs">Nr. Of Nights : 3</div>
                                <div className="text-gray-600 text-xs">Nights Charged : 2</div>
                            </div>
                        </div>
                    </div>

                    {/* Room Type Options */}
                    <div className="space-y-3">
                        <div className="flex space-x-2">
                            <button
                                onClick={() => setRoomTypeOption('same')}
                                className={`px-4 py-2 text-sm font-medium rounded-md border transition-colors ${roomTypeOption === 'same'
                                    ? 'bg-white border-gray-300 text-gray-700'
                                    : 'bg-gray-100 border-gray-300 text-gray-600 hover:bg-gray-50'
                                    }`}
                            >
                                Same Room Type
                            </button>
                            <button
                                onClick={() => setRoomTypeOption('change')}
                                className={`px-4 py-2 text-sm font-medium rounded-md border transition-colors ${roomTypeOption === 'change'
                                    ? 'bg-[#076DB3] border-[#076DB3] text-white'
                                    : 'bg-gray-100 border-gray-300 text-gray-600 hover:bg-gray-50'
                                    }`}
                            >
                                Change Room Type
                            </button>
                        </div>
                    </div>

                    {/* Form Fields */}
                    <div className="space-y-4">
                        {/* Room Type */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Room Type
                            </label>
                            <Listbox
                                value={roomForm.roomType}
                                onChange={(val) => setRoomForm({ ...roomForm, roomType: val })}
                            >
                                <div className="relative w-full">
                                    <ListboxButton className="w-full flex items-center justify-between px-3 py-2 border border-gray-300 rounded-md text-sm bg-white text-gray-700">
                                        {roomForm.roomType || "Select"}
                                        <ChevronDown className="w-4 h-4 text-gray-500 ml-2" />
                                    </ListboxButton>
                                    <ListboxOptions className="absolute mt-1 bg-white border border-[#076DB3] rounded-md shadow-lg z-10 w-full">
                                        {roomTypeOptions.map((option) => (
                                            <ListboxOption
                                                key={option}
                                                value={option}
                                                className="px-3 py-2 cursor-pointer text-sm text-gray-700 data-[focus]:bg-gray-100"
                                            >
                                                {option}
                                            </ListboxOption>
                                        ))}
                                    </ListboxOptions>
                                </div>
                            </Listbox>
                        </div>

                        {/* Room Number */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Room Number
                            </label>
                            <Listbox
                                value={roomForm.roomNumber}
                                onChange={(val) => setRoomForm({ ...roomForm, roomNumber: val })}
                            >
                                <div className="relative w-full">
                                    <ListboxButton className="w-full flex items-center justify-between px-3 py-2 border border-gray-300 rounded-md text-sm bg-white text-gray-700">
                                        {roomForm.roomNumber || "Select"}
                                        <ChevronDown className="w-4 h-4 text-gray-500 ml-2" />
                                    </ListboxButton>
                                    <ListboxOptions className="absolute mt-1 bg-white border border-[#076DB3] rounded-md shadow-lg z-10 w-full">
                                        {roomNumberOptions.map((option) => (
                                            <ListboxOption
                                                key={option}
                                                value={option}
                                                className="px-3 py-2 cursor-pointer text-sm text-gray-700 data-[focus]:bg-gray-100"
                                            >
                                                {option}
                                            </ListboxOption>
                                        ))}
                                    </ListboxOptions>
                                </div>
                            </Listbox>
                        </div>

                        {/* Rate */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Rate
                            </label>
                            <Listbox
                                value={roomForm.rate}
                                onChange={(val) => setRoomForm({ ...roomForm, rate: val })}
                            >
                                <div className="relative w-full">
                                    <ListboxButton className="w-full flex items-center justify-between px-3 py-2 border border-gray-300 rounded-md text-sm bg-white text-gray-700">
                                        {roomForm.rate || "Select"}
                                        <ChevronDown className="w-4 h-4 text-gray-500 ml-2" />
                                    </ListboxButton>
                                    <ListboxOptions className="absolute mt-1 bg-white border border-[#076DB3] rounded-md shadow-lg z-10 w-full">
                                        {rateOptions.map((option) => (
                                            <ListboxOption
                                                key={option}
                                                value={option}
                                                className="px-3 py-2 cursor-pointer text-sm text-gray-700 data-[focus]:bg-gray-100"
                                            >
                                                {option} MXN
                                            </ListboxOption>
                                        ))}
                                    </ListboxOptions>
                                </div>
                            </Listbox>
                        </div>

                        {/* Total Charge */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Total Charge
                            </label>
                            <Listbox
                                value={roomForm.totalCharge}
                                onChange={(val) => setRoomForm({ ...roomForm, totalCharge: val })}
                            >
                                <div className="relative w-full">
                                    <ListboxButton className="w-full flex items-center justify-between px-3 py-2 border border-gray-300 rounded-md text-sm bg-white text-gray-700">
                                        {roomForm.totalCharge || "Select"}
                                        <ChevronDown className="w-4 h-4 text-gray-500 ml-2" />
                                    </ListboxButton>
                                    <ListboxOptions className="absolute mt-1 bg-white border border-[#076DB3] rounded-md shadow-lg z-10 w-full">
                                        {totalChargeOptions.map((option) => (
                                            <ListboxOption
                                                key={option}
                                                value={option}
                                                className="px-3 py-2 cursor-pointer text-sm text-gray-700 data-[focus]:bg-gray-100"
                                            >
                                                {option} MXN
                                            </ListboxOption>
                                        ))}
                                    </ListboxOptions>
                                </div>
                            </Listbox>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex justify-end space-x-3 p-6 border-t bg-gray-50 rounded-b-lg">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-white bg-gray-500 hover:bg-gray-600 rounded-md transition-colors cursor-pointer"
                    >
                        Close
                    </button>
                    <button
                        onClick={onAccept}
                        className="px-4 py-2 text-sm font-medium text-white bg-[#076DB3] hover:bg-[#054f80] rounded-md transition-colors cursor-pointer"
                    >
                        Accept
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RoomChangeModal;