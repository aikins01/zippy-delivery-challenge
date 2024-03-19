import { useState, useEffect } from "react";
import axios from "axios";
import { View, Text, FlatList, Image, ActivityIndicator } from "react-native";
import { SvgXml } from "react-native-svg";
import RiderIcon from "../assets/rider.svg";
import { cn } from "../utils/utlis";

const statusColors = {
  delivered: { textColor: "text-green-600", bgColor: "bg-green-100" },
  cancelled: { textColor: "text-red-600", bgColor: "bg-red-100" },
  "order picked up": { textColor: "text-indigo-600", bgColor: "bg-indigo-100" },
  "in transit": { textColor: "text-yellow-600", bgColor: "bg-yellow-100" },
  "in progress": { textColor: "text-yellow-600", bgColor: "bg-yellow-100" },
  "order received": { textColor: "text-blue-600", bgColor: "bg-blue-100" },
};

const OrdersList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.EXPO_PUBLIC_API_BASEURL}/get_orders?page=1&pageSize=10`
        );
        setOrders(response.data.data);
        setLoading(false);
      } catch (error) {
        console.log(
          "𝐚𝐢𝐤𝐢𝐧𝐬 ~ file: order-list.tsx:24 ~ fetchData ~ Error fetching orders:",
          error
        );
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderItem = ({ item }) => (
    <View className="p-2 mb-4 bg-gray-100 shadow-md rounded-2xl">
      <View className="flex flex-row items-center mb-2">
        <View className="p-1 mr-2 bg-blue-100 bg-opacity-[8%] items-center justify-center rounded-full h-12 w-12">
          <RiderIcon className="w-5 h-5" />
        </View>
        <View>
          <Text className="text-base font-semibold">To: {item.senderName}</Text>
          <Text className="text-xs font-medium text-gray-600">
            {item.senderZoneName} - {item.receiverzoneName}
          </Text>
          <Text className="text-[10px] font-semibold text-blue-600 mt-1">
            15th Jan, 2024 - {item.pickupTime.toLowerCase()}
          </Text>
        </View>
        <View className="grow" />
        <View
          className={cn(
            `rounded-md px-[6px] py-[10px] `,
            `${statusColors[item.status.toLowerCase()]?.bgColor}`
          )}
        >
          <Text
            className={cn(
              `font-bold text-[10px]`,
              `${statusColors[item.status.toLowerCase()]?.textColor}`
            )}
          >
            {item.status}
          </Text>
        </View>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View className="items-center justify-center flex-1 ">
        <ActivityIndicator size="large" color="#4CA7A8" />
      </View>
    );
  }

  return (
    <View className="flex-1 px-4">
      <View className="flex flex-row items-center justify-between mt-8 mb-4">
        <Text className="text-base font-bold">Latest Orders</Text>
        <Text className="text-[#4CA7A8] text-base font-semibold">See All</Text>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={orders}
        renderItem={renderItem}
        keyExtractor={(item) => item.orderId}
      />
    </View>
  );
};

export default OrdersList;
