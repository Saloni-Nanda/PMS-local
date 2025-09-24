"use client";
import React, { useState } from "react";

interface BookingFormData {
  bookingNumber: string;
  fullName: string;
  email: string;
  phone: string;
  arrivalDate: string;
  departureDate: string;
  status: string;
  totalWithoutTaxes: string;
  totalTaxesIncluded: string;
  ratePlan: string;
  promoCode: string;
  requests: string;
  notes: string;
  description: string;
  numberOfRooms: string;
  adults: string;
  children: string;
  cardType: string;
  nameOnCard: string;
  creditCardNumber: string;
  expDate: string;
  code: string;
  agency: string;
}

export default function Page() {
  const [formData, setFormData] = useState<BookingFormData>({
    bookingNumber: "",
    fullName: "",
    email: "",
    phone: "",
    arrivalDate: "",
    departureDate: "",
    status: "",
    totalWithoutTaxes: "",
    totalTaxesIncluded: "",
    ratePlan: "",
    promoCode: "",
    requests: "",
    notes: "",
    description: "",
    numberOfRooms: "",
    adults: "",
    children: "",
    cardType: "",
    nameOnCard: "",
    creditCardNumber: "",
    expDate: "",
    code: "",
    agency: "",
  });

  // const handleChange = (
  //   e: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   const { name, value } = e.target;
  //   setFormData((prev) => ({ ...prev, [name]: value }));
  // };

  return (
    <form className="p-4 md:p-6 bg-white">
      <h2 className="text-lg font-medium text-gray-900 mb-4 md:mb-6">
        Booking Info
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {[
          { label: "Booking Number", name: "bookingNumber", placeholder: "MX120043-W2200002" },
          { label: "Full Name", name: "fullName", placeholder: "Benjamin Bravo Lopez" },
          { label: "Email", name: "email", placeholder: "juanitaolveragomez@gmail.com", type: "email" },
          { label: "Phone", name: "phone", placeholder: "4775809876" },
          { label: "Arrival Date", name: "arrivalDate", placeholder: "17/03/2022" },
          { label: "Departure Date", name: "departureDate", placeholder: "18/03/2022" },
          { label: "Status", name: "status", placeholder: "Nueva" },
          { label: "Total Without Taxes", name: "totalWithoutTaxes", placeholder: "85" },
          { label: "Total Taxes Included", name: "totalTaxesIncluded", placeholder: "1" },
          { label: "Rate Plan", name: "ratePlan", placeholder: "RACK" },
          { label: "Promo Code", name: "promoCode", placeholder: "" },
          { label: "Requests", name: "requests", placeholder: "" },
          { label: "Notes", name: "notes", placeholder: "" },
          { label: "Description", name: "description", placeholder: "DOBLE" },
          { label: "Number of Rooms", name: "numberOfRooms", placeholder: "1" },
          { label: "Adults", name: "adults", placeholder: "2" },
          { label: "Children", name: "children", placeholder: "0" },
          { label: "Card Type", name: "cardType", placeholder: "" },
          { label: "Name on Card", name: "nameOnCard", placeholder: "" },
          { label: "Credit Card Number", name: "creditCardNumber", placeholder: "" },
          { label: "Exp. Date", name: "expDate", placeholder: "" },
          { label: "Code", name: "code", placeholder: "" },
          { label: "Agency", name: "agency", placeholder: "" },
        ].map(({ label, name, placeholder, type = "text" }) => (
          <div key={name}>
            <label
              htmlFor={name}
              className="block text-sm text-gray-600 mb-1"
            >
              {label}
            </label>
            <input
              id={name}
              name={name}
              type={type}
              value={formData[name as keyof BookingFormData]}
              //onChange={handleChange}
              placeholder={placeholder}
              className="w-full px-2 py-1.5 border border-[#076DB3] rounded-md bg-gray-50 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#076DB3] focus:border-transparent text-sm"
            />
          </div>
        ))}
      </div>
    </form>
  );
}
