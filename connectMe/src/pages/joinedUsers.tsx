import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface User {
  _id: string;
  name: string;
  interest: string;
  roomID: string; 
}

const JoinedUsers = () => {
  const [joinedUsers, setJoinedUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const interest = localStorage.getItem("interest");
    if (!interest) return; 

    const fetchUsers = async () => {
      try {
        const response = await fetch(
          `https://connect-me-backend.vercel.app/api/joinedUserList/${interest}`
        );
        const data = await response.json();
        console.log("Fetched users:", data); 
        setJoinedUsers(data);
      } catch (error) {
        console.error("Failed to fetch joined users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleCardClick = (roomID: string) => {
    navigate(`/room?roomID=${roomID}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          People in Joined Rooms
        </h1>
      <div className="bg-white rounded-xl shadow p-6 space-y-4">
  {joinedUsers.length > 0 ? (
    joinedUsers.map((user) => {
      const avatar =  `https://i.pravatar.cc/150?u=${user._id}`;
      return (
        <div
          key={user._id}
          className="flex items-center justify-between border-b border-gray-200 py-4"
        >
          <div className="flex items-center gap-4">
            <img
              src={avatar}
              alt={user.name}
              className="w-14 h-14 rounded-full object-cover border border-gray-300"
            />
            <div>
              <h2 className="text-lg font-semibold text-gray-800">{user.name}</h2>
              <p className="text-sm text-gray-600">
                <strong>Interest:</strong> {user.interest}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Room ID:</strong> {user.roomID}
              </p>
            </div>
          </div>
          <button
            onClick={() => handleCardClick(user.roomID)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
          >
            Join
          </button>
        </div>
      );
    })
  ) : (
    <p className="text-center text-gray-600">No users have joined any rooms yet.</p>
  )}
</div>
</div>

    </div>
  );
};

export default JoinedUsers;
