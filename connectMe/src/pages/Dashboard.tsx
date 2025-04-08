
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import UserCard from '@/components/UserCard';
import RoomCard from '@/components/RoomCard';
import { useAuth } from '@/context/AuthContext';
import { useCall } from '@/context/CallContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Plus, Users } from 'lucide-react';
import { toast } from 'sonner';

// Mock users for demo
const MOCK_USERS = [
  { id: "1", name: "John Doe", avatar: "https://ui-avatars.com/api/?name=John+Doe&background=60A5FA&color=fff", isOnline: true },
  { id: "2", name: "Jane Smith", avatar: "https://ui-avatars.com/api/?name=Jane+Smith&background=60A5FA&color=fff", isOnline: true },
  { id: "3", name: "Alex Johnson", avatar: "https://ui-avatars.com/api/?name=Alex+Johnson&background=60A5FA&color=fff", isOnline: false },
  { id: "4", name: "Olivia Wilson", avatar: "https://ui-avatars.com/api/?name=Olivia+Wilson&background=60A5FA&color=fff", isOnline: true },
];

const Dashboard = () => {
  const { user } = useAuth();
  const { rooms, createRoom, joinRoom } = useCall();
  const navigate = useNavigate();
  
  const [isCreateRoomOpen, setIsCreateRoomOpen] = useState(false);
  const [newRoomName, setNewRoomName] = useState('');

  const filteredUsers = MOCK_USERS.filter(u => user && u.id !== user.id);

  const handleCreateRoom = () => {
    if (!newRoomName.trim()) {
      toast.error('Please enter a room name');
      return;
    }
    
    createRoom(newRoomName);
    setNewRoomName('');
    setIsCreateRoomOpen(false);
    navigate('/room');
  };

  const handleJoinRoom = (roomId: string) => {
    joinRoom(roomId);
    navigate('/room');
  };

  const handleVideoCall = (userId: string) => {
    // In a real app, this would initiate a call with the specific user
    const user = MOCK_USERS.find(u => u.id === userId);
    createRoom(`Call with ${user?.name || 'User'}`);
    navigate('/room');
  };

  const handleAudioCall = (userId: string) => {
    // In a real app, this would initiate an audio-only call
    const user = MOCK_USERS.find(u => u.id === userId);
    createRoom(`Call with ${user?.name || 'User'}`);
    navigate('/room');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 max-w-6xl mx-auto">
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-800">Active Rooms</h2>
              <Button onClick={() => setIsCreateRoomOpen(true)} className="flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>Create Room</span>
              </Button>
            </div>
            
            {rooms.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {rooms.map((room) => (
                  <RoomCard
                    key={room.id}
                    id={room.id}
                    name={room.name}
                    participantCount={room.participants.length}
                    onJoin={handleJoinRoom}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-blue-500" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Active Rooms</h3>
                <p className="text-gray-500 mb-4">
                  Create a new room to start a conversation or join an existing one.
                </p>
                <Button onClick={() => setIsCreateRoomOpen(true)}>
                  Create Room
                </Button>
              </div>
            )}
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Contacts</h2>
            <div className="grid grid-cols-1 gap-3">
              {filteredUsers.map((user) => (
                <UserCard
                  key={user.id}
                  id={user.id}
                  name={user.name}
                  avatar={user.avatar}
                  isOnline={user.isOnline}
                  onVideoCall={handleVideoCall}
                  onAudioCall={handleAudioCall}
                />
              ))}
            </div>
          </section>
        </div>
      </main>
      
      <Dialog open={isCreateRoomOpen} onOpenChange={setIsCreateRoomOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Room</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 py-4">
            <label htmlFor="roomName" className="block text-sm font-medium text-gray-700">
              Room Name
            </label>
            <Input
              id="roomName"
              placeholder="Team Meeting"
              value={newRoomName}
              onChange={(e) => setNewRoomName(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateRoomOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateRoom}>
              Create Room
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;
