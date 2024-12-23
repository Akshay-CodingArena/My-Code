import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import {
  createReview,
  detailsProduct,
  productBycolor,
} from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Rating from "../components/Rating";
import {
  PRODUCT_REVIEW_CREATE_RESET,
  PRODUCT_DETAILS_RESET,
} from "../constants/productConstants";
import { addToCart, removeFromCart } from "../actions/cartActions";
import ProductEditScreen from "./ProductEditScreen";
import {
  productUpdateReducer,
  productDetailsReducer,
} from "../reducers/productReducers";
import Axios from "axios";
import { URL_API, ROOT_PATH } from "../constants/cartConstants";
import { bookingout } from "../actions/userActions";
import NumberFormat from "react-number-format";
import clevertap from "clevertap-web-sdk";
import EmiCalculator from "../components/EmiCalculator";

export default function ProductScreenMobile(props) {
  const [showCalc, setShowCalc] = useState(false);
  const userInfo_info = localStorage.getItem("bookinginfo");
  const monsoonOffer = 5000;
  let bikePrice;
  const stateSubsidy = JSON.parse(
    localStorage.getItem("cartItems"),
  )?.city_incentives;
  const [submitbtn, setsubmitbtn] = useState(true);

  const cartItem_arr = localStorage.getItem("cartItems");
  const cartitem_myArr = JSON.parse(cartItem_arr);

  const userInfo_myArr = JSON.parse(userInfo_info);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const params = useParams();
  const { id: productId } = params;
  const { search } = useLocation();
  const [qty, setQty] = useState(1);

  const productDetails = useSelector((state) => state.productDetails);
  // const [city_stock,setCity_stock] = cartitem_myArr?.city_stock == "ok" ? 1 : 0;
  const { loading, error, product } = productDetails;

  const mid = cartitem_myArr?.subscription[0]?.master_id;

  const [modelColor, setModelcolor] = useState(
    product?.product[0]?.color ? product?.product[0]?.color : "Stealth Black",
  );

  // const fcolor = product?.colors?.filter((c) => c.color == "Cosmic Black");

  //  const currentPlan = product?.purchasee_plan?.filter((c) => c.master_id == fcolor[0]?.id);
  //  const currentPlan_id = product?.purchasee_plan?.filter((c) => c.master_id == fcolor[0]?.id).id;
  let fcolor = "",
    fcolorid = "",
    currentPlan = "",
    currentPlan_id = "";

  const [selectedPlan, setSelectedPlan] = useState(
    currentPlan_id ? currentPlan_id : "",
  );

  const [avaialbleplans, setavaialbleplans] = useState();

  useEffect(() => {
    fcolor = product?.colors?.filter((c) => c.color == "Stealth Black");
    fcolorid = product?.colors?.filter((c) => c.color == "Stealth Black")[0].id;
    console.log(fcolorid);
    currentPlan = product?.purchasee_plan?.filter(
      (c) => c.master_id == fcolorid,
    );
    currentPlan_id = product?.purchasee_plan?.filter(
      (c) => c.master_id == fcolorid,
    ).id;
    setSelectedPlan(currentPlan_id);
    console.log("currentPlan" + JSON.stringify(currentPlan));
    setavaialbleplans(currentPlan);
    // showplans(fcolorid)
    if (currentPlan !== undefined) {
      product.subscription[0] = currentPlan[0];

      localStorage.setItem("cartItems", JSON.stringify(product));
    }
    //
  }, [product]);

  // useEffect(()=>{

  // //
  // if(currentPlan!==undefined && window.currentPlan===undefined)
  //     {
  //         product?.subscription[0] = currentPlan[0];

  //         localStorage.setItem('cartItems', JSON.stringify(product));
  //     }

  // //
  // }, [currentPlan]);

  const BikeColors = product?.colors;
  //   const cid = cartitem_myArr?.purchasee_plan[0]?.master_id;
  //   console.log("cid"+cid)
  //   const fcolor = product?.colors[cid]?.color
  //   const [modelColor, setModelcolor] = useState(fcolor);

  //   const bikeImage = product?.product[0]?.image ? product?.product[0]?.image : "product_black.png";

  //

  const [bikeImage, setbikeImage] = React.useState("product_black.png");

  let selectedModel = BikeColors?.filter((c) => c.color == modelColor);
  //  setmasterId(selectedModel[0]?.id)
  const [masterId, setmasterId] = useState(
    product?.product[0]?.id ? product?.product[0]?.id : "1",
  );

  // console.log(BikeColors)
  // console.log(modelColor)
  // console.log(selectedModel)
  //

  var selectedcolor = "#000";
  if (modelColor == "Rebel Red") {
    selectedcolor = "#ed1c24";
  } else if (modelColor == "Mist Grey") {
    selectedcolor = "#ccc";
  } else {
    selectedcolor = "#000";
  }

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    loading: loadingReviewCreate,
    error: errorReviewCreate,
    success: successReviewCreate,
  } = productReviewCreate;

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  //  useEffect(()=>{
  //     selectColor(product?.colors[0].id,product?.colors[0].color)
  // }, [product]);

  useEffect(() => {
    if (!userInfo_info) {
      navigate(`/product/RM0400RRCP1CWBLK` + search);
    }

    dispatch(
      productBycolor(productId, modelColor, selectedPlan, userInfo_myArr),
    );

    // dispatch(productBycolor(productId,"Cosmic Black",selectedPlan,userInfo_myArr));
  }, []);

  if (product) {
    console.log("product", product);
    let bikePlan = product?.purchasee_plan.filter((plan) => {
      if (plan.plan_type === "Non-Finance") {
        return true;
      } else {
        return false;
      }
    });

    if (bikePlan.length) {
      bikePrice = JSON.parse(localStorage.getItem("cartItems"))?.subscription[0]
        ?.ex_price;
    }
    product?.product_offers.map((offer) => {
      bikePrice -= offer.discount;
    });
    localStorage.setItem("bikePrice", bikePrice);
    localStorage.setItem("chargerPrice", bikePlan[0]?.charger);
  }

  const addToCartHandler = async () => {
    setsubmitbtn(false);
    let entry = product?.purchasee_plan.filter(
      (value, index) => value.id == selectedPlan,
    )[0];

    try {
      let data = {
        mobile: userInfo_myArr?.mobile,
        name: userInfo_myArr?.name,
        color: modelColor,

        plan: product?.subscription[0]?.plan_type,

        amount: product?.subscription[0]?.booking_amount,
      };
      console.log("REQ" + JSON.stringify(data));
      const { res } = await Axios.post(
        `${URL_API}/api/v1/common/lsq_booking_lead_update`,
        data,
      );
    } catch (error) {
      console.log(error);
    }

    // let entry = product?.purchasee_plan.filter((value,index)=>value.id == selectedPlan)[0]
    clevertap.event.push("Booking Model Selected", {
      "Model Name": entry?.product_type,
      "Model Color": modelColor,
      "Payment Plan": entry?.plan_type,
      "Booking Amount": entry?.booking_amount,
      "Vehicle Ex-Showroom Price": entry?.ex_price,
      "Revolt Charger": entry?.charger,
      "Monthly Payment": entry?.emi_amount,
      Date: new Date(),
    });
    navigate(`/placeorderMobile/${productId}` + search);
    // navigate(`/placeorder/${productId}/${modelColor}/${selectedPlan}`);

    //dispatch({ type: PRODUCT_DETAILS_RESET });
  };

  var active = "";
  const submitHandler = (e) => {
    e.preventDefault();
    if (comment && rating) {
      dispatch(
        createReview(productId, { rating, comment, name: userInfo.name }),
      );
    } else {
      alert("Please enter comment and rating");
    }
  };

  //const productvalue='';
  if (product !== undefined && window.productvalue === undefined) {
    window.productvalue = product;
  }
  //console.log(currentPlan)

  ///////////////
  const selectPlan = (event) => {
    var entry = product?.purchasee_plan.findIndex(function (e) {
      //return e.productId == value;

      return e.id == event.target.value;
    });

    // console.log("Before quantity: ", product?.subscription[0])
    console.log(entry);
    product.subscription[0] = product?.purchasee_plan[entry];
    console.log(product?.subscription[0]);
    setSelectedPlan(event.target.value);
    localStorage.setItem("cartItems", JSON.stringify(product));
  };

  const selectColor = (id, color) => {
    var entry = product?.colors.findIndex(function (e) {
      //return e.productId == value;
      return e.id == id;
    });
    // console.log("Before quantity: ", product?.subscription[0])
    console.log(color);
    product.product[0] = product?.colors[entry];
    //  console.log(product?.product[0])
    setModelcolor(color);
    setmasterId(id);
    showplans(id);
    localStorage.setItem("cartItems", JSON.stringify(product));
  };

  const showplans = (master_id) => {
    const result = product?.purchasee_plan.filter((plan) => {
      if (plan.master_id == master_id) {
        return true;
      } else {
        return false;
      }
    });
    setavaialbleplans(result);

    //

    var entry = product?.purchasee_plan?.findIndex(function (e) {
      //return e.productId == value;

      return e.master_id == result[0]?.master_id;
    });
    product.subscription[0] = product?.purchasee_plan[entry];

    setSelectedPlan(result[0]?.id);
    localStorage.setItem("cartItems", JSON.stringify(product));
    //
  };

  //////////////////

  return (
    <>
      {/* new design start */}

      <section className="light-grey bookNow padding-top-100 padding-bottom-100">
        {showCalc ? (
          <div className="emiCalcSection">
            <div className="calculatorPopup">
              <div
                style={{
                  right: "10px",
                  top: "10px",
                  cursor: "pointer",
                  zIndex: "999",
                }}
                className="pr-2 position-absolute"
                onClick={() => setShowCalc(false)}
              >
                <img src="/close_Icon.svg" width="30" />
              </div>
              <EmiCalculator />
            </div>
          </div>
        ) : null}
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 text-center ">
              <div className="form-bg" id="ms-form">
                {/* <ul id="progressbar">
                  <li className="active" id="account">
                    <strong>Your Details </strong>
                  </li>
                  <li className="active" id="personal">
                    <strong> Choose Model & MRP</strong>
                  </li>
                  <li id="payment">
                    <strong> Booking Payment </strong>
                  </li>
                  <li id="confirm">
                    <strong> Start My Revolt Plan </strong>
                  </li>
                </ul> */}

                {loading ? (
                  <>
                    <br />
                    <LoadingBox></LoadingBox>
                  </>
                ) : error ? (
                  <MessageBox variant="danger">{error}</MessageBox>
                ) : (
                  <>
                    {product?.product?.length < 1 ||
                    product?.product == undefined ? (
                      <MessageBox>No data Found!</MessageBox>
                    ) : (
                      <>
                        <fieldset className="bikemodeL product_page">
                          {product?.city_stock != "ok" ? (
                            <div className="col-12">
                              <MessageBox variant="danger">
                                {product?.city_stock}
                              </MessageBox>
                            </div>
                          ) : (
                            ""
                          )}

                          <div className="section-bike mt-4">
                            <div className="row align-items-center">
                              <div className="col-12 col-md-6">
                                <div className="bk-img">
                                  <img
                                    src={`/images/${selectedModel[0]?.image}`}
                                  />
                                </div>
                              </div>
                              <div className="col-12 col-md-6">
                                <div className="name-bike">
                                  <h5>
                                    <b>Select Color</b>
                                  </h5>
                                </div>

                                <div className="bike-selection mt-4">
                                  <ul>
                                    {product?.colors
                                      .slice()
                                      .reverse()
                                      .map((productcolor, k) => {
                                        active =
                                          productcolor.color == modelColor
                                            ? "active"
                                            : "";
                                        return (
                                          <li
                                            className="product_blacktheme"
                                            data-bikeclr="blacktheme"
                                            key={k}
                                          >
                                            <label
                                              className={`contain ${active}`}
                                              onClick={() =>
                                                selectColor(
                                                  productcolor.id,
                                                  productcolor.color,
                                                )
                                              }
                                            >
                                              {productcolor.color}
                                            </label>
                                            {/* <input className="" onChange={(e)=>setModelcolor(e.target.value)} type="radio" name="color" value={productcolor.color}  checked={ (productcolor.color == modelColor  ? 'checked' : '')} ></input> */}
                                          </li>
                                        );
                                      })}
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="form-card bgwhitenone mt-2">
                            <div className="row bookib-proceS">
                              {/* {(product?.subscription)?.map((item, i) => ( */}
                              {product?.subscription?.map((item, i) => (
                                <>
                                  <div className="col-12 col-md-6">
                                    <p className="fs-title stepnumbering">
                                      Select your Revolt Purchase Plan
                                    </p>
                                  </div>
                                  <div className="col-12 col-md-6">
                                    <p className="fs-title form-default stepnumbering m-0">
                                      <select
                                        className="form-control"
                                        value={
                                          selectedPlan
                                            ? selectedPlan
                                            : product?.purchasee_plan[0].id
                                        }
                                        onChange={selectPlan}
                                        // onClick={ selectPlan}
                                      >
                                        {avaialbleplans?.map((value, key) => {
                                          return (
                                            <option value={value?.id} key={key}>
                                              {value?.plan_type}
                                            </option>
                                          );
                                        })}
                                      </select>
                                    </p>
                                  </div>

                                  <div className="col-12">
                                    <table className="table table-striped tableNSEbooking table-bordered tableNSE">
                                      <tbody>
                                        <tr>
                                          <th>Booking Amount </th>
                                          <th>
                                            <NumberFormat
                                              displayType={"text"}
                                              thousandSeparator={true}
                                              thousandsGroupStyle="lakh"
                                              prefix="&#8377;"
                                              value={item?.booking_amount}
                                            />
                                          </th>
                                        </tr>

                                        {product?.subscription[0]?.plan_type ==
                                          "My Revolt Plan" ||
                                        product?.subscription[0]?.plan_type ==
                                          "5.99% Plan" ||
                                        product?.subscription[0]?.plan_type ==
                                          "Finance@7.99%" ? (
                                          <tr>
                                            <td>
                                              Monthly Payment{" "}
                                              <b>
                                                <sup>1</sup>
                                              </b>{" "}
                                            </td>
                                            <td>
                                              <NumberFormat
                                                value={item?.emi_amount}
                                                displayType={"text"}
                                                thousandSeparator={true}
                                                thousandsGroupStyle="lakh"
                                                prefix="&#8377;"
                                              />
                                              <p
                                                className="emiCalculatorLink"
                                                onClick={() =>
                                                  setShowCalc(true)
                                                }
                                              >
                                                EMI Calculator
                                              </p>
                                            </td>
                                          </tr>
                                        ) : (
                                          <>
                                            <tr>
                                              <td>
                                                Vehicle Ex-Showroom Price{" "}
                                              </td>
                                              <td>
                                                <NumberFormat
                                                  value={item?.ex_price}
                                                  displayType={"text"}
                                                  thousandSeparator={true}
                                                  thousandsGroupStyle="lakh"
                                                  prefix="&#8377;"
                                                />
                                              </td>
                                            </tr>
                                            {product?.subscription[0]
                                              ?.plan_type == "Non-Finance" ? (
                                              <>
                                                {product?.product_offers.map(
                                                  (offer) => (
                                                    <tr>
                                                      <td
                                                        className="offerDiscount"
                                                        dangerouslySetInnerHTML={{
                                                          __html: offer.name,
                                                        }}
                                                      ></td>
                                                      {/* <span style={{fontSize:'14px', color:'#6d6e71'}}>(Conditions applied)</span> */}
                                                      <td className="offerDiscount">
                                                        -{" "}
                                                        <NumberFormat
                                                          value={offer.discount}
                                                          displayType={"text"}
                                                          thousandSeparator={
                                                            true
                                                          }
                                                          thousandsGroupStyle="lakh"
                                                          prefix="&#8377;"
                                                        />
                                                      </td>
                                                    </tr>
                                                  ),
                                                  // bikePrice -= offer.discount)
                                                )}

                                                {/* <td className="offerDiscount">Monsoon Offer</td>
                                                                            <td className="offerDiscount"> 
                                                                                - <NumberFormat value={monsoonOffer} displayType={'text'} thousandSeparator={true} thousandsGroupStyle="lakh" prefix="&#8377;" />
                                                                            </td> */}
                                                {/* </tr> */}
                                                {localStorage.getItem(
                                                  "bookingCity",
                                                ) === "Delhi" ? (
                                                  <tr>
                                                    <td className="offerDiscount">
                                                      *State Subsidy
                                                      <div class="emi_tooltip">
                                                        {" "}
                                                        <img
                                                          src="/images/info.svg"
                                                          alt=""
                                                        />
                                                        <span class="emi_tooltip_text">
                                                          State incentive has to
                                                          be claimed directly by
                                                          the customer from the
                                                          state government
                                                          (Direct to Customer).
                                                        </span>
                                                      </div>
                                                    </td>
                                                    <td className="offerDiscount">
                                                      -{" "}
                                                      <NumberFormat
                                                        value={stateSubsidy}
                                                        displayType={"text"}
                                                        thousandSeparator={true}
                                                        thousandsGroupStyle="lakh"
                                                        prefix="&#8377;"
                                                      />
                                                    </td>
                                                  </tr>
                                                ) : null}
                                              </>
                                            ) : null}
                                            <tr>
                                              <td>Revolt Charger </td>
                                              <td>
                                                <NumberFormat
                                                  value={item?.charger}
                                                  displayType={"text"}
                                                  thousandSeparator={true}
                                                  thousandsGroupStyle="lakh"
                                                  prefix="&#8377;"
                                                />
                                              </td>
                                            </tr>

                                            <tr>
                                              <td style={{ color: "black" }}>
                                                Effective Ex-Showroom Price{" "}
                                                <span
                                                  style={{
                                                    fontSize: "14px",
                                                    color: "#6d6e71",
                                                  }}
                                                >
                                                  (Inclusive of charger)
                                                </span>
                                              </td>
                                              <td style={{ color: "black" }}>
                                                <NumberFormat
                                                  value={
                                                    bikePrice -
                                                    stateSubsidy +
                                                    item?.charger
                                                  }
                                                  displayType={"text"}
                                                  thousandSeparator={true}
                                                  thousandsGroupStyle="lakh"
                                                  prefix="&#8377;"
                                                />
                                              </td>
                                            </tr>
                                            <tr>
                                              <td className="offerDiscount">
                                                Anniversary Free Insurance Offer
                                              </td>
                                              <td className="offerDiscount">
                                                <NumberFormat
                                                  value={-6200}
                                                  displayType={"text"}
                                                  thousandSeparator={true}
                                                  thousandsGroupStyle="lakh"
                                                  prefix="&#8377;"
                                                />
                                              </td>
                                            </tr>
                                            <tr>
                                              <td className="offerDiscount">
                                                Total Anniversary Offer Savings
                                              </td>
                                              <td className="offerDiscount">
                                                <NumberFormat
                                                  value={-26200}
                                                  displayType={"text"}
                                                  thousandSeparator={true}
                                                  thousandsGroupStyle="lakh"
                                                  prefix="&#8377;"
                                                />
                                              </td>
                                            </tr>
                                            {stateSubsidy ? (
                                              <tr>
                                                <td className="offerDiscount">
                                                  Total Savings
                                                </td>
                                                <td className="offerDiscount">
                                                  -
                                                  <NumberFormat
                                                    value={26200 + stateSubsidy}
                                                    displayType={"text"}
                                                    thousandSeparator={true}
                                                    thousandsGroupStyle="lakh"
                                                    prefix="&#8377;"
                                                  />
                                                </td>
                                              </tr>
                                            ) : null}
                                            {/* <tr>
                                                                            <td>FAME Scheme <sup>2</sup> <b>(b)</b></td>
                                                                            <td>
                                                                                <NumberFormat value={item?.fame_subsidy_at_booking} displayType={'text'} thousandSeparator={true} thousandsGroupStyle="lakh" prefix="&#8377;" />
                                                                            </td>
                                                                        </tr> */}
                                            {/* <tr>
                                                                            <td>Cost before on-Road  <b>(a-b)</b></td>
                                                                            <td>
                                                                                <NumberFormat value={item?.ex_price - item?.fame_subsidy_at_booking} displayType={'text'} thousandSeparator={true} thousandsGroupStyle="lakh" prefix="&#8377;" />
                                                                            </td>
                                                                        </tr> */}

                                            {/* <tr>
                                                                            <td>Effective Cost before on-Road  </td>
                                                                            <td>
                                                                                <NumberFormat value={item?.ex_price + item?.charger} displayType={'text'} thousandSeparator={true} thousandsGroupStyle="lakh" prefix="&#8377;" />
                                                                            </td>
                                                                        </tr> */}

                                            {/* {product?.city_incentives > 0 &&
                                                                            <tr>
                                                                                <td>State Incentive </td>
                                                                                <td> 
                                                                                    <NumberFormat value={product?.city_incentives} displayType={'text'} thousandSeparator={true} thousandsGroupStyle="lakh" prefix="&#8377;" />
                                                                                </td>
                                                                            </tr> 
                                                                        }  */}

                                            {/* <tr>
                                                                            <td>Effective Cost before on Road</td>
                                                                            <td>
                                                                                <NumberFormat value={item?.ex_price - item?.fame_subsidy_at_booking - product?.city_incentives} displayType={'text'} thousandSeparator={true} thousandsGroupStyle="lakh" prefix="&#8377;" />  
                                                                            </td>
                                                                        </tr> */}
                                          </>
                                        )}
                                      </tbody>
                                    </table>
                                  </div>
                                </>
                              ))}

                              <ul className="mt-2 ch-font">
                                <li>
                                  <sup>*</sup> The price of vehicle shall be
                                  applicable as prevailing on the date of
                                  delivery of vehicle to customer.
                                </li>

                                <li>
                                  <sup>*</sup> Your booking amount will be
                                  adjusted with the On-Road price. Registration
                                  , Road Tax, Insurance, 4G Connectivity and
                                  other statutory applicable charges will be
                                  additional based on actuals.
                                </li>
                                <li>
                                  <sup>*</sup> State incentive (If Applicable)
                                  has to be claimed directly by the customer
                                  from the state government (Direct to
                                  Customer).
                                </li>

                                {product?.subscription[0]?.plan_type ==
                                  "My Revolt Plan" && (
                                  <>
                                    <li>
                                      <b>
                                        <sup>1</sup>
                                      </b>{" "}
                                      For more information, Please contact your
                                      nearest dealership.
                                    </li>
                                    <li>
                                      <b>
                                        <sup>1</sup>
                                      </b>{" "}
                                      Down payment excluding booking amount- INR{" "}
                                      <b>5,216</b>
                                    </li>
                                    <li>
                                      <b>
                                        <sup>1</sup>
                                      </b>{" "}
                                      Number of Monthly payments{" "}
                                      <b>42 months</b>.
                                    </li>
                                    <li>
                                      <b>
                                        <sup>1</sup>
                                      </b>{" "}
                                      Price may vary according to state.
                                    </li>
                                  </>
                                )}
                                {product?.subscription[0]?.plan_type ==
                                  "5.99% Plan" && (
                                  <>
                                    <li>
                                      <b>
                                        <sup>1</sup>
                                      </b>{" "}
                                      For more information, Please contact your
                                      nearest dealership.
                                    </li>

                                    <li>
                                      <b>
                                        <sup>1</sup>
                                      </b>{" "}
                                      Number of Monthly payments{" "}
                                      <b>36 months</b>.
                                    </li>
                                    <li>
                                      <b>
                                        <sup>1</sup>
                                      </b>{" "}
                                      Price may vary according to state.
                                    </li>
                                    <li>
                                      <b>
                                        <sup>1</sup>
                                      </b>{" "}
                                      Applicable in select cities only.
                                    </li>
                                  </>
                                )}
                                {product?.subscription[0]?.plan_type ==
                                  "7.99% Plan" && (
                                  <>
                                    <li>
                                      <b>
                                        <sup>1</sup>
                                      </b>{" "}
                                      For more information, Please contact your
                                      nearest dealership.
                                    </li>

                                    <li>
                                      <b>
                                        <sup>1</sup>
                                      </b>{" "}
                                      Number of Monthly payments{" "}
                                      <b>
                                        {product?.subscription[0]
                                          ?.emi_duration_month
                                          ? product?.subscription[0]
                                              ?.emi_duration_month
                                          : "60"}{" "}
                                        months
                                      </b>
                                      .
                                    </li>
                                    <li>
                                      <b>
                                        <sup>1</sup>
                                      </b>{" "}
                                      Price may vary according to state.
                                    </li>
                                    <li>
                                      <b>
                                        <sup>1</sup>
                                      </b>{" "}
                                      Applicable in select cities only.
                                    </li>
                                  </>
                                )}
                                {/* {product?.city_incentives > 0 && 
                                                                      <li>
                                                                          <sup>4</sup> State incentive (If Applicable) has to be claimed directly by the customer from the state government (Direct to Customer).
                                                                      </li>     
                                                                } */}
                                {/* <li>
                                                                      {product?.city_incentives > 0 ? <sup>5</sup> : <sup>4</sup> }
                                                                      Subject to change without any notification at the sole discretion of Revolt.
                                                            </li> */}
                                <li>
                                  {/* <b><sup>1</sup></b> Expected Delivery Month : June 2023 */}
                                  <b>
                                    <sup>1</sup>
                                  </b>{" "}
                                  Expected Delivery : Immediate (Delivery of
                                  Stealth Black Limited Edition will be in
                                  October 2023)
                                </li>
                              </ul>
                            </div>
                            {/* <div className="deliveryslot">
                                                            <div className="row align-items-center">
                                                                <div className="col-md-3">
                                                                    <div className="slottimes">Delivery Slot<sup className='notio'>{product?.city_incentives > 0 ? 5 : 4 }</sup></div>
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <img src={`${ROOT_PATH}/images/delveryslotimg.png`} alt="" />
                                                                </div>
                                                                <div className="col-md-3">
                                                                    <div className="slotinfo">
                                                                         {product?.delivery_batch[0]?.name}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div> */}
                          </div>
                          <div className="submit-btns justify-content-center mt-4">
                            <button
                              type="button"
                              className="sl-btn sb-btn"
                              value="Back"
                              onClick={() => navigate(`/book `)}
                            >
                              Back
                            </button>
                            {submitbtn && (
                              <input
                                type="button"
                                name="next"
                                className="next action-button-new sl-btn"
                                defaultValue="Next"
                                onClick={addToCartHandler}
                                disabled={
                                  product?.subscription?.length === 0 ||
                                  avaialbleplans?.length === 0 ||
                                  product?.city_stock != "ok"
                                }
                              />
                            )}
                          </div>
                        </fieldset>
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* new design end */}
    </>
  );
}
