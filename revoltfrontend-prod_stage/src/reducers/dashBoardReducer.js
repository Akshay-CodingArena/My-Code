// import {
//   BATTERY_RECHARGE_HISTORY_REQUEST,
//   BATTERY_RECHARGE_HISTORY_SUCCESS,
//   BATTERY_RECHARGE_HISTORY_FAIL,
// } from '../constants/dashBoardRFPL';

// export const batteryRechargeHistoryReducer = (state = { history: [] }, action) => {
//   switch (action.type) {
//       case BATTERY_RECHARGE_HISTORY_REQUEST:
//           return { loading: true, history: [] };
//       case BATTERY_RECHARGE_HISTORY_SUCCESS:
//           return { loading: false, history: action.payload.data };
//       case BATTERY_RECHARGE_HISTORY_FAIL:
//           return { loading: false, error: action.payload };
//       default:
//           return state;
//   }
// };
