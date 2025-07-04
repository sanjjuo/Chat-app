import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative bg-cover bg-center bg-image">
      <div className="absolute bg-blue-400/60 inset-0 z-10"></div>
      <div className="flex items-center justify-center h-screen">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
