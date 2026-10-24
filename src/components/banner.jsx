import { ArrowRight } from "lucide-react";
import Link from "next/link";

const searchFields = [
  { label: "Location", placeholder: "Address, City Or Zip" },
  { label: "Date/Duration", placeholder: "Anytime/3 Days" },
  { label: "Budget", placeholder: "$0-$3000" },
  { label: "People", placeholder: "5-10" },
];

export default function Banner() {
  return (
    <section className="relative flex min-h-[560px] flex-col">
      {/* Background + overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/Banner.png')" }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/25"
      />

      {/* Hero content */}
      <div className="relative flex flex-1 flex-col items-center justify-center px-6 pb-10 pt-14 text-center">
        <h1 className="max-w-3xl font-serif text-5xl leading-[1.1] text-white sm:text-6xl lg:text-7xl">
          Discover Your Next Adventure
        </h1>
        <p className="mt-4 max-w-xl text-sm text-white/90 sm:text-base">
          Explore breathtaking destinations and create unforgettable memories
          with our curated travel experiences.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button className="flex items-center gap-2 bg-[#00bcd4] px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white hover:bg-[#00b0c6]">
            Explore Now
            <ArrowRight className="size-4" />
          </button>
          <Link href='/destinations'>
            <button className="bg-white/25 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-sm hover:bg-white/35">
              View Destination
            </button>
          </Link>
        </div>
      </div>

      {/* Search bar */}
      <div className="relative grid grid-cols-2 border-t border-white/15 bg-black/50 backdrop-blur-[2px] md:grid-cols-[1fr_1fr_1fr_1fr_auto]">
        {searchFields.map((field) => (
          <label
            key={field.label}
            className="border-t border-white/15 px-5 py-2.5 md:border-t-0 md:border-l md:first:border-l-0"
          >
            <span className="block text-[15px] font-semibold text-white">
              {field.label}
            </span>
            <input
              placeholder={field.placeholder}
              className="mt-0.5 w-full bg-transparent text-xs text-white outline-none placeholder:text-gray-300"
            />
          </label>
        ))}
        <button className="col-span-2 border-t border-white/15 bg-[#00bcd4] px-12 py-3 text-sm font-semibold text-white hover:bg-[#00b0c6] md:col-span-1 md:border-t-0 md:border-l">
          Search
        </button>
      </div>
    </section>
  );
}
