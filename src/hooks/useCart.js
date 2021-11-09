import { useState, useEffect } from 'react';
import { visitFunctionBody } from 'typescript';
import Product from '../components/Product/Product';
import { getStoredCart } from '../utilities/fakedb';

const useCart = () => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const savedCart = getStoredCart();
        const keys = Object.keys(savedCart);
        fetch('http://localhost:5000/bykeys', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(keys)
            })
            .then(res => res.json())
            .then(products => {
                console.log(products)

                if (products.length) {
                    const savedCart = getStoredCart();
                    const storedCart = [];
                    for (const key in savedCart) {
                        const addedProduct = products.find(product => product.key === key);
                        if (addedProduct) {
                            // set quantity
                            const quantity = savedCart[key];
                            addedProduct.quantity = quantity;
                            storedCart.push(addedProduct);
                        }
                    }
                    setCart(storedCart);
                }
            })




    }, []);

    return [cart, setCart];
}

export default useCart;