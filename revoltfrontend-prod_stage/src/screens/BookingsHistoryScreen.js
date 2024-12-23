// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate, useLocation } from "react-router-dom";
// import { deleteOrder, listOrders } from "../actions/orderActions";
// import LoadingBox from "../components/LoadingBox";
// import MessageBox from "../components/MessageBox";
// import { ORDER_DELETE_RESET } from "../constants/orderConstants";
// import { CSVLink } from "react-csv";

// import { MDBDataTable } from "mdbreact";
// import { MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
// import moment from "moment";

// const BookingHistoryScreen = ()=>{
//     const navigate = useNavigate();
//     const { pathname } = useLocation();
//     const sellerMode = pathname.indexOf("/dealer") >= 0;
//     const orderList = useSelector((state) => state.orderList);
  
//     const { loading, error, orders } = orderList;
//     const orderDelete = useSelector((state) => state.orderDelete);
//     const {
//       loading: loadingDelete,
//       error: errorDelete,
//       success: successDelete,
//     } = orderDelete;
  
//     const statecityhub = localStorage.getItem("state_city_hub");
//     const stateList_myArr = JSON.parse(statecityhub);
//     const stateList = stateList_myArr.state;
//     const cityList = stateList_myArr.city;
//     const hubList = stateList_myArr.hub;
  
//     const [selectfromdate, setSelectFromDate] = useState("");
//     const [selecttodate, setSelectToDate] = useState("");
//     const [selectedState, setSelectedState] = React.useState([]);
//     const [selectedCity, setSelectedCity] = React.useState([]);
//     const [selectedHub, setSelectedHub] = React.useState([]);
//     const [paystatus, setPaystatus] = React.useState("");
//     const [schemestatus, setSchemestatus] = React.useState("");
//     const [mobile, setMoble] = useState("");
//     const [orderChangeStatus, setOrderChangeStatus] = React.useState("");
//     const [orderCreatedBY, setOrderCreatedBY] = React.useState([]);
//     const [utm, setUTM] = React.useState([]);
//     const [payby, setpayby] = React.useState([]);
  
//     const availableCity = cityList.filter((c) => c.state_id == selectedState);
//     const availableHub = hubList.filter((c) => c.city_id == selectedCity);
//     const [searchText, setSearchText] = React.useState("");
  
//     const userSignin = useSelector((state) => state.userSignin);
//     const { userInfo } = userSignin;
//     // console.log(userInfo)
//     const isDealer = userInfo?.isSeller ? "Y" : "N";
//     const isAdmin = userInfo?.isAdmin ? "Y" : "N";
//     const isFinanceTeam = userInfo?.isFinanceTeam ? "Y" : "N";
  
//     const dateConverter = (startDate) => {
//       // console.log("startDate "+startDate)
  
//       // const createdate=moment(new Date(startDate)).format("MM-DD-YYYY")
  
//       const createdate = startDate.split(" ")[0];
//       // console.log("createdate "+createdate)
//       const [day, month, year] = createdate.split("-");
  
//       const newEndDate = month + "-" + day + "-" + year;
//       const newStartDate = moment().format("MM-DD-YYYY");
  
//       // console.log(newStartDate)
//       // console.log(newEndDate)
  
//       let result = moment(newStartDate).diff(newEndDate, "days");
//       return result;
//     };
//     const dispatch = useDispatch();
  
//     useEffect(() => {
//       const user_type = userInfo?.isSeller ? "Y" : "N";
//       /*
//       user_type?
//       dispatch(listOrders(userInfo.id,mobile,selectfromdate,selecttodate,selectedState,selectedCity,selectedHub,paystatus,user_type,isDealer,isAdmin,orderChangeStatus,orderCreatedBY))
     
//      :
//         dispatch(listOrders(userInfo.id,mobile,selectfromdate,selecttodate,selectedState,selectedCity,selectedHub,paystatus,user_type,isDealer,isAdmin,orderChangeStatus,orderCreatedBY))
//      ;*/
//     }, [successDelete, userInfo.id]);
  
//     const deleteHandler = (order) => {
//       if (window.confirm("Are you sure to delete?")) {
//         dispatch(deleteOrder(order.order_id));
//       }
//     };
  
//     const search = () => {
//       const user_type = userInfo?.isSeller ? "Y" : "N";
  
