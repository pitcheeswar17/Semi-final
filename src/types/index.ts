// User Types
export type User = {
  id: string;
  email: string;
  displayName: string;
  isAdmin: boolean;
  createdAt: string;
};

export type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, displayName: string) => Promise<void>;
  logout: () => Promise<void>;
  error: string | null;
};

// Event Types
export type EventCategory = 'tech' | 'culture' | 'sports' | 'club' | 'workshop';

export type Event = {
  id: string;
  title: string;
  description: string;
  category: EventCategory;
  location: string;
  startDate: string;
  endDate: string;
  imageUrl: string;
  organizer: string;
  isFeatured: boolean;
  capacity: number;
  registeredCount: number;
  createdAt: string;
  updatedAt: string;
};

export type EventContextType = {
  events: Event[];
  featuredEvents: Event[];
  isLoading: boolean;
  error: string | null;
  getEventById: (id: string) => Event | undefined;
  getEventsByCategory: (category: EventCategory) => Event[];
  registerForEvent: (eventId: string) => Promise<void>;
  createEvent: (event: Omit<Event, 'id' | 'createdAt' | 'updatedAt' | 'registeredCount'>) => Promise<void>;
  updateEvent: (id: string, event: Partial<Event>) => Promise<void>;
  deleteEvent: (id: string) => Promise<void>;
};

// For form handling
export type EventFormData = Omit<Event, 'id' | 'createdAt' | 'updatedAt' | 'registeredCount'>;