import { Property, GalleryItem, Recommendation, Review, FAQ, BlogPost } from './types';

export const INITIAL_PROPERTIES: Property[] = [
  {
    id: 'redwood-haven',
    name: 'The Zetland Sanctuary Apartment',
    tagline: 'Two bedrooms, a freestanding soaking tub, a gas kitchen, and more natural light than most Sydney apartments twice the size.',
    description: 'This is a proper place to stay, not just somewhere to sleep. A sophisticated 2-bedroom apartment in Zetland with premium amenities and exceptional natural light.',
    longDescription: 'Experience contemporary luxury living at The Zetland Sanctuary, an elegantly designed apartment in Sydney\'s vibrant inner-south. This thoughtfully curated space features two spacious bedrooms: the master suite with queen bed, ensuite with shower and toilet, and study desk; the second bedroom with double bed and access to a private balcony with outdoor seating. The standout bathroom features a luxurious freestanding soaking tub, plus shower and toilet. Flooded with natural light, this apartment offers more brightness than most Sydney apartments twice its size. The open-plan living area features a premium gas kitchen, and the space is perfect for gatherings or quiet retreats. Zetland\'s proximity to Eastlakes, Surry Hills, and Redfern means world-class dining, galleries, and culture are moments away.',
    bannerImage: '/images/Opera_house.jpg',
    images: [
      '/images/updated-7409637.jpg', // Living Room
      '/images/Kitchen_1_A7409632.jpg', // Kitchen
      '/images/Bedroom_1_2_A7409783.jpg', // Master Bedroom
      '/images/Bathroom_1_A7409733.jpg', // Freestanding Soaking Tub
      '/images/Balcony_1_A7409752.jpg'  // Private Balcony
    ],
    specs: {
      guests: 5,
      bedrooms: 2,
      beds: 3,
      bathrooms: 2
    },
    basePrice: 320,
    cleaningFee: 95,
    serviceFeePercent: 6,
    rating: 5.0,
    reviewCount: 5,
    amenities: [
      'Freestanding Soaking Tub',
      'Gas Kitchen',
      'Master Ensuite with Shower',
      'Private Balcony',
      'Free 5G WiFi',
      'Smart TV with Streaming Apps',
      'Nespresso Coffee Machine',
      'Blender for Smoothies',
      'Brita Filtered Water',
      'Yoga Mat',
      'Portable Baby Cot',
      'Hotel-Quality Bed Linens & Towels',
      '1 Undercover Parking Space',
      'Professionally Cleaned',
      'Self Check-In',
      'Sleeps 5 (with fold-out sofa bed)'
    ],
    shortName: 'Zetland Sanctuary',
    shortCode: 'ZET'
  },
  {
    id: 'sydney-penthouse',
    name: 'The Zetland Premier Residence',
    tagline: 'Sophisticated 3-bedroom luxury in the heart of Zetland.',
    description: 'An exceptional 3-bedroom residence featuring designer interiors, spa bathroom amenities, and seamless connection to Zetland\'s vibrant community.',
    longDescription: 'Welcome to The Zetland Premier Residence, a meticulously designed 3-bedroom home that epitomizes modern luxury living. Located in one of Sydney\'s most sought-after neighborhoods, this residence showcases premium finishes, bespoke furniture, and curated artwork throughout. Each bedroom features premium mattresses and hotel-quality linens. The master ensuite is a spa sanctuary with heated floors, a soaking tub, and rainfall shower. The open-plan living and dining area flows through to a chef\'s kitchen equipped with premium appliances. This is the perfect base for discerning travelers seeking authentic urban living with five-star comfort.',
    bannerImage: '/images/Dining_1_A7409622.jpg',
    images: [
      '/images/Living_room_2_A7409642.jpg', // Living Room
      '/images/Dining_1_A7409622.jpg', // Dining Area
      '/images/Kitchen_3_A7409667.jpg', // Kitchen
      '/images/Bedroom_1_3_A7409692.jpg', // Bedroom
      '/images/Bathroom_2_A7409712.jpg'  // Luxury Bathroom
    ],
    specs: {
      guests: 6,
      bedrooms: 3,
      beds: 3,
      bathrooms: 2.5
    },
    basePrice: 450,
    cleaningFee: 120,
    serviceFeePercent: 6,
    rating: 5.0,
    reviewCount: 5,
    amenities: [
      'Spa Ensuite With Heated Floors',
      'Soaking Tub & Rainfall Shower',
      'Nespresso Coffee Machine',
      'Premium European Kitchen',
      'Smart Home Integration',
      'Video Intercom & Secure Entry',
      'Dedicated Laundry Room',
      'Air Conditioning',
      'Premium Frette Linens',
      'Concierge-Style Service'
    ],
    shortName: 'Zetland Premier',
    shortCode: 'ZEP'
  },
  {
    id: 'urban-oasis',
    name: 'The Zetland Studio Retreat',
    tagline: 'Contemporary elegance for the discerning solo traveler.',
    description: 'A sleek 1-bedroom studio apartment in Zetland, perfect for professionals and couples seeking minimalist luxury with modern convenience.',
    longDescription: 'The Zetland Studio Retreat is a masterclass in sophisticated minimalism. This contemporary 1-bedroom apartment combines smart design with premium finishes to create an intimate urban sanctuary. High ceilings and large windows flood the space with natural light, while curated modern furnishings create a gallery-like ambiance. The spa ensuite features heated floors and a rainfall shower, while the compact kitchen is fully equipped for culinary enthusiasts. A dedicated workspace makes it ideal for remote professionals. Close to Zetland\'s cafe culture and shopping precinct, with easy access to Surry Hills and inner-west attractions.',
    bannerImage: '/images/Bedroom_1_3_A7409692.jpg',
    images: [
      '/images/Bedroom_1_3_A7409692.jpg', // Bedroom
      '/images/Bathroom_3_A7409727.jpg', // Bathroom
      '/images/Kitchen_1_A7409632.jpg', // Kitchen
      '/images/Office_desk_1_A7409788.jpg', // Workspace
      '/images/Chillout_1_A7409657.jpg'  // Relaxation Area
    ],
    specs: {
      guests: 2,
      bedrooms: 1,
      beds: 1,
      bathrooms: 1
    },
    basePrice: 220,
    cleaningFee: 70,
    serviceFeePercent: 6,
    rating: 5.0,
    reviewCount: 5,
    amenities: [
      'Heated Bathroom Floors',
      'Premium Rainfall Shower',
      'Fully Equipped Kitchen',
      'Espresso Machine',
      'High-Speed Wi-Fi',
      'Dedicated Workspace',
      'Smart Climate Control',
      'Streaming Services Included',
      'Luxury Bedding',
      'Premium Toiletries'
    ],
    shortName: 'Zetland Studio',
    shortCode: 'ZST'
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g1',
    url: '/images/updated-7409637.jpg',
    title: 'Living Room',
    category: 'All',
    alt: 'Sophisticated living area with modern finishes'
  },
  {
    id: 'g2',
    url: '/images/Kitchen_1_A7409632.jpg',
    title: 'Modern Kitchen',
    category: 'All',
    alt: 'Premium fitted kitchen with quality appliances'
  },
  {
    id: 'g3',
    url: '/images/Dining_1_A7409622.jpg',
    title: 'Dining Area',
    category: 'All',
    alt: 'Elegant dining space with quality furnishings'
  },
  {
    id: 'g4',
    url: '/images/Bedroom_1_2_A7409783.jpg',
    title: 'Master Bedroom',
    category: 'All',
    alt: 'Luxurious master suite with premium bedding'
  },
  {
    id: 'g5',
    url: '/images/Bedroom_1_3_A7409692.jpg',
    title: 'Guest Bedroom',
    category: 'All',
    alt: 'Comfortable guest bedroom'
  },
  {
    id: 'g6',
    url: '/images/Bathroom_1_A7409733.jpg',
    title: 'Luxury Bathroom',
    category: 'All',
    alt: 'Spa-like bathroom with freestanding soaking tub'
  },
  {
    id: 'g7',
    url: '/images/Bathroom_3_A7409727.jpg',
    title: 'Guest Bathroom',
    category: 'All',
    alt: 'Elegant guest bathroom'
  },
  {
    id: 'g8',
    url: '/images/Office_desk_1_A7409788.jpg',
    title: 'Workspace',
    category: 'All',
    alt: 'Dedicated office desk for remote work'
  },
  {
    id: 'g9',
    url: '/images/Balcony_1_A7409752.jpg',
    title: 'Private Balcony',
    category: 'All',
    alt: 'Peaceful outdoor balcony space'
  },
  {
    id: 'g10',
    url: '/images/Chillout_1_A7409657.jpg',
    title: 'Relaxation Area',
    category: 'All',
    alt: 'Comfortable retreat space'
  }
];

