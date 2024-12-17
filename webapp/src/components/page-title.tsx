import { ReactNode } from "react";

interface Props {
  label: string;
  button?: ReactNode;
}

export const PageTitle = ({ label, button }: Props) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <h1 className="text-heading1">{label}</h1>
      {button}
    </div>
  );
};
