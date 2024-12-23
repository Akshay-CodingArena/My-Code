import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import Razorpay from "razorpay";
import { addToCart, removeFromCart } from "../actions/cartActions";
import MessageBox from "../components/MessageBox";
import Axios from "axios";
import CheckoutSteps from "../components/CheckoutSteps";

export default function CartScreen(props) {
  const navigate = useNavigate();
  const params = useParams();
  const { id: productId } = params;

  const { search } = useLocation();
  const qtyInUrl = new URLSearchParams(search).get("qty");
  const qty = qtyInUrl ? Number(qtyInUrl) : 1;

  const cart = useSelector((state) => state.cart);
  const { cartItems, error } = cart;
  const dispatch = useDispatch();
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    // delete action
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/signin?redirect=/placeorder");
  };

  const userInfo_info = localStorage.getItem("userInfo");
  const userInfo_myArr = JSON.parse(userInfo_info);
  //const subscription_myArr =userInfo_myArr.subscription;

  const cartItem_arr = localStorage.getItem("cartItems");
  const cartitem_myArr = JSON.parse(cartItem_arr);
  //const subscription_myArr = cartitem_myArr.subscription;
  // console.log(cartitem_myArr);
  // <h1>Product Model</h1>
  return (
    <div className="row top">
      <CheckoutSteps step1 step2></CheckoutSteps>
      <div className="col-2">
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        {cartitem_myArr.length === 0 || cartitem_myArr === undefined ? (
          <MessageBox>
            <Link to="/">Go Product</Link>
          </MessageBox>
        ) : (
          <div>
            {cartitem_myArr.product.map((item, key) => (
              <div id={key}>
                <div className="row">
                  <div>
                    <img
                      src="/images/p1.png"
                      alt={item.model_family_name}
                      className="medium"
                    ></img>
                  </div>
                  <div className="min-30">
                    <Link to={`/product/${item.model_id}`}>
                      {item.model_family_name}
                    </Link>
                  </div>
                  <div></div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="col-1">
        <div className="card card-body">
          {cartitem_myArr.subscription.length < 1 ||
          cartitem_myArr.subscription == undefined ? (
            <MessageBox>No data Found!</MessageBox>
          ) : (
            <ul>
              {cartitem_myArr.subscription.map((item, key) => (
                <div id={key}>
                  <li>
                    <h2>Booking Amount: &#8377;{item.booking_amount} </h2>
                  </li>
                  <li>
                    <h2>
                      Vehicle Ex-Showroom Price(a): &#8377;{item.ex_price}
                    </h2>
                  </li>
                  <li>
                    <h2>
                      Fame II Incentive (b): &#8377;
                      {item.fame_subsidy_at_booking}
                    </h2>
                  </li>
                  <li>
                    <h2>
                      Cost Before on Raod(a-b): &#8377;
                      {item.ex_price - item.fame_subsidy_at_booking}
                    </h2>
                  </li>
                  {userInfo_myArr === "undefined" || userInfo_myArr === null ? (
                    <div>
                      <li>
                        <h2>State Incentive: &#8377;{0}</h2>
                      </li>
                      <li>
                        <h2>
                          Effective Cost before on Road: &#8377;
                          {item.ex_price - item.fame_subsidy_at_booking}
                        </h2>
                      </li>
                    </div>
                  ) : (
                    <div>
                      <li>
                        <h2>State Incentive: &#8377;{userInfo_myArr.area}</h2>
                      </li>
                      <li>
                        <h2>
                          Effective Cost before on Road: &#8377;
                          {item.ex_price -
                            item.fame_subsidy_at_booking -
                            userInfo_myArr.area}
                        </h2>
                      </li>
                    </div>
                  )}
                </div>
              ))}
            </ul>
          )}
        </div>
        <div>
          <ul>
            <li>
              <button
                type="button"
                onClick={checkoutHandler}
                className="primary block"
                disabled={cartitem_myArr.subscription.length === 0}
              >
                Select
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );

  /* <button
                          type="button"
                          onClick={() => removeFromCartHandler(item.model_id)}>
                          Delete
                        </button>*/
}
