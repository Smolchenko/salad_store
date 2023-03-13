import { useContext, useMemo } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../../contexts/AuthContext";
import { ShoppingCartContext } from "../../contexts/ShoppingCartContext";
import useCartTotalWithDeliveryOption from "../../hooks/useCartTotal";
import ItemLi from "./ItemLi";

import styles from "./Modal.module.css";

const Modal = ({ closeModal }) => {
  const { formData } = useContext(AuthContext);
  const { cart } = useContext(ShoppingCartContext);
  const countTotal = useCartTotalWithDeliveryOption(true);
  const countTotalDisplay = useMemo(() => countTotal, [countTotal]);

  return (
    <div className={styles.modalBackground}>
      <div className={styles.modalContainer}>
        <div className={styles.titleCloseBtn}>
          <Link to="/order">
            <button onClick={() => closeModal(false)}> X </button>
          </Link>
        </div>
        <div className={styles.title}>
          <h1>Thank you {formData.userName}!</h1>
        </div>
        <div className={styles.body}>
          <span>You've ordered:</span>
          <ul>
            {cart &&
              cart.length > 1 &&
              cart
                .slice(1)
                .map((item) => <ItemLi key={item.name} ingredient={item} />)}
            {cart && cart.length > 1 && (
              <li className={styles.devileryCost}>
                <span>+ {cart[0].name}</span>
                <span>{cart[0].price}$</span>
              </li>
            )}
          </ul>
          <span className={styles.total}>Total: {countTotalDisplay}</span>
          {formData.notes.length > 0 && (
            <div>
              <span> Your notes: </span>
              <span>{formData.notes} </span>
            </div>
          )}
        </div>
        <div className={styles.footer}>
          <Link to="/">
            <button onClick={() => closeModal(false)} id="cancelBtn">
              Close
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Modal;
