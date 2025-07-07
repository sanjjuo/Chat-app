"use client";
import { useFetchOtherUserDetails } from "@/services/QueryServices";

const UserProfileDetails = ({
  otherUserChatId,
}: {
  otherUserChatId: string;
}) => {
  const { data } = useFetchOtherUserDetails(otherUserChatId);

  return (
    <div className="h-[550px] flex flex-col items-center justify-center border-b-2">
      {data?.photoURL ? (
        <img
          src={data.photoURL}
          alt="profile-image"
          className="w-40 h-40 mb-5"
        />
      ) : (
        <div className="bg-app-secondary w-40 h-40 rounded-full"></div>
      )}

      <div className="text-center">
        <h1 className="text-3xl font-bold first-letter:uppercase text-app-primary">
          {data?.displayName}
        </h1>
        <p className="text-app-primary text-xl">{data?.description}</p>
      </div>
    </div>
  );
};

export default UserProfileDetails;
