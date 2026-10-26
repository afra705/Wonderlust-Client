"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  useCarousel,
} from "@/components/ui/carousel";

const testimonials = [
  {
    quote:
      "The Bali Trip Was Absolutely Magical! Every Detail Was Perfectly Planned. The Resorts Were Luxurious And The Cultural Experiences Were Unforgettable.",
    name: "Michael Chen",
    location: "Singapore",
    image: "/travelers/michael.jpg",
  },
  {
    quote:
      "Swiss Alps Adventure Exceeded All Expectations. The Mountain Views Were Breathtaking And Our Guide Was Incredibly Knowledgeable. Highly Recommend!",
    name: "Sarah Johnson",
    location: "New York, USA",
    image: "/travelers/sarah.jpg",
  },
  {
    quote:
      "The Dubai City Tour Was Seamless From Start To Finish. The Desert Safari At Sunset Was The Highlight Of Our Entire Trip.",
    name: "Priya Patel",
    location: "Dubai, UAE",
    image: "/travelers/priya.jpg",
  },
  {
    quote:
      "Santorini Was A Dream Come True. Every Sunset Cruise And Village Walk Felt Perfectly Curated For Us. We Are Already Planning Our Next Trip!",
    name: "Diego Ramos",
    location: "Barcelona, Spain",
    image: "/travelers/diego.jpg",
  },
];

function TestimonialNav() {
  const { scrollPrev, scrollNext, canScrollPrev, canScrollNext } = useCarousel();

  const buttonClass = (disabled) =>
    `flex size-10 items-center justify-center rounded-full border border-gray-300 text-gray-700 transition hover:border-[#00bcd4] hover:text-[#00bcd4] ${
      disabled ? "opacity-40" : ""
    }`;

  return (
    <div className="flex shrink-0 gap-3">
      <button
        type="button"
        aria-label="Previous testimonials"
        disabled={!canScrollPrev}
        onClick={scrollPrev}
        className={buttonClass(!canScrollPrev)}
      >
        <ArrowLeft className="size-4" />
      </button>
      <button
        type="button"
        aria-label="Next testimonials"
        disabled={!canScrollNext}
        onClick={scrollNext}
        className={buttonClass(!canScrollNext)}
      >
        <ArrowRight className="size-4" />
      </button>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="bg-white px-6 py-16 lg:px-14 lg:py-20">
      <Carousel opts={{ align: "start" }} className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="font-serif text-4xl text-gray-950 sm:text-[42px]">
              What Travelers Say
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Real experiences from our happy travelers
            </p>
          </div>
          <TestimonialNav />
        </div>

        <CarouselContent className="mt-8">
          {testimonials.map((testimonial) => (
            <CarouselItem key={testimonial.name} className="basis-full md:basis-1/2">
              <div className="flex h-full gap-5 border border-gray-200 bg-white p-5">
                <div className="flex flex-1 flex-col">
                  <blockquote className="text-[15px] leading-snug text-gray-900">
                    {`"${testimonial.quote}"`}
                  </blockquote>
                  <div className="mt-auto pt-6">
                    <p className="text-sm text-[#00bcd4]">— {testimonial.name}</p>
                    <p className="pl-5 pt-0.5 text-xs text-gray-500">
                      {testimonial.location}
                    </p>
                  </div>
                </div>
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  width={400}
                  height={520}
                  className="h-52 w-36 shrink-0 object-cover sm:w-40"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}
