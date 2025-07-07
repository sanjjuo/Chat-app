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
import {
  useFetchLoginedUserDetails,
  useUpdateUserDetails,
} from "@/services/QueryServices";
import { zodResolver } from "@hookform/resolvers/zod";
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

  const { data } = useFetchLoginedUserDetails();
  const mutation = useUpdateUserDetails();

  const updateProfileSchema = z.object({
    photoURL: z.string().min(1, { message: "Avatar is required" }),
    displayName: z.string().min(1, { message: "Name is required" }),
    description: z.string().min(1, { message: "Description is required" }),
  });

  const form = useForm({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      photoURL: "",
      displayName: "",
      description: "",
    },
  });

  const { handleSubmit, control, setValue, watch } = form;

  // Update form values when user data loads
  React.useEffect(() => {
    if (!data) return;
    setValue("photoURL", data.photoURL || "");
    setValue("displayName", data.displayName || "");
    setValue("description", data.description || "");
  }, [data, setValue]);

  // Watch photoURL to show image preview
  const photoURL = watch("photoURL");

  const updateProfileSubmit = async (values: Partial<UserData>) => {
    if (!userInfo?.currentUserId) return;

    try {
      await mutation.mutateAsync(values);
      setModalOpen(false);
      toast.success("Profile is updated");
    } catch (error) {
      toast.error("Update failed");
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
                {photoURL ? (
                  <img
                    src={photoURL}
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
                name="displayName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Type your name"
                        autoFocus={false}
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
