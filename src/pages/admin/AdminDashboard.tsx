import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { PlusCircle, Search, Edit, Trash2, AlertTriangle, ChevronUp, ChevronDown } from 'lucide-react';
import { useEvents } from '../../contexts/EventContext';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';

const AdminDashboard: React.FC = () => {
  const { events, isLoading, deleteEvent } = useEvents();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [sortConfig, setSortConfig] = useState<{
    key: 'title' | 'startDate' | 'category' | 'registeredCount';
    direction: 'ascending' | 'descending';
  }>({ key: 'startDate', direction: 'ascending' });
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [eventToDelete, setEventToDelete] = useState<string | null>(null);
  
  // Filter events based on search term
  const filteredEvents = events.filter(event => 
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.organizer.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Sort events
  const sortedEvents = [...filteredEvents].sort((a, b) => {
    if (sortConfig.key === 'startDate') {
      const dateA = new Date(a.startDate).getTime();
      const dateB = new Date(b.startDate).getTime();
      return sortConfig.direction === 'ascending' ? dateA - dateB : dateB - dateA;
    } else if (sortConfig.key === 'registeredCount') {
      return sortConfig.direction === 'ascending' 
        ? a.registeredCount - b.registeredCount 
        : b.registeredCount - a.registeredCount;
    } else {
      const valueA = a[sortConfig.key].toLowerCase();
      const valueB = b[sortConfig.key].toLowerCase();
      if (valueA < valueB) return sortConfig.direction === 'ascending' ? -1 : 1;
      if (valueA > valueB) return sortConfig.direction === 'ascending' ? 1 : -1;
      return 0;
    }
  });
  
  const handleSort = (key: 'title' | 'startDate' | 'category' | 'registeredCount') => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };
  
  const confirmDelete = (id: string) => {
    setEventToDelete(id);
    setShowDeleteModal(true);
  };
  
  const handleDelete = async () => {
    if (eventToDelete) {
      setIsDeleting(eventToDelete);
      try {
        await deleteEvent(eventToDelete);
      } catch (err) {
        console.error('Failed to delete event:', err);
      } finally {
        setIsDeleting(null);
        setEventToDelete(null);
        setShowDeleteModal(false);
      }
    }
  };
  
  const toggleEventDetails = (id: string) => {
    setSelectedEvent(selectedEvent === id ? null : id);
  };
  
  const getSortIcon = (key: 'title' | 'startDate' | 'category' | 'registeredCount') => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'ascending' ? 
      <ChevronUp className="h-4 w-4" /> : 
      <ChevronDown className="h-4 w-4" />;
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4 sm:mb-0">Admin Dashboard</h1>
            <Link 
              to="/admin/events/new" 
              className="btn btn-primary"
            >
              <PlusCircle className="h-5 w-5 mr-2" />
              Create New Event
            </Link>
          </div>
          
          <div className="bg-white rounded-xl shadow-card overflow-hidden mb-8">
            <div className="p-6">
              <div className="relative mb-6">
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
              
              {isLoading ? (
                <div className="animate-pulse space-y-4">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="h-16 bg-gray-200 rounded"></div>
                  ))}
                </div>
              ) : (
                <>
                  {sortedEvents.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              <button 
                                className="flex items-center space-x-1 focus:outline-none"
                                onClick={() => handleSort('title')}
                              >
                                <span>Title</span>
                                {getSortIcon('title')}
                              </button>
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              <button 
                                className="flex items-center space-x-1 focus:outline-none"
                                onClick={() => handleSort('category')}
                              >
                                <span>Category</span>
                                {getSortIcon('category')}
                              </button>
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              <button 
                                className="flex items-center space-x-1 focus:outline-none"
                                onClick={() => handleSort('startDate')}
                              >
                                <span>Date</span>
                                {getSortIcon('startDate')}
                              </button>
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              <button 
                                className="flex items-center space-x-1 focus:outline-none"
                                onClick={() => handleSort('registeredCount')}
                              >
                                <span>Registrations</span>
                                {getSortIcon('registeredCount')}
                              </button>
                            </th>
                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {sortedEvents.map(event => (
                            <React.Fragment key={event.id}>
                              <tr 
                                className={`hover:bg-gray-50 cursor-pointer transition-colors duration-150 ${selectedEvent === event.id ? 'bg-gray-50' : ''}`}
                                onClick={() => toggleEventDetails(event.id)}
                              >
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="flex items-center">
                                    <div className="h-10 w-1 rounded bg-{event.category}-500 mr-3"></div>
                                    <div className="text-sm font-medium text-gray-900">{event.title}</div>
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-${event.category}-100 text-${event.category}-800`}>
                                    {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                                  </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {format(new Date(event.startDate), 'MMM d, yyyy')}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {event.registeredCount} / {event.capacity}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                  <div className="flex justify-end space-x-2" onClick={(e) => e.stopPropagation()}>
                                    <Link 
                                      to={`/admin/events/edit/${event.id}`}
                                      className="text-primary-600 hover:text-primary-900"
                                    >
                                      <Edit className="h-5 w-5" />
                                    </Link>
                                    <button 
                                      onClick={() => confirmDelete(event.id)}
                                      className="text-red-600 hover:text-red-900"
                                      disabled={isDeleting === event.id}
                                    >
                                      {isDeleting === event.id ? (
                                        <div className="h-5 w-5 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                                      ) : (
                                        <Trash2 className="h-5 w-5" />
                                      )}
                                    </button>
                                  </div>
                                </td>
                              </tr>
                              {selectedEvent === event.id && (
                                <tr className="bg-gray-50">
                                  <td colSpan={5} className="px-6 py-4">
                                    <div className="text-sm text-gray-700">
                                      <p className="font-semibold mb-2">Description:</p>
                                      <p className="mb-3">{event.description}</p>
                                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div>
                                          <p className="font-semibold">Location:</p>
                                          <p>{event.location}</p>
                                        </div>
                                        <div>
                                          <p className="font-semibold">Organizer:</p>
                                          <p>{event.organizer}</p>
                                        </div>
                                        <div>
                                          <p className="font-semibold">Featured:</p>
                                          <p>{event.isFeatured ? 'Yes' : 'No'}</p>
                                        </div>
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              )}
                            </React.Fragment>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-center py-10">
                      <p className="text-gray-500 mb-2">No events found</p>
                      {searchTerm && (
                        <button 
                          onClick={() => setSearchTerm('')}
                          className="text-primary-600 hover:text-primary-800"
                        >
                          Clear search
                        </button>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
      
      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6 animate-fade-in">
            <div className="flex items-center text-red-600 mb-4">
              <AlertTriangle className="h-6 w-6 mr-2" />
              <h3 className="text-lg font-bold">Confirm Deletion</h3>
            </div>
            <p className="mb-6">
              Are you sure you want to delete this event? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="btn btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="btn btn-danger"
                disabled={isDeleting !== null}
              >
                {isDeleting !== null ? (
                  <span className="flex items-center">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Deleting...
                  </span>
                ) : (
                  'Delete Event'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;