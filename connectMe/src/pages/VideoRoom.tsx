
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useCall } from '@/context/CallContext';
import VideoControls from '@/components/VideoControls';
import VideoPlayer from '@/components/VideoPlayer';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const VideoRoom = () => {
  const { user } = useAuth();
  const { currentRoom, callState, leaveRoom, toggleMic, toggleVideo, toggleScreenShare } = useCall();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect if no room is selected
    if (!currentRoom) {
      navigate('/dashboard');
    }
    
    // In a real application, this is where you would initialize WebRTC connections
    
    // Cleanup on unmount
    return () => {
      // In a real application, this is where you would clean up WebRTC connections
    };
  }, [currentRoom, navigate]);

  const handleLeaveCall = () => {
    leaveRoom();
    navigate('/dashboard');
  };

  if (!user || !currentRoom) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <header className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLeaveCall}
              className="rounded-full"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-lg font-semibold text-gray-900">{currentRoom.name}</h1>
          </div>
          
          <div className="text-sm text-gray-500">
            {currentRoom.participants.length > 0 
              ? `${currentRoom.participants.length + 1} participants` 
              : '1 participant'}
          </div>
        </div>
      </header>
      
      <main className="flex-1 overflow-hidden p-4 md:p-8">
        <div className="max-w-7xl mx-auto h-full">
          {/* If there are other participants, we'd display them in a grid */}
          {currentRoom.participants.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
              {/* Local user */}
              <div className="h-[300px] md:h-full">
                <VideoPlayer
                  id={user.id}
                  username={user.name}
                  isVideoOff={callState.isVideoOff}
                  isMicMuted={callState.isMicMuted}
                  isLocal={true}
                />
              </div>
              
              {/* Remote user(s) - For demo we'll just show one */}
              <div className="h-[300px] md:h-full">
                <VideoPlayer
                  id="remote-user"
                  username="Remote User"
                  isVideoOff={false}
                  isMicMuted={false}
                  isLocal={false}
                />
              </div>
            </div>
          ) : (
            // Only the local user
            <div className="flex items-center justify-center h-full">
              <div className="w-full max-w-2xl aspect-video">
                <VideoPlayer
                  id={user.id}
                  username={user.name}
                  isVideoOff={callState.isVideoOff}
                  isMicMuted={callState.isMicMuted}
                  isLocal={true}
                />
              </div>
            </div>
          )}
        </div>
      </main>
      
      <footer className="py-6 px-4 flex justify-center">
        <VideoControls
          isMicMuted={callState.isMicMuted}
          isVideoOff={callState.isVideoOff}
          isScreenSharing={callState.isScreenSharing}
          onToggleMic={toggleMic}
          onToggleVideo={toggleVideo}
          onToggleScreenShare={toggleScreenShare}
          onLeaveCall={handleLeaveCall}
        />
      </footer>
    </div>
  );
};

export default VideoRoom;
