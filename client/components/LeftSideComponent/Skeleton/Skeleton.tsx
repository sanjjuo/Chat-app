import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const UserChatListSkeleton = () => {
  return (
    <>
      <div className="flex items-center gap-3">
        <Skeleton className="w-12 h-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[150px]" />
          <Skeleton className="h-3 w-[100px]" />
        </div>
      </div>
      <Skeleton className="h-3 w-[50px]" />
    </>
  );
};

export default UserChatListSkeleton;
