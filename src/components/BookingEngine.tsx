import React, { useState, useEffect } from 'react';
import { Property, Booking } from '../types';
import { Calendar as CalendarIcon, Users, CreditCard, ChevronLeft, ChevronRight, CheckCircle2, Ticket, ShieldCheck, Mail, Phone, User, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface BookingEngineProps {
  properties: Property[];
  selectedPropertyId: string;
  onSelectProperty: (id: string) => void;
  onInquirySubmitted: () => void;
}

export default function BookingEngine({
  properties,
  selectedPropertyId,
  onSelectProperty,
  onInquirySubmitted
}: BookingEngineProps) {
  const selectedProperty = properties.find((p) => p.id === selectedPropertyId) || properties[0];

  // Calendar state
  const [currentDate, setCurrentDate] = useState(new Date());
  const [checkIn, setCheckIn] = useState<string | null>(null);
  const [checkOut, setCheckOut] = useState<string | null>(null);
  const [guests, setGuests] = useState(1);
  const [hoveredDate, setHoveredDate] = useState<string | null>(null);

  // Form & success states
  const [showFormModal, setShowFormModal] = useState(false);
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [guestNotes, setGuestNotes] = useState('');
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  // Auto scroll to calendar if triggered from elsewhere
  useEffect(() => {
    // Reset guest count limit if selected property changes
    if (guests > selectedProperty.specs.guests) {
      setGuests(selectedProperty.specs.guests);
    }
  }, [selectedPropertyId, selectedProperty]);

  // Calendar calculation helpers
  const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const handleMonthPrev = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleMonthNext = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  // Convert Date object to YYYY-MM-DD
  const formatDateString = (year: number, month: number, day: number) => {
    const mm = String(month + 1).padStart(2, '0');
    const dd = String(day).padStart(2, '0');
    return `${year}-${mm}-${dd}`;
  };

  const todayStr = () => {
    const today = new Date();
    return formatDateString(today.getFullYear(), today.getMonth(), today.getDate());
  };

  const handleDayClick = (dayStr: string) => {
    if (dayStr < todayStr()) return; // Disable past dates

    if (!checkIn || (checkIn && checkOut)) {
      // Step 1: Select check-in
      setCheckIn(dayStr);
      setCheckOut(null);
    } else {
      // Step 2: Select check-out
      if (dayStr < checkIn) {
        // If clicked day is before check-in, treat it as new check-in
        setCheckIn(dayStr);
      } else if (dayStr === checkIn) {
        // Ignore single-day click
        return;
      } else {
        setCheckOut(dayStr);
      }
    }
  };

  const calculateNights = (): number => {
    if (!checkIn || !checkOut) return 0;
    const d1 = new Date(checkIn);
    const d2 = new Date(checkOut);
    const diffTime = Math.abs(d2.getTime() - d1.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const nights = calculateNights();

  // Pricing calculations
  const baseTotal = nights * selectedProperty.basePrice;
  const cleaningFee = selectedProperty.cleaningFee;
  const tax = baseTotal * 0.08; // 8% local tourism tax
  const directDiscount = nights >= 3 ? 50 : 25; // Sweeten deal: $50 off for 3+ nights, $25 for standard
  const directTotal = nights > 0 ? baseTotal + cleaningFee + tax - directDiscount : 0;

  // Comparison figures with Airbnb
  const airbnbMarkupRate = 1.14; // 14% airbnb platform fees
  const airbnbTotal = nights > 0 ? (baseTotal + cleaningFee) * airbnbMarkupRate + tax : 0;
  const directSavings = nights > 0 ? Math.max(airbnbTotal - directTotal, 0) : 0;

  // Render Calendar Grid
  const renderCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayIndex = getFirstDayOfMonth(year, month);

    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const weekdays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    const cells: React.ReactNode[] = [];

    // Empty offset cells
    for (let i = 0; i < firstDayIndex; i++) {
      cells.push(<div key={`empty-${i}`} className="h-9 sm:h-11" />);
    }

    // Days cells
    for (let day = 1; day <= daysInMonth; day++) {
      const dayStr = formatDateString(year, month, day);
      const isPast = dayStr < todayStr();
      const isCheckIn = dayStr === checkIn;
      const isCheckOut = dayStr === checkOut;

      let isInRange = false;
      if (checkIn && checkOut && dayStr > checkIn && dayStr < checkOut) {
        isInRange = true;
      }

      let isHoverHighlight = false;
      if (checkIn && !checkOut && hoveredDate && dayStr > checkIn && dayStr <= hoveredDate) {
        isHoverHighlight = true;
      }

      let cellStyle = 'relative h-9 sm:h-11 flex items-center justify-center text-xs font-medium rounded-full cursor-pointer transition-all ';

      if (isPast) {
        cellStyle += 'text-gray-300 cursor-not-allowed';
      } else if (isCheckIn || isCheckOut) {
        cellStyle += 'bg-brand-gold text-white shadow-md font-bold scale-105 z-10';
      } else if (isInRange) {
        cellStyle += 'bg-brand-sand/65 text-brand-charcoal font-semibold hover:bg-brand-sand';
      } else if (isHoverHighlight) {
        cellStyle += 'bg-brand-sand/40 text-brand-charcoal/80';
      } else {
        cellStyle += 'text-brand-charcoal hover:bg-brand-sand/30';
      }

      cells.push(
        <button
          key={`day-${day}`}
          onClick={() => handleDayClick(dayStr)}
          onMouseEnter={() => !isPast && setHoveredDate(dayStr)}
          onMouseLeave={() => setHoveredDate(null)}
          disabled={isPast}
          className={cellStyle}
        >
          {day}
        </button>
      );
    }

    return (
      <div className="w-full">
        {/* Calendar Nav */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={handleMonthPrev}
            className="p-1.5 rounded-full hover:bg-brand-sand transition-colors text-brand-clay"
            aria-label="Previous month"
          >
            <ChevronLeft size={16} />
          </button>
          <span className="font-serif font-bold text-sm sm:text-base text-brand-charcoal">
            {monthNames[month]} {year}
          </span>
          <button
            onClick={handleMonthNext}
            className="p-1.5 rounded-full hover:bg-brand-sand transition-colors text-brand-clay"
            aria-label="Next month"
          >
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Days of Week Row */}
        <div className="grid grid-cols-7 gap-y-1 text-center mb-2">
          {weekdays.map((wd) => (
            <span key={wd} className="text-[10px] font-bold text-brand-clay/60 uppercase tracking-wider">
              {wd}
            </span>
          ))}
        </div>

        {/* Calendar Days Grid */}
        <div className="grid grid-cols-7 gap-y-1.5 text-center">
          {cells}
        </div>
      </div>
    );
  };

  // Submit contact modal and finalize booking simulation
  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName || !guestEmail || !guestPhone) {
      setErrorMsg('Please complete all required fields.');
      return;
    }

    const refCode = `HAV-${Math.floor(1000 + Math.random() * 9000)}-${selectedProperty.shortCode}`;
    const newBooking: Booking = {
      id: refCode,
      propertyId: selectedProperty.id,
      propertyName: selectedProperty.name,
      checkIn: checkIn!,
      checkOut: checkOut!,
      guests: guests,
      guestName: guestName,
      guestEmail: guestEmail,
      guestPhone: guestPhone,
      basePrice: selectedProperty.basePrice,
      nights: nights,
      baseTotal: baseTotal,
      cleaningFee: cleaningFee,
      serviceFee: 0,
      discount: directDiscount,
      totalAmount: directTotal,
      status: 'Pending',
      notes: guestNotes,
      createdAt: new Date().toISOString()
    };

    // Save to localStorage
    const existingInquiriesString = localStorage.getItem('haven_inquiries');
    const existingInquiries: Booking[] = existingInquiriesString ? JSON.parse(existingInquiriesString) : [];
    existingInquiries.unshift(newBooking); // Add to beginning of array
    localStorage.setItem('haven_inquiries', JSON.stringify(existingInquiries));

    setConfirmedBooking(newBooking);
    setShowFormModal(false);
    onInquirySubmitted(); // Notify parent to update badge

    // Clear form
    setGuestName('');
    setGuestEmail('');
    setGuestPhone('');
    setGuestNotes('');
    setErrorMsg('');
  };

  const handleResetSearch = () => {
    setCheckIn(null);
    setCheckOut(null);
    setConfirmedBooking(null);
  };

  return (
    <section id="booking-section" className="py-24 bg-brand-sand/35 border-t border-brand-sand">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Booking Description and Selector */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <span className="font-sans text-[11px] uppercase tracking-[0.3em] text-brand-gold font-bold block mb-3">
              Direct Booker Advantages
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-brand-charcoal mb-4">
              Direct Reservation Engine
            </h2>
            <p className="font-sans text-sm text-brand-clay font-light leading-relaxed mb-6">
              Skip third-party agency markup fees and secure your booking directly. Enjoy our lowest price guarantee, custom arrival amenity baskets, and priority support.
            </p>

            {/* Direct Value Grid */}
            <div className="space-y-4 mb-8">
              <div className="flex gap-3">
                <CheckCircle2 size={18} className="text-brand-gold shrink-0 mt-0.5" />
                <div>
                  <span className="block text-xs font-semibold text-brand-charcoal">Lowest Price Guarantee</span>
                  <span className="text-xs text-brand-clay/95">Book directly on our card and save 10% to 15% on standard booking markups instantly.</span>
                </div>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 size={18} className="text-brand-gold shrink-0 mt-0.5" />
                <div>
                  <span className="block text-xs font-semibold text-brand-charcoal">Complimentary Artisan Welcome Sample</span>
                  <span className="text-xs text-brand-clay/95">Direct guests receive fresh local estate coffees and handcrafted soaps upon arrival.</span>
                </div>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 size={18} className="text-brand-gold shrink-0 mt-0.5" />
                <div>
                  <span className="block text-xs font-semibold text-brand-charcoal">Flexible 14-Day Cancellation</span>
                  <span className="text-xs text-brand-clay/95">Cancel up to two weeks in advance for a complete refund without questions.</span>
                </div>
              </div>
            </div>

            {/* Sanctuary Toggle */}
            <div className="bg-brand-cream border border-brand-sand p-4 rounded-sm">
              <label className="block text-[10px] uppercase tracking-wider text-brand-clay font-bold mb-2">
                Select Your Desired Sanctuary:
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {properties.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      onSelectProperty(p.id);
                      handleResetSearch();
                    }}
                    className={`py-2.5 px-1.5 text-[10px] sm:text-xs uppercase font-semibold tracking-wider rounded transition-all text-center border cursor-pointer ${
                      selectedProperty.id === p.id
                        ? 'bg-brand-charcoal text-white border-brand-charcoal shadow-sm'
                        : 'bg-white text-brand-clay border-brand-sand hover:bg-brand-sand/25'
                    }`}
                  >
                    {p.shortName}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Calculator Grid */}
          <div className="lg:col-span-7">
            <div id="booking-calculator-panel" className="bg-white border border-brand-sand rounded-lg shadow-xl overflow-hidden">
              {confirmedBooking ? (
                /* Success Ticket */
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-8 text-center"
                >
                  <div className="w-16 h-16 bg-brand-sand/70 text-brand-gold flex items-center justify-center rounded-full mx-auto mb-6">
                    <CheckCircle2 size={36} className="text-brand-gold" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-brand-charcoal mb-2">
                    Inquiry Received Successfully!
                  </h3>
                  <p className="font-sans text-xs text-brand-clay/95 max-w-md mx-auto mb-6">
                    Thank you, <span className="font-semibold text-brand-charcoal">{confirmedBooking.guestName}</span>! Your direct inquiry has been successfully transmitted and logged in our system. We have reserved your requested block pending final approval.
                  </p>

                  {/* Booking Receipt Details */}
                  <div className="max-w-md mx-auto border border-dashed border-brand-sand rounded-md bg-brand-cream p-5 text-left mb-8 relative">
                    <div className="absolute top-0 left-4 right-4 h-[1px] bg-brand-sand" />
                    <div className="flex justify-between items-center mb-4 border-b border-brand-sand pb-3">
                      <div className="flex items-center gap-2">
                        <Ticket size={16} className="text-brand-gold" />
                        <span className="text-[10px] uppercase tracking-widest text-brand-clay font-bold">Booking Reference</span>
                      </div>
                      <span className="font-mono text-xs font-bold text-brand-gold bg-brand-sand/50 px-2 py-0.5 rounded">
                        {confirmedBooking.id}
                      </span>
                    </div>

                    <div className="space-y-2 text-xs mb-4">
                      <div className="flex justify-between">
                        <span className="text-brand-clay">Property:</span>
                        <span className="font-semibold text-brand-charcoal">{confirmedBooking.propertyName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-brand-clay">Guests:</span>
                        <span className="font-semibold text-brand-charcoal">{confirmedBooking.guests} Traveler{confirmedBooking.guests > 1 ? 's' : ''}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-brand-clay">Dates:</span>
                        <span className="font-semibold text-brand-charcoal">
                          {confirmedBooking.checkIn} to {confirmedBooking.checkOut}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-brand-clay">Duration:</span>
                        <span className="font-semibold text-brand-charcoal">{confirmedBooking.nights} Night{confirmedBooking.nights > 1 ? 's' : ''}</span>
                      </div>
                    </div>

                    <div className="border-t border-brand-sand pt-3 flex justify-between items-center text-sm">
                      <span className="font-bold text-brand-charcoal">Total Price Calculated:</span>
                      <span className="font-serif font-bold text-brand-gold text-lg">
                        ${confirmedBooking.totalAmount.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-sm mx-auto">
                    <button
                      id="reset-booking-btn"
                      onClick={handleResetSearch}
                      className="flex-1 py-3 bg-brand-charcoal text-white hover:bg-brand-gold hover:text-brand-charcoal text-xs uppercase tracking-widest font-semibold rounded-sm transition-all"
                    >
                      Plan Another Stay
                    </button>
                    <a
                      href={`mailto:${confirmedBooking.guestEmail}?subject=Direct Inquiry Details for Reference: ${confirmedBooking.id}`}
                      className="flex-1 py-3 border border-brand-sand bg-white text-brand-charcoal hover:bg-brand-sand/35 text-xs uppercase tracking-widest font-semibold rounded-sm transition-all flex items-center justify-center gap-1"
                    >
                      <Mail size={12} />
                      Email Details
                    </a>
                  </div>
                </motion.div>
              ) : (
                /* Calendar and Calculator Grid */
                <div className="grid grid-cols-1 md:grid-cols-2">
                  {/* Left Calendar Grid */}
                  <div className="p-5 sm:p-6 border-b md:border-b-0 md:border-r border-brand-sand">
                    <h4 className="text-[10px] uppercase tracking-wider text-brand-clay font-bold mb-4 flex items-center gap-2">
                      <CalendarIcon size={14} className="text-brand-gold" />
                      1. Choose Dates
                    </h4>
                    {renderCalendar()}

                    {/* Check In / Out indicators */}
                    <div className="mt-6 pt-4 border-t border-brand-sand grid grid-cols-2 gap-2 text-center">
                      <div className="p-2 rounded bg-brand-cream border border-brand-sand/50">
                        <span className="block text-[8px] uppercase tracking-widest text-brand-clay font-semibold">Check-In</span>
                        <span className="text-xs font-bold text-brand-charcoal">
                          {checkIn ? checkIn : 'Select date'}
                        </span>
                      </div>
                      <div className="p-2 rounded bg-brand-cream border border-brand-sand/50">
                        <span className="block text-[8px] uppercase tracking-widest text-brand-clay font-semibold">Check-Out</span>
                        <span className="text-xs font-bold text-brand-charcoal">
                          {checkOut ? checkOut : 'Select date'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right Invoice Panel */}
                  <div className="p-5 sm:p-6 flex flex-col justify-between bg-brand-cream/40">
                    <div>
                      <h4 className="text-[10px] uppercase tracking-wider text-brand-clay font-bold mb-4 flex items-center gap-2">
                        <Users size={14} className="text-brand-gold" />
                        2. Stay Specifications
                      </h4>

                      {/* Guest Selector */}
                      <div className="mb-6">
                        <label className="block text-[10px] uppercase tracking-wider text-brand-clay/70 font-semibold mb-2">
                          Travelers (Max {selectedProperty.specs.guests})
                        </label>
                        <div className="flex items-center gap-3">
                          <button
                            id="guest-dec-btn"
                            onClick={() => setGuests(Math.max(1, guests - 1))}
                            className="w-8 h-8 rounded-full border border-brand-sand flex items-center justify-center text-brand-clay hover:bg-brand-sand text-sm font-bold transition-colors"
                          >
                            -
                          </button>
                          <span className="font-bold text-sm w-8 text-center">{guests}</span>
                          <button
                            id="guest-inc-btn"
                            onClick={() => setGuests(Math.min(selectedProperty.specs.guests, guests + 1))}
                            className="w-8 h-8 rounded-full border border-brand-sand flex items-center justify-center text-brand-clay hover:bg-brand-sand text-sm font-bold transition-colors"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Invoice Summary */}
                      <h4 className="text-[10px] uppercase tracking-wider text-brand-clay font-bold mb-4 flex items-center gap-2 border-t border-brand-sand/50 pt-5">
                        <CreditCard size={14} className="text-brand-gold" />
                        3. Pricing Summary
                      </h4>

                      {nights > 0 ? (
                        <div className="space-y-2.5 text-xs">
                          <div className="flex justify-between text-brand-clay">
                            <span>${selectedProperty.basePrice} x {nights} night{nights > 1 ? 's' : ''}</span>
                            <span className="font-semibold text-brand-charcoal">${baseTotal.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between text-brand-clay">
                            <span>Cleaning Fee</span>
                            <span className="font-semibold text-brand-charcoal">${cleaningFee.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between text-brand-clay">
                            <span>Tourism & Lodging Tax (8%)</span>
                            <span className="font-semibold text-brand-charcoal">${tax.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between text-brand-terracotta font-semibold bg-brand-terracotta/5 px-2 py-1 rounded">
                            <span>Direct Booking Discount</span>
                            <span>-${directDiscount.toFixed(2)}</span>
                          </div>

                          <div className="border-t border-brand-sand pt-3 space-y-1">
                            <div className="flex justify-between items-baseline">
                              <span className="font-bold text-brand-charcoal text-sm">Direct Book Total:</span>
                              <span className="font-serif font-bold text-lg text-brand-gold">${directTotal.toFixed(2)}</span>
                            </div>

                            {/* Platform comparison card */}
                            <div className="mt-4 p-3 rounded bg-brand-sand/40 border border-brand-sand/70 text-[11px]">
                              <div className="flex justify-between text-gray-500 mb-1">
                                <span>Agency platform (Airbnb) rate:</span>
                                <span className="line-through">${airbnbTotal.toFixed(2)}</span>
                              </div>
                              <div className="flex justify-between text-brand-terracotta font-bold">
                                <span>Your direct booking savings:</span>
                                <span>Save ${directSavings.toFixed(2)}!</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="py-8 text-center border border-dashed border-brand-sand bg-brand-cream/50 rounded flex flex-col items-center justify-center text-brand-clay">
                          <CalendarIcon size={24} className="text-brand-gold/50 mb-2 animate-bounce" />
                          <span className="text-xs">Please select check-in & check-out dates on the calendar grid to calculate live direct rates.</span>
                        </div>
                      )}
                    </div>

                    <div className="mt-6">
                      <button
                        id="submit-booking-modal-btn"
                        onClick={() => setShowFormModal(true)}
                        disabled={nights === 0}
                        className={`w-full py-3.5 rounded-sm font-sans text-xs uppercase tracking-widest font-bold transition-all duration-300 shadow-md ${
                          nights > 0
                            ? 'bg-brand-gold text-white hover:bg-brand-charcoal shadow-brand-gold/10 hover:shadow-xl cursor-pointer'
                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        Request Direct Booking
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Guest Contact Details Modal */}
      <AnimatePresence>
        {showFormModal && (
          <div id="booking-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              id="booking-modal-content"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-lg border border-brand-sand shadow-2xl w-full max-w-lg overflow-hidden"
            >
              {/* Modal Header */}
              <div className="bg-brand-charcoal text-white px-6 py-4 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={18} className="text-brand-gold" />
                  <span className="font-serif text-base font-bold">Direct Guest Registration</span>
                </div>
                <button
                  id="close-booking-modal"
                  onClick={() => setShowFormModal(false)}
                  className="text-brand-sand hover:text-white font-bold text-sm"
                >
                  ✕
                </button>
              </div>

              {/* Modal Form */}
              <form onSubmit={handleBookingSubmit} className="p-6 space-y-4">
                <span className="block text-xs text-brand-clay leading-normal">
                  Your dates are currently held for you. Please submit your primary contact details below to finalize your booking request directly with the host.
                </span>

                {errorMsg && (
                  <div className="p-2.5 rounded bg-brand-terracotta/10 text-brand-terracotta text-xs font-bold">
                    {errorMsg}
                  </div>
                )}

                {/* Name */}
                <div className="space-y-1">
                  <label className="block text-[10px] uppercase tracking-wider text-brand-clay font-bold flex items-center gap-1.5">
                    <User size={12} className="text-brand-gold" />
                    Guest Name <span className="text-brand-terracotta">*</span>
                  </label>
                  <input
                    id="guest-name-input"
                    type="text"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="e.g. Eleanor Vance"
                    required
                    className="w-full text-sm p-2.5 rounded border border-brand-sand focus:ring-1 focus:ring-brand-gold focus:outline-none bg-brand-cream/30"
                  />
                </div>

                {/* Email / Phone grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-[10px] uppercase tracking-wider text-brand-clay font-bold flex items-center gap-1.5">
                      <Mail size={12} className="text-brand-gold" />
                      Email Address <span className="text-brand-terracotta">*</span>
                    </label>
                    <input
                      id="guest-email-input"
                      type="email"
                      value={guestEmail}
                      onChange={(e) => setGuestEmail(e.target.value)}
                      placeholder="e.g. eleanor@example.com"
                      required
                      className="w-full text-sm p-2.5 rounded border border-brand-sand focus:ring-1 focus:ring-brand-gold focus:outline-none bg-brand-cream/30"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[10px] uppercase tracking-wider text-brand-clay font-bold flex items-center gap-1.5">
                      <Phone size={12} className="text-brand-gold" />
                      Phone Number <span className="text-brand-terracotta">*</span>
                    </label>
                    <input
                      id="guest-phone-input"
                      type="tel"
                      value={guestPhone}
                      onChange={(e) => setGuestPhone(e.target.value)}
                      placeholder="e.g. (555) 019-2834"
                      required
                      className="w-full text-sm p-2.5 rounded border border-brand-sand focus:ring-1 focus:ring-brand-gold focus:outline-none bg-brand-cream/30"
                    />
                  </div>
                </div>

                {/* Notes */}
                <div className="space-y-1">
                  <label className="block text-[10px] uppercase tracking-wider text-brand-clay font-bold flex items-center gap-1.5">
                    <MessageSquare size={12} className="text-brand-gold" />
                    Special Requests & Notes (Optional)
                  </label>
                  <textarea
                    id="guest-notes-input"
                    value={guestNotes}
                    onChange={(e) => setGuestNotes(e.target.value)}
                    placeholder="e.g., Let us know if you need early check-in, have allergen requests, or need specific crib setups."
                    rows={3}
                    className="w-full text-sm p-2.5 rounded border border-brand-sand focus:ring-1 focus:ring-brand-gold focus:outline-none bg-brand-cream/30 resize-none"
                  />
                </div>

                {/* Submit Panel */}
                <div className="pt-4 border-t border-brand-sand flex flex-col sm:flex-row gap-3">
                  <button
                    id="cancel-booking-btn"
                    type="button"
                    onClick={() => setShowFormModal(false)}
                    className="flex-1 py-3 text-xs uppercase tracking-widest font-semibold border border-brand-sand rounded hover:bg-brand-sand/20 transition-all text-brand-clay text-center"
                  >
                    Go Back
                  </button>
                  <button
                    id="confirm-booking-btn"
                    type="submit"
                    className="flex-1 py-3 bg-brand-gold text-white hover:bg-brand-charcoal text-xs uppercase tracking-widest font-bold rounded shadow-md hover:shadow-lg transition-all text-center"
                  >
                    Confirm Booking Request
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
