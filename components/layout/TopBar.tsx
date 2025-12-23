"use client"; // Required for useState and interactivity

import { Clock, MessageCircle, MapPin, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link"; // Added for internal navigation

const TopBar = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
   <div className="bg-topbar-bg text-topbar-foreground py-2 px-4 text-sm">
      <div className="container mx-auto flex items-center justify-between">
        <div className="hidden md:flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>Mon-Fri: 9am-6pm | Sat: 9am-4pm</span>
          </div>
          <div className="flex items-center gap-2">
            <MessageCircle className="h-4 w-4" />
            <span>
              Chat via{" "}
              <a 
                href="#" 
                className="underline font-medium hover:opacity-80 transition-opacity"
                onClick={(e) => {
                  e.preventDefault();
                  // WhatsApp integration - adjust phone number as needed
                  window.open("https://wa.me/07073158078", "_blank");
                }}
              >
                WhatsApp
              </a>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <Link 
              href="/locations" 
              className="underline font-medium hover:opacity-80 transition-opacity"
            >
              Our Locations
            </Link>
          </div>
        </div>
        <div className="flex-1 text-center md:text-left md:flex-none">
          <span className="font-semibold">100% GENUINE AUTO CARE PRODUCTS TO KEEP YOUR VEHICLE IN TOP SHAPE.</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/shop">
            <Button
              variant="outline"
              size="sm"
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 border-none font-semibold"
            >
              START SHOPPING
            </Button>
          </Link>
          <button 
            onClick={() => setIsVisible(false)} 
            className="hover:opacity-70 transition-opacity"
            aria-label="Close top bar"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopBar;