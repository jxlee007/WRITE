import { SignIn, SignedIn, SignedOut } from "@clerk/clerk-react";
import { Navigate, useLocation } from "react-router-dom";

type LocationState = {
  from?: {
    pathname: string;
  };
};

const SignInPage = () => {
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
          <SignIn routing="path" path="/sign-in" signUpUrl="/sign-up" afterSignInUrl={redirectTo} />
        </div>
      </SignedOut>
    </>
  );
};

export default SignInPage;
