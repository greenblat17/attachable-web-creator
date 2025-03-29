
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

// Define user type
interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
}

// Define context type
interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

// Create context
const AuthContext = createContext<AuthContextType | null>(null);

// Mock users database for demo
const MOCK_USERS: User[] = [
  {
    id: '1',
    name: 'Журавлёв А.А.',
    email: 'admin@example.com',
    role: 'admin',
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Check if user is already logged in on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Find user with matching email
      const foundUser = MOCK_USERS.find(u => u.email === email);
      
      // In a real app, you would verify the password here
      if (foundUser && password.length >= 6) {
        // Save user to localStorage
        localStorage.setItem('user', JSON.stringify(foundUser));
        setUser(foundUser);
        toast.success('Вход выполнен успешно');
        navigate('/');
      } else {
        toast.error('Неверный email или пароль');
      }
    } catch (error) {
      toast.error('Ошибка при входе');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      setLoading(true);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if user already exists
      const userExists = MOCK_USERS.some(u => u.email === email);
      
      if (userExists) {
        toast.error('Пользователь с таким email уже существует');
        return;
      }
      
      // In a real app, you would create the user in your database
      const newUser: User = {
        id: (MOCK_USERS.length + 1).toString(),
        name,
        email,
        role: 'user',
      };
      
      // Add to mock users (this is just for demo)
      MOCK_USERS.push(newUser);
      
      // Save user to localStorage
      localStorage.setItem('user', JSON.stringify(newUser));
      setUser(newUser);
      
      toast.success('Регистрация успешна');
      navigate('/');
    } catch (error) {
      toast.error('Ошибка при регистрации');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    toast.success('Вы вышли из системы');
    navigate('/login');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
