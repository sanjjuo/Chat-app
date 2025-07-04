import Image from "next/image";
import React from "react";

const SendMessageBubble = ({
  image,
  message,
  time,
}: {
  image: string;
  message: string;
  time: Date;
}) => {
  return (
    <div className="flex items-end gap-1 z-30">
      <div className="bg-chats-senderBubble p-2 rounded-xl rounded-br-md min-w-32 max-w-60 h-auto">
        <p className="text-app-secondary first-letter:uppercase mb-5">
          {message}
        </p>
        <p className="text-white text-[11px] text-right">
            {/* {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} */}
        </p>
      </div>
      <Image
        src={image}
        width={20}
        height={20}
        alt="receiver"
        className="w-8 h-8 rounded-full bg-cover"
      />
    </div>
  );
};

export default SendMessageBubble;
