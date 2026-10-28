/* eslint-disable @next/next/no-img-element */

"use client";

import { useEffect, useMemo, useState } from "react";
import { Calendar, MapPin, Star, ArrowUpRight } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";



const categories = [
  "Beach",
  "Mountain",
  "Historical",
  "City Tour",
  "Adventure",
  "Luxury",
];

const priceRanges = [
  { value: "under-500", label: "Under $500", test: (price) => price < 500 },
  {
    value: "500-1000",
    label: "$500 - $1000",
    test: (price) => price >= 500 && price < 1000,
  },
  {
    value: "1000-1500",
    label: "$1000 - $1500",
    test: (price) => price >= 1000 && price < 1500,
  },
  { value: "over-1500", label: "Over $1500", test: (price) => price >= 1500 },
];

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name", label: "Name: A to Z" },
];

const selectTriggerClass =
  "h-10 w-full justify-between rounded-none border-gray-300 bg-white px-3 text-xs font-medium tracking-widest text-gray-500 uppercase";

export default  function AllDestinationPage() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [sortBy, setSortBy] = useState("featured");


  useEffect(() => {
    const fetchDestinations = async () => {

      try {
        const res = await fetch(`http://localhost:5000/destinations`, {
        
        });
        if (!res.ok)
          throw new Error(`Request failed with status ${res.status}`);
        const data = await res.json();

        if (Array.isArray(data)) {
          const uniqueDestinations = data.filter(
            (destination, index, array) => {
              if (!destination._id) return true;

              return (
                array.findIndex((item) => item._id === destination._id) ===
                index
              );
            },
          );

          setDestinations(uniqueDestinations);
        } else {
          setDestinations([]);
        }
      } catch (err) {
        setError(
          "Failed to load destinations. Please make sure the API server is running.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  const visibleDestinations = useMemo(() => {
    let list = [...destinations];

    if (category !== "all") {
      list = list.filter(
        (destination) =>
          destination.category?.toLowerCase() === category.toLowerCase(),
      );
    }

    if (priceRange !== "all") {
      const range = priceRanges.find((item) => item.value === priceRange);
      if (range) {
        list = list.filter((destination) =>
          range.test(Number(destination.price) || 0),
        );
      }
    }

    switch (sortBy) {
      case "price-asc":
        list.sort((a, b) => (Number(a.price) || 0) - (Number(b.price) || 0));
        break;
      case "price-desc":
        list.sort((a, b) => (Number(b.price) || 0) - (Number(a.price) || 0));
        break;
      case "name":
        list.sort((a, b) => (a.name ?? "").localeCompare(b.name ?? ""));
        break;
      default:
        break;
    }

    return list;
  }, [destinations, category, priceRange, sortBy]);

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-10 lg:px-12">
      <h1 className="font-serif text-4xl text-gray-950">
        Explore All Destinations
      </h1>
      <p className="mt-2 text-sm text-gray-500">
        Find your perfect travel experience from our curated collection
      </p>

      <div className="mt-6 grid gap-px border border-gray-300 bg-gray-300 sm:grid-cols-3">
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className={selectTriggerClass} aria-label="Category">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Category</SelectItem>
            {categories.map((item) => (
              <SelectItem key={item} value={item.toLowerCase()}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={priceRange} onValueChange={setPriceRange}>
          <SelectTrigger
            className={selectTriggerClass}
            aria-label="Price range"
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Price Range</SelectItem>
            {priceRanges.map((range) => (
              <SelectItem key={range.value} value={range.value}>
                {range.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className={selectTriggerClass} aria-label="Sort by">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <p className="mt-3 text-sm text-gray-500">
        {loading
          ? "Loading destinations..."
          : `Showing ${visibleDestinations.length} destination${visibleDestinations.length === 1 ? "" : "s"}`}
      </p>

      {error ? <p className="mt-2 text-sm text-red-500">{error}</p> : null}

      <section className="mt-5 grid gap-x-8 gap-y-10 pb-10 sm:grid-cols-2 lg:grid-cols-3">
        {visibleDestinations.map((destination) => (
          <article key={destination._id ?? destination.name} className="group">
            <div className="relative overflow-hidden rounded-sm">
              {destination.imageUrl ? (
                <div className="overflow-hidden rounded-md">
                  <img
                    src={destination.imageUrl || undefined}
                    alt={destination.name || "Destination"}
                    className="h-[250px] w-full object-cover
      transition-transform duration-700 ease-in-out
      hover:scale-110"
                  />
                </div>
              ) : (
                <div className="flex aspect-[21/9] w-full items-center justify-center bg-gray-100 text-sm text-gray-400">
                  No image available
                </div>
              )}
              <span className="absolute top-2.5 right-2.5 flex items-center gap-1 rounded-full bg-gray-900/70 px-2 py-0.5 text-xs font-medium text-white backdrop-blur-sm">
                4.5
                <Star className="size-3 fill-amber-400 text-amber-400" />
              </span>
            </div>

            <div className="mt-3 space-y-1.5">
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <MapPin className="size-3.5" />
                {destination.country ?? "Unknown"}
              </div>

              <div className="flex items-start justify-between gap-3">
                <h2 className="text-base font-medium text-gray-900">
                  {destination.name}
                </h2>
                <p className="text-lg font-semibold whitespace-nowrap text-gray-900">
                  ${destination.price}
                  <span className="ml-0.5 text-[10px] font-normal text-gray-400">
                    /Person
                  </span>
                </p>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                <Calendar className="size-3.5 text-cyan-600" />
                {destination.duration}
              </div>

              <Link href={`/destinations/${destination._id}`}>
                <button
                  type="button"
                  className="mt-1 inline-flex items-center gap-1 text-xs font-semibold tracking-widest text-cyan-600 uppercase transition-colors hover:text-cyan-700"
                >
                  Book Now
                  <ArrowUpRight className="size-3.5" />
                </button>
              </Link>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
