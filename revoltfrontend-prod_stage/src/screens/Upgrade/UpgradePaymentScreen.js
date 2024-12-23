import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { savePaymentMethod } from "../../actions/cartActions";
import CheckoutSteps from "../../components/CheckoutSteps";

export default function UpgradePaymentScreen(props) {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  // const { shippingAddress } = cart;
  // if (!shippingAddress.address) {
  //   navigate('/shipping');
  // }
  const [paymentMethod, setPaymentMethod] = useState("Razor");
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/upgradeplaceorder");
  };
  return (
    <div>
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Payment Method</h1>
        </div>
        <div>
          <div>
            <input
              type="radio"
              id="Razor pay"
              value="Razor pay"
              name="paymentMethod"
              required
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></input>
            <label htmlFor="Razor pay">Razor pay</label>
          </div>
        </div>

        <div>
          <label />
          <button className="primary" type="submit">
            Continue
          </button>
        </div>
      </form>
    </div>
  );
}
