import { AuthProvider } from "./context/auth-context";
import { Slot } from "expo-router";

const Layout = () => {
  return (
    <AuthProvider>
      <Slot />
    </AuthProvider>
  );
};

export default Layout;
