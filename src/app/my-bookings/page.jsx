import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { CalendarDays, Compass } from "lucide-react";
import { auth } from "@/lib/auth";
import BookingCard from "./booking-card";

const MyBookingsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;

  if (!user?.email) redirect("/login");

  let bookings = [];
  let error = null;

  try {
    const res = await fetch(
      `http://localhost:5000/my-bookings/${encodeURIComponent(user.email)}`,
      { cache: "no-store" },
    );

    if (!res.ok) {
      throw new Error(`Request failed with status ${res.status}`);
    }

    const data = await res.json();
    bookings = Array.isArray(data) ? data : [];
  } catch {
    error = "Unable to load your bookings right now. Please try again later.";
  }

  return (
    <main className="mx-auto w-full max-w-6xl  px-6 py-10">
      <h1 className="font-serif text-4xl text-gray-950">My Bookings</h1>
      <p className="mt-2 text-sm text-gray-500">
        Manage and view your upcoming travel plans
      </p>

      {error ? (
        <div className="mt-8 rounded-sm border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      ) : bookings.length === 0 ? (
        <div className="mt-8 flex flex-col items-center rounded-sm border border-gray-200 bg-white px-6 py-16 text-center">
          <span className="flex size-12 items-center justify-center rounded-full bg-cyan-50 text-[#00bcd4]">
            <CalendarDays className="size-6" />
          </span>
          <h2 className="mt-4 font-serif text-2xl text-gray-900">
            No bookings yet
          </h2>
          <p className="mt-2 max-w-sm text-sm text-gray-500">
            When you book a trip, it will show up here with all your travel
            details.
          </p>
          <Link
            href="/destinations"
            className="mt-6 inline-flex h-9 items-center gap-2 rounded-md bg-[#00bcd4] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#00b0c6]"
          >
            <Compass className="size-4" />
            Explore destinations
          </Link>
        </div>
      ) : (
        <div className="mt-8 space-y-4">
          {bookings.map((booking, index) => (
            <BookingCard
              key={booking._id ?? booking.bookingId ?? `booking-${index}`}
              booking={booking}
            />
          ))}
        </div>
      )}
    </main>
  );
};

export default MyBookingsPage;
