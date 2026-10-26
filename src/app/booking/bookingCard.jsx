'use client'
import React from 'react';
import {
  Check,
  ArrowRight,
} from "lucide-react";
import { authClient } from '@/lib/auth-client';
// import { date } from 'better-auth';


const perks = [
  "Free cancellation up to 7 days",
  "Travel insurance included",
  "24/7 customer support",
];



const BookingCard = ({destination}) => {
    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;
     
    const handleBooking= async(e)=>{
        e.preventDefault()
        const departureDate = e.target.departureDate.value;

        const data={
            username: user?.name,
            email:user?.email,
            image:user?.image,
            ...destination,
            departureDate:departureDate,
            bookingDate: new Date()
        }
        console.log(data);

        const res = await fetch(`http://localhost:5000/bookings/`,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        const bookingRes = await res.json()
        console.log(bookingRes);
        
    }
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

          <form onSubmit={handleBooking}>
            <input
              name='departureDate'
              type="date"
              defaultValue={destination.departureDate?.slice(0, 10) || ""}
              className="w-full rounded-md border border-gray-200 bg-[#f8fafc] px-3 py-2 text-sm text-gray-700 outline-none focus:border-[#00bcd4] focus:ring-1 focus:ring-[#00bcd4]"
            />

            <button
         
              type="submit"
              className="mt-4 flex h-10 w-full items-center justify-center gap-2 rounded-md bg-[#00bcd4] text-sm font-semibold text-white transition-colors hover:bg-[#00b0c6]"
            >
              Book Now
              <ArrowRight className="size-4" />
            </button>
          </form>

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