import { FC } from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../contexts/auth.context";
import { Navbar } from "./navbar.component";

const ProtectedRoute: FC<{ children: JSX.Element }> = ({ children }) => {
  const { currentUser } = useAuthContext();

  if (!currentUser) {
    return <Navigate to={"/login"} />;
  }

  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export { ProtectedRoute };
