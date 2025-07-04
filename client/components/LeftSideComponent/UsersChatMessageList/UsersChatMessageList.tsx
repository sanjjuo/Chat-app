"use client";
import { useUserAuthenticated } from "@/hooks/useUserAuthenticated";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";

const UsersChatMessageList = ({ users }: { users: UserMessages[] }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { userInfo } = useUserAuthenticated();
  const usersList = users.filter((usr) => usr.uid !== userInfo?.currentUserId);

  console.log(users);

  const handleSelectUser = (uid: string) => {
    router.push(`/chat-interface/${uid}`);
  };

  return (
    <div className="space-y-2">
      {usersList.map((data) => (
        <div
          onClick={() => handleSelectUser(data.uid)}
          key={data.uid}
          className={cn(
            pathname === `/chat-interface/${data.uid}`
              ? "p-0 bg-app-primary"
              : "hover:bg-app-palePrimary/10",
            "flex items-center justify-between p-5 duration-300 cursor-pointer rounded-full"
          )}
        >
          <div className="flex items-center gap-3">
            <div className="rounded-full border border-gray-400">
              <img
                src={data.photoURL}
                alt="user-image"
                className="rounded-full w-12 h-12 bg-cover"
              />
            </div>
            <div>
              <h4
                className={cn(
                  pathname === `/chat-interface/${data.uid}`
                    ? "text-white"
                    : "text-black",
                  "text-lg font-semibold first-letter:uppercase"
                )}
              >
                {data.displayName}
              </h4>
              <p
                className={cn(
                  pathname === `/chat-interface/${data.uid}`
                    ? "text-app-secondary"
                    : "text-gray-400",
                  "text-sm "
                )}
              >
                hello hey there..!
              </p>
            </div>
          </div>
          <p
            className={cn(
              pathname === `/chat-interface/${data.uid}`
                ? "text-white"
                : " text-black",
              "text-xs"
            )}
          >
            09:00
          </p>
        </div>
      ))}
    </div>
  );
};

export default UsersChatMessageList;
