import React from 'react';
import { Link } from 'react-router-dom';
import { HomeIcon, AlertTriangle } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow flex items-center justify-center bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full text-center">
          <div className="flex justify-center">
            <AlertTriangle className="h-16 w-16 text-primary-500" />
          </div>
          <h1 className="mt-4 text-3xl font-extrabold text-gray-900 sm:text-5xl">404</h1>
          <p className="mt-2 text-base text-gray-500">Page not found</p>
          <p className="mt-6 text-base text-gray-600">The page you're looking for doesn't exist or has been moved.</p>
          <div className="mt-8">
            <Link to="/" className="btn btn-primary inline-flex items-center">
              <HomeIcon className="h-5 w-5 mr-2" />
              Back to Homepage
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFoundPage;