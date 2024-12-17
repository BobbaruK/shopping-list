import { LoginForm } from "@/features/auth/components";

interface Props {
  searchParams: {
    error: string;
    callbackUrl: string;
  };
}

const LoginPage = ({ searchParams: { error, callbackUrl } }: Props) => {
  return (
    <div className="container grid h-full place-items-center">
      <LoginForm searchParamError={error} callbackUrl={callbackUrl} />
    </div>
  );
};

export default LoginPage;
