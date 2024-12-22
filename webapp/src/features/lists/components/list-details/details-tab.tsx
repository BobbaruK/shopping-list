import { Card } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import { DrilledProps } from "./";

type Props = {} & DrilledProps;

export const ListDetailsTab = ({ list }: Props) => {
  // TODO: improve this
  return (
    <Card className="p-4">
      <div className="grid grid-cols-2 border-b py-2">
        <h3>Name:</h3>
        <p>{list.name}</p>
      </div>
      <div className="grid grid-cols-2 border-b py-2">
        <h3>Status:</h3>
        <p>{list.active ? "Active" : "Inactive"}</p>
      </div>
      <div className="grid grid-cols-2 border-b py-2">
        <h3>Notes:</h3>
        <div className="overflow-x-auto">
          <pre>{list.notes}</pre>
        </div>
      </div>
      <div className="grid grid-cols-2 border-b py-2">
        <h3>Date created:</h3>
        <p>
          {formatDate(list.createdAt, {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            month: "long",
          })}
        </p>
      </div>
      <div className="grid grid-cols-2 pt-2">
        <h3>Date updated:</h3>
        <p>
          {formatDate(list.updatedAt, {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            month: "long",
          })}
        </p>
      </div>
    </Card>
  );
};
