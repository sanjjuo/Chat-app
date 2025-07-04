import React from "react";
import LogoText from "../common/LogoText/LogoText";

const StartChat = () => {
  return (
    <div className="bg-white px-7 py-10 flex flex-col items-center justify-center rounded-3xl h-full">
      <LogoText placement="start-chat" />
      <h4 className="font-bold text-4xl text-app-primary text-center">
        Chat anytime, anywhere
      </h4>
    </div>
  );
};

export default StartChat;
