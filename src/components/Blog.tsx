import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, User, Clock, ArrowRight, X, ChevronRight, BookOpen } from 'lucide-react';
import { BLOG_POSTS } from '../data';
import { BlogPost } from '../types';

export default function Blog() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(BLOG_POSTS.map(post => post.category)))];

  const filteredPosts = selectedCategory === 'All'
    ? BLOG_POSTS
    : BLOG_POSTS.filter(post => post.category === selectedCategory);

  return (
    <section id="blog-section" className="py-24 bg-brand-cream relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-brand-forest/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-brand-gold font-semibold block mb-3">
            SCAFFAS HOMES JOURNAL
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-semibold text-brand-charcoal mb-6 tracking-tight">
            Curated Living & Architectural Journeys
          </h2>
          <div className="h-[1px] w-20 bg-brand-gold/50 mx-auto mb-6" />
          <p className="font-sans text-brand-clay leading-relaxed">
            Explore our design ethos, essays on local slow travel, interior styling tips, and the quiet philosophy of building homes that exist in absolute harmony with nature.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2 rounded-full text-xs uppercase tracking-wider transition-all duration-300 border ${
                selectedCategory === category
                  ? 'bg-brand-forest border-brand-forest text-white font-medium shadow-md'
                  : 'bg-white/80 backdrop-blur-sm border-brand-sand text-brand-clay hover:border-brand-forest/40 hover:text-brand-forest'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredPosts.map((post, idx) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group bg-white rounded-lg border border-brand-sand/60 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col h-full"
            >
              {/* Image Container */}
              <div className="relative aspect-[16/10] overflow-hidden bg-brand-sand">
                <img
                  src={post.image}
                  alt={post.title}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3.5 py-1.5 rounded-sm bg-brand-forest text-white text-[10px] font-semibold uppercase tracking-widest">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Text Area */}
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center gap-4 text-xs text-brand-clay/80 mb-4 font-mono">
                  <span className="flex items-center gap-1">
                    <Calendar size={13} className="text-brand-gold" />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={13} className="text-brand-gold" />
                    {post.readTime}
                  </span>
                </div>

                <h3 className="font-serif text-xl font-semibold text-brand-charcoal mb-4 group-hover:text-brand-forest transition-colors duration-300 leading-snug">
                  {post.title}
                </h3>

                <p className="font-sans text-xs text-brand-clay leading-relaxed mb-6 flex-grow line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="pt-4 border-t border-brand-sand flex items-center justify-between">
                  {/* Author summary */}
                  <div className="flex items-center gap-3">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      referrerPolicy="no-referrer"
                      className="w-7 h-7 rounded-full object-cover border border-brand-gold/30"
                    />
                    <div>
                      <p className="text-[11px] font-semibold text-brand-charcoal">{post.author.name}</p>
                      <p className="text-[9px] text-brand-clay">{post.author.role}</p>
                    </div>
                  </div>

                  {/* CTA link */}
                  <button
                    onClick={() => setSelectedPost(post)}
                    className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-brand-forest group-hover:text-brand-gold transition-colors duration-300"
                  >
                    Read Post
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Reading Overlay Modal */}
      <AnimatePresence>
        {selectedPost && (
          <div className="fixed inset-0 z-50 overflow-y-auto" id="blog-reader-modal">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPost(null)}
              className="fixed inset-0 bg-brand-charcoal/80 backdrop-blur-sm"
            />

            {/* Modal Body */}
            <div className="flex min-h-full items-center justify-center p-4 sm:p-6 lg:p-8 z-10 relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: 'spring', damping: 25, stiffness: 180 }}
                className="w-full max-w-4xl bg-brand-cream rounded-lg overflow-hidden shadow-2xl relative border border-brand-forest/20 flex flex-col max-h-[90vh]"
              >
                {/* Fixed Top bar */}
                <div className="absolute top-4 right-4 z-20">
                  <button
                    onClick={() => setSelectedPost(null)}
                    className="p-2 rounded-full bg-brand-charcoal/40 hover:bg-brand-forest/80 text-white transition-all duration-300 backdrop-blur-sm"
                    aria-label="Close post"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Content Container (Scrollable) */}
                <div className="overflow-y-auto flex-grow custom-scrollbar">
                  {/* Banner image with forest overlay */}
                  <div className="relative h-[250px] sm:h-[380px] bg-brand-charcoal">
                    <img
                      src={selectedPost.image}
                      alt={selectedPost.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover opacity-85"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-forest/90 via-brand-charcoal/50 to-transparent" />
                    
                    {/* Floating post meta */}
                    <div className="absolute bottom-6 left-6 right-6 sm:bottom-10 sm:left-10 sm:right-10 text-white">
                      <span className="px-3 py-1 bg-brand-gold text-brand-charcoal text-[10px] font-bold uppercase tracking-widest rounded-sm inline-block mb-3">
                        {selectedPost.category}
                      </span>
                      <h1 className="font-serif text-2xl sm:text-4xl font-semibold leading-tight tracking-tight mb-4 text-white">
                        {selectedPost.title}
                      </h1>
                      
                      <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-brand-sand font-mono">
                        <span className="flex items-center gap-1.5">
                          <Calendar size={14} className="text-brand-gold" />
                          {selectedPost.date}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock size={14} className="text-brand-gold" />
                          {selectedPost.readTime}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 sm:p-10 lg:p-12">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                      
                      {/* Left Side: Author card */}
                      <div className="lg:col-span-1 lg:border-r lg:border-brand-sand lg:pr-6 flex lg:flex-col items-start gap-4 lg:gap-6">
                        <img
                          src={selectedPost.author.avatar}
                          alt={selectedPost.author.name}
                          referrerPolicy="no-referrer"
                          className="w-14 h-14 rounded-full object-cover border-2 border-brand-gold"
                        />
                        <div>
                          <p className="text-[11px] uppercase tracking-wider text-brand-gold font-bold">Written By</p>
                          <h4 className="font-sans text-sm font-bold text-brand-charcoal mt-1">
                            {selectedPost.author.name}
                          </h4>
                          <p className="text-xs text-brand-clay">
                            {selectedPost.author.role}
                          </p>
                        </div>
                      </div>

                      {/* Right Side: Markdown-style full content */}
                      <div className="lg:col-span-3">
                        <div className="prose prose-stone max-w-none text-brand-charcoal font-sans text-sm sm:text-base leading-relaxed space-y-6">
                          {selectedPost.content.split('\n\n').map((paragraph, index) => {
                            if (paragraph.startsWith('### ')) {
                              return (
                                <h3 key={index} className="font-serif text-xl font-bold text-brand-forest pt-4 mb-2 tracking-tight">
                                  {paragraph.replace('### ', '')}
                                </h3>
                              );
                            }
                            return (
                              <p key={index} className="text-brand-clay leading-relaxed">
                                {paragraph}
                              </p>
                            );
                          })}
                        </div>

                        {/* Direct Booking CTA inside article */}
                        <div className="mt-12 p-6 sm:p-8 bg-brand-forest text-white rounded-lg border border-brand-gold/20 relative overflow-hidden shadow-inner">
                          {/* Ambient background glows */}
                          <div className="absolute top-0 right-0 w-40 h-40 bg-brand-gold/10 rounded-full blur-2xl" />
                          
                          <div className="relative z-10 text-center sm:text-left sm:flex sm:items-center sm:justify-between gap-6">
                            <div>
                              <h4 className="font-serif text-lg sm:text-xl font-medium text-brand-gold mb-2">
                                Experience Architectural Honesty
                              </h4>
                              <p className="text-xs text-brand-sand leading-relaxed max-w-md">
                                Inspired by our design principles? Book your direct stay at Redwood Haven or the Urban Oasis Loft directly on our booking engine to save up to 15%.
                              </p>
                            </div>
                            <button
                              onClick={() => {
                                setSelectedPost(null);
                                const element = document.getElementById('booking-section');
                                if (element) {
                                  const offset = 80;
                                  const bodyRect = document.body.getBoundingClientRect().top;
                                  const elementRect = element.getBoundingClientRect().top;
                                  window.scrollTo({
                                    top: elementRect - bodyRect - offset,
                                    behavior: 'smooth'
                                  });
                                }
                              }}
                              className="mt-6 sm:mt-0 px-6 py-3 bg-brand-gold hover:bg-white text-brand-charcoal text-xs uppercase tracking-widest font-semibold transition-all duration-300 rounded-sm whitespace-nowrap shadow-md inline-flex items-center gap-2"
                            >
                              Reserve Now
                              <ChevronRight size={14} />
                            </button>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Footer bar */}
                <div className="border-t border-brand-sand bg-brand-sand/30 p-4 flex items-center justify-end">
                  <button
                    onClick={() => setSelectedPost(null)}
                    className="px-5 py-2 text-xs font-semibold uppercase tracking-wider text-brand-clay hover:text-brand-charcoal transition-colors"
                  >
                    Close Article
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
