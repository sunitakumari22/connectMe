
import React from "react";
import { Video, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

type UserCardProps = {
  id: string;
  name: string;
  avatar: string;
  isOnline: boolean;
  onVideoCall: (userId: string) => void;
  onAudioCall: (userId: string) => void;
};

const UserCard: React.FC<UserCardProps> = ({
  id,
  name,
  avatar,
  isOnline,
  onVideoCall,
  onAudioCall,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex items-center justify-between hover:shadow-md transition-shadow">
      <div className="flex items-center space-x-3">
        <div className="relative">
          <img
            src={avatar}
            alt={name}
            className="h-12 w-12 rounded-full object-cover"
          />
          {isOnline && (
            <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white" />
          )}
        </div>
        <div>
          <h3 className="font-medium text-gray-900">{name}</h3>
          <p className="text-sm text-gray-500">
            {isOnline ? "Online" : "Offline"}
          </p>
        </div>
      </div>

      <div className="flex space-x-2">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-green-50 hover:bg-green-100 border-green-200"
          onClick={() => onAudioCall(id)}
        >
          <Phone className="h-4 w-4 text-green-600" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-blue-50 hover:bg-blue-100 border-blue-200"
          onClick={() => onVideoCall(id)}
        >
          <Video className="h-4 w-4 text-blue-600" />
        </Button>
      </div>
    </div>
  );
};

export default UserCard;
