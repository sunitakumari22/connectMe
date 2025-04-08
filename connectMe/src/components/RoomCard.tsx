
import React from "react";
import { Users } from "lucide-react";
import { Button } from "@/components/ui/button";

type RoomCardProps = {
  id: string;
  name: string;
  participantCount: number;
  onJoin: (roomId: string) => void;
};

const RoomCard: React.FC<RoomCardProps> = ({
  id,
  name,
  participantCount,
  onJoin,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-semibold text-gray-900">{name}</h3>
        <div className="flex items-center space-x-1 px-2 py-1 bg-blue-50 rounded-full">
          <Users className="h-3 w-3 text-blue-500" />
          <span className="text-xs font-medium text-blue-600">{participantCount}</span>
        </div>
      </div>
      
      <Button
        className="w-full mt-2"
        onClick={() => onJoin(id)}
      >
        Join Room
      </Button>
    </div>
  );
};

export default RoomCard;
