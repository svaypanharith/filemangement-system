import Base from "@/components/share/base";
import Header from "@/components/share/header";
import SignIn from "@/components/sigin/sigin";

const SignInPage = () => {
  return (
    <Base>
      <Header back title="SignIn" />
      <div className="flex w-full  items-center justify-center p-3">
        <SignIn />
      </div>
    </Base>
  );
};

export default SignInPage;
