"use client";
import { db } from "@/app/_firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import React from "react";

const UserProfileDetails = ({
  otherUserChatId,
}: {
  otherUserChatId: string;
}) => {
  const [userData, setUserData] = React.useState<UserData | null>(null);
  console.log(userData);

  React.useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const findUserWithIdFromDb = doc(db, "users", otherUserChatId );
        const getUser = await getDoc(findUserWithIdFromDb);

        if (getUser.exists()) {
          const data = getUser.data();
          setUserData({
            displayName: data.displayName ?? "",
            photoURL: data.photoURL ?? "",
            description: data.description ?? "",
            createdAt: data.createdAt ?? null,
            email: data.email ?? "",
            uid: data.uid ?? "",
          });
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
    <div className="h-[550px] flex flex-col items-center justify-center border-b-2">
      {userData?.photoURL ? (
        <img
          src={userData.photoURL}
          alt="profile-image"
          className="w-40 h-40 mb-5"
        />
      ) : (
        <div className="bg-app-secondary w-40 h-40 rounded-full"></div>
      )}

      <div className="text-center">
        <h1 className="text-3xl font-bold first-letter:uppercase text-app-primary">
          {userData?.displayName}
        </h1>
        <p className="text-app-primary text-xl">{userData?.description}</p>
      </div>
    </div>
  );
};

export default UserProfileDetails;
