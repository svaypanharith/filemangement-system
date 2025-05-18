import Base from "@/components/share/base";
import Header from "@/components/share/header";
import SignUp from "@/components/signup/signup";

export default function SignupPage() {
  return (
    <Base insideClassName="p-0">
      <div className="flex flex-col w-full h-full">
        <Header back title="Signup" />
        <SignUp />
      </div>
    </Base>
  );
}
