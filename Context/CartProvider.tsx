import { createContext, useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    const [finalShipping, setfinalShipping] = useState<number>(0);
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
                    setfinalShipping(JSON.parse(ship));
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

    const addCart = (product: Product) => {
        setProductsAdded(prev => {
            const productExist = prev.find(p => p._id === product._id);
            if (productExist) {
                if (productExist.amount + product.amount > product.countInStock) {
                    const updatedProducts = prev.map(p => p._id === product._id ? { ...p, amount: product.countInStock } : p);
                    const totalItemsDiff = product.countInStock - productExist.amount;
                    setTotalItems(prevTotal => prevTotal + totalItemsDiff);
                    setFinalPay(prevFinal => prevFinal + product.price * totalItemsDiff);
                    setfinalShipping(prevShipping => {
                        if (productsAdded.length >= 2) {
                            return (prevShipping + product.shipping) * 0.7
                        }
                        return prevShipping + product.shipping
                    });
                    return updatedProducts;
                }
                const updatedProducts = prev.map(p => p._id === product._id ? { ...p, amount: p.amount + product.amount } : p);
                setTotalItems(prevTotal => prevTotal + product.amount);
                setFinalPay(prevFinal => prevFinal + product.price * product.amount);
                setfinalShipping(prevShipping => {
                    if (productsAdded.length >= 2) {
                        return (prevShipping + product.shipping) * 0.7
                    }
                    return prevShipping + product.shipping
                });
                return updatedProducts;
            }
            setTotalItems(prevTotal => prevTotal + product.amount);
            setFinalPay(prevFinal => prevFinal + product.price * product.amount);
            setfinalShipping(prevShipping => {
                if (productsAdded.length >= 2) {
                    return (prevShipping + product.shipping) * 0.7
                }
                return prevShipping + product.shipping
            });
            return [...prev, product];
        });
    };

    const removeCart = (productId: string) => {
        setProductsAdded(prev => {
            const product = prev.find(p => p._id === productId);
            if (product) {
                setTotalItems(prevTotal => prevTotal - product.amount);
                setFinalPay(prevFinal => prevFinal - product.price * product.amount);
                setfinalShipping(prevShipping => prevShipping - product.shipping);
            }
            return prev.filter(p => p._id !== productId);
        });
    };

    const clearCart = async () => {
        setProductsAdded([]);
        setTotalItems(0);
        setFinalPay(0);
        setfinalShipping(0);
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
