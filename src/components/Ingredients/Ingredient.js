import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { ShoppingCartContext } from "../../contexts/ShoppingCartContext";
import useCountItem from "../../hooks/useCountItem";
import ItemTotal from "../OrderDetails/ItemTotal";
import CartButton from "./CartButton";

const Ingredient = ({ item }) => {
  const countItem = useCountItem(item.name);
  const { addProductToCart, removeProductFromCart } =
    useContext(ShoppingCartContext);

  return (
    <tr key={item.name}>
      <td>
        <Link to={item.name}>{item.name}</Link>
      </td>
      <td>{item.price} $</td>
      <td>
        <CartButton
          onClick={removeProductFromCart.bind(this, item)}
          disabled={countItem === 0}
        >
          -
        </CartButton>
        <span> {countItem} </span>
        <CartButton onClick={addProductToCart.bind(this, item)}>+</CartButton>
      </td>
      <td>
        <ItemTotal item={item} />
      </td>
    </tr>
  );
};

export default Ingredient;
