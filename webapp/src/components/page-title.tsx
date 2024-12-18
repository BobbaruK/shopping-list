import Link from "next/link";
import { IoMdArrowRoundBack } from "react-icons/io";
import { IoAddCircleOutline } from "react-icons/io5";
import { Button } from "./ui/button";

interface Props {
  label: string;
  addBtnHref?: string;
  backBtnHref?: string;
}

export const PageTitle = ({ label, addBtnHref, backBtnHref }: Props) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <h1 className="text-heading1">{label}</h1>

      {addBtnHref && (
        <Button variant={"outline"} size={"sm"} className="flex gap-2" asChild>
          <Link href={addBtnHref}>
            <IoAddCircleOutline size={18} />
            Add
          </Link>
        </Button>
      )}
      {backBtnHref && (
        <Button
          asChild
          className="flex items-center justify-center gap-2"
          variant={"outline"}
        >
          <Link href={backBtnHref}>
            <IoMdArrowRoundBack size={18} />
            <span className="hidden md:inline">Back</span>
          </Link>
        </Button>
      )}
    </div>
  );
};
