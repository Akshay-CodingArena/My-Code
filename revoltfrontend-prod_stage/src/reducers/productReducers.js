const {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_RESET,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_RESET,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_RESET,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_RESET,
  PRODUCT_CATEGORY_LIST_REQUEST,
  PRODUCT_CATEGORY_LIST_SUCCESS,
  PRODUCT_CATEGORY_LIST_FAIL,
  STATE_CITY_HUB_REQUEST,
  STATE_CITY_HUB_SUCCESS,
  STATE_CITY_HUB_FAIL,
  STATE_CITY_HUB_UPGRADE_REQUEST,
  STATE_CITY_HUB_UPGRADE_SUCCESS,
  STATE_CITY_HUB_UPGRADE_FAIL,
  STATE_CITY_HUB_SC_REQUEST,
  STATE_CITY_HUB_SC_SUCCESS,
  STATE_CITY_HUB_SC_FAIL,
  PRODUCT_REVIEW_CREATE_REQUEST,
  PRODUCT_REVIEW_CREATE_SUCCESS,
  PRODUCT_REVIEW_CREATE_FAIL,
  PRODUCT_REVIEW_CREATE_RESET,
  BOOKING_LEAD_LSQ_SUCCESS,
  BOOKING_LEAD_LSQ_FAILED,
  ALL_PRODUCT_DETAILS_REQUEST,
  ALL_PRODUCT_DETAILS_SUCCESS,
  ALL_PRODUCT_DETAILS_FAIL,
} = require("../constants/productConstants");

export const productListReducer = (
  state = { loading: true, products: [] },
  action,
) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true };
    case PRODUCT_LIST_SUCCESS:
      return {
        loading: false,
        products: action.payload,
        pages: action.payload.pages,
        page: action.payload.page,
      };
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
  //action.payload.products,
};

export const StateCityHubReducer = (
  state = { loading: true, products: [] },
  action,
) => {
  switch (action.type) {
    case STATE_CITY_HUB_REQUEST:
      return { loading: true };
    case STATE_CITY_HUB_SUCCESS:
      return { loading: false, state_city_hub: { ...action.payload } };
    case STATE_CITY_HUB_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const StateCityHubReducer_upgrade = (
  state = { loading: true, products: [] },
  action,
) => {
  switch (action.type) {
    case STATE_CITY_HUB_UPGRADE_REQUEST:
      return { loading: true };
    case STATE_CITY_HUB_UPGRADE_SUCCESS:
      return { loading: false, state_city_hub_upgrade: { ...action.payload } };
    case STATE_CITY_HUB_UPGRADE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const StateCityHubReducer_SC = (
  state = { loading: true, products: [] },
  action,
) => {
  switch (action.type) {
    case STATE_CITY_HUB_SC_REQUEST:
      return { loading: true };
    case STATE_CITY_HUB_SC_SUCCESS:
      return { loading: false, state_city_hub_SC: action.payload };
    case STATE_CITY_HUB_SC_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const productCategoryListReducer = (
  state = { loading: true, products: [] },
  action,
) => {
  switch (action.type) {
    case PRODUCT_CATEGORY_LIST_REQUEST:
      return { loading: true };
    case PRODUCT_CATEGORY_LIST_SUCCESS:
      return { loading: false, categories: action.payload };
    case PRODUCT_CATEGORY_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productDetailsReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { loading: true };
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload };
    case PRODUCT_DETAILS_RESET:
      return {};
    case PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case BOOKING_LEAD_LSQ_SUCCESS:
      return { loading: false, proceedNext: true };
    case BOOKING_LEAD_LSQ_FAILED:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const allProductsReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case ALL_PRODUCT_DETAILS_REQUEST:
      return { loading: true };
    case ALL_PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload };
    case ALL_PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action };
    default:
      return state;
  }
};

export const productCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REQUEST:
      return { loading: true };
    case PRODUCT_CREATE_SUCCESS:
      return { loading: false, success: true, product: action.payload };
    case PRODUCT_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_CREATE_RESET:
      return {};
    default:
      return state;
  }
};
export const productUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_UPDATE_REQUEST:
      return { loading: true };
    case PRODUCT_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case PRODUCT_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};
export const productDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST:
      return { loading: true };
    case PRODUCT_DELETE_SUCCESS:
      return { loading: false, success: true };
    case PRODUCT_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_DELETE_RESET:
      return {};
    default:
      return state;
  }
};

export const productReviewCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_REVIEW_CREATE_REQUEST:
      return { loading: true };
    case PRODUCT_REVIEW_CREATE_SUCCESS:
      return { loading: false, success: true, review: action.payload };
    case PRODUCT_REVIEW_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_REVIEW_CREATE_RESET:
      return {};
    default:
      return state;
  }
};
