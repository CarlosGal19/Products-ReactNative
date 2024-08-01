import { View, Text, FlatList, Pressable, StyleSheet } from "react-native";

import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import useCart from "../../Hooks/useCart"

import ProductCartCard from "../../components/ProductCartCard";

const Cart = () => {

  const { productsAdded, totalItems, finalPay, clearCart } = useCart();

  const handlePress = () => {
    clearCart();
  }

  return (
    <View style={styles.container}>
      {
        !productsAdded.length && <Text style={styles.emptyText}>Your cart is empty</Text>
      }
      {
        productsAdded && (
          <>
            <FlatList
              data={productsAdded}
              renderItem={({ item, index }) => <View style={styles.productCard}><ProductCartCard key={index} product={item} /></View>}
              keyExtractor={item => item._id}
            />
            <View style={styles.containerSummary}>
              <Text style={styles.summaryText}>Total Items: {totalItems}</Text>
              <Text style={styles.summaryText}>Final Pay: {finalPay}</Text>
              <Pressable
                onPress={() => handlePress()}
                style={styles.cleanCartButton}
              >
                <MaterialIcons name="remove-shopping-cart" size={24} color="black" />
              </Pressable>
            </View>
          </>
        )
      }
    </ View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#d5d5d5",
  },
  containerSummary: {
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
  productCard: {
    marginBottom: 20,
  },
  emptyText: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
  },
  summaryContainer: {
    alignSelf: "flex-end",
    alignItems: "flex-end",
    marginTop: 20,
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  summaryText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
  },
  cleanCartButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#ff5a5f",
    borderRadius: 5,
  },
  cleanCartButtonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default Cart;
