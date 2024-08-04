import { createContext, useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { calculateShippingCost, calculateFinalShipping } from '../helpers/helpers'

const CartContext = createContext<any>(null);

interface CartProviderProps {
    children: React.ReactNode;
}

interface Product {
    _id: string;
    name: string;
    price: number;
    image: string;
    countInStock: number;
    amount: number;
    shipping: number;
}

const CartProvider = ({ children }: CartProviderProps) => {

    const [productsAdded, setProductsAdded] = useState<Product[]>([]);
    const [totalItems, setTotalItems] = useState<number>(0);
    const [finalPay, setFinalPay] = useState<number>(0);
    const [finalShipping, setFinalShipping] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const getFromStorage = async () => {
            try {
                const cart = await AsyncStorage.getItem("cart");
                const items = await AsyncStorage.getItem("totalItems");
                const pay = await AsyncStorage.getItem("finalPay");
                const ship = await AsyncStorage.getItem("shipping");

                if (cart) {
                    setProductsAdded(JSON.parse(cart));
                }
                if (items) {
                    setTotalItems(JSON.parse(items));
                }
                if (pay) {
                    setFinalPay(JSON.parse(pay));
                }
                if (ship) {
                    setFinalShipping(JSON.parse(ship));
                }
            } catch (error) {
                alert("An error occurred while trying to get the cart from storage");
            } finally {
                setLoading(false);
            }
        };
        getFromStorage();
    }, []);

    useEffect(() => {
        const saveToStorage = async () => {
            try {
                await AsyncStorage.setItem("cart", JSON.stringify(productsAdded));
                await AsyncStorage.setItem("totalItems", JSON.stringify(totalItems));
                await AsyncStorage.setItem("finalPay", JSON.stringify(finalPay));
                await AsyncStorage.setItem("shipping", JSON.stringify(finalShipping));
            } catch (error) {
                console.error("Error saving cart data to storage:", error);
            }
        };
        saveToStorage();
    }, [productsAdded, totalItems, finalPay, finalShipping]);

    const addCart = (product : Product) => {
        setTotalItems(prev => prev + product.amount);
        setFinalPay(prev => prev + product.price * product.amount);

        const productExists = productsAdded.find(p => p._id === product._id);

        if (!productExists) {
            product.shipping = calculateShippingCost(product.amount);
            setFinalShipping(prev => calculateFinalShipping(prev, product.shipping, productsAdded.length + 1));
            setProductsAdded(prev => [...prev, product]);
            alert("Product added to cart");
            return;
        }

        if (productExists.amount + product.amount > product.countInStock) {
            alert("You can't add more than the available stock");
            return;
        }

        const previousShipping = productExists.shipping;
        const previousAmount = productExists.amount;

        setFinalShipping(prev => calculateFinalShipping(prev - previousShipping, calculateShippingCost(product.amount + previousAmount), productsAdded.length + 1));

        productExists.amount += product.amount;
        productExists.shipping = calculateShippingCost(productExists.amount);

        setProductsAdded(prev => {
            return prev.map( p => p._id === product._id ? productExists : p);
        });
        alert("Product added to cart");
        return;
    }


    const removeCart = (productId: string) => {
        setProductsAdded(prev => {
            const product = prev.find(p => p._id === productId);
            if (product) {
                setTotalItems(prevTotal => prevTotal - product.amount);
                setFinalPay(prevFinal => prevFinal - product.price * product.amount);
                setFinalShipping(prevShipping => prevShipping - product.shipping);
            }
            return prev.filter(p => p._id !== productId);
        });
    };

    const clearCart = async () => {
        setProductsAdded([]);
        setTotalItems(0);
        setFinalPay(0);
        setFinalShipping(0);
        try {
            await AsyncStorage.removeItem("cart");
            await AsyncStorage.removeItem("totalItems");
            await AsyncStorage.removeItem("finalPay");
            await AsyncStorage.removeItem("shipping");
        } catch (error) {
            console.error("Error clearing cart data from storage:", error);
        }
    };

    return (
        <CartContext.Provider value={{ productsAdded, totalItems, finalPay, addCart, removeCart, clearCart, loading, finalShipping }}>
            {children}
        </CartContext.Provider>
    );
};

export { CartProvider, CartContext };
