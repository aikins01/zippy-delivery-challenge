import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { useAuth } from "../context/auth-context";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { onSignin } = useAuth();

  const signin = async () => {
    setSubmitting(true);
    const response = await onSignin!(email, password);
    if (response && response.error) {
      alert(response.message);
      setSubmitting(false);
    }
  };
  return (
    <View className="items-center justify-center flex-1 w-full ">
      <Image
        source={require("../../assets/logo.png")}
        className="object-cover mb-8"
      />
      <View className="items-center gap-2 mb-4">
        <Text className="text-2xl">Get Started Now</Text>
        <Text className="text-base font-normal text-gray-500">
          Enter your credentials to access your account
        </Text>
      </View>
      <View className="w-full px-4">
        <Text className="mb-2 text-black">Email</Text>
        <View className="flex-row items-center h-12 mb-4 border border-gray-300 rounded-lg">
          <TextInput
            textContentType="emailAddress"
            autoCapitalize="none"
            className="flex-1 px-3 py-2"
            placeholder="Your email"
            onChangeText={(text) => setEmail(text)}
            value={email}
            cursorColor="#4CA7A8"
          />
          <Feather
            name="mail"
            size={24}
            color="#AFAFAF"
            style={{ position: "absolute", right: 12 }}
          />
        </View>
        <Text className="mb-2 text-black">Password</Text>
        <View className="flex-row items-center h-12 border border-gray-300 rounded-lg">
          <TextInput
            textContentType="password"
            secureTextEntry={!showPassword}
            className="flex-1 px-3 py-2"
            placeholder="Your password"
            onChangeText={(text) => setPassword(text)}
            value={password}
            cursorColor="#4CA7A8"
          />
          <Feather
            name={!showPassword ? "eye" : "eye-off"}
            size={24}
            color="#AFAFAF"
            onPress={() => setShowPassword(!showPassword)}
            style={{ position: "absolute", right: 12 }}
          />
        </View>
        <Text className="mt-2 text-xs text-gray-500">Forgot Password?</Text>

        <TouchableOpacity
          disabled={submitting}
          onPress={signin}
          className="w-full p-3 bg-[#4CA7A8] rounded-lg mt-16"
        >
          <Text className="text-base font-semibold text-center text-white">
            {submitting ? "Logging In" : "Login"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Signin;
