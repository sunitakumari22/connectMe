
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CallProvider } from "./context/CallContext";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import VideoRoom from "./pages/VideoRoom";
import Videocall from "./pages/videocall";
import NotFound from "./pages/NotFound";
import RoomPage from "./pages/RoomPage";
import ExploreRooms from "./pages/ExploreRooms";
import JoinedUsers from "./pages/joinedUsers";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <CallProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/room1" element={<VideoRoom />} />
              <Route path="/call" element={<Videocall roomID={""} userID={""} userName={""} />} />
              <Route path="/room" element={<RoomPage />} />
              <Route path="/exploreRooms" element={<ExploreRooms />} />
              <Route path="/joinedUser" element={<JoinedUsers />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </CallProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
