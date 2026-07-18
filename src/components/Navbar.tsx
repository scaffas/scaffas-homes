import React, { useState, useEffect } from 'react';
import { Home, Image as ImageIcon } from 'lucide-react';
import { motion } from 'motion/react';

interface NavbarProps {
  onOpenContactForm: () => void;
}

export default function Navbar({ onOpenContactForm }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const menuItems = [
    { label: 'Stays', icon: Home, id: 'stays' },
    { label: 'Gallery', icon: ImageIcon, id: 'gallery' }
  ];

  return (
    <header
      id="navbar-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-brand-forest/95 backdrop-blur-md shadow-lg py-3 text-white'
          : 'bg-gradient-to-b from-brand-forest/80 to-transparent py-5 text-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div
            id="nav-logo"
            className="flex items-center gap-3 cursor-pointer select-none"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            {/* Inline SVG rendering of Scaffas Homes geometric house logo */}
            <svg viewBox="0 0 100 100" className="w-8 h-8 sm:w-9 sm:h-9 text-brand-gold transition-transform duration-300 hover:scale-105" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M30 65 L30 40 L48 28 L57 36 L68 31 L68 65" />
              <path d="M30 65 L43 55 L48 28" />
              <path d="M40 50 L48 42 L57 50" />
              <path d="M43 56 L48 51 L57 58" />
              <path d="M46 69 L68 69" />
              <path d="M43 55 L46 69" />
            </svg>
            <div className="flex flex-col">
              <span className="font-serif text-base sm:text-lg font-bold tracking-[0.15em] text-brand-gold leading-none">
                SCAFFAS HOMES
              </span>
              <span className="text-[7px] sm:text-[8px] uppercase tracking-[0.25em] text-brand-sand opacity-80 mt-1">
                CURATED STAYS
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav id="desktop-nav" className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={() => scrollToSection(item.id)}
                className="font-sans text-xs uppercase tracking-widest hover:text-brand-gold transition-colors duration-300 relative group py-2"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-gold transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </nav>

          {/* Utility Buttons */}
          <div id="nav-utilities" className="hidden md:flex items-center space-x-4">
            <button
              onClick={onOpenContactForm}
              className="px-5 py-2.5 rounded-sm bg-brand-gold text-brand-forest text-xs uppercase tracking-widest font-semibold hover:bg-white hover:text-brand-forest transition-all duration-300 shadow-sm hover:shadow"
            >
              Inquire Now
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div id="mobile-menu-trigger" className="md:hidden flex items-center gap-3">
            <button
              id="mobile-hamburger"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-brand-sand hover:text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              <div className="space-y-1.5">
                <span className={`block h-0.5 w-6 bg-current transform transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <span className={`block h-0.5 w-6 bg-current transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`} />
                <span className={`block h-0.5 w-6 bg-current transform transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <motion.div
          id="mobile-nav-drawer"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden bg-brand-forest border-b border-brand-clay/30 shadow-xl"
        >
          <div className="px-4 pt-2 pb-6 space-y-3">
            {menuItems.map((item) => (
              <button
                key={item.id}
                id={`mobile-link-${item.id}`}
                onClick={() => scrollToSection(item.id)}
                className="flex items-center gap-3 w-full px-4 py-3 font-sans text-xs uppercase tracking-widest text-brand-sand hover:text-white hover:bg-brand-darkforest rounded transition-colors"
              >
                <item.icon size={16} className="text-brand-gold" />
                {item.label}
              </button>
            ))}
            <div className="pt-4 border-t border-brand-clay/30 px-4 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenContactForm();
                }}
                className="w-full py-3 rounded bg-brand-gold text-brand-forest text-xs uppercase tracking-widest font-semibold text-center hover:bg-white transition-colors"
              >
                Inquire Now
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </header>
  );
}
