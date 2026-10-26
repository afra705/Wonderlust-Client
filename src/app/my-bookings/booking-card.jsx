/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import Link from "next/link";
import {
  CalendarDays,
  CalendarX2,
  CircleCheck,
  CircleUserRound,
  CircleX,
  Clock3,
  Eye,
  MapPin,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { redirect } from "next/navigation";


const statusStyles = {
  confirmed: {
    label: "Confirmed",
    icon: CircleCheck,
    className: "bg-green-50 text-green-700",
  },
  pending: {
    label: "Pending",
    icon: Clock3,
    className: "bg-orange-50 text-orange-500",
  },
  cancelled: {
    label: "Cancelled",
    icon: CircleX,
    className: "bg-red-50 text-red-600",
  },
  canceled: {
    label: "Cancelled",
    icon: CircleX,
    className: "bg-red-50 text-red-600",
  },
};

const formatDate = (value) => {
  if (!value) return "TBA";

  const datePart = String(value).slice(0, 10);
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(datePart);

  const date = match
    ? new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]))
    : new Date(value);

  if (Number.isNaN(date.getTime())) return "TBA";

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const BookingCard = ({ booking }) => {

  const statusKey = String(booking.status ?? "confirmed").toLowerCase();

  const status = statusStyles[statusKey] ?? {
    label: booking.status,
    icon: CircleCheck,
    className: "bg-gray-100 text-gray-600",
  };

  const StatusIcon = status.icon;
  const isCancelled = ["cancelled", "canceled"].includes(statusKey);
  const destinationId = booking.destinationId ?? booking._id;

  const destinationHref = destinationId
    ? `/destinations/${destinationId}`
    : "/destinations";

  const bookingId = booking.bookingId ?? booking._id;
  const displayBookingId = bookingId ? String(bookingId).slice(-6) : "—";

  const handleDelete= async()=>{
   const res = await fetch(`http://localhost:5000/my-bookings/${bookingId}`,{
            method:'DELETE',
        
        })
        const data = await res.json()
        console.log(data);
        redirect('/my-bookings')
      }

  return (
    <article className="flex flex-col overflow-hidden rounded-md border border-gray-200 bg-white transition-shadow hover:shadow-sm sm:flex-row">
      {/* Destination Image */}
      <div className="h-36 w-full shrink-0 overflow-hidden bg-gray-100 sm:h-36 sm:w-48">
        {booking.imageUrl ? (
          <img
            src={booking.imageUrl}
            alt={booking.name ?? "Destination"}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-gray-400">
            <MapPin className="size-5" />
          </div>
        )}
      </div>

      {/* Booking Details */}
      <div className="flex min-w-0 flex-1 flex-col justify-between gap-3 p-3 sm:p-4">
        <div>
          <span
            className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium ${status.className}`}
          >
            <StatusIcon className="size-3" />
            {status.label}
          </span>

          <h2 className="mt-1.5 line-clamp-1 font-serif text-xl leading-tight text-gray-900">
            {booking.name ?? "Untitled trip"}
          </h2>

          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500">
            <p className="flex items-center gap-1.5">
              <CalendarDays className="size-3.5 shrink-0 text-gray-400" />
              <span>{formatDate(booking.departureDate)}</span>
            </p>

            <p className="flex items-center gap-1.5">
              <CircleUserRound className="size-3.5 shrink-0 text-gray-400" />
              <span>Booking ID: {displayBookingId}</span>
            </p>
          </div>
        </div>

        {/* Price and Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-xl font-semibold leading-none text-[#00bcd4]">
            {booking.price !== undefined &&
            booking.price !== null &&
            booking.price !== ""
              ? `$${booking.price}`
              : "—"}
          </p>

          <div className="flex items-center gap-2">
            {!isCancelled && (
              <AlertDialog>
                <AlertDialogTrigger
                  render={
                    <button
                      type="button"
                      className="inline-flex h-8 items-center gap-1 rounded-sm border border-red-200 bg-white px-3 text-xs font-medium text-red-500 transition-colors hover:bg-red-50 hover:text-red-600"
                    >
                      <CalendarX2 className="size-3.5" />
                      Cancel
                    </button>
                  }
                />

                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Cancel this booking?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Your trip to {booking.name ?? "this destination"} will be
                      removed from your bookings. This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>

                  <AlertDialogFooter>
                    <AlertDialogCancel>Keep booking</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDelete}
                      className="bg-red-600 text-white hover:bg-red-700"
                    >
                      Cancel booking
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}

            <Link
              href={destinationHref}
              className="inline-flex h-8 items-center gap-1 rounded-sm bg-[#00bcd4] px-3 text-xs font-semibold text-white transition-colors hover:bg-[#00b0c6]"
            >
              <Eye className="size-3.5" />
              View
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
};

export default BookingCard;