export interface PropertySpecs {
  guests: number;
  bedrooms: number;
  beds: number;
  bathrooms: number;
}

export interface Property {
  id: string;
  name: string;
  tagline: string;
  description: string;
  longDescription: string;
  bannerImage: string;
  images: string[];
  specs: PropertySpecs;
  basePrice: number;
  cleaningFee: number;
  serviceFeePercent: number;
  rating: number;
  reviewCount: number;
  amenities: string[];
  shortName: string;
  shortCode: string;
}

export interface Booking {
  id: string;
  propertyId: string;
  propertyName: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  basePrice: number;
  nights: number;
  baseTotal: number;
  cleaningFee: number;
  serviceFee: number;
  discount: number;
  totalAmount: number;
  status: 'Pending' | 'Approved' | 'Declined';
  notes?: string;
  createdAt: string;
}

export interface GalleryItem {
  id: string;
  url: string;
  title: string;
  category: 'Interiors' | 'Bedrooms' | 'Outdoors' | 'Amenities';
  alt: string;
}

export interface Recommendation {
  id: string;
  category: 'dining' | 'nature' | 'culture' | 'essentials';
  name: string;
  description: string;
  distance: string;
  rating: number;
  image: string;
  address: string;
}

export interface Review {
  id: string;
  authorName: string;
  authorAvatar: string;
  stayDate: string;
  rating: number;
  comment: string;
  propertyName: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  readTime: string;
  category: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
}
