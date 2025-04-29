import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { PlusCircle } from 'lucide-react';
import { EventCategory } from '../../types';
import { useEvents } from '../../contexts/EventContext';
import { useAuth } from '../../contexts/AuthContext';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import EventList from '../../components/events/EventList';

const EventsPage: React.FC = () => {
  const { events, isLoading, getEventsByCategory } = useEvents();
  const { isAuthenticated } = useAuth();
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') as EventCategory | null;
  
  const displayEvents = categoryParam ? getEventsByCategory(categoryParam) : events;
  const categoryTitle = categoryParam ? 
    getCategoryTitle(categoryParam) : 
    'All Events';

  // Helper function to get a nice title for each category
  function getCategoryTitle(category: EventCategory): string {
    const titles: Record<EventCategory, string> = {
      tech: 'Tech Town',
      culture: 'Culture Circle',
      sports: 'Sports Street',
      club: 'Club Central',
      workshop: 'Workshop Lane'
    };
    return titles[category];
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">{categoryTitle}</h1>
            {isAuthenticated && (
              <Link 
                to="/events/new"
                className="btn btn-primary inline-flex items-center"
              >
                <PlusCircle className="h-5 w-5 mr-2" />
                Create Event
              </Link>
            )}
          </div>
          
          {isLoading ? (
            <div className="animate-pulse">
              <div className="space-y-6">
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <div key={i} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3].map(j => (
                      <div key={j} className="rounded-xl overflow-hidden shadow">
                        <div className="h-48 bg-gray-300"></div>
                        <div className="p-4">
                          <div className="h-6 bg-gray-200 rounded mb-3"></div>
                          <div className="h-4 bg-gray-200 rounded mb-2"></div>
                          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <EventList 
              events={displayEvents} 
              title={categoryTitle}
            />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default EventsPage;