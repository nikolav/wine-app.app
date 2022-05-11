import React, { useContext, useState } from "react";

export const ShopContext = React.createContext();
export const useShop = () => useContext(ShopContext);

export default function ShopContextProvider({ children }) {
  const [products, setProducts] = useState({});
  const value = {
    products,

    addProduct,
    findProduct,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;

  // main api
  function addProduct(product) {
    if (!(product.id in products))
      setProducts((_) => ({ ..._, [product.id]: { ...product } }));
  }
  function findProduct(callback) {
    const id = Object.keys(products).find(find_, { callback });
    return products[id] || null;
  }

  // helpers
  function find_(id) {
    return true === this.callback(products[id]);
  }
}
