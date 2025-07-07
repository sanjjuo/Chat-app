"use client";
import { db } from "@/app/_firebase/firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import React from "react";
import SearchBar from "../common/SearchBarAndAddUser/SearchBarAndAddUser";
import ProfileComponent from "./ProfileComponent/ProfileComponent";
import UsersChatMessageList from "./UsersChatMessageList/UsersChatMessageList";
import { Plus } from "lucide-react";

const LeftSideComponent = () => {
  const [users, setusers] = React.useState<UserMessagesList[]>([]);
  React.useEffect(() => {
    const fetchUsersList = async () => {
      const q = query(collection(db, "users"), orderBy("createdAt"));
      const querySnapshot = await getDocs(q);
      const fetchedUsers: UserMessagesList[] = querySnapshot.docs.map(
        (user) => {
          const data = user.data();
          return {
            uid: data.uid,
            email: data.email,
            displayName: data.displayName,
            photoURL: data.photoURL,
            createdAt: data.createdAt?.toDate().toLocaleString() || "", // ✅ formatted
          };
        }
      );
      setusers(fetchedUsers);
    };
    fetchUsersList();
  }, []);

  return (
    <div className="flex flex-col relative space-y-5 h-full">
      <div className="flex items-center justify-between gap-2">
        <SearchBar />
        {/* <div className="bg-app-primary w-16 h-14 rounded-full flex items-center justify-center cursor-pointer hover:bg-app-primary/90">
          <Plus className="stroke-white" />
        </div> */}
      </div>
      <div className="bg-white rounded-3xl h-full p-5 overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-app-palePrimary">
        <UsersChatMessageList users={users} />
      </div>
      <ProfileComponent />
    </div>
  );
};

export default LeftSideComponent;
