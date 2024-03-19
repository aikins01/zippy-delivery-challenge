import { Redirect, Stack } from "expo-router";
import { useAuth } from "../context/auth-context";

export default function AppLayout() {
  const { authState } = useAuth();

  if (!authState?.authenticated) {
    return <Redirect href="/signin" />;
  }

  return <Stack />;
}
