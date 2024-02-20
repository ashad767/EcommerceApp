import { createContext, useEffect, useState } from "react";

const addCartItem = (products, productToAdd) => {
    const existingProduct = products.find(
        (product) => product.id === productToAdd.id
    )

    if(existingProduct) {
        return products.map((product) => 
            product.id === productToAdd.id ? {...product, quantity: product.quantity + 1} : product
        )
    }

    return [...products, { ...productToAdd, quantity: 1 }]
}

// value you want to access
export const CartContext = createContext({
    products: [],
    open: false,
    count: 0,
    addItemToCart: () => null,
    setOpen: () => {},
})

export const CartProvider = ({ children }) => {
    const [products, setProducts] = useState([])
    const [open, setOpen] = useState(false)
    const [count, setCount] = useState(0)

    const addItemToCart = (productToAdd) => {
        setProducts(addCartItem(products, productToAdd))
    }

    useEffect(() => {
        setCount(products.reduce((count, product) => count + product.quantity, 0))
    }, [products])

    const value = { products, open, count, setOpen, addItemToCart }

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
} 