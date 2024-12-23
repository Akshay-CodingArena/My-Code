import axios from "axios";
import Swal from "sweetalert2";
import "../AdminBanner/swal.css";
import {
  fetchFeedbackRequest,
  fetchFeedbackSuccess,
  fetchFeedbackFailure,
} from "../../actions/FeedbackActions";

export const fetchFeedback =
  (
    pageNumber = 0,
    count = 10,
    startDate = "",
    endDate = "",
    rating = "",
    mobile = "",
    chassisNumber = "",
  ) =>
  async (dispatch) => {
    const URL_FEEDBACK = process.env.REACT_APP_FEEDBACK_HISTORY;

    dispatch(fetchFeedbackRequest());
    try {
      console.log("start date passing is", startDate);
      const response = await axios.get(
        `${URL_FEEDBACK}?isPortal=true&pageNumber=${pageNumber}&count=${count}&startDate=${startDate}&endDate=${endDate}&rating=${rating}&mobile=${mobile}&chassisNumber=${chassisNumber}`,
      );
      console.log("API response:", response.data);
      const { count: totalCount, list } = response.data.data;
      const totalPages = Math.ceil(totalCount / count);
      dispatch(fetchFeedbackSuccess({ data: list, totalPages, totalCount }));
    } catch (error) {
      dispatch(fetchFeedbackFailure(error.message));
      Swal.fire({
        title: "Error!",
        text: "Something went wrong!",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };
