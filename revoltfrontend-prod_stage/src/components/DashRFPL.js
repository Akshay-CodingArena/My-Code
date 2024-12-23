// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import LoadingBox from "../components/LoadingBox";
// import MessageBox from "../components/MessageBox";
// import { CSVLink } from "react-csv";
// import { MDBDataTable } from "mdbreact";
// import { getBatteryRechargeHistory } from "../actions/dashboardActions";

// export default function DashRFPL(props) {
//     const statecityhub = localStorage.getItem("state_city_hub_upgrade");
//     const stateList_myArr = JSON.parse(statecityhub);
//     const stateList = stateList_myArr.state;
//     const cityList = stateList_myArr.city;
//     const hubList = stateList_myArr.hub;
//     const [selectfromdate, setSelectFromDate] = useState("");
//     const [selectedState, setSelectedState] = React.useState([]);
//     const [selectedCity, setSelectedCity] = React.useState([]);
//     const [selectedHub, setSelectedHub] = React.useState([]);

//     const availableCity = cityList.filter((c) => c.state_id == selectedState);
//     const availableHub = hubList.filter((c) => c.city_id == selectedCity);
//     const [searchText, setSearchText] = React.useState("");

//     const userSignin = useSelector((state) => state.userSignin);
//     const { userInfo } = userSignin;
//     const isFinanceTeam = userInfo?.isFinanceTeam ? "Y" : "N";

//     //   ///////////////////////////////////////////// new code ///////////////////////////

//     const chassisNumber = '1111111111';
//     const dispatch = useDispatch();

//     const batteryRechargeHistory = useSelector((state) => state.batteryRechargeHistory);
//     const { loading, error, history } = batteryRechargeHistory;

//     // console.log(history, "history");

//     const table_data = history?.map((record, index) => ({
//         ID: index + 1,
//         'ECU Number': record.ecu_num || 'N/A',
//         'Chassis Number': record.chassis_num || 'N/A',
//         'Battery Serial Number': record.battery_serial_num || 'N/A',
//         'Transaction ID': record.transaction_id || 'N/A',
//         'Transaction Date': record.transaction_date && record.transaction_date !== "0000-00-00 00:00:00"
//             ? new Date(record.transaction_date).toLocaleString()
//             : 'N/A',
//         'Transaction Amount': record.transaction_amount || 0,
//         'Total Transaction Amount': record.tot_transaction_amount || 0,
//         'KM Purchased': record.tot_km_purchased || 0,
//         'Created At': record.created_at ? new Date(record.created_at).toLocaleString() : 'N/A',
//     }));

//     useEffect(() => {
//         dispatch(getBatteryRechargeHistory(chassisNumber));
//     }, [dispatch, chassisNumber]);

//     // Table metadata
//     const table_meta = {
//         columns: [
//             { label: 'ID', field: 'ID', sort: 'asc', width: 50 },
//             { label: 'ECU Number', field: 'ECU Number', sort: 'asc', width: 100 },
//             { label: 'Chassis Number', field: 'Chassis Number', sort: 'asc', width: 150 },
//             { label: 'Battery Serial Number', field: 'Battery Serial Number', sort: 'asc', width: 150 },
//             { label: 'Transaction ID', field: 'Transaction ID', sort: 'asc', width: 100 },
//             { label: 'Transaction Date', field: 'Transaction Date', sort: 'asc', width: 150 },
//             { label: 'Transaction Amount', field: 'Transaction Amount', sort: 'asc', width: 100 },
//             { label: 'Total Transaction Amount', field: 'Total Transaction Amount', sort: 'asc', width: 100 },
//             { label: 'KM Purchased', field: 'KM Purchased', sort: 'asc', width: 100 },
//             { label: 'Created At', field: 'Created At', sort: 'asc', width: 150 },
//         ],
//         rows: table_data || [],
//     };
//     // const [newUser, setNewUser] = useState({
//     //     ecu_num: "",
//     //     chassis_num: "",
//     //     battery_serial_num: "",
//     //     baas_provider_id: "0",
//     //     reg_num: "",
//     // });

//     // const handleInputChange = (e) => {
//     //     const { name, value } = e.target;
//     //     setNewUser({ ...newUser, [name]: value });
//     // };

//     // const search = () => {
//     //   };

//     // const handleAddUser = async () => {
//     //     try {
//     //         await dispatch(addBassUser(newUser));
//     //     } catch (error) {
//     //         console.error("Error adding user:", error);
//     //     }
//     // };

//     // const filteredProviders = providers.data?.filter(provider => {
//     //     return provider.name.toLowerCase().includes(searchText.toLowerCase()) ||
//     //         provider.description.toLowerCase().includes(searchText.toLowerCase());
//     // });

//     // const table_data = providers?.data?.map((provider, key) => ({
//     //     ID: key + 1,
//     //     Name: provider?.name,
//     //     Description: provider?.description,
//     // }));

