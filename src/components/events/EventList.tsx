import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { EventCategory, Event } from '../../types';
import EventCard from './EventCard';

interface EventListProps {
  events: Event[];
  title?: string;
}

const EventList: React.FC<EventListProps> = ({ events, title = "Events" }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<EventCategory | 'all'>('all');
  
  // Filter events based on search term and category
  const filteredEvents = events.filter(event => {
    const matchesSearch = 
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.organizer.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  const categoryOptions: { value: EventCategory | 'all'; label: string }[] = [
    { value: 'all', label: 'All Categories' },
    { value: 'tech', label: 'Tech Town' },
    { value: 'culture', label: 'Culture Circle' },
    { value: 'sports', label: 'Sports Street' },
    { value: 'club', label: 'Club Central' },
    { value: 'workshop', label: 'Workshop Lane' }
  ];

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-3xl font-bold mb-6">{title}</h2>
        
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="input pl-10"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="relative md:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Filter className="h-5 w-5 text-gray-400" />
            </div>
            <select
              className="input pl-10 appearance-none"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as EventCategory | 'all')}
            >
              {categoryOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      {filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 border border-dashed border-gray-300 rounded-lg">
          <p className="text-gray-600">No events found matching your criteria.</p>
          <button 
            className="mt-4 btn btn-secondary" 
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('all');
            }}
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default EventList;