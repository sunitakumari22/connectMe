
import React, { createContext, useContext, useState, useEffect } from "react";

type User = {
  id: string;
  name: string;
  avatar: string;
  isOnline: boolean;
};

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo purposes
const MOCK_USERS = [
  { id: "1", name: "John Doe", email: "john@example.com", password: "password", avatar: "https://ui-avatars.com/api/?name=John+Doe&background=60A5FA&color=fff", isOnline: true },
  { id: "2", name: "Jane Smith", email: "jane@example.com", password: "password", avatar: "https://ui-avatars.com/api/?name=Jane+Smith&background=60A5FA&color=fff", isOnline: true },
  { id: "3", name: "Alex Johnson", email: "alex@example.com", password: "password", avatar: "https://ui-avatars.com/api/?name=Alex+Johnson&background=60A5FA&color=fff", isOnline: true },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Check if user is already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        localStorage.removeItem("user");
      }
    }
  }, []);

  const login = async (email: string, password: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Find user with matching credentials
    const mockUser = MOCK_USERS.find(user => user.email === email && user.password === password);
    
    if (!mockUser) {
      throw new Error("Invalid email or password");
    }

    const { password: _, email: __, ...userWithoutCredentials } = mockUser;
    
    // Store user in local storage and state
    localStorage.setItem("user", JSON.stringify(userWithoutCredentials));
    setUser(userWithoutCredentials);
    setIsAuthenticated(true);
  };

  const signup = async (name: string, email: string, password: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user already exists
    if (MOCK_USERS.some(user => user.email === email)) {
      throw new Error("User with this email already exists");
    }

    // Create new user
    const newUser = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      email,
      password,
      avatar: `https://ui-avatars.com/api/?name=${name.replace(" ", "+")}&background=60A5FA&color=fff`,
      isOnline: true,
    };
    
    // In a real app, you would save this to a database
    // MOCK_USERS.push(newUser);
    
    const { password: _, email: __, ...userWithoutCredentials } = newUser;
    
    // Store user in local storage and state
    localStorage.setItem("user", JSON.stringify(userWithoutCredentials));
    setUser(userWithoutCredentials);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
