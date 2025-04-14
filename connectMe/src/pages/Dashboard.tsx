import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { useCall } from '@/context/CallContext';
import { Button } from '@/components/ui/button';
import { Video, Phone } from 'lucide-react';
import { toast } from 'sonner';

const Dashboard = () => {
  const { createRoom } = useCall();
  const navigate = useNavigate();

  const startCall = (type: 'video' | 'audio') => {
    const roomName = `${type === 'video' ? 'Video' : 'Audio'}Call-${Math.floor(Math.random() * 10000)}`;
    createRoom(roomName);
    toast.success(`${type === 'video' ? 'Video' : 'Audio'} Call Started`);
    navigate('/exploreRooms'); 
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <Navbar />



      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="max-w-4xl w-full text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Connect with anyone, <span className="text-blue-500">anywhere</span>, in real-time
          </h1>
          
          <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
            High-quality video and audio calls made simple. No downloads required, 
            just connect and communicate instantly.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-16">
          <Button
              onClick={() => startCall('video')}
              className="w-full h-14 text-lg flex items-center justify-center space-x-2"
            >
              <Video className="h-5 w-5" />
              <span>Video Call</span>
            </Button>

            
            <Button
              onClick={() => startCall('audio')}
              variant="outline"
              className="w-full h-14 text-lg flex items-center justify-center space-x-2"
            >
              <Phone className="h-5 w-5" />
              <span>Audio Call</span>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-blue-500"
                >
                  <path d="m15 10-4 4l6 6l4-16l-18 7l4 2l2 6l3-4" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Instant Connect</h3>
              <p className="text-gray-600">
                No downloads needed. Join calls directly from your browser.
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-blue-500"
                >
                  <path d="M7 10v12" />
                  <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Crystal Clear Quality</h3>
              <p className="text-gray-600">
                HD video and audio for a lifelike conversation experience.
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-blue-500"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Secure Calls</h3>
              <p className="text-gray-600">
                End-to-end encryption ensures your conversations stay private.
              </p>
            </div>
          </div>
          
    
        </div>
      </main>

     

<footer className="bg-gray-50 py-6 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} ConnectMe. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
