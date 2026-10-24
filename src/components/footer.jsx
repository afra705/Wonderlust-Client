import { ArrowUpRight } from "lucide-react";

function XIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.451-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117l11.966 15.644Z" />
    </svg>
  );
}

function LinkedInIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
    </svg>
  );
}

function InstagramIcon({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

const quickLinks = ["Home", "Destinations", "My Bookings", "My Profile"];
const supportLinks = ["Help Center", "Terms of Service", "Privacy Policy"];

const Footer = () => {
  return (
    <footer className="bg-[#0a0a0a] text-white">
      <div className="px-6 py-14 lg:px-14">
        <h2 className="font-serif text-5xl font-bold sm:text-6xl">Wanderlast</h2>
        <p className="mt-2 text-sm text-gray-400">
          Your gateway to extraordinary travel experiences around the world.
        </p>

        <div className="mt-14 grid gap-10 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
          {/* Newsletter */}
          <div>
            <h3 className="font-serif text-xs uppercase tracking-widest">
              Newsletter
            </h3>
            <p className="mt-3 text-xs text-gray-400">
              Subscribe for exclusive travel deals and inspiration.
            </p>
            <div className="mt-4 flex max-w-[220px] items-center justify-between bg-[#262626] px-4 py-2.5">
              <input
                placeholder="Enter email"
                className="w-full bg-transparent text-sm text-white outline-none placeholder:text-gray-400"
              />
              <ArrowUpRight className="size-4 shrink-0 text-white" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-xs uppercase tracking-widest">
              Quick Links
            </h3>
            <ul className="mt-5 space-y-3">
              {quickLinks.map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm text-gray-300 hover:text-[#00bcd4]">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-serif text-xs uppercase tracking-widest">
              Support
            </h3>
            <ul className="mt-5 space-y-3">
              {supportLinks.map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm text-gray-300 hover:text-[#00bcd4]">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-serif text-xs uppercase tracking-widest">
              Contact Us
            </h3>
            <ul className="mt-5 space-y-3 text-sm text-gray-300">
              <li>786 901 1622</li>
              <li>info@wanderland.com</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-5">
          <p className="text-xs text-gray-400">
            © 2026 Wanderlust. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <a href="#" aria-label="X (Twitter)" className="hover:text-[#00bcd4]">
              <XIcon className="size-4" />
            </a>
            <a href="#" aria-label="LinkedIn" className="hover:text-[#00bcd4]">
              <LinkedInIcon className="size-4" />
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-[#00bcd4]">
              <InstagramIcon className="size-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
