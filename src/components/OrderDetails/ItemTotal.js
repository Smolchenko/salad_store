import useCountItem from "../../hooks/useCountItem";

const ItemTotal = ({ item }) => {
  const countItem = useCountItem(item.name);
  const result = countItem * item.price;

  return parseFloat(result) !== 0 ? result + " $" : " - ";
};

export default ItemTotal;

// In the given component, ItemTotal, I'm calculating the total price of an item based on its quantity and price.
// Since I'm not using any expensive or complex computations to calculate the total price, there is no need to use useMemo here.

// useMemo is used to memoize a value that is expensive to compute (takes a long time to calculate or involves complex computations.
// The purpose of useMemo is to optimize performance by avoiding unnecessary re-calculations of a value that has not changed.

// In current case, I'm simply multiplying two numbers and rounding the result to one decimal place. This is not an expensive or
// complex computation, and therefore, there is no need to use useMemo.
