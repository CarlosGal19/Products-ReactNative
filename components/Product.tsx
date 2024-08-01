import { useState } from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { Link } from "expo-router";
import { FC } from "react";

import useCart from "../Hooks/useCart";

import Amount from "./Amount";

interface Product {
    _id: string;
    name: string;
    price: number;
    image: string;
    countInStock: number;
    amount: number;
}

const ProductCard: FC<{ product: Product }> = ({ product }) => {
    const [amount, setAmount] = useState<number>(1);
    const { addCart } = useCart();

    const handlePress = () => {
        const productWithAmount = { ...product, amount };
        addCart(productWithAmount, product.countInStock);
    };

    return (
        <View style={styles.container}>
            <Link asChild href={`/${product._id}`}>
                <Pressable>
                    <Image
                        source={{ uri: product.image }}
                        style={styles.image}
                        accessibilityLabel={product.name}
                    />
                </Pressable>
            </Link>
            <Text style={styles.name}>{product.name}</Text>
            <Text style={styles.price}>${product.price.toFixed(2)}</Text>
            <Text style={styles.stock}>{product.countInStock} left in stock</Text>
            <View style={styles.add}>
                <Amount max={product.countInStock} amount={amount} setAmount={setAmount} />
                <Pressable style={styles.pressable} onPress={handlePress}>
                    <Text style={{
                        fontWeight: 'bold'
                    }}>Add to Cart</Text>
                </Pressable>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        margin: 10,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 8,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 5,
    },
    price: {
        fontSize: 16,
        color: '#888',
        marginVertical: 5,
    },
    stock: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
    },
    pressable: {
        padding: 10,
        backgroundColor: '#8fc5e4',
        marginTop: 10,
        borderRadius: 8,
    },
    add: {
        width: '100%',
        alignItems: 'center',
    }
});

export default ProductCard;
