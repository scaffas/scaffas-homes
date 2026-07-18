import React from 'react';
import { Mail, Phone, Heart } from 'lucide-react';

interface FooterProps {
  onOpenContactForm: () => void;
}

export default function Footer({ onOpenContactForm }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="app-footer" className="bg-brand-charcoal text-white pt-20 pb-8 border-t border-brand-clay/35">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 cursor-pointer select-none" onClick={handleScrollToTop}>
              <svg viewBox="0 0 100 100" className="w-8 h-8 text-brand-gold transition-transform duration-300 hover:scale-105" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M30 65 L30 40 L48 28 L57 36 L68 31 L68 65" />
                <path d="M30 65 L43 55 L48 28" />
                <path d="M40 50 L48 42 L57 50" />
                <path d="M43 56 L48 51 L57 58" />
                <path d="M46 69 L68 69" />
                <path d="M43 55 L46 69" />
              </svg>
              <div className="flex flex-col">
                <span className="font-serif text-lg font-bold tracking-[0.15em] text-brand-gold leading-none">
                  SCAFFAS HOMES
                </span>
                <span className="text-[7px] uppercase tracking-[0.25em] text-brand-sand opacity-80 mt-1">
                  CURATED STAYS
                </span>
              </div>
            </div>
            <p className="text-xs text-brand-sand/65 font-light leading-relaxed">
              Luxury Zetland apartments designed for sophisticated travelers. Experience urban elegance with direct booking and personalized service.
            </p>
          </div>

          {/* Direct Contact */}
          <div>
            <span className="block text-[10px] uppercase tracking-widest text-brand-gold font-bold mb-6">
              Direct Contact
            </span>
            <ul className="space-y-3.5 text-xs text-brand-sand/80 font-light">
              <li className="flex items-center gap-2.5">
                <Mail size={13} className="text-brand-gold shrink-0" />
                <a href="mailto:info@scaffashomes.com.au" className="hover:text-brand-gold transition-colors">
                  info@scaffashomes.com.au
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={13} className="text-brand-gold shrink-0" />
                <a href="tel:0478770197" className="hover:text-brand-gold transition-colors">
                  04 78770197
                </a>
              </li>
            </ul>
          </div>

          {/* Book Directly Block */}
          <div className="bg-brand-clay/20 border border-brand-clay/30 p-5 rounded">
            <span className="block text-[10px] uppercase tracking-widest text-brand-gold font-bold mb-2">
              Book Directly
            </span>
            <div className="flex flex-col gap-3">
              <a
                href="https://www.airbnb.com.au/rooms/1704169458785493215"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-brand-sand/85 font-light leading-relaxed hover:text-brand-gold transition-colors"
              >
                View on Airbnb →
              </a>
              <button
                onClick={onOpenContactForm}
                className="flex items-center justify-center gap-2 w-full py-2 bg-brand-charcoal hover:bg-brand-gold text-brand-sand hover:text-brand-charcoal text-[10px] uppercase tracking-widest font-bold border border-brand-gold/45 rounded-sm transition-all"
              >
                Inquire Now
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-brand-clay/30 pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-brand-sand/55 font-light">
          <div className="flex items-center gap-1">
            <span>© {currentYear} SCAFFAS HOMES. All rights reserved. Made with</span>
            <Heart size={10} className="text-brand-gold fill-brand-gold animate-pulse" />
            <span>for direct travelers.</span>
          </div>
          <div className="flex gap-6 mt-4 sm:mt-0 text-[10px] uppercase tracking-wider font-semibold">
            <a href="#app-footer" className="hover:text-brand-gold">Terms of Service</a>
            <a href="#app-footer" className="hover:text-brand-gold">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
