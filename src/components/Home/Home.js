import { Link } from "react-router-dom";
import { WELCOME_TEXT, DUMMY_TEXT } from "./constants";

import styles from "./Home.module.css";

const Home = () => {
  const welcome_text = WELCOME_TEXT;
  const dummy_text = DUMMY_TEXT;

  return (
    <>
      <div className={styles.header}>
        <p>{welcome_text}</p>
      </div>
      <div className="order">
        <Link to="/ingredients">
          <button className="btn">Order Salad</button>
        </Link>
      </div>
      <div className={styles.info}>
        <p>
          {dummy_text}
          <span>- Reenie Sm</span>
        </p>
        <p>
          {dummy_text}
          <span>- Reenie Sm</span>
        </p>
      </div>
    </>
  );
};

export default Home;
