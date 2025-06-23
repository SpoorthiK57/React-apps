import React, { createContext, useState, useEffect, useContext } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      try {
        const decoded = jwtDecode(storedToken);
        console.log(decoded);
        setToken(storedToken);
        setCurrentUser(decoded);
        localStorage.setItem("currentUser", JSON.stringify(decoded));
      } catch (err) {
        console.error("Invalid token:", err);
        localStorage.removeItem("authToken");
        localStorage.removeItem("currentUser");
      }
    } else {
      // Fallback if currentUser already in localStorage
      const savedUser = localStorage.getItem("currentUser");
      if (savedUser) {
        setCurrentUser(JSON.parse(savedUser));
      }
    }
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{ token, setToken, currentUser, setCurrentUser, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for accessing auth
export const useAuth = () => useContext(AuthContext);
