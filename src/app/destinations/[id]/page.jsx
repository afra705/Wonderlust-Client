import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  Check,
  MapPin,
  Star,
  ArrowRight,
} from "lucide-react";
import { EditDestination } from "@/components/EditDestination";
import DeleteDestination from "@/components/DeleteDestination";
import BookingCard from '@/app/booking/bookingCard'

const highlightsByCategory = {
  Beach: [
    "Beachfront accommodation",
    "Traditional spa treatment",
    "Sunset dinner experience",
    "Snorkeling & water sports",
  ],
  Mountain: [
    "Scenic mountain trails",
    "Cozy lodge stays",
    "Local village visits",
    "Guided trek experiences",
  ],
  Historical: [
    "Guided heritage walks",
    "Ancient landmark visits",
    "Local museum access",
    "Traditional cuisine tasting",
  ],
  "City Tour": [
    "Iconic city sightseeing",
    "Local food experiences",
    "Museum & gallery visits",
    "Evening city walks",
  ],
  Adventure: [
    "Thrilling outdoor activities",
    "Expert guides included",
    "Off-the-beaten-path routes",
    "Camping experience",
  ],
  Luxury: [
    "Luxury beachfront accommodation",
    "Private pool suites",
    "Fine dining experiences",
    "Personal concierge service",
  ],
};

const defaultHighlights = [
  "Comfortable accommodation",
  "Guided local experiences",
  "All transfers included",
  "Daily breakfast provided",
];


const formatDuration = (value) => {
  if (!value) return "N/A";
  return value
    .split(" ")
    .map((word) => (word.length > 0 ? word[0].toUpperCase() + word.slice(1) : word))
    .join(" ");
};

const DestinationDetailsPage = async ({ params }) => {
  const { id } = await params;

  let destination = null;
  try {
    const res = await fetch(`http://localhost:5000/destinations/${id}`);
    if (res.ok) {
      destination = await res.json();
    }
  } catch {
    destination = null;
  }

  if (!destination?._id) notFound();

  const highlights = destination.highlights ?? highlightsByCategory[destination.category] ?? defaultHighlights;
  const rating = destination.rating ?? "4.9";
  const reviews = destination.reviews ?? 234;

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-8 lg:px-12">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Link
          href="/destinations"
          className="inline-flex items-center gap-1.5 text-sm text-gray-600 transition-colors hover:text-gray-900"
        >
          <ArrowLeft className="size-4" />
          Back to Destinations
        </Link>

        <div className="flex items-center gap-3">
       
          <EditDestination destination={destination} key={destination._id}/>
          <DeleteDestination id={id}/>
         
        </div>
      </div>

      <div className="mt-4 overflow-hidden rounded-md">
        <img
          src={destination.imageUrl}
          alt={destination.name}
          className="aspect-[21/9] w-full object-cover"
        />
      </div>

      <div className="mt-8 grid gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <MapPin className="size-4" />
            {destination.country ?? "Unknown"}
          </div>

          <h1 className="mt-2 font-serif text-4xl text-gray-950">
            {destination.name}
          </h1>

          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-600">
            <span className="flex items-center gap-1">
              <Star className="size-4 fill-green-600 text-green-600" />
              <span className="font-semibold text-gray-900">{rating}</span>
              <span className="text-gray-500">({reviews} reviews)</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="size-4 text-gray-400" />
              {formatDuration(destination.duration)}
            </span>
          </div>

          <div className="mt-6">
            <h2 className="text-lg font-semibold text-gray-900">Overview</h2>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              {destination.description}
            </p>
          </div>

          <div className="mt-6">
            <h2 className="text-lg font-semibold text-gray-900">Highlights</h2>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              {destination.description}
            </p>
            <ul className="mt-4 grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
              {highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="flex items-start gap-2 text-sm text-gray-700"
                >
                  <Check className="mt-0.5 size-4 shrink-0 text-green-600" />
                  {highlight}
                </li>
              ))}
            </ul>
          </div>
        </div>
{/* sidebar */}
        <BookingCard destination={destination}/>
      </div>
    </main>
  );
};

export default DestinationDetailsPage;