//       user_type
//         ? dispatch(
//             listOrders(
//               userInfo.id,
//               userInfo.mobile,
//               selectfromdate,
//               selecttodate,
//               selectedState,
//               selectedCity,
//               selectedHub,
//               paystatus,
//               schemestatus,
//               user_type,
//               isDealer,
//               isAdmin,
//               isFinanceTeam,
//               orderChangeStatus,
//               orderCreatedBY,
//               searchText,
//               utm,
//               payby,
//             ),
//           )
//         : dispatch(
//             listOrders(
//               userInfo.id,
//               userInfo.mobile,
//               selectfromdate,
//               selecttodate,
//               selectedState,
//               selectedCity,
//               selectedHub,
//               paystatus,
//               schemestatus,
//               user_type,
//               isDealer,
//               isAdmin,
//               isFinanceTeam,
//               orderChangeStatus,
//               orderCreatedBY,
//               searchText,
//               utm,
//               payby,
//             ),
//           );
//       // dispatch(listOrders(userInfo.id,selectfromdate,selecttodate,selectedState,selectedCity,selectedHub,user_type));
//     };
//     // console.log(orders);
  
//     {
//       /*  */
//     }
//     const table_data = orders?.data?.map((order, key) => {
//       let display_cancel = true;
//       let display_receipt_cancel = false;
  
//       if (order?.order_status == "Cancel") {
//         display_receipt_cancel = true;
//       }
//       if (
//         order?.order_status == "Cancel" ||
//         order?.order_status == "Delivered" ||
//         order?.order_status == "delivered" ||
//         order?.order_status == "Sold"
//       ) {
//         display_cancel = false;
//       }
//       if (order?.isPaid == 0) {
//         display_cancel = false;
//       }
//       if (order?.razorpay_payment_id == "cash") {
//         // display_cancel=false;
//       }
//       let validDate = false;
//       let days = dateConverter(order?.createdAt);
//       //  console.log("days "+days);
//       if (isAdmin == "Y") {
//         validDate = true;
//       }
//       //   if(isDealer == 'Y'){
//       //     validDate = true;
//       //   }
//       if (days < 30 && days >= 0) {
//         validDate = true;
//         // console.log(validDate)
//       }
//       if (days == 0) {
//         validDate = true;
//         // console.log(validDate)
//       }
  
//       ////////////////
  
//       // console.log("days "+dateConverter(order?.createdAt));
  
//       ////////////////////////////////
  
//       return {
//         ID: key + 1,
//         "BOOKING ID": order?.isPaid == 0 ? "Lead" : order?.booking_id,
//         " REVOLT PURCHASE PLAN": order?.plan_type,
//         // "State" :  order?.state_name,
//         //"City" :  order?.city_name,
//         Hub: order?.area_name,
//         Name: order?.customer_name,
//         // "Email" :  order?.email,
//         Mobile: order?.mobile,
//         Payment: order?.paymentMethod == "cash" ? "Cash" : "Online",
//         Product: order?.product,
//         Model: order?.item_name,
//         Color: order?.bike_color,
//         "Created By": order?.created_by,
//         // "Booking Amount" :  order?.booking_amount ,
//         // "Delivery Batch" :  order?.delivery_batch,
//         // "Payment Id" :  order?.razorpay_payment_id,
//         Paid: order?.isPaid ? "Paid" : "Not Paid",
//         "Scheme Status": order?.schemeStatus,
//         Status: order.order_status == "Created" ? "Active" : order?.order_status,
//         //"Sub Status" :  order.order_sub_status=="" ? 'Not Set' : order?.order_sub_status ,
//         Date: order?.createdAt,
//         cancel_date: order?.cancel_date,
//         refund_date: order?.refund_id != "" ? order?.refund_date : "",
//         sales_date: order?.sales_date,
  
//         Detail: (
//           <button
//             type="button"
//             className="sl-btn sb-btn"
//             onClick={() => {
//               if (userInfo && userInfo?.isSeller) {
//                 navigate(`/orderdetail/dealer/${order.order_id}`);
//               } else {
//                 navigate(`/orderdetail/${order.order_id}`);
//               }
//             }}
//           >
//             Detail
//           </button>
//         ),
  
//         Cancel:
//           // isFinanceTeam =="N"  &&(
  
//           // isDealer == "N" &&
//           validDate && display_cancel ? (
//             <button
//               type="button"
//               className="sl-btn sb-btn"
//               onClick={() => {
//                 if (userInfo && userInfo?.isSeller) {
//                   navigate(`/cancel-my-revolt/${order.booking_id}`);
//                 } else {
//                   navigate(`/cancelbooking/${order.booking_id}`);
//                 }
//               }}
//             >
//               Cancel
//             </button>
//           ) : display_receipt_cancel ? (
//             <button
//               type="button"
//               className="sl-btn sb-btn"
//               onClick={() => {
//                 navigate(`/thankyoucancel/${order.booking_id}`);
//               }}
//             >
//               Receipt
//             </button>
//           ) : (
//             ""
//           ),
  
