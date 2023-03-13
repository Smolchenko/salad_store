import useCountItem from "../../hooks/useCountItem";

const ItemLi = ({ ingredient }) => {
  const useItemCount = useCountItem(ingredient.name);

  return (
    <li>
      <span>
        {useItemCount} {ingredient.name}
        {useItemCount > 1 && `s`}{" "}
      </span>
      <span>{(useItemCount * ingredient.price).toFixed(1)} $</span>
    </li>
  );
};

export default ItemLi;
