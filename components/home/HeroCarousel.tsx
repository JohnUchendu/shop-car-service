"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const slides = [
  {
    id: 1,
    title: "MEGA SALE",
    subtitle: "AUTO CARE PRODUCTS",
    cta: "GET DEALS",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64",
    gradient: "from-primary/90 to-primary/70",
    href: "/shop?category=auto-care",
  },
  {
    id: 2,
    title: "READY FOR",
    subtitle: "A CLEAN CAR?",
    cta: "GET DEALS",
    image: "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f",
    gradient: "from-nav/90 to-nav/70",
    href: "/shop?category=cleaning",
  },
  {
    id: 3,
    title: "PROFESSIONAL",
    subtitle: "DETAILING SERVICES",
    cta: "GET DEALS",
    image: "https://images.unsplash.com/photo-1507136566006-cfc505b114fc",
    gradient: "from-primary/90 to-primary/70",
    href: "/services",
  },
];

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Memoized navigation functions
  const goToPrev = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  const goToNext = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  // Auto-rotate with pause on hover/interaction
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      goToNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused, goToNext]);

  // Pause auto-rotate on hover
  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  // Accessibility: Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        goToPrev();
      } else if (e.key === "ArrowRight") {
        goToNext();
      } else if (e.key >= "1" && e.key <= slides.length.toString()) {
        const index = parseInt(e.key) - 1;
        if (index < slides.length) {
          setCurrentSlide(index);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToPrev, goToNext]);

  return (
    <div 
      className="relative h-[300px] md:h-[400px] lg:h-[480px] overflow-hidden rounded-lg"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="region"
      aria-label="Hero carousel"
    >
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            index === currentSlide 
              ? "opacity-100 z-10" 
              : "opacity-0 z-0 pointer-events-none"
          }`}
          role="group"
          aria-roledescription="slide"
          aria-label={`Slide ${index + 1} of ${slides.length}`}
          aria-hidden={index !== currentSlide}
        >
          {/* Next.js Image component with optimization */}
          <div className="absolute inset-0">
            <Image
              src={`${slide.image}?w=1200&h=600&fit=crop`}
              alt={`${slide.title} - ${slide.subtitle}`}
              fill
              priority={index === 0}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
              className="object-cover"
            />
          </div>
          
          {/* Gradient overlay */}
          <div 
            className={`absolute inset-0 bg-gradient-to-r ${slide.gradient}`} 
            aria-hidden="true"
          />
          
          {/* Content */}
          <div className="relative h-full flex flex-col items-center justify-center text-center text-primary-foreground p-6 z-20">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold mb-2 text-shadow">
              {slide.title}
            </h2>
            <p className="text-xl md:text-2xl lg:text-3xl font-heading font-semibold mb-4">
              {slide.subtitle}
            </p>
            <div className="text-4xl md:text-5xl lg:text-7xl font-heading font-extrabold mb-2">
              {slide.cta}
            </div>
            <Link href={slide.href}>
              <Button
                variant="outline"
                className="mt-4 bg-transparent border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary font-semibold px-8 py-6 text-lg transition-all duration-300 hover:scale-105"
                aria-label={`Shop ${slide.subtitle}`}
              >
                Shop Now
              </Button>
            </Link>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={goToPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/30 hover:bg-background/60 backdrop-blur-sm p-3 rounded-full transition-all duration-300 z-30 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary-foreground"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6 text-primary-foreground" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/30 hover:bg-background/60 backdrop-blur-sm p-3 rounded-full transition-all duration-300 z-30 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary-foreground"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6 text-primary-foreground" />
      </button>

      {/* Slide Indicators */}
      <div 
        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-30"
        role="tablist"
        aria-label="Slide indicators"
      >
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? "bg-primary-foreground scale-125" 
                : "bg-primary-foreground/40 hover:bg-primary-foreground/70"
            }`}
            role="tab"
            aria-selected={index === currentSlide}
            aria-label={`Go to slide ${index + 1}`}
            aria-controls={`slide-${slide.id}`}
          />
        ))}
      </div>

      {/* Slide counter */}
      <div 
        className="absolute bottom-4 right-4 bg-background/30 backdrop-blur-sm text-primary-foreground text-sm font-medium px-3 py-1 rounded-full z-30"
        aria-live="polite"
        aria-atomic="true"
      >
        {currentSlide + 1} / {slides.length}
      </div>

      {/* Pause indicator */}
      {isPaused && (
        <div 
          className="absolute top-4 right-4 bg-background/30 backdrop-blur-sm text-primary-foreground text-xs px-2 py-1 rounded z-30"
          role="status"
        >
          Paused
        </div>
      )}
    </div>
  );
};

export default HeroCarousel;