import React from 'react';
import { REVIEWS } from '../data';
import { Star, MessageSquareQuote } from 'lucide-react';

export default function Reviews() {
  return (
    <section id="reviews" className="py-24 bg-brand-cream border-t border-brand-sand">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-sans text-[11px] uppercase tracking-[0.3em] text-brand-gold font-bold block mb-3">
            What Our Guests Cherish
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-brand-charcoal mb-4">
            Guest Testimonials
          </h2>
          <p className="font-sans text-sm text-brand-clay font-light leading-relaxed">
            Our priority is to create pristine, thoughtful, and memorable accommodations. Here is what some of our recent direct-booking travelers have to say.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REVIEWS.map((review) => (
            <div
              key={review.id}
              id={`review-card-${review.id}`}
              className="bg-white border border-brand-sand/70 p-8 rounded shadow-sm hover:shadow-md transition-shadow relative flex flex-col justify-between"
            >
              <div className="absolute top-6 right-6 text-brand-sand/70">
                <MessageSquareQuote size={32} />
              </div>

              <div className="space-y-4">
                {/* Stars */}
                <div className="flex gap-0.5">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} size={14} className="text-brand-gold fill-brand-gold" />
                  ))}
                </div>

                <p className="font-sans text-xs sm:text-sm text-brand-clay/95 italic leading-relaxed">
                  "{review.comment}"
                </p>
              </div>

              {/* Author Info */}
              <div className="mt-8 flex items-center gap-3.5 pt-4 border-t border-brand-sand/50">
                <img
                  src={review.authorAvatar}
                  alt={review.authorName}
                  className="w-10 h-10 rounded-full object-cover border border-brand-sand select-none"
                  referrerPolicy="no-referrer"
                />
                <div className="text-left text-xs">
                  <span className="block font-bold text-brand-charcoal">{review.authorName}</span>
                  <span className="text-brand-clay/70 text-[10px] uppercase font-semibold block tracking-wide mt-0.5">
                    Stayed {review.stayDate}
                  </span>
                  <span className="text-brand-gold font-serif text-[10px] italic">
                    {review.propertyName}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
