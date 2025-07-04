import DeleteUserButton from "./DeleteUser";
import Media from "./Media";
import UserProfileDetails from "./UserProfileDetails";

const RightSideComponent = ({
  otherUserChatId,
}: {
  otherUserChatId: string;
}) => {
  return (
    <div className="h-full bg-white flex flex-col justify-between rounded-3xl">
      <UserProfileDetails otherUserChatId={otherUserChatId} />
      <Media />
      <DeleteUserButton />
    </div>
  );
};

export default RightSideComponent;
