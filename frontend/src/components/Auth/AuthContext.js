/* Arthur: Siyuan Chen */
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');

  const signOut = () => {
    // Perform any necessary sign-out tasks, such as clearing tokens or user data
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
  };

  const value = {
    isLoggedIn,
    setIsLoggedIn,
    signOut,
  };

  useEffect(() => {
    localStorage.setItem('isLoggedIn', isLoggedIn);
  }, [isLoggedIn]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
