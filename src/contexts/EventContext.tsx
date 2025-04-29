import React, { createContext, useState, useContext, useEffect } from 'react';
import { Event, EventCategory, EventContextType } from '../types';
import { format } from 'date-fns';

// Mock event data
const MOCK_EVENTS: Event[] = [
  {
    id: '1',
    title: 'Annual Hackathon 2025',
    description: 'Join us for 24 hours of coding, innovation, and fun! Build projects that solve real-world problems.',
    category: 'tech',
    location: 'Engineering Block, Room E101',
    startDate: '2025-03-15T09:00:00',
    endDate: '2025-03-16T09:00:00',
    imageUrl: 'https://images.pexels.com/photos/7096/people-woman-coffee-meeting.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    organizer: 'Computer Science Society',
    isFeatured: true,
    capacity: 150,
    registeredCount: 87,
    createdAt: '2025-02-01T10:00:00',
    updatedAt: '2025-02-05T14:30:00'
  },
  {
    id: '2',
    title: 'Cultural Night 2025',
    description: 'Experience diverse cultures through music, dance, and food. A celebration of our global campus community.',
    category: 'culture',
    location: 'University Auditorium',
    startDate: '2025-04-05T18:00:00',
    endDate: '2025-04-05T22:00:00',
    imageUrl: 'https://images.pexels.com/photos/2695254/pexels-photo-2695254.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    organizer: 'International Students Association',
    isFeatured: true,
    capacity: 500,
    registeredCount: 250,
    createdAt: '2025-02-10T09:15:00',
    updatedAt: '2025-02-12T11:20:00'
  },
  {
    id: '3',
    title: 'Inter-College Basketball Tournament',
    description: 'The annual basketball championship between neighboring colleges. Come support our team!',
    category: 'sports',
    location: 'University Sports Complex',
    startDate: '2025-03-20T10:00:00',
    endDate: '2025-03-22T17:00:00',
    imageUrl: 'https://images.pexels.com/photos/1752757/pexels-photo-1752757.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    organizer: 'Sports Department',
    isFeatured: false,
    capacity: 200,
    registeredCount: 180,
    createdAt: '2025-02-05T14:30:00',
    updatedAt: '2025-02-10T09:45:00'
  },
  {
    id: '4',
    title: 'Photography Club Exhibition',
    description: 'Annual exhibition showcasing the best photographs taken by our club members throughout the year.',
    category: 'club',
    location: 'Art Gallery, Cultural Center',
    startDate: '2025-04-10T10:00:00',
    endDate: '2025-04-12T18:00:00',
    imageUrl: 'https://images.pexels.com/photos/167471/pexels-photo-167471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    organizer: 'Photography Club',
    isFeatured: false,
    capacity: 100,
    registeredCount: 45,
    createdAt: '2025-02-20T11:00:00',
    updatedAt: '2025-02-22T15:20:00'
  },
  {
    id: '5',
    title: 'Resume Building Workshop',
    description: 'Learn how to create an impactful resume that stands out to employers. Bring your laptop and current resume.',
    category: 'workshop',
    location: 'Business School, Room B102',
    startDate: '2025-03-25T14:00:00',
    endDate: '2025-03-25T17:00:00',
    imageUrl: 'https://images.pexels.com/photos/1181605/pexels-photo-1181605.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    organizer: 'Career Development Center',
    isFeatured: true,
    capacity: 50,
    registeredCount: 42,
    createdAt: '2025-02-15T13:00:00',
    updatedAt: '2025-02-18T09:30:00'
  },
  {
    id: '6',
    title: 'AI and Machine Learning Seminar',
    description: 'Industry experts discuss the latest trends in AI and ML and their applications in various fields.',
    category: 'tech',
    location: 'Computer Science Building, Lecture Hall CS-01',
    startDate: '2025-04-15T10:00:00',
    endDate: '2025-04-15T13:00:00',
    imageUrl: 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    organizer: 'AI Research Group',
    isFeatured: false,
    capacity: 120,
    registeredCount: 68,
    createdAt: '2025-02-22T09:45:00',
    updatedAt: '2025-02-25T14:15:00'
  }
];

// Create context
const EventContext = createContext<EventContextType>({
  events: [],
  featuredEvents: [],
  isLoading: true,
  error: null,
  getEventById: () => undefined,
  getEventsByCategory: () => [],
  registerForEvent: async () => {},
  createEvent: async () => {},
  updateEvent: async () => {},
  deleteEvent: async () => {}
});

export const EventProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Set events from mock data
        setEvents(MOCK_EVENTS);
      } catch (err) {
        setError('Failed to fetch events');
        console.error('Error fetching events:', err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchEvents();
  }, []);

  const featuredEvents = events.filter(event => event.isFeatured);

  const getEventById = (id: string) => {
    return events.find(event => event.id === id);
  };

  const getEventsByCategory = (category: EventCategory) => {
    return events.filter(event => event.category === category);
  };

  const registerForEvent = async (eventId: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Update event registeredCount
      setEvents(prevEvents => 
        prevEvents.map(event => 
          event.id === eventId 
            ? { ...event, registeredCount: event.registeredCount + 1 } 
            : event
        )
      );
    } catch (err) {
      setError('Failed to register for event');
      console.error('Error registering for event:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const createEvent = async (eventData: Omit<Event, 'id' | 'createdAt' | 'updatedAt' | 'registeredCount'>) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create new event
      const newEvent: Event = {
        ...eventData,
        id: Math.random().toString(36).substr(2, 9),
        registeredCount: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      // Add to events list
      setEvents(prevEvents => [...prevEvents, newEvent]);
    } catch (err) {
      setError('Failed to create event');
      console.error('Error creating event:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const updateEvent = async (id: string, eventData: Partial<Event>) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Update event
      setEvents(prevEvents => 
        prevEvents.map(event => 
          event.id === id 
            ? { 
                ...event, 
                ...eventData, 
                updatedAt: new Date().toISOString() 
              } 
            : event
        )
      );
    } catch (err) {
      setError('Failed to update event');
      console.error('Error updating event:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteEvent = async (id: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Remove event
      setEvents(prevEvents => prevEvents.filter(event => event.id !== id));
    } catch (err) {
      setError('Failed to delete event');
      console.error('Error deleting event:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <EventContext.Provider
      value={{
        events,
        featuredEvents,
        isLoading,
        error,
        getEventById,
        getEventsByCategory,
        registerForEvent,
        createEvent,
        updateEvent,
        deleteEvent
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

// Custom hook for using the event context
export const useEvents = () => useContext(EventContext);