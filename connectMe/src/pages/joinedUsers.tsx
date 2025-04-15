import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
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

    // Don’t proceed if no interest is stored
    if (!interest) {
      setLoading(false);
      return;
    }

    const fetchUsers = async () => {
      try {
        setLoading(true); // make sure loading is set before fetch
        const response = await fetch(
          `https://connect-me-backend.vercel.app/api/joinedUserList/${interest}`
        );
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

  const handleCardClick = (roomID: string) => {
    navigate(`/room?roomID=${roomID}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          People in Joined Rooms According to Your Interest..
        </h1>

        {loading ? (
          <div className="flex justify-center items-center py-24">
            <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow p-6 space-y-4">
            {joinedUsers.length > 0 ? (
              joinedUsers.map((user) => {
                const avatar = `https://i.pravatar.cc/150?u=${user._id || user.name || "guest"}`;
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
                        onError={(e) =>
                          (e.currentTarget.src =
                            "https://via.placeholder.com/150?text=User")
                        }
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
              <p className="text-center text-gray-600">
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
