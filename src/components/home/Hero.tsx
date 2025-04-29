import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Award, Users, MapPin, Search } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-primary-800 to-primary-600 text-white">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{ 
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23FFFFFF" fill-opacity="1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          backgroundSize: '60px 60px'
        }}></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left animate-fade-in">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-6">
              Discover the Pulse of Campus Life
            </h1>
            <p className="text-xl md:text-2xl text-primary-100 mb-8 max-w-2xl mx-auto lg:mx-0">
              Your one-stop hub for exploring everything happening on campus, from tech meetups to cultural festivals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link 
                to="/events" 
                className="px-6 py-3 rounded-lg bg-white text-primary-700 font-medium hover:bg-primary-50 transition-colors duration-200 inline-flex items-center justify-center"
              >
                <Search className="mr-2 h-5 w-5" />
                Explore Events
              </Link>
              <Link 
                to="/signup" 
                className="px-6 py-3 rounded-lg bg-transparent border-2 border-white text-white font-medium hover:bg-white/10 transition-colors duration-200 inline-flex items-center justify-center"
              >
                Sign Up for Free
              </Link>
            </div>
          </div>
          
          <div className="hidden lg:block">
            <div className="relative">
              {/* Mockup of event cards */}
              <div className="w-80 h-80 bg-white rounded-xl shadow-2xl transform rotate-6 absolute top-0 right-0 z-20">
                <div className="w-full h-40 bg-tech-500 rounded-t-xl relative overflow-hidden">
                  <div className="absolute top-2 right-2 bg-white/90 text-tech-700 text-xs px-2 py-1 rounded-full">
                    Tech
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg">Hackathon 2025</h3>
                  <div className="flex items-center mt-2 text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>Jun 15, 2025</span>
                  </div>
                  <div className="flex items-center mt-2 text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>Engineering Block</span>
                  </div>
                </div>
              </div>
              
              <div className="w-80 h-80 bg-white rounded-xl shadow-2xl transform -rotate-3 absolute top-12 left-0 z-10">
                <div className="w-full h-40 bg-culture-500 rounded-t-xl relative overflow-hidden">
                  <div className="absolute top-2 right-2 bg-white/90 text-culture-700 text-xs px-2 py-1 rounded-full">
                    Culture
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg">Annual Music Fest</h3>
                  <div className="flex items-center mt-2 text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>Jul 10, 2025</span>
                  </div>
                  <div className="flex items-center mt-2 text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>University Auditorium</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 animate-slide-up">
          <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
            <div className="rounded-full bg-primary-500 w-12 h-12 flex items-center justify-center mb-4">
              <Calendar className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">All Campus Events</h3>
            <p className="text-primary-100">
              Browse and discover events from all categories happening around your campus.
            </p>
          </div>
          
          <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
            <div className="rounded-full bg-primary-500 w-12 h-12 flex items-center justify-center mb-4">
              <Award className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">Vibrant Categories</h3>
            <p className="text-primary-100">
              Explore events in tech, culture, sports, clubs, and workshops with our district-style organization.
            </p>
          </div>
          
          <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
            <div className="rounded-full bg-primary-500 w-12 h-12 flex items-center justify-center mb-4">
              <Users className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">Stay Connected</h3>
            <p className="text-primary-100">
              Register for events, track attendance, and never miss out on what's happening on campus.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;