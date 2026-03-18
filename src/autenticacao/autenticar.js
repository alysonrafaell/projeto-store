import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [userType, setUserType] = useState(null);

  function login(email) {
    if (email === "admin@bison.com") {
      setUserType("admin");
    } else {
      setUserType("client");
    }
  }

  function logout() {
    setUserType(null);
  }

  return (
    <AuthContext.Provider value={{ userType, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}