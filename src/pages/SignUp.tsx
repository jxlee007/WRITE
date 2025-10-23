import { SignUp, SignedIn, SignedOut } from "@clerk/clerk-react";
import { Navigate, useLocation } from "react-router-dom";

type LocationState = {
  from?: {
    pathname: string;
  };
};

const SignUpPage = () => {
  const location = useLocation();
  const state = location.state as LocationState | undefined;
  const redirectTo = state?.from?.pathname ?? "/";

  return (
    <>
      <SignedIn>
        <Navigate to={redirectTo} replace />
      </SignedIn>
      <SignedOut>
        <div className="flex min-h-screen items-center justify-center bg-background">
          <SignUp routing="path" path="/sign-up" signInUrl="/sign-in" afterSignUpUrl={redirectTo} />
        </div>
      </SignedOut>
    </>
  );
};

export default SignUpPage;
