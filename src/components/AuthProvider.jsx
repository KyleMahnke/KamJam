import { createContext, useEffect, useState } from "react";
import { authenticate } from "../api/users";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  console.log("USERRRRR HEREEEEEE:", user);

  useEffect(() => {
    if (!user) {
      return;
    }

    (async () => {
      const user = await authenticate(token);
      if (!user) {
        updateToken("");
      }
      setUser(user);
    })();
  }, [token]);

  const updateToken = (newToken) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
  };

  const contextValue = {
    token,
    setToken: updateToken,
    user,
    setUser,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
