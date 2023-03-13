import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import useCartTotalWithDeliveryOption from "../../hooks/useCartTotal";
import Ingredient from "./Ingredient";

import styles from "./Ingredients.module.css";

export default function IngredientsList() {
  const [data, setData] = useState([]);
  const countTotal = useCartTotalWithDeliveryOption(false);

  useEffect(() => {
    async function getData() {
      const response = await fetch("./salad.json");
      const newData = await response.json();

      setData(newData.items);
    }
    getData();
  }, []);

  return (
    <>
      <section className={styles.section}>
        <div>
          <table cellSpacing="0">
            <thead>
              <tr>
                <th>Ingredient</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.length > 0 &&
                data.map((item) => <Ingredient key={item.name} item={item} />)}
              <tr>
                <td />
                <td />
                <td />
                <td>Total: {countTotal}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="order">
          <Link to="/order">
            <button className="btn">Checkout</button>
          </Link>
        </div>
      </section>
    </>
  );
}
