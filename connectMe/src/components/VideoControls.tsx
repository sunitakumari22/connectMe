
import React from "react";
import { Mic, MicOff, Video, VideoOff, Phone, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

type VideoControlsProps = {
  isMicMuted: boolean;
  isVideoOff: boolean;
  isScreenSharing: boolean;
  onToggleMic: () => void;
  onToggleVideo: () => void;
  onToggleScreenShare: () => void;
  onLeaveCall: () => void;
};

const VideoControls: React.FC<VideoControlsProps> = ({
  isMicMuted,
  isVideoOff,
  isScreenSharing,
  onToggleMic,
  onToggleVideo,
  onToggleScreenShare,
  onLeaveCall,
}) => {
  return (
    <div className="flex items-center justify-center space-x-4 bg-white py-4 px-6 rounded-full shadow-lg border border-gray-100">
      <Button
        variant="outline"
        size="icon"
        className={`rounded-full ${
          isMicMuted ? "bg-red-100 text-red-600 hover:bg-red-200" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
        onClick={onToggleMic}
      >
        {isMicMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
      </Button>
      
      <Button
        variant="outline"
        size="icon"
        className={`rounded-full ${
          isVideoOff ? "bg-red-100 text-red-600 hover:bg-red-200" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
        onClick={onToggleVideo}
      >
        {isVideoOff ? <VideoOff className="h-5 w-5" /> : <Video className="h-5 w-5" />}
      </Button>
      
      <Button
        variant="outline"
        size="icon"
        className={`rounded-full ${
          isScreenSharing ? "bg-blue-100 text-blue-600 hover:bg-blue-200" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
        onClick={onToggleScreenShare}
      >
        <Share2 className="h-5 w-5" />
      </Button>
      
      <Button
        size="icon"
        className="bg-red-500 hover:bg-red-600 rounded-full"
        onClick={onLeaveCall}
      >
        <Phone className="h-5 w-5 rotate-135" />
      </Button>
    </div>
  );
};

export default VideoControls;
