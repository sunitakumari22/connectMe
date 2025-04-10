import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Videocall from './videocall';

const storedUser = JSON.parse(localStorage.getItem("connectme-user") || "{}");

const RoomPage = () => {
  const [searchParams] = useSearchParams();
  const roomID = searchParams.get('roomID') || `${Math.floor(Math.random() * 10000)}`;
  const userID = `${Math.floor(Math.random() * 10000)}`;

  const interest = localStorage.getItem("interest") || 'General';

  useEffect(() => {
    const joinedRoomInfo = {
      roomID,
      name: storedUser.name,
      interest,
    };

    localStorage.setItem("connectme-joined", JSON.stringify(joinedRoomInfo));

    const sendJoinedUser = async () => {
      try {
        const response = await fetch("https://connect-me-backend.vercel.app/api/newJoinedUser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(joinedRoomInfo),
        });

        const result = await response.json();
        console.log("User joined saved:", result);
      } catch (error) {
        console.error("Error sending joined user:", error);
      }
    };

    sendJoinedUser();
  }, [roomID, interest]);

  return <Videocall roomID={roomID} userID={userID} userName={storedUser.name} />;
};

export default RoomPage;
