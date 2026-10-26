import { Headphones, Map, ShieldCheck } from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Safe & Secure",
    description:
      "Your safety is our priority with comprehensive travel insurance and 24/7 support.",
  },
  {
    icon: Map,
    title: "Expert Guides",
    description:
      "Local experts who bring destinations to life with authentic cultural insights.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description:
      "Round-the-clock customer service to assist you wherever your journey takes you.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-[#e8f7fa] px-6 py-16 lg:px-14 lg:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h2 className="font-serif text-4xl text-gray-950 sm:text-[42px]">
            Why Choose Wanderlust
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Your trusted partner for exceptional travel experiences
          </p>
        </div>

        <div className="mt-10 grid gap-3 md:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.title} className="bg-white p-6 shadow-sm sm:p-7">
              <feature.icon className="size-10 text-[#00bcd4]" strokeWidth={1.8} />
              <h3 className="mt-5 text-[22px] leading-snug text-gray-900">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-500">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
