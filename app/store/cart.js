import React, { useContext, useState } from "react";

export const CartContext = React.createContext();
export const useCart = () => useContext(CartContext);

export default function CartContextProvider({ children }) {
  // cart: { [key: ID]: object extends { id: ID } }
  const [cart, setCart] = useState({});
  const cartValue = {
    cart,
    addItemToCart,
    removeItemFromCart,
  };

  return (
    <CartContext.Provider value={cartValue}>{children}</CartContext.Provider>
  );

  // main api
  function addItemToCart(item) {

    const { id } = item;

    if (!(id in cart))
      return setCart((_) => ({ ..._, [id]: { ...item, quantity: 1 } }));
    //
    setCart((cart_) => {
      cart_ = { ...cart_ };
      cart_[id].quantity += 1;
      return cart_;
    });
  }
  function removeItemFromCart(item) {

    const { id } = item;

    if (!(id in cart)) return;
    if (1 === cart[item.id].quantity)
      return setCart((cart_) => {
        cart_ = { ...cart_ };
        delete cart_[item.id];
        return cart_;
      });
    //
    setCart((cart_) => {
      cart_ = { ...cart_ };
      cart_[item.id].quantity -= 1;
      return cart_;
    });
  }
}