//     /////////////////////////////////////////////////new code end ////////////////////////////////

//     const search = () => {
//         const user_type = userInfo?.isSeller ? "Y" : "N";

//         // user_type
//         //     ? dispatch(
//         //         upgradelistproviderss(

//         //         ),
//         //     )
//         //     : dispatch(
//         //         upgradelistproviderss(

//         //         ),
//         //     );
//     };
//     // const table_data = providerss?.data?.map((providers, key) => {
//     //     let display_cancel = true;
//     //     let display_receipt_cancel = false;

//     //     if (providers?.providers_status == "Cancel") {
//     //         display_receipt_cancel = true;
//     //     }
//     //     if (
//     //         providers?.providers_status == "Cancel" ||
//     //         providers?.providers_status == "Delivered" ||
//     //         providers?.providers_status == "delivered" ||
//     //         providers?.providers_status == "Sold"
//     //     ) {
//     //         display_cancel = false;
//     //     }
//     //     if (providers?.isPaid == 0) {
//     //         display_cancel = false;
//     //     }

//     //     return {
//     //         ID: key + 1,
//     //         "BOOKING ID": providers?.isPaid == 0 ? "Lead" : providers?.booking_id,
//     //         chassis: providers?.chassis,
//     //         Hub: providers?.area_name,
//     //         Name: providers?.customer_name,
//     //         Mobile: providers?.mobile,
//     //         Paid: providers?.isPaid ? "Paid" : "Not Paid",
//     //         Status: providers.providers_status == "Created" ? "Active" : providers?.providers_status,
//     //         Date: providers?.createdAt,

//     //         Detail: (
//     //             <button
//     //                 type="button"
//     //                 className="sl-btn sb-btn"
//     //                 onClick={() => {
//     //                     if (userInfo && userInfo?.isSeller) {
//     //                         navigate(`/upgradeprovidersdetail/dealer/${providers.providers_id}`);
//     //                     } else {
//     //                         navigate(`/upgradeprovidersdetail/${providers.providers_id}`);
//     //                     }
//     //                 }}
//     //             >
//     //                 Detail
//     //             </button>
//     //         ),
//     //         Cancel:
//     //             isFinanceTeam == "N" &&
//     //             (display_cancel ? (
//     //                 <button
//     //                     type="button"
//     //                     className="sl-btn sb-btn"
//     //                     onClick={() => {
//     //                         if (userInfo && userInfo?.isSeller) {
//     //                             navigate(`/cancel-my-revolt/${providers.booking_id}`);
//     //                         } else {
//     //                             navigate(`/cancelbooking/${providers.booking_id}`);
//     //                         }
//     //                     }}
//     //                 >
//     //                     Cancel
//     //                 </button>
//     //             ) : display_receipt_cancel ? (
//     //                 <button
//     //                     type="button"
//     //                     className="sl-btn sb-btn"
//     //                     onClick={() => {
//     //                         navigate(`/thankyoucancel/${providers.booking_id}`);
//     //                     }}
//     //                 >
//     //                     Receipt
//     //                 </button>
//     //             ) : (
//     //                 ""
//     //             )),
//     //     };
//     // });

//     const report_data = providers?.data?.map((provider, key) => {
//         const url_utm = provider?.utm_url?.split("?");
//         return {
//           ID: key + 1,
//           "Booking Id": history?.isPaid == 0 ? "Lead" : provider?.booking_id,
//           chassis: history?.chassis,
//           State: history?.state_name,
//           City: history?.city_name,
//           Hub: history?.area_name,
//           Name: history?.customer_name,
//           Email: history?.email,
//           Mobile: provider?.mobile,
//           UTM: url_utm[1] || 'N/A',
//           "Booking Amount": provider?.isPaid == 0 ? 0 : provider?.booking_amount,
//           Status: provider?.providers_status === "Created" ? "Active" : provider?.providers_status,
//           providers_id: provider?.razorpay_providers_id,
//           "Payment Id": provider?.razorpay_payment_id,
//           "Booking Date": provider?.createdAt ? new Date(provider.createdAt).toLocaleString() : 'N/A',
//         };
//       });

//     // const report_data = providers?.data?.map((providers, key) => {
//     //     const url_utm = providers?.utm_url.split("?");
//     //     return {
//     //         ID: key + 1,
//     //         "Booking Id": providers?.isPaid == 0 ? "Lead" : providers?.booking_id,
//     //         chassis: providers?.chassis,
//     //         State: providers?.state_name,
//     //         City: providers?.city_name,
//     //         Hub: providers?.area_name,
//     //         Name: providers?.customer_name,
//     //         Email: providers?.email,
//     //         Mobile: providers?.mobile,
//     //         UTM: url_utm[1],
//     //         "Booking Amount": providers?.isPaid == 0 ? 0 : providers?.booking_amount,
//     //         Status: providers.providers_status == "Created" ? "Active" : providers?.providers_status,
//     //         providers_id: providers.razorpay_providers_id,
//     //         "Payment Id": providers?.razorpay_payment_id,
//     //         "Booking Date": providers?.createdAt,
//     //     };
//     // });

