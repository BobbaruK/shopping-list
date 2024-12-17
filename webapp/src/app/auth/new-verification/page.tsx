import { NewVerificationForm } from "@/features/auth/components";

interface Props {
  searchParams: {
    token: string;
  };
}

const NewVerificationPage = ({ searchParams: { token } }: Props) => {
  return (
    <div className="container grid h-full place-items-center">
      <NewVerificationForm searchParamToken={token} />
    </div>
  );
};

export default NewVerificationPage;