//         Updates: (
//           <button
//             type="button"
//             className="sl-btn sb-btn"
//             onClick={() => {
//               navigate(`/booking-updates/${order.booking_ref_id}`);
//             }}
//           >
//             Updates
//           </button>
//         ),
//         // )
//       };
//     });
  
//     const table_meta = {
//       columns: [
//         {
//           label: "ID",
//           field: "ID",
//           sort: "asc",
//           width: 5,
//         },
//         {
//           label: "BOOKING ID",
//           field: "BOOKING ID",
//           sort: "asc",
//           width: 100,
//         },
//         {
//           label: " REVOLT PURCHASE PLAN",
//           field: " REVOLT PURCHASE PLAN",
//           sort: "asc",
//           width: 100,
//         },
//         // {
//         //   label: 'State',
//         //   field: 'State',
//         //   sort: 'asc',
//         //   width: 100
//         // },
//         /* {
//           label: 'City',
//           field: 'City',
//           sort: 'asc',
//           width: 100
//         },*/
//         {
//           label: "Hub",
//           field: "Hub",
//           sort: "asc",
//           width: 100,
//         },
  
//         {
//           label: "Name",
//           field: "Name",
//           sort: "asc",
//           width: 100,
//         },
//         // {
//         //   label: 'Email',
//         //   field: 'Email',
//         //   sort: 'asc',
//         //   width: 100
//         // },
//         {
//           label: "Mobile",
//           field: "Mobile",
//           sort: "asc",
//           width: 100,
//         },
//         // {
//         //   label: 'Product',
//         //   field: 'Product',
//         //   sort: 'asc',
//         //   width: 100
//         // },
//         {
//           label: "Model",
//           field: "Model",
//           sort: "asc",
//           width: 90,
//         },
//         {
//           label: "Color",
//           field: "Color",
//           sort: "asc",
//           width: 100,
//         },
//         {
//           label: "Payment",
//           field: "Payment",
//           sort: "asc",
//           width: 100,
//         },
//         // {
//         //   label: 'Booking Amount',
//         //   field: 'Booking Amount',
//         //   sort: 'asc',
//         //   width: 100
//         // },
//         // {
//         //   label: 'Delivery Batch',
//         //   field: 'Delivery Batch',
//         //   sort: 'asc',
//         //   width: 100
//         // },
//         // {
//         //   label: 'Payment Id',
//         //   field: 'Payment Id',
//         //   sort: 'asc',
//         //   width: 100
//         // },
//         {
//           label: "Created By",
//           field: "Created By",
//           sort: "asc",
//           width: 100,
//         },
//         // {
//         //   label: 'Paid',
//         //   field: 'Paid',
//         //   sort: 'asc',
//         //   width: 100
//         // },
//         {
//           label: "Status",
//           field: "Status",
//           sort: "asc",
//           width: 100,
//         },
//         {
//           label: "Scheme Status",
//           field: "Scheme Status",
//           sort: "asc",
//           width: 100,
//         },
//         /*{
//           label: 'Sub Status',
//           field: 'Sub Status',
//           sort: 'asc',
//           width: 100
//         },*/
//         {
//           label: "Booking Date",
//           field: "Date",
//           sort: "asc",
//           width: 100,
//         },
//         {
//           label: "Cancel Date",
//           field: "cancel_date",
//           sort: "asc",
//           width: 100,
//         },
//         {
//           label: "Refund Date",
//           field: "refund_date",
//           sort: "asc",
//           width: 100,
//         },
//         {
//           label: "Sale Date",
//           field: "sales_date",
//           sort: "asc",
//           width: 100,
//         },
//         {
//           label: "Detail",
//           field: "Detail",
//         },
//         {
//           label: "Cancel",
//           field: "Cancel",
//         },
//         {
//           label: "Updates",
//           field: "Updates",
//           width: 100,
//         },
//       ],
//       rows: table_data,
//     };
//     //  console.log(table_data);
  
