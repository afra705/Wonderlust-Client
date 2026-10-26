/* eslint-disable @next/next/no-img-element */
"use client";

import { useCallback, useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Calendar,
  MapPin,
  Star,
} from "lucide-react";
import Link from "next/link";
import { cn } from "cn";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

function DestinationCard({ destination }) {
  return (
    <article className="group">
      <div className="relative overflow-hidden rounded-md">
        {destination.imageUrl ? (
          <img
            src={destination.imageUrl}
            alt={destination.name || "Destination"}
            className="h-[250px] w-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
          />
        ) : (
          <div className="flex h-[250px] w-full items-center justify-center bg-gray-100 text-sm text-gray-400">
            No image available
          </div>
        )}
        <span className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-gray-900/70 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
          4.5
          <Star className="size-3 fill-amber-400 text-amber-400" />
        </span>
      </div>

      <div className="mt-4 space-y-2">
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <MapPin className="size-3.5" />
          {destination.country ?? "Unknown"}
        </div>

        <div className="flex items-start justify-between gap-3">
          <h3 className="text-xl font-medium text-gray-900">
            {destination.name}
          </h3>
          <p className="text-xl font-semibold whitespace-nowrap text-gray-900">
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

        <Link
          href={`/destinations/${destination._id}`}
          className="inline-flex items-center gap-1 border-b border-cyan-600 pb-0.5 text-xs font-semibold tracking-widest text-cyan-600 uppercase transition-colors hover:text-cyan-700"
        >
          Book Now
          <ArrowUpRight className="size-3.5" />
        </Link>
      </div>
    </article>
  );
}

export default function FeaturedDestinations() {
  const [api, setApi] = useState(null);
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const res = await fetch("http://localhost:5000/destinations");
        if (!res.ok) throw new Error(`Request failed with status ${res.status}`);
        const data = await res.json();

        if (Array.isArray(data)) {
          const uniqueDestinations = data.filter(
            (destination, index, array) => {
              if (!destination._id) return true;
              return (
                array.findIndex(
                  (item) => item._id === destination._id
                ) === index
              );
            }
          );

          setDestinations(uniqueDestinations);
        } else {
          setDestinations([]);
        }
      } catch (err) {
        setError("Failed to load destinations. Please make sure the API server is running.");
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setCount(api.scrollSnapList().length);
      setCurrent(api.selectedScrollSnap());
    };

    api.on("select", onSelect);
    api.on("reInit", onSelect);

    const raf = requestAnimationFrame(onSelect);

    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
      cancelAnimationFrame(raf);
    };
  }, [api]);

  const scrollPrev = useCallback(() => api?.scrollPrev(), [api]);
  const scrollNext = useCallback(() => api?.scrollNext(), [api]);

  const featured = destinations.slice(0, 10);

  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-14 lg:px-12">
      {/* Section header */}
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <h2 className="font-serif text-4xl text-gray-950 sm:text-5xl">
            Featured Destinations
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Handpicked travel experiences for the adventure seekers
          </p>
        </div>

        <Link
          href="/destinations"
          className="inline-flex items-center gap-2 border border-cyan-600 px-5 py-3 text-xs font-semibold tracking-widest text-cyan-600 uppercase transition-colors hover:bg-cyan-600 hover:text-white"
        >
          All Destinations
          <ArrowRight className="size-4" />
        </Link>
      </div>

      {/* Carousel */}
      <div className="mt-10">
        {loading ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="space-y-3">
                <div className="h-[250px] w-full animate-pulse rounded-md bg-gray-100" />
                <div className="h-3 w-24 animate-pulse rounded bg-gray-100" />
                <div className="h-5 w-40 animate-pulse rounded bg-gray-100" />
                <div className="h-3 w-28 animate-pulse rounded bg-gray-100" />
              </div>
            ))}
          </div>
        ) : error ? (
          <p className="text-sm text-red-500">{error}</p>
        ) : (
          <Carousel
            setApi={setApi}
            opts={{ align: "start" }}
            className="w-full"
          >
            <CarouselContent>
              {featured.map((destination) => (
                <CarouselItem
                  key={destination._id ?? destination.name}
                  className="basis-full sm:basis-1/2 lg:basis-[calc((100%-1rem)/2.35)]"
                >
                  <DestinationCard destination={destination} />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        )}
      </div>

      {/* Controls: counter + progress line + arrows */}
      {!loading && !error && featured.length > 0 ? (
        <div className="mt-10 flex items-center gap-6">
          <p className="text-lg whitespace-nowrap">
            <span className="text-gray-900">{Math.min(current + 1, count || 1)}</span>
            <span className="text-gray-400">/{count || 1}</span>
          </p>

          <div className="relative h-px flex-1 bg-gray-200">
            <div
              className="absolute inset-y-0 left-0 bg-gray-900 transition-all duration-300"
              style={{
                width: `${((current + 1) / (count || 1)) * 100}%`,
              }}
            />
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Previous slide"
              onClick={scrollPrev}
              disabled={current === 0}
              className="rounded-full border border-cyan-600 p-3 text-cyan-600 transition-colors hover:bg-cyan-600 hover:text-white disabled:pointer-events-none disabled:opacity-40"
            >
              <ArrowLeft className="size-4" />
            </button>
            <button
              type="button"
              aria-label="Next slide"
              onClick={scrollNext}
              disabled={count > 0 && current === count - 1}
              className={cn(
                "rounded-full border border-cyan-600 p-3 text-cyan-600 transition-colors hover:bg-cyan-600 hover:text-white",
                "disabled:pointer-events-none disabled:opacity-40"
              )}
            >
              <ArrowRight className="size-4" />
            </button>
          </div>
        </div>
      ) : null}
    </section>
  );
}
