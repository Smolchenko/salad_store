// import { useEffect } from "react";
import { OrderDetails, OrderDetailsForm } from "../components";

const CheckoutPage = () => {
  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, []);

  return (
    <>
      <h1>Below are your order's detalils</h1>
      <OrderDetails />
      <OrderDetailsForm />
    </>
  );
};

export default CheckoutPage;