//     return (
//         <div className="light-grey full-view padding-top-100 padding-bottom-100">
//             <div className="container-fluid">
//                 <div className="row">
//                     <div className="col-12">
//                         <div className="box-table-panel">
//                             <div className="top-profile">
//                                 <div className="row align-items-center">
//                                     <div className="col-6">
//                                         <h3 className="tab-title">Dashboard</h3>
//                                     </div>
//                                     <div className="col-6 text-end">
//                                         {report_data && (
//                                             <CSVLink
//                                                 data={report_data}
//                                                 filename="Testride"
//                                                 className="sl-btn"
//                                             >
//                                                 Add Details
//                                             </CSVLink>
//                                         )}
//                                     </div>
//                                 </div>
//                             </div>

//                             <div className="common-section">
//                                 <div className="table-sectiondata booking-table form-default">
//                                     {loading ? (
//                                         <LoadingBox></LoadingBox>
//                                     ) : error ? (
//                                         <MessageBox variant="danger">{error}</MessageBox>
//                                     ) : (
//                                         <>
//                                             <div className="dealer_search form-default m-3">
//                                                 {(!userInfo?.isSeller ||
//                                                     userInfo?.isAdmin ||
//                                                     userInfo?.isFinanceTeam) && (
//                                                         <>
//                                                             <select
//                                                                 id="state"
//                                                                 className="form-control"
//                                                                 placeholder="Select State"
//                                                                 required
//                                                                 value={selectedState}
//                                                                 onChange={(e) => setSelectedState(e.target.value)}
//                                                             >
//                                                                 <option value="">State</option>
//                                                                 {stateList.map((value, key) => {
//                                                                     return (
//                                                                         <option value={value.state_id} key={key}>
//                                                                             {value.state_name}
//                                                                         </option>
//                                                                     );
//                                                                 })}
//                                                             </select>
//                                                             <select
//                                                                 id="city"
//                                                                 className="form-control"
//                                                                 placeholder="City"
//                                                                 value={selectedCity}
//                                                                 onChange={(e) => setSelectedCity(e.target.value)}
//                                                                 required
//                                                             >
//                                                                 <option value="">City</option>
//                                                                 {availableCity.map((e, key) => {
//                                                                     return (
//                                                                         <option value={e.city_id} key={key}>
//                                                                             {e.city_name}
//                                                                         </option>
//                                                                     );
//                                                                 })}
//                                                             </select>

//                                                             <select
//                                                                 id="area"
//                                                                 placeholder="Dealer Hub"
//                                                                 className="form-control"
//                                                                 required
//                                                                 value={selectedHub}
//                                                                 onChange={(e) => setSelectedHub(e.target.value)}
//                                                             >
//                                                                 <option value="">Revolt Hub</option>
//                                                                 {availableHub.map((e, key) => {
//                                                                     return (
//                                                                         <option value={e.hub_id} key={key}>
//                                                                             {e.hub_name}
//                                                                         </option>
//                                                                     );
//                                                                 })}
//                                                             </select>
//                                                         </>
//                                                     )}
//                                                 <input
//                                                     type="date"
//                                                     id="fromdate"
//                                                     className="form-control inputfield"
//                                                     placeholder="from booking Date"
//                                                     required
//                                                     onChange={(e) => setSelectFromDate(e.target.value)}
//                                                 ></input>

//                                                 <input
//                                                     type="date"
//                                                     id="todate"
//                                                     min={selectfromdate}
//                                                     className="form-control inputfield"
//                                                     placeholder="Booking TO Date"
//                                                     required
//                                                     onChange={(e) => (e.target.value)}
//                                                 ></input>

//                                                 <input
//                                                     type="text"
//                                                     id="searchText"
//                                                     value={searchText}
//                                                     className="form-control inputfield"
//                                                     placeholder="Find"
//                                                     onChange={(e) => setSearchText(e.target.value)}
//                                                 />
//                                                 <button id="submit" onClick={search}>
//                                                     Search
//                                                 </button>
//                                             </div>
//                                             <MDBDataTable
//                                                 striped
//                                                 bprovidersed
//                                                 small
//                                                 data={table_meta}
//                                                 className="admin_table"
//                                             />
//                                             <div>
//                                                 <input
//                                                     striped
//                                                     bprovidersed
//                                                     small
//                                                     data={table_meta}
//                                                     className="admin_table"
//                                                 />
//                                             </div>
//                                             <button id="button" onClick={history}>
//                                                     button
//                                             </button>

//                                         </>
//                                     )}
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//         </div>
//     );
// }
