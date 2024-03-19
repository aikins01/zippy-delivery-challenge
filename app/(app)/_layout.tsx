import { Redirect, Stack } from "expo-router";
import { useAuth } from "../context/auth-context";
import { Text } from "react-native";

export default function AppLayout() {
  const { authState } = useAuth();

  if (authState?.loading) {
    return;
  }

  if (!authState?.authenticated) {
    console.log(
      "𝐚𝐢𝐤𝐢𝐧𝐬 ~ file: _layout.tsx:8 ~ AppLayout ~ authState?.authenticated:",
      authState
    );
    return <Redirect href="/signin" />;
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
