import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_RESET,
  ORDER_CREATE_SUCCESS,
  ORDER_UPGRADE_FAIL,
  ORDER_UPGRADE_REQUEST,
  ORDER_UPGRADE_RESET,
  ORDER_UPGRADE_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_RESET,
  UPGRADE_ORDER_DETAILS_FAIL,
  UPGRADE_ORDER_DETAILS_RESET,
  UPGRADE_ORDER_DETAILS_REQUEST,
  UPGRADE_ORDER_DETAILS_SUCCESS,
  ADMIN_ORDER_DETAILS_FAIL,
  ADMIN_ORDER_DETAILS_REQUEST,
  ADMIN_ORDER_DETAILS_SUCCESS,
  ADMIN_UPGRADE_ORDER_DETAILS_FAIL,
  ADMIN_UPGRADE_ORDER_DETAILS_REQUEST,
  ADMIN_UPGRADE_ORDER_DETAILS_SUCCESS,
  ORDER_MINE_LIST_FAIL,
  ORDER_MINE_LIST_REQUEST,
  ORDER_MINE_LIST_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_RESET,
  ORDER_PAY_SUCCESS,
  UPGRADE_ORDER_PAY_FAIL,
  UPGRADE_ORDER_PAY_REQUEST,
  UPGRADE_ORDER_PAY_RESET,
  UPGRADE_ORDER_PAY_SUCCESS,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL,
  UPGRADE_ORDER_LIST_REQUEST,
  UPGRADE_ORDER_LIST_SUCCESS,
  UPGRADE_ORDER_LIST_FAIL,
  NOTIFY_LIST_REQUEST,
  NOTIFY_LIST_SUCCESS,
  NOTIFY_LIST_FAIL,
  TESTRIDE_LIST_REQUEST,
  TESTRIDE_LIST_SUCCESS,
  TESTRIDE_LIST_FAIL,
  ADMIN_TESTRIDE_DETAILS_FAIL,
  ADMIN_TESTRIDE_DETAILS_REQUEST,
  ADMIN_TESTRIDE_DETAILS_SUCCESS,
  ORDER_DELETE_REQUEST,
  ORDER_DELETE_SUCCESS,
  ORDER_DELETE_FAIL,
  ORDER_DELETE_RESET,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_SUCCESS,
  ORDER_DELIVER_FAIL,
  ORDER_DELIVER_RESET,
  ORDER_SUMMARY_REQUEST,
  ORDER_SUMMARY_SUCCESS,
  ORDER_SUMMARY_FAIL,
  CONTACT_LIST_REQUEST,
  CONTACT_LIST_SUCCESS,
  CONTACT_LIST_FAIL,
} from "../constants/orderConstants";

export const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return { loading: true };
    case ORDER_CREATE_SUCCESS:
      return { loading: false, success: true, order: action.payload };
    case ORDER_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const orderDetailsReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return { loading: true };
    case ORDER_DETAILS_SUCCESS:
      return { loading: false, order: action.payload };
    case ORDER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_DETAILS_RESET:
      return { loading: false, order: {} };
    default:
      return state;
  }
};

