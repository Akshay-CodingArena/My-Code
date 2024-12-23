import React, { useEffect, useState } from "react";
// import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
// import { ROOT_PATH } from '../constants/cartConstants';
// import ChatBox from './ChatBox';

function Footer() {
  let [showFooter, setShowFooter] = useState(true);

  useEffect(() => {
    if (
      window.location.href.indexOf("mobileAppView") > 0 ||
      localStorage.getItem("mobileAppView")
    ) {
      // console.log("header htaao")
      localStorage.setItem("mobileAppView", true);
      setShowFooter(false);
    } else {
      setShowFooter(true);
    }

    if (window.location.pathname.toLowerCase() == "/STW2024".toLowerCase()) {
      setShowFooter(false);
    }
  }, []);

  return (
    <>
      {showFooter ? (
        <>
          <footer className="main-footer">
            <div className="top-footer">
              <div className="container">
                <div className="row">
                  <div className="col-lg-3 col-12 col-sm-12 col-md-3">
                    <div className="footer-menu">
                      <img
                        alt="Electric Bike Icon
"
                        loading="lazy"
                        src="/images/bikefooter.svg"
                      />
                      <h3>Motorcycles</h3>
                      <ul>
                        <li>
                          <Link to="/rv1">RV1</Link>
                        </li>
                        <li>
                          <Link to="/rv1plus">RV1+</Link>
                        </li>
                        <li>
                          <Link to="/rv400-brz">RV400 BRZ</Link>
                        </li>
                        <li>
                          <Link to="/rv400">RV400</Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-lg-3 col-12 col-sm-12 col-md-3">
                    <div className="footer-menu">
                      <img
                        alt="Revolt Motors Icon"
                        loading="lazy"
                        src="/images/F_Revolt_Icon.svg"
                      />
                      <h3>Revolt</h3>
                      <ul>
                        <li>
                          <a
                            href="https://blog.revoltmotors.com"
                            target={"_blank"}
                          >
                            Blog
                          </a>
                        </li>
                        <li>
                          <Link to="/about-us">Our Story</Link>
                        </li>
                        {/* <li><a href='https://www.linkedin.com/company/revolt-intellicorp/jobs/' rel="noopener noreferrer" target={'_blank'}>Careers</a></li> */}
                        <li>
                          <a href="/career-with-us" target={"_blank"}>
                            Career With Us
                          </a>
                        </li>
                        <li>
                          <a
                            href="mailto:career@revoltmotors.com"
                            target={"_blank"}
                          >
                            Career@revoltmotors.com
                          </a>
                        </li>

                        {/* <li><a href="mailto:ddrevolt@revoltmotors.com"  target={'_blank'}>Apply Dealership</a></li> */}
                        <li>
                          <Link to="/becomedealer">Become a Dealer</Link>
                        </li>

                        {/* <li><Link to="/press">Media</Link></li> */}
                        {/* <li><Link to="/cancel-my-revolt">Cancel My Revolt</Link></li> */}
                      </ul>
                    </div>
                  </div>
                  <div className="col-lg-3 col-12 col-sm-12 col-md-3">
                    <div className="footer-menu">
                      <img
                        alt="Legal Icon"
                        loading="lazy"
                        src="/images/Legal.svg"
                      />
                      <h3>Legal</h3>
                      <ul>
                        <li>
                          <Link to="/terms">Terms &amp; Conditions</Link>
                        </li>
                        <li>
                          <Link to="/privacy-policy">Privacy Policy</Link>
                        </li>
                        <li>
                          <Link to="/disclaimer-details">Caution Notice</Link>
                        </li>
                        <li>
                          <Link to="/myrevolt-eula">EULA </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-lg-3 col-12 col-sm-12 col-md-3">
                    <div className="footer-menu">
                      {/* <div className="notify-btn mb-4">
                                           <Link className="sl-btn" to="/notifyme">Notify Me</Link>
                                      </div>
                                      */}
                      <h3>Follow us</h3>
                      <ul className="social-linls">
                        <li>
                          <a
                            href={"//www.facebook.com/revoltmotorsin/"}
                            rel="noopener noreferrer"
                            target="_blank"
                          >
                            <i
                              className="fa fa-facebook"
                              aria-hidden="true"
                            ></i>
                          </a>
                        </li>
                        <li>
                          <a
                            href="//twitter.com/RevoltMotorsIN"
                            rel="noopener noreferrer"
                            target="_blank"
                          >
                            <i className="fa fa-twitter" aria-hidden="true"></i>
                          </a>
                        </li>
                        <li>
                          <a
                            href="//www.linkedin.com/company/revolt-intellicorp/"
                            rel="noopener noreferrer"
                            target="_blank"
                          >
                            <i
                              className="fa fa-linkedin"
                              aria-hidden="true"
                            ></i>
                          </a>
                        </li>
                        <li>
                          <a
                            href="//www.instagram.com/revoltmotorsin/"
                            rel="noopener noreferrer"
                            target="_blank"
                          >
                            <i
                              className="fa fa-instagram"
                              aria-hidden="true"
                            ></i>
                          </a>
                        </li>
                        <li>
                          <a
                            href="//www.youtube.com/channel/UC2tW9kRUr1mGhS8oA_IQEnQ"
                            rel="noopener noreferrer"
                            target="_blank"
                          >
                            <i
                              className="fa fa-youtube-play"
                              aria-hidden="true"
                            ></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <div className="top-download mt-3 text-center">
                      <p>
                        Download the App Now{" "}
                        <a href="https://apps.apple.com/us/app/myrevolt/id1477594974">
                          <img
                            alt="Revolt App Store"
                            loading="lazy"
                            src="/images/apple1.svg"
                          />
                        </a>{" "}
                        <a href="https://play.google.com/store/apps/details?id=com.myrevolt.app">
                          <img
                            alt="Revolt Playstore App"
                            loading="lazy"
                            src="/images/playstore.svg"
                          />
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bottom-footer">
              <div className="container">
                <div className="row">
                  <div className="col-12">
                    <div className="cpy">
                      All information is subject to specific conditions |
                      Copyright © 2024 Revolt Intellicorp Private Limited. All
                      right reserved.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </footer>

          {/* <div className='backtotop'>
              <div className='backTop'>
                    <i className='fa fa-angle-up'></i>
              </div>
          </div> */}
        </>
      ) : null}
    </>
  );
}

export default Footer;
