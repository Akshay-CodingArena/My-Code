import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { listProductCategories } from "../actions/productActions";
import { signout } from "../actions/userActions";
import { ROOT_PATH } from "../constants/cartConstants";
// import LoadingBox from './LoadingBox';
// import MessageBox from './MessageBox';
import $ from "jquery";
import { useLocation } from "react-router";

function Header() {
  // const cart = useSelector((state) => state.cart);
  // const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  // const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };
  //    const productCategoryList = useSelector((state) => state.productCategoryList);
  //    const {
  //      loading: loadingCategories,
  //      error: errorCategories,
  //      categories,
  //    } = productCategoryList;
  useEffect(() => {
    //  dispatch(listProductCategories());
  }, [dispatch]);
  //console.log(categories);

  $(document).on("click", ".menu-close", function () {
    $(".fixed-menu").addClass("active");
  });

  $(document).on("click", ".cls-btn", function () {
    $(".fixed-menu").removeClass("active");
  });

  const location = useLocation();
  const hideHeader = ["/comfort", "/aesthetic", "/safety"];

  const headerRef = useRef();

  useEffect(() => {
    if (hideHeader.includes(location.pathname)) {
      $(".new-header, .ab-height, .main-footer").addClass("hide-details");
    } else {
      $(".new-header, .ab-height, .main-footer").removeClass("hide-details");
    }

    const path = location.pathname.replace(/\//g, "");
    $("body").attr("id", path);
  }, [location.key]);

  useEffect(() => {
    $(".ds-text span").on("click", function () {
      $(".disclainer").slideUp();
      console.log("asdd");
    });
  });

  return (
    <>
      <header className="new-header" ref={headerRef}>
        <div className="disclainer">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="ds-text text-center">
                  <Link to="disclaimer-details">
                    Disclaimer: Beware of fraudulent websites and offers
                    misusing Revolt’s name...
                  </Link>
                  <span>
                    <i className="fa fa-times"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-md-3 col-6 col-sm-3 col-lg-2">
              <div className="main-logo">
                <Link to="/">
                  <img
                    className="nr-logo"
                    alt="Revolt Logo"
                    src={`/images/revolt-motors-logo.svg`}
                  />
                  <img
                    load="lazy"
                    className="fl-logo"
                    alt="Revolt Logo"
                    src={`/images/logo-name.svg`}
                  />
                </Link>
              </div>
            </div>
            <div className="col-md-9 col-6 col-sm-9 col-lg-10">
              <div className="row align-items-center">
                <div className="col-md-5 col-lg-5 d-none d-lg-block">
                  {/* <div className="disclaimer-text">
                                        <marquee loop={900}>
                                              <Link to="disclaimer-details">
                                                   Disclaimer: Beware of fraudulent websites and offers misusing Revolt’s name . Please read the disclaimer notice carefully before using this website and making enquiries about dealership/products.
                                              </Link>
                                        </marquee>
                                  </div> */}
                </div>
                <div className="col-md-12 col-lg-2 col-12">
                  <img
                    className="nr-logo"
                    alt=""
                    width="300px"
                    src={`/images/renterprise.svg`}
                  />
                </div>
                <div className="col-md-12 col-lg-5 col-12">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="menu-nav-bar">
                        <div className="menu-icon">
                          {userInfo ? (
                            <>
                              <div className="dropdown">
                                <button
                                  className="icon-button"
                                  type="button"
                                  id="dropdownMenuButton"
                                  data-toggle="dropdown"
                                  aria-haspopup="true"
                                  aria-expanded="false"
                                >
                                  <i className="fa fa-user"></i>{" "}
                                  <i className="fa fa-caret-down"></i>
                                </button>

                                <div
                                  className="dropdown-menu dropdown-menu-right"
                                  aria-labelledby="dropdownMenuButton"
                                >
                                  {userInfo && (
                                    <a
                                      className="dropdown-item"
                                      href="/userdashboard"
                                    >
                                      Profile
                                    </a>
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
                              </div>
                            </>
                          ) : (
                            <Link
                              className="icon-button"
                              to={`/signin?redirect=/`}
                            >
                              <i className="fa fa-user"></i>
                            </Link>
                          )}
                        </div>
                        <div className="menu-left">
                          <div className="menu-flex">
                            <div className="menu-button">
                              <Link className="sl-btn sb-btn" to="/test-ride">
                                Test Ride
                              </Link>
                            </div>
                            {/* <div className="menu-button">
                                                                   <Link className="sl-btn sb-btn" to="/book">Book Now</Link>
                                                              </div> */}

                            <div className="menu-button">
                              <Link className="sl-btn sb-btn" to="/notifyme">
                                Notify me
                              </Link>
                            </div>

                            <div className="menu-button">
                              {userInfo ? (
                                <>
                                  <div className="dropdown">
                                    <button
                                      className="sl-btn sb-btn"
                                      type="button"
                                      id="dropdownMenuButton"
                                      data-toggle="dropdown"
                                      aria-haspopup="true"
                                      aria-expanded="false"
                                    >
                                      {userInfo?.isSeller
                                        ? userInfo?.name.length > 20
                                          ? userInfo?.name.substring(10, 20)
                                          : userInfo?.name.substring(
                                              10,
                                              userInfo?.name.length,
                                            )
                                        : userInfo?.name.substring(0, 10) +
                                          "..."}

                                      <i className="fa fa-caret-down"></i>
                                    </button>

                                    <div
                                      className="dropdown-menu dropdown-menu-right"
                                      aria-labelledby="dropdownMenuButton"
                                    >
                                      {userInfo && (
                                        <a
                                          className="dropdown-item"
                                          href="/userdashboard"
                                        >
                                          Profile
                                        </a>
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
                                  </div>
                                </>
                              ) : (
                                <Link
                                  className="sl-btn sb-btn"
                                  to={`/signin?redirect=/`}
                                >
                                  Login
                                </Link>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="menu-right">
                          <div className="menu-close">
                            <span className="menu-close">
                              <div />
                              <div />
                              <div />
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <div className='row mobile-disclainer'>
                    <div className='col-12'>
                            <div className="disclaimer-text">
                                <marquee loop={900}>
                                        <Link to="disclaimer-details">
                                            Disclaimer: Beware of fraudulent websites and offers misusing Revolt’s name . Please read the disclaimer notice carefully before using this website and making enquiries about dealership/products.
                                        </Link>
                                </marquee>
                            </div>
                    </div>
              </div> */}
        </div>
      </header>

      {/* <div className="ab-height"></div> */}

      <div className="fixed-menu" id="fixed-menu">
        <div className="cls-btn">
          <i className="fa fa-times"></i>
        </div>
        <div className="menu-inner text-end">
          <div className="p-name">
            <Link to="/rv400">RV400</Link>
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
              <li className="coabout">
                <Link to="/about-us">ABOUT US</Link>
              </li>
              <li className="coabout">
                <Link to="/contact-us">CONTACT US</Link>
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
    </>
  );
}

export default Header;
