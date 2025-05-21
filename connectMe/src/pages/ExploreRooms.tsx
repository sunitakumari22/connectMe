import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Select from "react-select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { PlusCircle, Users } from "lucide-react";
import Navbar from "@/components/Navbar";

const interestOptions = [
  { value: "Technology", label: "Technology" },
  { value: "Music", label: "Music" },
  { value: "Sports", label: "Sports" },
  { value: "Gaming", label: "Gaming" },
  { value: "Art", label: "Art" },
  { value: "Education", label: "Education" },
  { value: "Health", label: "Health" },
  { value: "Travel", label: "Travel" },
];

const ExploreRooms = () => {
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedInterest, setSelectedInterest] = useState(null);
  const [actionType, setActionType] = useState<"create" | "join" | null>(null);

  const handleOpenDialog = (type: "create" | "join") => {
    setActionType(type);
    setOpenDialog(true);
  };

  const handleProceed = () => {
    if (!selectedInterest) return;

    localStorage.setItem("interest", selectedInterest.value);

    if (actionType === "create") {
      navigate("/room", { state: { interest: selectedInterest.value } });
    } else {
      navigate("/joinedUser", { state: { interest: selectedInterest.value } });
    }

    setSelectedInterest(null);
    setOpenDialog(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <Navbar />

      <div className="min-h-screen bg-gray-50 flex items-center justify-center ">
        <div className="w-full max-w-4xl bg-white p-6 sm:p-8 rounded-3xl shadow-lg">
          <div className="px-4 sm:px-6 lg:px-8 pt-4">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-[#154734] mb-3">
              Welcome to JabWeMet
            </h1>

            <h2 className="text-sm sm:text-base md:text-lg text-gray-700 font-medium leading-relaxed text-center max-w-4xl mx-auto">
              Choose from two options — join an existing room based on your
              interest, or create your own and invite others. <br />
              <br />
              After selecting an option, you’ll be prompted to pick your area of
              interest. Based on your choice, JabWeMet will either create a
              room for you or show you the list of people who is online and already created rooms.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 pt-3">
            {/* Create Room Card */}
            <div
              className="bg-blue-50 border border-blue-200 p-5 sm:p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer transform hover:scale-[1.01]"
              onClick={() => handleOpenDialog("create")}
            >
              <div className="flex flex-col items-center text-center">
                <PlusCircle className="w-10 h-10 text-blue-600 mb-3" />
                <h2 className="text-lg font-semibold text-gray-800 mb-1">
                  Create Your Own Room
                </h2>
                <p className="text-gray-600 text-sm sm:text-base">
                  Start a new room tailored to your interests and invite others
                  to join.
                </p>
              </div>
            </div>

            {/* Join Room Card */}
            <div
              className="bg-green-50 border border-green-200 p-5 sm:p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer transform hover:scale-[1.01]"
              onClick={() => handleOpenDialog("join")}
            >
              <div className="flex flex-col items-center text-center">
                <Users className="w-10 h-10 text-green-600 mb-3" />
                <h2 className="text-lg font-semibold text-gray-800 mb-1">
                  Join a Room
                </h2>
                <p className="text-gray-600 text-sm sm:text-base">
                  Explore and join active rooms with people who share your
                  interests.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Interest Dialog */}
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent className="sm:max-w-md bg-white rounded-2xl p-6 shadow-lg">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold text-[#154734] text-center">
                Select Your Interest
              </DialogTitle>
            </DialogHeader>

            <Select
              options={interestOptions}
              value={selectedInterest}
              onChange={(option) => setSelectedInterest(option)}
              placeholder="Choose an interest"
              className="mt-4"
            />

            <DialogFooter className="mt-6">
              <Button
                onClick={handleProceed}
                disabled={!selectedInterest}
                className="w-full bg-[#154734] hover:bg-[#1e6041] text-white font-medium py-2"
              >
                Continue
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <footer className="bg-gray-50 py-6 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 text-sm">
          <p>
            &copy; {new Date().getFullYear()} JabWeMet. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ExploreRooms;
