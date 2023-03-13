import { useParams, Link } from "react-router-dom";

const IngredientDetailPage = () => {
  const params = useParams();

  return (
    <>
      <h1>Ingredient page</h1>
      <p>{params.ingredientId}</p>
      <Link className="back" to=".." relative="path">
        Back
      </Link>
    </>
  );
};

export default IngredientDetailPage;
