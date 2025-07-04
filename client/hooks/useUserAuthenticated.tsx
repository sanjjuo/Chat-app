"use client";
import React from "react";

type UserInfo = {
  displayName: string;
  photoURL: string;
  currentUserId: string;
} | null;

export function useUserAuthenticated() {
  const [userInfo, setUserInfo] = React.useState<UserInfo>(null);

  React.useEffect(() => {
    try {
      const storedUser = JSON.parse(
        localStorage.getItem("user-details") ?? "{}"
      );
      if (
        storedUser &&
        storedUser.user?.displayName &&
        storedUser.user?.photoURL &&
        storedUser.user?.uid
      ) {
        setUserInfo({
          displayName: storedUser.user.displayName,
          photoURL: storedUser.user.photoURL,
          currentUserId: storedUser.user.uid
        });
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      setUserInfo(null);
    }
  }, []);

  return { userInfo };
}
