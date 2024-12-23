// import axios from 'axios';
// import {
//     BATTERY_RECHARGE_HISTORY_REQUEST,
//     BATTERY_RECHARGE_HISTORY_SUCCESS,
//     BATTERY_RECHARGE_HISTORY_FAIL,
// } from '../constants/dashBoardRFPL';

// export const getBatteryRechargeHistory = (chassisNumber) => async (dispatch) => {

//     console.log("Fetching ", chassisNumber);

//     dispatch({ type: BATTERY_RECHARGE_HISTORY_REQUEST });

//     try {
//         console.log("Sending GET request to API...");
//         const { data } = await axios.get(`https://apix.revoltmotors.com/baas/batteryRechargeHistory/${chassisNumber}`);
//         console.log("API Response:", data);

//         dispatch({ type: BATTERY_RECHARGE_HISTORY_SUCCESS, payload: data });
//     } catch (error) {

//         dispatch({
//             type: BATTERY_RECHARGE_HISTORY_FAIL,
//             payload: error.response && error.response.data.message
//                 ? error.response.data.message
//                 : error.message,
//         });
//     }
// };

// export const addBassUser = (userData) => async (dispatch) => {

//   try {
//     const response = await axios.post('https://apix.revoltmotors.com/baas/addBassUser', userData);
//     console.log("User added successfully:", response.data);
//   } catch (error) {
//     console.error("Error adding user:", error);
//     throw error;
//   }
// };
