
import React from "react";
import { User } from "lucide-react";

type VideoPlayerProps = {
  id: string;
  username: string;
  isVideoOff: boolean;
  isMicMuted: boolean;
  isLocal?: boolean;
};

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  id,
  username,
  isVideoOff,
  isMicMuted,
  isLocal = false,
}) => {
  return (
    <div className="relative h-full w-full rounded-xl overflow-hidden border border-gray-200 bg-gray-100">
      {isVideoOff ? (
        <div className="h-full w-full flex flex-col items-center justify-center">
          <div className="bg-blue-100 h-20 w-20 rounded-full flex items-center justify-center">
            <User className="h-10 w-10 text-blue-500" />
          </div>
          <span className="text-sm font-medium text-gray-700 mt-2">{username}</span>
        </div>
      ) : (
        <>
          <div className="absolute inset-0 bg-gray-800">
            {/* This would be a real video element in a real application */}
            <div className="h-full w-full flex items-center justify-center text-white">
              {isLocal ? "Your Camera" : `${username}'s Camera`}
            </div>
          </div>
          <div className="absolute bottom-3 left-3 bg-black/50 rounded-lg px-3 py-1 text-sm text-white flex items-center space-x-2">
            <span>{username} {isLocal && "(You)"}</span>
            {isMicMuted && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4 text-red-400"
              >
                <line x1="1" y1="1" x2="23" y2="23" />
                <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6" />
                <path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23" />
                <line x1="12" y1="19" x2="12" y2="23" />
                <line x1="8" y1="23" x2="16" y2="23" />
              </svg>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default VideoPlayer;
