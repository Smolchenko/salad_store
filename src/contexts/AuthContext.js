import { createContext, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    notes: "",
    placedOrder: false,
  });

  return (
    <AuthContext.Provider value={{ formData, setFormData }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
