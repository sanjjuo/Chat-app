import Image from "next/image";
import React from "react";

const ReceiveMessageBubble = ({
  image,
  user,
  message,
  time,
}: {
  image: string;
  user: string;
  message: string;
  time: Date;
}) => {
  return (
    <div className="flex items-end gap-2 z-30">
      {image ? (
        <Image
          src={image}
          width={20}
          height={20}
          alt="receiver"
          className="w-8 h-8 rounded-full bg-cover"
        />
      ) : (
        <div className="w-8 h-8 rounded-full bg-gray-300" />
      )}

      <div className="bg-chats-receiverBubble p-2 rounded-xl rounded-bl-none min-w-32 max-w-80 flex flex-col h-auto">
        <h3 className="font-bold text-sm text-app first-letter:uppercase">
          {user}
        </h3>
        <p className="text-black first-letter:uppercase mb-5">{message}</p>
        <p className="text-black text-[11px] text-left">
          {/* {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} */}
        </p>
      </div>
    </div>
  );
};

export default ReceiveMessageBubble;
