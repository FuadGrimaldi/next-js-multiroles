import Signup from "@/components/Auth/Signup";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register Incube",
  description: "This is register page for Incube",
  // other metadata
};

const SignupPage = () => {
  return (
    <>
      <Signup />
    </>
  );
};

export default SignupPage;
