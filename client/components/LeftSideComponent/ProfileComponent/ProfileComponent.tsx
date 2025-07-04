"use client";
import { useUserAuthenticated } from "@/hooks/useUserAuthenticated";
import SettingsComponent from "./Settings/Settings";

const ProfileComponent = () => {
  const { userInfo } = useUserAuthenticated();
  return (
    <div className="sticky bottom-0 bg-white flex items-center justify-between w-full p-3 rounded-full">
      <div className="flex items-center gap-2">
        {userInfo?.photoURL ? (
          <img
            src={userInfo?.photoURL}
            alt=""
            className="w-12 h-12 rounded-full"
          />
        ) : (
          <div className="bg-black rounded-full w-14 h-14"></div>
        )}

        <h4 className="text-lg font-semibold first-letter:uppercase text-black">
          {userInfo?.displayName}
        </h4>
      </div>
      <SettingsComponent />
    </div>
  );
};

export default ProfileComponent;