export const LOCAL_RECOMMENDATIONS: Recommendation[] = [
  {
    id: 'rec1',
    category: 'dining',
    name: 'Redwood Grind Cafe',
    description: 'The absolute finest micro-roasted coffee in the valley. Grab their legendary lavender oat latte and freshly baked sourdough cardamom buns.',
    distance: '0.4 miles',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=600&q=80',
    address: '102 Forestry Rd, Valley Crest'
  },
  {
    id: 'rec2',
    category: 'dining',
    name: 'The Hearth Hearthwood Bistro',
    description: 'An intimate farm-to-table dining experience centered around a massive open-hearth wood grill. Local wines, organic vegetables, and dry-aged steaks.',
    distance: '1.2 miles',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80',
    address: '44 Creek Bed Dr, Redwood Valley'
  },
  {
    id: 'rec3',
    category: 'nature',
    name: 'Whispering Creek Hiking Loop',
    description: 'A magical, easy 3.2-mile trail wandering through ancient redwoods, creek crossings, and hidden fern grottoes. Excellent for early morning forest bathing.',
    distance: '0.2 miles (Trailhead)',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=600&q=80',
    address: 'Creek Trailhead Parking'
  },
  {
    id: 'rec4',
    category: 'culture',
    name: 'The Foundry Modern Art Space',
    description: 'A converted iron forge showcasing local ceramicists, timber sculptors, and abstract landscape painters. Hosts a public wine social every Thursday night.',
    distance: '2.5 miles',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=600&q=80',
    address: '800 Industrial Blvd, District 4'
  },
  {
    id: 'rec5',
    category: 'nature',
    name: 'Overlook Point Summit',
    description: 'Climb a brief but steep rocky staircase to reach the highest point in the county. Delivers sweeping 360-degree sunset views of the coast and forest canyons.',
    distance: '4.1 miles',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80',
    address: 'Summit Ridge Fire Road'
  },
  {
    id: 'rec6',
    category: 'essentials',
    name: 'Organic Provisions Market',
    description: 'Independent cooperative market packed with fresh local produce, artisan local cheeses, fresh seafood, natural body products, and curated wines.',
    distance: '0.8 miles',
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80',
    address: '15 Main St, Valley Crest'
  },
  {
    id: 'rec-syd1',
    category: 'dining',
    name: 'The Bennelong Opera House',
    description: 'Bespoke multi-course fine dining under the white structural sails of the Sydney Opera House. Immersive architectural grandeur paired with spectacular local seafood.',
    distance: '0.8 miles',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80',
    address: 'Bennelong Point, Sydney NSW'
  },
  {
    id: 'rec-syd2',
    category: 'dining',
    name: 'Single O Surry Hills',
    description: 'Renowned pioneers of the Sydney specialty coffee movement. Try their micro-roasted cold drip brews and house-baked sourdough pastries in a warm urban lane.',
    distance: '1.5 miles',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=600&q=80',
    address: '60-64 Reservoir St, Surry Hills'
  },
  {
    id: 'rec-syd3',
    category: 'nature',
    name: 'Royal Botanic Garden Sydney',
    description: 'An expansive 74-hectare heritage park wrapping around Sydney Harbour. Walk along the waterfront sea walls and discover thousands of rare botanical specimens.',
    distance: '0.5 miles',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=600&q=80',
    address: 'Mrs Macquaries Rd, Sydney NSW'
  },
  {
    id: 'rec-syd4',
    category: 'culture',
    name: 'Art Gallery of New South Wales',
    description: 'A beautiful classical pavilion and the newly unveiled modern wing, featuring a stellar, world-class collection of Aboriginal, Torres Strait Islander, and modern European artworks.',
    distance: '1.1 miles',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=600&q=80',
    address: 'Art Gallery Rd, Sydney NSW'
  }
];

export const REVIEWS: Review[] = [
  {
    id: 'rev1',
    authorName: 'Evelyn Carter',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    stayDate: 'June 2026',
    rating: 5,
    comment: 'The Redwood Haven is absolutely magical. The sound of the wind through the tall trees, the wood-fired cedar hot tub at dusk, and the incredibly cozy linens made it the best getaway of my year. Complete attention to design detail!',
    propertyName: 'The Redwood Haven Cabin'
  },
  {
    id: 'rev2',
    authorName: 'Marcus Bennett',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    stayDate: 'May 2026',
    rating: 5,
    comment: 'I am a designer and I was blown away by the Urban Oasis Loft. The concrete counters, the hanging plant foliage, and the vintage bicycles provided were impeccable. The standing desk was amazing for getting some focus work done, too.',
    propertyName: 'The Urban Oasis Loft'
  },
  {
    id: 'rev3',
    authorName: 'Siddharth Nair',
    authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    stayDate: 'July 2026',
    rating: 5,
    comment: 'Exceptional hosts and an unmatched direct booking experience! No ridiculous extra platform markup, and the custom guidebook recommendations led us to our favorite restaurant and trailhead of our trip. Will be booking directly here again.',
    propertyName: 'The Redwood Haven Cabin'
  },
  {
    id: 'rev4',
    authorName: 'Charlotte Sinclair',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    stayDate: 'April 2026',
    rating: 5,
    comment: 'Staying at Scaffas Sydney Penthouse was an extraordinary luxury experience. Waking up to the golden sunrise over the Opera House sails and soaking in the private rooftop plunge pool was unforgettable. The attention to detail is pristine.',
    propertyName: 'The Scaffas Sydney Harbour Penthouse'
  }
];

