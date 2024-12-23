import React, { useEffect, useState } from "react";
import $ from "jquery";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import SwiperCore, { Mousewheel, Pagination } from "swiper";
import { Link } from "react-router-dom";
SwiperCore.use([Mousewheel, Pagination]);

function BrgComfortScreen() {
  const [activeimage, setActiveimage] = React.useState(
    "/images/rv400-the-adjuster-n1.jpg"
  );
  const [sportmodebtn, setSportmodebtn] = useState("active");
  const [citymodebtn, setCitymodebtn] = useState("");

  const activateimage = (e) => {
    var cimge = "";
    if (e === "sportmode") {
      cimge = "/images/rv400-the-adjuster-n1.jpg";
      setCitymodebtn("");
      setSportmodebtn("active");
    } else {
      cimge = "/images/rv400-the-adjuster-n2.jpg";
      setCitymodebtn("active");
      setSportmodebtn("");
    }
    setActiveimage(cimge);
  };

  const [swiperObject, setswiperObject] = useState();

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

  return (
    <>
      <div className="scoll-div">
        <div className="hit-the-road-fullinfo owl_sld_right" id="">
          <p className="text-right close-htr1">
            <Link to="/rv400#mainproduct_Collapse">
              <img
                src="/images/arrow-Grey.png"
                className="img-fluid"
                alt="Go Back Icon"
              />
            </Link>
          </p>
          <Swiper
            direction={"vertical"}
            slidesPerView={1}
            spaceBetween={0}
            mousewheel={true}
            pagination={{
              clickable: true,
            }}
            onSlideChange={(e) => {
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
            <div className="swiper-wrapper">
              <SwiperSlide>
                <div className="rightbar_slide">
                  <picture>
                    <source
                      media="(max-width: 767px)"
                      srcSet="/images/rv400-seatpush-v1.jpg"
                    />
                    <img
                      src="/images/ergonomics-banner-2.1.jpg"
                      alt="Suspension"
                    />
                  </picture>
                  <div className="container">
                    <div
                      className="slide_text left_center the_seat rv400_text fr_slide"
                      data-animation-in="slideInDown"
                      data-animation-out="animate-out slideOutUp"
                    >
                      <h4>THE SEAT</h4>
                      <p>
                        An ergonomically positioned seat designed to provide you
                        comfort and an ideal riding posture.
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
              {/* 
              <SwiperSlide>
                <div className="rightbar_slide">
                  <picture>
                    <source
                      media="(max-width: 767px)"
                      srcSet="/images/push-btn-v1.jpg"
                    />
                    <img
                      src="/images/ergonomics-banner-3.1.jpg"
                      alt="Suspension"
                    />
                  </picture>
                  <div className="container">
                    <div
                      className="slide_text push_electric"
                      data-animation-in="slideInDown"
                      data-animation-out="animate-out slideOutUp"
                    >
                      <h4>START ELECTRIC</h4>
                      <p>
                        Pump electricity into the veins of the RV400BRZ
                        <br />
                        with just a push of a button.
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide> */}

              {/* <SwiperSlide>
                <div className="rightbar_slide flex-last tabimg800">
                  <picture>
                    <source
                      media="(max-width: 767px)"
                      srcSet="/images/400-Mechanical-key-mob-v1.jpg"
                    />
                    <img
                      src="/images/400-Mechanical-key-v1.jpg"
                      alt="Key Lock"
                      className="mbl_break_point_fll"
                    />
                  </picture>
                  <div className="container">
                    <div
                      className="slide_text black_txt ergonomics rv500_text"
                      data-animation-in="slideInDown"
                      data-animation-out="animate-out slideOutUp"
                    >
                      <h4>Remote Key</h4>
                      <p>
                        Keyless remote key equipped with lock, unlock, start and
                        locate-my-RV400BRZ
                        <br /> features. It literally is the key to the future.
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide> */}

              <SwiperSlide>
                <div className="rightbar_slide dblImg_bg">
                  <picture>
                    <img
                      className="sportmode_pic"
                      // src="/images/rv400-the-adjuster-n1.jpg"
                      src={activeimage}
                      alt="Suspension"
                    />
                    <img
                      className="citymode_pic"
                      style={{ display: "none" }}
                      // src="/images/rv400-the-adjuster-n2.jpg"
                      src={activeimage}
                      alt="Suspension"
                    />
                  </picture>
                  <div className="container">
                    <div
                      className="slide_text left_center sld_adjuster_sec mobile-orderchnage "
                      data-animation-in="slideInDown"
                      data-animation-out="animate-out slideOutUp"
                    >
                      <h4>THE ADJUSTERS</h4>
                      <p>
                        Adjustable foot pegs whose position can be manually
                        changed to suit your height, riding posture and comfort.
                        Choose between two combination sets, sports and cruise.
                        <br />
                        Adjust the RV400 BRZ to suit you, not the other way
                        around.
                      </p>
                      <div className="pedal_mode">
                        <a
                          onClick={(e) => activateimage("sportmode")}
                          // data-show="sportmode_pic"
                          className={`sportmode ${sportmodebtn}`}
                        >
                          SPORTS
                        </a>
                        <a
                          onClick={(e) => activateimage("citymode")}
                          // data-show="sportmode_pic"

                          className={`citymode ${citymodebtn}`}
                        >
                          COMFORT
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>

              <SwiperSlide>
                <div className="rightbar_slide higestground">
                  <picture>
                    <source
                      media="(max-width: 420px)"
                      srcSet="/images/ergonomics-banner-1.2-mbl.png"
                    />
                    <source
                      media="(max-width: 767px)"
                      srcSet="/images/ergonomics-banner-2-v1.png"
                    />
                    <img
                      className="mbl_break_point_fll"
                      src="/images/nbm_1.png"
                      alt="Tyres"
                    />
                  </picture>
                  <div className="container">
                    {/*<h4 className="slide_ttl txtBlck">safety first, always</h4>*/}
                    <div
                      className="slide_text black_txt sld_btm_center rv600_text"
                      data-animation-in="slideInDown"
                      data-animation-out="animate-out slideOutUp"
                    >
                      <h4>Highest Ground Clearance</h4>
                      <p>
                        The RV400 BRZ has the highest ground clearance in its
                        segment. A commanding ground clearance of 200 mm will
                        let you and your RV400 BRZ keep moving smoothly on the
                        roads irrespective of the conditions.
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            </div>
          </Swiper>
        </div>
      </div>
    </>
  );
}

export default BrgComfortScreen;
