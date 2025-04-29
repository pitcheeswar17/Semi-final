import React from 'react';
import { Link } from 'react-router-dom';
import { Laptop, Music, Flag, Users, BookOpen } from 'lucide-react';

const CategoryShowcase: React.FC = () => {
  const categories = [
    {
      id: 'tech',
      name: 'Tech Town',
      icon: <Laptop className="h-6 w-6" />,
      color: 'bg-tech-500',
      textColor: 'text-tech-500',
      description: 'Dive into hackathons, coding challenges, and tech talks.',
      image: 'https://images.pexels.com/photos/7096/people-woman-coffee-meeting.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      id: 'culture',
      name: 'Culture Circle',
      icon: <Music className="h-6 w-6" />,
      color: 'bg-culture-500',
      textColor: 'text-culture-500',
      description: 'Catch up with dance battles, music nights, and drama fests.',
      image: 'https://images.pexels.com/photos/2695254/pexels-photo-2695254.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      id: 'sports',
      name: 'Sports Street',
      icon: <Flag className="h-6 w-6" />,
      color: 'bg-sports-500',
      textColor: 'text-sports-500',
      description: 'Track tournaments, matches, and sports registrations.',
      image: 'https://images.pexels.com/photos/1752757/pexels-photo-1752757.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      id: 'club',
      name: 'Club Central',
      icon: <Users className="h-6 w-6" />,
      color: 'bg-club-500',
      textColor: 'text-club-500',
      description: 'Meet student-run clubs, view past highlights, and join your tribe.',
      image: 'https://images.pexels.com/photos/167471/pexels-photo-167471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      id: 'workshop',
      name: 'Workshop Lane',
      icon: <BookOpen className="h-6 w-6" />,
      color: 'bg-workshop-500',
      textColor: 'text-workshop-500',
      description: 'Find skill-building events, guest lectures, and certifications.',
      image: 'https://images.pexels.com/photos/1181605/pexels-photo-1181605.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    }
  ];

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Explore Our Districts</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover events based on your interests, organized into vibrant districts across campus.
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-8">
          {categories.map((category, index) => (
            <div 
              key={category.id}
              className={`bg-white rounded-xl shadow-card overflow-hidden flex flex-col md:flex-row ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
            >
              <div className="md:w-1/2">
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="w-full h-60 md:h-full object-cover"
                />
              </div>
              <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-center">
                <div className={`${category.color} w-12 h-12 rounded-lg flex items-center justify-center text-white mb-4`}>
                  {category.icon}
                </div>
                <h3 className={`text-2xl font-bold mb-2 ${category.textColor}`}>{category.name}</h3>
                <p className="text-gray-600 mb-6">{category.description}</p>
                <Link 
                  to={`/events?category=${category.id}`}
                  className={`
                    inline-flex items-center justify-center px-4 py-2 border border-transparent 
                    text-sm font-medium rounded-md text-white 
                    transition-colors duration-200 self-start
                    ${category.color} hover:bg-opacity-90
                  `}
                >
                  Browse {category.name}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryShowcase;