import { UseFormSetValue, FieldValues } from "react-hook-form";
import { avatarsImages } from "./data";
import React from "react";
import { cn } from "@/lib/utils";

type AvatarImagesProps<T extends FieldValues> = {
  setValue: UseFormSetValue<T>;
};

const AvatarImages = <T extends FieldValues>({
  setValue,
}: AvatarImagesProps<T>) => {
  const [avatarImage, setAvatarImage] = React.useState("");

  return (
    <ul className="flex items-center gap-1">
      {avatarsImages.slice(0, 5).map((data: any) => (
        <li key={data.id} className="basis-1/5">
          {data.image ? (
            <img
              src={data.image}
              alt="avatar-image"
              className={cn(
                avatarImage === data.image
                  ? "border-black"
                  : "border-transparent",
                "w-16 h-16 border-2 rounded-full cursor-pointer duration-700"
              )}
              onClick={() => {
                setAvatarImage(data.image);
                setValue("avatar" as any, data.image); // Still typed safely
              }}
            />
          ) : (
            <div className="w-16 h-16 bg-gray-300"></div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default AvatarImages;
