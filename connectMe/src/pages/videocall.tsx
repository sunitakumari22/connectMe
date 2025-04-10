
import { useEffect, useRef } from 'react';

interface ZegoRoomProps {
  roomID: string;
  userID: string;
  userName: string;
}

const Videocall = ({ roomID, userID, userName }: ZegoRoomProps) => {
  const hasJoinedRef = useRef(false);

  useEffect(() => {
    if (hasJoinedRef.current) return; // Prevent repeat joins
    hasJoinedRef.current = true;

    const appID = 1519482038;
    const serverSecret = "29e077ec94a89f5ba7b6d19ccdafd7f1";

    const kitToken = (window as any).ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomID,
      userID,
      userName
    );

    const zp = (window as any).ZegoUIKitPrebuilt.create(kitToken);

    zp.joinRoom({
      container: document.getElementById("zego-container"),
      sharedLinks: [
        {
          name: 'Personal link',
          url: `${window.location.protocol}//${window.location.host}/room?roomID=${roomID}`,
        },
      ],
      scenario: {
        mode: (window as any).ZegoUIKitPrebuilt.VideoConference,
      },
      turnOnMicrophoneWhenJoining: true,
      turnOnCameraWhenJoining: true,
      showMyCameraToggleButton: true,
      showMyMicrophoneToggleButton: true,
      showAudioVideoSettingsButton: true,
      showScreenSharingButton: true,
      showTextChat: true,
      showUserList: true,
      maxUsers: 50,
      layout: "Sidebar",
      showLayoutButton: true,

      onLeaveRoom: async () => {
        try {
          await fetch(`https://connect-me-backend.vercel.app/api/deleteJoinedUserByRoom/${roomID}`, {
            method: 'DELETE',
          });
          console.log("Deleted user from room on leave");
        } catch (error) {
          console.error("Failed to delete user on leave:", error);
        }
      },
    });
  }, [roomID, userID, userName]);

  return <div id="zego-container" style={{ width: '100vw', height: '100vh' }} />;
};

export default Videocall;

