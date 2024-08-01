import { createContext, useState } from "react";

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
    amount: number
}

const CartProvider = ({ children }: CartProviderProps) => {
    const [productsAdded, setProductsAdded] = useState<Product[]>([]);
    const [totalItems, setTotalItems] = useState<number>(0);
    const [finalPay, setFinalPay] = useState<number>(0);

    const addCart = (product: Product, max: number) => {
        const productExist = productsAdded.find(p => p._id === product._id);
        if (productExist) {
            // If the addition of the amount of the product exceeds the stock, set the amount to the stock
            if (productExist.amount + product.amount > product.countInStock) {
                setProductsAdded(productsAdded.map(p => p._id === product._id ? { ...p, amount: product.countInStock } : p));
                setTotalItems(totalItems + product.countInStock - productExist.amount);
                setFinalPay(finalPay + product.price * (product.countInStock - productExist.amount));
                return;
            }
            // If the addition of the amount of the product does not exceed the stock, add the amount to the product
            setProductsAdded(productsAdded.map(p => p._id === product._id ? { ...p, amount: p.amount + product.amount } : p));
            setTotalItems(totalItems + product.amount);
            setFinalPay(finalPay + product.price * product.amount);
            return;
        }
        // If the product does not exist in the cart, add the product to the cart
        setTotalItems(totalItems + product.amount);
        setFinalPay(finalPay + product.price * product.amount);
        setProductsAdded(prev => [...prev, product]);
        return;
    };

    const removeCart = (productId: string) => {
        const product = productsAdded.find(p => p._id === productId);
        setTotalItems(totalItems - product.amount);
        setFinalPay(finalPay - product.price * product.amount);
        setProductsAdded(productsAdded.filter(p => p._id !== productId));
        return;
    };

    const clearCart = () => {
        setProductsAdded([]);
        setFinalPay(0);
        setTotalItems(0);
        return;
    };

    return (
        <CartContext.Provider value={{ productsAdded, totalItems, finalPay, addCart, removeCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );

}

export { CartProvider, CartContext };
