import { useContext } from "react";

import { ShoppingCartContext } from "../../contexts/ShoppingCartContext";
import useCartTotalWithDeliveryOption from "../../hooks/useCartTotal";
import ItemTotal from "./ItemTotal";

import styles from "./OrderDetails.module.css";

const OrderDetails = () => {
  const countTotal = useCartTotalWithDeliveryOption(true);
  const { cart } = useContext(ShoppingCartContext);

  return (
    <section className={styles.section}>
      <div className={styles.description}>
        <h2>Order Details</h2>
        <div>
          {cart &&
            cart.length > 0 &&
            cart.map((item) => {
              return (
                <div className={styles.row} key={item.name}>
                  <div>{item.name}</div>
                  <div className={styles.dots}></div>
                  <div>{item.quantity} pcs</div>
                  <div>
                    <ItemTotal item={item} />
                  </div>
                </div>
              );
            })}
        </div>
        <p>
          <span>Total: {countTotal}</span>
        </p>
      </div>
    </section>
  );
};

export default OrderDetails;
