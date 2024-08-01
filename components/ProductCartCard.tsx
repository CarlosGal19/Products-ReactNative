import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link } from "expo-router";

import { Product } from "../app/(tabs)/index";

import useCart from "../Hooks/useCart";

const ProductCartCard = ({ product }: { product: Product }) => {

  const { removeCart } = useCart();

  const handlePress = () => {
    removeCart(product._id);
  }

  return (
    <View style={styles.container}>
      <Link asChild href={`${product._id}`}>
        <Image source={{ uri: product.image }} style={styles.image} />
      </Link>
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.price}>${product.price}</Text>
      <Text style={styles.amount}>Amount: {product.amount}</Text>
      <Text style={styles.amount}>Total: ${(product.price * product.amount).toFixed(2)}</Text>
      <Pressable style={styles.button} onPress={handlePress}>
        <FontAwesome name="remove" size={24} color="black" />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    textAlign: "center",
  },
  price: {
    fontSize: 16,
    color: "#333",
    marginTop: 5,
    textAlign: "center",
  },
  amount: {
    fontSize: 14,
    color: "#555",
    marginTop: 5,
    textAlign: "center",
  },
  button: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#ff5a5f",
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default ProductCartCard;
