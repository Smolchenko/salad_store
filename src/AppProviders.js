import { ShoppingCartProvider } from "./contexts/ShoppingCartContext";
import { AuthProvider } from "./contexts/AuthContext";

const AppProviders = ({ children }) => {
  return (
    <AuthProvider>
      <ShoppingCartProvider>{children}</ShoppingCartProvider>
    </AuthProvider>
  );
};

export default AppProviders;
