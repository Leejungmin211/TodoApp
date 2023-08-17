import { createContext, useContext, useEffect, useState } from "react";
import { onUserStateChange, login, logout, loginGitHub } from "../api/firebase";

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState();
  useEffect(() => {
    onUserStateChange((user) => {
      setUser(user);
    });
  }, []);
  return (
    <AuthContext.Provider
      value={{ user, uid: user && user.uid, login, logout, loginGitHub }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export function useAuthContext() {
  return useContext(AuthContext);
}
