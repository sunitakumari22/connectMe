import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom"; 

interface User {
  _id: string;
  name: string;
  interest: string;
  roomID: number;
}

const JoinedUsers = () => {
  const [joinedUsers, setJoinedUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("https://connect-me-backend.vercel.app/api/joinedUserList");
        const data = await response.json();
        setJoinedUsers(data);
      } catch (error) {
        console.error("Failed to fetch joined users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleCardClick = (roomID: number) => {
    navigate(`/room?roomID=${roomID}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          People in Joined Rooms
        </h1>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="animate-spin w-8 h-8 text-blue-500" />
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {joinedUsers.length > 0 ? (
              joinedUsers.map((user) => (
                <Card
                  key={user._id}
                  onClick={() => handleCardClick(user.roomID)}
                  className="rounded-2xl shadow-md cursor-pointer hover:shadow-lg transition"
                >
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">{user.name}</h2>
                    <p className="text-gray-600 mb-1">
                      <strong>Interest:</strong> {user.interest}
                    </p>
                    <p className="text-gray-600">
                      <strong>Room ID:</strong> {user.roomID}
                    </p>
                  </CardContent>
                </Card>
              ))
            ) : (
              <p className="text-center text-gray-600 col-span-full">
                No users have joined any rooms yet.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default JoinedUsers;
