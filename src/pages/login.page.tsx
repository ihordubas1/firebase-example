import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { FC } from "react";
import { Navigate, redirect } from "react-router-dom";
import { useAuthContext } from "../contexts/auth.context";
import { auth } from "../services/firebase";

const LoginPage: FC = () => {
  const { currentUser } = useAuthContext();

  const loginHandler = async () => {
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
      
      redirect("/");
    } catch (error) {
      console.log(error);
    }
  };

  if (currentUser) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <div>This is a Login Page</div>
      <button onClick={loginHandler}>Login with Google</button>
    </>
  );
};

export { LoginPage };
