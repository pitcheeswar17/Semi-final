import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Users } from 'lucide-react';
import { Event } from '../../types';
import { format } from 'date-fns';

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  // Format the date for display
  const formattedDate = format(new Date(event.startDate), 'MMM d, yyyy');
  const formattedTime = format(new Date(event.startDate), 'h:mm a');
  
  // Capacity percentage
  const capacityPercentage = Math.min(Math.round((event.registeredCount / event.capacity) * 100), 100);
  
  return (
    <Link 
      to={`/events/${event.id}`} 
      className={`card district-${event.category} overflow-hidden group`}
    >
      <div className="flex flex-col h-full">
        <div className="relative">
          <img 
            src={event.imageUrl} 
            alt={event.title}
            className="w-full aspect-video object-cover object-center group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-2 right-2 bg-gray-900/70 text-white text-xs px-2 py-1 rounded-full">
            {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
          </div>
          {event.isFeatured && (
            <div className="absolute top-2 left-2 bg-primary-500 text-white text-xs px-2 py-1 rounded-full">
              Featured
            </div>
          )}
        </div>
        
        <div className="p-4 flex flex-col flex-grow">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">{event.title}</h3>
          
          <div className="text-sm text-gray-600 mb-2 flex items-start">
            <Calendar className="h-4 w-4 mr-1 mt-0.5 flex-shrink-0" />
            <div>
              <div>{formattedDate}</div>
              <div>{formattedTime}</div>
            </div>
          </div>
          
          <div className="text-sm text-gray-600 mb-2 flex items-center">
            <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
            <span className="truncate">{event.location}</span>
          </div>
          
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">{event.description}</p>
          
          <div className="mt-auto">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-1 text-gray-500" />
                <span className="text-gray-700">{event.registeredCount}/{event.capacity}</span>
              </div>
              <span className={`text-xs font-medium ${
                capacityPercentage >= 90 ? 'text-red-600' : 
                capacityPercentage >= 70 ? 'text-orange-600' : 
                'text-green-600'
              }`}>
                {capacityPercentage}% Full
              </span>
            </div>
            
            <div className="mt-2 w-full bg-gray-200 rounded-full h-1.5">
              <div 
                className={`h-1.5 rounded-full ${
                  capacityPercentage >= 90 ? 'bg-red-600' : 
                  capacityPercentage >= 70 ? 'bg-orange-500' : 
                  'bg-green-500'
                }`}
                style={{ width: `${capacityPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;