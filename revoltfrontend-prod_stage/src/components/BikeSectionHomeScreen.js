import { Link } from "react-router-dom";
import Slider from "react-slick";
import { useEffect, useRef, useState } from "react";
import React from "react";
import $ from "jquery";
import "aos/dist/aos.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useNavigate } from "react-router-dom";
import "./css/accordian.css";
import "./css/BikeSectionHomeScreen.css";
const RevoltSound = React.lazy(() => import("./RevoltSound"));
const EvStatistics = React.lazy(() => import("./ev_ice_comparision"));
const AIIntelligence = React.lazy(() => import("./AIIntelligence"));
const Gallery = React.lazy(() => import("./Gallery"));
const RevoltMap = React.lazy(() => import("./revoltmap"));

const BikeSection = () => {
  const navigate = useNavigate();
  const [nav1, setNav1] = useState();
  const [nav2, setNav2] = useState();
  const [showLaunch, setShowLaunch] = useState(false);
  const [loadContent, setLoadContent] = useState(false);

  const [show360Modal, setShow360Modal] = useState(false);
  const modalRef = useRef(null);
  const [ThreeSixtyScriptLoadedOnce, setThreeSixtyScriptLoadedOnce] =
    useState(false);

  ////////////////////NEW CODE/////////////
  const [showMore, setShowMore] = useState({
    para2: true,
    para3: true,
  });
  ///////////////////////////////////

  function loadScript(url) {
    return new Promise(function (resolve, reject) {
      let script = document.createElement("script");
      script.setAttribute("class", "dynamicJS");
      script.setAttribute("defer", true);
      script.id = "ThreeSixtyDegreeModalScript";
      script.src = url;
      script.async = false;
      script.onload = function () {
        if (url === "/js/loadImages.js") {
          setThreeSixtyScriptLoadedOnce(true);
        }
        resolve(url);
      };
      script.onerror = function () {
        reject(url);
      };
      document.body.appendChild(script);
    });
  }

  useEffect(() => {
    // Custom Js Function...
    $(".sw-patch").on("click", function () {
      $(".sw-patch").removeClass("active");
      $(this).addClass("active");

      $(".block-search").removeClass("active");
      var id = $(this).attr("data-block");
      $(id).addClass("active");
    });

    const contentLoader = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          // Each entry describes an intersection change for one observed
          // target element:
          //   entry.boundingClientRect
          //   entry.intersectionRatio
          //   entry.intersectionRect
          if (entry.isIntersecting) {
            setLoadContent(true);
          }
          //   entry.rootBounds
          //   entry.target
          //   entry.time
        });
      },
      {
        rootMargin: "0px",
        threshold: 1.0,
      }
    );
    const content_loader = document.querySelector("#content-loader");
    contentLoader.observe(content_loader);

    // contentLoader.observe(content_loader, ()=>{

    // })

    // loadScript("/js/loadImages.js").then(() =>
    //   console.log("Images loadded..................")
    // );
    // document
    // .querySelectorAll(".threesixty_images img")
    // .forEach((image) => {
    //   if (!image.getAttribute("src")) {
    //     image.setAttribute("src", image.getAttribute("data-src"));
    //   }
    // });

    // if(!document.querySelector(".revolt-sound source").getAttribute('src')){
    //   Array.from(document.querySelectorAll(".revolt-sound source")).forEach((element, index)=>{
    //     document.querySelectorAll(".revolt-sound audio")[index].src=element.getAttribute('audio-src')
    // })
    //   Array.from(document.querySelectorAll("video")).forEach((element, index)=>{
    //     element.src = document.querySelectorAll("video source")[index].getAttribute("video-src")
    //   })
    // }
  }, []);

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setShow360Modal(false);
    }
  };

  useEffect(() => {
    if (show360Modal) {
      // Attach the event listener when the modal is open
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Cleanup the event listener on component unmount or when the modal closes
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [show360Modal]);

  return (
    <>
      {/* <ImportScript />{" "} */}
      <section className="bike-info-card-section">
        <div className="container ">
          <h1>Ride the Future Today</h1>
          <div className="row">
            <div className="col-12 col-md-6">
              <div className="product-card rv rv1-product">
                <div className="product-head text-center">
                  <div className="img-slider">
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
                    >
                      <div className="item" data-hash="zero">
                        <div className="sli-img">
                          <img
                            loading="lazy"
                            alt="RV1 Bike"
                            width="600"
                            height="338"
                            src="/images/home-product/rv1/01.webp"
                            loading="lazy"
                          />
                        </div>
                      </div>
                      <div className="item" data-hash="one">
                        <div className="sli-img">
                          <img
                            loading="lazy"
                            alt="RV1 Bike"
                            width="600"
                            height="338"
                            src="/images/home-product/rv1/02.webp"
                            loading="lazy"
                          />
                        </div>
                      </div>
                      <div className="item" data-hash="two">
                        <div className="sli-img">
                          <img
                            loading="lazy"
                            alt="RV1 Bike"
                            width="600"
                            height="338"
                            src="/images/home-product/rv1/03.webp"
                            loading="lazy"
                          />
                        </div>
                      </div>
                      <div className="item" data-hash="two">
                        <div className="sli-img">
                          <img
                            loading="lazy"
                            alt="RV1 Bike"
                            width="600"
                            height="338"
                            src="/images/home-product/rv1/04.webp"
                            loading="lazy"
                          />
                        </div>
                      </div>
                    </Slider>
                  </div>
                </div>
                <div className="product-body">
                  <h3 className="bike-model">Revolt RV1 </h3>

                  <p>Introductory Pricing ₹84,990* </p>
                  {/* <p> Own at ₹ 3,299/month*</p> */}
                </div>

                <div id="content-loader" className="product-footer">
                  <div className="product-bike-info">
                    <ul>
                      <li>
                        <img
                          loading="lazy"
                          src="/images/calenderhours.svg"
                          width="20"
                          height="20"
                          // alt="Calender Hours"
                          loading="lazy"
                        />
                        <p>0-80%</p>
                        <h5>IN 2 Hrs 15 Mins</h5>
                      </li>
                      <li>
                        {" "}
                        <img
                          loading="lazy"
                          src="/images/speed.svg"
                          width="20"
                          height="22"
                          alt="Electric Motorcycle Speed"
                          loading="lazy"
                        />
                        <p>
                          70 KM/H{""}
                          <span data-title="Ideal Driving Conditions">*</span>
                        </p>
                        <h5>TOP SPEED</h5>
                      </li>
                      <li>
                        {" "}
                        <img
                          loading="lazy"
                          src="/images/battery.svg"
                          width="20"
                          height="19"
                          alt="Motorcycle Battery Lifespan"
                          loading="lazy"
                        />
                        <p>
                          100 KMS
                          <span data-title="Ideal Driving Conditions">*</span>
                        </p>
                        <h5>Per Charge</h5>
                      </li>
                    </ul>
                  </div>

                  <button
                    type="button"
                    className="book-now"
                    onClick={() => {
                      navigate("/book" + window.location.search);
                    }}
                  >
                    Book Now
                  </button>

                  <Link to="/rv1"> Explore RV1</Link>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="product-card rvp rv1-product">
                <div className="product-head text-center">
                  <div className="img-slider">
                    <Slider
                      asNavFor={nav1}
                      speed={1200}
                      dots={true}
                      arrows={false}
                    >
                      <div className="item" data-hash="zero">
                        <div className="sli-img">
                          <img
                            loading="lazy"
                            alt="RV1 Plus Bike"
                            width="600"
                            height="338"
                            src="/images/home-product/rvp/04.webp"
                            loading="lazy"
                          />
                        </div>
                      </div>
                      <div className="item" data-hash="one">
                        <div className="sli-img">
                          <img
                            loading="lazy"
                            alt="RV1 Plus Bike"
                            width="600"
                            height="338"
                            src="/images/home-product/rvp/02.webp"
                            loading="lazy"
                          />
                        </div>
                      </div>
                      <div className="item" data-hash="two">
                        <div className="sli-img">
                          <img
                            loading="lazy"
                            alt="RV1 Plus Bike"
                            width="600"
                            height="338"
                            src="/images/home-product/rvp/03.webp"
                            loading="lazy"
                          />
                        </div>
                      </div>
                      <div className="item" data-hash="two">
                        <div className="sli-img">
                          <img
                            loading="lazy"
                            alt="RV1 Plus Bike"
                            width="600"
                            height="338"
                            src="/images/home-product/rvp/01.webp"
                            loading="lazy"
                          />
                        </div>
                      </div>
                    </Slider>
                  </div>
                </div>
                <div className="product-body">
                  <h3 className="bike-model">Revolt RV1+</h3>
                  <p>Introductory Pricing ₹ 99,990* </p>
                  {/* <p>Own at ₹ 3,999/month*</p> */}
                </div>

                <div className="product-footer">
                  <div className="product-bike-info">
                    <ul>
                      <li>
                        <img
                          loading="lazy"
                          src="/images/calenderhours.svg"
                          width="20"
                          height="20"
                          // alt="Calender Hours"
                          loading="lazy"
                        />
                        <p>0-80%</p>
                        <h5>In 3 Hrs 30 Mins</h5>
                      </li>
                      <li>
                        {" "}
                        <img
                          loading="lazy"
                          src="/images/fast-charging.png"
                          width="20"
                          height="20"
                          alt="Revolt Bike Fast Charging"
                          loading="lazy"
                        />
                        <p className="fastCharging">
                          <span className="charge">Fast Charging </span>
                          <span>0-80%</span>
                        </p>
                        <h5> In 1 Hrs 20 Mins</h5>
                      </li>
                      <li>
                        {" "}
                        <img
                          loading="lazy"
                          src="/images/speed.svg"
                          width="20"
                          height="22"
                          alt="Electric Motorcycle Speed"
                          loading="lazy"
                        />
                        <p>
                          70 KM/H{""}
                          <span data-title="Ideal Driving Conditions">*</span>
                        </p>
                        <h5>TOP SPEED</h5>
                      </li>
                      <li>
                        {" "}
                        <img
                          loading="lazy"
                          src="/images/battery.svg"
                          width="20"
                          height="19"
                          alt="Motorcycle Battery Lifespan"
                          loading="lazy"
                        />
                        <p>
                          160 KMS
                          <span data-title="Ideal Driving Conditions">*</span>
                        </p>
                        <h5>Per Charge</h5>
                      </li>
                    </ul>
                  </div>

                  <button
                    type="button"
                    className="book-now"
                    onClick={() => {
                      navigate("/book" + window.location.search);
                    }}
                  >
                    Book Now
                  </button>
                  <Link to="/rv1plus"> Explore RV1+</Link>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-md-6">
              <div className="product-card brz-product">
                <div className="product-head text-center">
                  <div className="img-slider">
                    <Slider
                      asNavFor={nav1}
                      speed={1200}
                      dots={true}
                      arrows={false}
                    >
                      <div className="item" data-hash="zero">
                        <div className="sli-img">
                          <img
                            loading="lazy"
                            alt="rv400 BRZ Bike"
                            width="600"
                            height="338"
                            src="/images/home-product/brz/01.webp"
                            loading="lazy"
                          />
                        </div>
                      </div>
                      <div className="item" data-hash="one">
                        <div className="sli-img">
                          <img
                            loading="lazy"
                            alt="rv400 BRZ Bike"
                            width="600"
                            height="338"
                            src="/images/home-product/brz/02.webp"
                            loading="lazy"
                          />
                        </div>
                      </div>
                      <div className="item" data-hash="two">
                        <div className="sli-img">
                          <img
                            loading="lazy"
                            alt="rv400 BRZ Bike"
                            width="600"
                            height="338"
                            src="/images/home-product/brz/03.webp"
                            loading="lazy"
                          />
                        </div>
                      </div>
                      <div className="item" data-hash="two">
                        <div className="sli-img">
                          <img
                            loading="lazy"
                            alt="rv400 BRZ Bike"
                            width="600"
                            height="338"
                            src="/images/home-product/brz/04.webp"
                            loading="lazy"
                          />
                        </div>
                      </div>
                      <div className="item" data-hash="two">
                        <div className="sli-img">
                          <img
                            loading="lazy"
                            alt="rv400 BRZ Bike"
                            width="600"
                            height="338"
                            src="/images/home-product/brz/05.webp"
                            loading="lazy"
                          />
                        </div>
                      </div>
                    </Slider>
                  </div>
                </div>
                <div className="product-body">
                  <h3 className="bike-model">Revolt RV400 BRZ</h3>
                  <p className="rvtooltip">
                    Pricing ₹1,03,750*
                    <span className="rvtooltiptext">
                      *T&C Apply | Limited period pricing in Delhi incl. state
                      subsidy
                    </span>
                  </p>

                  {/* <p>Own at ₹ 3,777/month*</p> */}
                </div>

                <div className="product-footer">
                  <div className="product-bike-info">
                    <ul>
                      <li>
                        <img
                          loading="lazy"
                          src="/images/calenderhours.svg"
                          width="20"
                          height="20"
                          // alt="Calender Hours"
                          loading="lazy"
                        />
                        <p>0-80%</p>
                        <h5>In 3 Hrs 30 Mins</h5>
                      </li>
                      <li>
                        {" "}
                        <img
                          loading="lazy"
                          src="/images/fast-charging.png"
                          width="20"
                          height="20"
                          // alt="Revolt Bike Fast Charging"
                          loading="lazy"
                        />
                        <p className="fastCharging">
                          <span className="charge">Fast Charging </span>
                          <span>0-80%</span>
                        </p>
                        <h5> In 1 Hrs 20 Mins</h5>
                      </li>
                      <li>
                        {" "}
                        <img
                          loading="lazy"
                          src="/images/speed.svg"
                          width="20"
                          height="22"
                          // alt="Electric Motorcycle Speed"
                          loading="lazy"
                        />
                        <p>
                          85 KM/H{""}
                          <span data-title="Ideal Driving Conditions">*</span>
                        </p>
                        <h5>TOP SPEED</h5>
                      </li>
                      <li>
                        {" "}
                        <img
                          loading="lazy"
                          src="/images/battery.svg"
                          width="20"
                          height="19"
                          // alt="Motorcycle Battery Lifespan"
                          loading="lazy"
                        />
                        <p>
                          150 KMS
                          <span data-title="Ideal Driving Conditions">*</span>
                        </p>
                        <h5>Per Charge</h5>
                      </li>
                    </ul>
                  </div>

                  <button
                    type="button"
                    className="book-now"
                    onClick={() => {
                      navigate("/book" + window.location.search);
                    }}
                  >
                    Book Now
                  </button>
                  <Link to="/rv400-brz"> Explore RV400 BRZ</Link>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="product-card rv400-product">
                <div className="product-head text-center">
                  <div className="img-slider">
                    <img
                      loading="lazy"
                      src={"/images/view360.webp"}
                      // data-toggle="modal"
                      // data-target="#exampleModal"

                      width="100"
                      height="36"
                      className="view360"
                      onClick={() => {
                        setShow360Modal(!show360Modal);
                        if (ThreeSixtyScriptLoadedOnce === false) {
                          loadScript("/js/loadImages.js");
                        }
                      }}
                    />
                    <Slider
                      asNavFor={nav1}
                      speed={1200}
                      dots={true}
                      arrows={false}
                    >
                      <div className="item" data-hash="zero">
                        <div className="sli-img">
                          <img
                            loading="lazy"
                            src="/images/home-product/rv400/01.webp"
                            width="600"
                            height="338"
                            // alt="rv400 Bike"
                          />
                        </div>
                      </div>
                      <div className="item" data-hash="one">
                        <div className="sli-img">
                          <img
                            loading="lazy"
                            src="/images/home-product/rv400/02.webp"
                            width="600"
                            height="338"
                            // alt="rv400 Bike"
                          />
                        </div>
                      </div>
                      <div className="item" data-hash="two">
                        <div className="sli-img">
                          <img
                            loading="lazy"
                            src="/images/home-product/rv400/03.webp"
                            width="600"
                            height="338"
                            // alt="rv400 Bike"
                          />
                        </div>
                      </div>
                      <div className="item" data-hash="two">
                        <div className="sli-img">
                          <img
                            loading="lazy"
                            src="/images/home-product/rv400/04.webp"
                            width="600"
                            height="338"
                            // alt="rv400 Bike"
                          />
                        </div>
                      </div>
                      <div className="item" data-hash="two">
                        <div className="sli-img">
                          <img
                            loading="lazy"
                            src="/images/home-product/rv400/05.webp"
                            width="600"
                            height="338"
                            // alt="rv400 Bike"
                          />
                        </div>
                      </div>
                    </Slider>
                  </div>
                </div>
                <div className="product-body">
                  <h3 className="bike-model">Revolt RV400 </h3>
                  <p className="rvtooltip">
                    Pricing ₹ 1,20,750*
                    <span className="rvtooltiptext">
                      *T&C Apply | Limited period pricing in Delhi incl. state
                      subsidy
                    </span>
                  </p>

                  {/* <p> Own at ₹ 4,444/month*</p> */}
                </div>

                <div className="product-footer">
                  <div className="product-bike-info">
                    <ul>
                      <li>
                        <img
                          loading="lazy"
                          src="/images/calenderhours.svg"
                          width="20"
                          height="20"
                          // alt="Calender Hours"
                        />
                        <p>0-80%</p>
                        <h5>In 3 Hrs 30 Mins</h5>
                      </li>
                      <li>
                        {" "}
                        <img
                          loading="lazy"
                          src="/images/fast-charging.png"
                          width="20"
                          height="20"
                          // alt="Revolt Bike Fast Charging"
                        />
                        <p className="fastCharging">
                          <span className="charge">Fast Charging </span>
                          <span>0-80%</span>
                        </p>
                        <h5> In 1 Hrs 20 Mins</h5>
                      </li>
                      <li>
                        {" "}
                        <img
                          loading="lazy"
                          src="/images/speed.svg"
                          width="20"
                          height="22"
                          // alt="Electric Motorcycle Speed"
                        />
                        <p>
                          85 KM/H{""}
                          <span data-title="Ideal Driving Conditions">*</span>
                        </p>
                        <h5>TOP SPEED</h5>
                      </li>
                      <li>
                        {" "}
                        <img
                          loading="lazy"
                          src="/images/battery.svg"
                          width="20"
                          height="19"
                          // alt="Motorcycle Battery Lifespan"
                        />
                        <p>
                          150 KMS
                          <span data-title="Ideal Driving Conditions">*</span>
                        </p>
                        <h5>Per Charge</h5>
                      </li>
                      <li>
                        {" "}
                        <img
                          loading="lazy"
                          style={{ maxWidth: "13px" }}
                          src="/images/phone.svg"
                          width="13"
                          height="23"
                          // alt="RV400 Mobile App"
                        />
                        <p style={{ textTransform: "capitalize" }}>
                          mobile app
                        </p>
                        <h5>
                          WITH SMART
                          <br /> FEATURES
                        </h5>
                      </li>
                    </ul>
                  </div>

                  <button
                    type="button"
                    className="book-now"
                    onClick={() => {
                      navigate("/book?model=RV400");
                    }}
                  >
                    Book Now
                  </button>

                  <Link to="/rv400"> Explore RV400</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="LaunchVideoSection">
        <div className="container" onClick={() => setShowLaunch(true)}>
          <div className="mob-content text-center">
            <h3>
              Watch the Launch of India's First
              <br /> Electric Commuter Motorcycle
            </h3>
          </div>

          <div className="row">
            <div className="col-sm-12">
              <div className="LaunchVideoBlock text-center">
                {/* <a
                  target="_blank"
                  href="https://www.youtube.com/watch?v=_UuT2814vx8"
                > */}
                <figure>
                  <img
                    loading="lazy"
                    src="/images/Event_Banner_02.webp"
                    width="1280"
                    height="511"
                    alt="Electric Commuter Motorcycle"
                    className="img-fluid"
                  />{" "}
                  <span className="playIcon">
                    <img
                      width="60"
                      height="60"
                      alt="Play Video"
                      src="/images/PlayIcon.svg"
                    />
                  </span>
                </figure>
                {/* </a> */}
              </div>
            </div>
          </div>
        </div>
        {showLaunch ? (
          <div className="LaunchPopUp">
            <p className="close" onClick={() => setShowLaunch(false)}>
              X
            </p>
            <div style={{ Left: "20px", paddingRight: "20px", width: "100%" }}>
              <iframe
                width="560"
                height="415"
                src="https://www.youtube.com/embed/_UuT2814vx8?autoplay=1"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
              ></iframe>
            </div>
          </div>
        ) : null}
      </section>
      <>
        <AIIntelligence dataClass=""></AIIntelligence>
        <section className="page-section padding-top-100">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6 col-12 col-md-6 col-sm-12">
                <div className="mob-content">
                  <h3>
                    WHY CHOOSE <br />
                    REVOLT
                  </h3>
                </div>
                <div className="why-chosse">
                  <div className="wc-slider">
                    <Slider
                      arrows={false}
                      asNavFor={nav2}
                      ref={(slider1) => setNav1(slider1)}
                      speed={1200}
                    >
                      <div className="item" data-hash="zero">
                        <div className="slider-items">
                          <h6>FAST CHARGING</h6>
                          <h3>0-80%</h3>
                          <h4>IN 1 HRS 20 MINS</h4>
                          <p>
                            Revolt motorcycles’ lithium-ion batteries have been
                            made keeping in mind the riding behavior and usage
                            of the Indian riders. The batteries have been
                            certified as waterproof, damage proof, shock proof
                            and all-weather friendly according to ARAI
                            standards. It's the power which powers Revolt.
                          </p>
                        </div>
                      </div>
                      <div className="item" data-hash="one">
                        <div className="slider-items">
                          <h6>PERFORMANCE</h6>
                          <h3>85 km/h*</h3>
                          <h4>OF TOP SPEED WITH AN INCREDIBLE TORQUE</h4>
                          <p>
                            A motor which pumps adrenaline into a design and
                            body which are first of its kind in the industry.
                          </p>
                        </div>
                      </div>
                      <div className="item" data-hash="two">
                        <div className="slider-items">
                          <h6>CHARGING</h6>
                          <h3>
                            160 kms<sup>*</sup>
                          </h3>
                          <h4>PER CHARGE</h4>
                          <p>
                            Charge the RV1+ battery like a phone when a dead
                            battery gets you grounded, just send us an SOS
                            battery request. We've made sure that you are always
                            in charge.
                          </p>
                        </div>
                      </div>
                    </Slider>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-12 col-md-6 col-sm-12">
                <div className="img-slider">
                  <Slider
                    asNavFor={nav1}
                    ref={(slider2) => setNav2(slider2)}
                    speed={1200}
                  >
                    <div className="item" data-hash="zero">
                      <div className="sli-img">
                        <img
                          loading="lazy"
                          alt="Revolt Battery Charger"
                          src="/images/battery-perfomance-v1.jpg"
                        />
                      </div>
                    </div>
                    <div className="item" data-hash="one">
                      <div className="sli-img">
                        <img
                          loading="lazy"
                          alt="RV400 Electric Bike"
                          src="/images/performance-new-v1.jpg"
                        />
                      </div>
                    </div>
                    <div className="item" data-hash="two">
                      <div className="sli-img">
                        <img
                          loading="lazy"
                          alt="Rechargeable Electric Bike
"
                          src="/images/revolt-slideimage-v1.jpg"
                        />
                      </div>
                    </div>
                  </Slider>
                </div>
              </div>
            </div>
          </div>
        </section>
        {loadContent ? (
          <div>
            <RevoltSound loadScript={loadScript} />
            <section className="ev_saving_saction">
              <EvStatistics />
            </section>
            <section className="home_video_section">
              <div className="home_video_block">
                <div className="container">
                  {" "}
                  <div className="mob-content">
                    <h3>
                      THE PERFECT DESIGNED
                      <br /> MACHINE
                    </h3>
                  </div>
                  <div className="row">
                    <div className="col-12 col-md-4">
                      <div className="lightgray">
                        <div className="row">
                          <div className="col-md-12">
                            {" "}
                            <div id="frame_ideo" className="">
                              <video
                                autoPlay
                                loop
                                muted
                                playsInline
                                autobuffer="true"
                              >
                                <source
                                  src="/images/Revolt_light_Frame.mp4"
                                  type="video/mp4"
                                />
                              </video>
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="">
                              <div className="">
                                <h4>HIGH-STRENGTH FRAME</h4>
                                <p>
                                  High strength cradle frame for control, safety
                                  and durability.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-md-4">
                      <div className="lightgray">
                        <div className="row">
                          <div className="col-sm-12 ">
                            <div id="battery_video" className=" ">
                              <video
                                autoPlay
                                loop
                                muted
                                playsInline
                                autobuffer="true"
                              >
                                <source
                                  src="/images/Revolt_Battery.mp4"
                                  type="video/mp4"
                                />
                              </video>
                            </div>
                          </div>
                          <div className="col-sm-12">
                            <div className="">
                              <div className="">
                                <h4>
                                  CENTRE OF GRAVITY PRECISELY PLACED FOR THE
                                  PERFECT RIDE
                                </h4>
                                <p>
                                  {showMore.para2
                                    ? "RV400's structure has been designed around the\
                            dynamics of a sports bike."
                                    : "RV400's structure has been designed around the\
                            dynamics of a sports bike. The battery being the\
                            heaviest has been kept high enough to maintain a\
                            centre of gravity that helps you in handling tight\
                            corners and everyday city traffic problems."}
                                  <span
                                    style={{
                                      color: "#1daba1",
                                      fontWeight: "600",
                                      cursor: "pointer",
                                      transition: "0.5s ease-in-out",
                                    }}
                                    onClick={() => {
                                      setShowMore({
                                        ...showMore,
                                        para2: !showMore.para2,
                                      });
                                    }}
                                  >
                                    {showMore.para2 ? "show more" : "show less"}
                                  </span>
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-md-4">
                      {" "}
                      <div className="lightgray">
                        {" "}
                        <div className="row">
                          <div id="chain_video" className="col-12">
                            <video
                              autoPlay
                              loop
                              muted
                              playsInline
                              autobuffer="true"
                            >
                              <source
                                src="/images/Revolt_Chain.mp4"
                                type="video/mp4"
                              />
                            </video>
                          </div>
                          <div className="col-12">
                            <div className="">
                              <h4>THE DRIVE TRAIN POWERHOUSE</h4>
                              <p>
                                {showMore.para3
                                  ? "Explore the RV400’s power through a robust 3KW\
                          mid-drive motor which is capable of generating 170 Nm\
                          "
                                  : "Explore the RV400’s power through a robust 3KW\
                          mid-drive motor which is capable of generating 170 Nm\
                          torque and is equipped with a sprocket belt drive. The\
                          highly durable belt with a really long life will make\
                          you forget lubrications and chain hassles for life."}
                                <span
                                  style={{
                                    color: "#1daba1",
                                    fontWeight: "600",
                                    cursor: "pointer",
                                    transition: "0.5s ease-in-out",
                                  }}
                                  onClick={() => {
                                    setShowMore({
                                      ...showMore,
                                      para3: !showMore.para3,
                                    });
                                  }}
                                >
                                  {showMore.para3 ? "show more" : "show less"}
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        ) : null}
      </>
      <Gallery></Gallery>
      <RevoltMap></RevoltMap>
      {/* <div className="home-accordian">
        <FAQAccordion />
      </div> */}
      <section className="batch-4">
        <div className="container-fluid">
          <div className="row all-p-0">
            <div className="col-6 col-sm-6 col-md-6 col-lg-3">
              <div className="link-sec">
                <Link to="/test-ride">
                  <div className="d-flex align-items-center justify-content-center">
                    <div className="logo-f lo-1" />
                    <div className="lp-cont">Schedule A Test Ride</div>
                  </div>
                </Link>
              </div>
            </div>
            <div className="col-6 col-sm-6 col-md-6 col-lg-3">
              <div className="link-sec">
                <Link to="/notifyme">
                  <div className="d-flex align-items-center justify-content-center">
                    <div className="logo-f lo-2" />
                    <div className="lp-cont">Unlock Your City</div>
                  </div>
                </Link>
                {/* <Link to="/verify">
                  <div className="d-flex align-items-center justify-content-center">
                    <div className="logo-f lo-2" />
                    <div className="lp-cont">Upgrade Option</div>
                  </div>
                </Link> */}

                {/* <Link to="/about-us">
                                  <div className="d-flex align-items-center justify-content-center">
                                      <div className="logo-f lo-2" />
                                      <div className="lp-cont">
                                      About Us
                                      </div>
                                  </div>
                              </Link> */}
              </div>
            </div>
            <div className="col-6 col-sm-6 col-md-6 col-lg-3">
              <div className="link-sec">
                <Link to={"/press"}>
                  <div className="d-flex align-items-center justify-content-center">
                    <div className="logo-f lo-3" />
                    <div className="lp-cont">Media</div>
                  </div>
                </Link>
              </div>
            </div>
            <div className="col-6 col-sm-6 col-md-6 col-lg-3">
              <div className="link-sec">
                <Link to="/contact-us">
                  <div className="d-flex align-items-center justify-content-center">
                    <div className="logo-f lo-4" />
                    <div className="lp-cont">Contact Us</div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="ThreeSixtyModal">
        <div
          id="myModal"
          className="modal"
          style={{ display: show360Modal ? "flex" : "none" }}
        >
          <div className="modal-content" ref={modalRef}>
            <button className="close" onClick={() => setShow360Modal(false)}>
              <img src="/images/close.svg" width="" height="" />
            </button>
            <div className="modal-body">
              <div className="container">
                <div className="row align-items-center">
                  <div className="col-lg-12">
                    <div className="row align-items-center">
                      <div className="col-lg-12 col-12 col-sm-12 col-md-12 text-center">
                        <div className="bike-switch">
                          <div className="data-switch">
                            <div
                              className="sw-patch red-bl active"
                              data-block="#redtheme"
                            >
                              <div className="sw-block">
                                <div className="dot-sw red" />
                                <div className="dot-co">Eclipse Red</div>
                              </div>
                            </div>
                            <div
                              className="sw-patch black-bl"
                              data-block="#blacktheme"
                            >
                              <div className="sw-block">
                                <div className="dot-sw black" />
                                <div className="dot-co">Cosmic Black</div>
                              </div>
                            </div>
                            <div
                              className="sw-patch gray-bl"
                              data-block="#whitetheme"
                            >
                              <div className="sw-block">
                                <div className="dot-sw gray" />
                                <div className="dot-co">Mist Grey</div>
                              </div>
                            </div>
                            <div
                              className="sw-patch gray-bl"
                              data-block="#bluetheme"
                            >
                              <div className="sw-block">
                                <div className="dot-sw blue" />
                                <div className="dot-co">India Blue</div>
                              </div>
                            </div>
                            <div
                              className="sw-patch gray-bl"
                              data-block="#stealththeme"
                            >
                              <div className="sw-block">
                                <div className="dot-sw stealth" />
                                <div className="dot-co">Stealth Black</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-sm-12 col-md-12">
                        <div className="bike-filter">
                          <div className="filter-tabbing">
                            <div id="redtheme" className="block-search active">
                              <div className="redBike">
                                <section className="my-360s">
                                  <div className="cd-product-viewer-wrapper">
                                    <section className="container-fluid-no for-360 container1">
                                      <div className="threesixty product1">
                                        <div className="loadingimg text-center">
                                          <img
                                            loading="lazy"
                                            src="/images/eclipse-red/1.png"
                                            alt="Revolt RV400.container1 .threesixty"
                                            style={{ maxWidth: "600" }}
                                          />
                                        </div>
                                        <div className="spinner">
                                          <span>0%</span>
                                        </div>
                                        <ol
                                          className="threesixty_images"
                                          title="Drag to Rotate"
                                        />
                                      </div>
                                    </section>
                                  </div>
                                </section>
                              </div>
                            </div>
                            <div id="blacktheme" className="block-search">
                              <div className="blackBike">
                                <section className="my-360">
                                  <div className="cd-product-viewer-wrapper">
                                    <section className="container-fluid-no for-360 container1">
                                      <div className="threesixty product2">
                                        <div className="loadingimg text-center">
                                          <img
                                            loading="lazy"
                                            src="/images/cosmic-black/1.png"
                                            alt="RV 400 Electric Bike"
                                            style={{ maxWidth: "600px" }}
                                          />
                                        </div>
                                        <div className="spinner">
                                          <span>0%</span>
                                        </div>
                                        <ol
                                          className="threesixty_images"
                                          title="Drag to Rotate"
                                        />
                                      </div>
                                    </section>
                                  </div>
                                </section>
                              </div>
                            </div>
                            <div id="whitetheme" className="block-search">
                              <div className="whiteBike">
                                <section className="my-360">
                                  <div className="cd-product-viewer-wrapper">
                                    <section className="container-fluid-no for-360 container1">
                                      <div className="threesixty product3">
                                        <div className="loadingimg text-center">
                                          <img
                                            loading="lazy"
                                            src="/images/mist_grey/1.png"
                                            alt="RV 400 Electric Bike"
                                            style={{ maxWidth: "600" }}
                                          />
                                        </div>
                                        <div className="spinner">
                                          <span>0%</span>
                                        </div>
                                        <ol
                                          className="threesixty_images"
                                          title="Drag to Rotate"
                                        />
                                      </div>
                                    </section>
                                  </div>
                                </section>
                              </div>
                            </div>

                            <div id="bluetheme" className="block-search">
                              <div className="blueBike">
                                <section className="my-360">
                                  <div className="cd-product-viewer-wrapper">
                                    <section className="container-fluid-no for-360 container1">
                                      <div className="threesixty product5">
                                        <div className="loadingimg text-center">
                                          <img
                                            loading="lazy"
                                            src="/images/india_blue/1.png"
                                            alt="RV 400 Electric Bike"
                                            style={{ maxWidth: "600" }}
                                          />
                                        </div>
                                        <div className="spinner">
                                          <span>0%</span>
                                        </div>
                                        <ol
                                          className="threesixty_images"
                                          title="Drag to Rotate"
                                        />
                                      </div>
                                    </section>
                                  </div>
                                </section>
                              </div>
                            </div>

                            <div id="stealththeme" className="block-search">
                              <div className="stealthBike">
                                <section className="my-360">
                                  <div className="cd-product-viewer-wrapper">
                                    <section className="container-fluid-no for-360 container1">
                                      <div className="threesixty product6">
                                        <div className="loadingimg text-center">
                                          <img
                                            loading="lazy"
                                            src="/images/stealth_black/1.png"
                                            alt="RV 400 Electric Bike"
                                            style={{ maxWidth: "600" }}
                                          />
                                        </div>
                                        <div className="spinner">
                                          <span>0%</span>
                                        </div>
                                        <ol
                                          className="threesixty_images"
                                          title="Drag to Rotate"
                                        />
                                      </div>
                                    </section>
                                  </div>
                                </section>
                              </div>
                            </div>

                            <div id="yellowtheme" className="block-search">
                              <div className="yellowBike">
                                <section className="my-360">
                                  <div className="cd-product-viewer-wrapper">
                                    <section className="container-fluid-no for-360 container1">
                                      <div className="threesixty product7">
                                        <div className="loadingimg text-center">
                                          <img
                                            loading="lazy"
                                            src="/images/lighting-yellow/1.png"
                                            alt="Revolt RV 400"
                                            style={{ maxWidth: "600" }}
                                          />
                                        </div>
                                        <div className="spinner">
                                          <span>0%</span>
                                        </div>
                                        <ol
                                          className="threesixty_images"
                                          title="Drag to Rotate"
                                        />
                                      </div>
                                    </section>
                                  </div>
                                </section>
                              </div>
                            </div>
                          </div>
                        </div>
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
};

export default React.memo(BikeSection);
