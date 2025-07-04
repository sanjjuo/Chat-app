"use client";
import { db } from "@/app/_firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { EllipsisVertical, Search } from "lucide-react";
import React from "react";

const ChattingHeader = ({ otherUserChatId }: { otherUserChatId: string }) => {
  const [userData, setUserData] = React.useState<{
    displayName?: string | null;
    photoURL?: string;
  }>({});

  React.useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const findUserWithIdFromDb = doc(db, "users", otherUserChatId);
        const getUser = await getDoc(findUserWithIdFromDb);

        if (getUser.exists()) {
          setUserData(getUser.data());
        } else {
          console.warn("User not found");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    if (otherUserChatId) {
      fetchUserDetails();
    }
  }, [otherUserChatId]);

  return (
    <div className="sticky top-0 z-40 flex items-center justify-between bg-white p-3 rounded-full">
      <div className="flex items-center gap-2">
        <div className="bg-black rounded-full">
          {userData.photoURL ? (
            <img
              src={userData?.photoURL}
              alt="User Avatar"
              width={20}
              height={20}
              className="w-12 h-12 rounded-full"
            />
          ) : (
            <div className="bg-gray-300 rounded-full"></div>
          )}
        </div>
        <div>
          <h3 className="font-semibold text-lg text-black first-letter:uppercase">
            {userData?.displayName}
          </h3>
        </div>
      </div>
      <div className="flex items-center gap-10">
        <Search className="stroke-black" />
        <EllipsisVertical className="stroke-black" />
      </div>
    </div>
  );
};

export default ChattingHeader;
