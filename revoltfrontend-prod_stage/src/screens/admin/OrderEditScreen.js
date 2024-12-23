import { axios as Axios } from "../../utilities/axios";
//import Razorpay from "razorpay";
//import { PayPalButton } from 'react-paypal-button-v2';
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  deliverOrder,
  adminOrderDetails,
  payOrder,
} from "../../actions/orderActions";
import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";
import CheckoutSteps from "../../components/CheckoutSteps";
import Pdf from "react-to-pdf";

import {
  ORDER_DELIVER_RESET,
  ORDER_PAY_RESET,
} from "../../constants/orderConstants";
import { URL_API, ROOT_PATH } from "../../constants/cartConstants";
import NumberFormat from "react-number-format";
export default function OrderEditScreen(props) {
  //
  const statecityhub = localStorage.getItem("state_city_hub");
  const stateList_myArr = JSON.parse(statecityhub);
  const stateList = stateList_myArr.state;
  const cityList = stateList_myArr.city;
  const hubList = stateList_myArr.hub;
  //

  const ref = React.createRef();
  const options = {
    orientation: "landscape",
    unit: "in",
    format: [4, 2],
  };

  const navigate = useNavigate();
  const params = useParams();
  const { id: orderId } = params;
  const [amount, setAmount] = useState("");
  const [sdkReady, setSdkReady] = useState(false);
  const orderDetail = useSelector((state) => state.orderDetail);
  const { order, loading, setLoading, error } = orderDetail;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const [SlotAvilable, setSlotAvilable] = useState([]);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");

  const orderPay = useSelector((state) => state.orderPay);
  const {
    loading: loadingPay,
    error: errorPay,
    success: successPay,
  } = orderPay;
  const orderDeliver = useSelector((state) => state.orderDeliver);
  const {
    loading: loadingDeliver,
    error: errorDeliver,
    success: successDeliver,
  } = orderDeliver;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(adminOrderDetails(orderId));
  }, []);

  //const slip_state = stateList.find((c) => c.state_id == order?.shippingAddress[0].state)?.state_name;
  //const slip_city =  cityList.find((c) => c.city_id == order?.shippingAddress[0].city)?.city_name;
  //const slip_country = order?.shippingAddress[0].country;

  const [selectedState, setSelectedState] = React.useState(
    order?.shippingAddress[0].state ? order?.shippingAddress[0].state : "",
  );
  const [selectedCity, setSelectedCity] = React.useState(
    order?.shippingAddress[0]?.city ? order?.shippingAddress[0]?.city : "",
  );

  const availableCity = cityList.filter(
    (c) => c.state_id == order?.shippingAddress[0].state,
  );
  const availableHub = hubList.filter(
    (c) => c.city_id == order?.shippingAddress[0].city,
  );
  const [modelColor, setModelcolor] = useState(
    order?.order[0]?.bike_color ? order?.order[0]?.bike_color : "",
  );

  const checkBookingSlot = async (e) => {
    //setSelectedHub(e);
    try {
      const { data } = await Axios.get(
        `${URL_API}/api/v1/products/checkbookingslots/${e}`,
      );
      console.log(data.data);
      setSlotAvilable(data.data);
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
    }
  };

  console.log(order);
  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <>
      {/* new design start */}
      <section className="signinnsignup detailsflow">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-sm-9 col-md-7 col-lg-11 col-xl-12 text-center p-0    ">
              <div className="card px-0   pb-0    " id="msform">
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb breadcrumbs">
                    <li className="breadcrumb-item">
                      <a href="#">Home</a>
                    </li>
                    <li className="breadcrumb-item " aria-current="page">
                      <a href="/orderlist">Bookings</a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Booking
                    </li>
                  </ol>
                </nav>

                <fieldset>
                  <div className="form-card thankyoupage">
                    <div className="row">
                      <div className="col-12 mt-5" ref={ref}>
                        <table className="table table-striped table-bordered tableNSE">
                          <tbody>
                            <tr>
                              <td> Booking Id</td>
                              <td style={{ background: "#f1f3f6" }}>
                                {" "}
                                {order.booking_ref_id}
                              </td>
                            </tr>
                            <tr>
                              <td style={{ background: "#fff" }}>Name</td>
                              <td style={{ background: "#f1f3f6" }}>
                                <input
                                  id="name"
                                  type="text"
                                  placeholder="Enter name"
                                  value={order.shippingAddress[0].name}
                                  onChange={(e) => setName(e.target.value)}
                                ></input>
                              </td>
                            </tr>
                            <tr>
                              <td style={{ background: "#fff" }}>Email Id</td>
                              <td style={{ background: "#f1f3f6" }}>
                                {}

                                <input
                                  id="name"
                                  type="text"
                                  placeholder="Enter name"
                                  value={order.shippingAddress[0].email}
                                  onChange={(e) => setEmail(e.target.value)}
                                ></input>
                              </td>
                            </tr>
                            <tr>
                              <td>Mobile</td>
                              <td style={{ background: "#f1f3f6" }}>
                                <input
                                  id="name"
                                  type="text"
                                  placeholder="Enter name"
                                  value={order.shippingAddress[0].mobile}
                                  onChange={(e) => setMobile(e.target.value)}
                                ></input>
                              </td>
                            </tr>

                            <tr>
                              <td>State</td>
                              <td style={{ background: "#f1f3f6" }}>
                                <select
                                  id="state"
                                  className="form-control"
                                  placeholder="Select State"
                                  required
                                  value={order?.shippingAddress[0].state}
                                  name="state"
                                  onChange={(e) =>
                                    setSelectedState(e.target.value)
                                  }
                                >
                                  <option>Choose State</option>
                                  {stateList.map((value, key) => {
                                    return (
                                      <option value={value.state_id} key={key}>
                                        {value.state_name}
                                      </option>
                                    );
                                  })}
                                </select>
                              </td>
                            </tr>
                            <tr>
                              <td>City</td>
                              <td style={{ background: "#f1f3f6" }}>
                                <select
                                  id="city"
                                  className="form-control"
                                  placeholder="City"
                                  value={order?.shippingAddress[0].city}
                                  name="city"
                                  onChange={(e) =>
                                    setSelectedCity(e.target.value)
                                  }
                                  required
                                >
                                  <option>Choose City</option>
                                  {availableCity.map((e, key) => {
                                    return (
                                      <option value={e.city_id} key={key}>
                                        {e.city_name}
                                      </option>
                                    );
                                  })}
                                </select>
                              </td>
                            </tr>
                            <tr>
                              <td>Select Hub</td>
                              <td style={{ background: "#f1f3f6" }}>
                                <select
                                  id="area"
                                  placeholder="Dealer Hub"
                                  className="form-control"
                                  name="area"
                                  required
                                  value={order?.shippingAddress[0].area}
                                  // onChange={(e) => setSelectedHub(e.target.value)}
                                  onChange={(e) =>
                                    checkBookingSlot(e.target.value)
                                  }
                                >
                                  <option value="">Dealer Hub</option>
                                  {availableHub.map((e, key) => {
                                    return (
                                      <option value={e.hub_id} key={key}>
                                        {e.hub_name}
                                      </option>
                                    );
                                  })}
                                </select>
                              </td>
                            </tr>

                            <tr>
                              <td style={{ background: "#fff" }}> Model</td>
                              <td style={{ background: "#f1f3f6" }}>
                                {order.orderItems[0].name}
                              </td>
                            </tr>
                            <tr>
                              <td style={{ background: "#fff" }}> Color</td>
                              <td style={{ background: "#f1f3f6" }}>
                                {order.order[0].bike_color}

                                {/* <ul>
                  }    {product.colors.map((productcolor,k) => { 
                        active = (productcolor.color == modelColor) ? "active" : "";

                        return( 



                                    <li className="product_blacktheme"  data-bikeclr="blacktheme" key={k} >
                                        <label 
                                        
                                        style={{"background": active == "active" ? selectedcolor :"","color":active == "active" ? "#fff" :"#000" }}
                                        className={`container ${active}`}
                                        
                                      
                                      
                                        onClick={(e)=>setModelcolor(productcolor.color)}
                                        >
                                      { order.order[0].bike_color}
                                        </label>
                                          
                                      
                                    </li>
                                    
                ); } ) } 
           </ul>  */}
                              </td>
                            </tr>

                            <tr>
                              <td style={{ background: "#fff" }}>
                                Show Room Price
                              </td>
                              <td style={{ background: "#f1f3f6" }}>
                                <NumberFormat
                                  value={order.order[0].itemsPrice}
                                  displayType={"text"}
                                  thousandSeparator={true}
                                  thousandsGroupStyle="lakh"
                                  prefix="&#8377;"
                                />
                                {/* <NumberFormat value={cartitem_myArr.subscription[0].booking_amount}  displayType={'text'}  thousandSeparator={true} thousandsGroupStyle="lakh" prefix="&#8377;"  /> */}
                              </td>
                            </tr>

                            <tr>
                              <td style={{ background: "#fff" }}>
                                Booking Amount
                              </td>
                              <td style={{ background: "#f1f3f6" }}>
                                <NumberFormat
                                  value={order.order[0].booking_amount}
                                  displayType={"text"}
                                  thousandSeparator={true}
                                  thousandsGroupStyle="lakh"
                                  prefix="&#8377;"
                                />

                                {/* <NumberFormat value={cartitem_myArr.subscription[0].booking_amount}  displayType={'text'}  thousandSeparator={true} thousandsGroupStyle="lakh" prefix="&#8377;"  /> */}
                              </td>
                            </tr>

                            {/* <tr>
              <td style={{ background: "#fff" }}>Effective cost before on Road</td>
              <td style={{ background: "#f1f3f6" }}>
              &#8377;{order.order[0].itemsPrice}
                //  <NumberFormat value={cartitem_myArr.subscription[0].booking_amount}  displayType={'text'}  thousandSeparator={true} thousandsGroupStyle="lakh" prefix="&#8377;"  />  
                
                </td>
            </tr> */}

                            <tr>
                              <td> Payment Method</td>
                              <td style={{ background: "#f1f3f6" }}>
                                {(order.paymentMethod = "Razor")}
                              </td>
                            </tr>
                            <tr>
                              <td> Payment Status</td>
                              <td style={{ background: "#f1f3f6" }}>
                                {order.order[0].isPaid === 1 ? (
                                  <MessageBox variant="success">
                                    Booking Amount Paid Successfully <br />
                                    at {order.order[0].createdAt}
                                    <br />
                                    Thanks for Booking @Revolt Team
                                  </MessageBox>
                                ) : (
                                  <MessageBox variant="danger">
                                    Not Paid
                                  </MessageBox>
                                )}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/*<input type="button" name="pre" className="pre action-button-pre" value="Pre" /> */}
                  </div>
                </fieldset>

                {/* 3rd tab end  */}
                {/* </form>   */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* new design end */}
    </>
  );
}
