"use client";

import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface CategoryCardProps {
  id?: number;
  name: string;
  image: string;
  slug?: string;
  productCount?: number;
}

const CategoryCard = ({ 
  name, 
  image, 
  slug, 
  productCount = 0 
}: CategoryCardProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  const fallbackImage = "https://images.unsplash.com/photo-1599839575945-a9e5af0c4fa5?w=300&h=200&fit=crop&q=80";

  return (
    <div 
      className="group relative bg-card border border-border rounded-lg p-4 hover:shadow-lg transition-all duration-300 hover:border-primary/30 hover:shadow-medium cursor-pointer overflow-hidden"
      role="button"
      tabIndex={0}
      aria-label={`Browse ${name} category`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          console.log(`Navigate to ${slug || name.toLowerCase()}`);
          // In real app: router.push(`/shop?category=${slug}`)
        }
      }}
    >
      {/* Decorative background element */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Shop now link */}
      <div className="flex items-center gap-2 text-primary text-sm font-medium mb-2 relative z-10">
        <span className="group-hover:underline">Shop now</span>
        <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" 
          aria-hidden="true"
        />
      </div>

      {/* Category name */}
      <h3 className="font-heading font-bold text-foreground mb-3 relative z-10 group-hover:text-primary transition-colors duration-300">
        {name}
      </h3>

      {/* Product count badge (optional) */}
      {productCount > 0 && (
        <div className="absolute top-4 right-4 bg-primary/10 text-primary text-xs font-medium px-2 py-1 rounded-full z-10">
          {productCount}+ products
        </div>
      )}

      {/* Image container */}
      <div className="h-24 flex items-center justify-center relative">
        {/* Loading skeleton */}
        {isLoading && !imageError && (
          <div className="absolute inset-0 bg-muted animate-pulse rounded" />
        )}

        {/* Error fallback */}
        {imageError && (
          <div className="absolute inset-0 bg-muted flex items-center justify-center rounded">
            <div className="text-muted-foreground text-sm">No image</div>
          </div>
        )}

        {/* Next.js Image component */}
        <Image
          src={imageError ? fallbackImage : image}
          alt={`${name} category products`}
          width={120}
          height={96}
          className={`
            max-h-full w-auto object-contain relative z-10
            transition-all duration-500 ease-out
            ${isLoading ? 'opacity-0 scale-95' : 'opacity-100'}
            group-hover:scale-110 group-hover:rotate-1
          `}
          loading="lazy"
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false);
            setImageError(true);
          }}
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 120px"
          quality={85}
        />

        {/* Hover overlay effect */}
        <div 
          className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
          aria-hidden="true"
        />
      </div>

      {/* Hover indicator (subtle bottom border) */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-8 bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
};

export default CategoryCard;