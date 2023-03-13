import { useContext, useMemo, useEffect, useState } from "react";
import { ShoppingCartContext } from "../contexts/ShoppingCartContext";

const useCountItem = (itemName) => {
  // 1st solution
  // const { cart } = useContext(ShoppingCartContext);
  // const countSpecificItem = useMemo(() => {
  //   const foundItem = cart.find((i) => i.name === itemName);
  //   console.log("inside customHook", itemName, foundItem);

  //   return foundItem ? foundItem.quantity : 0;
  //   // }, [cart, itemName]);
  // }, [
  //   cart.map((item) => `${item.quantity}-${item.price}`).join(","),
  //   itemName,
  // ]);

  // const { cart } = useContext(ShoppingCartContext);
  // const [countSpecificItem, setCountSpecificItem] = useState(0);
  // useEffect(
  //   () => {
  //     const foundItem = cart.find((i) => i.name === itemName);
  //     setCountSpecificItem(foundItem ? foundItem.quantity : 0);
  //   },
  //   [cart.map((item) => `${item.quantity}-${item.price}`).join(",")],
  //   itemName
  // );
  // 2nd solution
  // return countSpecificItem;

  const { cart } = useContext(ShoppingCartContext);
  const [countSpecificItem, setCountSpecificItem] = useState(0);

  useEffect(() => {
    const foundItem = cart.find((i) => i.name === itemName);
    setCountSpecificItem(foundItem ? foundItem.quantity : 0);
    // console.log("useCountItem: useEffect running");
  }, [
    cart.map((item) => `${item.quantity}-${item.price}`).join(","),
    itemName,
  ]);

  const itemAmount = useMemo(() => {
    // console.log("useCountItem: useMemo running", itemName);
    return countSpecificItem;
  }, [countSpecificItem]);

  return itemAmount;
  // 3rd solution? Same as in useCartTotal?
};

export default useCountItem;
