import { View, Text, Image, StyleSheet, ActivityIndicator } from "react-native";
import { FC, useEffect, useState } from "react";
import axiosClient from "../axios/axios";
import { useLocalSearchParams } from "expo-router";

interface Product {
    _id: string;
    name: string;
    price: number;
    image: string;
    images: string[];
    countInStock: number;
    amount: number;
    description: string;
}

const ProductCard: FC = () => {
    const [prod, setProd] = useState<Product | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const { _id } = useLocalSearchParams();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axiosClient.get(`${_id}`);
                setProd(response.data.product[0]);
            } catch (error) {
                setError("Failed to load product data");
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [_id]);

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" style={styles.loading} />;
    }

    if (error) {
        return <Text style={styles.errorText}>{error}</Text>;
    }

    return (
        <View style={styles.container}>
            {!prod ? (
                <Text style={styles.errorText}>No product found</Text>
            ) : (
                <View style={styles.productContainer}>
                    <Image
                        source={{ uri: prod.images[0] }}
                        style={styles.image}
                        accessibilityLabel={prod.name}
                    />
                    <Text style={styles.name}>{prod.name}</Text>
                    <Text style={styles.price}>${prod.price}</Text>
                    <Text style={styles.stock}>{prod.countInStock} left in stock</Text>
                    <Text style={styles.description}>{prod.description}</Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        fontSize: 16,
        color: 'red',
        textAlign: 'center',
        marginVertical: 10,
    },
    productContainer: {
        padding: 20,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        backgroundColor: '#fff',
        alignItems: 'center',
        width: '90%',
        maxWidth: 500,
    },
    image: {
        width: 200,
        height: 200,
        marginBottom: 10,
        borderRadius: 10,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 10,
    },
    price: {
        fontSize: 18,
        color: '#333',
        marginVertical: 5,
    },
    stock: {
        fontSize: 16,
        color: 'green',
        marginVertical: 5,
    },
    description: {
        fontSize: 14,
        textAlign: 'center',
        marginVertical: 10,
        color: '#666',
        fontFamily: 'Arial', // Cambia 'Arial' por la fuente deseada
    },
});

export default ProductCard;
