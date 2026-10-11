export interface MenuItem {
  id: string;
  name: string;
  subtitle?: string;
  origin?: string;
  description: string;
  price: number;
  category: 'pourover' | 'signature' | 'bakery' | 'discovery';
  tag?: string;
  isAiRecipe?: boolean;
  image?: string;
  imageAlt?: string;
  brewMethod?: string;
  matchScore?: string;
  sensoryProfile?: {
    acidity: number;
    body: number;
    sweetness: number;
    roast: number;
    acidityLabel?: string;
    bodyLabel?: string;
    sweetnessLabel?: string;
    roastLabel?: string;
    dialInNote?: string;
  };
  pairing?: {
    name: string;
    note: string;
    price: number;
    image: string;
  };
}

export interface CartItem {
  id: string;
  menuItem: MenuItem;
  quantity: number;
  milk?: 'Oat' | 'Whole' | 'Almond' | 'None';
  sweetness?: '0%' | '50%' | '100%';
  customNotes?: string;
}

export interface BrewMilestone {
  step: number;
  title: string;
  description: string;
  status: 'completed' | 'in_progress' | 'pending';
  timeNote?: string;
  progressPercent?: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  patronName: string;
  location: string;
  channel: 'espresso' | 'pourover' | 'bakery' | 'curbside';
  itemsSummary: string;
  details: string;
  guestDelightProfile?: string;
  eta: string;
  status: 'brewing' | 'ready' | 'completed' | 'held';
  timestamp: string;
  milestones?: BrewMilestone[];
  items?: CartItem[];
  totalPrice?: number;
}

export interface Patron {
  id: string;
  name: string;
  avatar: string;
  avatarAlt: string;
  location: string;
  vibe: 'open' | 'focus' | 'break';
  vibeLabel: string;
  currentFocusTitle: string;
  currentFocusDesc: string;
  focusIcon: string;
  tags: string[];
  currentOrder: string;
  actionLabel: string;
  actionIcon: string;
  isCurrentUser?: boolean;
}

export interface RoomTopic {
  id: string;
  author: string;
  location: string;
  timeAgo: string;
  question: string;
  resonantCount: number;
  answerCount: number;
  userResonated?: boolean;
}

export interface Happening {
  id: string;
  day: string;
  time: string;
  period: string;
  badge: string;
  badgeIcon: string;
  badgeType: 'secondary' | 'tertiary';
  title: string;
  description: string;
  actionLabel: string;
  rsvpd?: boolean;
}

export interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  tier: string;
  stampsCount: number;
  stampsTotal: number;
  currentTable: string;
  isTablePresenceVisible: boolean;
  statusMessage: string;
  sensoryPreferences: {
    acidityPreference: number;
    roastDepth: string;
    defaultMilk: 'Oat' | 'Whole' | 'Almond';
    defaultSweetness: '0%' | '50%' | '100%';
    caffeineCurfew: string;
    temperature: 'Standard (142°F)' | 'Extra Hot (155°F)';
  };
  sensoryHistory: {
    origin: string;
    roastDate: string;
    flavorNotes: string[];
    matchPercentage: number;
  }[];
}

export interface CommunityCircle {
  id: string;
  title: string;
  timeLabel: string;
  timeIcon: string;
  spotsLabel: string;
  spotsColor?: string;
  location: string;
  locationIcon: string;
  host: string;
  description: string;
  tags: string[];
  category: 'ai' | 'books' | 'startups' | 'film' | 'games';
  featuredText?: string;
  isSprint?: boolean;
  sprintRemaining?: string;
  sprintPercent?: number;
  ephemeralPass?: string;
  joined?: boolean;
}

export interface InterestTag {
  id: string;
  label: string;
  count: number;
}

export interface PulseFeedback {
  id: string;
  source: string;
  timeAgo: string;
  content: string;
  type: 'sentiment' | 'micro-feedback' | 'acoustic-ai';
  sentimentBadge?: string;
  actionRequired?: boolean;
  actionLabel?: string;
  applied?: boolean;
}

