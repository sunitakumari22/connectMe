
import React, { createContext, useContext, useState } from "react";

type Room = {
  id: string;
  name: string;
  participants: string[];
  isActive: boolean;
};

type CallState = {
  isMicMuted: boolean;
  isVideoOff: boolean;
  isScreenSharing: boolean;
};

interface CallContextType {
  rooms: Room[];
  currentRoom: Room | null;
  callState: CallState;
  createRoom: (name: string) => void;
  joinRoom: (roomId: string) => void;
  leaveRoom: () => void;
  toggleMic: () => void;
  toggleVideo: () => void;
  toggleScreenShare: () => void;
}

const CallContext = createContext<CallContextType | undefined>(undefined);

// Mock rooms for demo purposes
const MOCK_ROOMS: Room[] = [
  { id: "room1", name: "Team Meeting", participants: ["1", "2"], isActive: true },
  { id: "room2", name: "Project Discussion", participants: ["3"], isActive: true },
  { id: "room3", name: "Coffee Break", participants: [], isActive: true },
];

export const CallProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [rooms, setRooms] = useState<Room[]>(MOCK_ROOMS);
  const [currentRoom, setCurrentRoom] = useState<Room | null>(null);
  const [callState, setCallState] = useState<CallState>({
    isMicMuted: false,
    isVideoOff: false,
    isScreenSharing: false,
  });

  const createRoom = (name: string) => {
    const newRoom: Room = {
      id: `room-${Date.now()}`,
      name,
      participants: [],
      isActive: true,
    };
    
    setRooms([...rooms, newRoom]);
    setCurrentRoom(newRoom);
  };

  const joinRoom = (roomId: string) => {
    const room = rooms.find(r => r.id === roomId);
    if (room) {
      setCurrentRoom(room);
    }
  };

  const leaveRoom = () => {
    setCurrentRoom(null);
    setCallState({
      isMicMuted: false,
      isVideoOff: false,
      isScreenSharing: false,
    });
  };

  const toggleMic = () => {
    setCallState({
      ...callState,
      isMicMuted: !callState.isMicMuted,
    });
  };

  const toggleVideo = () => {
    setCallState({
      ...callState,
      isVideoOff: !callState.isVideoOff,
    });
  };

  const toggleScreenShare = () => {
    setCallState({
      ...callState,
      isScreenSharing: !callState.isScreenSharing,
    });
  };

  return (
    <CallContext.Provider
      value={{
        rooms,
        currentRoom,
        callState,
        createRoom,
        joinRoom,
        leaveRoom,
        toggleMic,
        toggleVideo,
        toggleScreenShare,
      }}
    >
      {children}
    </CallContext.Provider>
  );
};

export const useCall = () => {
  const context = useContext(CallContext);
  if (context === undefined) {
    throw new Error("useCall must be used within a CallProvider");
  }
  return context;
};
