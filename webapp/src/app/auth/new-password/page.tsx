import { NewPasswordForm } from "@/features/auth/components";

interface Props {
  searchParams: {
    token: string;
  };
}

const NewPasswordPage = ({ searchParams: { token } }: Props) => {
  return (
    <div className="container grid h-full place-items-center">
      <NewPasswordForm searchParamToken={token} />
    </div>
  );
};

export default NewPasswordPage;
