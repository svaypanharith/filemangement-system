import Base from "@/components/share/base";
import Header from "@/components/share/header";
import SignUp from "@/components/signup/signup";

export default function SignupPage() {
  return (
    <Base>
      <Header back title="Signup" />
      <div className="flex w-full items-center justify-center p-3">
        <SignUp />
      </div>
    </Base>
  );
}
