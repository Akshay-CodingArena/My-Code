import React, { lazy, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { signout } from "../actions/userActions";
import { ROOT_PATH, URL_API } from "../constants/cartConstants";
// import LoadingBox from './LoadingBox';
// import MessageBox from './MessageBox';
import $ from "jquery";
import { useLocation } from "react-router";
import "react-slideshow-image/dist/styles.css";
import { Slide } from "react-slideshow-image";
import OfferSelector from "./OfferSlider/offerSelector";
import { axios as Axios } from "../utilities/axios";
import {
  USER_DETAILS_SUCCESS,
  USER_REGISTER_SUCCESS,
  USER_SIGNIN_SUCCESS,
  USER_UPDATE_PROFILE_SUCCESS,
} from "../constants/userConstants";
import { useNavigate } from "react-router-dom";
// import "./css/comparision.css";
// import "./css/header.css";
import RefreshOnRouteChange from "./RefreshOnRouteChange";

function Header() {
  // const cart = useSelector((state) => state.cart);
  // const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  // const { cartItems } = cart;
  // const [hideHeader,setHideHeader] = useState(false)
  const offers = [
    {
      name: "Avail the limited time offer worth ₹15,000* on RV400 and RV400 BRZ",
      color: "blue",
    },
    {
      name: "The Ex-Showroom Prices of RV400 and RV400 BRZ slashed by 5,000",
      color: "red",
    },
    {
      name: "No Down Payment | No Hidden Charges | RV400 @ Just ₹4,444/ month",
      color: "red",
    },
  ];
  // const offerModalImages = [
  //   {
  //     desktop: "revolt_flipkart.png",
  //     mobile: "revolt_flipkart.png",
  //     link: "https://www.flipkart.com/revolt-rv400-booking-ex-showroom-price-with-charger-rebel-red/p/itm486a79f742f1e?pid=EBKGS2ZFZJTCJCZG&lid=LSTEBKGS2ZFZJTCJCZG7GNZWQ&marketplace=FLIPKART&store=7dk%2F0aj&srno=b_1_3&otracker=browse&fm=organic&iid=0fa48c44-9c3d-4981-b421-aa33537935a4.EBKGS2ZFZJTCJCZG.SEARCH&ppt=None&ppn=None&ssid=5wv013bk280000001691589315672&cmpid=display_revolt_website_HPW",
  //   },
  //   {
  //     desktop: "1707.jpg",
  //     mobile: "1707.png",
  //     link: "/book",
  //   },
  // ];

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  console.log("Info us", userInfo);
  const dispatch = useDispatch();
  const [showOffer, setShowOffer] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [showTrial, setShowTrial] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showLarge, setShowLarge] = useState(true);
  var motorcycleTimeoutId;
  const search = new URLSearchParams(window.location.search);
  const utm_source = search.get("utm_source");
  const utm_medium = search.get("utm_medium");
  const utm_campaign = search.get("utm_campaign");
  const utm_link = utm_source
    ? `?utm_source=${utm_source}&utm_medium=${utm_medium}&utm_campaign=${utm_campaign}`
    : "";

  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1045);
  const [isOpen, setIsOpen] = useState(false);
  const [height, setHeight] = useState(0);
  const contentRef = useRef(null);
  const [dealershipHeight, setDealershipHeight] = useState(0);
  const dealershipRef = useRef(null);
  const [userDropdownHeight, setUserDropdownHeight] = useState(0);
  const [isMotorcycleOpen, setMotorcycleOpen] = useState(false);
  const [isDealershipOpen, setDealershipOpen] = useState(false);
  const [isUserDropdownOpen, setUserDropdownOpen] = useState(false);
  const menuRefMotorcycle = useRef(null);
  const menuRefDealership = useRef(null);
  const userDropdownRef = useRef(null);
  let bikeName = "";
  let testRideUrl = "";
  let bookRideUrl = "";

  let modelSearch = "";
  switch (window.location.pathname) {
    case "/rv1":
      bikeName = "RV1";
      modelSearch = `model=RV1`;
      testRideUrl =
        "/test-ride" +
        `${utm_link ? utm_link + "&" + modelSearch : "?" + modelSearch}`;
      bookRideUrl =
        "/book" +
        `${utm_link ? utm_link + "&" + modelSearch : "?" + modelSearch}`;
      break;
    case "/rv400":
      bikeName = "RV400";
      modelSearch = `model=RV400`;
      testRideUrl =
        "/test-ride" +
        `${utm_link ? utm_link + "&" + modelSearch : "?" + modelSearch}`;
      bookRideUrl =
        "/book" +
        `${utm_link ? utm_link + "&" + modelSearch : "?" + modelSearch}`;
      break;
    case "/rv1plus":
      bikeName = "RV1+";
      modelSearch = `model=RV1Plus`;
      testRideUrl =
        "/test-ride" +
        `${utm_link ? utm_link + "&" + modelSearch : "?" + modelSearch}`;
      bookRideUrl =
        "/book" +
        `${utm_link ? utm_link + "&" + modelSearch : "?" + modelSearch}`;
      break;
    case "/rv400-brz":
      bikeName = "RV400BRZ";
      modelSearch = `model=${bikeName}`;
      testRideUrl =
        "/test-ride" +
        `${utm_link ? utm_link + "&" + modelSearch : "?" + modelSearch}`;
      bookRideUrl =
        "/book" +
        `${utm_link ? utm_link + "&" + modelSearch : "?" + modelSearch}`;
      break;
  }

  /////////////////////new code/////////////
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  // For Motorcycles Dropdown
  useEffect(() => {
    if (menuRefMotorcycle.current) {
      menuRefMotorcycle.current.style.maxHeight = isMotorcycleOpen
        ? `${menuRefMotorcycle.current.scrollHeight}px`
        : "0px";
    }
    console.log("motorcycle", menuRefMotorcycle);
  }, [isMotorcycleOpen]);

  // For Dealership Dropdown
  useEffect(() => {
    if (menuRefDealership.current) {
      menuRefDealership.current.style.maxHeight = isDealershipOpen
        ? `${menuRefDealership.current.scrollHeight}px`
        : "0px";
    }
    console.log("dealer", menuRefDealership);
  }, [isDealershipOpen]);

  // For User Dropdown
  useEffect(() => {
    if (userDropdownRef.current) {
      userDropdownRef.current.style.maxHeight = isUserDropdownOpen
        ? `${userDropdownRef.current.scrollHeight}px`
        : "0px";
    }
    console.log("dropdown", userDropdownRef);
  }, [isUserDropdownOpen]);

  const handleMouseEnterMotorcycle = () => setMotorcycleOpen(true);
  const handleMouseLeaveMotorcycle = () => setMotorcycleOpen(false);

  const handleMouseEnterDealership = () => setDealershipOpen(true);
  const handleMouseLeaveDealership = () => setDealershipOpen(false);

  const handleUserDropdownMouseEnter = () => setUserDropdownOpen(true);
  const handleUserDropdownMouseLeave = () => setUserDropdownOpen(false);

  const signoutHandler = () => {
    dispatch(signout());
  };
  let [showHeader, setShowHeader] = useState(true);
  const handleMouseEnter = () => {
    console.log("Time Id", motorcycleTimeoutId);
    clearTimeout(motorcycleTimeoutId);
    setHeight(contentRef.current.scrollHeight);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    console.log("I am here");
    setHeight(0);
    //  motorcycleTimeoutId = setTimeout(() => setIsOpen(false), 970);
  };

  useEffect(() => {
    if (isOpen) {
      setHeight(contentRef.current.scrollHeight);
    } else {
      setHeight(0);
    }
  }, [isOpen]);

  //    const productCategoryList = useSelector((state) => state.productCategoryList);
  //    const {
  //      loading: loadingCategories,
  //      error: errorCategories,
  //      categories,
  //    } = productCategoryList;
  // useEffect(() => {
  //   //  dispatch(listProductCategories());
  // }, [dispatch]);
  //console.log(categories);

  useEffect(() => {
    let params = new URLSearchParams(document.location.search);
    if (params.get("utm_source")) {
      sessionStorage.setItem("utm", window.location.href.split("?")[1]);
    }
    if (params.get("mobileAppView") || localStorage.getItem("mobileAppView")) {
      localStorage.getItem("mobileAppView", true);
      setShowHeader(false);
    } else {
      setShowHeader(true);
    }
    if (window.location.pathname.toLowerCase() == "/STW2024".toLowerCase()) {
      setShowHeader(false);
    }
  }, []);

  $(document).on("click", ".menu-close", function () {
    $(".fixed-menu").addClass("active");
  });

  $(document).on("click", ".cls-btn", function () {
    $(".fixed-menu").removeClass("active");
  });

  const location = useLocation();
  const hideHeader = [
    "/comfort",
    "/aesthetic",
    "/safety",
    "/book",
    "/cash-booking",
    "/test-ride",
    "/product",
    "/product-pricing",
    "/placeorder",
    "/order",
    "/rmXMj4G36AWyyjYtrv400brzemp",
    "/revolt-alexa",
  ];
  const showAbsoluteHeader = [
    "/test-ride",
    "/book",
    "/product-pricing",
    "/cash-booking",
    "/product",
    "/placeorder",
    "/order",
    "/rmXMj4G36AWyyjYtrv400brzemp",
    "/revolt-alexa",
  ];
  const AlexaHeader = ["/revolt-alexa"];
  const headerRef = useRef();

  const spanStyle = {
    // padding: '20px',
    // background: '#efefef',
    // color: '#000000'
  };

  const divStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundSize: "cover",
    height: "400px",
  };

  const handleSlideChange = (newIndex) => {
    setCurrentSlideIndex(newIndex);
  };

  useEffect(() => {
    setTimeout(() => {
      if (hideHeader.includes("/" + location.pathname?.split("/")?.[1])) {
        if (
          location.pathname === "/book" ||
          location.pathname.split("/")[1] == "product" ||
          location.pathname.split("/")[1] == "placeorder" ||
          location.pathname ===
            "/order/" + window.location.pathname?.split("/")?.[2]
        ) {
          $(".new-header, .ab-height, .main-footer, .top-info").addClass(
            "hide-details"
          );
        } else {
          $(".new-header, .ab-height, .main-footer").addClass("hide-details");
        }
      } else {
        $(".new-header, .ab-height, .main-footer").removeClass("hide-details");
      }
      const path = location.pathname.replace(/\//g, "");
      $("body").attr("id", path);
    }, 100);
  }, [location.key]);

  useEffect(() => {
    $(".ds-text span .fa.fa-times").on("click", function () {
      $(".disclainer").slideUp();
      //  console.log("asdd");
    });
  });
  //  console.log("offerSelected", showOffer);
  const properties = {
    duration: 5000,
    autoplay: true,
    transitionDuration: 500,
    arrows: false,
    infinite: true,
    easing: "ease",
    indicators: (i) => <div className="offerSelect">{i + 1}</div>,
  };

  useEffect(() => {
    if (isClosing === true) {
      setTimeout(() => {
        setShowOffer(false);
        setIsClosing(false);
      }, 1000);
    }
  }, [isClosing]);

  // useEffect(()=>{
  //   if(window.location.pathname === "/test-ride-mobile"){

  //   }
  // },[])

  useEffect(() => {
    if (window) {
      if (window.innerWidth < 767) {
        setShowLarge(false);
      }
    }
  });

  const handleOfferClick = (name, index) => {
    setShowOffer(name);
    setCurrentSlideIndex(index);
  };

  // const OpenBanner = (link) => {
  //   window.open(link, "_blank");
  // };
  // const toggleDropdown = () => {
  //   if (!isOpen) {
  //     setHeight(contentRef.current.scrollHeight);
  //     setIsOpen(true);
  //   } else {
  //     setHeight(0);
  //     setTimeout(() => setIsOpen(false), 600);
  //   }
  // };

  // useEffect(() => {
  //   if (isOpen) {
  //     setHeight(contentRef.current.scrollHeight);
  //   } else {
  //     setHeight(0);
  //   }
  // }, [isOpen]);

  // mobileblock of profile
  // const itemStyle = {
  //   display: isMobile ? 'block' : 'none',
  // };

  // useEffect(() => {
  //   const handleResize = () => setIsMobile(window.innerWidth < 1045);
  //   window.addEventListener('resize', handleResize);
  //   return () => window.removeEventListener('resize', handleResize);
  // }, []);

  const checkVisibility = () => {
    if (elementRef.current) {
      const rect = elementRef.current.getBoundingClientRect();
      const isElementVisible = rect.bottom <= 0;
      setIsVisible(isElementVisible);
    }
  };

  useEffect(() => {
    if (
      window.location.pathname === "/rv400" ||
      window.location.pathname === "/rv1" ||
      window.location.pathname === "/rv1plus" ||
      window.location.pathname === "/rv400-brz"
    ) {
      checkVisibility(); // Check visibility on mount
      window.addEventListener("scroll", checkVisibility);
      window.addEventListener("resize", checkVisibility);

      return () => {
        window.removeEventListener("scroll", checkVisibility);
        window.removeEventListener("resize", checkVisibility);
      };
    }
  }, []);

  console.log("Header re rendered");
  const shouldShow = showAbsoluteHeader?.includes(
    "/" + location.pathname?.split("/")?.[1]
  );
  if (!shouldShow) {
    var id = setInterval(() => {
      console.log("I am running");
      if (document.querySelector("#fc_frame")) {
        if (
          document.querySelector("#fc_frame")?.classList?.contains("hide-chat")
        ) {
          document.querySelector("#fc_frame").classList?.remove("hide-chat");
        }
        clearInterval(id);
      }
    }, 1000);
  } else {
    var id = setInterval(() => {
      console.log("I am running");
      if (document.querySelector("#fc_frame")) {
        if (
          !document.querySelector("#fc_frame")?.classList?.contains("hide-chat")
        ) {
          document.querySelector("#fc_frame").classList?.add("hide-chat");
        }
        clearInterval(id);
      }
    }, 1000);
  }
  return (
    <>
      {showHeader ? (
        <>
          {shouldShow ? (
            <>
              {/* <div className="">
                <div
                  className="disclainer offer_book"
                  style={{ height: "36px" }}
                >
                  <div className="container-fluid">
                    <div className="row">
                      <div className="col-12">
                        <div className="ds-text text-center">
                          <div>
                            <Slide>
                              {offers.map((offer, index) => (
                                <div key={index}>
                                  <div
                                    className="offerBanner"
                                    // onClick={() =>
                                    //   handleOfferClick(offer.name, index)
                                    // }
                                  >
                                    <span
                                      className="offerBannerFont"
                                      style={{
                                        position: "relative",
                                        fontSize: "13px",
                                      }}
                                    >
                                      <img
                                        loading="lazy"
                                        style={{
                                          width: "18px",
                                          height: "18px",
                                          marginRight: "10px",
                                        }}
                                        src="/offer-1.png"
                                      />
                                      {offer.name}
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </Slide>
                          </div>
                          <span>
                            <i className="fa fa-times"></i>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}

              <RefreshOnRouteChange />

              <div className="container-fluid headerAbsolute">
                <div className="row align-items-center ">
                  <div className="col-md-3 col-9 col-sm-3 col-lg-3 logo">
                    <div className="main-logo">
                      <Link to="/">
                        <img
                          width="400"
                          height="200"
                          className="nr-logo"
                          alt="Revolt Motors Logo"
                          src={`/images/revolt-motors-logo.svg`}
                        />
                        {/* <span className="divider">&nbsp;</span>
                  <img
                    className="rel_logo"
                    alt=""
                    width="120px"
                    src={`/images/renterprise.svg`}
                  /> */}
                      </Link>
                      {AlexaHeader.includes(`${window.location.pathname}`) ? (
                        <img className="alexa-logo" src={"/images/alexa.png"} />
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div>
              {showOffer ? (
                <div
                  className={`${
                    isClosing ? "closing-container" : "offerContainer"
                  }`}
                >
                  <div className="offerPopup">
                    <div
                      style={{
                        right: "10px",
                        top: "10px",
                        cursor: "pointer",
                        zIndex: "9999",
                      }}
                      className="pr-2 position-absolute"
                      onClick={() => setIsClosing(true)}
                    >
                      <img src="/close_Icon.svg" width="30" />
                    </div>
                    <div className="offersSlider">
                      <Slide
                        onChange={handleSlideChange}
                        defaultIndex={currentSlideIndex}
                        setCurrentSlideIndex={setCurrentSlideIndex}
                        {...properties}
                      >
                        {/* {offerModalImages.map((image, index) => (
                          <div key={index}>
                            <img
                              loading="lazy"
                              className="offer_slider"
                              onClick={() => OpenBanner(image.link)}
                              src={
                                showLarge
                                  ? `/images/newhomepage/BannersDesktop/${image.desktop}`
                                  : `/images/newhomepage/BannersMobile/${image.mobile}`
                              }
                            />
                          </div>
                        ))} */}
                      </Slide>
                    </div>
                  </div>
                </div>
              ) : null}
              {""}
              {/* <div className="top-info">
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-lg-10 col-sm-9">
                      <div className="top-info-left">
                        <a
                          //href="https://support.revoltmotors.com/customer/login"
                          style={{ cursor: "pointer" }}
                          className="need-support"
                          onClick={() => {
                            sessionStorage.setItem("redirectFreshdesk", true);
                            window.location.href =
                              "https://support.revoltmotors.com/customer/login";
                          }}
                        >
                          Need Support
                        </a>
                        <ul className="top-info-list list-inline">
                          <li>
                            <a
                              target="_blank"
                              href="mailto:contact@revoltmotors.com"
                            >
                              {" "}
                              <i
                                style={{ width: "15px" }}
                                className="fa fa-envelope "
                              />{" "}
                              <label>Email: </label>
                              <span>contact@revoltmotors.com</span>
                            </a>
                          </li>
                          <li>
                            <a target="_blank" href="tel:+91-98 7305 0505">
                              <i
                                style={{ width: "15px" }}
                                className="fa fa-phone "
                              />{" "}
                              <label>Helpline: </label>{" "}
                              <span>+91-98 7305 0505</span>
                            </a>
                            <small className="desk-supp">
                              (Mon-Sun, 9AM-7PM)
                            </small>
                          </li>
                          <li>
                            <a
                              target="_blank"
                              href="https://api.whatsapp.com/send?phone=919873050505&text=Hi"
                            >
                              <i
                                style={{ width: "15px" }}
                                className="fa fa-whatsapp"
                              />
                              <small className="mob-supp">
                                (Mon-Sun, 9AM-7PM)
                              </small>{" "}
                              <label>WhatsApp: </label>{" "}
                              <span>+91-98 7305 0505</span>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-lg-2 col-sm-3">
                      <div className="top-right-info">
                        <span>Get APP</span>
                        <a href="https://apps.apple.com/us/app/myrevolt/id1477594974">
                          <img
                            style={{ width: "20px", height: "22.08px" }}
                            loading="lazy"
                            alt="Revolt App Store"
                            src="/images/apple1.svg"
                          />
                        </a>
                        <a href="https://play.google.com/store/apps/details?id=com.myrevolt.app">
                          <img
                            style={{ width: "20px" }}
                            loading="lazy"
                            alt="Revolt Playstore App
                            "
                            src="/images/playstore.svg"
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>{" "} */}
              {/* <div className="disclainer">
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-12">
                      <div className="ds-text text-center">
                        <div>
                          <Slide>
                            {offers.map((offer, index) => (
                              <div key={index}>
                                <div
                                  className="offerBanner"
                                  // onClick={() =>
                                  //   handleOfferClick(offer.name, index)
                                  // }
                                >
                                  <span
                                    className="offerBannerFont"
                                    style={{
                                      position: "relative",
                                      fontSize: "13px",
                                    }}
                                  >
                                    <img
                                      loading="lazy"
                                      style={{
                                        marginRight: "10px",
                                      }}
                                      width="18"
                                      height="18"
                                      src="/offer.svg"
                                      alt="Offer Icon"
                                    />
                                    {offer.name}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </Slide>
                        </div>
                        <span>
                          <i className="fa fa-times"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
              <header ref={elementRef} className="rv-header">
                <div class="container-fluid">
                  <nav class="navbar navbar-expand-lg">
                    <Link class="navbar-brand d-flex align-items-center" to="/">
                      <img
                        className="nr-logo"
                        alt="Revolt Motors Logo"
                        width="85"
                        height="30"
                        src={`/images/revolt_logo.svg`}
                      />
                      <img
                        width="50"
                        height="31"
                        className="fl-logo"
                        load="lazy"
                        style={{ marginRight: "35px" }}
                        alt="Revolt Logo"
                        src={`/images/logo-name.svg`}
                      />
                    </Link>

                    <div className="navbar-collapse justify-content-between d-flex align-items-center">
                      <ul className="navbar-nav mr-auto d-flex align-items-center">
                        <li
                          className="nav-item dropdown product-section-header"
                          onMouseEnter={handleMouseEnterMotorcycle}
                          onMouseLeave={handleMouseLeaveMotorcycle}
                        >
                          <Link
                            className="nav-link dropdown-toggle"
                            id="pagesDropdown"
                            role="button"
                            to="#"
                          >
                            Motorcycles
                          </Link>
                          <div
                            className={`dropdown-menu ${isMotorcycleOpen ? "open" : ""}`}
                            aria-labelledby="pagesDropdown"
                            ref={menuRefMotorcycle}
                            style={{
                              overflow: "hidden",
                              transition: "max-height 0.6s ease",
                              maxHeight: "0px",
                            }}
                          >
                            <div className="container-fluid">
                              <div className="row">
                                <div className="col-3 text-center">
                                  <div
                                    className="header-product-card"
                                    onClick={() => navigate("/rv1")}
                                  >
                                    <img
                                      // loading="lazy"
                                      src={
                                        isMobile
                                          ? null
                                          : "/images/home-product/top/Rv1.webp"
                                      }
                                      alt="RV1"
                                    />
                                    <h5 className="title">RV1</h5>
                                    <p></p>
                                    <p>Introductory Pricing ₹84,990* </p>
                                  </div>
                                </div>
                                <div className="col-3 text-center">
                                  <div
                                    className="header-product-card"
                                    onClick={() => navigate("/rv1plus")}
                                  >
                                    <img
                                      loading="lazy"
                                      src={
                                        "/images/home-product/top/RV1Plus.webp"
                                      }
                                      alt="Rv1+"
                                    />
                                    <h5 className="title">RV1+</h5>

                                    <p>Introductory Pricing ₹99,990* </p>
                                  </div>
                                </div>
                                <div className="col-3 text-center">
                                  <div
                                    className="header-product-card"
                                    onClick={() => navigate("/rv400-brz")}
                                  >
                                    <img
                                      loading="lazy"
                                      src={
                                        "/images/home-product/top/RV-BRZ.webp"
                                      }
                                      alt="rv400"
                                    />
                                    <h5 className="title">RV400 BRZ</h5>

                                    <p className="rvtooltip">
                                      Pricing ₹1,03,750*{" "}
                                      <span className="rvtooltiptext">
                                        *T&C Apply | Limited period pricing in
                                        Delhi incl. state subsidy
                                      </span>
                                    </p>
                                  </div>
                                </div>

                                <div className="col-3 text-center">
                                  <div
                                    className="header-product-card"
                                    onClick={() => navigate("/rv400")}
                                  >
                                    <img
                                      loading="lazy"
                                      src={"/images/top400.png"}
                                      alt="rv400"
                                    />
                                    <h5 className="title">RV400</h5>

                                    <p className="rvtooltip ">
                                      Pricing ₹1,20,750*{" "}
                                      <span className="rvtooltiptext head-rv400">
                                        *T&C Apply | Limited period pricing in
                                        Delhi incl. state subsidy
                                      </span>
                                    </p>
                                  </div>
                                </div>

                                {/* <div className="col-3 text-left head-border d-flex align-items-end">
                                  <div className="header-product-nav">
                                    <ul>
                                      <li>
                                        <Link to="/test-ride">Test Ride</Link>
                                      </li>
                                      <li>
                                        <Link to="/book">Book Now</Link>
                                      </li>
                                    </ul>
                                  </div>
                                </div> */}
                              </div>
                            </div>
                          </div>
                        </li>
                        {/* <li className="nav-item dropdown">
                          <Link
                            to="/offer"
                            className="nav-link"
                            onMouseEnter={() => setIsOpen(false)}
                          >
                            Offers
                          </Link>
                        </li> */}
                      </ul>
                    </div>
                    <ul class="navbar-nav d-flex align-items-center">
                      <li class="nav-item d-flex align-items-center">
                        <Link
                          class="nav-link"
                          to={`/test-ride${window.location.search}`}
                        >
                          Test Ride
                        </Link>
                      </li>
                      <li class="nav-item d-flex align-items-center">
                        <Link
                          class="nav-link"
                          to={`/book${window.location.search}`}
                        >
                          Book Now
                        </Link>
                      </li>
                      <li
                        className="nav-item d-flex align-items-center dropdown"
                        onMouseEnter={handleMouseEnterDealership}
                        onMouseLeave={handleMouseLeaveDealership}
                      >
                        <Link
                          className="nav-link dropdown-toggle"
                          to="#"
                          id="componentsDropdown"
                          role="button"
                        >
                          Dealership
                        </Link>
                        <div
                          className={`dropdown-menu ${isDealershipOpen ? "open" : ""}`}
                          aria-labelledby="componentsDropdown"
                          ref={menuRefDealership}
                          style={{
                            overflow: "hidden",
                            transition: "max-height 0.6s ease",
                            maxHeight: "0px",
                            left: "-63px !important",
                          }}
                        >
                          <Link className="dropdown-item" to="/become-dealer">
                            Become A Dealer
                          </Link>
                          <Link className="dropdown-item" to="#revolt-hub">
                            Locate A Dealer
                          </Link>
                        </div>
                      </li>

                      <li class="nav-item d-flex align-items-center">
                        <a href="#">
                          <img
                            className="logo-rel"
                            alt="Rattanindia Enterprise Logo"
                            width="90"
                            height="27"
                            src={`/images/renterprise.svg`}
                          />
                        </a>
                      </li>
                      <li
                        className="nav-item d-flex align-items-center dropdown"
                        onMouseEnter={handleUserDropdownMouseEnter}
                        onMouseLeave={handleUserDropdownMouseLeave}
                        onClick={() => setUserDropdownOpen(!isUserDropdownOpen)}
                      >
                        {userInfo ? (
                          <>
                            <a
                              className="special dropdown-toggle"
                              href="#"
                              id="componentsDropdown"
                              role="button"
                            >
                              {userInfo?.isSeller
                                ? userInfo?.name.length > 20
                                  ? userInfo?.name?.substring(10, 20)
                                  : userInfo?.name.substring(
                                      9,
                                      userInfo?.name.length
                                    )
                                : userInfo?.name.substring(0, 6) + "..."}
                            </a>

                            <div
                              aria-labelledby="componentsDropdown"
                              className={`dropdown-menu ${isUserDropdownOpen ? "open" : ""}`}
                              ref={userDropdownRef}
                              style={{
                                overflow: "hidden",
                                transition: "max-height 0.6s ease",
                                maxHeight: "0px",
                              }}
                            >
                              {userInfo && (
                                <a
                                  className="dropdown-item"
                                  href="/userdashboard"
                                >
                                  Profile
                                </a>
                              )}

                              {userInfo &&
                                [
                                  "8921500630",
                                  "9810348438",
                                  "7082273432",
                                  "9717224352",
                                ].indexOf(userInfo.mobile) >= 0 && (
                                  <Link
                                    className="dropdown-item"
                                    to="/banner-dashboard"
                                  >
                                    Banner
                                  </Link>
                                )}
                              {/* admin */}
                              {userInfo &&
                                (userInfo?.isAdmin ||
                                  userInfo?.isFinanceTeam) && (
                                  <>
                                    <Link
                                      className="dropdown-item"
                                      to="/orderlist"
                                    >
                                      Bookings
                                    </Link>
                                    <Link
                                      className="dropdown-item"
                                      to="/upgradeorderlist"
                                    >
                                      Upgrade Bookings
                                    </Link>

                                    <Link
                                      className="dropdown-item"
                                      to="/testridelist"
                                    >
                                      Test Rides
                                    </Link>
                                    <Link
                                      className="dropdown-item"
                                      to="/notifylist"
                                    >
                                      Unlock City
                                    </Link>
                                    <Link
                                      className="dropdown-item"
                                      to="/becomedealerlist"
                                    >
                                      Become a Dealer
                                    </Link>
                                    <Link
                                      className="dropdown-item"
                                      to="/spin-wheel-list"
                                    >
                                      Spin Wheel List
                                    </Link>
                                    <Link
                                      className="dropdown-item"
                                      to="/feedback-dash"
                                    >
                                      Feedbacks{" "}
                                    </Link>
                                    <Link
                                      className="dropdown-item"
                                      to="/requestlist"
                                    >
                                      Request
                                    </Link>
                                    <Link
                                      className="dropdown-item"
                                      to="/productlist"
                                    >
                                      Product
                                    </Link>
                                  </>
                                )}
                              {userInfo && userInfo.user_type == "hr" && (
                                <>
                                  <Link
                                    className="dropdown-item"
                                    to="/applicant-details"
                                  >
                                    Applicant Details
                                  </Link>
                                  <Link className="dropdown-item" to="/add-job">
                                    View Jobs
                                  </Link>
                                </>
                              )}
                              {/* admin end */}
                              {/* seller */}
                              {userInfo && userInfo?.isSeller && (
                                <>
                                  <Link
                                    className="dropdown-item"
                                    to="/orderlist/dealer"
                                  >
                                    Bookings
                                  </Link>

                                  <Link
                                    className="dropdown-item"
                                    to="/redeem-rewards"
                                  >
                                    Spin Win 2024
                                  </Link>

                                  <Link
                                    className="dropdown-item"
                                    to="/upgradeorderlist/dealer"
                                  >
                                    Upgrade Bookings
                                  </Link>
                                  <Link
                                    className="dropdown-item"
                                    to="/testridelist/dealer"
                                  >
                                    Test Rides
                                  </Link>
                                </>
                              )}
                              {/* seller end */}
                              <Link
                                className="dropdown-item"
                                to="#signout"
                                onClick={signoutHandler}
                              >
                                Sign Out
                              </Link>
                            </div>
                          </>
                        ) : (
                          <Link
                            className="dropdown-item"
                            to={`/signin?redirect=/`}
                          >
                            <img
                              width="22"
                              height="22"
                              load="lazy"
                              className="login_icon1"
                              src="/images/user.svg"
                            />
                          </Link>
                        )}
                      </li>

                      <li class="nav-item d-flex align-items-center">
                        <div className="menu-close main_menu">
                          <span className="menu-close">
                            <div />
                            <div />
                            <div />
                          </span>
                        </div>
                      </li>
                    </ul>
                  </nav>
                </div>
              </header>
              <div id="actionsMenu" className="menu-flex">
                {/* <div className="menu-button">
                                                                   <Link className="sl-btn sb-btn rev-merch" to="/test-ride"><img src="/images/rev-merch.png" alt="" /></Link>
                                                              </div> */}
                {/* <div className="menu-button">
                              <Link
                                onMouseEnter={() => setShowMenu(true)}
                                className={`sl-btn sb-btn modelButton  ${
                                  false ? "menuButtonsRevolt" : ""
                                }`}
                                to="/test-ride"
                              >
                                Models
                              </Link>
                            </div> */}
                {/* <div className="menu-button">
                                      <div className="dropdown">
                                        <div
                                          className="sl-btn sb-btn userButton"
                                          type="button"
                                          id="dropdownModelButton"
                                          data-toggle="dropdown"
                                          aria-haspopup="true"
                                          aria-expanded="false"
                                        >
                                          Models{" "}
                                          <img
                                            className="drop_icon"
                                            src="/down-arrow1.png"
                                          />
                                          <img
                                            className="drop_icon1"
                                            src="/down-arrow2.png"
                                          />
                                        </div>
                                        <div
                                          className="dropdown-menu dropdown-menu-right"
                                          aria-labelledby="dropdownMenuButton"
                                        >
                                          <Link
                                            className="dropdown-item"
                                            to="/rv400"
                                          >
                                            RV400
                                          </Link>
                                          <Link
                                            className="dropdown-item"
                                            to="rv400-brz"
                                          >
                                            RV400 BRZ
                                          </Link>
                                        </div>
                                      </div>
                                    </div> */}
                {/* <div className="menu-button">
                                      <Link
                                        className="sl-btn sb-btn"
                                        to="/test-ride"
                                      >
                                        Test Ride
                                      </Link>
                                    </div>
                                    <div className="menu-button">
                                      <Link
                                        className="sl-btn sb-btn"
                                        to="/book"
                                      >
                                        Book Now
                                      </Link>
                                    </div> */}
                <div className="menu-button">
                  <Link className="sl-btn sb-btn" to="/test-ride">
                    Test Ride
                  </Link>
                </div>

                <div className="menu-button">
                  <Link
                    className="sl-btn sb-btn"
                    to={`/book${window.location.search}`}
                  >
                    Book Now
                  </Link>
                </div>

                {/* <div className="menu-button">
                              <Link className="sl-btn sb-btn" to="/notifyme">
                                Notify me
                              </Link>
                            </div> */}
                {/* <div className="menu-button">
                              <Link className="sl-btn sb-btn" to="/verify">
                                Upgrade Option
                              </Link>
                            </div> */}

                <div className="menu-button">
                  <Link className="sl-btn sb-btn" to="/become-dealer">
                    Become a Dealer
                  </Link>
                </div>
                {/* <div className="menu-button">
                                      <div className="dropdown">
                                        <div
                                          className="sl-btn sb-btn userButton"
                                          type="button"
                                          id="dropdownModelButton"
                                          data-toggle="dropdown"
                                          aria-haspopup="true"
                                          aria-expanded="false"
                                        >
                                          Models{" "}
                                          <img
                                            className="drop_icon"
                                            src="/down-arrow1.png"
                                          />
                                          <img
                                            className="drop_icon1"
                                            src="/down-arrow2.png"
                                          />
                                        </div>
                                        <div
                                          className="dropdown-menu dropdown-menu-right"
                                          aria-labelledby="dropdownMenuButton"
                                        >
                                          <Link
                                            className="dropdown-item"
                                            to="/rv400"
                                          >
                                            RV400
                                          </Link>
                                          <Link
                                            className="dropdown-item"
                                            to="/rv400-brz"
                                          >
                                            RV400 BRZ
                                          </Link>
                                        </div>
                                      </div>
                                    </div> */}
                {/* <div className="modelOptions">
                                        {/* <div>
                                  <Link to="/merch">Merchandise</Link>
                                </div>
                                <hr /> */}
                {/* <div>
                                          <Link to="/verify">
                                            Upgrade Option
                                          </Link>
                                        </div> 
                                      </div> */}
                {/* </div> */}
              </div>

              <div className="fixed-menu" id="fixed-menu">
                <div className="cls-btn">
                  <i className="fa fa-times"></i>
                </div>

                <div className="menu-inner text-end">
                  <div className="p-name-head"> Motorcycles</div>
                  <div className="p-name">
                    <Link to={"/rv1" + window.location.search}>RV1</Link>
                  </div>
                  <div className="p-name">
                    <Link to={"/rv1plus" + window.location.search}>RV1+</Link>
                  </div>
                  <div className="p-name">
                    <Link to={"/rv400" + window.location.search}>RV400</Link>
                  </div>
                  <div className="p-name">
                    <Link to={"/rv400BRZ" + window.location.search}>
                      RV400 BRZ
                    </Link>
                  </div>
                  <div className="urlList">
                    <ul>
                      <li>
                        <Link to="/charging">
                          <span>REVOLUTIONISED</span>CHARGING
                        </Link>
                      </li>
                      <li>
                        <Link to="/ai-enabled">
                          <span>BEAUTY WITH</span>INTELLIGENCE
                        </Link>
                      </li>
                      {/* <li>
                <Link to="/notifyme">UNLOCK YOUR CITY</Link>
              </li> */}
                      {/* <li className="coabout">
                        <Link to="/verify">UPGRADE OPTION</Link>
                      </li> */}
                      <li className="coabout">
                        <Link to="/press">MEDIA</Link>
                      </li>
                      <li className="coabout">
                        <a
                          href="https://blog.revoltmotors.com"
                          target={"_blank"}
                        >
                          Blog
                        </a>
                      </li>
                      <li className="coabout">
                        <Link to="/about-us">ABOUT US</Link>
                      </li>
                      <li className="coabout">
                        <Link to="/contact-us">CONTACT US</Link>
                      </li>

                      <li className="coabout">
                        <Link to="/career-with-us">CAREER</Link>
                      </li>
                    </ul>
                  </div>
                  <div className="social-header d-flex justify-content-end align-items-end">
                    <div>
                      <a
                        href="https://www.facebook.com/revoltmotorsin/"
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        <i className="fa fa-facebook" aria-hidden="true" />
                      </a>
                    </div>
                    <div>
                      <a
                        href="https://twitter.com/RevoltMotorsIN"
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        <i className="fa fa-twitter" aria-hidden="true" />
                      </a>
                    </div>
                    <div>
                      <a
                        href="https://www.linkedin.com/company/revolt-intellicorp/"
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        <i className="fa fa-linkedin" aria-hidden="true" />
                      </a>
                    </div>
                    <div>
                      <a
                        href="https://www.instagram.com/revoltmotorsin/"
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        <i className="fa fa-instagram" aria-hidden="true" />
                      </a>
                    </div>
                    <div>
                      <a
                        href="https://www.youtube.com/channel/UC2tW9kRUr1mGhS8oA_IQEnQ"
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        <i className="fa fa-youtube-play" aria-hidden="true" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {window.location.pathname === "/rv400" ||
          window.location.pathname === "/rv1" ||
          window.location.pathname === "/rv1plus" ||
          window.location.pathname === "/rv400-brz" ? (
            <div
              className={`sticky-section-book-test ${isVisible ? "sticky-section-book-test-fixed" : ""}`}
            >
              <h1 className="model">{bikeName}</h1>
              <div className="action-section">
                <button
                  className="book-now"
                  onClick={() => navigate(bookRideUrl)}
                >
                  Book now
                </button>
                <button
                  className="test-ride"
                  onClick={() => navigate(testRideUrl)}
                >
                  Test ride
                </button>
              </div>
            </div>
          ) : null}
        </>
      ) : null}
    </>
  );
}

export default Header;
