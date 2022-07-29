import React, { createContext, useContext, useState } from "react";
import Product from "../components/Product";
const ShopContext = createContext();

export const StateContext = ({ children }) => {
  //Add our data for the state
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [qty, setQty] = useState(1);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const increaseQty = () => {
    setQty(qty + 1);
  };
  const decreaseQty = () => {
    if (qty - 1 > 0) setQty(qty - 1);
    else setQty(1);
  };
  const resetQty = () => {
    setQty(0);
  };
  //Add product to cart
  const onAdd = (product, quantity) => {
    //set total price
    setTotalPrice((prevTotal) => prevTotal + product.price * quantity);
    //INcrease total quantity
    setTotalQuantities((prevTotal) => prevTotal + quantity);
    //Check if the product is already in the cart
    const exist = cartItems.find((item) => item.slug === product.slug);
    if (exist)
      setCartItems(
        cartItems.map((item) =>
          item.slug === product.slug
            ? { ...exist, quantity: exist.quantity + quantity }
            : item
        )
      );
    else setCartItems([...cartItems, { ...product, quantity: quantity }]);
  };

  const onRemove = (product) => {
    //set total price
    setTotalPrice((prevTotal) => prevTotal - product.price);
    //Decrease total quantity
    setTotalQuantities((prevTotal) => prevTotal - 1);
    //Check if the product is already in the cart
    const exist = cartItems.find((item) => item.slug === product.slug);
    if (exist.quantity === 1) {
      setCartItems(cartItems.filter((item) => item.slug !== product.slug));
    } else {
      setCartItems(
        cartItems.map((item) =>
          item.slug === product.slug ? { ...exist, quantity: exist.quantity - 1 } : item
        )
      );
    }
  };

  return (
    <ShopContext.Provider
      value={{
        qty,
        increaseQty,
        decreaseQty,
        onAdd,
        showCart,
        setShowCart,
        cartItems,
        resetQty,
        onRemove,
        totalQuantities,
        setTotalQuantities,
        totalPrice,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useStateContext = () => useContext(ShopContext);
