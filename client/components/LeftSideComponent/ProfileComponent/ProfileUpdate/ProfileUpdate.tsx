import { db } from "@/app/_firebase/firebase";
import AvatarImages from "@/components/AvatarSlider/AvatarSlider";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useUserAuthenticated } from "@/hooks/useUserAuthenticated";
import { zodResolver } from "@hookform/resolvers/zod";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { SquarePen, X } from "lucide-react";
import React, { SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const ProfileUpdate = ({
  modalOpen,
  setModalOpen,
}: {
  modalOpen: boolean;
  setModalOpen: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const { userInfo } = useUserAuthenticated();
  const [sliderShown, setSliderShown] = React.useState(false);
  const [updateProfile, setUpdateProfile] = React.useState({
    image: "",
    username: "",
    description: "",
  });

  React.useEffect(() => {
    const fetchDetails = async () => {
      try {
        if (!userInfo?.currentUserId) return;
        const getUserDetailsFromDb = doc(db, "users", userInfo.currentUserId);
        const getUser = await getDoc(getUserDetailsFromDb);
        if (getUser.exists()) {
          const data = getUser.data();
          setUpdateProfile({
            image: data.photoURL || "",
            username: data.displayName || "",
            description: data.description || "",
          });
          form.setValue("avatar", data.photoURL || "");
          form.setValue("username", data.displayName || "");
          form.setValue("description", data.description || "");
        }
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchDetails();
  }, [userInfo?.currentUserId]);

  const updateProfileSchema = z.object({
    avatar: z.string().min(1, { message: "Avatar is required" }),
    username: z.string().min(1, { message: "Name is required" }),
    description: z.string().min(1, { message: "Description is required" }),
  });

  const form = useForm({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      avatar: "",
      username: "",
      description: "",
    },
  });
  const { handleSubmit, control, setValue } = form;

  const updateProfileSubmit = async (values: any) => {
    if (!userInfo?.currentUserId) return;
    const updateProfileOfUser = doc(db, "users", userInfo?.currentUserId);
    try {
      await updateDoc(updateProfileOfUser, {
        photoURL: values.avatar,
        displayName: values.username,
        description: values.description,
      });
      console.log("form is submitted");
      setModalOpen(false);
      toast.success("profile is updated");
    } catch (error) {
      console.error("Update failed", error);
    }
  };
  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogContent className="rounded-3xl">
        <DialogHeader>
          <DialogTitle>Update your profile</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={handleSubmit(updateProfileSubmit)}
            className="space-y-10 flex flex-col justify-center"
          >
            <div className="flex flex-col items-center justify-center space-y-10">
              <div className="relative">
                {updateProfile.image ? (
                  <img
                    src={updateProfile.image}
                    alt="user-image"
                    className="w-40 h-40 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-40 h-40 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                    No Image
                  </div>
                )}

                <div
                  onClick={() => setSliderShown(!sliderShown)}
                  className="absolute cursor-pointer -bottom-1 right-0 bg-app-primary rounded-full p-1 w-7 h-7 flex items-center justify-center"
                >
                  {!sliderShown ? (
                    <SquarePen className="w-4 h-4 stroke-white" />
                  ) : (
                    <X className="w-4 h-4 stroke-white" />
                  )}
                </div>
              </div>
              {sliderShown && <AvatarImages setValue={setValue} />}
            </div>
            <div className="space-y-3">
              <FormField
                control={control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Type your name"
                        className="shadow-none h-12 focus:!ring-0 rounded-full capitalize"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="!m-0" />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="Type your description"
                        className="focus:!ring-0 rounded-full shadow-none capitalize"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="!m-0" />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="rounded-full h-12">
              Update
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileUpdate;
