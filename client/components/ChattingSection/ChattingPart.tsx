"use client";
import React from "react";
import ReceiveMessageBubble from "./MessageBubbles/ReceiveMessageBubble";
import SendMessageBubble from "./MessageBubbles/SendMessageBubble";
import { cn } from "@/lib/utils";
import { useUserAuthenticated } from "@/hooks/useUserAuthenticated";

const ChattingPart = ({ messages }: { messages: MessagesTypes[] }) => {
  const { userInfo } = useUserAuthenticated();

  return (
    <div className="bg-white rounded-3xl p-5 overflow-y-auto scrollbar-none h-full space-y-10">
      <div className="flex items-center justify-center ">
        <p className="text-sm text-black bg-gray-300 rounded-full w-28 py-2 text-center">
          26 Jun 2025
        </p>
      </div>
      <div>
        {messages.map((msg, index) => {
          const isSender = msg.user === userInfo?.displayName || "";
          return (
            <div
              key={index}
              className={cn(
                "flex mb-3",
                isSender ? "justify-end" : "justify-start"
              )}
            >
              {isSender ? (
                <SendMessageBubble
                  image={userInfo?.photoURL || ""}
                  message={msg.message}
                  time={msg.timestamp}
                />
              ) : (
                <ReceiveMessageBubble
                  image={msg.image}
                  user={msg.user}
                  message={msg.message}
                  time={msg.timestamp}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChattingPart;
