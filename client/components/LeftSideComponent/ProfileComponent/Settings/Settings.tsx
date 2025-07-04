"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUserAuthenticated } from "@/hooks/useUserAuthenticated";
import { Settings } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";
import ProfileUpdate from "../ProfileUpdate/ProfileUpdate";

const SettingsComponent = () => {
  const router = useRouter();
  const { userInfo } = useUserAuthenticated();
  const [modalOpen, setModalOpen] = React.useState(false);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("user-details");
    }
    router.push("/");
    toast.success("Logout is success");
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Settings className="stroke-black" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => setModalOpen(true)}
          >
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={handleLogout}
            className="text-red-500 cursor-pointer"
          >
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <ProfileUpdate modalOpen={modalOpen} setModalOpen={setModalOpen}/>
    </>
  );
};

export default SettingsComponent;
