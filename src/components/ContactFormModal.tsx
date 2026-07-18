import React, { useState } from 'react';
import { X } from 'lucide-react';

interface ContactFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactFormModal({ isOpen, onClose }: ContactFormModalProps) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://formspree.io/f/xvzeazvb', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Thank you! Your inquiry has been sent successfully.');
        setFormData({ name: '', email: '', message: '' });
        onClose();
      } else {
        alert('There was an error sending your message. Please try again.');
      }
    } catch (error) {
      alert('There was an error sending your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-brand-cream rounded-lg shadow-2xl max-w-md w-full p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-serif font-bold text-brand-charcoal">Inquire About Our Apartment</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-brand-sand/20 rounded transition-colors"
            aria-label="Close form"
          >
            <X size={20} className="text-brand-charcoal" />
          </button>
        </div>

        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-widest font-bold text-brand-charcoal mb-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleFormChange}
              required
              className="w-full px-4 py-2 border border-brand-sand/30 rounded text-brand-charcoal placeholder-brand-sand/50 focus:outline-none focus:border-brand-gold"
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest font-bold text-brand-charcoal mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleFormChange}
              required
              className="w-full px-4 py-2 border border-brand-sand/30 rounded text-brand-charcoal placeholder-brand-sand/50 focus:outline-none focus:border-brand-gold"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest font-bold text-brand-charcoal mb-2">
              Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleFormChange}
              required
              rows={4}
              className="w-full px-4 py-2 border border-brand-sand/30 rounded text-brand-charcoal placeholder-brand-sand/50 focus:outline-none focus:border-brand-gold resize-none"
              placeholder="Tell us about your inquiry..."
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 py-2 bg-brand-charcoal hover:bg-brand-gold text-white hover:text-brand-charcoal text-xs uppercase tracking-widest font-bold rounded transition-all"
            >
              Send Inquiry
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 bg-brand-sand/20 hover:bg-brand-sand/30 text-brand-charcoal text-xs uppercase tracking-widest font-bold rounded transition-all"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
