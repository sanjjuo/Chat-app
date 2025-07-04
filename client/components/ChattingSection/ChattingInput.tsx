import { Camera, Image, Paperclip, Smile } from "lucide-react";
import React, { SetStateAction } from "react";
import SendIcon from "../SVG/SendIcon";
import { Input } from "../ui/input";

const ChattingInput = ({
  addMessage,
  input,
  setInput,
}: {
  addMessage: () => void;
  input: string;
  setInput: React.Dispatch<SetStateAction<string>>;
}) => {
  const userSendedMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSendEnter = (e: any) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addMessage();
      setInput("");
    }
  };
  return (
    <div className="sticky bottom-0 w-full z-40 flex items-center justify-between gap-5">
      <div className="bg-white w-full p-3 flex items-center justify-between gap-3 rounded-full">
        <Smile className="w-8 h-8" />
        <Input
          type="text"
          value={input}
          onChange={(e) => userSendedMessage(e)}
          onKeyDown={handleSendEnter}
          placeholder="Type a message"
          className="p-0 !text-base text-black placeholder:text-gray-800 placeholder:!text-base border-none shadow-none focus:!ring-0"
        />
        <ul className="flex items-center gap-5">
          <li>
            <Paperclip className="cursor-pointer" />
          </li>
          {/* <li>
            <Image className="cursor-pointer" />
          </li>
          <li>
            <Camera className="cursor-pointer" />
          </li> */}
        </ul>
      </div>
      <SendIcon
        onClick={addMessage}
        className="cursor-pointer stroke-white fill-white w-12 h-12"
      />
    </div>
  );
};

export default ChattingInput;
