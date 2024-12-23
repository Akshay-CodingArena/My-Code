import { axios } from "../utilities/axios";
import { productBycolor } from "../actions/productActions";
import { booking } from "../actions/userActions";
import { URL_API } from "../constants/cartConstants";
import { useNavigate } from "react-router";

const BookingContinue = async (dispatch, navigate, bookingId, setReload) => {
  console.log("Continue ...............");
  let { data } = await axios.get(
    URL_API + "/api/v1/auth/callCenterLeadData/" + bookingId,
  );
  let bookingData = data?.response?.bookingData;
  bookingData["name"] = bookingData.customer_name;
  bookingData["pincode"] = bookingData.postalCode;
  delete bookingData.postalCode;
  delete bookingData.customer_name;
  console.log("My response", data?.response?.orderItems);
  localStorage.setItem("cartItems", JSON.stringify(data?.response?.orderItems));
  localStorage.setItem(
    "colorInfo",
    JSON.stringify(data.response.orderItems.product[0]),
  );
  sessionStorage.setItem(
    "colorImage",
    data.response.orderItems.product[0].image,
  );
  localStorage.setItem("shippingAddress", JSON.stringify(bookingData));
  localStorage.setItem("bookinginfo", JSON.stringify(bookingData));
  localStorage.setItem(
    "bookingLeadDetails",
    JSON.stringify({
      booking_id: bookingId,
      customerId: data?.response?.customerId,
      lsq_opp_id: data?.response?.lsq_opp_id,
    }),
  );
  sessionStorage.setItem(
    "colorInfo",
    JSON.stringify(data.response.orderItems.product[0]),
  );
  sessionStorage.setItem(
    "selectedModel",
    data.response.orderItems.product[0]?.model_family_name,
  );
  sessionStorage.setItem("bookingContd", true);
  sessionStorage.setItem(
    "bikeId",
    data.response.orderItems.product[0]?.model_id,
  );
  sessionStorage.setItem(
    "selectedProductId",
    data.response.orderItems.product[0]?.model_id,
  );
  sessionStorage.setItem(
    "selectedPlan",
    data?.response?.orderItems?.subscription[0]?.id,
  );
  localStorage.setItem(
    "contact_id",
    data?.response?.bookingData.freshdesk_contact_id,
  );
  localStorage.setItem(
    "org_contact_id",
    data?.response?.bookingData.freshdesk_org_contact_id,
  );
  setReload(true);
  if (bookingData.isPaid == 1) {
    navigate(`/thankyoubooking/${bookingData.order_id}`);
  }
  // let bookingPayload = tokenData.bookingInfo
  // let bookingLeadDetails = {
  //     booking_id: tokenData.booking_id,
  //     lsq_opp_id: tokenData.lsq_opp_id,
  //     customerId: tokenData.customerId
  // }
  // localStorage.setItem("bookingPayload", JSON.stringify(bookingPayload))
  // localStorage.setItem("bookingLeadDetails",JSON.stringify(bookingLeadDetails))
  // dispatch(productBycolor(tokenData.productId,  tokenData.color, tokenData.plan_id, tokenData.dealerInfo, true))
  // localStorage.setItem("shippingAddress", JSON.stringify(bookingPayload))
};

export { BookingContinue };
