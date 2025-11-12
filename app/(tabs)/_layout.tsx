import React from "react";
import { Tabs, useRouter } from "expo-router";
import { FontAwesome } from "@expo/vector-icons"; // Or any icon pack
import { AuthProvider } from "@/context/AuthContext";
import { TouchableOpacity } from "react-native";

export default function TabLayout() {
  const router = useRouter();
  return (
    <AuthProvider>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#01b964",
          headerShown: true,
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            headerLeft: () => (
              <TouchableOpacity onPress={() => router.back()} style={{ marginLeft: 15 }}>
                <FontAwesome name="arrow-left" size={24} color="black" />
              </TouchableOpacity>
            ),
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="home" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="create"
          options={{
            headerLeft: () => (
              <TouchableOpacity onPress={() => router.back()} style={{ marginLeft: 15 }}>
                <FontAwesome name="arrow-left" size={24} color="black" />
              </TouchableOpacity>
            ),
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="plus-square" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            headerLeft: () => (
              <TouchableOpacity onPress={() => router.back()} style={{ marginLeft: 15 }}>
                <FontAwesome name="arrow-left" size={24} color="black" />
              </TouchableOpacity>
            ),
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="user" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </AuthProvider>
  );
}
