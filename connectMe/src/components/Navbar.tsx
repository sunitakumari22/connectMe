import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut, User } from "lucide-react";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<any>(null);

  // Read user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("connectme-user");
    if (storedUser) {
      try {
        setCurrentUser(JSON.parse(storedUser));
      } catch (err) {
        console.error("Failed to parse user from localStorage:", err);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("connectme-user");
    setCurrentUser(null);
    navigate("/auth");
  };

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm py-3 px-4 sm:px-6 md:px-8">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5 text-white"
            >
              <path d="m15 10-4 4l6 6l4-16l-18 7l4 2l2 6l3-4" />
            </svg>
          </div>
          <span className="text-xl font-bold text-gray-800">ConnectMe</span>
        </Link>

        <div className="flex items-center space-x-4">
          {currentUser ? (
            <>
              <div className="hidden md:flex items-center space-x-2">
                {/* <img
                  src={currentUser.avatar || "/avatar-placeholder.png"}
                  alt={currentUser.name}
                  className="w-8 h-8 rounded-full object-cover"
                /> */}
                <span className="font-medium text-gray-700">{currentUser.name}</span>
              </div>
              <Button variant="ghost" size="icon" onClick={handleLogout}>
                <LogOut className="h-5 w-5" />
              </Button>
            </>
          ) : (
            <Link to="/auth">
              <Button variant="ghost" className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>Sign In</span>
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
