import React from 'react';
import { ArrowDown } from 'lucide-react';
import { Property } from '../types';
import { motion } from 'motion/react';

interface HeroProps {
  properties: Property[];
  onOpenContactForm: () => void;
}

export default function Hero({ properties, onOpenContactForm }: HeroProps) {
  const selectedProperty = properties[0];

  const handleScrollToStays = () => {
    const staysSec = document.getElementById('stays');
    if (staysSec) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = staysSec.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <div id="hero-container" className="relative h-screen flex items-center justify-center overflow-hidden bg-brand-charcoal">
      {/* Immersive Background Image with Zoom & Dark Gradient */}
      <div className="absolute inset-0 z-0">
        <motion.img
          key={selectedProperty.id}
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.65 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          src={selectedProperty.bannerImage}
          alt={selectedProperty.name}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-cream via-brand-charcoal/40 to-brand-charcoal/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center text-white mt-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-center gap-2 mb-4"
        >
          <span className="h-[1px] w-8 bg-brand-gold" />
          <span className="font-sans text-[11px] uppercase tracking-[0.4em] text-brand-gold font-semibold">
            Zetland Sydney Luxury Living
          </span>
          <span className="h-[1px] w-8 bg-brand-gold" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-none mb-6"
        >
          Urban Elegance <br />
          <span className="font-serif italic text-brand-gold font-normal">Awaits</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl mx-auto font-sans text-sm sm:text-base text-brand-sand/95 font-light leading-relaxed mb-12"
        >
          Curated luxury apartments in Zetland, Sydney. Sophisticated interiors, spa-inspired bathrooms with soaking tubs, and prime location near galleries, cafes, and culture. Book directly and save.
        </motion.p>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col items-center gap-6 mt-8"
        >
          <button
            onClick={onOpenContactForm}
            className="bg-brand-gold text-brand-charcoal px-8 py-4 rounded font-sans text-xs uppercase tracking-widest font-bold hover:bg-white transition-all duration-300"
          >
            Inquire Now
          </button>
          <p className="text-brand-sand/80 text-sm max-w-md">
            Direct inquiries welcome. Experience luxury without the middleman.
          </p>
        </motion.div>
      </div>

      {/* Floating Scroll Indicator */}
      <button
        id="scroll-indicator"
        onClick={handleScrollToStays}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 cursor-pointer group text-brand-clay"
      >
        <span className="font-sans text-[9px] uppercase tracking-[0.4em] text-brand-sand/75 group-hover:text-brand-gold transition-colors">
          Explore Havens
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="p-1 rounded-full border border-brand-clay/30 group-hover:border-brand-gold transition-colors"
        >
          <ArrowDown size={14} className="text-brand-sand group-hover:text-brand-gold transition-colors" />
        </motion.div>
      </button>
    </div>
  );
}
