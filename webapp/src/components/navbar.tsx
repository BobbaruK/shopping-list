"use client";

import { Button } from "@/components/ui/button";
import { UserButton } from "@/features/auth/components";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="flex w-full flex-wrap items-center justify-between gap-4 rounded-xl bg-secondary p-4 shadow-sm">
      <Button
        asChild
        variant={pathname.startsWith("/lists") ? "default" : "outline"}
      >
        <Link href={"/lists"}>My lists</Link>
      </Button>

      <UserButton />
    </nav>
  );
};
