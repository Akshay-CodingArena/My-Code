import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
// import Gallery from '../components/Gallery';
// import RevoltMap from '../components/revoltmap';
import RevoltSound from "../components/RevoltSound";
import { useLocation } from "react-router";
import $ from "jquery";
import MetaTags from "react-meta-tags";
import clevertap from "clevertap-web-sdk";

function Mainproduct() {
  function loadScript(url) {
    return new Promise(function (resolve, reject) {
      let script = document.createElement("script");
      script.setAttribute("class", "dynamicJS");
      script.setAttribute("defer", true);
      script.src = url;
      script.async = false;
      script.onload = function () {
        resolve(url);
      };
      script.onerror = function () {
        reject(url);
      };
      document.body.appendChild(script);
    });
  }
  function animateNumber() {
    var a = 0;

    $(window).scroll(function () {
      try {
        var oTop = $("#counter").offset().top - window.innerHeight;
        if (a == 0 && $(window).scrollTop() > oTop) {
          $(".counter-value").each(function () {
            var $this = $(this),
              countTo = $this.attr("data-count");
            $({
              countNum: $this.text(),
            }).animate(
              {
                countNum: countTo,
              },

              {
                duration: 2000,
                easing: "swing",
                step: function () {
                  $this.text(Math.floor(this.countNum));
                },
                complete: function () {
                  $this.text(this.countNum);
                  //alert('finished');
                },
              }
            );
          });
          a = 1;
        }
      } catch (err) { }
    });
  }

  const location = useLocation();

  //
  //
  useEffect(() => {
    clevertap.event.push("Page View", {
      "Page Name": "Main Product page",
      "Page Url": window.location.href,
    });
  }, []);
  //
  //
  useEffect(() => {
    setTimeout(function () {
      if (location.hash) {
        var hash = location.hash.substring(1);
        if (hash) {
          try {
            var element = document.getElementById(hash);
            element.scrollIntoView();
          } catch (err) {
            console.log(err);
          }
        }
      }
    }, 500);

    animateNumber();
  });

  useEffect(() => {
    if (!document.querySelector(".revolt-sound source").getAttribute("src")) {
      Array.from(document.querySelectorAll(".revolt-sound source")).forEach(
        (element, index) => {
          element.setAttribute("src", element.getAttribute("audio-src"));
        }
      );
    }
  }, []);

  const vidRef = useRef(null);
  const vidRefMob = useRef(null);

  const handlePlayVideo = () => {
    vidRef.current.muted = false;
    vidRefMob.current.muted = false;
    $(".pHide").hide();
    $(".fHide").show();
  };

  const handleStopVideo = () => {
    vidRef.current.muted = true;
    vidRefMob.current.muted = true;
    $(".fHide").hide();
    $(".pHide").show();
  };

  return (
    <>
      <MetaTags id="rv400">
        <title>
          RV1 by Revolt Motors: India's 1st AI-enabled Electric Motorcycle
        </title>
        <meta
          name="description"
          content="Book Now India's 1st AI-enabled smart electric bike with next-gen computing & mobility solution from Revolt Motors. Get your high-performance bike with Revolt.
"
        />

        <meta
          property="og:title"
          content="RV400 by Revolt Motors: India's 1st AI-enabled Electric Motorcycle"
        />
        <meta
          property="og:description"
          content="Book Now India's 1st AI-enabled smart electric bike with next-gen computing & mobility solution from Revolt Motors. Get your high-performance bike with Revolt.
          "
        />

        <meta name="twitter:site" content="@RevoltMotorsIN" />
        <meta
          name="twitter:image"
          content="https://www.revoltmotors.com/images/revolt-motors-logo.svg"
        />
        <link rel="canonical" href="https://www.revoltmotors.com/rv400" />
      </MetaTags>
      <div className="banner-slider">
        {/* <Link to="/book">
                              <img className='desktop' src="/images/rv400-banner.png" alt="" />
                              <img className='mobile'  src='/images/rv400-banner-mobile.png' alt='' />
                        </Link> */}

        <video
          ref={vidRef}
          className="desktop"
          muted
          autoPlay
          loop
          playsinline=""
        >
          <source src="/images/RV400Desktop.mp4" type="video/mp4" />
        </video>
        <video
          ref={vidRefMob}
          className="mobile"
          muted
          autoPlay
          loop
          playsinline=""
        >
          <source src="/images/RV400.mp4" type="video/mp4" />
        </video>

        <div className="bit">
          <button
            title="Stop Audio"
            className="fHide"
            onClick={handleStopVideo}
          >
            <img src="/images/volume.png" style={{ height: "auto" }} />
          </button>
          <button
            title="Play Audio"
            className="pHide"
            onClick={handlePlayVideo}
          >
            <img src="/images/mute.png" style={{ height: "auto" }} />
          </button>
        </div>
      </div>

      <section className="pageAbout padding-top-100">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="theme-content text-center">
                <h3>
                  ZIP AROUND THE CITY OR CRUISE ALONG, <br></br>YOU CONTROL YOUR
                  MOBILITY.
                </h3>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 p-0">
              <video id="custvideo1" muted autoPlay loop playsinline="">
                <source src="/images/rv400-video-final.mp4" type="video/mp4" />
                <source src="/images/rv400-video-final.ogg" type="video/ogg" />
              </video>
            </div>
          </div>
        </div>
      </section>

      <section className="tabfeatore" id="counter">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="mWidth">
                <ul
                  className="nav nav-tabs justify-content-center"
                  role="tablist"
                >
                  <li className="nav-item">
                    <a
                      className="nav-link  active"
                      href="#profile"
                      role="tab"
                      data-toggle="tab"
                      aria-selected="true"
                    >
                      ECO
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      href="#buzz"
                      role="tab"
                      data-toggle="tab"
                    >
                      NORMAL
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      href="#references"
                      role="tab"
                      data-toggle="tab"
                    >
                      Sports
                    </a>
                  </li>
                </ul>

                <div className="tab-content tabstatusNew">
                  <div role="tabpanel" className="tab-pane active" id="profile">
                    <div className="clearfix">
                      <div className="float-left">
                        TOP SPEED{" "}
                        <span>
                          <i data-count="45" className="counter-value">
                            0
                          </i>{" "}
                          kmph
                        </span>
                      </div>
                      <div className="float-right">
                        RANGE{" "}
                        <span>
                          <i data-count="150" className="counter-value">
                            0
                          </i>{" "}
                          kms*
                        </span>
                      </div>
                    </div>
                  </div>
                  <div role="tabpanel" className="tab-pane fade" id="buzz">
                    <div className="clearfix">
                      <div className="float-left">
                        TOP SPEED{" "}
                        <span>
                          <i data-count="65" className="counter-value">
                            0
                          </i>{" "}
                          kmph
                        </span>
                      </div>
                      <div className="float-right">
                        RANGE{" "}
                        <span>
                          <i data-count="100" className="counter-value">
                            0
                          </i>{" "}
                          kms*
                        </span>
                      </div>
                    </div>
                  </div>
                  <div
                    role="tabpanel"
                    className="tab-pane fade"
                    id="references"
                  >
                    <div className="clearfix">
                      <div className="float-left">
                        TOP SPEED{" "}
                        <span>
                          <i data-count="85" className="counter-value">
                            0
                          </i>{" "}
                          kmph
                        </span>
                      </div>
                      <div className="float-right">
                        RANGE{" "}
                        <span>
                          <i data-count="80" className="counter-value">
                            80
                          </i>{" "}
                          kms*
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="product-spec padding-top-100"
        id="mainproduct_Collapse"
      >
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="expand-feature padding-bottom-100">
                <div className="p-feature-text">
                  <div
                    className="expandText"
                    onClick={() => {
                      $(".expand-text").text(
                        $(".expand-text").text() == "Expand Specs"
                          ? "Collapse Specs"
                          : "Expand Specs"
                      );
                      $("#product-feature").slideToggle();
                      $(".expandText").toggleClass("active");
                    }}
                  >
                    <div className="expand-text">Expand Specs</div>
                    <div className="border-div">
                      <div className="borders">
                        <i className="fa fa-plus"></i>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="product-feature" id="product-feature">
                  <div className="padding-top-100">
                    <div className="row">
                      <div className="col-md-4 pl-0 pr-0 ">
                        <div className="box-page-bn">
                          <div className="box-imgs">
                            <img src="/images/wheel.jpg" alt="Brakes Icon" />
                          </div>
                          <div className="box-cont">
                            <h6>Brakes(CBS)</h6>
                            <p>Front Disc(240mm) /Rear Disc(240mm)</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4 pl-0 pr-0">
                        <div className="box-page-bn">
                          <div className="box-imgs">
                            <img src="/images/tyreimg.png" alt="Tyre Icon" />
                          </div>
                          <div className="box-cont">
                            <h6>Tyres</h6>
                            <p>Front - 90/80 R17 /Rear - 110/80 R17</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4 pl-0 pr-0">
                        <div className="box-page-bn">
                          <div className="box-imgs">
                            <img
                              src="/images/front-fronk.png"
                              alt="Front Fork Icon"
                            />
                          </div>
                          <div className="box-cont">
                            <h6>Front Fork</h6>
                            <p>Upside Down Forks</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4 pl-0 pr-0">
                        <div className="box-page-bn">
                          <div className="box-imgs">
                            <img
                              src="/images/RearSuspension.png"
                              alt="Rear Suspension Icon"
                            />
                          </div>
                          <div className="box-cont">
                            <h6>Rear Suspension</h6>
                            <p>Monoshock(Adjustable)</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4 pl-0 pr-0">
                        <div className="box-page-bn">
                          <div className="box-imgs">
                            <img
                              src="/images/BatteryType.png"
                              alt="Battery Icon"
                            />
                          </div>
                          <div className="box-cont">
                            <h6>Battery Type</h6>
                            <p>Lithium Ion</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4 pl-0 pr-0">
                        <div className="box-page-bn">
                          <div className="box-imgs">
                            <img
                              src="/images/VoltageWattage.png"
                              alt="Voltage/Wattage Icon"
                            />
                          </div>
                          <div className="box-cont">
                            <h6>Voltage/Wattage</h6>
                            <p>72V, 3.24KWh</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4 pl-0 pr-0">
                        <div className="box-page-bn">
                          <div className="box-imgs">
                            <img
                              src="/images/Chargingimg.png"
                              alt="Charging Time Icon"
                            />
                          </div>
                          <div className="box-cont">
                            <h6>Charging Time</h6>
                            <p>0-75% in 3 Hours And 0-100% in 4.5 Hours</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4 pl-0 pr-0">
                        <div className="box-page-bn">
                          <div className="box-imgs">
                            <img
                              src="/images/Motor.png"
                              alt="Electric Bike Motor"
                            />
                          </div>
                          <div className="box-cont">
                            <h6>Motor</h6>
                            <p>3KW (Mid Drive)</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4 pl-0 pr-0">
                        <div className="box-page-bn">
                          <div className="box-imgs">
                            <img
                              src="/images/weighting.png"
                              alt="Electric Bike Weight"
                            />
                          </div>
                          <div className="box-cont">
                            <h6>Weight</h6>
                            <p>115Kg</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4 pl-0 pr-0">
                        <div className="box-page-bn">
                          <div className="box-imgs">
                            <img
                              src="/images/whetbase.png"
                              alt="Wheel Base Icon"
                            />
                          </div>
                          <div className="box-cont">
                            <h6>Wheel Base</h6>
                            <p>1350mm</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4 pl-0 pr-0">
                        <div className="box-page-bn">
                          <div className="box-imgs">
                            <img
                              src="/images/SeatHeight.png"
                              alt="Seat Height Icon"
                            />
                          </div>
                          <div className="box-cont">
                            <h6>Seat Height (Rider)</h6>
                            <p>815mm</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4 pl-0 pr-0">
                        <div className="box-page-bn">
                          <div className="box-imgs">
                            <img
                              src="/images/CarryingCapacity.png"
                              alt="Carrying Capacity Icon"
                            />
                          </div>
                          <div className="box-cont">
                            <h6>Carrying Capacity</h6>
                            <p>2 Persons/Maximum 150Kg</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4 pl-0 pr-0">
                        <div className="box-page-bn">
                          <div className="box-imgs">
                            <img
                              src="/images/lightingimg.png"
                              alt="Lighting Icon"
                            />
                          </div>
                          <div className="box-cont">
                            <h6>Lighting</h6>
                            <p>
                              LED Head Lamp(Projection for High beam), Tail
                              Lamps And Indicators (All LED)
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4 pl-0 pr-0">
                        <div className="box-page-bn">
                          <div className="box-imgs">
                            <img
                              src="/images/GroundClearance.png"
                              alt="Ground Clearance Icon"
                            />
                          </div>
                          <div className="box-cont">
                            <h6>Ground Clearance</h6>
                            <p>200 mm</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4 pl-0 pr-0 ">
                        <div className="box-page-bn">
                          <div className="box-imgs">
                            <img src="/images/rangeimg.png" alt="Range Icon" />
                          </div>
                          <div className="box-cont">
                            <h6>Range</h6>
                            <p>
                              150kms(Eco Mode), 100kms(Normal Mode),
                              80kms(Sports Mode)
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-4 pl-0 pr-0 ">
                        <div className="box-page-bn br-0">
                          <div className="box-imgs">
                            <img
                              src="/images/w-logo.png"
                              alt="Product Warranty Icon"
                            />
                          </div>
                          <div className="box-cont">
                            <h6>Product Warranty</h6>
                            <p>
                              5 years or 75,000 Kilometres *, whichever occurs
                              first.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-4 pl-0 pr-0 ">
                        <div className="box-page-bn br-0">
                          <div className="box-imgs">
                            <img
                              src="/images/w-logo.png"
                              alt="Product Warranty Icon"
                            />
                          </div>
                          <div className="box-cont">
                            <h6>Battery Warranty</h6>
                            <p>
                              5 years or 75,000 Kilometres *, whichever occurs
                              first.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-4 pl-0 pr-0 ">
                        <div className="box-page-bn br-0">
                          <div className="box-imgs">
                            <img
                              src="/images/w-logo.png"
                              alt="Product Warranty Icon"
                            />
                          </div>
                          <div className="box-cont">
                            <h6>Charger Warranty</h6>
                            <p>
                              2 years only, from the <br />
                              date of purchase.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p style={{ "font-size": "12px", "margin-top": "10px" }}>
                    * "Standard warranty shall be for 3 years or 40,000
                    kilometers (whichever occurs first) on Vehicle and 3.25
                    years or 40,000 kilometers (whichever occurs first) on
                    Battery, from the date of purchase of vehicle. Remaining
                    period / kilometers of warranty shall be treated as extended
                    warranty and shall be provided by Revolt’s authorized
                    service provider only, subject to subscription in Revolt
                    Protect Plan. Customer can subscribe to Revolt Protect Plan
                    at nominal subscription charge. Customer to contact
                    authorized service provider to avail extended warranty".
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <div className="productSpecImg">
                <img alt="Revolt" src="/images/slidshowmainproduct.jpg" />
              </div>
            </div>
          </div>
          <div className="row m-0 spec-border">
            <div className="col-4 p-0 col-12 col-md-4 col-sm-4">
              <div className="info-detail">
                <h3>THE ERGONOMICS OF COMFORT</h3>
                <div className="mh-60">
                  <p>
                    Crafted around your comfort, a ride which won't let you down
                  </p>
                </div>
                <Link to={"/comfort"} className="linkMore">
                  <i className="fa fa-angle-right"></i>
                </Link>
              </div>
            </div>
            <div className="col-4 p-0 col-12 col-md-4 col-sm-4">
              <div className="info-detail">
                <h3>SCRIPTED AESTHETICALLY</h3>
                <div className="mh-60">
                  <p>
                    A design which assists the rider's comfort, the motorcycle's
                    performance and also makes heads & delusions turn 360
                    degrees
                  </p>
                </div>
                <Link to={"/aesthetic"} className="linkMore">
                  <i className="fa fa-angle-right"></i>
                </Link>
              </div>
            </div>
            <div className="col-4 p-0 col-12 col-md-4 col-sm-4">
              <div className="info-detail">
                <h3>SAFETY FIRST, ALWAYS</h3>
                <div className="mh-60">
                  <p>
                    Safety is our top most priority, both of RV1's and yours
                  </p>
                </div>
                <Link to={"/safety"} className="linkMore">
                  <i className="fa fa-angle-right"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Revolt Sound */}
      <RevoltSound loadScript={loadScript}></RevoltSound>
      {/* Revolt Sound */}

      <section className="bike-info padding-top-100 padding-bottom-100">
        <div className="container">
          <div className="row justify-content-end">
            <div className="col-12 col-md-6 col-sm-6 col-lg-4">
              <div className="info-box">
                <h3>THE MOST RELIABLE CHARGING ECOSYSTEM</h3>
                <p>
                  A revolutionary charging ecosystem consisting of multiple
                  methods to charge your Revolt motorcycle. No matter wherever
                  you are in the city, we've made sure that you never stop
                  revolting.
                </p>
                <Link className="sl-btn sl-red" to="/charging ">
                  Explore More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

  

      {/* Revolt Gallery */}
      {/* <Gallery></Gallery> */}
      {/* Revolt Gallery */}

      {/* Revolt Map */}
      {/* <RevoltMap></RevoltMap> */}
      {/* Revolt Map */}
    </>
  );
}

export default Mainproduct;
