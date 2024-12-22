import { CustomButton } from "./custom-button";

interface Props {
  label: string;
  addBtnHref?: string;
  backBtnHref?: string;
  editBtnHref?: string;
}

export const PageTitle = ({
  label,
  addBtnHref,
  backBtnHref,
  editBtnHref,
}: Props) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <h1 className="text-heading1">{label}</h1>

      <div className="flex flex-wrap items-center justify-start gap-2">
        {addBtnHref && (
          <CustomButton
            buttonLabel="Add"
            variant={"outline"}
            icon="add"
            linkHref={addBtnHref}
          />
        )}
        {editBtnHref && (
          <CustomButton
            buttonLabel="Edit"
            variant={"outline"}
            icon="edit"
            linkHref={editBtnHref}
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
    </div>
  );
};
