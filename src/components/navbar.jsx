import { User } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#", active: true },
  { label: "Add Destinations", href: "/add-destination" },
  { label: "Destinations", href: "/destinations" },
  { label: "My Bookings", href: "#" },

];

export default function Navbar() {
  return (
    <header className="relative z-20 flex h-12 items-center justify-between border-b border-gray-200 bg-white px-4">
      <nav className="flex items-center gap-4 text-sm sm:gap-6">
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className={
              link.active
                ? "text-[#00bcd4] underline decoration-2 underline-offset-4"
                : "text-gray-900 hover:text-[#00bcd4]"
            }
          >
            {link.label}
          </a>
        ))}
      </nav>

      <a
        href="#"
        className="absolute left-1/2 hidden -translate-x-1/2 font-serif text-xl font-bold text-[#00bcd4] sm:block"
      >
        Wanderlast
      </a>

      <nav className="flex items-center gap-4 text-sm sm:gap-6">
        <a href="#" className="flex items-center gap-1.5 hover:text-[#00bcd4]">
          <User className="size-4" />
          Profile
        </a>
        <a href="#" className="hover:text-[#00bcd4]">
          Login
        </a>
        <a href="#" className="hover:text-[#00bcd4]">
          Sign Up
        </a>
      </nav>
    </header>
  );
}
