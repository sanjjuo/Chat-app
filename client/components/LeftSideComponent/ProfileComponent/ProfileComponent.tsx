"use client";
import { useFetchLoginedUserDetails } from "@/services/QueryServices";
import SettingsComponent from "./Settings/Settings";

const ProfileComponent = () => {
  const queryResult = useFetchLoginedUserDetails();
  const { data, isLoading, isError } = queryResult || {};

  if (isLoading) {
    return (
      <div className="sticky bottom-0 bg-white flex items-center justify-between w-full p-3 rounded-full">
        <div className="flex items-center gap-2">
          <div className="bg-gray-200 rounded-full w-14 h-14 animate-pulse"></div>
          <div className="h-6 w-24 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <SettingsComponent />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="sticky bottom-0 bg-white flex items-center justify-between w-full p-3 rounded-full">
        <div className="flex items-center gap-2 text-red-500">
          Error loading user details
        </div>
        <SettingsComponent />
      </div>
    );
  }

  return (
    <div className="sticky bottom-0 bg-white flex items-center justify-between w-full p-3 rounded-full">
      <div className="flex items-center gap-2">
        {data?.photoURL ? (
          <img
            src={data.photoURL}
            alt="User avatar"
            className="w-12 h-12 rounded-full"
          />
        ) : (
          <div className="bg-black rounded-full w-14 h-14"></div>
        )}
        <h4 className="text-lg font-semibold first-letter:uppercase text-black">
          {data?.displayName || "Unknown User"}
        </h4>
      </div>
      <SettingsComponent />
    </div>
  );
};

export default ProfileComponent;
