import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from 'firebase/auth';
import { firebaseAuthService } from '@/services/firebaseAuthService';
import { IAuthService } from '@/services/IAuthService';

// Define the shape of our context
interface AuthContextType {
  user: User | null;
  isLoadingUser: boolean;
  login: (email: string, password: string) => Promise<User>;
  register: (email: string, password: string) => Promise<User>;
  logout: () => Promise<void>;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Props for the AuthProvider component
interface AuthProviderProps {
  children: ReactNode;
  authService?: IAuthService; // Allow dependency injection for testing
}

/**
 * AuthProvider component that wraps the application and provides auth functionality
 */
export const AuthProvider: React.FC<AuthProviderProps> = ({ 
  children, 
  authService = firebaseAuthService // Default to the firebase implementation
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);

  useEffect(() => {
    // Set up auth state listener when component mounts
    const unsubscribe = authService.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setIsLoadingUser(false);
    });

    // Clean up listener when component unmounts
    return () => unsubscribe();
  }, [authService]);

  // Auth methods that will be exposed through the context
  const login = async (email: string, password: string): Promise<User> => {
    return authService.login(email, password);
  };

  const register = async (email: string, password: string): Promise<User> => {
    return authService.register(email, password);
  };

  const logout = async (): Promise<void> => {
    return authService.logout();
  };

  // Value object that will be provided to consumers of the context
  const value = {
    user,
    isLoadingUser,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * Custom hook to use the auth context
 * @returns Auth context value
 * @throws Error if used outside of AuthProvider
 */
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};