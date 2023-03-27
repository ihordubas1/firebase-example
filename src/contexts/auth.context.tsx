import { User } from "@firebase/auth";
import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useState
} from "react";
import {
  createInitialUsersCollection,
  getUserByQuery,
  userFindByUidQuery
} from "../api";
import { auth } from "../services/firebase";

const AuthContext = createContext<{
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
}>({ currentUser: null, setCurrentUser: () => {} });

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (!user) {
        localStorage.removeItem("token");
      } else {
        setCurrentUser(user);
        localStorage.setItem("token", await user.getIdToken());

        try {
          const users = await getUserByQuery(userFindByUidQuery(user.uid));

          if (users.empty) {
            await createInitialUsersCollection(user.uid);
          }
        } catch (error) {
          console.log(error);
        }
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuthContext = () => useContext(AuthContext);

export { AuthProvider, useAuthContext };