export const upgradeorderDetailsReducer = (
  state = { loading: true },
  action,
) => {
  switch (action.type) {
    case UPGRADE_ORDER_DETAILS_REQUEST:
      return { loading: true };
    case UPGRADE_ORDER_DETAILS_SUCCESS:
      return { loading: false, order: action.payload };
    case UPGRADE_ORDER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case UPGRADE_ORDER_DETAILS_RESET:
      return { loading: false, order: {} };
    default:
      return state;
  }
};
export const adminorderDetailsReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case ADMIN_ORDER_DETAILS_REQUEST:
      return { loading: true };
    case ADMIN_ORDER_DETAILS_SUCCESS:
      return { loading: false, order: action.payload };
    case ADMIN_ORDER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const adminUpgradeorderDetailsReducer = (
  state = { loading: true },
  action,
) => {
  switch (action.type) {
    case ADMIN_UPGRADE_ORDER_DETAILS_REQUEST:
      return { loading: true };
    case ADMIN_UPGRADE_ORDER_DETAILS_SUCCESS:
      return { loading: false, order: action.payload };
    case ADMIN_UPGRADE_ORDER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const orderUpgradeReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_UPGRADE_REQUEST:
      return { loading: true };
    case ORDER_UPGRADE_SUCCESS:
      return { loading: false, success: true, order: action.payload };
    case ORDER_UPGRADE_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_UPGRADE_RESET:
      return {};
    default:
      return state;
  }
};
export const upgradeorderPayReducer = (state = {}, action) => {
  switch (action.type) {
    case UPGRADE_ORDER_PAY_REQUEST:
      return { loading: true };
    case UPGRADE_ORDER_PAY_SUCCESS:
      return { loading: false, success: true };
    case UPGRADE_ORDER_PAY_FAIL:
      return { loading: false, error: action.payload };
    case UPGRADE_ORDER_PAY_RESET:
      return {};
    default:
      return state;
  }
};
export const orderPayReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_PAY_REQUEST:
      return { loading: true };
    case ORDER_PAY_SUCCESS:
      return { loading: false, success: true };
    case ORDER_PAY_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_PAY_RESET:
      return {};
    default:
      return state;
  }
};
export const orderMineListReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_MINE_LIST_REQUEST:
      return { loading: true };
    case ORDER_MINE_LIST_SUCCESS:
      return { loading: false, orders: action.payload };
    case ORDER_MINE_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const adminTestrideDetailReducer = (
  state = { loading: true },
  action,
) => {
  switch (action.type) {
    case ADMIN_TESTRIDE_DETAILS_REQUEST:
      return { loading: true };
    case ADMIN_TESTRIDE_DETAILS_SUCCESS:
      return { loading: false, order: action.payload };
    case ADMIN_TESTRIDE_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const contactListReducer = (state = { contact_list: [] }, action) => {
  switch (action.type) {
    case CONTACT_LIST_REQUEST:
      return { loading: true };
    case CONTACT_LIST_SUCCESS:
      return { loading: false, contact_list: action.payload };
    case CONTACT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const notifyListReducer = (state = { notifys: [] }, action) => {
  switch (action.type) {
    case NOTIFY_LIST_REQUEST:
      return { loading: true };
    case NOTIFY_LIST_SUCCESS:
      return { loading: false, notifys: action.payload };
    case NOTIFY_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const testrideListReducer = (state = { testrides: [] }, action) => {
  switch (action.type) {
    case TESTRIDE_LIST_REQUEST:
      return { loading: true };
    case TESTRIDE_LIST_SUCCESS:
      return { loading: false, testrides: action.payload };
    case TESTRIDE_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const upgradeorderListReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case UPGRADE_ORDER_LIST_REQUEST:
      return { loading: true };
    case UPGRADE_ORDER_LIST_SUCCESS:
      return { loading: false, orders: action.payload };
    case UPGRADE_ORDER_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const orderListReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_LIST_REQUEST:
      return { loading: true };
    case ORDER_LIST_SUCCESS:
      return { loading: false, orders: action.payload };
    case ORDER_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const orderDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_DELETE_REQUEST:
      return { loading: true };
    case ORDER_DELETE_SUCCESS:
      return { loading: false, success: true };
    case ORDER_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_DELETE_RESET:
      return {};
    default:
      return state;
  }
};

export const orderDeliverReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_DELIVER_REQUEST:
      return { loading: true };
    case ORDER_DELIVER_SUCCESS:
      return { loading: false, success: true };
    case ORDER_DELIVER_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_DELIVER_RESET:
      return {};
    default:
      return state;
  }
};

export const orderSummaryReducer = (
  state = { loading: true, summary: {} },
  action,
) => {
  switch (action.type) {
    case ORDER_SUMMARY_REQUEST:
      return { loading: true };
    case ORDER_SUMMARY_SUCCESS:
      return { loading: false, summary: action.payload };
    case ORDER_SUMMARY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
