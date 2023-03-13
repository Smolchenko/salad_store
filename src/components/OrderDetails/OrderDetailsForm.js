import React, { useContext, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";

import { AuthContext } from "../../contexts/AuthContext";
import { ShoppingCartContext } from "../../contexts/ShoppingCartContext";
import Modal from "../Modal/Modal";

import styles from "./OrderDetails.module.css";

// const validationSchema = Yup.object().shape({
//   userName: Yup.string().required("Your name is required"),
//   email: Yup.string().required("Email is required"),
// });

const EMAIL_FORMAT = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

const OrderDetailsForm = () => {
  const { formData, setFormData } = useContext(AuthContext);
  const { cart } = useContext(ShoppingCartContext);
  const [openModal, setOpenModal] = useState(false);

  return (
    <section className={styles.section}>
      <div className={styles.form}>
        <h2>Your Information</h2>
        <Formik
          initialValues={
            !formData
              ? { userName: "", email: "", notes: "" }
              : {
                  userName: formData.userName,
                  email: formData.email,
                  notes: formData.notes,
                }
          }
          validate={(values) => {
            const errors = {};

            values.userName === "" && (errors.userName = "Required");
            if (!values.email) {
              errors.email = "Required";
            } else if (!EMAIL_FORMAT.test(values.email)) {
              errors.email = "Invalid email address";
            }

            return errors;
          }}
          // validationSchema={validationSchema}

          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              setFormData(values);
              setOpenModal(true);
              setFormData((prevUser) => ({ ...prevUser, placedOrder: true }));
              setSubmitting(false);
            }, 1400);
          }}
        >
          {({ isValid, isSubmitting, touched }) => (
            <Form>
              <label htmlFor="userName">
                Your name{": "}
                <Field type="text" name="userName" />
                <ErrorMessage
                  className="errorMsg"
                  component="div"
                  name="userName"
                />
              </label>
              <label htmlFor="email">
                Your email{": "}
                <Field type="email" name="email" />
                <ErrorMessage
                  className="errorMsg"
                  component="div"
                  name="email"
                />
              </label>
              <label htmlFor="notes">
                Additional Notes {": "}
                <Field component="textarea" name="notes" id="notes" rows="8" />
                <ErrorMessage
                  className="errorMsg"
                  component="div"
                  name="notes"
                />
              </label>
              <div className="order">
                {cart.length === 1 && (
                  <span className={styles.emptyCartComment}>
                    Your salad is empty, please select ingredients
                  </span>
                )}
                {formData.placedOrder && (
                  <span className={styles.receivedOrderComment}>
                    You have already placed an order
                  </span>
                )}
                <button
                  className="btn"
                  type="submit"
                  disabled={
                    formData.placedOrder ||
                    !isValid ||
                    !(touched.userName && touched.email) ||
                    cart.length === 1 ||
                    isSubmitting
                  }
                >
                  {isSubmitting && openModal
                    ? "Submitting..."
                    : formData.placedOrder
                    ? "Order Placed"
                    : "Submit Order"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      {openModal && <Modal closeModal={setOpenModal} />}
    </section>
  );
};

export default OrderDetailsForm;
