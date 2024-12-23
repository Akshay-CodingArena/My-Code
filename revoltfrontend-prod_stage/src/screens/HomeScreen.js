import React, {
  useEffect,
  useRef,
  useState,
  Suspense,
  useLayoutEffect,
} from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useDispatch, useSelector } from "react-redux";
import {
  listStateCityHub,
  listStateCityHub_SC,
  listStateCityHub_upgrade,
} from "../actions/productActions";
import { Link } from "react-router-dom";
import "aos/dist/aos.css";
import { useLocation } from "react-router";
import MetaTags from "react-meta-tags";
import clevertap from "clevertap-web-sdk";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import EvStatistics from "../components/ev_ice_comparision";
// import  PopupScreen  from "./PopupScreen";
const BikeSection = React.lazy(
  () => import("../components/BikeSectionHomeScreen")
);

export default React.memo(function HomeScreen() {
  var clientWidth = document.documentElement.clientWidth;
  var isMobile = clientWidth < 768 ? true : false;
  var bannerHeight = isMobile
    ? clientWidth * (1050 / 768) + "px"
    : clientWidth * (722 / 1920) + "px";

  const [showFull, setShow] = useState(false);
  const navigate = useNavigate();
  const [model, setModel] = useState("RV400");
  const [nav1, setNav1] = useState();
  const [nav2, setNav2] = useState();
  const [showVideo, setShowVideo] = useState(false);
  const [showImage, setShowImage] = useState(true);

  const targetRef = useRef("");
  const targetRef2 = useRef("");
  const targetRef3 = useRef("");

  // const productslide = [
  //   {
  //     desktop: "3.png",
  //     title: "Golden folks",
  //   },
  //   {
  //     desktop: "2.png",
  //     title: "Black Handle Bar",
  //     // link: "/notifyme",
  //   },
  //   {
  //     desktop: "1.png",
  //     title: "Black Alloys",
  //   },
  //   {
  //     desktop: "9.png",
  //     title: "Black Swing Arm",
  //   },

  //   {
  //     desktop: "7.png",
  //     title: "Sporty Yellow Monoshock",
  //   },
  //   {
  //     desktop: "8.png",
  //     title: "Black Sided Stand & Footpegs",
  //   },
  //   {
  //     desktop: "6.png",
  //     title: "Black Rear Grip",
  //   },

  //   {
  //     desktop: "5.png",
  //     title: "Black Subframe",
  //   },
  // ];

  const setting = {
    centerMode: false,
    centerPadding: "60px",
    dots: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: "40px",
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: "40px",
          slidesToShow: 1,
        },
      },
    ],
  };

  const [nav3, setNav3] = useState();
  const [nav4, setNav4] = useState();

  // // Custom Js Function...
  // $(".sw-patch").on("click", function () {
  //   $(".sw-patch").removeClass("active");
  //   $(this).addClass("active");

  //   $(".block-search").removeClass("active");
  //   var id = $(this).attr("data-block");
  //   $(id).addClass("active");
  // });

  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  console.log("products", productList);
  const userTopSellersList = useSelector((state) => state.userTopSellersList);

  const {
    loading: loadingSellers,
    error: errorSellers,
    users: sellers,
  } = userTopSellersList;

  //

  const callBackScroll = () => {
    if (
      document.documentElement.clientHeight >
      document.getElementById("actionsMenuTrigger").getBoundingClientRect()?.y
    ) {
      document.getElementById("actionsMenu").style.display = "flex";
      if (document.getElementById("fc_frame")) {
        document.getElementById("fc_frame").style.display = "none";
      }
    } else {
      document.getElementById("actionsMenu").style.display = "none";
      if (document.getElementById("fc_frame")) {
        document.getElementById("fc_frame").style.display = "block";
      }
    }
  };

  useLayoutEffect(() => {
    let img = new Image();
    img.onload = () => {
      setShowImage(false);
    };
    img.loading = "eager";
    img.src = isMobile
      ? window._banner_data?.[0].mobile_url
      : window._banner_data?.[0].desktop_url;
    clevertap.event.push("Page View", {
      "Page Name": "Home page",
      "Page Url": window.location.href,
    });

    if (document.documentElement.clientWidth < 580) {
      document.getElementById("actionsMenu").style.display = "none";
      window.addEventListener("scroll", callBackScroll);
    }

    return () => {
      window.removeEventListener("scroll", callBackScroll);
    };
  }, []);

  // useEffect(() => {
  //   // dispatch(listProducts({}));
  //   // dispatch(listTopSellers());
  // }, []);
  // console.log(listProducts);
  const pauseAudio = () => {};

  const settings = {
    responsive: [
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const location = useLocation();

  useEffect(() => {
    document.querySelectorAll("video").forEach((video) => {
      video.setAttribute("playsinline", "");
    });

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
  });

  useEffect(() => {
    // window.scrollTo(0, 0);
    // navigate.scrollRestoration = "manual";
    setTimeout(() => {
      setShowVideo(true);
    }, 5000);

    const options = {
      root: null, // Use the viewport as the root
      rootMargin: "0px",
      threshold: 0.5, // Percentage of target element's visibility needed to trigger the callback
    };

    // const callback = (entries) => {
    //   console.log("Here are my entries", entries);
    //   entries.forEach((entry) => {
    //     if (entry.isIntersecting) {
    //       // Element is now visible, implement your logic here
    //     }
    //   });
    // };

    const callback2 = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          dispatch(listStateCityHub());
          dispatch(listStateCityHub_upgrade());
          dispatch(listStateCityHub_SC());
          setShow(true);

          // Element is now visible, implement your logic here
          console.log("Element is intersecting!");
        }
      });
    };

    const observer = new IntersectionObserver(callback2, options);

    if (targetRef3.current) {
      //   observer.observe(targetRef2.current);
      observer.observe(targetRef3.current);
    }

    return () => {
      if (targetRef3.current) {
        //   observer.unobserve(targetRef2.current);
        observer.unobserve(targetRef3.current);
      }
    };
  }, []);

  return (
    <div>
      <div className="SnowContainer">
        <div className="fallingSnow">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      {/* <div>
        <PopupScreen/>
      </div> */}
      <MetaTags id="home">
        {/* <title>Book Now India's No.1 Electric Bike By Revolt Motors</title>

        <meta
          name="description"
          content="Book Your New Electric Bike @ ₹499 Only. To experience the best in class features, speed, range and eco-friendly ride, Join The Revolution.

"
        />
        <meta
          property="og:title"
          content="Book Now India's No.1 Electric Bike By Revolt Motors"
        />
        <meta
          property="og:description"
          content="Book Your New Electric Bike @ ₹499 Only. To experience the best in class features, speed, range and eco-friendly ride, Join The Revolution."
        />
        <meta name="twitter:site" content="@RevoltMotorsIN" />
        <meta
          name="twitter:image"
          content="https://www.revoltmotors.com/images/revolt-motors-logo.svg"
        /> */}
        <link rel="canonical" href="https://www.revoltmotors.com" />
      </MetaTags>

      <section className="banner-page">
        {window._banner_data && !showImage ? (
          <Slider
            {...{
              speed: 100,
              autoplay: true,
              autoplaySpeed: 14000,
              infinite: true,
              pauseOnHover: false,
              pauseOnFocus: false,
            }}
          >
            {/* <video id="custvideo1" muted autoPlay loop playsinline="" height="100vh !important" style={{height:'100vh !important', maxHeight:'100vh !important'}}>
                <source src="/images/rv400-video-final.mp4" type="video/mp4" />
                <source src="/images/rv400-video-final.ogg" type="video/ogg" />
              </video> */}
            {/* {[1, 2].map((item) => (
           <div className="slider-banner">
            <div className="banner-slider">
              <Link to="/book">
                <img
                  className="desktop"
                  src={`/images/newhomepage/BannersDesktop/Revolt_Zero-Downpayment.jpg`}
                  alt=""
                />
                <img
                  className="mobile"
                  src={`/images/newhomepage/BannersMobile/Revolt_Zero-Downpayment.jpg`}
                  alt=""
                />
              </Link>
            </div>
          </div>
          ))} */}
            <div className="slider-banner">
              <div className="banner-slider">
                <Link
                  to={
                    window._banner_data[0].mobile.redirect_link?.replace(
                      window.location.origin,
                      ""
                    ) ?? ""
                  }
                >
                  <div className="banner-block">
                    <picture>
                      <source
                        media="(max-width: 768px)"
                        srcSet={window._banner_data[0].mobile_url}
                      />
                      <source
                        media="(min-width: 769px)"
                        srcSet={window._banner_data[0].desktop_url}
                      />
                      <img
                        width={"100%"}
                        height={bannerHeight}
                        src={`${isMobile ? "/images/newhomepage/BannersMobile/Revolt_Zero-Downpayment_Low.jpg" : "/images/newhomepage/BannersDesktop/Revolt_Zero-Downpayment_Low.jpg"}`}
                        alt=""
                      />
                    </picture>

                    {/* <img id="low_banner" src={"/images/newhomepage/BannersDesktop/Revolt_Zero-Downpayment_Low.jpg"}
              style={{
                position:"absolute", 
                top:"0px",
                left:"0px",
                filter:"blur(20px)",
                height:bannerHeight,
                width:"100%"
              }}
              /> */}
                  </div>
                  {/* <img
                className="desktop"
                src={`/images/newhomepage/BannersDesktop/Revolt_Zero-Downpayment.jpg`}
                alt=""
              />
              <img
                className="mobile"
                src={`/images/newhomepage/BannersMobile/Revolt_Zero-Downpayment.jpg`}
                alt=""
              /> */}
                </Link>
              </div>
            </div>

            <div className="slider-banner">
              <div className="banner-slider">
                <Link
                  to={
                    window._banner_data[1].mobile.redirect_link?.replace(
                      window.location.origin,
                      ""
                    ) ?? ""
                  }
                >
                  <div className="banner-block">
                    <picture>
                      <source
                        media="(max-width: 768px)"
                        srcSet={window._banner_data[1].mobile_url}
                      />
                      <source
                        media="(min-width: 769px)"
                        srcSet={window._banner_data[1].desktop_url}
                      />
                      <img
                        width={"100%"}
                        height={bannerHeight}
                        // style={{
                        //   postion: "absolute",
                        //   top: "0px",
                        //   left: "0px",
                        // }}

                        //  src={item.desktop_url}
                        src="/images/newhomepage/BannersDesktop/Revolt_Zero-Downpayment_Low.jpg"
                        // loading={index == 0 ? "eager" : "lazy"}
                        alt=""
                      />
                    </picture>

                    {/* <img id="low_banner" src={"/images/newhomepage/BannersDesktop/Revolt_Zero-Downpayment_Low.jpg"}
                style={{
                  position:"absolute", 
                  top:"0px",
                  left:"0px",
                  filter:"blur(20px)",
                  height:bannerHeight,
                  width:"100%"
                }}
               /> */}
                  </div>
                </Link>
              </div>
            </div>

            <div className="slider-banner">
              <div className="banner-slider">
                <Link
                  to={
                    window._banner_data[0].mobile.redirect_link?.replace(
                      window.location.origin,
                      ""
                    ) ?? ""
                  }
                >
                  <div className="banner-block">
                    {showVideo ? (
                      <video
                        autoPlay
                        loading="lazy"
                        muted
                        loop
                        style={{
                          height: "100%",
                          minWidth: "100%",
                          objectFit: "cover",
                        }}
                      >
                        <source
                          src="/RV1-Banner-with-video_Draft_06.mp4"
                          loading="lazy"
                          type="video/mp4"
                          media="(min-width: 1024px)"
                        />
                        <source
                          src="/RV1-Phone_Banner.mp4"
                          loading="lazy"
                          autoPlay
                          muted
                          loop
                          type="video/mp4"
                          media="(max-width: 1024px)"
                        />
                      </video>
                    ) : null}
                  </div>
                </Link>
              </div>
            </div>

            {window._banner_data.slice(2).map((item, index) => (
              <div className="slider-banner">
                <div className="banner-slider">
                  <Link
                    to={
                      item.mobile.redirect_link?.replace(
                        window.location.origin,
                        ""
                      ) ?? ""
                    }
                  >
                    <div className="banner-block">
                      <picture>
                        <source
                          media="(max-width: 768px)"
                          srcSet={item.mobile_url}
                        />
                        <source
                          media="(min-width: 769px)"
                          srcSet={item.desktop_url}
                        />
                        <img
                          width={"100%"}
                          height={bannerHeight}
                          // style={{
                          //   postion: "absolute",
                          //   top: "0px",
                          //   left: "0px",
                          // }}

                          //  src={item.desktop_url}
                          src="/images/newhomepage/BannersDesktop/Revolt_Zero-Downpayment_Low.jpg"
                          // loading={index == 0 ? "eager" : "lazy"}
                          alt=""
                        />
                      </picture>

                      {/* <img id="low_banner" src={"/images/newhomepage/BannersDesktop/Revolt_Zero-Downpayment_Low.jpg"}
                style={{
                  position:"absolute", 
                  top:"0px",
                  left:"0px",
                  filter:"blur(20px)",
                  height:bannerHeight,
                  width:"100%"
                }}
               /> */}
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </Slider>
        ) : (
          <div className="slider-banner">
            <div className="banner-slider">
              <picture>
                <source
                  media="(max-width: 768px)"
                  srcSet="/images/newhomepage/BannersMobile/Revolt_Zero-Downpayment_Low.jpg"
                />
                <img
                  width="100%"
                  height={bannerHeight}
                  // style={{
                  //   postion: "absolute",
                  //   top: "0px",
                  //   left: "0px",
                  // }}
                  src="/images/newhomepage/BannersDesktop/Revolt_Zero-Downpayment_Low.jpg"
                  loading="lazy"
                  alt=""
                />
              </picture>
            </div>
          </div>
        )}
      </section>
      {/* <div ref={targetRef2}></div> */}
      <div id="actionsMenuTrigger">
        {showFull ? (
          <>
            <div style={{ minHeight: "100px" }}>
              <Suspense fallback="....Loading">
                <BikeSection />
              </Suspense>
            </div>
          </>
        ) : (
          <div ref={targetRef3} style={{ height: "100vh" }}></div>
        )}
      </div>
    </div>
  );
});
