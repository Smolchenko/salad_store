import { useContext, useEffect, useState, useMemo } from "react";
import { NavLink } from "react-router-dom";

import { AuthContext } from "../../contexts/AuthContext";

import styles from "./Navigation.module.css";

const image_logo = require("../../assets/images/logo-salad-restaurant.png");

export default function Navigation() {
  const { formData } = useContext(AuthContext);
  const [contextData, setContextData] = useState(formData);

  // Using an object as the state variable in MyOtherComponent is not necessarily a problem,
  // but there are some considerations to keep in mind regarding efficiency and performance.
  // When a state variable in a React component changes, the component will re-render to reflect the updated state.
  // If the state variable is an object, React will consider it to have changed if any of its properties have changed.
  // This means that even if only one property of the object has changed, the entire object will be considered as having changed,
  // which can lead to unnecessary re-renders.
  // To address this issue, you can use the useMemo hook to memoize the context data object and only update it when the form data
  // in the context actually changes. This can help to reduce the number of unnecessary re-renders.
  const memoizedData = useMemo(() => contextData, [contextData]);
  // Here, the useMemo hook is used to memoize the contextData object. The memoizedData variable is then used in the component's JSX,
  // rather than the original contextData variable. The useMemo hook will only recalculate the memoizedData value when the contextData
  //object actually changes, reducing unnecessary re-renders.
  // You may also consider using the useCallback hook to memoize any functions that depend on the context data,
  //such as event handlers or other functions that manipulate the data. This can help to further optimize the component's performance.
  useEffect(() => {
    setContextData(formData);
  }, [formData]);

  return (
    <header>
      <nav className={styles.nav}>
        <div className={styles.nav_logo}>
          <img className={styles.nav_logo_img} src={image_logo} alt="logo" />
          <p>Fresh and Tasty</p>
        </div>
        <ul className={styles.nav_links}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? styles.active : undefined
              }
              end
            >
              {memoizedData?.userName
                ? `${memoizedData.userName}'s home`
                : "Home"}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/ingredients"
              className={({ isActive }) =>
                isActive ? styles.active : undefined
              }
            >
              Ingredients
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
