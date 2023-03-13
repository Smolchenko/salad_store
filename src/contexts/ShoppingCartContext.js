import { createContext, useReducer } from "react";
import cartReducer from "../reducers/cartReducer";

export const ADD_PRODUCT = "ADD_PRODUCT";
export const REMOVE_PRODUCT = "REMOVE_PRODUCT";

const ShoppingCartContext = createContext();

const DEFAULT_STATE = {
  cart: [{ name: "delivery", price: 15, quantity: 1 }],
};

const ShoppingCartProvider = ({ children }) => {
  const [cartState, dispatch] = useReducer(cartReducer, DEFAULT_STATE);

  const addProductToCart = (product) => {
    setTimeout(() => {
      dispatch({ type: ADD_PRODUCT, product: product });
    }, 200);
  };

  const removeProductFromCart = (productId) => {
    setTimeout(() => {
      dispatch({ type: REMOVE_PRODUCT, productId: productId });
    }, 200);
  };

  return (
    <ShoppingCartContext.Provider
      value={{
        cart: cartState.cart,
        addProductToCart,
        removeProductFromCart,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};

export { ShoppingCartContext, ShoppingCartProvider };
