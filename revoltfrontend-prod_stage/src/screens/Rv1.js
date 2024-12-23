import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
// import Gallery from '../components/Gallery';
// import RevoltMap from '../components/revoltmap';
import RevoltSound from "../components/RevoltSound";
import { useLocation } from "react-router";
import $ from "jquery";
import MetaTags from "react-meta-tags";
import clevertap from "clevertap-web-sdk";
import Slider from "react-slick";
import { useDispatch, useSelector } from "react-redux";
import { detailsProduct, detailsProductAll } from "../actions/productActions";
import SwiperCore, { Mousewheel, Pagination } from "swiper";
import Marker from "../components/Marker";
import { featureDetails } from "../featuresDetails";
import PricingComparison from "../components/pricing/PricingComparison";

// SwiperCore.use([Mousewheel, Pagination]);
SwiperCore.use([Pagination]);

function RevoltRv1() {
  // ------------------ slick dots start--------------------------

  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.allProducts);
  const { loading, product } = productDetails;
  const [colorRV1, setColorRV1] = useState({});
  const [nav1, setNav1] = useState(null);
  const [showColor, setShowColor] = useState(false); // New state for animation
  const [selectedBikeSecond, setSelectedBikeSecond] = useState("RV1");
  const [selectedBikeFirst, setSelectedBikeFirst] = useState("RV1+");

  // Fetch product details when component loads
  useEffect(() => {
    dispatch(detailsProductAll());
  }, [dispatch]);

  // Set default color when product is loaded
  useEffect(() => {
    if (product && product["RV1"] && product["RV1"].length > 0) {
      setColorRV1(product["RV1"][0]);
      setShowColor(true);
    }
  }, [product]);

  console.log(product);
  // Handle slider change and map the newIndex based on idToColorMap
  const imageChanged = (newIndex) => {
    const colorIndex = idToColorMap[newIndex];
    console.log(`Slider index: ${newIndex}, mapped index: ${colorIndex}`);

    if (colorIndex !== undefined && product?.["RV1"]?.[colorIndex]) {
      setColorRV1(product["RV1"][colorIndex]);
      setShowColor(false);
      setTimeout(() => {
        setShowColor(true);
      }, 200);
    }
  };

  // Map slide indices to desired color indices
  const idToColorMap = {
    0: 0,
    1: 1,
    2: 3,
    3: 2,
  };

  // ------------------ slick dots end--------------------------
  const [swiperObject, setswiperObject] = useState();
  const lastScrollY = useRef(0);
  const autoFocusId = useRef(null);
  const YourComponent = ({
    featureDetails,
    onReachEnd,
    onFromEdge,
    setswiperObject,
  }) => {
    const [openIndex, setOpenIndex] = useState(null);
  };
  const isMobile = document.documentElement.clientWidth < 750;
  const locations = [
    {
      markers: [
        { top: "23.1534%", left: "49.94%" },
        { top: "35.2%", left: "45.9%" },
      ],
    },
  ];
  const [openIndex, setOpenIndex] = useState(-1);
  const breakpoints = function (swiper = swiperObject) {
    if (swiper) {
      setTimeout(function () {
        if ($(window).width() <= 850) {
          $(".swiper-container").each(function () {
            swiper.disable();
          });
        } else {
          swiper.enable();
        }
      }, 100);
    }
  };

  window.addEventListener("resize", (event) => {
    breakpoints();
  });

  useEffect(() => {
    breakpoints();
  }, [swiperObject]);
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
      } catch (err) {}
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
    // $(".expandText").on("click", function () {
    //   $(".expand-text").text(
    //     $(".expand-text").text() == "Expand Specs"
    //       ? "Collapse Specs"
    //       : "Expand Specs"
    //   );
    //   $("#product-feature").slideToggle();
    //   $(".expandText").toggleClass("active");
    // });
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
    const handleScroll = (scroll) => {
      console.log("scroll", scroll, scroll.deltaY);
      const rv1VideoSection = document.querySelector(".rv1VideoSection");

      if (rv1VideoSection) {
        const rect = rv1VideoSection.getBoundingClientRect();
        const top = rect.top;
        const y = rect.y;
        const bottom = rect.bottom;
        const height = rect.height;

        if (
          (lastScrollY.current < window.scrollY && top > 10) ||
          (lastScrollY.current > window.scrollY &&
            bottom > 100 &&
            bottom < height)
        ) {
          clearTimeout(autoFocusId.current);
          scroll.preventDefault();

          let target = window.scrollY + (y ?? 0); // Use nullish coalescing operator
          autoFocusId.current = setTimeout(() => {
            if (document.documentElement.clientWidth > 700) {
              window.scrollTo(0, target);
              lastScrollY.current = window.scrollY;
            }
          }, 1000);
        }
      }

      lastScrollY.current = window.scrollY;
      console.log("rect", rv1VideoSection?.getBoundingClientRect());
    };

    //    window.addEventListener("scroll", handleScroll);

    return () => {
      //    window.removeEventListener("scroll", handleScroll);
    };
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

  // const handleMouseWheel = (e) => {
  //   //   setTimeout(() => {
  //   console.log("Helllllllo");
  //   if (e.deltaY < 0 && swiperObject.isEnd) {
  //     swiperObject.mousewheel.disable();
  //   }
  //   // }, );
  // };

  // const onReachEnd = () => {
  //   console.log("Object props", swiperObject);

  //   setTimeout(() => {
  //     swiperObject.el.addEventListener("wheel", handleMouseWheel);
  //   }, 2000);
  // };

  // const onFromEdge = () => {
  //   if (swiperObject) {
  //     swiperObject.mousewheel.enable();
  //   }
  // };

  console.log("My Open Index is", openIndex);

  return (
    <>
      <MetaTags id="rv400">
        <title>
          RV400 BRZ by Revolt Motors: India's 1st AI-enabled Electric Motorcycle
        </title>
        <meta
          name="description"
          content="Book Now India's 1st AI-enabled smart electric bike with next-gen computing & mobility solution from Revolt Motors. Get your high-performance bike with Revolt.
"
        />
        <meta
          property="og:title"
          content=" RV400 BRZ by Revolt Motors: India's 1st AI-enabled Electric Motorcycle"
        />
        <meta
          property="og:description"
          content="Book Now India's 1st AI-enabled smart electric bike with next-gen computing & mobility solution from Revolt Motors. Get your high-performance bike with Revolt.
          "
        />
        <link rel="canonical" href="https://www.revoltmotors.com/rv400-brz" />
        <meta name="twitter:site" content="@RevoltMotorsIN" />
        <meta
          name="twitter:image"
          content="https://www.revoltmotors.com/images/revolt-motors-logo.svg"
        />
      </MetaTags>
      <div className="banner-slider">
        <Link to="/book">
          {/* <h1></h1> */}
          <img
            className="desktop"
            // src="/images/newhomepage/BannersDesktop/rv400brz-offer.svg"
            src="/images/newhomepage/BannersDesktop/Revolt-RV1.webp"
            alt="RV1"
          />
          <img
            className="mobile"
            src="/images/newhomepage/BannersMobile/Revolt-RV1.webp"
            alt="RV1"
          />{" "}
        </Link>

        {/* <video
          ref={vidRef}
          className="desktop"
          muted
          autoPlay
          loop
          playsinline=""
        >
          <source src="/images/RV400Desktop.mp4" type="video/mp4" />
        </video> */}
        {/* <video
          ref={vidRefMob}
          className="mobile"
          muted
          autoPlay
          loop
          playsinline=""
        >
          <source src="/images/RV400.mp4" type="video/mp4" />
        </video> */}

        {/* <div className="bit">
          <button
            title="Stop Audio"
            className="fHide"
            onClick={handleStopVideo}
          >
            <img src="/images/volume.png" />
          </button>
          <button
            title="Play Audio"
            className="pHide"
            onClick={handlePlayVideo}
          >
            <img src="/images/mute.png" />
          </button>
        </div> */}
      </div>

      {/* <section className="pageAbout padding-top-100">
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
      </section> */}

      {/* <section className="tabfeatore" id="counter">
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
      </section> */}

      <section className="rv1VideoSection swiper_section">
        <div className="container">
          <div
            className="hit-the-road-fullinfo owl_sld_right "
            id="feature-sec3"
          >
            {isMobile ? (
              // Render divs directly for mobile without Swiper
              <div className="mobile-container">
                <div>
                  <video id="custvideo1" muted autoPlay loop playsInline>
                    <source
                      src="https://revoltmotors.s3.ap-south-1.amazonaws.com/rv1.mp4"
                      type="video/mp4"
                    />
                    <source
                      src="https://revoltmotors.s3.ap-south-1.amazonaws.com/rv1.ogg"
                      type="video/ogg"
                    />
                  </video>
                </div>
                {featureDetails.map((slideData, slideIndex) => (
                  <div
                    key={slideIndex}
                    className="rightbar_slide"
                    style={{ position: "relative" }}
                  >
                    <picture>
                      <img
                        src={`/images/green_${slideIndex === 0 ? "front" : slideIndex === 1 ? "left" : "back"}.png`}
                        alt="Suspension"
                      />
                    </picture>
                    {slideData.map(({ top, left, content }, index) => (
                      <Marker
                        className="marker-container"
                        key={index}
                        id={`modal-${slideIndex}-${index}`}
                        location={{ top, left }}
                        title={content.title}
                        description={content.description()}
                        image={content.img}
                        isOpen={openIndex === `${slideIndex}-${index}`}
                        onClick={() =>
                          setOpenIndex(
                            openIndex === `${slideIndex}-${index}`
                              ? null
                              : `${slideIndex}-${index}`
                          )
                        }
                        setOpenIndex={setOpenIndex}
                      />
                    ))}
                  </div>
                ))}
              </div>
            ) : (
              // Render Swiper for desktop
              <Swiper
                direction={"vertical"}
                slidesPerView={1}
                spaceBetween={0}
                // mousewheel={true}
                // onReachEnd={onReachEnd}
                // onFromEdge={onFromEdge}
                pagination={{
                  clickable: true,
                }}
                onSlideChange={(e) => {
                  console.log(e);
                  $(".swiper-pagination .swiper-pagination-bullet").removeClass(
                    "swiper-pagination-bullet-active"
                  );
                  $(".swiper-pagination .swiper-pagination-bullet")
                    .eq(e.snapIndex)
                    .addClass("swiper-pagination-bullet-active");
                }}
                onSwiper={(swiper) => {
                  setswiperObject(swiper);
                }}
                className="owl_cstm_style"
              >
                <SwiperSlide>
                  <video id="custvideo1" muted autoPlay loop playsInline>
                    <source
                      src="https://revoltmotors.s3.ap-south-1.amazonaws.com/rv1.mp4"
                      type="video/mp4"
                    />
                    <source
                      src="https://revoltmotors.s3.ap-south-1.amazonaws.com/rv1.ogg"
                      type="video/ogg"
                    />
                  </video>
                </SwiperSlide>

                {featureDetails.map((slideData, slideIndex) => (
                  <SwiperSlide key={slideIndex}>
                    <div
                      className="rightbar_slide"
                      style={{ position: "relative" }}
                    >
                      <picture>
                        <img
                          src={`/images/green_${slideIndex === 0 ? "front" : slideIndex === 1 ? "left" : "back"}.png`}
                          alt="Suspension"
                        />
                      </picture>
                      {slideData.map(({ top, left, content }, index) => (
                        <Marker
                          className="marker-container"
                          key={index}
                          id={`modal-${slideIndex}-${index}`}
                          location={{ top, left }}
                          title={content.title}
                          description={content.description()}
                          image={content.img}
                          isOpen={openIndex === `${slideIndex}-${index}`}
                          onClick={() =>
                            setOpenIndex(
                              openIndex === `${slideIndex}-${index}`
                                ? null
                                : `${slideIndex}-${index}`
                            )
                          }
                          setOpenIndex={setOpenIndex}
                        />
                      ))}
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </div>
        </div>
      </section>
      {/* <section className="bs-main-section ccCompareSection custom-pricing-container">
        <PricingComparison
          selectedBikeSecond={selectedBikeSecond}
          setSelectedBikeSecond={setSelectedBikeSecond}
          selectedBikeFirst={selectedBikeFirst}
          setSelectedBikeFirst={setSelectedBikeFirst}
        />
      </section> */}

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
                    className="expandText active"
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
                    <div className="expand-text ">Expand Specs</div>
                    <div className="border-div">
                      <div className="borders">
                        <i className="fa fa-plus"></i>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="product-feature"
                  id="product-feature"
                  style={{ display: "block" }}
                >
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
                            <p> Front 90/80-17 /Rear - 110/80-17</p>
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
                            <p>Telescopic Forks</p>
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
                            <p>Twin Shocker</p>
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
                            <h6>Battery Capacity</h6>
                            <p> 2.2 KWh</p>
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
                            <h6>Normal Charging</h6>
                            <p>0-80% in 2 Hrs 15 Mins </p>
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
                            <p>Peak 2.8KW (Mid Drive)</p>
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
                            <h6>Kerb Weight</h6>
                            <p>108Kg</p>
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
                            <p>790mm</p>
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
                            <p>2 Persons/Maximum 250Kg</p>
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
                              LED Head Lamp, Tail Lamps, Indicators and Licence
                              Plate Light (All LED)
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
                            <p>180 mm</p>
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
                            <p>100kms(Eco Mode)</p>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-4 pl-0 pr-0 ">
                        <div className="box-page-bn ">
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
                        <div className="box-page-bn">
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
                        <div className="box-page-bn">
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
                      <div className="col-md-4 pl-0 pr-0 ">
                        <div className="box-page-bn">
                          <div className="box-imgs">
                            <img
                              src="/images/ignition.png"
                              alt="Ignition Icon"
                            />
                          </div>
                          <div className="box-cont">
                            <h6>Ignition Type</h6>
                            <p>Mechanical Key</p>
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
        </div>
      </section>

      {/* Revolt Sound */}
      {/* <RevoltSound></RevoltSound> */}
      {/* Revolt Sound */}

      {/* <section className="brz-bike bike-info padding-top-100 padding-bottom-100">
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

      <div className="bike-InsideSection bike-info-card-section">
        <div className="container">
          <h3>Pick your colour</h3>
          <div className="row">
            <div className="col-12 col-md-12">
              <div className="product-card rv rv1-product">
                <div className="product-head text-center">
                  <div className="img-slider">
                    <div className="img-slider-feature">
                      {/* <img
                      width="140"
                      src={"/images/view360.webp"}
                      data-toggle="modal"
                      data-target="#exampleModal"
                      className="view360"
                    /> */}
                      <Slider
                        asNavFor={nav1}
                        speed={1200}
                        dots={true}
                        arrows={false}
                        beforeChange={(oldIndex, newIndex) =>
                          imageChanged(newIndex)
                        }
                      >
                        <div className="item" data-hash="zero">
                          <div className="sli-img">
                            <img
                              alt="RV1 Bike"
                              width="600"
                              height="338"
                              src="/images/home-product/rv1/01.png"
                            />
                          </div>
                        </div>
                        <div className="item" data-hash="one">
                          <div className="sli-img">
                            <img
                              alt="RV1 Bike"
                              width="600"
                              height="338"
                              src="/images/home-product/rv1/02.webp"
                            />
                          </div>
                        </div>
                        <div className="item" data-hash="two">
                          <div className="sli-img">
                            <img
                              alt="RV1 Bike"
                              width="600"
                              height="338"
                              src="/images/home-product/rv1/03.webp"
                            />
                          </div>
                        </div>
                        <div className="item" data-hash="three">
                          <div className="sli-img">
                            <img
                              alt="RV1 Bike"
                              width="600"
                              height="338"
                              src="/images/home-product/rv1/04.webp"
                            />
                          </div>
                        </div>
                      </Slider>
                      <div
                        className={`colour-length-features ${showColor ? "show" : ""}`}
                      >
                        {Object.keys(colorRV1).length ? (
                          <h5>
                            <strong></strong> {colorRV1?.color}
                          </h5>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RevoltRv1;
