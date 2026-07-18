import React, { useState, useEffect } from 'react';
import { Booking } from '../types';
import { X, Search, ShieldAlert, BadgePercent, CheckCircle, Ban, Clock, Trash2, Calendar, FileSpreadsheet, RefreshCw, Mail, Phone, HeartHandshake } from 'lucide-react';
import { motion } from 'motion/react';

interface HostPortalProps {
  isOpen: boolean;
  onClose: () => void;
  onInquiriesUpdated: () => void;
}

export default function HostPortal({ isOpen, onClose, onInquiriesUpdated }: HostPortalProps) {
  const [inquiries, setInquiries] = useState<Booking[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingNotesId, setEditingNotesId] = useState<string | null>(null);
  const [tempNotes, setTempNotes] = useState('');

  // Fetch inquiries from localStorage
  const loadInquiries = () => {
    const dataString = localStorage.getItem('haven_inquiries');
    if (dataString) {
      setInquiries(JSON.parse(dataString));
    } else {
      setInquiries([]);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadInquiries();
    }
  }, [isOpen]);

  const updateInquiryStatus = (id: string, newStatus: 'Pending' | 'Approved' | 'Declined') => {
    const updated = inquiries.map((inq) => {
      if (inq.id === id) {
        return { ...inq, status: newStatus };
      }
      return inq;
    });
    setInquiries(updated);
    localStorage.setItem('haven_inquiries', JSON.stringify(updated));
    onInquiriesUpdated();
  };

  const deleteInquiry = (id: string) => {
    if (window.confirm('Are you sure you want to permanently delete this reservation request? This action cannot be undone.')) {
      const filtered = inquiries.filter((inq) => inq.id !== id);
      setInquiries(filtered);
      localStorage.setItem('haven_inquiries', JSON.stringify(filtered));
      onInquiriesUpdated();
    }
  };

  const handleNotesEditStart = (id: string, currentNotes: string) => {
    setEditingNotesId(id);
    setTempNotes(currentNotes || '');
  };

  const handleNotesSave = (id: string) => {
    const updated = inquiries.map((inq) => {
      if (inq.id === id) {
        return { ...inq, notes: tempNotes };
      }
      return inq;
    });
    setInquiries(updated);
    localStorage.setItem('haven_inquiries', JSON.stringify(updated));
    setEditingNotesId(null);
  };

  const handleSeedMockData = () => {
    const mockInquiries: Booking[] = [
      {
        id: 'HAV-8821-RDW',
        propertyId: 'redwood-haven',
        propertyName: 'The Redwood Haven Cabin',
        checkIn: '2026-08-10',
        checkOut: '2026-08-14',
        guests: 2,
        guestName: 'Liam Henderson',
        guestEmail: 'liam.henderson@example.com',
        guestPhone: '(415) 304-9821',
        basePrice: 245,
        nights: 4,
        baseTotal: 980,
        cleaningFee: 85,
        serviceFee: 0,
        discount: 50,
        totalAmount: 1093.40, // includes 8% tax
        status: 'Approved',
        notes: 'Celebrating our anniversary! Host: Sent warm welcome card.',
        createdAt: new Date(Date.now() - 4800000).toISOString()
      },
      {
        id: 'HAV-1102-SYD',
        propertyId: 'sydney-penthouse',
        propertyName: 'The Scaffas Sydney Harbour Penthouse',
        checkIn: '2026-09-02',
        checkOut: '2026-09-07',
        guests: 4,
        guestName: 'Lady Olivia Sterling',
        guestEmail: 'olivia.sterling@sterling-arts.co.uk',
        guestPhone: '+44 20 7946 0192',
        basePrice: 480,
        nights: 5,
        baseTotal: 2400,
        cleaningFee: 150,
        serviceFee: 0,
        discount: 100,
        totalAmount: 2646.00, // includes 8% tax
        status: 'Pending',
        notes: 'VIP international client. Requested private butler service recommendations.',
        createdAt: new Date(Date.now() - 3600000).toISOString()
      },
      {
        id: 'HAV-4129-OAS',
        propertyId: 'urban-oasis',
        propertyName: 'The Urban Oasis Loft',
        checkIn: '2026-08-18',
        checkOut: '2026-08-20',
        guests: 2,
        guestName: 'Sophia Lindqvist',
        guestEmail: 'sophia@stockholm-design.se',
        guestPhone: '+46 8 123 45 67',
        basePrice: 185,
        nights: 2,
        baseTotal: 370,
        cleaningFee: 65,
        serviceFee: 0,
        discount: 25,
        totalAmount: 439.60,
        status: 'Pending',
        notes: 'Needs standing desk coordinates beforehand.',
        createdAt: new Date(Date.now() - 1200000).toISOString()
      }
    ];

    localStorage.setItem('haven_inquiries', JSON.stringify(mockInquiries));
    setInquiries(mockInquiries);
    onInquiriesUpdated();
  };

  const handleClearAll = () => {
    if (window.confirm('Delete ALL booking records in the Host CRM?')) {
      localStorage.removeItem('haven_inquiries');
      setInquiries([]);
      onInquiriesUpdated();
    }
  };

  if (!isOpen) return null;

  // Calculate high-level Analytics
  const totalCount = inquiries.length;
  const pendingCount = inquiries.filter((i) => i.status === 'Pending').length;
  const approvedCount = inquiries.filter((i) => i.status === 'Approved').length;
  const estimatedRevenue = inquiries
    .filter((i) => i.status === 'Approved')
    .reduce((sum, current) => sum + current.totalAmount, 0);

  // Filter inquiry records
  const filteredInquiries = inquiries.filter((i) => {
    const query = searchQuery.toLowerCase();
    return (
      i.guestName.toLowerCase().includes(query) ||
      i.propertyName.toLowerCase().includes(query) ||
      i.id.toLowerCase().includes(query)
    );
  });

  return (
    <div id="host-portal-overlay" className="fixed inset-0 z-50 flex items-center justify-end bg-brand-charcoal/80 backdrop-blur-sm p-0 sm:p-4">
      <motion.div
        id="host-portal-content"
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 180 }}
        className="bg-brand-cream border-l border-brand-sand h-full w-full max-w-4xl flex flex-col justify-between shadow-2xl relative"
      >
        {/* Header */}
        <div className="bg-brand-charcoal text-white px-6 py-4 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-2.5">
            <ShieldAlert size={20} className="text-brand-gold" />
            <div className="text-left">
              <span className="font-serif text-base font-bold text-brand-sand block">Host Management Portal</span>
              <span className="text-[9px] uppercase tracking-wider text-brand-sand/50">Direct Inquiries CRM & Booking Analytics</span>
            </div>
          </div>
          <button
            id="close-portal-btn"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-brand-clay/35 text-brand-sand hover:text-white transition-all"
            aria-label="Close Portal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Quick Analytics Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white border border-brand-sand p-4 rounded text-left shadow-sm">
              <span className="block text-[8px] uppercase tracking-widest text-brand-clay/60 font-bold mb-1">
                Total Inquiries
              </span>
              <span className="text-xl sm:text-2xl font-serif font-bold text-brand-charcoal">
                {totalCount}
              </span>
            </div>

            <div className="bg-white border border-brand-sand p-4 rounded text-left shadow-sm">
              <span className="block text-[8px] uppercase tracking-widest text-brand-clay/60 font-bold mb-1">
                Pending Actions
              </span>
              <span className="text-xl sm:text-2xl font-serif font-bold text-brand-terracotta flex items-center gap-1.5">
                {pendingCount}
                {pendingCount > 0 && <Clock size={16} className="text-brand-terracotta animate-pulse" />}
              </span>
            </div>

            <div className="bg-white border border-brand-sand p-4 rounded text-left shadow-sm">
              <span className="block text-[8px] uppercase tracking-widest text-brand-clay/60 font-bold mb-1">
                Approved Blocks
              </span>
              <span className="text-xl sm:text-2xl font-serif font-bold text-brand-gold">
                {approvedCount}
              </span>
            </div>

            <div className="bg-white border border-brand-sand p-4 rounded text-left shadow-sm">
              <span className="block text-[8px] uppercase tracking-widest text-brand-clay/60 font-bold mb-1">
                Direct Revenue
              </span>
              <span className="text-xl sm:text-2xl font-serif font-bold text-emerald-600">
                ${estimatedRevenue.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Seed and Actions Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-brand-sand/40 border border-brand-sand p-3.5 rounded">
            <div className="text-left text-xs text-brand-clay">
              <span className="font-bold text-brand-charcoal block mb-0.5">Reservation Simulation Suite</span>
              <span>Test the booking CRM flow by seeding fake requests or purging current records.</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                id="seed-mock-btn"
                onClick={handleSeedMockData}
                className="px-3 py-1.5 rounded bg-brand-charcoal hover:bg-brand-gold text-white hover:text-brand-charcoal text-[10px] uppercase tracking-wider font-semibold transition-all flex items-center gap-1 cursor-pointer"
              >
                <RefreshCw size={11} />
                Seed Demo Requests
              </button>
              {totalCount > 0 && (
                <button
                  id="purge-records-btn"
                  onClick={handleClearAll}
                  className="px-3 py-1.5 rounded border border-brand-terracotta text-brand-terracotta hover:bg-brand-terracotta hover:text-white text-[10px] uppercase tracking-wider font-semibold transition-all flex items-center gap-1 cursor-pointer"
                >
                  <Trash2 size={11} />
                  Purge CRM Database
                </button>
              )}
            </div>
          </div>

          {/* Search Header */}
          <div className="flex items-center gap-3 bg-white border border-brand-sand rounded px-3 py-2">
            <Search size={16} className="text-brand-clay" />
            <input
              id="crm-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Guest Name, Property Name, or Reference ID..."
              className="w-full text-xs focus:outline-none bg-transparent"
            />
          </div>

          {/* Inquiries List */}
          <div className="space-y-4">
            {filteredInquiries.length > 0 ? (
              filteredInquiries.map((inq) => (
                <div
                  key={inq.id}
                  id={`crm-card-${inq.id}`}
                  className="bg-white border border-brand-sand rounded-md shadow-sm p-5 text-left relative overflow-hidden group"
                >
                  {/* Status Indicator Stripe */}
                  <div className={`absolute top-0 left-0 bottom-0 w-1.5 ${
                    inq.status === 'Approved' ? 'bg-brand-gold' : inq.status === 'Declined' ? 'bg-brand-terracotta' : 'bg-amber-400'
                  }`} />

                  {/* Header Row */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-brand-sand/50 pb-3 mb-4 pl-1">
                    <div>
                      <span className="font-mono text-[10px] font-bold text-brand-gold bg-brand-sand/65 px-2 py-0.5 rounded mr-2">
                        {inq.id}
                      </span>
                      <span className="font-serif text-sm font-bold text-brand-charcoal">
                        {inq.propertyName}
                      </span>
                    </div>

                    {/* Status Badging */}
                    <div className="flex items-center gap-1.5 text-xs font-semibold">
                      {inq.status === 'Approved' && (
                        <span className="text-brand-gold flex items-center gap-1 bg-brand-sand/40 px-2 py-1 rounded">
                          <CheckCircle size={12} /> Approved
                        </span>
                      )}
                      {inq.status === 'Declined' && (
                        <span className="text-brand-terracotta flex items-center gap-1 bg-brand-terracotta/5 px-2 py-1 rounded">
                          <Ban size={12} /> Declined
                        </span>
                      )}
                      {inq.status === 'Pending' && (
                        <span className="text-amber-500 flex items-center gap-1 bg-amber-50 px-2 py-1 rounded">
                          <Clock size={12} className="animate-spin" /> Action Required
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Body Specs */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-brand-clay mb-4 pl-1">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Calendar size={13} className="text-brand-gold shrink-0" />
                        <span>Dates: <strong>{inq.checkIn}</strong> to <strong>{inq.checkOut}</strong> ({inq.nights} night{inq.nights > 1 ? 's' : ''})</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail size={13} className="text-brand-gold shrink-0" />
                        <a href={`mailto:${inq.guestEmail}`} className="hover:underline hover:text-brand-gold">{inq.guestEmail}</a>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone size={13} className="text-brand-gold shrink-0" />
                        <span>{inq.guestPhone}</span>
                      </div>
                    </div>

                    <div className="space-y-2 bg-brand-cream/50 p-3 rounded border border-brand-sand/50">
                      <div className="flex justify-between font-medium">
                        <span>Lead Guest:</span>
                        <strong className="text-brand-charcoal">{inq.guestName}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>Total Paid Direct:</span>
                        <strong className="text-brand-gold font-serif">${inq.totalAmount.toFixed(2)}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>Travelers:</span>
                        <span>{inq.guests} Guest{inq.guests > 1 ? 's' : ''}</span>
                      </div>
                    </div>
                  </div>

                  {/* Private internal Notes */}
                  <div className="bg-amber-50/50 border border-amber-100 rounded p-3 text-xs mb-4 pl-4 relative">
                    <span className="block text-[8px] uppercase tracking-wider text-amber-600 font-bold mb-1">
                      Private Host Notes & Remarks
                    </span>
                    {editingNotesId === inq.id ? (
                      <div className="flex gap-2 mt-1.5">
                        <input
                          id="notes-edit-input"
                          type="text"
                          value={tempNotes}
                          onChange={(e) => setTempNotes(e.target.value)}
                          className="w-full border border-brand-sand bg-white px-2 py-1 rounded text-xs text-brand-charcoal focus:outline-none focus:ring-1 focus:ring-brand-gold"
                        />
                        <button
                          id="notes-save-btn"
                          onClick={() => handleNotesSave(inq.id)}
                          className="px-2.5 py-1 bg-brand-gold text-white rounded font-bold uppercase text-[9px]"
                        >
                          Save
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-start justify-between gap-4">
                        <span className="italic text-brand-clay leading-normal">
                          {inq.notes ? inq.notes : 'No internal comments added yet.'}
                        </span>
                        <button
                          id="notes-edit-btn"
                          onClick={() => handleNotesEditStart(inq.id, inq.notes || '')}
                          className="text-[9px] uppercase tracking-wider font-bold text-brand-gold hover:underline shrink-0"
                        >
                          Edit Notes
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Actions Bar */}
                  <div className="flex items-center justify-between pt-3 border-t border-brand-sand/30 pl-1">
                    <div className="flex gap-1.5">
                      <button
                        id={`crm-approve-${inq.id}`}
                        onClick={() => updateInquiryStatus(inq.id, 'Approved')}
                        className={`px-3 py-1.5 rounded text-[10px] uppercase font-bold tracking-wider transition-all cursor-pointer ${
                          inq.status === 'Approved'
                            ? 'bg-brand-gold text-white'
                            : 'bg-brand-sand/50 text-brand-clay hover:bg-brand-gold/25 hover:text-brand-charcoal'
                        }`}
                      >
                        Approve
                      </button>
                      <button
                        id={`crm-decline-${inq.id}`}
                        onClick={() => updateInquiryStatus(inq.id, 'Declined')}
                        className={`px-3 py-1.5 rounded text-[10px] uppercase font-bold tracking-wider transition-all cursor-pointer ${
                          inq.status === 'Declined'
                            ? 'bg-brand-terracotta text-white'
                            : 'bg-brand-sand/50 text-brand-clay hover:bg-brand-terracotta/10 hover:text-brand-terracotta'
                        }`}
                      >
                        Decline
                      </button>
                      {inq.status !== 'Pending' && (
                        <button
                          id={`crm-revert-${inq.id}`}
                          onClick={() => updateInquiryStatus(inq.id, 'Pending')}
                          className="px-2.5 py-1.5 rounded text-[10px] uppercase tracking-wider font-semibold bg-gray-50 text-gray-500 hover:bg-gray-100 cursor-pointer"
                        >
                          Reset Status
                        </button>
                      )}
                    </div>

                    <button
                      id={`crm-delete-${inq.id}`}
                      onClick={() => deleteInquiry(inq.id)}
                      className="p-1.5 text-brand-clay/50 hover:text-brand-terracotta transition-colors rounded-full hover:bg-gray-100"
                      aria-label="Delete inquiry record"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-16 text-center border border-dashed border-brand-sand bg-white rounded-md flex flex-col items-center justify-center text-brand-clay">
                <FileSpreadsheet size={32} className="text-brand-gold/40 mb-3" />
                <span className="font-bold text-brand-charcoal text-xs">No CRM Inquiries Found</span>
                <span className="text-xs font-light max-w-xs mt-1">
                  Once a guest submits a reservation request on the homepage calculator, it will register instantly here. Click 'Seed Demo Requests' to test.
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Footer info box */}
        <div className="p-4 bg-brand-charcoal/95 border-t border-brand-clay/35 text-center text-[10px] text-brand-sand/60 font-mono flex items-center justify-center gap-1.5 shrink-0">
          <HeartHandshake size={12} className="text-brand-gold" />
          <span>Simulation Mode Active — Local Storage Database Engine</span>
        </div>
      </motion.div>
    </div>
  );
}
