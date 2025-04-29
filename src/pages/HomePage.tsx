import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Hero from '../components/home/Hero';
import FeaturedEvents from '../components/home/FeaturedEvents';
import CategoryShowcase from '../components/home/CategoryShowcase';

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <FeaturedEvents />
        <CategoryShowcase />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;