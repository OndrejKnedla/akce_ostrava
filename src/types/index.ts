export interface EventData {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: 'koncert' | 'festival' | 'show';
  date: string;
  time: string;
  endTime?: string;
  venue: Venue;
  description: string;
  image: string;
  gallery: string[];
  tickets: TicketTier[];
  lineup?: Artist[];
  status: 'on-sale' | 'early-bird' | 'last-tickets' | 'sold-out';
  totalCapacity: number;
  ticketsSold: number;
  earlyBirdDeadline?: string;
  featured: boolean;
  faq: FAQItem[];
}

export interface Venue {
  name: string;
  address: string;
  city: string;
  mapQuery: string;
  transport: string;
  image?: string;
}

export interface TicketTier {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  features: string[];
  available: number;
  total: number;
  highlighted?: boolean;
  purchaseUrl: string;
}

export interface Artist {
  name: string;
  genre: string;
  image: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  event: string;
  quote: string;
  rating: number;
}

export interface SocialProofEntry {
  name: string;
  city: string;
  tickets: number;
}
