import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { booking } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { USER_BOOK_RESET } from "../constants/userConstants";
import { userBookingReducer } from "../reducers/userReducers";
//import Casecading from '../components/state_city';
//import CascadingDropdown from '../components/Cascading';
import OtpTimer from "otp-timer";
import Axios from "axios";
import { URL_API, ROOT_PATH } from "../constants/cartConstants";
import $ from "jquery";
import MetaTags from "react-meta-tags";

export default function BookingcloseScreen(props) {
  return (
    <div className="test-ride-page padding-top-100 padding-bottom-100">
      <div className="container text-center">
        <div className="col-12 text-center">
          <h2 className="fs-title text-center">
            <b>Sit tight, we’ll be right back!</b>
          </h2>
          <p>
            Thank you for showing your interest in Revolt. We will soon be
            opening bookings for RV400.
          </p>
          <p> Kindly go to Notify me for updates.</p>
        </div>
      </div>
    </div>
  );
}
