import { signOut } from "firebase/auth";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/auth.context";
import { auth } from "../services/firebase";

const Navbar: FC = () => {
  const { currentUser, setCurrentUser } = useAuthContext();
  const navigate = useNavigate();

  const signOutGoogleHandler = async () => {
    await signOut(auth);
    setCurrentUser(null);
    
    navigate("/login");
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <span>I'm {currentUser ? currentUser.displayName : "Anonym"}</span>
      <button onClick={signOutGoogleHandler}>Sign Out</button>
    </div>
  );
};

export { Navbar };
