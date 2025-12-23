"use client"; // Required for useState and interactive components

import { Search, Phone, Heart, ShoppingCart, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

const Header = () => {
  const [cartCount] = useState(0);
  const pathname = usePathname();

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Shop", href: "/shop" },
    { label: "Services", href: "/services" },
    { label: "Blog", href: "/blog" },
    { label: "Contact Us", href: "/contact" },
  ];

  return (
    <header className="bg-card border-b border-border py-4">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="logo" width={100} height={100}/>
            <div className="text-2xl font-heading font-bold">
              <span className="text-primary">AUTO</span>
              <span className="text-foreground">CARE</span>
            </div>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-xl">
            <div className="relative w-full">
              <Input
                type="text"
                placeholder="Enter Product Name"
                className="w-full pr-12 bg-secondary border-input"
              />
              <Button
                size="icon"
                className="absolute right-0 top-0 h-full rounded-l-none"
                aria-label="Search"
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Contact & Actions */}
          <div className="flex items-center gap-4">
            {/* Phone - Desktop */}
            <div className="hidden lg:flex items-center gap-2">
              <Phone className="h-5 w-5 text-primary" />
              <div className="text-sm">
                <a 
                  href="tel:09012345678" 
                  className="font-bold hover:text-primary transition-colors"
                >
                  09012345678
                </a>
                <div className="text-muted-foreground text-xs">Call/WhatsApp</div>
              </div>
            </div>

            {/* Action Icons */}
            <div className="flex items-center gap-2">
              <Link href="/wishlist">
                <Button variant="ghost" size="icon" className="hidden md:flex" aria-label="Wishlist">
                  <Heart className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="/cart">
                <Button variant="ghost" size="icon" className="relative" aria-label="Cart">
                  <ShoppingCart className="h-5 w-5" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </Button>
              </Link>
              <Link href="/account">
                <Button variant="ghost" size="icon" className="hidden md:flex" aria-label="Account">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
            </div>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden" aria-label="Menu">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <nav className="flex flex-col gap-4 mt-8">
                  {navLinks.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      className={`text-lg font-medium transition-colors ${
                        pathname === link.href
                          ? "text-primary font-semibold"
                          : "hover:text-primary"
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden mt-4">
          <form className="relative w-full" onSubmit={(e) => e.preventDefault()}>
            <Input
              type="search"
              placeholder="Search products..."
              className="w-full pr-12 bg-secondary"
              aria-label="Search products"
            />
            <Button
              type="submit"
              size="icon"
              className="absolute right-0 top-0 h-full rounded-l-none"
              aria-label="Search"
            >
              <Search className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </header>
  );
};

export default Header;