import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import {
  bannerFailure,
  bannerPending,
  bannerSuccess,
} from "../../actions/bannerActions";
import { axios } from "../../utilities/axios";

const ApiFetch = (
  url,
  payload = {
    data: "",
    headers: "",
  },
  method,
  callBack,
) => {
  return async (dispatch, state) => {
    console.log("kdslkf", state());
    dispatch(bannerPending());
    console.log("dsfdsfds", state());
    try {
      let res = await axios[method](
        url,
        payload.data,
        payload.headers ?? {
          "Content-Type": "application/json",
        },
      );
      dispatch(bannerSuccess());
      if (callBack) {
        callBack(res);
      }
    } catch (e) {
      dispatch(bannerFailure());
      console.log(e);
      Swal.fire({
        icon: "error",
        title: "Something went wrong",
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          container: "swal-custom",
        },
      });
    }
  };
};

export default ApiFetch;
