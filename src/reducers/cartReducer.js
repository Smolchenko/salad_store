import { ADD_PRODUCT, REMOVE_PRODUCT } from "../contexts/ShoppingCartContext";

const addProductToCart = (product, state) => {
  const updatedCart = [...state.cart];
  // Does it already exist?
  const updatedItemIndex = updatedCart.findIndex(
    (item) => item.name === product.name
  );

  if (updatedItemIndex < 0) {
    // product wasn't found in the cart and should be added
    // salad.json items each only have {name: .., price: ..}
    // so we need to add 'quantity' as well
    updatedCart.push({ ...product, quantity: 1 });
  } else {
    // go to the existing product in cart for alteration
    const updatedItem = {
      ...updatedCart[updatedItemIndex],
    };
    updatedItem.quantity++;
    updatedCart[updatedItemIndex] = updatedItem;
  }

  return { ...state, cart: updatedCart };
};

const removeProductFromCart = (productId, state) => {
  const updatedCart = [...state.cart];
  const updatedItemIndex = updatedCart.findIndex(
    (item) => item.name === productId.name
  );
  const updatedItem = {
    ...updatedCart[updatedItemIndex],
  };

  updatedItem.quantity--;
  if (updatedItem.quantity <= 0) {
    updatedCart.splice(updatedItemIndex, 1);
  } else {
    updatedCart[updatedItemIndex] = updatedItem;
  }

  return { ...state, cart: updatedCart };
};

// The reducer function determines how the state updates in response to the dispatched actions
const cartReducer = (state, action) => {
  switch (action.type) {
    case ADD_PRODUCT:
      return addProductToCart(action.product, state);
    case REMOVE_PRODUCT:
      return removeProductFromCart(action.productId, state);
    default:
      return state;
  }
};

export default cartReducer;
