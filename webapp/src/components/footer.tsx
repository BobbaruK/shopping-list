import Link from "next/link";
import { Button } from "./ui/button";

export const Footer = () => {
  return (
    <div className="container flex items-center justify-start py-4">
      <div className="flex flex-wrap gap-x-2">
        <Button asChild variant={"link"}>
          <Link href={"/server"}>Server</Link>
        </Button>
        <Button asChild variant={"link"}>
          <Link href={"/client"}>Client</Link>
        </Button>
        <Button asChild variant={"link"}>
          <Link href={"/admin"}>Admin</Link>
        </Button>
        <Button asChild variant={"link"}>
          <Link href={"/settings"}>Settings</Link>
        </Button>
      </div>
    </div>
  );
};
