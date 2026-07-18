import React, { useState } from 'react';
import { LOCAL_RECOMMENDATIONS } from '../data';
import { Recommendation } from '../types';
import { Coffee, Map, Compass, Star, MapPin, Search, ChevronDown, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function LocalGuide() {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [copiedAddressId, setCopiedAddressId] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All Picks', icon: MapPin },
    { id: 'dining', label: 'Coffee & Dining', icon: Coffee },
    { id: 'nature', label: 'Nature & Parks', icon: Compass },
    { id: 'culture', label: 'Local Culture', icon: Map },
  ];

  const filteredRecs = activeTab === 'all'
    ? LOCAL_RECOMMENDATIONS
    : LOCAL_RECOMMENDATIONS.filter(item => item.category === activeTab);

  const copyAddress = (address: string, id: string) => {
    navigator.clipboard.writeText(address);
    setCopiedAddressId(id);
    setTimeout(() => setCopiedAddressId(null), 2500);
  };

  return (
    <section id="guide" className="py-24 bg-brand-sand/35 border-t border-brand-sand">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-sans text-[11px] uppercase tracking-[0.3em] text-brand-gold font-bold block mb-3">
            Handpicked Experiences
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-brand-charcoal mb-4">
            Our Neighborhood Playbook
          </h2>
          <p className="font-sans text-sm text-brand-clay font-light leading-relaxed">
            Avoid the standard tourist traps. These are our personal, highly curated favorite spots located right around your boutique stays.
          </p>
        </div>

        {/* Tab Selectors */}
        <div className="flex justify-center flex-wrap gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              id={`tab-${cat.id}`}
              onClick={() => setActiveTab(cat.id)}
              className={`flex items-center gap-2 px-5 py-3 rounded text-xs uppercase tracking-wider font-semibold border transition-all cursor-pointer ${
                activeTab === cat.id
                  ? 'bg-brand-charcoal text-white border-brand-charcoal shadow-md'
                  : 'bg-white text-brand-clay border-brand-sand hover:bg-brand-sand/20'
              }`}
            >
              <cat.icon size={14} className={activeTab === cat.id ? 'text-brand-gold' : 'text-brand-clay/70'} />
              {cat.label}
            </button>
          ))}
        </div>

        {/* Recommendations Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredRecs.map((rec) => (
              <motion.div
                key={rec.id}
                id={`rec-card-${rec.id}`}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="bg-white border border-brand-sand/70 rounded overflow-hidden flex flex-col justify-between group shadow-sm hover:shadow-xl transition-shadow"
              >
                {/* Photo Header */}
                <div className="relative aspect-[16/10] overflow-hidden bg-brand-charcoal">
                  <img
                    src={rec.image}
                    alt={rec.name}
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  {/* Distance badge overlay */}
                  <div className="absolute top-4 right-4 bg-brand-charcoal/90 backdrop-blur-md text-white text-[10px] font-bold uppercase px-3 py-1.5 rounded-sm border border-brand-clay/20">
                    {rec.distance}
                  </div>
                  {/* Category overlay */}
                  <div className="absolute bottom-4 left-4 bg-brand-gold text-brand-charcoal text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded">
                    {rec.category}
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex justify-between items-baseline gap-2">
                      <h4 className="font-serif text-lg font-bold text-brand-charcoal tracking-tight group-hover:text-brand-gold transition-colors">
                        {rec.name}
                      </h4>
                      {/* Rating */}
                      <div className="flex items-center gap-1 text-xs shrink-0 font-bold text-brand-charcoal">
                        <Star size={12} className="text-brand-gold fill-brand-gold" />
                        <span>{rec.rating}</span>
                      </div>
                    </div>

                    <p className="font-sans text-xs text-brand-clay/90 font-light leading-relaxed">
                      {rec.description}
                    </p>
                  </div>

                  {/* Address and Copy action */}
                  <div className="mt-6 pt-4 border-t border-brand-sand/50 flex items-center justify-between gap-4 text-xs">
                    <div className="flex items-center gap-1.5 text-brand-clay/85 overflow-hidden">
                      <MapPin size={12} className="text-brand-gold shrink-0" />
                      <span className="truncate">{rec.address}</span>
                    </div>
                    <button
                      id={`copy-address-${rec.id}`}
                      onClick={() => copyAddress(rec.address, rec.id)}
                      className={`shrink-0 font-sans text-[10px] uppercase tracking-wider font-bold py-1 px-2.5 rounded transition-colors ${
                        copiedAddressId === rec.id
                          ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                          : 'bg-brand-sand text-brand-clay hover:bg-brand-charcoal hover:text-white'
                      }`}
                    >
                      {copiedAddressId === rec.id ? (
                        <span className="flex items-center gap-1">
                          <Check size={10} />
                          Copied
                        </span>
                      ) : (
                        'Copy Address'
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
