import React, { createContext, useState, useEffect, useContext } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      try {
        const decoded = jwtDecode(storedToken);
        setCurrentUser(decoded);
        setToken(storedToken);
      } catch (err) {
        console.error("Invalid token:", err);
        localStorage.removeItem("authToken");
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ token, setToken, currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for accessing auth
export const useAuth = () => useContext(AuthContext);
