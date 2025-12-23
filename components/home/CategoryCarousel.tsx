"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useRef, useEffect, useCallback } from "react";
import CategoryCard from "./CategoryCard";
import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    id: 1,
    name: "Engine Oils",
    image: "https://images.unsplash.com/photo-1635773054018-32a55bc1d157",
    slug: "engine-oils",
  },
  {
    id: 2,
    name: "Paint & Body",
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e",
    slug: "paint-body",
  },
  {
    id: 3,
    name: "Cleaning Products",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf",
    slug: "cleaning-products",
  },
  {
    id: 4,
    name: "Auto Care",
    image: "https://images.unsplash.com/photo-1607860108855-64acf2078ed9",
    slug: "auto-care",
  },
  {
    id: 5,
    name: "Detailing",
    image: "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f",
    slug: "detailing",
  },
  {
    id: 6,
    name: "Accessories",
    image: "https://images.unsplash.com/photo-1489824904134-891ab64532f1",
    slug: "accessories",
  },
  {
    id: 7,
    name: "Car Polish",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64",
    slug: "car-polish",
  },
  {
    id: 8,
    name: "Interior Care",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70",
    slug: "interior-care",
  },
];

const CategoryCarousel = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout>();

  // Calculate scroll amount based on container width
  const getScrollAmount = useCallback(() => {
    if (scrollRef.current) {
      const cardWidth = 200; // Minimum card width
      const gap = 16; // gap-4 = 1rem = 16px
      return (cardWidth + gap) * 2; // Scroll 2 cards at a time
    }
    return 300;
  }, []);

  const scroll = useCallback((direction: "left" | "right") => {
    if (!scrollRef.current || isScrolling) return;

    setIsScrolling(true);
    const scrollAmount = getScrollAmount();
    const newScrollLeft =
      direction === "left"
        ? scrollRef.current.scrollLeft - scrollAmount
        : scrollRef.current.scrollLeft + scrollAmount;
    
    scrollRef.current.scrollTo({ 
      left: newScrollLeft, 
      behavior: "smooth" 
    });

    // Reset scrolling flag after animation
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    scrollTimeoutRef.current = setTimeout(() => {
      setIsScrolling(false);
    }, 300);
  }, [getScrollAmount, isScrolling]);

  const handleScroll = useCallback(() => {
    if (!scrollRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    const tolerance = 10; // Small tolerance for rounding
    
    setCanScrollLeft(scrollLeft > tolerance);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - tolerance);
  }, []);

  // Initialize scroll state on mount
  useEffect(() => {
    handleScroll();
    
    // Cleanup timeout on unmount
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [handleScroll]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" && canScrollLeft) {
        scroll("left");
      } else if (e.key === "ArrowRight" && canScrollRight) {
        scroll("right");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [canScrollLeft, canScrollRight, scroll]);

  // Touch/swipe support
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75 && canScrollRight) {
      // Swipe left
      scroll("right");
    } else if (touchEnd - touchStart > 75 && canScrollLeft) {
      // Swipe right
      scroll("left");
    }
  };

  // View all categories link
  const handleViewAll = () => {
    // Smooth scroll to categories section or navigate
    console.log("View all categories");
    // Or navigate: router.push('/categories');
  };

  return (
    <section 
      className="py-8"
      aria-label="Featured categories carousel"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-heading font-bold">
            Featured Categories
          </h2>
          <p className="text-muted-foreground text-sm mt-1">
            Browse our wide range of auto care products
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <Link 
            href="/categories" 
            className="text-primary hover:text-primary/80 font-medium text-sm hidden md:block transition-colors"
          >
            View All Categories →
          </Link>
          
          <div className="flex gap-2">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft || isScrolling}
              className={`p-2 rounded-full border border-border transition-all duration-200 ${
                canScrollLeft && !isScrolling
                  ? "hover:bg-secondary hover:border-input hover:scale-105 active:scale-95"
                  : "opacity-40 cursor-not-allowed"
              }`}
              aria-label="Scroll left"
              aria-disabled={!canScrollLeft}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight || isScrolling}
              className={`p-2 rounded-full border border-border transition-all duration-200 ${
                canScrollRight && !isScrolling
                  ? "hover:bg-secondary hover:border-input hover:scale-105 active:scale-95"
                  : "opacity-40 cursor-not-allowed"
              }`}
              aria-label="Scroll right"
              aria-disabled={!canScrollRight}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={scrollRef}
        onScroll={handleScroll}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4"
        style={{ 
          scrollbarWidth: "none", 
          msOverflowStyle: "none",
          scrollBehavior: "smooth",
          WebkitOverflowScrolling: "touch",
        }}
        role="region"
        aria-label="Categories list"
        tabIndex={0}
      >
        {categories.map((category) => (
          <Link 
            key={category.id}
            href={`/shop?category=${category.slug}`}
            className="min-w-[180px] md:min-w-[200px] transition-transform duration-300 hover:scale-[1.02] active:scale-95"
            aria-label={`Browse ${category.name}`}
          >
            <CategoryCard 
              {...category} 
              image={`${category.image}?w=300&h=200&fit=crop`}
            />
          </Link>
        ))}
      </div>

      {/* Mobile view all button */}
      <div className="mt-6 md:hidden text-center">
        <button
          onClick={handleViewAll}
          className="text-primary hover:text-primary/80 font-medium text-sm transition-colors"
        >
          View All Categories →
        </button>
      </div>

      {/* Scroll position indicator (optional) */}
      <div className="flex justify-center gap-1 mt-4">
        {categories.slice(0, 4).map((_, index) => (
          <div 
            key={index}
            className={`h-1 rounded-full transition-all duration-300 ${
              canScrollLeft && index === 0 
                ? "w-6 bg-primary/60" 
                : canScrollRight && index === 3
                ? "w-6 bg-primary/60"
                : "w-2 bg-border"
            }`}
            aria-hidden="true"
          />
        ))}
      </div>
    </section>
  );
};

export default CategoryCarousel;