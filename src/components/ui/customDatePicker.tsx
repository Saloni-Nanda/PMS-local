'use client'

import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Calendar } from "lucide-react";

interface CustomDatePickerProps {
  selectedDate: Date;              
  onChange: (date: Date) => void;  
  placeholder?: string;
  minDate?: Date;
  className?: string;
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  selectedDate,
  onChange,
  placeholder,
  minDate,
  className
}) => {
  return (
    <div className="relative w-full">
      <DatePicker
        selected={selectedDate}
        onChange={(date: Date | null) => {
          if (date !== null) {
            onChange(date);
          }
        }}
        dateFormat="yyyy-MM-dd"
        placeholderText={placeholder || "Select date"}
        minDate={minDate}
        className={`px-2 py-2 border border-gray-400 rounded-md text-sm bg-white w-full text-gray-600 focus:border-[#076DB3] focus:outline-none ${className || ""}`}
      />
      <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
    </div>
  );
};

export default CustomDatePicker;
