"use client"; // Required for interactivity (dropdowns, state)

import { ChevronDown, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Optional: for active links

const categories = [
  "Auto Care Products",
  "Car Cleaning",
  "Detailing Services",
  "Paint & Body Work",
  "Engine Care",
  "Brake Parts",
  "Suspension",
  "Filters",
  "Engine Oils",
];

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Shop", href: "/shop" },
  { label: "Services", href: "/services" },
  { label: "Blog", href: "/blog" },
  { label: "Contact Us", href: "/contact" },
];

const Navigation = () => {
  const pathname = usePathname(); // Optional: for active state

  return (
   <nav className="bg-nav-bg text-nav-foreground hidden md:block">
      <div className="container mx-auto px-4">
        <div className="flex items-center">
          {/* Categories Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="text-primary-foreground bg-primary hover:bg-primary/90 rounded-none h-12 px-6 gap-2"
              >
                <Menu className="h-5 w-5" />
                <span className="font-semibold">ALL CATEGORIES</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              {categories.map((category) => (
                <DropdownMenuItem key={category} className="cursor-pointer">
                  {category}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Nav Links - Updated with Next.js Link */}
          <div className="flex items-center">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`px-5 py-3 h-12 flex items-center font-medium hover:bg-nav-foreground/10 transition-colors ${
                  pathname === link.href ? "bg-nav-foreground/10" : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;