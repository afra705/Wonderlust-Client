import { ArrowRight } from "lucide-react";

const Cta = () => {
  return (
    <section className="relative flex min-h-[300px] items-center justify-center overflow-hidden px-6 py-16 text-center">
      {/* Background + overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/CTA.png')" }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-black/40"
      />

      <div className="relative">
        <h2 className="font-serif text-4xl text-white sm:text-[42px]">
          Ready To Start Your Journey?
        </h2>
        <p className="mt-3 text-sm text-white/90">
          Join thousands of travelers who have discovered the world with us
        </p>
        <button className="mx-auto mt-7 flex items-center gap-3 bg-white px-6 py-3 text-xs font-semibold uppercase tracking-wider text-gray-900 hover:bg-gray-100">
          Book Your Trip Today
          <ArrowRight className="size-4" />
        </button>
      </div>
    </section>
  );
};

export default Cta;
