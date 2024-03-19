import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

const TrackingCard = () => {
  return (
    <View className="relative p-4 bg-[#4CA7A8] rounded-lg">
      <Image
        source={require("../assets/tracking-box.png")}
        className="absolute top-0 right-0"
      />

      <View>
        {/* Title */}
        <Text className="mb-1 text-xl font-semibold text-white">
          Track your parcel
        </Text>
        <Text className="mb-6 text-xs text-white">
          Enter your parcel tracking number
        </Text>

        <View className="flex flex-row items-center justify-between gap-2">
          <View className="flex-row items-center flex-1 bg-white rounded-md">
            <Feather
              name="search"
              size={17}
              style={{ marginRight: 5, marginLeft: 10 }}
            />
            <TextInput
              placeholder="Enter your tracking number"
              className="flex-1 py-[10px]"
            />
          </View>

          <TouchableOpacity
            className="px-4 py-[10px] bg-[#00635C] rounded-md "
            onPress={() => {}}
          >
            <Text className="text-xs text-white">Search Package</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default TrackingCard;
