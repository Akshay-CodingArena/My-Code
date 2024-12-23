import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import SwiperCore, { Mousewheel, Pagination } from "swiper";
import $ from "jquery";
import { MetaTags } from "react-meta-tags";

SwiperCore.use([Mousewheel, Pagination]);

function SafetyScreen() {
  const [swiperObject, setswiperObject] = useState();

  const breakpoints = function (swiper = swiperObject) {
    if (swiper) {
      setTimeout(function () {
        if ($(window).width() <= 400) {
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
      <MetaTags>
        <title> Revolt Bike Safety Features: Ride with Confidence </title>
        <meta
          name="description"
          content="Explore the cutting-edge safety features of Revolt Motors electric bikes. From advanced braking systems to intelligent ride control, ride confidently into the future."
        />
        <meta
          property="og:title"
          content="Revolt Bike Safety Features: Ride with Confidence
"
        />
        <meta
          property="og:description"
          content="Explore the cutting-edge safety features of Revolt Motors electric bikes. From advanced braking systems to intelligent ride control, ride confidently into the future."
        />
        <meta name="twitter:site" content="@RevoltMotorsIN" />
        <meta
          name="twitter:image"
          content="https://www.revoltmotors.com/images/revolt-motors-logo.svg"
        />
        <link rel="canonical" href="https://www.revoltmotors.com/safety" />
      </MetaTags>
      <div className="hit-the-road-fullinfo owl_sld_right" id="feature-sec3">
        <p className="text-right   close-htr1">
          <a href="/rv400#mainproduct_Collapse">
            <img
              src="/images/arrow-Grey.png"
              className="img-fluid"
              alt="Go Back Icon"
            />
          </a>
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
            console.log(e);
            $(".swiper-pagination .swiper-pagination-bullet").removeClass(
              "swiper-pagination-bullet-active",
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
                    media="(max-width: 420px)"
                    srcSet="/images/400-Tire-mob-420.jpg"
                  />
                  <source
                    media="(max-width: 860px)"
                    srcSet="/images/400-Tire-mob.jpg"
                  />
                  <img src="/images/400-Tire-desk.jpg" alt="Tyres" />
                </picture>
                <div className="container">
                  <div
                    className="slide_text black_txt left_center slide_tnew rv300tyresec"
                    data-animation-in="slideInDown"
                    data-animation-out="animate-out slideOutUp"
                  >
                    <h4>TYRES</h4>
                    <p>
                      RV400 comes with MRF zapper tyres. A front (90/80 R17) and
                      rear (110/80 R17) tyre will always keep the grip and
                      torque of the RV400 glued to the road.
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="rightbar_slide">
                <picture>
                  <source
                    media="(max-width: 767px)"
                    srcSet="/images/400-Suspension.jpg"
                  />
                  <img src="/images/suspension.jpg" alt="Suspension" />
                </picture>
                <div className="container">
                  <div
                    className="slide_text left_center slide_tnew suspension-caption"
                    data-animation-in="slideInDown"
                    data-animation-out="animate-out slideOutUp"
                  >
                    <h4>SUSPENSION</h4>
                    <p>
                      First in its segment Upside Down Forks and Rear Adjustable
                      Monoshock Suspension which can be changed manually to
                      suspend any discomfort from your riding experience.
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="rightbar_slide">
                <picture>
                  <source
                    media="(max-width: 767px)"
                    srcSet="/images/400-Side-stand.jpg"
                  />
                  <img
                    src="/images/side-stand.jpg"
                    alt="When on stand,it won’t move!"
                  />
                </picture>
                <div className="container">
                  <div
                    className="slide_text left_center slide_tnew"
                    data-animation-in="slideInDown"
                    data-animation-out="animate-out slideOutUp"
                  >
                    <h4>The Safety Stand</h4>
                    <p>
                      Most riders in a hurry forget to put the stand off and run
                      it on. The RV400 has a safety side stand which makes the
                      motorcycle only engage with its rider once the stand goes
                      back to its closed position. As always, safety first.
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="rightbar_slide">
                <picture>
                  <source
                    media="(max-width: 420px)"
                    srcSet="/images/cbs_red-mbl.png"
                  />
                  <source
                    media="(max-width: 767px)"
                    srcSet="/images/400-Breaking-system.jpg"
                  />
                  <img
                    className="mbl_break_point"
                    src="/images/Combination-Braking.jpg"
                    alt="Combination Braking System"
                  />
                </picture>
                <div className="container">
                  <div
                    className="slide_text slide_tnew Combination-Braking combination_slide"
                    data-animation-in="slideInDown"
                    data-animation-out="animate-out slideOutUp"
                  >
                    <h4>Combination Braking System</h4>
                    <p>
                      The new industry defining Combination Braking System
                      (CBS). No matter which brake you apply, you’re always in
                      control of your safety.
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          </div>
        </Swiper>
      </div>
    </>
  );
}

export default SafetyScreen;
