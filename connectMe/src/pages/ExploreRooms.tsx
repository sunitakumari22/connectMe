import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { PlusCircle, Users } from "lucide-react";
import Navbar from "@/components/Navbar";

const ExploreRooms = () => {
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [interest, setInterest] = useState("");
  const [actionType, setActionType] = useState<"create" | "join" | null>(null);

  const handleOpenDialog = (type: "create" | "join") => {
    setActionType(type);
    setOpenDialog(true);
  };



  const handleProceed = () => {
    if (!interest.trim()) return;
    localStorage.setItem("interest", interest);
    if (actionType === "create") {
      navigate("/room", { state: { interest } });
    } else {
      navigate("/joinedUser", { state: { interest } });
    }

    setInterest("");
    setOpenDialog(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <Navbar />

      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-3xl w-full bg-white p-9 rounded-2xl shadow-md">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Welcome to ConnectMe
          </h1>
          <p className="text-center text-gray-600 mb-10">
            Choose an option to get started
          </p>
          <div className="grid sm:grid-cols-2 gap-6">
            <div
              className="bg-blue-50 border border-blue-200 p-6 rounded-xl shadow-sm hover:shadow-lg transition cursor-pointer"
              onClick={() => handleOpenDialog("create")}
            >
              <div className="flex flex-col items-center text-center">
                <PlusCircle className="w-10 h-10 text-blue-500 mb-3" />
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  Create Your Own Room
                </h2>
                <p className="text-gray-600">
                  Set up a new room and invite others to join.
                </p>
              </div>
            </div>

            <div
              className="bg-green-50 border border-green-200 p-6 rounded-xl shadow-sm hover:shadow-lg transition cursor-pointer"
              onClick={() => handleOpenDialog("join")}
            >
              <div className="flex flex-col items-center text-center">
                <Users className="w-10 h-10 text-green-500 mb-3" />
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  Join a Room
                </h2>
                <p className="text-gray-600">
                  Explore rooms created by others and join by interest.
                </p>
              </div>
            </div>
          </div>
        </div>

        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Enter Your Interest</DialogTitle>
            </DialogHeader>
            <Input
              placeholder="e.g., Technology, Music, Sports"
              value={interest}
              onChange={(e) => setInterest(e.target.value)}
            />
            <DialogFooter className="mt-4">
              <Button
                onClick={handleProceed}
                disabled={!interest.trim()}
                className="w-full"
              >
                Continue
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <footer className="bg-gray-50 py-6 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} ConnectMe. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default ExploreRooms;
