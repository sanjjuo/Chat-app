import React from "react";
import { Button } from "../ui/button";

const DeleteUserButton = () => {
  return (
    <div className="sticky bottom-0 w-full h-40 flex items-center p-5 bg-white rounded-3xl">
      <Button className="w-full h-full bg-app-primary rounded-full">
        Delete contact
      </Button>
    </div>
  );
};

export default DeleteUserButton;
