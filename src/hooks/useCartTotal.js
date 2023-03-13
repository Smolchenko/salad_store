import { useState, useEffect, useContext, useMemo } from "react";
import { ShoppingCartContext } from "../contexts/ShoppingCartContext";

function useCartTotalWithDeliveryOption(includeDelivery) {
  // 1st solution:
  // const [countTotal, setCountTotal] = useState();
  // const { cart } = useContext(ShoppingCartContext);
  // useEffect(() => {
  //   // const total = cart
  //   //   .reduce((acc, item) => acc + item.quantity * item.price, 0)
  //   //   .toFixed(1);
  //   const total = cart.reduce((acc, item) => {
  //     if (includeDelivery || item.name !== "delivery") {
  //       return acc + item.quantity * item.price; // add the item's price to the total if includeDelivery is true or the item is not a delivery item
  //     } else {
  //       return acc; // skip the item if it is a delivery item and includeDelivery is false
  //     }
  //   }, 0);
  //   setCountTotal(total.toFixed(1));
  // }, [cart.map((item) => `${item.quantity}-${item.price}`).join(",")]);
  // In the above code, The dependency is re-written (previous was 'cart').
  // We changed the dependency array to include only the properties of the objects inside the cart array
  // that we are interested in. For example, if item.quantity and item.price are the only properties that
  // can change, then we can write the dependency array like so.
  // In this code, we are creating a new string based on the quantity and price properties of each object
  // in the cart array, and then joining them together into a single string. This new string will only change
  // if the quantity or price values of any of the objects in the cart array change, so we can use it as the
  // dependency array for the useEffect hook.
  // Note that this approach assumes that the quantity and price values are not objects or arrays themselves,
  // and that their values can be safely converted to strings using the ${} string interpolation syntax.
  // If the quantity and price values are more complex, you may need to use a different approach to generate a
  // dependency array that correctly reflects when these values change.

  // const { cart } = useContext(ShoppingCartContext);
  // const countTotal = useMemo(() => {
  //   return cart.reduce((acc, item) => {
  //     if (includeDelivery || item.name !== "delivery") {
  //       return acc + item.quantity * item.price; // add the item's price to the total if includeDelivery is true or the item is not a delivery item
  //     } else {
  //       return acc; // skip the item if it is a delivery item and includeDelivery is false
  //     }
  //   }, 0);
  // }, [cart.map((item) => `${item.quantity}-${item.price}`).join(",")]);
  // // 2nd solution -
  // // `useMemo and useCallback are intended for optimizing expensive computations or function references, respectively,
  // // but they are not designed to manage component state.`
  // // In the 1st code, you are using useState to manage the state of the countTotal variable, so you should use useEffect
  // // to update it whenever the cart context value changes. This ensures that the countTotal value is always up-to-date
  // // with the current contents of the cart.
  // // `useMemo and useCallback can be used in conjunction with useEffect to optimize the performance of the computation
  // // that generates the countTotal value. For example, you could use useMemo to memoize the result of the reduce method
  // //  so that it is only recomputed when the cart context value changes.
  // // In this code, we are using useMemo to memoize the result of the reduce method based on the cart context value. Thi
  // // ensures that the reduce method is only called when the cart context value changes, and the result is cached until the next change.
  // // Here, we are returning the countTotal value directly from the hook, which is a memoized value based on the cart context value.

  // // If you need to manage the state of countTotal and update it dynamically based on changes in the cart context value,
  // // then you should use the useEffect approach with the state variable. This ensures that the state variable is always up-to-date
  // //with the latest cart values, and it provides a mechanism for re-rendering the component when the state changes.
  // // On the other hand, if you only need to compute the total value based on the cart context value and you don't need to manage
  // // it as a state variable, then you can use the useMemo approach without the state variable. This can be more performant since
  // // it avoids the overhead of managing the state variable, but it may not be as flexible as the useEffect approach if you need to
  // // perform additional logic based on the countTotal value.
  // // In summary, the useEffect approach with a state variable is better if you need to manage the state of countTotal, while the
  // //useMemo approach without the state variable is better if you only need to compute the value and don't need to manage it as state.
  // return countTotal.toFixed(1);

  // 3rd solution - using both useEffect and useMemo
  // The console output shows that useMemo runs first, since it is called before useEffect. Then, useEffect runs twice:
  // once when the component mounts or when the cart prop changes, and once when the useCartTotalWithDeliveryOption hook
  // is called again with a different set of dependencies.
  const [countTotal, setCountTotal] = useState(0);
  const { cart } = useContext(ShoppingCartContext);
  useEffect(() => {
    const total = cart.reduce((acc, item) => {
      if (includeDelivery || item.name !== "delivery") {
        return acc + item.quantity * item.price;
      } else {
        return acc;
      }
    }, 0);
    setCountTotal(total);
    console.log("useCartTotal: useEffect running");
    // }, [cart]); // doesn't seem to matter which of the 2 lines I use, it runs
  }, [cart.map((item) => `${item.quantity}-${item.price}`).join(",")]);

  const formattedTotalPrice = useMemo(() => {
    console.log("useCartTotal: useMemo running");
    return `${countTotal.toFixed(1)} $`;
  }, [countTotal]);
  // In the given useCartTotalWithDeliveryOption hook, both useEffect and useMemo are necessary and serve different purposes.
  // useEffect is used to update the countTotal state whenever the cart prop changes. Without useEffect, the countTotal state
  // would not be updated correctly when the contents of the cart change.
  // useMemo is used to memoize the formattedTotalPrice value based on the countTotal state. This is important because
  // formattedTotalPrice is used in the return statement of the hook and may be called multiple times in the same component
  // rendering cycle. Memoizing the value using useMemo ensures that the formattedTotalPrice value is only recalculated when the
  // countTotal state changes, and not on every re-render.
  // Therefore, both hooks are necessary to ensure that the useCartTotalWithDeliveryOption hook works correctly and efficiently.
  // If you remove either hook, the hook may not work as intended or may have performance issues.

  return formattedTotalPrice;
}

export default useCartTotalWithDeliveryOption;
