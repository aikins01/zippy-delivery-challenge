import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import { AuthProvider } from "./app/context/auth-context";

export default function App() {
  return (
    <AuthProvider>
      <View className="items-center justify-center flex-1 bg-white ">
        <Text className="font-bold">
          Open up App.js to start working on your app!
        </Text>
        <StatusBar style="auto" />
      </View>
    </AuthProvider>
  );
}
