import LeftSideComponent from "@/components/LeftSideComponent/LeftSideComponent";
import StartChat from "@/components/StartChat/StartChat";

const Page = () => {
  return (
    <div className="grid grid-cols-12 grid-rows-10 gap-x-5 h-[80vh]">
      <div className="col-span-3 row-span-10 overflow-y-auto scrollbar-none">
        <LeftSideComponent />
      </div>
      <div className="col-span-9 row-span-10 overflow-y-auto scrollbar-none">
        <StartChat />
      </div>
    </div>
  );
};

export default Page;
