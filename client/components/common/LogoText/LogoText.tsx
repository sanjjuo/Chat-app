"use client";
import AppLogoIcon from "@/components/SVG/AppLogoIcon";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

const LogoText = ({ placement }: { placement: string }) => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push("/")}
      className="flex items-center gap-1 cursor-pointer"
    >
      <AppLogoIcon
        className={cn(
          placement === "start-chat"
            ? " w-60 h-60"
            : placement === "auth-logo"
            ? "w-8 h-8 md:w-10 md:h-10"
            : "w-8 h-8 md:w-10 md:h-10",
          "fill-app-primary"
        )}
      />
      <h3
        className={cn(
          placement === "start-chat" ? " text-9xl" : "text-xl md:text-3xl",
          "text-app-primary font-logo"
        )}
      >
        chatnx
      </h3>
    </div>
  );
};

export default LogoText;
