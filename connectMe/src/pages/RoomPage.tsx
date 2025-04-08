// pages/RoomPage.tsx
import { useSearchParams } from 'react-router-dom';
import Videocall from './videocall';

const RoomPage = () => {
  const [searchParams] = useSearchParams();
  const roomID = searchParams.get('roomID') || `${Math.floor(Math.random() * 10000)}`;
  const userID = `${Math.floor(Math.random() * 10000)}`;
  const userName = `userName${userID}`;

  return <Videocall roomID={roomID} userID={userID} userName={userName} />;
};

export default RoomPage;
