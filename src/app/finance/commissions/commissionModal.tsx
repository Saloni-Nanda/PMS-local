"use client"
import React from 'react';
import { X } from 'lucide-react';
import CustomDatePicker from '@/components/ui/customDatePicker';
import { CommissionData } from '@/types';
import { CustomListbox } from '@/components/ui/Listbox';

interface CommissionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: () => void;
    editingCommission: CommissionData | null;
    commissionForm: {
        commissionId: string;
        partner: string;
        type: string;
        rate: number;
        bookings: number;
        revenue: number;
        commission: number;
        period: string;
        dueDate: Date;
        status: string;
    };
    handleFormChange: (field: string, value: string | number | Date) => void;
}

const types = ['OTA', 'Agency', 'Corporate'];
const statuses = ['Pending', 'Paid', 'Overdue'];

const CommissionModal: React.FC<CommissionModalProps> = ({
    isOpen,
    onClose,
    onSave,
    editingCommission,
    commissionForm,
    handleFormChange
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-[#0000004b] flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-xl">
                {/* Header */}
                <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 z-10 flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-800">
                        {editingCommission ? 'Edit Commission' : 'Add Commission'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                        title="Close"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Body */}
                <div className="px-6 py-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Commission ID */}
                        <div className="flex flex-col">
                            <label className="text-sm text-gray-600 mb-2">
                                Commission ID
                            </label>
                            <input
                                type="text"
                                value={commissionForm.commissionId}
                                onChange={(e) => handleFormChange('commissionId', e.target.value)}
                                className="w-full px-2 py-2 border border-gray-300 rounded-md bg-gray-50 
                  text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 
                  focus:ring-[#076DB3] focus:border-transparent text-xs sm:text-sm"
                                placeholder="Commission ID"
                            />
                        </div>

                        {/* Partner */}
                        <div className="flex flex-col">
                            <label className="text-sm text-gray-600 mb-2">
                                Partner
                            </label>
                            <input
                                type="text"
                                value={commissionForm.partner}
                                onChange={(e) => handleFormChange('partner', e.target.value)}
                                className="w-full px-2 py-2 border border-gray-300 rounded-md bg-gray-50 
                  text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 
                  focus:ring-[#076DB3] focus:border-transparent text-xs sm:text-sm"
                                placeholder="Partner Name"
                            />
                        </div>

                        {/* Type */}
                        <div className="flex flex-col">
                            <CustomListbox
                                label="Room Number"
                                value={commissionForm.type}
                                onChange={(value) => handleFormChange('type', value)}
                                options={types}
                            />
                        </div>

                        {/* Commission Rate */}
                        <div className="flex flex-col">
                            <label className="text-sm text-gray-600 mb-2">
                                Commission Rate (%)
                            </label>
                            <input
                                type="number"
                                value={commissionForm.rate}
                                onChange={(e) => handleFormChange('rate', parseFloat(e.target.value) || 0)}
                                className="w-full px-2 py-2 border border-gray-300 rounded-md bg-gray-50 
                  text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 
                  focus:ring-[#076DB3] focus:border-transparent text-xs sm:text-sm"
                                placeholder=""
                                step="0.01"
                                min="0"
                                max="100"
                            />
                        </div>

                        {/* Bookings */}
                        <div className="flex flex-col">
                            <label className="text-sm text-gray-600 mb-2">
                                Number of Bookings
                            </label>
                            <input
                                type="number"
                                value={commissionForm.bookings}
                                onChange={(e) => handleFormChange('bookings', parseInt(e.target.value) || 0)}
                                className="w-full px-2 py-2 border border-gray-300 rounded-md bg-gray-50 
                  text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 
                  focus:ring-[#076DB3] focus:border-transparent text-xs sm:text-sm"
                                placeholder=""
                                min="0"
                            />
                        </div>

                        {/* Revenue */}
                        <div className="flex flex-col">
                            <label className="text-sm text-gray-600 mb-2">
                                Total Revenue
                            </label>
                            <input
                                type="number"
                                value={commissionForm.revenue}
                                onChange={(e) => handleFormChange('revenue', parseFloat(e.target.value) || 0)}
                                className="w-full px-2 py-2 border border-gray-300 rounded-md bg-gray-50 
                  text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 
                  focus:ring-[#076DB3] focus:border-transparent text-xs sm:text-sm"
                                placeholder=""
                                step="0.01"
                                min="0"
                            />
                        </div>

                        {/* Commission Amount */}
                        <div className="flex flex-col">
                            <label className="text-sm text-gray-600 mb-2">
                                Commission Amount
                            </label>
                            <input
                                type="number"
                                value={commissionForm.commission}
                                onChange={(e) => handleFormChange('commission', parseFloat(e.target.value) || 0)}
                                className="w-full px-2 py-2 border border-gray-300 rounded-md bg-gray-50 
                  text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 
                  focus:ring-[#076DB3] focus:border-transparent text-xs sm:text-sm"
                                placeholder=""
                                step="0.01"
                                min="0"
                            />
                        </div>

                        {/* Period */}
                        <div className="flex flex-col">
                            <label className="text-sm text-gray-600 mb-2">
                                Period
                            </label>
                            <input
                                type="text"
                                value={commissionForm.period}
                                onChange={(e) => handleFormChange('period', e.target.value)}
                                className="w-full px-2 py-2 border border-gray-300 rounded-md bg-gray-50 
                  text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 
                  focus:ring-[#076DB3] focus:border-transparent text-xs sm:text-sm"
                                placeholder="mm yyyy"
                            />
                        </div>

                        {/* Due Date */}
                        <div className="flex flex-col">
                            <label className="text-sm text-gray-600 mb-2">
                                Due Date
                            </label>
                            <CustomDatePicker
                                selectedDate={commissionForm.dueDate}
                                onChange={(date) => handleFormChange('dueDate', date)}
                                placeholder="Select Due Date"
                            />
                        </div>

                        {/* Status */}
                        <div className="flex flex-col">
                            <CustomListbox
                                label="Status"
                                value={commissionForm.status}
                                onChange={(value) => handleFormChange('status', value)}
                                options={statuses}
                            />
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="sticky bottom-0 bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-end gap-3 z-10">
                    <button
                        onClick={onClose}
                        className="px-5 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onSave}
                        className="px-5 py-2 bg-[#076DB3] hover:bg-[#054f80] rounded-md text-sm text-white transition-colors"
                    >
                        {editingCommission ? 'Update' : 'Save'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CommissionModal;