import { Tabs } from "expo-router";
import { View } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';

export default function TabsLayout({ children }) {
  return (
    <>
        <Tabs screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: 'black',
        }}>
            <Tabs.Screen name="index" options={{
                title: "Home",
                tabBarIcon: ({ color }) => <AntDesign name="home" size={24} color={color} />,
            }} />
            <Tabs.Screen name="Cart" options={{
                title: "Cart",
                tabBarIcon: ({ color }) => <AntDesign name="shoppingcart" size={24} color={color} />,
            }} />
        </Tabs>
    </>
  );
}
