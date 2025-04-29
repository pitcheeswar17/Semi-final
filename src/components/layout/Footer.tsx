import React from 'react';
import { Link } from 'react-router-dom';
import { School, Mail, Instagram, Twitter, Facebook } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center">
              <School className="h-8 w-8 text-primary-400" />
              <span className="ml-2 text-xl font-bold">CampusBuzz</span>
            </Link>
            <p className="mt-2 text-sm text-gray-400">
              Your one-stop interactive hub for discovering everything happening on campus!
            </p>
            <div className="mt-4 flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors duration-200">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors duration-200">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors duration-200">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase">Explore</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/events" className="text-gray-400 hover:text-primary-400 transition-colors duration-200">All Events</Link>
              </li>
              <li>
                <Link to="/events" className="text-gray-400 hover:text-primary-400 transition-colors duration-200">Tech Town</Link>
              </li>
              <li>
                <Link to="/events" className="text-gray-400 hover:text-primary-400 transition-colors duration-200">Culture Circle</Link>
              </li>
              <li>
                <Link to="/events" className="text-gray-400 hover:text-primary-400 transition-colors duration-200">Sports Street</Link>
              </li>
              <li>
                <Link to="/events" className="text-gray-400 hover:text-primary-400 transition-colors duration-200">Club Central</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase">Account</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/login" className="text-gray-400 hover:text-primary-400 transition-colors duration-200">Login</Link>
              </li>
              <li>
                <Link to="/signup" className="text-gray-400 hover:text-primary-400 transition-colors duration-200">Sign Up</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase">Contact</h3>
            <ul className="mt-4 space-y-2">
              <li className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-gray-400" />
                <a href="mailto:info@campusbuzz.com" className="text-gray-400 hover:text-primary-400 transition-colors duration-200">
                  info@campusbuzz.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} CampusBuzz. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-4">
            <Link to="#" className="text-sm text-gray-400 hover:text-primary-400 transition-colors duration-200">
              Privacy Policy
            </Link>
            <Link to="#" className="text-sm text-gray-400 hover:text-primary-400 transition-colors duration-200">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;