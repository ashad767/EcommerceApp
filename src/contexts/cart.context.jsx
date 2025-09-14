import { createContext, useEffect, useState } from "react";

const addCartItem = (products, productToAdd) => {
    const existingProduct = products.find(
        (product) => product.id === productToAdd.id
    )

    if (existingProduct) {
        return products.map((product) =>
            product.id === productToAdd.id ? { ...product, quantity: product.quantity + 1 } : product
        )
    }

    return [...products, { ...productToAdd, quantity: 1 }]
}

const removeCartItem = (products, productToRemove, all) => {
    const existingProduct = products.find(
        (product) => product.id === productToRemove.id
    )

    if (!all && existingProduct.quantity > 1) {
        return products.map((product) =>
            product.id === productToRemove.id ? { ...product, quantity: product.quantity - 1 } : product
        )
    }

    return products.filter(
        (product) => product.id !== productToRemove.id
    )
}

// value you want to access
export const CartContext = createContext({
    products: [],
    open: false,
    count: 0,
    addItemToCart: () => null,
    removeItemFromCart: () => null,
    clearCart: () => null,
    setOpen: () => {},
    total: 0,
})

export const CartProvider = ({ children }) => {
    const [products, setProducts] = useState([])
    const [open, setOpen] = useState(false)
    const [count, setCount] = useState(0)
    const [total, setTotal] = useState(0)

    const addItemToCart = (productToAdd) => {
        setProducts(addCartItem(products, productToAdd))
    }

    const removeItemFromCart = (productToRemove, all) => {
        setProducts(removeCartItem(products, productToRemove, all))
    }

    const clearCart = () => {
        setProducts([]);
    }

    useEffect(() => {
        setCount(products.reduce((count, product) => count + product.quantity, 0))
    }, [products])
    
    useEffect(() => {
        setTotal(products.reduce((count, product) => count + product.price * product.quantity, 0))
    }, [products])

    const value = { products, open, count, total, setOpen, addItemToCart, removeItemFromCart, clearCart }

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
} 