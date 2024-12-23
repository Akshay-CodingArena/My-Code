import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { cartReducer } from "./reducers/cartReducers";
import {
  orderCreateReducer,
  orderUpgradeReducer,
  orderDeleteReducer,
  orderDeliverReducer,
  orderDetailsReducer,
  upgradeorderDetailsReducer,
  orderListReducer,
  upgradeorderListReducer,
  notifyListReducer,
  testrideListReducer,
  adminTestrideDetailReducer,
  orderMineListReducer,
  orderPayReducer,
  upgradeorderPayReducer,
  adminorderDetailsReducer,
  adminUpgradeorderDetailsReducer,
  orderSummaryReducer,
  contactListReducer,
} from "./reducers/orderReducers";
import {
  productCategoryListReducer,
  productCreateReducer,
  productDeleteReducer,
  productDetailsReducer,
  productListReducer,
  productReviewCreateReducer,
  productUpdateReducer,
  StateCityHubReducer,
  StateCityHubReducer_upgrade,
  StateCityHubReducer_SC,
  allProductsReducer,
} from "./reducers/productReducers";
import {
  userAddressMapReducer,
  userBookingReducer,
  userDeleteReducer,
  userDetailsReducer,
  userListReducer,
  userRegisterReducer,
  userSigninReducer,
  userTopSellerListReducer,
  userUpdateProfileReducer,
  userUpdateReducer,
} from "./reducers/userReducers";
import { vendorReducer } from "./reducers/vendorReducer";
import { bannerReducer } from "./reducers/bannerReducer";
import feedbackReducer from "./reducers/feedbackReducer";
// import { batteryRechargeHistoryReducer } from "./reducers/dashBoardReducer";

const initialState = {
  userSignin: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
  bookinginfo: {
    bookInfo: localStorage.getItem("bookInfo")
      ? JSON.parse(localStorage.getItem("bookInfo"))
      : null,
  },
  cart: {
    cartItems:
      localStorage.getItem("cartItems") &&
      localStorage.getItem("cartItems") != "undefined"
        ? JSON.parse(localStorage.getItem("cartItems"))
        : [],
    shippingAddress: localStorage.getItem("shippingAddress")
      ? JSON.parse(localStorage.getItem("shippingAddress"))
      : {},
    orderdetails: localStorage.getItem("orderdetails")
      ? JSON.parse(localStorage.getItem("orderdetails"))
      : {},
    upgradeorderdetails: localStorage.getItem("upgradeorderdetails")
      ? JSON.parse(localStorage.getItem("upgradeorderdetails"))
      : {},
    paymentMethod: "PayPal",
  },

  state_city_hub: localStorage.getItem("state_city_hub")
    ? JSON.parse(localStorage.getItem("state_city_hub"))
    : [],
  state_city_hub_upgrade: localStorage.getItem("state_city_hub_upgrade")
    ? JSON.parse(localStorage.getItem("state_city_hub_upgrade"))
    : [],
  state_city_hub_SC: localStorage.getItem("state_city_hub_SC")
    ? JSON.parse(localStorage.getItem("state_city_hub_SC"))
    : [],
};
const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  allProducts: allProductsReducer,
  cart: cartReducer,
  userSignin: userSigninReducer,
  bookinginfo: userBookingReducer,
  userRegister: userRegisterReducer,
  orderCreate: orderCreateReducer,
  orderUpgrade: orderUpgradeReducer,
  orderDetails: orderDetailsReducer,
  upgradeorderDetails: upgradeorderDetailsReducer,
  orderPay: orderPayReducer,
  upgradeorderPay: upgradeorderPayReducer,
  orderDetail: adminorderDetailsReducer,
  upgradeorderDetail: adminUpgradeorderDetailsReducer,
  orderMineList: orderMineListReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userUpdate: userUpdateReducer,
  state_city_hub: StateCityHubReducer,
  state_city_hub_upgrade: StateCityHubReducer_upgrade,
  state_city_hub_SC: StateCityHubReducer_SC,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productDelete: productDeleteReducer,
  orderList: orderListReducer,
  upgradeorderList: upgradeorderListReducer,
  notifyList: notifyListReducer,
  testrideList: testrideListReducer,
  testrideDetail: adminTestrideDetailReducer,
  orderDelete: orderDeleteReducer,
  orderDeliver: orderDeliverReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userTopSellersList: userTopSellerListReducer,
  productCategoryList: productCategoryListReducer,
  productReviewCreate: productReviewCreateReducer,
  vendor: vendorReducer,
  userAddressMap: userAddressMapReducer,
  orderSummary: orderSummaryReducer,
  contactList: contactListReducer,
  banner: bannerReducer,
  feedback: feedbackReducer,
  // batteryRechargeHistory: batteryRechargeHistoryReducer,
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
