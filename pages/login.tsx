import { NextPage } from "next";
import { signIn } from "next-auth/react";

const Login: NextPage = () => {
  return (
    <div>
      <h1>Wanna log in?</h1>
      <button onClick={() => signIn("email", { email: "foo@bar.com" })}>
        Do it!
      </button>
    </div>
  );
};

export default Login;
