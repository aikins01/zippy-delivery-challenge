import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import { useAuth } from "../context/auth-context";
import { Stack } from "expo-router";
import TrackingCard from "../../components/tracking-card";

const Home = () => {
  const { signOut } = useAuth();
  return (
    <SafeAreaView className="flex-1">
      <Stack.Screen options={{ headerShown: false }} />
      <View className="mx-4 mt-4">
        <Text>Hi Kwame,</Text>
        <Text className="mb-4 text-gray-500">
          Track and monitoring your packages
        </Text>
        <TrackingCard />
      </View>

      <Text onPress={signOut}>Logout</Text>
    </SafeAreaView>
  );
};

export default Home;
