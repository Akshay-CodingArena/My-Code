import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import {
  createReview,
  detailsProduct,
  productBycolor,
} from "../../actions/productActions";
import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";
import Rating from "../../components/Rating";
import {
  PRODUCT_REVIEW_CREATE_RESET,
  PRODUCT_DETAILS_RESET,
} from "../../constants/productConstants";
import {
  UPGRADE_ORDER_PAY_RESET,
  ORDER_UPGRADE_RESET,
} from "../../constants/orderConstants";
import { addToCart, removeFromCart } from "../../actions/cartActions";

import {
  productUpdateReducer,
  productDetailsReducer,
} from "../../reducers/productReducers";
import { ROOT_PATH } from "../../constants/cartConstants";
import { bookingout } from "../../actions/userActions";
import NumberFormat from "react-number-format";

export default function UpgradeProductScreen(props) {
  const userInfo_info = localStorage.getItem("bookinginfo");

  const cartItem_arr = localStorage.getItem("cartItems");
  const cartitem_myArr = JSON.parse(cartItem_arr);

  ///
  const { error } = "";
  const upgrade = localStorage.getItem("upgrade");
  const upgrade_product = JSON.parse(upgrade);

  const UpgradePlan = localStorage.getItem("UpgradePlan");
  const UpgradePlan_myArr = JSON.parse(UpgradePlan);
  const [selectedplan, setSelectedplan] = useState();
  ////

  const userInfo_myArr = JSON.parse(userInfo_info);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const params = useParams();
  const { id: productId } = params;
  const { search } = useLocation();

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  useEffect(() => {
    // if (!userInfo_info) {
    //   navigate(`/upgradeproduct`+search);
    // }
    // dispatch(productBycolor(productId,modelColor,selectedPlan,userInfo_myArr));
  }, []);

  const addToCartHandler = () => {
    navigate(`/upgradeplaceorder` + search);

    // dispatch({ type: PRODUCT_DETAILS_RESET });
    // dispatch({ type: ORDER_UPGRADE_RESET });
    // dispatch({ type: UPGRADE_ORDER_PAY_RESET });
  };

  ///////////////
  // const selectPlan = (event) => {
  //     var entry = product.purchasee_plan.findIndex(function (e) {
  //         //return e.productId == value;

  //         return e.id == event.target.value;
  //     });

  //     // console.log("Before quantity: ", product.subscription[0])
  //      console.log(entry)
  //     product.subscription[0] = product.purchasee_plan[entry];
  //      console.log(product.subscription[0])
  //      setSelectedPlan(event.target.value)
  //      localStorage.setItem('cartItems', JSON.stringify(product));
  // };

  //////////////////

  return (
    <>
      {/* new design start */}

      <section className="light-grey bookNow padding-top-100 padding-bottom-100">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 text-center ">
              <div className="form-bg" id="ms-form">
                <ul id="progressbar">
                  <li className="active" id="account">
                    <strong>Your Details </strong>
                  </li>
                  <li className="active" id="personal">
                    <strong> Choose Upgrade Option</strong>
                  </li>
                  <li id="payment">
                    <strong> Upgrade Booking Payment </strong>
                  </li>
                  <li id="confirm">
                    <strong>Thankyou </strong>
                  </li>
                </ul>

                {
                  // loading ? (
                  //     <>
                  //        <br/>
                  //        <LoadingBox></LoadingBox>
                  //     </>
                  // ) :
                  error ? (
                    <MessageBox variant="danger">{error}</MessageBox>
                  ) : (
                    <>
                      {upgrade_product.length < 1 ||
                      upgrade_product == undefined ? (
                        <MessageBox>No data Found!</MessageBox>
                      ) : (
                        <>
                          <fieldset className="bikemodeL product_page">
                            <div className="form-card bgwhitenone mt-4">
                              <div className="row bookib-proceS">
                                <div className="col-12 col-md-6">
                                  <p className="fs-title stepnumbering">
                                    Select your Upgrade Plan
                                  </p>
                                </div>
                                <div className="col-12 col-md-6">
                                  <p className="fs-title form-default stepnumbering m-0">
                                    <select
                                      className="form-control"
                                      value={selectedplan}
                                      onChange={(e) =>
                                        setSelectedplan(e.target.value)
                                      }
                                    >
                                      <option value="2200 ">
                                        Advance Payment for Hardware Upgrade
                                        Package
                                      </option>
                                    </select>
                                  </p>
                                </div>

                                <div className="col-12">
                                  <table className="table table-striped tableNSEbooking table-bordered tableNSE">
                                    <tbody>
                                      <tr>
                                        <th>Total Package Cost </th>
                                        <th>
                                          <NumberFormat
                                            displayType={"text"}
                                            thousandSeparator={true}
                                            thousandsGroupStyle="lakh"
                                            prefix="&#8377;"
                                            value="4200"
                                          />
                                        </th>
                                      </tr>
                                      <tr>
                                        <th>
                                          Advance Payment for Hardware Upgrade
                                          Package
                                        </th>
                                        <th>
                                          <NumberFormat
                                            displayType={"text"}
                                            thousandSeparator={true}
                                            thousandsGroupStyle="lakh"
                                            prefix="&#8377;"
                                            value="2200"
                                          />
                                        </th>
                                      </tr>
                                      <tr>
                                        <th>
                                          Balance (to be paid at Dealership)
                                        </th>
                                        <th>
                                          <NumberFormat
                                            displayType={"text"}
                                            thousandSeparator={true}
                                            thousandsGroupStyle="lakh"
                                            prefix="&#8377;"
                                            value="2000"
                                          />
                                        </th>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>

                                <ul className="mt-2 ch-font">
                                  <li>
                                    • The price mentioned above is inclusive of
                                    all taxes and labor.
                                  </li>

                                  <li>
                                    • Your booking amount will be adjusted with
                                    the total package cost at the time of
                                    upgrade.
                                  </li>

                                  <li>• Vehicle warranty remains intact.</li>

                                  <li>
                                    • Old parts would be retained at the
                                    dealership.
                                  </li>

                                  <li>
                                    • For more information, Please contact your
                                    nearest dealership. 
                                  </li>

                                  {/* <li>• <b>Expected Delivery : 2nd April onwards</b></li> */}

                                  <li>
                                    (Revolt's authorized dealer will contact you
                                    soon to book an appointment as per your
                                    convenience.)
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <div className="submit-btns justify-content-center mt-4">
                              <button
                                type="button"
                                className="sl-btn sb-btn"
                                value="Back"
                                onClick={() => navigate(`/verify `)}
                              >
                                Back
                              </button>
                              <input
                                type="button"
                                name="next"
                                className="next action-button-new sl-btn"
                                defaultValue="Next"
                                onClick={addToCartHandler}
                              />
                            </div>
                          </fieldset>
                        </>
                      )}
                    </>
                  )
                }
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* new design end */}
    </>
  );
}
