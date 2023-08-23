import { createContext, useContext, useEffect, useState } from "react";
import {
  onUserStateChange,
  login,
  logout,
  loginGitHub,
  deleteAuthUser,
} from "../api/firebase";

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState();
  console.log(user);

  useEffect(() => {
    onUserStateChange((user) => {
      setUser(user);
    });
  }, []);
  return (
    <AuthContext.Provider
      value={{
        user,
        uid: user && user.uid,
        displayName: user && user.displayName,
        authEmail: user && user.email,
        userImage: user && user.photoURL,
        login,
        logout,
        loginGitHub,
        deleteAuthUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export function useAuthContext() {
  return useContext(AuthContext);
}
