import { View, Text } from "react-native";
import React from "react";
import { useAuth } from "../context/auth-context";

const Home = () => {
  const { signOut } = useAuth();
  return (
    <View>
      <Text>Home</Text>
      <Text onPress={signOut}>Logout</Text>
    </View>
  );
};

export default Home;
