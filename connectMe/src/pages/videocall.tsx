// components/ZegoRoom.tsx
import { useEffect } from 'react';

interface ZegoRoomProps {
  roomID: string;
  userID: string;
  userName: string;
}

const Videocall = ({ roomID, userID, userName }: ZegoRoomProps) => {
  useEffect(() => {
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
    });
  }, [roomID, userID, userName]);

  return <div id="zego-container" style={{ width: '100vw', height: '100vh' }} />;
};

export default Videocall;