//     const report_data = orders?.data?.map((order, key) => {
//       // console.log(order?.url)
//       const url_utm = order?.url.split("?");
//       console.log("order list data is", order.schemeStatus);
//       // console.log(url_utm[1])
//       return {
//         ID: key + 1,
//         "Booking Id": order?.isPaid == 0 ? "Lead" : order?.booking_id,
//         "Revolt Purchase Plan": order?.plan_type,
//         State: order?.state_name,
//         City: order?.city_name,
//         Hub: order?.area_name,
//         Name: order?.customer_name,
//         Email: order?.email,
//         Mobile: order?.mobile,
//         Pincode: order?.pincode,
//         UTM: url_utm[1],
//         Payment: order?.razorpay_payment_id == "cash" ? "Cash" : "Online",
//         Product: order?.product,
//         Model: order?.item_name,
//         Color: order?.bike_color,
//         "Created By": order?.created_by,
//         "Booking Amount": order?.isPaid == 0 ? 0 : order?.booking_amount,
//         "Scheme Status": order?.schemeStatus,
//         //"Delivery Batch" :  order?.delivery_batch,
//         //"Paid" :  order?.isPaid ? 'Paid' : 'Not Paid',
//         Status: order.order_status == "Created" ? "Active" : order?.order_status,
//         "Sub Status":
//           order.order_sub_status == "" ? "Not Selected" : order?.order_sub_status,
//         order_id: order.razorpay_order_id,
//         "Payment Id": order?.razorpay_payment_id,
//         "Booking Date": order?.createdAt,
//         "Refund id": order.refund_id,
//         "Refund Date": order.refund_id ? order?.refund_date : "",
//         "Sales Date": order?.sales_date,
//         "Cancel Date": order?.cancel_date,
//         "Reason Type": order?.reason_type,
//         "Cancellation Reason": order?.reason_query,
//       };
//     });
  
//     return (
//       <div className="light-grey full-view padding-top-100 padding-bottom-100">
//         <div className="container-fluid">
//           <div className="row">
//             <div className="col-12">
//               <div className="box-table-panel">
//                 <div className="top-profile">
//                   <div className="row align-items-center">
//                     <div className="col-6">
//                       <h3 className="tab-title">Bookings</h3>
//                     </div>
//                     <div className="col-6 text-end">
//                       {report_data && (
//                         <CSVLink
//                           data={report_data}
//                           filename="Bookings"
//                           className="sl-btn"
//                         >
//                           Download CSV
//                         </CSVLink>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//                 <div className="common-section">
//                   <div className="dealer_search form-default">
//                     {(!userInfo?.isSeller ||
//                       userInfo?.isAdmin ||
//                       userInfo?.isFinanceTeam) && (
//                       <>
//                         <select
//                           id="state"
//                           className="form-control"
//                           placeholder="Select State"
//                           required
//                           value={selectedState}
//                           onChange={(e) => setSelectedState(e.target.value)}
//                         >
//                           <option value="">State</option>
//                           {stateList.map((value, key) => {
//                             return (
//                               <option value={value.state_id} key={key}>
//                                 {value.state_name}
//                               </option>
//                             );
//                           })}
//                         </select>
  
//                         <select
//                           id="city"
//                           className="form-control"
//                           placeholder="City"
//                           value={selectedCity}
//                           onChange={(e) => setSelectedCity(e.target.value)}
//                           required
//                         >
//                           <option value="">City</option>
//                           {availableCity.map((e, key) => {
//                             return (
//                               <option value={e.city_id} key={key}>
//                                 {e.city_name}
//                               </option>
//                             );
//                           })}
//                         </select>
  
//                         <select
//                           id="area"
//                           placeholder="Dealer Hub"
//                           className="form-control"
//                           required
//                           value={selectedHub}
//                           onChange={(e) => setSelectedHub(e.target.value)}
//                         >
//                           <option value="">Revolt Hub</option>
//                           {availableHub.map((e, key) => {
//                             return (
//                               <option value={e.hub_id} key={key}>
//                                 {e.hub_name}
//                               </option>
//                             );
//                           })}
//                         </select>
//                       </>
//                     )}
//                     <select
//                       id="status"
//                       placeholder="status"
//                       className="form-control"
//                       value={paystatus}
//                       onChange={(e) => setPaystatus(e.target.value)}
//                     >
//                       <option value="">Status</option>
//                       <option value="Created">Active</option>
//                       <option value="Cancel">Cancel</option>
//                       {isFinanceTeam == "N" && (
//                         <>
//                           <option value="Unpaid">Unpaid</option>
//                         </>
//                       )}
//                       <option value="Delivered">Delivered</option>
//                     </select>
//                     <select
//                       id="scheme-status"
//                       placeholder="Scheme Status"
//                       className="form-control"
//                       value={schemestatus}
//                       onChange={(e) => setSchemestatus(e.target.value)}
//                     >
//                       <option value="">Scheme Status</option>
//                       <option value="Pending Approval">Pending Approval</option>
//                       <option value="Rejected">Rejected</option>
//                       <option value="Approved">Approved</option>
//                     </select>
  
