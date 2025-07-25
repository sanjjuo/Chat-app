import { db } from "@/app/_firebase/firebase";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

export const fetchUserDetails = async (userId: string) => {
  const getUserDetails = doc(db, "users", userId);
  const userRef = await getDoc(getUserDetails);
  if (!userRef.exists()) {
    throw new Error("User not found");
  }
  return userRef.data() as UserData;
};

export const updateUserDetails = async (
  userId: string,
  userDetails: Partial<UserData>
) => {
  const getUserDetails = doc(db, "users", userId);
  await updateDoc(getUserDetails, userDetails);
};

export const addUsers = async (
  currentUserId: string,
  targetUser: UserMessagesList
) => {
  const docRef = doc(db, "users", currentUserId, "usersForChat", targetUser.uid);
  await setDoc(docRef, targetUser);
};
