import React, { useEffect, useRef, useState } from "react";
import * as style from "./admin-banner.module.css";
import "./swal.css";
import Modal from "./Modal";
import { URL_API } from "../../constants/cartConstants";
import Loader from "../Loader";
import Swal from "sweetalert2";
import apiFetch from "./apiFetch";
import { useDispatch, useSelector } from "react-redux";
import {
  validateUploadFiles,
  validatePosition,
  prepareFormDataForUpdate,
  prepareFormDataForUpload,
  debounceWrapper,
} from "./utils";
// import { PENDING, SUCCESS } from '../../constants/bannerConstants';

// Valid dimensions for desktop and mobile images
const REACT_APP_S3_BASE = process.env.REACT_APP_S3_BASE;
const validDimensions = {
  desktop: { minWidth: 1920, maxWidth: 1920, minHeight: 722, maxHeight: 722 },
  mobile: { minWidth: 768, maxWidth: 768, minHeight: 1050, maxHeight: 1050 },
};

const Table = () => {
  const [apiData, setApiData] = useState({});
  const [data, setData] = useState([]);
  const [modalState, setModalState] = useState({ status: false, index: null });
  const [errors, setErrors] = useState({ desktop: "", mobile: "", submit: "" });
  const [tempImages, setTempImages] = useState({ desktop: "", mobile: "" });
  const [bannerState, setBannerState] = useState({ status: false, image: "" });
  const [newPositionRef, setNewPositionRef] = useState();
  const [newLink, setNewLink] = useState("");
  const [imageDropped, setImageDropped] = useState({
    mobile: false,
    desktop: false,
  });
  const loading = useSelector((state) => state.banner.loading);
  const [uploadFiles, setUploadFiles] = useState({ mobile: "", desktop: "" });
  const cancelref = useRef();
  const dispatch = useDispatch();

  // Handle image upload and validation
  const handleImageUpload = (type, file) => {
    const newErrors = { ...errors };

    // Check if file is selected
    if (!file) {
      newErrors[type] = "No file selected!";
      setErrors(newErrors);
      setUploadFiles({
        ...uploadFiles,
        [type]: "",
      });
      return;
    }
    // Check file size (400KB)
    const fileSizeInKB = file.size / 1024;
    if (fileSizeInKB > 400) {
      newErrors[type] = "File size must be less than 400KB!";
      setErrors(newErrors);
      return;
    }

    // Create an image object to check dimensions
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);
    img.onload = () => {
      // Validate dimensions
      const { width, height } = img;
      const { minWidth, maxWidth, minHeight, maxHeight } =
        validDimensions[type];

      if (
        width >= minWidth &&
        width <= maxWidth &&
        height >= minHeight &&
        height <= maxHeight
      ) {
        setUploadFiles({
          ...uploadFiles,
          [type]: file,
        });
        setTempImages((prev) => ({ ...prev, [type + "_url"]: objectUrl }));
        // setTempFile({ index, type, file });
        newErrors[type] = "";
        setErrors(newErrors);
      } else {
        newErrors[type] =
          `Image dimensions must be between ${minWidth}x${minHeight}`;
        setErrors(newErrors);
      }
    };
    img.src = objectUrl;
    setImageDropped({
      ...imageDropped,
      [type]: true,
    });
  };

  // Handle form submission to save changes

  const handleSubmit = async (e) => {
    // e.preventDefault(); // Prevent default form submission behavior

    let newErrors = { ...errors };

    // Validate if both desktop and mobile images are uploaded
    newErrors = validateUploadFiles(uploadFiles, newErrors);
    if (newErrors.submit) {
      setErrors(newErrors); // Set errors if validation fails
      return; // Exit the function if there are validation errors
    }

    // Validate if a new position is provided
    newErrors = validatePosition(newPositionRef, newErrors);
    if (newErrors.submit) {
      setErrors(newErrors); // Set errors if validation fails
      return; // Exit the function if there are validation errors
    }

    const newPosition = newPositionRef - 1; // Calculate new position
    const oldPosition = modalState.index; // Get the old position from modal state

    // If neither mobile nor desktop images are uploaded
    if (!uploadFiles.mobile && !uploadFiles.desktop) {
      // If the position has changed, update the data
      if (newPosition !== oldPosition) {
        const newData = [...data];
        const formData = prepareFormDataForUpdate(
          newData,
          oldPosition,
          newPosition,
          apiData,
          modalState,
        );
        updateData(formData, callBackUpdate);
      } else if (apiData[modalState.index].mobile.redirect_link !== newLink) {
        // If the position is the same but the redirect link has changed, update the link
        let formData = [
          {
            id: apiData[modalState.index].mobile?.id,
            status: 1,
            position: newPosition,
            redirect_link: newLink,
          },
          {
            id: apiData[modalState.index].desktop?.id,
            status: 1,
            position: newPosition,
            redirect_link: newLink,
          },
        ];
        updateData(formData, callBackUpdate);
      }
      return; // Exit the function as updates have been handled
    }

    // Prepare form data for uploading new images, link, and position
    let formData = [];
    if (apiData[modalState.index]?.mobile?.id) {
      formData.push({
        id: apiData[modalState.index].mobile?.id,
        status: 0,
        position: newPosition,
      });
    }
    if (apiData[modalState.index]?.desktop?.id) {
      formData.push({
        id: apiData[modalState.index].desktop?.id,
        status: 0,
        position: newPosition,
      });
    }

    // If the position is the same and both mobile and desktop images are uploaded
    if (
      newPosition === modalState.index &&
      uploadFiles.mobile &&
      uploadFiles.desktop
    ) {
      // Update existing data before uploading new images
      updateData(formData, () => {
        formData = prepareFormDataForUpload(uploadFiles, newPosition, newLink);
        dispatch(
          apiFetch(
            URL_API + "/api/v1/common/marketing/adminpanel",
            {
              data: formData,
              headers: { "Content-Type": "multipart/form-data" },
            },
            "post",
            callBackUpload,
          ),
        );
      });
    } else {
      // If the position has changed or only one image is uploaded, directly upload new images
      formData = prepareFormDataForUpload(uploadFiles, newPosition, newLink);
      dispatch(
        apiFetch(
          URL_API + "/api/v1/common/marketing/adminpanel",
          {
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
          },
          "post",
          callBackUpload,
        ),
      );
    }
  };

  const callBackUpload = (response) => {
    setTempImages({ desktop: "", mobile: "" });
    fetchData();
    setModalState({ status: false, index: null });
    setErrors({ desktop: "", mobile: "", submit: "" });
    setNewLink("");
    Swal.fire({
      icon: "success",
      title: "Data uploaded successfully",
      showConfirmButton: false,
      timer: 1500,
      customClass: {
        container: "swal-custom",
      },
    });
  };

  const callBackUpdate = () => {
    Swal.fire({
      icon: "success",
      title: "Data updated successfully",
      showConfirmButton: false,
      timer: 1500,
      customClass: {
        container: "swal-custom",
      },
    });
    setNewLink("");
    setTempImages({ desktop: "", mobile: "" });
    setModalState({ index: null, status: false });
    fetchData();
  };

  const callBackUpdateCache = () => {
    console.log("Cache updated successfully");
  };

  const callBackFetch = (response) => {
    // setLoading(false);
    // let temp = Object.values(response.data).filter(key => typeof key == 'object');
    let temp = Object.keys(response.data).filter((key) => parseInt(key) >= 0);
    console.log("Temppppppp", temp, response.data);
    const finalData = temp.map((key) => {
      let item = response.data[key];
      if (item.desktop) {
        item.desktop_url = REACT_APP_S3_BASE + "/" + item.desktop.image;
        item.mobile_url = REACT_APP_S3_BASE + "/" + item.mobile.image;
        item.id = REACT_APP_S3_BASE + "/" + item.id;
        item.position = parseInt(key) + 1;
      }
      return item;
    });
    setData([...finalData]);
    dispatch(
      apiFetch(
        window.location.origin + "/updateBannerData",
        {
          data: finalData,
        },
        "post",
        callBackUpdateCache,
      ),
    );
    setApiData(response.data);
    setUploadFiles({ mobile: "", desktop: "" });
    setNewPositionRef(null);
    setImageDropped({ mobile: false, desktop: false });
  };

  const fetchData = () => {
    dispatch(
      apiFetch(
        URL_API + `/api/v1/common/marketing/bannerdata?status=1`,
        {},
        "get",
        callBackFetch,
      ),
    );
  };
  const updateData = (formData, callBack) => {
    // console.log("Myda")
    dispatch(
      apiFetch(
        URL_API + "/api/v1/common/marketing/adminpanel",
        { data: { updates: formData } },
        "put",
        callBack,
      ),
    );
  };

  useEffect(() => {
    fetchData();
  }, []);
  // Handle edit button click to open modal for editing
  const handleEdit = (index) => {
    setErrors({ desktop: "", mobile: "", submit: "" }); // Reset all error messages
    setTempImages(apiData[index - 1]); // Set temporary images and modal state
    setModalState({ index: index - 1, status: true });
    setUploadFiles({
      mobile: "",
      desktop: "",
    });
    // newPositionRef.current = index + 1
    setNewPositionRef(index);

    setNewLink(apiData[index - 1].mobile.redirect_link);
  };

  // Handle delete button click to delete the row
  const handleDelete = async (index) => {
    let formData = [];
    if (apiData[index].mobile.id) {
      formData.push({
        id: apiData[index].mobile.id,
        status: 0,
        position: index,
      });
    }
    if (apiData[index].desktop.id) {
      formData.push({
        id: apiData[index].desktop.id,
        status: 0,
        position: index,
      });
    }
    updateData(formData, fetchData);
  };

  // Open banner image
  const openBanner = (image) => {
    console.log("Opening banner:", image); // Check what image URL is passed
    setBannerState({ status: true, image });
  };

  // Determine if files are chosen for both desktop and mobile
  const filesChosen = uploadFiles.desktop !== "" || uploadFiles.mobile !== "";
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  var authenticate = userInfo?.mobile;

  return (
    <>
      {[
        "8921500630",
        "9810348438",
        "7082273432",
        "9717224352",
        "9599959794",
      ].indexOf(authenticate) >= 0 ? (
        <div className={style.mainTable}>
          {loading ? <Loader /> : null}
          <table className={style.admin_banner}>
            <thead>
              <tr>
                <th>Position</th>
                <th>Title</th>
                <th colSpan={2}>Images</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={index} style={{ textAlign: "center" }}>
                  <td>{row.position}</td>
                  <td>
                    <span>
                      {row.mobile
                        ? row.mobile.image?.split("_").shift()
                        : "No Image"}{" "}
                      {row.desktop
                        ? row.desktop.image?.split("_").shift()
                        : "No Image"}
                    </span>
                  </td>
                  <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                    {row.desktop && (
                      <img
                        onClick={() => openBanner(row.desktop_url)}
                        src={row.desktop_url}
                        alt={`${row.desktop.image?.split("_").shift()} Desktop`}
                        className={`${style.preview_img} ${style.enlarge_image}`}
                        style={{
                          display: "block",
                          margin: "auto",
                          width: "auto",
                        }}
                      />
                    )}
                  </td>
                  <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                    {row.mobile && (
                      <img
                        onClick={() => openBanner(row.mobile_url)}
                        src={row.mobile_url}
                        alt={`${row.mobile.image?.split("_").shift()} Mobile`}
                        className={`${style.preview_img} ${style.enlarge_image}`}
                        style={{
                          display: "block",
                          margin: "auto",
                          width: "auto",
                        }}
                      />
                    )}
                  </td>
                  <td>
                    <button
                      onClick={() => handleEdit(row.position)}
                      className={style.edit_btn}
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <img
                      src="/delete_icon.png"
                      alt="delete"
                      onClick={() => handleDelete(row.position - 1)}
                      className={style.delete_btn}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Modal for displaying banner */}
          {bannerState.status && (
            <Modal
              setModalState={() => setBannerState({ status: false, image: "" })}
              background="transparent"
              setNewLink={setNewLink}
            >
              <div
                className={style.Banner_content}
                style={{ background: "transparent" }}
              >
                <div className={style.banner_img_container}>
                  <img
                    src={bannerState.image}
                    alt="banner"
                    className={style.banner_image}
                    style={{ height: "70vh", width: "auto" }}
                  />
                </div>
              </div>
            </Modal>
          )}
          {/* Modal for editing */}
          {modalState.status && (
            <Modal
              ref={cancelref}
              setModalState={setModalState}
              setErrors={setErrors}
              setTempImages={setTempImages}
              setUploadFiles={setUploadFiles}
              setNewPositionRef={setNewPositionRef}
              setImageDropped={setImageDropped}
              setNewLink={setNewLink}
              errors={errors}
            >
              <div
                style={{
                  marginBottom: "5px",
                  borderBottom: "1px solid #e5e5e5",
                  width: "100%",
                  paddingBottom: "5px",
                }}
              >
                <h2
                  style={{
                    fontSize: "1rem",
                    fontWeight: "500",
                    marginBottom: "7px",
                  }}
                >
                  Upload File
                </h2>
              </div>
              <form
                className="sticky_slide_fix_admin_edit"
                onSubmit={debounceWrapper(handleSubmit)}
              >
                <h6 className={style.input_header} style={{ margin: "auto" }}>
                  Desktop
                </h6>
                <label
                  htmlFor="desktop-file"
                  className={style.input_group + " " + style.dropBox}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    e.nativeEvent.preventDefault();
                    e.stopPropagation();
                    console.log("MKKKK", e.dataTransfer.files);
                    handleImageUpload("desktop", e.dataTransfer.files[0]);
                  }}
                >
                  {!imageDropped.desktop && (
                    <span className={style.dropimage_text}>
                      Drop the files here or{" "}
                      <b
                        style={{
                          textDecoration: "underline",
                          cursor: "pointer",
                        }}
                      >
                        Upload
                      </b>
                    </span>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    id="desktop-file"
                    name="desktop-file"
                    style={{
                      display: "none",
                      width: "15.5rem",
                      background: "rgb(255 255 255)",
                      boxShadow: "1px 0px 9px -7px",
                      borderTopRightRadius: "5px",
                      borderBottomRightRadius: "5px",
                    }}
                    className={errors?.desktop ? style.error_input : ""}
                    onChange={(e) =>
                      handleImageUpload("desktop", e.target.files[0])
                    }
                  />
                  {(tempImages.desktop || tempImages.desktop_url) && (
                    <img
                      src={tempImages.desktop_url}
                      alt="Desktop Preview"
                      className={style.preview_img}
                    />
                  )}
                  {errors?.desktop && (
                    <p className={style.error_text}>{errors?.desktop}</p>
                  )}
                </label>

                <h6 className={style.input_header} style={{ margin: "auto" }}>
                  Mobile
                </h6>
                <label
                  htmlFor="mobile-file"
                  className={style.input_group + " " + style.dropBox}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    e.nativeEvent.preventDefault();
                    e.stopPropagation();
                    //  console.log("MKKKK", e.dataTransfer.files)
                    handleImageUpload("mobile", e.dataTransfer.files[0]);
                  }}
                >
                  {!imageDropped.mobile && (
                    <span className={style.dropimage_text}>
                      Drop the files here or{" "}
                      <b
                        style={{
                          textDecoration: "underline",
                          cursor: "pointer",
                        }}
                      >
                        Upload
                      </b>
                    </span>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    id="mobile-file"
                    name="mobile-file"
                    style={{
                      width: "15.5rem",
                      display: "none",
                      background: "rgb(255 255 255)",
                      boxShadow: "1px 0px 9px -7px",
                      borderTopRightRadius: "5px",
                      borderBottomRightRadius: "5px",
                    }}
                    className={errors.mobile ? style.error_input : ""}
                    onChange={(e) =>
                      handleImageUpload("mobile", e.target.files[0])
                    }
                  />
                  {(tempImages.mobile || tempImages.mobile_url) && (
                    <img
                      src={tempImages.mobile_url}
                      id="lets"
                      alt="Mobile Preview"
                      className={style.preview_img}
                    />
                  )}
                  {errors.mobile && (
                    <p className={style.error_text}>{errors.mobile}</p>
                  )}
                </label>

                <div className={style.position}>
                  <h6 className={style.input_header} style={{ margin: "0px" }}>
                    Position
                  </h6>
                  <input
                    type="text"
                    id="position"
                    style={{
                      padding: "5px",
                      fontSize: "0.8rem",
                      backgroundColor: "#f9f9f9",
                      border: "1px solid #3535353a",
                      height: "30px",
                      textAlign: "center",
                      fontWeight: "400",
                      width: "100%",
                    }}
                    pattern="^[1-7]{1,1}$"
                    value={newPositionRef}
                    onChange={(e) => {
                      const newPosition = e.target.value;
                      setNewPositionRef(newPosition);
                    }}
                    title="Valid position allowed : 1-5"
                  />
                </div>
                <div className={style.link}>
                  <h6
                    className={style.input_header}
                    style={{ margin: "0px", width: "97px" }}
                  >
                    Add Link
                  </h6>
                  <input
                    id="link"
                    style={{
                      padding: "5px",
                      fontSize: "0.8rem",
                      backgroundColor: "#f9f9f9",
                      border: "1px solid #3535353a",
                      height: "30px",
                      textAlign: "center",
                      fontWeight: "400",
                      width: "100%",
                    }}
                    // pattern="^https:\/\/(uat-web\.revoltmotors\.com\/.*|www\.revoltmotors\.com\/.*)$"
                    value={newLink}
                    onChange={(e) => {
                      const newValue = e.target.value;
                      setNewLink(newValue);
                    }}
                    title="URL must begin with: https://www.revoltmotors.com/"
                  />
                </div>

                {errors.submit && (
                  <div className={style.error_text}>{errors.submit}</div>
                )}
                <div className={style.btn_banner_edit}>
                  <button
                    className={style.close_btn}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      cancelref.current.click();
                    }}
                  >
                    Cancel
                  </button>
                  <input
                    type="submit"
                    value="Save"
                    className={style.submit_btn}
                    disabled={
                      !(
                        !filesChosen ||
                        Boolean(errors.desktop || errors.mobile) ||
                        newPositionRef != modalState.index ||
                        newPositionRef === null ||
                        newPositionRef === undefined
                      )
                    }
                  />
                </div>
              </form>
            </Modal>
          )}
          <button
            className={style.add_btn}
            onClick={() => setModalState({ status: true, index: -1 })}
          >
            add Image
          </button>
        </div>
      ) : (
        <>
          <div className="light-grey admin-page padding-top-100 padding-bottom-100">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <div className="box-table-panel">
                    <div className="top-profile">
                      <div className="row align-items-center">
                        <div className="col-12 text-center">
                          <h3 className="tab-title">Not a valid user</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Table;
