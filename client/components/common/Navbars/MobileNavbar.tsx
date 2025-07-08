import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AlignRight } from "lucide-react";

const MobileNavbar = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <AlignRight />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle hidden />
          <SheetDescription hidden />
        </SheetHeader>
        <div className="mt-20">
          <ul className="text-lg space-y-10">
            <li>Home</li>
            <li>Chat</li>
            <li>Contacts</li>
            <li>Settings</li>
            <li>FAQs</li>
          </ul>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavbar;
