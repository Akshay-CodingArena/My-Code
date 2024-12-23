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
import {
  productUpdateReducer,
  productDetailsReducer,
} from "../reducers/productReducers";
import { axios as Axios } from "../utilities/axios";
import { URL_API, ROOT_PATH } from "../constants/cartConstants";
import { bookingout } from "../actions/userActions";
import NumberFormat from "react-number-format";
import clevertap from "clevertap-web-sdk";
import EmiCalculator from "../components/EmiCalculator";

const ModelsSelector = () => {
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
    //   if (!userInfo_info) {
    //     navigate(`/product/RM0400RRCP1CWBLK` + search);
    //   }

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
    navigate(`/placeorder/${productId}` + search);
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
  return (
    <div className="section-bike mt-4">
      <div className="row align-items-center">
        <div className="col-12 col-md-6">
          <div className="bk-img">
            <img src={`/images/${selectedModel?.[0]?.image}`} />
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
                  active = productcolor.color == modelColor ? "active" : "";
                  return (
                    <li
                      className="product_blacktheme"
                      data-bikeclr="blacktheme"
                      key={k}
                    >
                      <label
                        className={`contain ${active}`}
                        onClick={() =>
                          selectColor(productcolor.id, productcolor.color)
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
  );
  //////////////////
};

export default ModelsSelector;
