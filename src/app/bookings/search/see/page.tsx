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
  const [formData] = useState<BookingFormData>({
    bookingNumber: "MX120043-W2200002",
    fullName: "Benjamin Bravo Lopez",
    email: "juanitaolveragomez@gmail.com",
    phone: "4775809876",
    arrivalDate: "17/03/2022",
    departureDate: "18/03/2022",
    status: "Nueva",
    totalWithoutTaxes: "85",
    totalTaxesIncluded: "1",
    ratePlan: "RACK",
    promoCode: "",
    requests: "",
    notes: "",
    description: "DOBLE",
    numberOfRooms: "1",
    adults: "2",
    children: "0",
    cardType: "",
    nameOnCard: "",
    creditCardNumber: "",
    expDate: "",
    code: "",
    agency: "",
  });

  return (
    <div className="p-4 md:p-6 bg-white">
      <h2 className="text-lg font-medium text-gray-900 mb-4 md:mb-6">
        Booking Info
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {[
          { label: "Booking Number", name: "bookingNumber" },
          { label: "Full Name", name: "fullName" },
          { label: "Email", name: "email" },
          { label: "Phone", name: "phone" },
          { label: "Arrival Date", name: "arrivalDate" },
          { label: "Departure Date", name: "departureDate" },
          { label: "Status", name: "status" },
          { label: "Total Without Taxes", name: "totalWithoutTaxes" },
          { label: "Total Taxes Included", name: "totalTaxesIncluded" },
          { label: "Rate Plan", name: "ratePlan" },
          { label: "Promo Code", name: "promoCode" },
          { label: "Requests", name: "requests" },
          { label: "Notes", name: "notes" },
          { label: "Description", name: "description" },
          { label: "Number of Rooms", name: "numberOfRooms" },
          { label: "Adults", name: "adults" },
          { label: "Children", name: "children" },
          { label: "Card Type", name: "cardType" },
          { label: "Name on Card", name: "nameOnCard" },
          { label: "Credit Card Number", name: "creditCardNumber" },
          { label: "Exp. Date", name: "expDate" },
          { label: "Code", name: "code" },
          { label: "Agency", name: "agency" },
        ].map(({ label, name }) => (
          <div key={name}>
            <label className="block text-sm text-gray-600 mb-1">
              {label}
            </label>
            <div className="w-full px-2 py-1.5 border border-[#076DB3] rounded-md bg-gray-50 text-gray-900 text-sm truncate">
              {formData[name as keyof BookingFormData] || '-'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}