export const FAQS: FAQ[] = [
  {
    id: 'faq1',
    question: 'How do I complete my check-in and check-out?',
    answer: 'We use premium secure keyless electronic locks on all our stays. You will receive an email and SMS with your unique custom access code 24 hours prior to check-in. Standard check-in is at 4:00 PM and check-out is at 11:00 AM, allowing our cleaning staff to perfectly prepare the properties.'
  },
  {
    id: 'faq2',
    question: 'What are the benefits of booking directly on this website instead of Airbnb?',
    answer: 'Direct bookings avoid high platform service markups, saving you between 10% to 15% on your total reservation. We also offer standard early check-in priority (subject to availability) and custom organic coffee samples as a thank-you gift for direct booking guests.'
  },
  {
    id: 'faq3',
    question: 'Is fast internet and remote work support available?',
    answer: 'Yes! Both properties feature exceptional internet coverage. The Redwood Haven uses high-speed Starlink satellite, and the Urban Oasis has dedicated high-speed fiber (600+ Mbps). Both feature dedicated work chairs, comfortable task desks, and power hookups.'
  },
  {
    id: 'faq4',
    question: 'Are pets allowed at the properties?',
    answer: 'To preserve the premium organic materials and accommodate guests with severe allergies, we maintain a strictly no-pets policy at the Urban Oasis Loft. We do accept up to one well-behaved dog at the Redwood Haven Cabin for an additional $50 sanitizing fee, provided they are declared during booking.'
  },
  {
    id: 'faq5',
    question: 'What is your refund and cancellation policy?',
    answer: 'Direct booking stays receive a full 100% refund for cancellations made up to 14 days before scheduled check-in. Cancellations between 14 days and 7 days receive a 50% refund. Cancellations inside 7 days are non-refundable, but we will happily issue a credit for a future stay if we are able to re-book the dates.'
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'post-1',
    title: 'The Philosophy of Forest Bathing: Crafting Homes in Nature',
    excerpt: 'How we design spaces that harmonize with their natural surroundings rather than compete with them. An inside look at the architecture of Redwood Haven.',
    category: 'Architecture',
    date: 'June 12, 2026',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80',
    content: `At Scaffas Homes, our design ethos has always been centered around the idea of architectural honesty and natural integration. When we first envisioned The Redwood Haven, our goal wasn't to build a structure that stood out from the forest, but one that felt like an extension of it.

### The A-Frame Dialogue
The choice of an A-frame structure was deliberate. The soaring angles match the vertical rhythm of the coastal redwoods, channeling rainwater and snowmelt naturally, while drawing the eyes upward toward the canopy. By using floor-to-ceiling glass on the front facade, we created a living mural that shifts with the light from dawn till dusk.

### Local Cedar & Raw Steel
Every piece of cedar used in our hot tubs and decks was sourced from local sustainable mills. Cedar releases a deep, therapeutic aroma when heated, blending beautifully with the crisp morning mountain air. We accented the soft wood with raw blackened steel brackets and a Nordic wood-burning stove to ground the design in industrial strength while celebrating organic warmth.

### Creating Thresholds
The secret to forest living is the 'threshold'—the transition between inside and outside. We crafted a 12-foot wide sliding deck door that completely disappears when opened, turning the living area and the wrap-around deck into a single contiguous space. This allows our guests to practice true 'forest bathing' without leaving the comfort of premium Italian linens.`,
    author: {
      name: 'Julian Scaffa',
      role: 'Principal Architect & Founder',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
    }
  },
  {
    id: 'post-2',
    title: 'Curating the Perfect Industrial Loft: Botanical Cohesion',
    excerpt: 'How plants, historic red brick, and warm amber lighting create a restorative botanical sanctuary in the center of the bustling Arts District.',
    category: 'Interiors',
    date: 'May 28, 2026',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1530745342582-0795f23ec976?auto=format&fit=crop&w=1200&q=80',
    content: `Urban spaces often feel isolated from life. To combat the cold, sterile nature of city lofts, we designed the Urban Oasis Loft as an study in 'botanical industrialism'—blending soaring 15-foot concrete structures with deep living greens.

### Softening the Hard Edges
Historic warehouses have a beautiful, rugged soul—exposed brick, rusted steel sash windows, and solid concrete pillars. To balance these masculine, rigid elements, we introduced over 80 organic specimens of lush foliage. Pothos vines cascade from high steel crossbeams, while large-leafed Fiddle Leaf Figs and Monstera plants sit in hand-poured terracotta planters, bringing a soft organic texture to the hard concrete floors.

### The Power of Amber Lighting
One of the most overlooked design components is light temperature. Standard cool white lighting can destroy the mood of an industrial space. At the Urban Oasis, we use warm 2200K amber lighting, dimmers, and custom brass fixtures to recreate a fireplace-like glow after sunset. It turns a large warehouse volume into an incredibly intimate, golden evening sanctuary.

### Curated Mid-Century Modern Pieces
To avoid clutter, we handpicked a select few original mid-century Danish furniture items. A vintage wool sofa, raw oak coffee tables, and high-quality local ceramics from the neighborhood district. Every piece is functional, beautiful, and leaves generous physical and visual breathing space for our guests.`,
    author: {
      name: 'Clara Scaffa',
      role: 'Head of Curated Interiors',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80'
    }
  },
  {
    id: 'post-3',
    title: 'The Art of Slow Living: Reclaiming Luxury in Travel',
    excerpt: 'Why direct booking and slow travel have become the ultimate luxury in our high-speed digital lives, and how we foster true mindfulness.',
    category: 'Slow Travel',
    date: 'April 14, 2026',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80',
    content: `Modern tourism is often as hectic as the routines we are trying to escape. From tight itineraries to constant notifications, we travel at the same manic speed we work. At Scaffas Homes, we advocate for a different philosophy: slow travel.

### Reclaiming the Morning Ritual
In our homes, we do not provide typical capsule coffee machines. Instead, we equip our kitchens with La Marzocco espresso makers and local artisanal coffee beans. We invite our guests to slow down, grind their own coffee, steam their own milk, and turn the morning beverage into an active 15-minute sensory ritual. 

### Zero-Markup Direct Connections
Slow living starts with how you book. When you book directly on our website, you are bypass major tech conglomerates and their heavy markups. It establishes a direct relationship between host and traveler, ensuring a highly personalized check-in experience and allowing us to reinvest those fees directly back into organic bath products and sustainable energy systems.

### Curating Moments, Not Checklists
Instead of recommending 50 tourist spots, we provide a guide of six highly curated local experiences—from a quiet lavender-infused cafe to a secluded forest bathing trail parking. We believe that spending an entire afternoon reading a book under a redwood canopy or listening to vinyl records on a turntable delivers a infinitely more restorative holiday than a packed sightseeing itinerary.`,
    author: {
      name: 'Julian Scaffa',
      role: 'Principal Architect & Founder',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
    }
  }
];
