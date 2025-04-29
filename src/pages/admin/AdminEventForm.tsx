import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { ArrowLeft, Save, Image, AlertTriangle } from 'lucide-react';
import { useEvents } from '../../contexts/EventContext';
import { EventFormData, EventCategory } from '../../types';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';

const AdminEventForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getEventById, createEvent, updateEvent, isLoading } = useEvents();
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  
  // Initialize form data
  const initialFormState: EventFormData = {
    title: '',
    description: '',
    category: 'tech',
    location: '',
    startDate: format(new Date(), "yyyy-MM-dd'T'HH:mm"),
    endDate: format(new Date(new Date().getTime() + 2 * 60 * 60 * 1000), "yyyy-MM-dd'T'HH:mm"),
    imageUrl: 'https://images.pexels.com/photos/7096/people-woman-coffee-meeting.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    organizer: '',
    isFeatured: false,
    capacity: 50
  };
  
  const [formData, setFormData] = useState<EventFormData>(initialFormState);
  
  // Load event data if editing an existing event
  useEffect(() => {
    if (id) {
      const event = getEventById(id);
      if (event) {
        // Format dates for the datetime-local input
        const formattedStartDate = format(new Date(event.startDate), "yyyy-MM-dd'T'HH:mm");
        const formattedEndDate = format(new Date(event.endDate), "yyyy-MM-dd'T'HH:mm");
        
        setFormData({
          ...event,
          startDate: formattedStartDate,
          endDate: formattedEndDate
        });
      }
    }
  }, [id, getEventById]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };
  
  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: parseInt(value, 10) }));
  };
  
  const validateForm = (): boolean => {
    // Check required fields
    if (!formData.title.trim()) {
      setFormError('Title is required');
      return false;
    }
    
    if (!formData.description.trim()) {
      setFormError('Description is required');
      return false;
    }
    
    if (!formData.location.trim()) {
      setFormError('Location is required');
      return false;
    }
    
    if (!formData.organizer.trim()) {
      setFormError('Organizer is required');
      return false;
    }
    
    if (!formData.imageUrl.trim()) {
      setFormError('Image URL is required');
      return false;
    }
    
    // Check dates
    const startDate = new Date(formData.startDate);
    const endDate = new Date(formData.endDate);
    
    if (isNaN(startDate.getTime())) {
      setFormError('Start date is invalid');
      return false;
    }
    
    if (isNaN(endDate.getTime())) {
      setFormError('End date is invalid');
      return false;
    }
    
    if (endDate <= startDate) {
      setFormError('End date must be after start date');
      return false;
    }
    
    // Check capacity
    if (formData.capacity <= 0) {
      setFormError('Capacity must be greater than 0');
      return false;
    }
    
    return true;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    
    if (!validateForm()) {
      return;
    }
    
    setFormSubmitting(true);
    
    try {
      // Convert form dates to ISO strings
      const processedData = {
        ...formData,
        startDate: new Date(formData.startDate).toISOString(),
        endDate: new Date(formData.endDate).toISOString()
      };
      
      if (id) {
        // Update existing event
        await updateEvent(id, processedData);
      } else {
        // Create new event
        await createEvent(processedData);
      }
      
      // Navigate back to admin dashboard
      navigate('/admin');
    } catch (err) {
      setFormError('Failed to save event. Please try again.');
      console.error('Event form submission error:', err);
    } finally {
      setFormSubmitting(false);
    }
  };
  
  // For image preview
  const [previewUrl, setPreviewUrl] = useState<string>(formData.imageUrl);
  
  useEffect(() => {
    setPreviewUrl(formData.imageUrl);
  }, [formData.imageUrl]);
  
  const categoryOptions: { value: EventCategory; label: string }[] = [
    { value: 'tech', label: 'Tech Town' },
    { value: 'culture', label: 'Culture Circle' },
    { value: 'sports', label: 'Sports Street' },
    { value: 'club', label: 'Club Central' },
    { value: 'workshop', label: 'Workshop Lane' }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <button 
              onClick={() => navigate('/admin')}
              className="inline-flex items-center text-gray-600 hover:text-primary-600 transition-colors duration-200"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Admin Dashboard
            </button>
          </div>
          
          <div className="bg-white rounded-xl shadow-card overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h1 className="text-2xl font-bold text-gray-900">
                {id ? 'Edit Event' : 'Create New Event'}
              </h1>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6">
              {formError && (
                <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative flex items-start" role="alert">
                  <AlertTriangle className="h-5 w-5 mr-2 mt-0.5" />
                  <span>{formError}</span>
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="title">
                    Title*
                  </label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    required
                    value={formData.title}
                    onChange={handleChange}
                    className="input"
                    placeholder="Event title"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="description">
                    Description*
                  </label>
                  <textarea
                    name="description"
                    id="description"
                    rows={4}
                    required
                    value={formData.description}
                    onChange={handleChange}
                    className="input"
                    placeholder="Provide a detailed description of the event"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="category">
                    Category*
                  </label>
                  <select
                    name="category"
                    id="category"
                    required
                    value={formData.category}
                    onChange={handleChange}
                    className="input"
                  >
                    {categoryOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="location">
                    Location*
                  </label>
                  <input
                    type="text"
                    name="location"
                    id="location"
                    required
                    value={formData.location}
                    onChange={handleChange}
                    className="input"
                    placeholder="Event location"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="startDate">
                    Start Date & Time*
                  </label>
                  <input
                    type="datetime-local"
                    name="startDate"
                    id="startDate"
                    required
                    value={formData.startDate}
                    onChange={handleChange}
                    className="input"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="endDate">
                    End Date & Time*
                  </label>
                  <input
                    type="datetime-local"
                    name="endDate"
                    id="endDate"
                    required
                    value={formData.endDate}
                    onChange={handleChange}
                    className="input"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="organizer">
                    Organizer*
                  </label>
                  <input
                    type="text"
                    name="organizer"
                    id="organizer"
                    required
                    value={formData.organizer}
                    onChange={handleChange}
                    className="input"
                    placeholder="Name of the organizing department/club"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="capacity">
                    Capacity*
                  </label>
                  <input
                    type="number"
                    name="capacity"
                    id="capacity"
                    required
                    min="1"
                    value={formData.capacity}
                    onChange={handleNumberChange}
                    className="input"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="imageUrl">
                    Image URL*
                  </label>
                  <input
                    type="url"
                    name="imageUrl"
                    id="imageUrl"
                    required
                    value={formData.imageUrl}
                    onChange={handleChange}
                    className="input"
                    placeholder="https://example.com/image.jpg"
                  />
                  
                  <div className="mt-2 flex items-center">
                    <div className="relative h-32 w-32 overflow-hidden rounded border border-gray-200">
                      {previewUrl ? (
                        <img 
                          src={previewUrl} 
                          alt="Event preview" 
                          className="h-full w-full object-cover" 
                          onError={() => setPreviewUrl('')}
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gray-100">
                          <Image className="h-8 w-8 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <p className="ml-4 text-xs text-gray-500">
                      Preview of your event image. Make sure the URL is accessible.
                    </p>
                  </div>
                </div>
                
                <div className="md:col-span-2">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="isFeatured"
                      id="isFeatured"
                      checked={formData.isFeatured}
                      onChange={handleCheckboxChange}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <label htmlFor="isFeatured" className="ml-2 block text-sm text-gray-700">
                      Feature this event on the homepage
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 flex justify-end">
                <button
                  type="button"
                  onClick={() => navigate('/admin')}
                  className="btn btn-secondary mr-4"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={formSubmitting || isLoading}
                  className="btn btn-primary"
                >
                  {formSubmitting ? (
                    <span className="flex items-center">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      {id ? 'Saving...' : 'Creating...'}
                    </span>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      {id ? 'Save Changes' : 'Create Event'}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminEventForm;