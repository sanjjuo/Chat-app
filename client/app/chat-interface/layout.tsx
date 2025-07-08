import Navbar from "@/components/common/Navbars/Navbar";
import React from "react";

const ChatInterfaceLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="app-width">
      <Navbar />
      <div className="py-10 px-5 lg:p-0">{children}</div>
    </div>
  );
};

export default ChatInterfaceLayout;
