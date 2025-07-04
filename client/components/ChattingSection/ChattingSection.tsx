"use client";
import React from "react";
import ChattingHeader from "./ChattingHeader";
import ChattingInput from "./ChattingInput";
import ChattingPart from "./ChattingPart";
import { socket } from "@/lib/socket";
import { useUserAuthenticated } from "@/hooks/useUserAuthenticated";
import { db } from "@/app/_firebase/firebase";
import {
  addDoc,
  collection,
  getDocs,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";

const ChattingSection = ({ otherUserChatId }: { otherUserChatId: string }) => {
  const [messageInput, setMessageInput] = React.useState("");
  const [messages, setMessages] = React.useState<MessagesTypes[]>([]);
  const { userInfo } = useUserAuthenticated();
  console.log(otherUserChatId);

  const chatBetweenUsers = [otherUserChatId, userInfo?.currentUserId].sort();
  const usersChatsId = chatBetweenUsers.join("_");

  // Fetch old messages from Firestore
  React.useEffect(() => {
    const fetchMessages = async () => {
      const q = query(
        collection(db, "chatsCollection", usersChatsId, "messages"),
        orderBy("timestamp")
      );
      const querySnapshot = await getDocs(q);
      const fetchedMessages: MessagesTypes[] = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        console.log(data);
        return {
          image: data.image || "",
          user: data.user || "",
          message: data.message || "",
          senderId: data.senderId,
          receiverId: data.receiverId,
          timestamp: new Date(),
        };
      });
      setMessages(fetchedMessages);
    };
    if (userInfo?.currentUserId) {
      fetchMessages();
    }
  }, [userInfo?.currentUserId, otherUserChatId]);

  // Send message and save to Firestore
  const sendMessage = async () => {
    if (!userInfo) {
      console.warn("User not loaded yet");
      return;
    }
    const now = new Date();
    if (messageInput.trim() !== "") {
      const newMessage = {
        user: userInfo.displayName,
        image: userInfo.photoURL,
        senderId: userInfo.currentUserId,
        receiverId: otherUserChatId,
        message: messageInput,
        timestamp: now,
      };
      console.log(newMessage);
      socket.emit("chat", newMessage);
      //storing messages between users in chatsCollection db
      await addDoc(
        collection(db, "chatsCollection", usersChatsId, "messages"),
        { ...newMessage, timestamp: serverTimestamp() }
      );

      setMessageInput("");
    }
  };

  // Listen to incoming messages from socket
  React.useEffect(() => {
    socket.on("chat", (message: MessagesTypes) => {
      const chatBetween = [message.senderId, message.receiverId]
        .sort()
        .join("_");
      if (chatBetween === usersChatsId) {
        setMessages((prevMessage) => [...prevMessage, message]);
      }
    });
    return () => {
      socket.off("chat");
    };
  }, [usersChatsId]);

  return (
    <div className="flex flex-col h-full space-y-5">
      <ChattingHeader otherUserChatId={otherUserChatId} />
      <div className="flex-1 overflow-y-auto">
        <ChattingPart messages={messages} />
      </div>
      <ChattingInput
        addMessage={sendMessage}
        input={messageInput}
        setInput={setMessageInput}
      />
    </div>
  );
};

export default ChattingSection;
