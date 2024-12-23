import React, { useEffect, useState } from "react";
import Loader from "../Loader";
import * as style from "./Feedback.module.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchFeedback } from "./apiFeedback";
import Swal from "sweetalert2";
import Modal from "./ModalFeedback";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

function formatDate(dateString) {
  return moment(dateString).format("YYYY-MM-DD");
}
// function formatDate(dateString) {const date = new Date(dateString);
//   return format(date, "yyyy-MM-dd");
// }

const Feedback = () => {
  const dispatch = useDispatch();
  const feedbackState = useSelector((state) => state.feedback);
  const { data, loading, error, totalPages, totalCount } = feedbackState;

  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [ratingFilter, setRatingFilter] = useState("");
  const [mobileFilter, setMobileFilter] = useState("");
  const [chassisFilter, setChassisFilter] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const fetchData = () => {
    dispatch(
      fetchFeedback(
        currentPage - 1,
        10,
        startDate ? formatDate(startDate) : "",
        endDate ? formatDate(endDate) : "",
        ratingFilter,
        mobileFilter,
        chassisFilter,
      ),
    );
    //  }
  };

  useEffect(() => {
    fetchData();
  }, [
    currentPage,
    startDate,
    endDate,
    ratingFilter,
    mobileFilter,
    chassisFilter,
  ]);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleShowDetails = (feedback) => {
    const sortedFeedbacks = [...feedback.feedbacks].sort((a, b) => {
      return new Date(b.created_at) - new Date(a.created_at);
    });
    setSelectedFeedback({ ...feedback, feedbacks: sortedFeedbacks });
  };

  const handleCloseFeedbackModal = () => {
    setSelectedFeedback(null);
  };

  const handleCloseImageModal = () => {
    setSelectedImage(null);
  };

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };
  const handleRatingFilterChange = (e) => {
    setRatingFilter(e.target.value);
  };

  const handleMobileFilterChange = (e) => {
    setMobileFilter(e.target.value);
  };

  const handleChassisFilterChange = (e) => {
    setChassisFilter(e.target.value);
  };
  const handleEllipsisClick = () => {
    setIsExpanded(true);
  };
  const StarRating = ({ rating }) => {
    const maxStars = 5;
    const filledStars = Math.min(rating, maxStars);
    const stars = Array.from({ length: maxStars }, (_, index) => (
      <div
        key={index}
        className={`${style.star} ${index < filledStars ? style.filled : style.empty}`}
      >
        {index < filledStars ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 25 25"
            className={style.starIconFilled}
          >
            <path
              d="M18.25,15.52l1.36,7.92L12.5,19.7,5.39,23.44l1.36-7.92L1,9.92,8.95,8.76l3.55-7.2,3.55,7.2L24,9.92Z"
              style={{ fill: "#232326" }}
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 128 128"
            className={style.starIconHollow}
          >
            <path d="M123.164,50.549a1.748,1.748,0,0,0-1.412-1.191L82.931,43.717,65.569,8.54a1.75,1.75,0,0,0-3.139,0L45.069,43.717,6.249,49.358a1.75,1.75,0,0,0-.97,2.985L33.37,79.726,26.738,118.39a1.75,1.75,0,0,0,2.539,1.845L64,101.98l34.723,18.254a1.75,1.75,0,0,0,2.539-1.845L94.63,79.726l28.092-27.382A1.75,1.75,0,0,0,123.164,50.549ZM91.528,77.862a1.749,1.749,0,0,0-.5,1.549l6.188,36.076-32.4-17.032a1.749,1.749,0,0,0-1.629,0l-32.4,17.032,6.187-36.076a1.749,1.749,0,0,0-.5-1.549L10.261,52.312l36.222-5.263a1.75,1.75,0,0,0,1.318-.958L64,13.269,80.2,46.091a1.751,1.751,0,0,0,1.317.958l36.223,5.263Z" />
          </svg>
        )}
      </div>
    ));

    return <div className={style.starContainer}>{stars}</div>;
  };

  // Filter feedback data based on the search term
  const filteredData = data;

  if (error) {
    Swal.fire({
      title: "Error!",
      text: "something went wrong!",
      icon: "error",
      confirmButtonText: "OK",
    });
  }

  const formatTime = (timeString) => {
    const [datePart, timePart] = timeString.split(" ");
    const [hours, minutes] = timePart.split(":");
    return `${datePart} | ${hours}:${minutes}`;
  };

  return (
    <div className={style.main_feed}>
      {loading ? <Loader /> : null}
      <p>count: {totalCount}</p>

      {/* Search Input */}
      <h3>Search by Multiple Criteria</h3>
      <div className={style.search_container}>
        <div className={style.search}>
          <input
            type="text"
            placeholder="Search by Chassis"
            value={chassisFilter}
            onChange={handleChassisFilterChange}
            className={style.search_input}
          />
          <input
            type="text"
            placeholder="Search by Mobile"
            value={mobileFilter}
            onChange={handleMobileFilterChange}
            className={style.search_input}
          />
          <select
            value={ratingFilter}
            onChange={handleRatingFilterChange}
            className={style.rating_select}
          >
            <option value="" disabled hidden>
              Search by Rating
            </option>
            <option value="1">1 Star</option>
            <option value="2">2 Stars</option>
            <option value="3">3 Stars</option>
            <option value="4">4 Stars</option>
            <option value="5">5 Stars</option>
          </select>
        </div>
        <div className={style.date_picker_container}>
          <h3>Search By Date</h3>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            placeholderText="Start Date"
          />
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            placeholderText="End Date"
          />
          <div
            className={style.reset_search}
            onClick={() => {
              setStartDate("");
              setEndDate("");
              setChassisFilter("");
              setMobileFilter("");
              setRatingFilter("");
            }}
          >
            Reset
          </div>
        </div>
      </div>
      <div className={style.container_feed_table}>
        <table className={style.feed_table}>
          <thead>
            <tr>
              <th>CHASSIS_NUMBER</th>
              <th>NAME</th>
              <th>MOBILE</th>
              <th>FEEDBACKS</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row, index) => (
              <React.Fragment key={index}>
                <tr>
                  <td>{row.chassis_number || "N/A"}</td>
                  <td>{row.name || "No name provided"}</td>
                  <td>{row.mobile || "No mobile number provided"}</td>
                  <td>
                    <button
                      className={style.toggle_button}
                      onClick={() => handleShowDetails(row)}
                    >
                      Show Details
                    </button>
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      <div className={style.pagination}>
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          <img src="/images/icon-arrow-left-f.svg" alt="Previous" />
        </button>

        <span>
          {Array.from({ length: totalPages }, (_, index) => {
            const pageNumber = index + 1;

            // Show all pages if expanded
            if (isExpanded) {
              return (
                <button
                  key={pageNumber}
                  onClick={() => setCurrentPage(pageNumber)}
                  className={currentPage === pageNumber ? style.activePage : ""}
                  disabled={currentPage === pageNumber}
                >
                  {pageNumber}
                </button>
              );
            }

            // Show first 4 pages
            if (pageNumber <= 4) {
              return (
                <button
                  key={pageNumber}
                  onClick={() => setCurrentPage(pageNumber)}
                  className={currentPage === pageNumber ? style.activePage : ""}
                  disabled={currentPage === pageNumber}
                >
                  {pageNumber}
                </button>
              );
            }

            // Show the last 2 pages
            if (pageNumber > totalPages - 2) {
              return (
                <button
                  key={pageNumber}
                  onClick={() => setCurrentPage(pageNumber)}
                  className={currentPage === pageNumber ? style.activePage : ""}
                  disabled={currentPage === pageNumber}
                >
                  {pageNumber}
                </button>
              );
            }

            // Show the current page and pages around it
            if (
              pageNumber >= currentPage - 1 &&
              pageNumber <= currentPage + 1
            ) {
              return (
                <button
                  key={pageNumber}
                  onClick={() => setCurrentPage(pageNumber)}
                  className={currentPage === pageNumber ? style.activePage : ""}
                  disabled={currentPage === pageNumber}
                >
                  {pageNumber}
                </button>
              );
            }

            // Ellipsis before current page range if necessary
            if (pageNumber === 5 && currentPage > 6 && !isExpanded) {
              return (
                <span
                  key={pageNumber}
                  onClick={handleEllipsisClick}
                  style={{ cursor: "pointer" }}
                >
                  ...
                </span>
              );
            }

            // Ellipsis before the last 2 pages if necessary
            if (
              pageNumber === totalPages - 3 &&
              currentPage < totalPages - 4 &&
              !isExpanded
            ) {
              return (
                <span
                  key={pageNumber}
                  onClick={handleEllipsisClick}
                  style={{ cursor: "pointer" }}
                >
                  ...
                </span>
              );
            }

            return null;
          })}
        </span>

        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          <img src="/images/icon-arrow-right-f.svg" alt="Next" />
        </button>
      </div>

      <Modal
        isOpen={!!selectedFeedback}
        onClose={handleCloseFeedbackModal}
        className={style.feedback_modal}
      >
        {selectedFeedback && (
          <div className={style.feedback_details}>
            {selectedFeedback.feedbacks.length > 0 ? (
              <table className={style.feedback_table_modal}>
                <thead>
                  <tr>
                    <th>Comment</th>
                    <th>Created At</th>
                    <th>Rating</th>
                    <th>Image</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedFeedback.feedbacks.map((feedback, idx) => (
                    <tr key={idx}>
                      <td>{feedback.comment}</td>
                      <td>{formatTime(feedback.created_at)}</td>
                      <td>
                        <StarRating rating={feedback.rating} />
                      </td>
                      <td>
                        {feedback.image_url ? (
                          <img
                            className={style.feedback_image}
                            src={feedback.image_url}
                            alt="Feedback"
                            onClick={() => handleImageClick(feedback.image_url)}
                          />
                        ) : (
                          <p>No image available</p>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No feedbacks available</p>
            )}
          </div>
        )}
      </Modal>

      <Modal
        isOpen={!!selectedImage}
        onClose={handleCloseImageModal}
        className={style.image_modal}
      >
        {selectedImage && (
          <div className={style.image_modal_content}>
            <img
              className={style.enlarged_image}
              src={selectedImage}
              alt="Enlarged Feedback"
            />
          </div>
        )}
      </Modal>
      <div></div>
    </div>
  );
};

export default Feedback;
