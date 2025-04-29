import React, { createContext, useState, useContext, useEffect } from 'react';
import { User, AuthContextType } from '../types';

// Create context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => {},
  signup: async () => {},
  logout: async () => {},
  error: null
});

// Mock user data for demo purposes
const MOCK_USERS = [
  {
    id: '1',
    email: 'admin123@gmail.com',
    password: 'admin123',
    displayName: 'Admin User',
    isAdmin: true,
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    email: 'user@campusbuzz.com',
    password: 'user123',
    displayName: 'Regular User',
    isAdmin: false,
    createdAt: new Date().toISOString()
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is already logged in (from localStorage)
    const storedUser = localStorage.getItem('campusBuzzUser');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser) as User;
        setUser(parsedUser);
      } catch (err) {
        console.error('Failed to parse stored user', err);
        localStorage.removeItem('campusBuzzUser');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Find user with matching credentials
      const foundUser = MOCK_USERS.find(
        u => u.email === email && u.password === password
      );
      
      if (!foundUser) {
        throw new Error('Invalid email or password');
      }
      
      // Create user object without password
      const { password: _, ...userWithoutPassword } = foundUser;
      
      // Store in state and localStorage
      setUser(userWithoutPassword as User);
      localStorage.setItem('campusBuzzUser', JSON.stringify(userWithoutPassword));
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, password: string, displayName: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Check if email already exists
      if (MOCK_USERS.some(u => u.email === email)) {
        throw new Error('Email already in use');
      }
      
      // In a real app, we would send this to a backend API
      const newUser = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        password,
        displayName,
        isAdmin: false,
        createdAt: new Date().toISOString()
      };
      
      // For demo purposes, we'll just simulate a successful signup
      const { password: _, ...userWithoutPassword } = newUser;
      
      // Store user in state and localStorage
      setUser(userWithoutPassword as User);
      localStorage.setItem('campusBuzzUser', JSON.stringify(userWithoutPassword));
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Clear user data
      setUser(null);
      localStorage.removeItem('campusBuzzUser');
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        logout,
        error
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using the auth context
export const useAuth = () => useContext(AuthContext);