"use client";

import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { authClient } from "@/lib/auth-client";
import { User } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const navLinks = [
  { label: "Home", href: "/", active: true },
  { label: "Add Destinations", href: "/add-destination" },
  { label: "Destinations", href: "/destinations" },
  { label: "My Bookings", href: "#" },
];

export default function Navbar() {
const { data: session, isPending } = authClient.useSession();
const user = session?.user;
  console.log(user);

 const handleSignout = async () => {
  try {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          window.location.href = "/login";
        },
      },
    });
  } catch (error) {
    console.error("Sign out failed:", error);
  }
};

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
        href=""
        className="absolute left-1/2 hidden -translate-x-1/2 font-serif text-xl font-bold text-[#00bcd4] sm:block"
      >
        Wanderlast
      </a>

     <nav className="flex items-center gap-4 text-sm sm:gap-6">
  {isPending ? (
    <div className="h-8 w-20 animate-pulse rounded-md bg-gray-200" />
  ) : user ? (
    <>
      <Link href="/profile" className="hover:text-[#00bcd4] flex flex-row">
               <User className="size-4 " />
        Profile
      </Link>

      <Popover>
        <PopoverTrigger
          render={
            <button
              type="button"
              aria-label="Open user menu"
              className="rounded-full focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              <Avatar>
                <AvatarImage
                  src={user.image || ""}
                  alt={user.name || "User"}
                />
                <AvatarFallback>
                  {user.name?.charAt(0)?.toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
            </button>
          }
        />

        <PopoverContent align="end">
          <PopoverHeader>
            <PopoverTitle>{user.name}</PopoverTitle>
            <PopoverDescription>{user.email}</PopoverDescription>
          </PopoverHeader>

          <div className="mt-3">
            <button
              type="button"
              onClick={async () => {
                await authClient.signOut({
                  fetchOptions: {
                    onSuccess: () => {
                      window.location.href = "/login";
                    },
                  },
                });
              }}
              className="w-full rounded-md px-3 py-2 text-left text-sm text-red-600 hover:bg-gray-100"
            >
              Sign Out
            </button>
          </div>
        </PopoverContent>
      </Popover>
    </>
  ) : (
    <>
      <Link href="/login" className="hover:text-[#00bcd4]">
        Sign In
      </Link>

      <Link href="/signup" className="hover:text-[#00bcd4]">
        Sign Up
      </Link>
    </>
  )}
</nav>
    </header>
  );
}
