import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import {
  detailsProductAll,
  bookingLeadlsq,
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
import { axios as Axios } from "../utilities/axios";
import { URL_API, ROOT_PATH } from "../constants/cartConstants";
import { booking, bookingout } from "../actions/userActions";
import NumberFormat from "react-number-format";
import clevertap from "clevertap-web-sdk";
import EmiCalculator from "../components/EmiCalculator";
import Slider from "react-slick";
import Radio from "../components/EmiCalculator/Radio";
import Loader from "../components/Loader";
import { numberFormatPrice } from "../utilities/utilities";

const colors = [
  {
    name: "Blue",
    code: "#0080FB",
    imagesPath: ["/images/blue_revolt(2).png", "/images/blue_revolt(2).png"],
  },
  { name: "Red", code: "#F43737", imagesPath: ["/images/product_red.png"] },
  {
    name: "Cosmic Black",
    code: "#262525",
    imagesPath: ["/images/product_black.png"],
  },
  {
    name: "Stealth Black",
    code: "#363639",
    imagesPath: ["/images/stealth-black.png"],
  },
  { name: "White", code: "#D1D3D4", imagesPath: ["/images/product_grey.png"] },
];

let settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

export default function ProductScreen(props) {
  const [toggle, setToggle] = useState(false);
  const [showBreakUp, setShowBreakUp] = useState(false);
  const [showCalc, setShowCalc] = useState(false);
  const userInfo_info = localStorage.getItem("bookinginfo");
  const [loader, setLoader] = useState(false);
  let totalSaving = 0;
  let bikePrice;
  const stateSubsidy =
    JSON.parse(localStorage.getItem("cartItems"))?.city_incentives ?? 0;
  const [submitbtn, setsubmitbtn] = useState(true);
  const [model, setModel] = useState(
    sessionStorage.getItem("selectedModel")
      ? sessionStorage.getItem("selectedModel")
      : "RV400BRZ"
  );
  const INSURANCE_COST = model == "RV1" || model == "RV1+" ? 0 : 7000;

  const cartItem_arr = localStorage.getItem("cartItems");
  const cartitem_myArr = JSON.parse(cartItem_arr);

  const userInfo_myArr = JSON.parse(userInfo_info);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const params = useParams();
  const { id: productId } = params;
  const { search } = useLocation();
  const location = useLocation();
  const [qty, setQty] = useState(1);

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product, proceedNext } = productDetails;
  const plan_type = product?.subscription[0]?.plan_type;
  const { product: allProducts } = useSelector((state) => state.allProducts);
  console.log(productDetails);
  // const [city_stock,setCity_stock] = cartitem_myArr?.city_stock == "ok" ? 1 : 0;

  console.log("Details ares ppp", productDetails);

  const mid = cartitem_myArr?.subscription[0]?.master_id;

  let [modelColor, setModelcolor] = useState(
    JSON.parse(sessionStorage.getItem("colorInfo"))?.color
  );
  let [bikeInfo, setBikeInfo] = useState({});
  let [color, setColor] = useState(
    sessionStorage.getItem("colorInfo")
      ? JSON.parse(sessionStorage.getItem("colorInfo"))
      : colors[0]
  );

  // const fcolor = product?.colors?.filter((c) => c.color == "Cosmic Black");

  //  const currentPlan = product?.purchasee_plan?.filter((c) => c.master_id == fcolor[0]?.id);
  //  const currentPlan_id = product?.purchasee_plan?.filter((c) => c.master_id == fcolor[0]?.id).id;
  let fcolor = "",
    fcolorid = "",
    currentPlan = "",
    currentPlan_id = "";

  const [selectedPlan, setSelectedPlan] = useState(
    currentPlan_id ? currentPlan_id : 228
  );

  const [avaialbleplans, setavaialbleplans] = useState();

  let colorInfo = JSON.parse(localStorage.getItem("colorInfo"));

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
  console.log("colors are", BikeColors, modelColor);
  let selectedModel = BikeColors?.filter((c) => c.color == modelColor);
  //  setmasterId(selectedModel[0]?.id)
  const [masterId, setmasterId] = useState(
    product?.product[0]?.id ? product?.product[0]?.id : "1"
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

  const getDownpayment = () => {
    let payment = "";
    switch (model) {
      case "RV400":
        payment = "₹0";
        break;
      case "RV400BRZ":
        payment = "₹14,999";
        break;
      case "RV1":
        payment = "₹9,999";
        break;
      case "RV1+":
        payment = "₹9,999";
        break;
    }
    return payment;
  };

  const getEMI = () => {
    let payment = "";

    switch (model) {
      case "RV400":
        payment = "₹4,444";
        break;
      case "RV400BRZ":
        payment = "₹3,777";
        break;
      case "RV1":
        payment = "₹3,299";
        break;
      case "RV1+":
        payment = "₹3,999";
        break;
    }
    return payment;
  };

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
  const listenerCallBackScroll = (e) => {
    console.log("scroll", window.scrollY);
    if (
      document.documentElement.clientHeight >
      document.querySelector(".rvTermsBlock")?.getBoundingClientRect().y
    ) {
      document.querySelector(".mobile-next-container").style.position = "fixed";
      document.querySelector(".mobile-next-container").style.bottom = "0px";
      document.querySelector(".mobile-next-container").style.display = "block";
      console.log("setted");
      // document.querySelector(".mobile-next-container").style.bottom = "0px !important"
    } else {
      document.querySelector(".mobile-next-container").style.display = "none";
    }
  };

  if (product) {
    //  console.log("product", product);
    let bikePlan = product?.purchasee_plan?.filter((plan) => {
      if (plan.plan_type === "Finance@7.99%") {
        return true;
      } else {
        return false;
      }
    });

    if (true) {
      bikePrice = JSON.parse(localStorage.getItem("cartItems"))?.subscription[0]
        ?.ex_price;
    }
    console.log("Priiiiiiice", bikePrice);
    product?.product_offers?.map((offer) => {
      bikePrice -= offer.discount;
    });
    localStorage.setItem("bikePrice", bikePrice);
    localStorage.setItem("chargerPrice", bikePlan?.[0]?.charger);
  }

  const updateBookingLead = async () => {
    localStorage.setItem("colorInfo", JSON.stringify(product.colors[0]));
    let {
      user_id,
      name,
      mobile,
      email,
      selectedState,
      selectedCity,
      selectedHub,
      pincode,
      usertoken,
      isDealer,
      isAdmin,
      search,
    } = JSON.parse(localStorage.getItem("bookingPayload"));

    let booking_id = JSON.parse(
      localStorage.getItem("bookingLeadDetails")
    ).booking_id;
    console.log("lllllllllllll", booking_id);
    await dispatch(
      booking(
        user_id,
        name,
        mobile,
        email,
        selectedState,
        selectedCity,
        selectedHub,
        pincode,
        usertoken,
        isDealer == "M" ? 0 : 1,
        isAdmin,
        search,
        model,
        booking_id
      )
    );
  };

  const addToCartHandler = async () => {
    sessionStorage.setItem("selectedModel", model);
    sessionStorage.setItem("colorInfo", JSON.stringify(color));
    sessionStorage.setItem("selectedProductId", color.model_id);
    // await updateBookingLead()
    setsubmitbtn(false);
    let entry = product?.purchasee_plan.filter(
      (value, index) => value.id == selectedPlan
    )[0];

    try {
      const leadDetails = JSON.parse(
        localStorage.getItem("bookingLeadDetails")
      );
      console.log("Color is", color);
      let data = {
        mobile: userInfo_myArr?.mobile,
        name: userInfo_myArr?.name,
        color: color.color,
        model_id: color.model_id,
        plan: product?.subscription[0]?.plan_type,
        customerId: leadDetails.customerId,
        lsq_opp_id: leadDetails.lsq_opp_id,
        booking_id: leadDetails.booking_id,
        contact_id: localStorage.getItem("contact_id"),
        org_contact_id: localStorage.getItem("org_contact_id"),
        amount: product?.subscription[0]?.booking_amount,
        product_type: model,
        subscriptionPlan: product?.subscription[0]?.id,
      };
      console.log("REQ" + JSON.stringify(data));
      dispatch(bookingLeadlsq(data));
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
    } catch (error) {
      console.log(error);
      setLoader(false);
    }

    // let entry = product?.purchasee_plan.filter((value,index)=>value.id == selectedPlan)[0]

    // navigate(`/placeorder/${productId}/${modelColor}/${selectedPlan}`);

    //dispatch({ type: PRODUCT_DETAILS_RESET });
  };

  var active = "";
  const submitHandler = (e) => {
    e.preventDefault();
    if (comment && rating) {
      dispatch(
        createReview(productId, { rating, comment, name: userInfo.name })
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
  const selectPlan = (pId) => {
    if (product) {
      console.log("product is", product, pId);
      var entry = product?.purchasee_plan?.findIndex(function (e) {
        //return e.productId == value;
        return e.id == pId;
      });

      // console.log("Before quantity: ", product?.subscription[0])
      //  console.log(entry);
      product.subscription[0] = product?.purchasee_plan[entry];
      //  console.log(product?.subscription[0]);
      setSelectedPlan(pId);
      localStorage.setItem("cartItems", JSON.stringify(product));
    }
  };

  const selectColor = (id, color, allInfo) => {
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
    setBikeInfo({ ...allInfo });
    localStorage.setItem("cartItems", JSON.stringify(product));
  };

  const showplans = (master_id) => {
    const result = [...product?.purchasee_plan]?.filter((plan) => {
      if (plan.master_id == master_id) {
        return true;
      } else {
        return false;
      }
    });
    console.log("result is", result, [...result].reverse());
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

  const AllproductArr = allProducts?.[model]
    ? [...allProducts?.[model]].reverse()
    : [];
  const productArr = product?.product ? [...product?.product] : [];
  //  console.log("product",product)
  // const productColors = product?.product ? [...product?.colors].reverse():[]
  //  console.log("array",productArr)
  //////////////////

  if (proceedNext) {
    navigate(`/placeorder` + search, {
      state: {
        model: model,
        color: color,
      },
    });
  }

  console.log("Model is", model);

  product?.product_offers?.map((offer) => {
    totalSaving += offer.discount;
  });

  if (document.querySelector(".mobile-next-container")) {
    if (showCalc) {
      document.querySelector(".mobile-next-container").style.visibility =
        "hidden";
    } else {
      document.querySelector(".mobile-next-container").style.visibility =
        "visible";
    }
  }
  useEffect(() => {
    // $(function () {
    //   $('[data-toggle="tooltip"]').tooltip()
    // })
    let listener;
    if (document.documentElement.clientWidth < 575) {
      listener = window.addEventListener("scroll", listenerCallBackScroll);
    }

    sessionStorage.setItem("bikeId", window.location.pathname.split("/")[2]);
    if (!userInfo_info) {
      navigate(`/product/${window.location.pathname.split("/")[2]}` + search);
    }
    userInfo_myArr["product_type"] = location.state?.model ?? model;
    if (!allProducts?.length) {
      dispatch(detailsProductAll());
    }

    // console.log("Product ///////// tikait", product);
    // dispatch(
    //   productBycolor(
    //     sessionStorage.getItem("selectedProductId"),
    //     modelColor,
    //     sessionStorage.getItem("selectedPlan") ?? selectedPlan,
    //     userInfo_myArr
    //   )
    // );

    // dispatch(productBycolor(productId,"Cosmic Black",selectedPlan,userInfo_myArr));
    return () => window.removeEventListener("scroll", listenerCallBackScroll);
  }, []);

  useEffect(() => {
    fcolor = product?.colors?.filter((c) => c.color == colorInfo.color);
    // if (product?.purchasee_plan?.length) {
    //   let bikePlan = product?.purchasee_plan?.filter((plan) => {
    //     if (plan.plan_type === "Finance@7.99%") {
    //       return true;
    //     } else {
    //       return false;
    //     }
    //   });

    //   console.log("Plaaaaan executed");
    //   product.subscription[0] = bikePlan[0];
    //   setToggle(!toggle);
    //   console.log("Subs is", product.subscription[0]);
    // }

    fcolorid = product?.colors?.filter((c) => c.color == colorInfo.color)[0]
      ?.id;

    console.log(fcolorid);
    currentPlan = product?.purchasee_plan
      ? [...product?.purchasee_plan.reverse()]?.filter(
          (c) => c.master_id == fcolorid
        )
      : undefined;
    console.log("Purchase plan", product?.purchasee_plan);
    currentPlan_id = product?.purchasee_plan?.filter(
      (c) => c.master_id == fcolorid
    )[0]?.id;

    setSelectedPlan(currentPlan_id);
    //  console.log("currentPlan" + JSON.stringify(currentPlan));
    console.log("plans are", currentPlan);
    if (currentPlan) {
      setavaialbleplans([...currentPlan].reverse());
    }
    setModelcolor(colorInfo.color);
    // showplans(fcolorid)
    
    console.log(
      "Plan type is",
      product,
      product?.subscription[0]?.plan_type,
      currentPlan
    );
    if (currentPlan?.[0] != undefined) {
      product.subscription[0] = currentPlan[0];
      localStorage.setItem("cartItems", JSON.stringify(product));
    }

    setBikeInfo({ ...colorInfo });
    sessionStorage.setItem("colorImage", color?.image);
    if (product?.purchasee_plan) {
      console.log("product purchaseee plan", product?.purchasee_plan);
      selectPlan(product?.purchasee_plan?.[0]?.id);
    }

    // setBikeInfo({...colorInfo});
    //
  }, [product]);

  // useEffect(() => {
  //   console.log("color is", location.state);
  //   // if(location.state?.model){
  //   //   setModel(location.state?.model)
  //   //   setColor(location.state?.color)
  //   // }
  //   // setModel(sessionStorage.getItem("selectedModel"));
  //   // setColor(JSON.parse(sessionStorage.getItem("colorInfo")));
  // }, [allProducts]);

  useEffect(() => {
    if (color?.model_id) {
      const info = userInfo_myArr;
      info["product_type"] = model;

      console.log("selected plan is", selectedPlan);
      sessionStorage.setItem("selectedPlan", selectedPlan);
      sessionStorage.setItem("bikeId", color.model_id);
      console.log("product is //////////", product);
      dispatch(productBycolor(color?.model_id, color.color, 228, info));
    }
  }, [color]);

  useEffect(() => {
    if (product?.purchasee_plan?.length) {
      // console.log("III", product.colors[0].image);
      let fcolorid = product?.colors?.filter(
        (c) => c.color == colorInfo.color
      )[0]?.id;
      // console.log(fcolorid);
      let currentPlan = product?.purchasee_plan
        ? [...product?.purchasee_plan.reverse()]?.filter(
            (c) => c.master_id == fcolorid
          )
        : undefined;
      // console.log("Purchase plan", product?.purchasee_plan);
      let currentPlan_id = product?.purchasee_plan
        ?.reverse()
        .filter((c) => c.master_id == fcolorid)[0]?.id;

      setSelectedPlan(currentPlan_id);
      setavaialbleplans(product.purchasee_plan);
    }
  }, [product]);

  return (
    <>
      {loading || loader ? <Loader /> : null}
      <section className="light-grey bookNow newBookNow">
        {
          //mobile header
        }
        <div className="headerMobile">
          {" "}
          <h1>Book your Revolt </h1>
        </div>

        {
          //mobile header end
        }
        {
          //calc start
        }
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
              <EmiCalculator model={model} />
            </div>
          </div>
        ) : null}
        {
          //calc end
        }
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-12 col-xs-12 col-sm-8 rv-pr">
              <div className="carouselView mobileCarouselView">
                <div
                  className={`placeholder-text ${
                    model == "RV400BRZ" ? "brz" : ""
                  }`}
                >
                  {model}
                </div>
                <div className="row">
                  <div className="col-12 col-sm-3 order-sm-1 order-md-1">
                    {" "}
                    <div id="msformNew" className="mobile-choose-model">
                      <div className="form-card">
                        <div className="rvModel-choose head-mobile">
                          <h4>Choose your model</h4>
                          <div className="rvModel-chooseBlock">
                            <div
                              id="rv1"
                              className={`model-item ${
                                model === "RV1" ? "selected-bg" : ""
                              }`}
                              onClick={() => {
                                setModel("RV1");
                                setColor(
                                  allProducts?.RV1?.length
                                    ? {
                                        ...allProducts?.RV1?.[
                                          allProducts?.RV1.length - 1
                                        ],
                                      }
                                    : {}
                                );
                                //   setFestiveOfferText(RV400FestiveOffer);
                              }}
                            >
                              RV1
                            </div>
                            <div
                              id="rv+"
                              className={`model-item ${
                                model === "RV1+" ? "selected-bg" : ""
                              }`}
                              onClick={() => {
                                setModel("RV1+");
                                setColor(
                                  allProducts?.["RV1+"]?.length
                                    ? {
                                        ...allProducts?.["RV1+"]?.[
                                          allProducts?.["RV1+"].length - 1
                                        ],
                                      }
                                    : {}
                                );
                                //  setFestiveOfferText(RV400FestiveOffer);
                              }}
                            >
                              RV1+
                            </div>
                            <div
                              id="rv400brz"
                              className={`model-item ${
                                model === "RV400BRZ" ? "selected-bg" : ""
                              }`}
                              onClick={() => {
                                setModel("RV400BRZ");
                                setColor(
                                  allProducts?.RV400BRZ?.length
                                    ? {
                                        ...allProducts?.RV400BRZ?.[
                                          allProducts?.RV400BRZ.length - 1
                                        ],
                                      }
                                    : {}
                                );
                                selectPlan(avaialbleplans?.[0]?.id);
                              }}
                            >
                              RV400 BRZ
                            </div>
                            <div
                              id="rv400"
                              className={`model-item ${
                                model === "RV400" ? "selected-bg" : ""
                              }`}
                              onClick={() => {
                                setModel("RV400");
                                setColor(
                                  allProducts?.RV400?.length
                                    ? {
                                        ...allProducts?.RV400?.[
                                          allProducts?.RV400.length - 1
                                        ],
                                      }
                                    : {}
                                );
                                selectPlan(avaialbleplans?.[0]?.id);
                              }}
                            >
                              RV400
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {model === "RV1" ? (
                      <div className="bike-card-box">
                        <div
                          className="bike-model-card"
                          style={{ backgroundColor: "transparent" }}
                        >
                          <div
                            className="bike-model-body"
                            style={{
                              backgroundColor: "transparent",
                              border: "1px solid #707070",
                              borderRadius: "10px",
                            }}
                          >
                            <div className="bike-box">
                              <img
                                alt="Revolt Battery"
                                src="/images/calenderhours.svg"
                              />
                              <p>0-80 %</p>
                              <h5>IN {"2 Hrs 15 Mins"}</h5>
                            </div>

                            <div className="bike-box">
                              <img
                                alt="Electric bike speed"
                                src="/images/speed.svg"
                              />
                              <p>
                                70 KM/H <span>*</span>
                              </p>
                              <h5>TOP SPEED</h5>
                            </div>

                            <div className="bike-box">
                              <img
                                alt="Motorcycle Battery Lifespan"
                                src="/images/battery.svg"
                              />
                              <p>
                                100 KMS <span>*</span>
                              </p>
                              <h5>
                                Per Charge <br />
                                Eco Mode
                              </h5>
                            </div>

                            {/* {model === "RV1" && (
                              <div className="bike-box">
                                <img alt="Revolt Mobile App" style={{ maxWidth: "18px" }} src="/images/phone.svg" />
                                <p style={{ textTransform: "capitalize" }}>mobile app</p>
                                <h5>WITH SMART <br /> FEATURES</h5>
                              </div>
                            )} */}
                          </div>
                        </div>
                      </div>
                    ) : null}
                    {model === "RV1+" && (
                      <div className="bike-card-box">
                        <div
                          className="bike-model-card"
                          style={{ backgroundColor: "transparent" }}
                        >
                          <div
                            className="bike-model-body"
                            style={{
                              backgroundColor: "transparent",
                              border: "1px solid #707070",
                              borderRadius: "10px",
                            }}
                          >
                            <div className="bike-box">
                              <img
                                alt="Revolt Battery"
                                src="/images/calenderhours.svg"
                              />
                              <p>0-80 %</p>
                              <h5>IN {"3 Hrs 30 Mins"}</h5>
                            </div>

                            <div className="bike-box">
                              {" "}
                              <img
                                alt="Motorcycle Battery Lifespan"
                                src="/images/fast-charging.png"
                              />
                              <p className="fastCharging">
                                <span className="charge">Fast Charging </span>
                                <span>0-80%</span>
                              </p>
                              <h5> In 1 Hrs 20 Mins</h5>
                            </div>

                            <div className="bike-box">
                              <img
                                alt="Electric bike speed"
                                src="/images/speed.svg"
                              />
                              <p>
                                70 KM/H <span>*</span>
                              </p>
                              <h5>TOP SPEED</h5>
                            </div>

                            <div className="bike-box">
                              <img
                                alt="Motorcycle Battery Lifespan"
                                src="/images/battery.svg"
                              />
                              <p>
                                160 KMS <span>*</span>
                              </p>
                              <h5>
                                Per Charge
                                <br />
                                Eco Mode
                              </h5>
                            </div>

                            {/* {model === "RV2" && (
                              <div className="bike-box">
                                <img alt="Revolt Mobile App" style={{ maxWidth: "18px" }} src="/images/phone.svg" />
                                <p style={{ textTransform: "capitalize" }}>mobile app</p>
                                <h5>WITH SMART <br /> FEATURES</h5>
                              </div>
                            )} */}
                          </div>
                        </div>
                      </div>
                    )}
                    {model === "RV400" || model === "RV400BRZ" ? (
                      <div className="bike-card-box">
                        <div
                          className="bike-model-card"
                          style={{ backgroundColor: "transparent" }}
                        >
                          <div
                            className="bike-model-body"
                            style={{
                              backgroundColor: "transparent",
                              border: "1px solid #707070",
                              borderRadius: "10px",
                            }}
                          >
                            <div className="bike-box">
                              <img
                                alt="Revolt Battery"
                                src="/images/calenderhours.svg"
                              />
                              <p>0-80%</p>
                              <h5>IN {"3 Hrs 30 Mins"}</h5>
                            </div>

                            <div className="bike-box">
                              {" "}
                              <img
                                alt="Motorcycle Battery Lifespan"
                                src="/images/fast-charging.png"
                              />
                              <p className="fastCharging">
                                <span className="charge">Fast Charging </span>
                                <span>0-80%</span>
                              </p>
                              <h5> In 1 Hrs 20 Mins</h5>
                            </div>

                            <div className="bike-box">
                              <img
                                alt="Electric bike speed"
                                src="/images/speed.svg"
                              />
                              <p>
                                85 KM/H <span>*</span>
                              </p>
                              <h5>TOP SPEED</h5>
                            </div>

                            <div className="bike-box">
                              <img
                                alt="Motorcycle Battery Lifespan"
                                src="/images/battery.svg"
                              />
                              <p>
                                150 KMS <span>*</span>
                              </p>
                              <h5>Per Charge</h5>
                            </div>

                            {model === "RV400" && (
                              <div className="bike-box">
                                <img
                                  alt="Revolt Mobile App"
                                  style={{ maxWidth: "18px" }}
                                  src="/images/phone.svg"
                                />
                                <p style={{ textTransform: "capitalize" }}>
                                  mobile app
                                </p>
                                <h5>
                                  WITH SMART <br /> FEATURES
                                </h5>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ) : null}
                  </div>
                  <div className="col-12">
                    <div className="mobile-choose-model">
                      {Object.keys(color).length ? (
                        <h5>
                          <strong>Color : </strong> {color?.color}
                        </h5>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="col-12 col-sm-9 order-sm-2 order-md-2 rv-pr">
                    <div className="carouselView book-bike">
                      {Object.keys(color).length ? (
                        <img
                          loading="lazy"
                          src={"/images/" + color.image}
                          className="rounded mx-auto d-block"
                        />
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="mobile-color-pallet">
                    <div className="bikeColorList">
                      <ul>
                        {AllproductArr?.map((value, index) => {
                          return (
                            <li
                              onClick={() => {
                                setColor({ ...value });
                              }}
                            >
                              <div
                                className={`bikeColorBox ${
                                  value.color === color.color ? "active" : ""
                                }`}
                              >
                                {" "}
                                <span
                                  style={{
                                    background: value.hex_color_code,
                                  }}
                                ></span>
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xs-12 col-sm-4 formView mobileFormView">
              <div
                id="msformNew"
                className="form booking-form"
                style={{ overflowX: "hidden" }}
              >
                <div className="form-card">
                  {" "}
                  <div className="form-bg" id="ms-form">
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
                            {/* {Object.keys(colorInfo).length ? (
                              <h5>
                                <strong>Color : </strong> {bikeInfo?.color}
                              </h5>
                            ) : (
                              ""
                            )} */}
                            {/* <div className="bikeColorList">
                              <ul>
                                {productArr?.map((productInfo, index) => {
                                  return (
                                    <li
                                    // onClick={() =>
                                      // selectColor(
                                      //   productInfo.id,
                                      //   productInfo.color,
                                      //   productInfo
                                      // )
                                    // }
                                    >
                                      <div
                                        className={`bikeColorBox ${
                                          productInfo.color === modelColor
                                            ? "active"
                                            : "notAllowed"
                                        }`}
                                      >
                                        <span
                                          style={{
                                            backgroundColor:
                                              productInfo.hex_color_code,
                                            cursor: "not-allowed",
                                          }}
                                        ></span>
                                      </div>
                                    </li>
                                  );
                                })}
                              </ul>
                            </div> */}
                            <fieldset className="bikemodeL product_page">
                              {product?.city_stock != "ok" ? (
                                <div>
                                  <MessageBox variant="danger">
                                    {product?.city_stock}
                                  </MessageBox>
                                </div>
                              ) : (
                                ""
                              )}

                              <div className="form-card bgwhitenone mt-2">
                                <div className="bookib-proceS">
                                  {product?.subscription?.map((item, i) => (
                                    <>
                                      <div className="desktop-color-pallet">
                                        <div className="rvModel-choose .desktop-choose-model">
                                          <h1>Book your Revolt</h1>
                                          <h4>Choose your model</h4>
                                          <div className="rvModel-chooseBlock">
                                            <div
                                              id="rv1"
                                              className={`model-item ${
                                                model === "RV1"
                                                  ? "selected-bg"
                                                  : ""
                                              }`}
                                              onClick={() => {
                                                setModel("RV1");
                                                setColor(
                                                  allProducts?.RV1?.length
                                                    ? {
                                                        ...allProducts?.RV1?.[
                                                          allProducts?.RV1
                                                            .length - 1
                                                        ],
                                                      }
                                                    : {}
                                                );
                                                //   setFestiveOfferText(RV400FestiveOffer);
                                              }}
                                            >
                                              RV1
                                            </div>
                                            <div
                                              id="rv+"
                                              className={`model-item ${
                                                model === "RV1+"
                                                  ? "selected-bg"
                                                  : ""
                                              }`}
                                              onClick={() => {
                                                console.log("Heeeee");
                                                setModel("RV1+");
                                                setColor(
                                                  allProducts["RV1+"]?.length
                                                    ? {
                                                        ...allProducts[
                                                          "RV1+"
                                                        ]?.[
                                                          allProducts["RV1+"]
                                                            .length - 1
                                                        ],
                                                      }
                                                    : {}
                                                );
                                                //  setFestiveOfferText(RV400FestiveOffer);
                                              }}
                                            >
                                              RV1+
                                            </div>
                                            <div
                                              id="rv400brz"
                                              className={`model-item ${
                                                model === "RV400BRZ"
                                                  ? "selected-bg"
                                                  : ""
                                              }`}
                                              onClick={() => {
                                                setModel("RV400BRZ");
                                                setColor(
                                                  allProducts?.RV400BRZ?.length
                                                    ? {
                                                        ...allProducts
                                                          ?.RV400BRZ?.[
                                                          allProducts?.RV400BRZ
                                                            .length - 1
                                                        ],
                                                      }
                                                    : {}
                                                );
                                              }}
                                            >
                                              RV400 BRZ
                                            </div>
                                            <div
                                              id="rv400"
                                              className={`model-item ${
                                                model === "RV400"
                                                  ? "selected-bg"
                                                  : ""
                                              }`}
                                              onClick={() => {
                                                setModel("RV400");
                                                setColor(
                                                  allProducts?.RV400?.length
                                                    ? {
                                                        ...allProducts?.RV400?.[
                                                          allProducts?.RV400
                                                            .length - 1
                                                        ],
                                                      }
                                                    : {}
                                                );
                                              }}
                                            >
                                              RV400
                                            </div>
                                          </div>
                                        </div>
                                        {Object.keys(color).length ? (
                                          <h5>
                                            <strong>Color : </strong>{" "}
                                            {color?.color}
                                          </h5>
                                        ) : (
                                          ""
                                        )}

                                        <div className="bikeColorList">
                                          <ul>
                                            {AllproductArr?.map(
                                              (value, index) => {
                                                return (
                                                  <li
                                                    onClick={() => {
                                                      setColor({ ...value });
                                                    }}
                                                  >
                                                    <div
                                                      className={`bikeColorBox ${
                                                        value.color ===
                                                        color.color
                                                          ? "active"
                                                          : ""
                                                      }`}
                                                    >
                                                      {" "}
                                                      <span
                                                        style={{
                                                          background:
                                                            value.hex_color_code,
                                                        }}
                                                      ></span>
                                                    </div>
                                                  </li>
                                                );
                                              }
                                            )}
                                          </ul>
                                        </div>
                                      </div>
                                      <div>
                                        {/* <h2>Revolt Payment Plan</h2>
                                        <div className="fs-title form-default stepnumbering m-0 PaymentPlan">
                                          {/* <select
                                            className="form-control"
                                            value={
                                              selectedPlan
                                                ? selectedPlan
                                                : product?.purchasee_plan?.[0].id
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

                                           {avaialbleplans &&
                                            [...avaialbleplans]?.map(
                                              (value, key) => {
                                                return (
                                                  //   <Radio
                                                  //   showPercent={false}
                                                  //   key={key}
                                                  //   showName={false}
                                                  //   label={value.plan_type}
                                                  //   id={value.id}
                                                  //   name={value.plan_type}
                                                  //   value={value.id}
                                                  //   groupValue={
                                                  //     selectedPlan
                                                  //       ? selectedPlan
                                                  //       : avaialbleplans[0]?.id
                                                  //   }
                                                  //   onClick={() =>
                                                  //     selectPlan(value.id)
                                                  //   }
                                                  // />
                                                  <Radio
                                                    key={key}
                                                    showName={false}
                                                    label={value.plan_type}
                                                    id={value.id}
                                                    name={value.plan_type}
                                                    value={value.id}
                                                    showPercentage={false}
                                                    groupValue={
                                                      selectedPlan
                                                        ? selectedPlan
                                                        : product
                                                            ?.purchasee_plan?.[0]
                                                            .id
                                                    }
                                                    onClick={() =>
                                                      selectPlan(value.id)
                                                    }
                                                  />
                                                );
                                              },
                                            )} 
                                        </div>*/}
                                      </div>
                                      <div className="priceBreakupSection">
                                        <table
                                        // className="table"
                                        >
                                          <tr>
                                            <td>
                                              <h5>Pricing</h5>
                                              <p>
                                                Incl. of Charger, EMPS 2024
                                                Subsidy, applicable benefits,
                                                and State Subsidy wherever
                                                applicable
                                              </p>
                                            </td>
                                            <td>
                                              <NumberFormat
                                                value={
                                                  bikePrice -
                                                  stateSubsidy +
                                                  //  - INSURANCE_COST
                                                  item?.charger
                                                }
                                                displayType={"text"}
                                                thousandSeparator={true}
                                                thousandsGroupStyle="lakh"
                                                prefix="&#8377;"
                                              />
                                            </td>
                                          </tr>
                                        </table>
                                        {/* </div>
                                      <div
                                        className="priceBreakupSection"
                                        style={{
                                          paddingTop:"0px",
                                          display: showBreakUp
                                            ? "none"
                                            : "block",
                                        }}
                                      > */}
                                        {/* <table className="table">
                                          <tr>
                                            <td>
                                              <h5>Pricing</h5>
                                              <p>
                                                Incl. of Charger, EMPS 2024
                                                Subsidy, applicable discounts,
                                                and State Subsidy wherever
                                                applicable
                                              </p>
                                            </td>
                                            <td>
                                              <NumberFormat
                                                value={
                                                  bikePrice -
                                                  stateSubsidy -
                                                  INSURANCE_COST
                                                  //+ item?.charger
                                                }
                                                displayType={"text"}
                                                thousandSeparator={true}
                                                thousandsGroupStyle="lakh"
                                                prefix="&#8377;"
                                              />
                                            </td>
                                          </tr>
                                        </table> */}
                                        <div
                                          className="text-center price-brekup-block"
                                          style={{
                                            display: showBreakUp
                                              ? "none"
                                              : "block",
                                          }}
                                          onClick={() => setShowBreakUp(true)}
                                        >
                                          <span>View Price Breakup</span>
                                          <img src="/images/plus.svg" />
                                        </div>
                                      </div>
                                      <div
                                        className="priceBreakupSection priceBreakupDetails"
                                        style={{
                                          display: showBreakUp
                                            ? "block"
                                            : "none",
                                        }}
                                      >
                                        <div>
                                          <table className="table">
                                            <tbody>
                                              {/* <tr>
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
                                              </tr> */}

                                              {/* {product?.subscription[0]
                                              ?.plan_type == "My Revolt Plan" ||
                                            product?.subscription[0]
                                              ?.plan_type == "5.99% Plan" ||
                                            product?.subscription[0]
                                              ?.plan_type == "Finance@7.99%" ? (
                                              <> */}
                                              {/* <tr>
                                                  <td>Monthly Payment </td>
                                                  <td>
                                                    <NumberFormat
                                                      value={item?.emi_amount}
                                                      displayType={"text"}
                                                      thousandSeparator={true}
                                                      thousandsGroupStyle="lakh"
                                                      prefix="&#8377;"
                                                    />
                                                  </td>
                                                </tr>
                                                <tr>
                                                  <td
                                                    colSpan={2}
                                                    className="text-center"
                                                  >
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
                                              </>):<> */}
                                              <tr>
                                                <td>
                                                  <h5>
                                                    {" "}
                                                    Vehicle Ex-Showroom Price{" "}
                                                  </h5>
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
                                              {/* {product?.subscription[0]
                                                  ?.plan_type ==
                                                "Non-Finance" ? (
                                                  <> */}
                                              {product?.product_offers?.map(
                                                (offer) => (
                                                  <tr>
                                                    <td className="offerDiscount">
                                                      {" "}
                                                      <h5
                                                        dangerouslySetInnerHTML={{
                                                          __html: offer.name,
                                                        }}
                                                      ></h5>
                                                    </td>

                                                    <td className="offerDiscount d-flex">
                                                      -
                                                      <NumberFormat
                                                        value={offer.discount}
                                                        displayType={"text"}
                                                        thousandSeparator={true}
                                                        thousandsGroupStyle="lakh"
                                                        prefix="&#8377;"
                                                      />
                                                    </td>
                                                  </tr>
                                                )
                                              )}

                                              {stateSubsidy ? (
                                                <tr>
                                                  <td className="offerDiscount">
                                                    <h5> *State Subsidy </h5>
                                                    {/* <div class="emi_tooltip">
                                                      {" "}
                                                      <img
                                                        src="/images/info.svg"
                                                        alt=""
                                                      />
                                                      <span className="emi_tooltip_text">
                                                        State incentive has to
                                                        be claimed directly by
                                                        the customer from the
                                                        state government (Direct
                                                        to Customer).
                                                      </span>
                                                    </div> */}
                                                  </td>
                                                  <td className="offerDiscount d-flex">
                                                    -
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
                                              {/* // </>
                                                ) : null} */}
                                              {/* <tr>
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
                                                </tr> */}

                                              <tr>
                                                <td>
                                                  <h5>
                                                    Effective Ex-Showroom Price{" "}
                                                  </h5>
                                                  <p>
                                                    {" "}
                                                    Incl. of Charger, EMPS 2024
                                                    Subsidy, applicable
                                                    discounts, and State Subsidy
                                                    wherever applicable
                                                  </p>
                                                  {/* <span
                                                      style={{
                                                        fontSize: "14px",
                                                        color: "#6d6e71",
                                                      }}
                                                    >
                                                      (Inclusive of charger)
                                                    </span> */}
                                                </td>
                                                <td>
                                                  <NumberFormat
                                                    value={
                                                      bikePrice - stateSubsidy
                                                      //+ item?.charger
                                                    }
                                                    displayType={"text"}
                                                    thousandSeparator={true}
                                                    thousandsGroupStyle="lakh"
                                                    prefix="&#8377;"
                                                  />
                                                </td>
                                              </tr>
                                              {/* {model == "RV400" ||
                                              model == "RV400BRZ" ? (
                                                <tr>
                                                  <td className="offerDiscount">
                                                    <h5>
                                                      {" "}
                                                      Limited Period Festive
                                                      Offer (Free Insurance)
                                                    </h5>
                                                  </td>
                                                  <td className="offerDiscount">
                                                    -
                                                    <NumberFormat
                                                      value={INSURANCE_COST}
                                                      displayType={"text"}
                                                      thousandSeparator={true}
                                                      thousandsGroupStyle="lakh"
                                                      prefix="&#8377;"
                                                    />
                                                  </td>
                                                </tr>
                                              ) : null} */}

                                              {/* {stateSubsidy ? (
                                                <tr>
                                                  <td className="offerDiscount">
                                                    <h5>Price</h5>
                                                  </td>
                                                  <td className="offerDiscount d-flex">
                                                    -
                                                    <NumberFormat
                                                      value={
                                                        model == "RV400BRZ"
                                                          ? bikePrice -
                                                            stateSubsidy -
                                                            INSURANCE_COST
                                                          : bikePrice -
                                                            stateSubsidy -
                                                            INSURANCE_COST
                                                      }
                                                      displayType={"text"}
                                                      thousandSeparator={true}
                                                      thousandsGroupStyle="lakh"
                                                      prefix="&#8377;"
                                                    />
                                                  </td>
                                                </tr>
                                              ) : (
                                                <tr>
                                                  <td className="offerDiscount">
                                                    <h5>Price</h5>
                                                  </td>
                                                  <td className="offerDiscount">
                                                    <NumberFormat
                                                      value={
                                                        bikePrice -
                                                        INSURANCE_COST
                                                      }
                                                      displayType={"text"}
                                                      thousandSeparator={true}
                                                      thousandsGroupStyle="lakh"
                                                      prefix="&#8377;"
                                                    />
                                                  </td>
                                                </tr>
                                              )} */}

                                              {/* </>
                                            )} */}
                                            </tbody>
                                          </table>
                                        </div>
                                        <div
                                          className="text-center price-brekup-block"
                                          onClick={() => setShowBreakUp(false)}
                                        >
                                          <span>Close Price Breakup</span>
                                          <img src="/images/minus.svg" />
                                        </div>
                                      </div>
                                      <div
                                        className="downPaymntDetails"
                                        style={{
                                          paddingTop: showBreakUp
                                            ? "0px"
                                            : "auto",
                                        }}
                                      >
                                        {/* <ul>
                                          <li>
                                            {getDownpayment()} Downpayment
                                          </li>
                                          <li>EMI Start at {getEMI()}</li>
                                        </ul> */}
                                      </div>
                                    </>
                                  ))}

                                  <div
                                    className="rvTermsBlock"
                                    style={{
                                      display: showBreakUp ? "block" : "none",
                                    }}
                                  >
                                    <ul className="mt-2 ch-font">
                                      <li>
                                        <b>
                                          <sup>*</sup>
                                        </b>{" "}
                                        The price of vehicle shall be applicable
                                        as prevailing on the date of delivery of
                                        vehicle to customer.
                                      </li>

                                      <li>
                                        <b>
                                          <sup>*</sup>
                                        </b>{" "}
                                        Your booking amount will be adjusted
                                        with the On-Road price. Registration ,
                                        Road Tax, Insurance
                                        {["RV400BRZ", "RV1", "RV1+"].includes(
                                          model
                                        )
                                          ? ""
                                          : ", 4G Connectivity"}{" "}
                                        and other statutory applicable charges
                                        will be additional based on actuals.
                                      </li>
                                      <li>
                                        <b>
                                          <sup>*</sup>
                                        </b>{" "}
                                        State incentive (If Applicable) has to
                                        be claimed directly by the customer from
                                        the state government (Direct to
                                        Customer).
                                      </li>
                                      <li>
                                        <b>
                                          <sup> *</sup>
                                        </b>{" "}
                                        Price Benefit: Available for a limited
                                        stock only.
                                      </li>

                                      {plan_type == "My Revolt Plan" && (
                                        <>
                                          <li>
                                            <b>
                                              <sup>1</sup>
                                            </b>{" "}
                                            For more information, Please contact
                                            your nearest dealership.
                                          </li>
                                          <li>
                                            <b>
                                              <sup>1</sup>
                                            </b>{" "}
                                            Down payment excluding booking
                                            amount- INR <b>5,216</b>
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
                                      {plan_type == "5.99% Plan" && (
                                        <>
                                          <li>
                                            <b>
                                              <sup>1</sup>
                                            </b>{" "}
                                            For more information, Please contact
                                            your nearest dealership.
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
                                            Applicabcontactmodelle in select
                                            cities only.
                                          </li>
                                        </>
                                      )}
                                      {plan_type == "7.99% Plan" && (
                                        <>
                                          <li>
                                            <b>
                                              <sup>1</sup>
                                            </b>{" "}
                                            For more information, Please contact
                                            your nearest dealership.
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

                                      {/* <li>
                                        <b>
                                          <sup>1</sup>
                                        </b>{" "}
                                        Expected Delivery :
                                        Immediate (Delivery of Stealth Black
                                        Limited Edition will be in October 2023)
                                      </li> */}
                                      <li>
                                        <b>
                                          <sup>*</sup>
                                        </b>{" "}
                                        The booking can be cancelled within 90
                                        days of booking date by contacting
                                        Revolt dealers and refund will be
                                        processed as per company policy.
                                      </li>
                                      <li>
                                        <b>
                                          <sup>*</sup>
                                        </b>{" "}
                                        The cancellation will not be allowed
                                        after 90 days of booking and booking
                                        amount stands forfeited in case customer
                                        is not willing to take a delivery.
                                      </li>
                                      {model == "RV400" ? (
                                        <li>
                                          <b>
                                            <sup>*</sup>
                                          </b>{" "}
                                          Extended Warranty(Ride Shield Pro)
                                          worth ₹4,999 consists of 2 years of
                                          extended warranty on overall vehicle,
                                          frame, wire harness, motor, controller
                                          and battery.
                                        </li>
                                      ) : null}

                                      {/* </li> */}
                                      {sessionStorage.getItem("isVendor") ? (
                                        <li>
                                          <b>
                                            <sup>*</sup>
                                          </b>{" "}
                                          Employee to present approval copy
                                          received over mail along with self -
                                          attested employee id at point of sale
                                          to avail discount offer.
                                        </li>
                                      ) : null}
                                    </ul>
                                  </div>
                                </div>
                              </div>

                              <div className="BookingButtonWrapper mt-4">
                                <ul className="d-flex justify-content-between">
                                  <li>
                                    <h5>Booking Amount</h5>
                                  </li>
                                  <li>
                                    <h4>
                                      {numberFormatPrice(
                                        !productDetails.loading
                                          ? productDetails?.product
                                              ?.subscription?.[0]
                                              ?.booking_amount
                                          : 499
                                      )}{" "}
                                      <span>
                                        Fully Refundable{" "}
                                        <div class="rvtooltip">
                                          <img src="/images/info-circle-grey.svg" />{" "}
                                          <span class="tooltiptext">
                                          Get a full refund if you cancel your booking within 90 days.
                                          </span>
                                        </div>
                                      </span>
                                    </h4>
                                  </li>
                                </ul>
                              </div>
                              <div className="submit-btns justify-content-center ">
                                {sessionStorage.getItem("bookingContd") ==
                                "true" ? null : (
                                  <button
                                    type="button"
                                    className="sl-btn sb-btn"
                                    value="Back"
                                    // disabled={sessionStorage.getItem("bookingContd") == 'true'?true:false}
                                    onClick={() => navigate(`/book `)}
                                  >
                                    Back
                                  </button>
                                )}
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
          </div>
        </div>
        <div>
          <div className="mobile-next-container nextBlock">
            <ul className="d-flex justify-content-between">
              <li>
                <h5>Booking Amount</h5>
              </li>
              <li>
                <h4>
                  {numberFormatPrice(
                    !productDetails.loading
                      ? productDetails?.product?.subscription?.[0]
                          ?.booking_amount
                      : 499
                  )}{" "}
                  <span>
                    Fully Refundable{" "}
                    <div class="rvtooltip">
                      <img src="/images/info-circle-grey.svg" />{" "}
                      <span class="tooltiptext">
                      Get a full refund if you cancel your booking within 90 days.
                      </span>
                    </div>
                  </span>
                </h4>
              </li>
            </ul>
            <div className="btn-block">
              {sessionStorage.getItem("bookingContd") == "true" ? null : (
                <button
                  type="button"
                  className="sl-btn sb-btn"
                  value="Back"
                  // disabled={sessionStorage.getItem("bookingContd") == 'true'?true:false}
                  onClick={() => navigate(`/book `)}
                >
                  <img src="/images/right-arrow.svg" /> Back
                </button>
              )}
              <button
                type="submit"
                onClick={addToCartHandler}
                disabled={
                  product?.subscription?.length === 0 ||
                  avaialbleplans?.length === 0 ||
                  product?.city_stock != "ok"
                }
                name="next"
                className="next action-button newNextBtn"
              >
                {" "}
                Next <img src="/images/next-arrow.svg" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* new design end */}
    </>
  );
}
