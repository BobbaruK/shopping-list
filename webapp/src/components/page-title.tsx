import { CustomButton } from "./custom-button";

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
        <CustomButton
          buttonLabel="Add"
          variant={"outline"}
          icon="add"
          linkHref={addBtnHref}
        />
      )}
      {backBtnHref && (
        <CustomButton
          buttonLabel="Back"
          variant={"outline"}
          icon="back"
          linkHref={backBtnHref}
        />
      )}
    </div>
  );
};
