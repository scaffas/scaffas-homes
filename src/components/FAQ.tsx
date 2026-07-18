import React, { useState } from 'react';
import { FAQS } from '../data';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function FAQ() {
  const [openFaqId, setOpenFaqId] = useState<string | null>(null);

  const toggleFaq = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  return (
    <section id="faq-section" className="py-24 bg-brand-sand/35 border-t border-brand-sand">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="font-sans text-[11px] uppercase tracking-[0.3em] text-brand-gold font-bold block mb-3">
            Clear Answers
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-brand-charcoal mb-4">
            Frequently Asked Questions
          </h2>
          <p className="font-sans text-sm text-brand-clay font-light">
            Everything you need to know about preparing for your direct boutique stay with us.
          </p>
        </div>

        {/* FAQs Accordion */}
        <div className="space-y-4">
          {FAQS.map((faq) => {
            const isOpen = openFaqId === faq.id;

            return (
              <div
                key={faq.id}
                id={`faq-item-${faq.id}`}
                className="bg-white border border-brand-sand/70 rounded overflow-hidden shadow-sm transition-all"
              >
                {/* Header Toggle */}
                <button
                  id={`faq-toggle-${faq.id}`}
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full px-6 py-5 flex justify-between items-center text-left gap-4 hover:bg-brand-sand/10 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle size={16} className="text-brand-gold shrink-0" />
                    <span className="font-serif font-bold text-sm sm:text-base text-brand-charcoal">
                      {faq.question}
                    </span>
                  </div>
                  <ChevronDown
                    size={16}
                    className={`text-brand-clay transition-transform duration-300 ${isOpen ? 'rotate-180 text-brand-gold' : ''}`}
                  />
                </button>

                {/* Answer Content */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-6 text-xs sm:text-sm text-brand-clay/90 leading-relaxed font-light border-t border-brand-sand/40 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
