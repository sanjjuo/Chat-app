import ChattingSection from "@/components/ChattingSection/ChattingSection";
import LeftSideComponent from "@/components/LeftSideComponent/LeftSideComponent";
import RightSideComponent from "@/components/RightSideComponent/RightSideComponent";
import React from "react";

const Chat_Dynamic_Interface_Page = async ({
  params,
}: {
  params: Promise<{ otherUserChatId: string }>;
}) => {
  const { otherUserChatId } = await params;
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 grid-rows-10 gap-x-5 h-[80vh]">
      <div className="lg:col-span-3 row-span-10 overflow-y-auto scrollbar-none">
        <LeftSideComponent />
      </div>
      <div className="lg:col-span-6 row-span-10">
        <ChattingSection otherUserChatId={otherUserChatId} />
      </div>
      <div className="lg:col-span-3 row-span-10 overflow-y-auto scrollbar-none">
        <RightSideComponent otherUserChatId={otherUserChatId} />
      </div>
    </div>
  );
};

export default Chat_Dynamic_Interface_Page;
