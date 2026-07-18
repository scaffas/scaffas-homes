import React, { useState } from 'react';
import { Property } from '../types';
import { ArrowRight, ChevronLeft, ChevronRight, Star, Check, Wifi, Sparkles, Sliders } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PropertiesProps {
  properties: Property[];
  onOpenContactForm: () => void;
}

export default function Properties({ properties, onOpenContactForm }: PropertiesProps) {
  // Store active image index for each property dynamically
  const [imageIndices, setImageIndices] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    properties.forEach((p) => {
      initial[p.id] = 0;
    });
    return initial;
  });

  const handleNextImage = (propertyId: string, maxImages: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setImageIndices((prev) => ({
      ...prev,
      [propertyId]: ((prev[propertyId] ?? 0) + 1) % maxImages
    }));
  };

  const handlePrevImage = (propertyId: string, maxImages: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setImageIndices((prev) => ({
      ...prev,
      [propertyId]: ((prev[propertyId] ?? 0) - 1 + maxImages) % maxImages
    }));
  };

  return (
    <section id="stays" className="py-24 bg-brand-cream border-t border-brand-sand/45">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-sans text-[11px] uppercase tracking-[0.3em] text-brand-gold font-bold block mb-3">
            Handcrafted Accommodations
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-brand-charcoal mb-4">
            Curated Private Sanctuaries
          </h2>
          <p className="font-sans text-sm text-brand-clay font-light leading-relaxed">
            Whether you crave serene minimalist retreats or vibrant cultural sanctuaries in Sydney's artistic heart, we have crafted the perfect escape from the everyday.
          </p>
        </div>

        {/* Properties Layout */}
        <div className="space-y-24">
          {properties.map((property, index) => {
            const currentImgIndex = imageIndices[property.id] || 0;
            const isEven = index % 2 === 0;

            return (
              <div
                key={property.id}
                id={`property-card-${property.id}`}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
              >
                {/* Image Gallery Column */}
                <div
                  className={`lg:col-span-7 relative rounded-lg overflow-hidden group shadow-xl bg-brand-charcoal aspect-[4/3] sm:aspect-[16/10] ${
                    isEven ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={`${property.id}-${currentImgIndex}`}
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      src={property.images[currentImgIndex]}
                      alt={`${property.name} angle ${currentImgIndex + 1}`}
                      className="w-full h-full object-cover select-none"
                      referrerPolicy="no-referrer"
                    />
                  </AnimatePresence>

                  {/* Star Rating Badge Overlay */}
                  <div className="absolute top-4 left-4 z-10 flex items-center gap-1 bg-brand-charcoal/90 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-sm border border-brand-clay/20">
                    <Star size={12} className="text-brand-gold fill-brand-gold" />
                    <span className="font-bold">{property.rating.toFixed(2)}</span>
                    <span className="text-brand-sand/70">({property.reviewCount} reviews)</span>
                  </div>

                  {/* Direct Booking Label */}
                  <div className="absolute bottom-4 left-4 z-10 flex flex-col bg-brand-charcoal/90 backdrop-blur-md text-white text-xs px-4 py-2.5 rounded-sm border border-brand-clay/20">
                    <span className="text-[9px] uppercase tracking-wider text-brand-sand/50">Direct Booking</span>
                    <span className="font-serif text-sm font-bold text-brand-gold">Inquire for Rates</span>
                  </div>

                  {/* Image Navigation Arrows */}
                  <button
                    onClick={(e) => handlePrevImage(property.id, property.images.length, e)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-brand-charcoal/70 hover:bg-brand-gold hover:text-brand-charcoal text-white transition-all duration-300 opacity-0 group-hover:opacity-100 z-10"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={(e) => handleNextImage(property.id, property.images.length, e)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-brand-charcoal/70 hover:bg-brand-gold hover:text-brand-charcoal text-white transition-all duration-300 opacity-0 group-hover:opacity-100 z-10"
                    aria-label="Next image"
                  >
                    <ChevronRight size={18} />
                  </button>

                  {/* Slider Progress Dots Overlay */}
                  <div className="absolute bottom-4 right-4 z-10 flex gap-1.5 bg-black/40 backdrop-blur-sm px-2.5 py-1.5 rounded-full">
                    {property.images.map((_, i) => (
                      <button
                        key={i}
                        onClick={(e) => {
                          e.stopPropagation();
                          setImageIndices((prev) => ({ ...prev, [property.id]: i }));
                        }}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          i === currentImgIndex ? 'w-4 bg-brand-gold' : 'w-1.5 bg-brand-sand/50 hover:bg-white'
                        }`}
                        aria-label={`Go to slide ${i + 1}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Details Column */}
                <div
                  className={`lg:col-span-5 flex flex-col justify-center ${
                    isEven ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <span className="font-serif text-brand-gold italic text-sm mb-1">
                    {property.tagline}
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-brand-charcoal tracking-tight mb-4">
                    {property.name}
                  </h3>

                  {/* Property Specs Indicators */}
                  <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-brand-clay font-medium uppercase tracking-wider mb-6 pb-6 border-b border-brand-sand">
                    <span>{property.specs.guests} guests</span>
                    <span className="text-brand-gold">•</span>
                    <span>{property.specs.bedrooms} bedroom{property.specs.bedrooms > 1 ? 's' : ''}</span>
                    <span className="text-brand-gold">•</span>
                    <span>{property.specs.beds} bed{property.specs.beds > 1 ? 's' : ''}</span>
                    <span className="text-brand-gold">•</span>
                    <span>{property.specs.bathrooms} bath{property.specs.bathrooms > 1 ? 's' : ''}</span>
                  </div>

                  <p className="font-sans text-sm text-brand-clay/90 font-light leading-relaxed mb-6">
                    {property.longDescription}
                  </p>

                  {/* Highlight Amenities */}
                  <div className="mb-8">
                    <span className="block text-[10px] uppercase tracking-wider text-brand-clay font-bold mb-3">
                      Sanctuary Highlights & Features:
                    </span>
                    <div className="grid grid-cols-2 gap-y-2 gap-x-4">
                      {property.amenities.slice(0, 6).map((amenity, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-brand-clay">
                          <div className="bg-brand-sand p-1 rounded-sm">
                            <Check size={10} className="text-brand-gold" />
                          </div>
                          <span>{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action CTA */}
                  <div className="flex items-center gap-6">
                    <button
                      onClick={onOpenContactForm}
                      className="px-6 py-3 bg-brand-charcoal text-white hover:bg-brand-gold hover:text-brand-charcoal text-xs uppercase tracking-widest font-semibold rounded-sm transition-all duration-300 shadow hover:shadow-lg flex items-center gap-2"
                    >
                      Inquire Now
                      <ArrowRight size={14} />
                    </button>
                    <div className="text-left">
                      <span className="block text-[9px] uppercase tracking-widest text-brand-clay/50 font-semibold leading-tight">Direct Booking</span>
                      <span className="text-xs text-brand-terracotta font-bold">Skip the Platforms</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