//                     <select
//                       id="ordeChangeStatus"
//                       placeholder="Reason Type"
//                       className="form-control"
//                       required
//                       value={orderChangeStatus}
//                       onChange={(e) => setOrderChangeStatus(e.target.value)}
//                     >
//                       <option value="">Model</option>
//                       <option value="RV300">RV300</option>
//                       <option value="RV400">RV400</option>
//                       <option value="RV400BRZ">RV400BRZ</option>
//                     </select>
  
//                     {/* <select id="ordeChangeStatus"
//                                   placeholder="Reason Type"
//                                   className="form-control"
//                                   required
//                                   value={orderChangeStatus}
//                                   onChange={(e) => setOrderChangeStatus(e.target.value)} >
//                                   <option value="">Sub Status</option>
                                
//                                   <option value='Postponed due to Finance Unavailability' >
//                                   Postponed due to Finance Unavailability
//                                   </option>
//                                   <option value='Waiting for Auspicious Festive Date' >
//                                   Waiting for Auspicious Festive Date
//                                   </option>
//                                   <option value='Increase in Price' >
//                                   Increase in Price
//                                   </option>
//                                   <option value='Color Unavailability' >
//                                   Color Unavailability
//                                   </option>
//                                   <option value='Decision Postponed due to personal family reasons' >
//                                   Decision Postponed due to personal family reasons
//                                   </option>
//                                   <option value='Address Credentials unavailable' >
//                                   Address Credentials unavailable
//                                   </option>
//                                   <option value='Product Feedback' >
//                                   Product Feedback 
//                                   </option>
//                               </select> */}
  
//                     <select
//                       id="orderCreatedBY"
//                       placeholder="Creted By"
//                       className="form-control"
//                       required
//                       value={orderCreatedBY}
//                       onChange={(e) => setOrderCreatedBY(e.target.value)}
//                     >
//                       <option value="">Select CreatedBy</option>
  
//                       <option value="customer">Customer</option>
//                       <option value="dealer">Dealer</option>
//                     </select>
//                     <select
//                       id="utm"
//                       placeholder="Booking Source"
//                       className="form-control"
//                       required
//                       value={utm}
//                       onChange={(e) => setUTM(e.target.value)}
//                     >
//                       <option value="">Select Booking Source</option>
  
//                       <option value="">All</option>
//                       <option value="utm">utm</option>
//                     </select>
//                     <select
//                       id="payby"
//                       placeholder="Booking Source"
//                       className="form-control"
//                       required
//                       value={payby}
//                       onChange={(e) => setpayby(e.target.value)}
//                     >
//                       <option value="">Select Payment Method</option>
  
//                       <option value="">All</option>
//                       <option value="cash">Cash</option>
//                       <option value="online">Online</option>
//                     </select>
//                     <input
//                       type="date"
//                       id="fromdate"
//                       className="form-control inputfield"
//                       placeholder="from booking Date"
//                       required
//                       onChange={(e) => setSelectFromDate(e.target.value)}
//                     ></input>
  
//                     <input
//                       type="date"
//                       id="todate"
//                       // min={disableDates()}
  
//                       min={selectfromdate}
//                       className="form-control inputfield"
//                       placeholder="Booking TO Date"
//                       required
//                       // onChange={(e) => setSelectTestDate(e.target.value)}
//                       onChange={(e) => setSelectToDate(e.target.value)}
//                     ></input>
  
//                     <input
//                       type="text"
//                       id="searchText"
//                       // min={disableDates()}
  
//                       min={searchText}
//                       className="form-control inputfield"
//                       placeholder="Find"
//                       onChange={(e) => setSearchText(e.target.value)}
//                     ></input>
  
//                     <button id="submit" onClick={search}>
//                       Search
//                     </button>
//                   </div>
  
//                   <div
//                     className="table-sectiondata booking-table form-default "
//                     style={{ overflowX: "auto" }}
//                   >
//                     {loadingDelete && <LoadingBox></LoadingBox>}
//                     {errorDelete && (
//                       <MessageBox variant="danger">{errorDelete}</MessageBox>
//                     )}
//                     {loading ? (
//                       <LoadingBox></LoadingBox>
//                     ) : error ? (
//                       <MessageBox variant="danger">{error}</MessageBox>
//                     ) : (
//                       <>
//                         {orders?.data?.length > 0 && (
//                           <b>Total Records: {orders?.data?.length}</b>
//                         )}
//                         <MDBDataTable
//                           striped
//                           bordered
//                           small
//                           data={table_meta}
//                           className="admin_table"
//                         />
//                       </>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
// }

// export default BookingHistoryScreen