import { View } from "react-native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
    SafeAreaProvider,
    useSafeAreaInsets,
} from "react-native-safe-area-context";
import { CartProvider } from "../Context/CartProvider";

export default function App() {
    const insets = useSafeAreaInsets();

    return (
        <>
            <CartProvider>
                <SafeAreaProvider>
                    <StatusBar />
                    <View
                        style={{
                            flex: 1,
                            paddingBottom: insets.bottom,
                            paddingLeft: insets.left,
                            paddingRight: insets.right
                        }}
                    >
                        <Stack
                            screenOptions={{
                                headerStyle: {
                                    backgroundColor: "#8fc5e4",
                                },
                                headerTintColor: "black",
                                headerTitleStyle: {
                                    fontWeight: "bold",
                                },
                                headerTitle: "Shopping Cart",
                            }}
                        />
                    </View>
                </SafeAreaProvider>
            </CartProvider>
        </>
    );
}
