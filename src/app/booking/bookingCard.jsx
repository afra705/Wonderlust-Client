'use client'
import React from 'react';
import {
  Check,
  ArrowRight,
} from "lucide-react";


const perks = [
  "Free cancellation up to 7 days",
  "Travel insurance included",
  "24/7 customer support",
];

const formatDepartureDate = (value) => {
  if (!value) return "Not scheduled yet";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  }).format(date);
};

const BookingCard = ({destination}) => {
    return (
            <aside>
          <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-xs text-gray-500">Starting from</p>
            <p className="mt-1 text-3xl font-semibold text-[#00bcd4]">
              ${destination.price}
            </p>
            <p className="mt-0.5 text-xs text-gray-500">per person</p>

            <div className="my-4 h-px bg-gray-100" />

            <p className="text-xs text-gray-500">Departure Date</p>
            <div className="mt-1.5 rounded-md border border-gray-200 bg-[#f8fafc] px-3 py-2 text-sm text-gray-700">
              {formatDepartureDate(destination.departureDate)}
            </div>

            <button
              type="button"
              className="mt-4 flex h-10 w-full items-center justify-center gap-2 rounded-md bg-[#00bcd4] text-sm font-semibold text-white transition-colors hover:bg-[#00b0c6]"
            >
              Book Now
              <ArrowRight className="size-4" />
            </button>

            <ul className="mt-4 space-y-2">
              {perks.map((perk) => (
                <li
                  key={perk}
                  className="flex items-start gap-2 text-xs text-gray-600"
                >
                  <Check className="mt-0.5 size-3.5 shrink-0 text-green-600" />
                  {perk}
                </li>
              ))}
            </ul>
          </div>
        </aside>
    );
};

export default BookingCard;