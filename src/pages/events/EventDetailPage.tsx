import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { Calendar, Clock, MapPin, User, Users, Share2, ArrowLeft } from 'lucide-react';
import { useEvents } from '../../contexts/EventContext';
import { useAuth } from '../../contexts/AuthContext';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';

const EventDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getEventById, registerForEvent, isLoading } = useEvents();
  const { isAuthenticated, user } = useAuth();
  const [registering, setRegistering] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  
  const event = id ? getEventById(id) : undefined;
  
  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow bg-gray-50 py-12">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
              <div className="h-64 bg-gray-300 rounded-xl mb-6"></div>
              <div className="space-y-3">
                <div className="h-6 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  if (!event) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow bg-gray-50 py-12">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Event Not Found</h2>
            <p className="text-gray-600 mb-8">The event you're looking for doesn't exist or has been removed.</p>
            <button 
              onClick={() => navigate('/events')}
              className="btn btn-primary"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Events
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  const formattedStartDate = format(new Date(event.startDate), 'EEEE, MMMM d, yyyy');
  const formattedStartTime = format(new Date(event.startDate), 'h:mm a');
  const formattedEndTime = format(new Date(event.endDate), 'h:mm a');
  
  // Check if the event is full
  const isFull = event.registeredCount >= event.capacity;
  
  // Calculate progress percentage for capacity
  const capacityPercentage = Math.min(Math.round((event.registeredCount / event.capacity) * 100), 100);
  
  const handleRegister = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    if (isFull) return;
    
    setRegistering(true);
    try {
      await registerForEvent(event.id);
      setRegistrationSuccess(true);
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setRegistrationSuccess(false);
      }, 3000);
    } catch (err) {
      console.error('Failed to register:', err);
    } finally {
      setRegistering(false);
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow bg-gray-50 pt-6 pb-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back button */}
          <div className="mb-6">
            <button 
              onClick={() => navigate('/events')}
              className="inline-flex items-center text-gray-600 hover:text-primary-600 transition-colors duration-200"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Events
            </button>
          </div>
          
          {/* Event header */}
          <div className={`p-6 rounded-t-xl bg-${event.category}-500 text-white`}>
            <div className="flex flex-col md:flex-row md:justify-between md:items-center">
              <h1 className="text-3xl font-bold mb-4 md:mb-0">{event.title}</h1>
              {user?.isAdmin && (
                <button
                  onClick={() => navigate(`/admin/events/edit/${event.id}`)}
                  className="btn bg-white text-gray-800 hover:bg-gray-100"
                >
                  Edit Event
                </button>
              )}
            </div>
          </div>
          
          {/* Event image */}
          <div className="relative">
            <img 
              src={event.imageUrl} 
              alt={event.title}
              className="w-full aspect-video object-cover object-center"
            />
            <div className="absolute top-4 right-4">
              <button 
                className="p-2 bg-white rounded-full shadow-lg text-gray-700 hover:text-primary-600 transition-colors duration-200"
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  alert('Link copied to clipboard!');
                }}
              >
                <Share2 className="h-5 w-5" />
              </button>
            </div>
          </div>
          
          {/* Event details */}
          <div className="bg-white rounded-b-xl shadow-card p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="prose max-w-none">
                  <h2 className="text-2xl font-bold mb-4">About this event</h2>
                  <p className="text-gray-700">{event.description}</p>
                  
                  <h3 className="text-xl font-bold mt-8 mb-4">Organizer</h3>
                  <div className="flex items-start">
                    <User className="h-5 w-5 text-gray-500 mt-1 mr-2" />
                    <div>
                      <p className="font-medium">{event.organizer}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="lg:col-span-1">
                <div className="bg-gray-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold mb-4">Event Details</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <Calendar className="h-5 w-5 text-gray-500 mt-1 mr-3" />
                      <div>
                        <p className="font-medium">Date</p>
                        <p className="text-gray-600">{formattedStartDate}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Clock className="h-5 w-5 text-gray-500 mt-1 mr-3" />
                      <div>
                        <p className="font-medium">Time</p>
                        <p className="text-gray-600">{formattedStartTime} - {formattedEndTime}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 text-gray-500 mt-1 mr-3" />
                      <div>
                        <p className="font-medium">Location</p>
                        <p className="text-gray-600">{event.location}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Users className="h-5 w-5 text-gray-500 mt-1 mr-3" />
                      <div>
                        <p className="font-medium">Capacity</p>
                        <p className="text-gray-600">
                          {event.registeredCount} / {event.capacity} registered
                        </p>
                        <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
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
                  
                  {/* Registration button */}
                  <div className="mt-6">
                    <button
                      onClick={handleRegister}
                      disabled={isFull || registering}
                      className={`w-full btn ${
                        isFull ? 'bg-gray-400 cursor-not-allowed' : 'btn-primary'
                      }`}
                    >
                      {registering ? (
                        <span className="flex items-center justify-center">
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                          Processing...
                        </span>
                      ) : isFull ? (
                        'Event Full'
                      ) : (
                        'Register Now'
                      )}
                    </button>
                    
                    {registrationSuccess && (
                      <div className="mt-3 text-center text-green-600 bg-green-50 p-2 rounded animate-fade-in">
                        Registration successful!
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default EventDetailPage;