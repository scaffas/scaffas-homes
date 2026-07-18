import React, { useState, useEffect } from 'react';
import { GALLERY_ITEMS } from '../data';
import { GalleryItem } from '../types';
import { Maximize2, X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [carouselIndex, setCarouselIndex] = useState<number>(0);

  // Filter gallery items based on active category
  const filteredItems = activeFilter === 'All'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.category === activeFilter);

  // Navigate lightbox images
  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedImage) return;
    const currentIndex = filteredItems.findIndex(item => item.id === selectedImage.id);
    const prevIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
    setSelectedImage(filteredItems[prevIndex]);
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedImage) return;
    const currentIndex = filteredItems.findIndex(item => item.id === selectedImage.id);
    const nextIndex = (currentIndex + 1) % filteredItems.length;
    setSelectedImage(filteredItems[nextIndex]);
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedImage) return;
      if (e.key === 'Escape') setSelectedImage(null);
      if (e.key === 'ArrowLeft') {
        const currentIndex = filteredItems.findIndex(item => item.id === selectedImage.id);
        const prevIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
        setSelectedImage(filteredItems[prevIndex]);
      }
      if (e.key === 'ArrowRight') {
        const currentIndex = filteredItems.findIndex(item => item.id === selectedImage.id);
        const nextIndex = (currentIndex + 1) % filteredItems.length;
        setSelectedImage(filteredItems[nextIndex]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, filteredItems]);

  const categories = ['All'];

  return (
    <section id="gallery" className="py-24 bg-brand-cream border-t border-brand-sand">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="max-w-xl mb-6 md:mb-0">
            <span className="font-sans text-[11px] uppercase tracking-[0.3em] text-brand-gold font-bold block mb-3">
              Photo Gallery
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-brand-charcoal">
              Tour Our Apartments
            </h2>
          </div>

          {/* Filtering Tabs */}
          <div className="flex flex-wrap gap-1.5 border-b border-brand-sand pb-2 md:border-b-0 md:pb-0">
            {categories.map((category) => (
              <button
                key={category}
                id={`filter-${category.toLowerCase()}`}
                onClick={() => setActiveFilter(category)}
                className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded transition-all cursor-pointer ${
                  activeFilter === category
                    ? 'bg-brand-gold text-white shadow-sm'
                    : 'text-brand-clay hover:text-brand-charcoal hover:bg-brand-sand/30'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Carousel */}
        <div className="relative w-full max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            {filteredItems.length > 0 && (
              <motion.div
                key={filteredItems[carouselIndex]?.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="relative w-full aspect-[4/3] rounded-lg overflow-hidden shadow-2xl bg-brand-charcoal group cursor-pointer"
                onClick={() => setSelectedImage(filteredItems[carouselIndex])}
              >
                <img
                  src={filteredItems[carouselIndex]?.url}
                  alt={filteredItems[carouselIndex]?.alt}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />

                {/* Overlay with Info */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal via-brand-charcoal/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <span className="text-[10px] uppercase tracking-widest text-brand-gold font-bold mb-2">
                    Featured
                  </span>
                  <h4 className="font-serif text-white text-2xl font-bold leading-tight mb-3">
                    {filteredItems[carouselIndex]?.title}
                  </h4>
                  <div className="flex items-center gap-2 text-brand-sand text-sm">
                    <Maximize2 size={14} className="text-brand-gold" />
                    <span>Click to view full size</span>
                  </div>
                </div>

                {/* Zoom Icon */}
                <div className="absolute top-4 right-4 bg-brand-charcoal/70 p-2 rounded-full text-white">
                  <ZoomIn size={18} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Arrows */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setCarouselIndex((prevIndex) => (prevIndex - 1 + filteredItems.length) % filteredItems.length);
            }}
            className="absolute -left-12 sm:left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-brand-gold hover:bg-white text-brand-charcoal transition-all shadow-lg z-20"
            aria-label="Previous image"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setCarouselIndex((prevIndex) => (prevIndex + 1) % filteredItems.length);
            }}
            className="absolute -right-12 sm:right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-brand-gold hover:bg-white text-brand-charcoal transition-all shadow-lg z-20"
            aria-label="Next image"
          >
            <ChevronRight size={24} />
          </button>

          {/* Image Counter & Dots */}
          <div className="flex justify-center items-center gap-4 mt-6">
            <span className="text-xs text-brand-clay uppercase tracking-widest font-bold">
              {carouselIndex + 1} / {filteredItems.length}
            </span>
            <div className="flex gap-2">
              {filteredItems.slice(0, 10).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCarouselIndex(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === carouselIndex ? 'w-6 bg-brand-gold' : 'w-2 bg-brand-sand/30 hover:bg-brand-sand/50'
                  }`}
                  aria-label={`Go to image ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <div
            id="gallery-lightbox"
            className="fixed inset-0 z-50 flex flex-col justify-between p-4 sm:p-6 bg-brand-charcoal/98 backdrop-blur-md text-white select-none"
            onClick={() => setSelectedImage(null)}
          >
            {/* Top Bar */}
            <div className="flex justify-between items-center z-10">
              <div className="text-left">
                <span className="text-[10px] uppercase tracking-widest text-brand-gold font-bold">
                  {selectedImage.category}
                </span>
                <h3 className="font-serif text-base sm:text-lg font-bold text-brand-sand">
                  {selectedImage.title}
                </h3>
              </div>
              <button
                id="close-lightbox"
                onClick={() => setSelectedImage(null)}
                className="p-2.5 rounded-full bg-brand-clay/20 hover:bg-brand-gold hover:text-brand-charcoal text-white transition-all"
                aria-label="Close Lightbox"
              >
                <X size={18} />
              </button>
            </div>

            {/* Main Stage */}
            <div className="flex-1 flex items-center justify-center relative my-4">
              {/* Previous Button */}
              <button
                id="lightbox-prev"
                onClick={handlePrevImage}
                className="absolute left-2 sm:left-4 p-3 rounded-full bg-brand-clay/20 hover:bg-brand-gold hover:text-brand-charcoal text-white transition-all z-10"
                aria-label="Previous image"
              >
                <ChevronLeft size={20} />
              </button>

              {/* Central Image container */}
              <div className="max-w-5xl max-h-[70vh] relative" onClick={(e) => e.stopPropagation()}>
                <motion.img
                  key={selectedImage.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  src={selectedImage.url}
                  alt={selectedImage.alt}
                  className="max-w-full max-h-[70vh] object-contain rounded shadow-2xl border border-brand-clay/20"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Next Button */}
              <button
                id="lightbox-next"
                onClick={handleNextImage}
                className="absolute right-2 sm:right-4 p-3 rounded-full bg-brand-clay/20 hover:bg-brand-gold hover:text-brand-charcoal text-white transition-all z-10"
                aria-label="Next image"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            {/* Bottom Info Bar */}
            <div className="text-center z-10 border-t border-brand-clay/20 pt-4 flex flex-col sm:flex-row justify-between items-center max-w-5xl mx-auto w-full text-xs text-brand-sand/75">
              <span>{selectedImage.alt}</span>
              <span className="font-mono mt-2 sm:mt-0 bg-brand-clay/30 px-3 py-1 rounded-full">
                {filteredItems.findIndex(item => item.id === selectedImage.id) + 1} / {filteredItems.length}
              </span>
            </div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
