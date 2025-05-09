
import React, { createContext, useContext, useState, useEffect } from 'react';

// User type definition
export type UserRole = 'student' | 'teacher';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

// Auth context type
interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  register: (name: string, email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create provider
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem('gyaan-user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Login function
  const login = async (email: string, password: string, role: UserRole): Promise<void> => {
    setLoading(true);
    
    // Simulate API call
    try {
      // For demo purposes, we'll just check if email contains "teacher" or "student"
      // In a real app, this would be a real authentication call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Create a mock user
      const newUser: User = {
        id: Math.random().toString(36).substring(2, 9),
        name: email.split('@')[0],
        email,
        role
      };
      
      // Save user to local storage
      localStorage.setItem('gyaan-user', JSON.stringify(newUser));
      setUser(newUser);
    } catch (error) {
      console.error('Login failed:', error);
      throw new Error('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Register function
  const register = async (name: string, email: string, password: string, role: UserRole): Promise<void> => {
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Create a new user
      const newUser: User = {
        id: Math.random().toString(36).substring(2, 9),
        name,
        email,
        role
      };
      
      // Save user to local storage
      localStorage.setItem('gyaan-user', JSON.stringify(newUser));
      setUser(newUser);
    } catch (error) {
      console.error('Registration failed:', error);
      throw new Error('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('gyaan-user');
    setUser(null);
  };

  // Check if user is authenticated
  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
