import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Properties from './components/Properties';
import Gallery from './components/Gallery';
import Footer from './components/Footer';
import ContactFormModal from './components/ContactFormModal';
import { INITIAL_PROPERTIES } from './data';

export default function App() {
  const singleProperty = INITIAL_PROPERTIES.slice(0, 1);
  const [showContactForm, setShowContactForm] = useState(false);

  return (
    <div id="app-root" className="min-h-screen bg-brand-cream text-brand-charcoal antialiased">
      <Navbar onOpenContactForm={() => setShowContactForm(true)} />

      <main id="main-content">
        <Hero properties={singleProperty} onOpenContactForm={() => setShowContactForm(true)} />

        <Properties properties={singleProperty} onOpenContactForm={() => setShowContactForm(true)} />

        <Gallery />
      </main>

      <Footer onOpenContactForm={() => setShowContactForm(true)} />

      <ContactFormModal isOpen={showContactForm} onClose={() => setShowContactForm(false)} />
    </div>
  );
}
