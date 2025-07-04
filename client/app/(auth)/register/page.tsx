"use client";
import { doSignUpwithEmailAndPassword } from "@/app/_firebase/auth";
import { db } from "@/app/_firebase/firebase";
import AvatarImages from "@/components/AvatarSlider/AvatarSlider";
import LogoText from "@/components/common/LogoText/LogoText";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { ChevronsRight, Eye, EyeOff, Loader } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export default function RegisterPage() {
  const [loading, setLoading] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(false);
  const router = useRouter();

  const registerSchema = z.object({
    avatar: z.string().min(1, { message: "Avatar is required" }),
    username: z.string().min(1, { message: "Username is required" }),
    description: z.string().min(1, { message: "Description is required" }),
    email: z
      .string()
      .min(1, { message: "*Email is required" })
      .email({ message: "*Email is not valid" }),
    password: z
      .string()
      .min(1, { message: "*Password is required" })
      .min(8, { message: "*Password must be at least 8 characters" })
      .max(15, { message: "*Password max be 15 characters" }),
  });

  const form = useForm<RegisterTypes>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      avatar: "",
      description: "",
      username: "",
      email: "",
      password: "",
    },
    mode: "onSubmit",
  });

  const { handleSubmit, control, setValue } = form;

  const registerSubmit = async (data: RegisterTypes) => {
    setLoading(true);
    try {
      const { avatar, username, email, password, description } = data;
      const response = await doSignUpwithEmailAndPassword(email, password);
      await updateProfile(response.user, {
        displayName: username,
        photoURL: avatar,
      });
      // Save user info to Firestore "users" collection
      await setDoc(doc(db, "users", response.user.uid), {
        uid: response.user.uid,
        email: response.user.email,
        displayName: username,
        description: description,
        photoURL: avatar,
        createdAt: new Date(),
      });
      localStorage.setItem("user-details", JSON.stringify(response));
      toast.success("Account created successfully");
      router.push("/chat-interface");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while creating account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-[400px] z-50">
      <CardHeader>
        <CardTitle className="flex items-center justify-center">
          <LogoText placement="auth-logo" />
        </CardTitle>
        <CardDescription className="text-center">
          Sign in with your email to start chatting in real-time with anyone,
          anywhere.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={handleSubmit(registerSubmit)} className="space-y-2">
            <div className="py-3">
              <h4 className="text-center">Select your Avatar</h4>
              <div className="mt-3">
                <AvatarImages setValue={setValue} />
              </div>
            </div>

            {/* Hidden field to allow validation */}
            <FormField
              control={control}
              name="avatar"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <input type="hidden" {...field} />
                  </FormControl>
                  <FormMessage className="!m-0" />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter your username"
                      className="app-input"
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
                    <Input
                      type="text"
                      placeholder="About yourself"
                      className="app-input"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="!m-0" />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      className="app-input"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="!m-0" />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex items-center gap-2 border-2 rounded-md px-3">
                      <Input
                        type={isVisible ? "text" : "password"}
                        placeholder="Enter your password"
                        className="border-none shadow-none focus:!ring-0 h-12 p-0"
                        {...field}
                      />
                      {isVisible ? (
                        <Eye
                          onClick={() => setIsVisible(!isVisible)}
                          className="stroke-gray-500 w-5 h-5 cursor-pointer"
                        />
                      ) : (
                        <EyeOff
                          onClick={() => setIsVisible(!isVisible)}
                          className="stroke-gray-500 w-5 h-5 cursor-pointer"
                        />
                      )}
                    </div>
                  </FormControl>
                  <FormMessage className="!m-0" />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={loading}
              className="!mt-6 w-full h-12 bg-app-primary hover:bg-app-palePrimary"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-1">
                  Just a sec <Loader className="animate-spin" size={16} />
                </span>
              ) : (
                <span>Let's start</span>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="space-x-1 text-sm">
        <span>Already have an account?</span>
        <Link
          href="/"
          className="underline text-blue-500 hover:text-blue-500/80"
        >
          Log in
        </Link>
      </CardFooter>
    </Card>
  );
}
