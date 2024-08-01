import { FC } from "react";
import { View, Text, ActivityIndicator, FlatList, StyleSheet } from "react-native";
import axiosClient from "../../axios/axios";
import { useEffect, useState } from "react";

import ProductCard from "../../components/Product";

export interface Product {
    _id: string;
    name: string;
    price: number;
    image: string;
    countInStock: number;
    amount: number;
    description: string;
}

const App: FC = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [products, setProducts] = useState<Product[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosClient.get("/");
                setProducts(response.data.products);
            } catch (error) {
                setError("Failed to fetch products. Please try again later.");
                console.log(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.container}>
                <Text>{error}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {products.length > 0 ? (
                <FlatList
                    data={products}
                    renderItem={({ item }) => <ProductCard key={item._id} product={item} />}
                    keyExtractor={item => item._id}
                />
            ) : (
                <Text>No products available.</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1, // Ensures the container takes up the full screen
        justifyContent: 'center', // Centers content vertically
        alignItems: 'center', // Centers content horizontally
        padding: 10, // Adds padding around the container
        backgroundColor: '#f5f5f5'
    },
});

export default App;
