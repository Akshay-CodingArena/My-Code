import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import $ from "jquery";
import SwiperCore, { Mousewheel, Pagination } from "swiper";
import { MetaTags } from "react-meta-tags";
SwiperCore.use([Mousewheel, Pagination]);

function AestheticScreen() {
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
      <MetaTags id="aesthetic">
        <title>
          Elevate Your Riding Experience: Stylish Electric Bike Aesthetics
        </title>
        <meta
          name="description"
          content="Discover the fusion of style and elevate your riding experience in our electric bike collection. Redefine elegance with stunning aesthetics & journey with visually captivating rides.
"
        />
        <meta
          property="og:title"
          content="Elevate Your Riding Experience: Stylish Electric Bike Aesthetic"
        />
        <meta
          property="og:description"
          content="Discover the fusion of style and elevate your riding experience in our electric bike collection. Redefine elegance with stunning aesthetics & journey with visually captivating rides.
          "
        />
        <meta name="twitter:site" content="@RevoltMotorsIN" />
        <meta
          name="twitter:image"
          content="https://www.revoltmotors.com/images/revolt-motors-logo.svg"
        />
        <link rel="canonical" href="https://www.revoltmotors.com/aesthetic" />
      </MetaTags>
      <div className="hit-the-road-fullinfo owl_sld_right" id="feature-sec2">
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
            <SwiperSlide className="video_bg_sld">
              <div className="rightbar_slide">
                <div className="container">
                  <div className="txt_vdo_itm">
                    <div className="sld_vdo">
                      <video autoPlay muted playsInline autobuffer="true">
                        <source
                          src="/images/Revolt_light_Frame.mp4"
                          type="video/mp4"
                        />
                      </video>
                    </div>
                    <div className="sld_txt light-frame">
                      <div className="">
                        <h4>LIGHTWEIGHT FRAME</h4>
                        <p>
                          A lightweight frame which provides you agility for
                          better control and strength for safety.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide className="video_bg_sld">
              <div className="rightbar_slide">
                <div className="container">
                  <div className="txt_vdo_itm">
                    <div className="sld_vdo leftalign-video">
                      <video autoPlay muted playsInline autobuffer="true">
                        <source
                          src="/images/Revolt_Battery.mp4"
                          type="video/mp4"
                        />
                      </video>
                    </div>
                    <div className="sld_txt Balanced-right left_center">
                      <div className="">
                        <h4>
                          CENTRE OF GRAVITY PRECISELY PLACED FOR THE PERFECT
                          RIDE
                        </h4>
                        <p>
                          RV400's structure has been designed around the
                          dynamics of a sports bike.The battery being the
                          heaviest has been kept high enough to maintain a
                          centre of gravity that helps you in handling tight
                          corners and everyday city traffic problems.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide className="video_bg_sld">
              <div className="rightbar_slide">
                <div className="container">
                  <div className="txt_vdo_itm">
                    <div className="sld_vdo tightalign-video">
                      <video autoPlay muted playsInline autobuffer="true">
                        <source
                          src="/images/Revolt_Chain.mp4"
                          type="video/mp4"
                        />
                      </video>
                    </div>
                    <div className="sld_txt powerhouse left_center">
                      <div className="">
                        <h4>THE DRIVE TRAIN POWERHOUSE</h4>
                        <p>
                          Explore the RV400’s power through a robust 3KW
                          mid-drive motor which is capable of generating 170 Nm
                          torque and is equipped with a sprocket belt drive. The
                          highly durable belt with a really long life will make
                          you forget lubrications and chain hassles for life.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide className="video_bg_sld">
              <div className="rightbar_slide">
                <div className="slide_tabs_wrp Headlampwrp sld_tb_img">
                  <div
                    className="slide_text left_center Headlamptext top"
                    style={{
                      animation: "initial",
                    }}
                  ></div>
                  <div className="tab-content">
                    <ul
                      className="nav vhcl_lght tabbar_sld_ftr Headlamp-nav"
                      role="tablist"
                    >
                      <li className="nav-item ">
                        <a
                          className="nav-link active"
                          data-toggle="tab"
                          href="#video1"
                        >
                          HEADLAMP
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          data-toggle="tab"
                          href="#video2"
                        >
                          TAIL LAMP
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          data-toggle="tab"
                          href="#video3"
                        >
                          INDICATORS
                        </a>
                      </li>
                    </ul>
                    <div id="video1" className="tab-pane active">
                      <div className="rightbar_slide">
                        <picture>
                          <source
                            media="(max-width: 420px)"
                            srcSet="/images/400-Headlamp-mbl.jpg"
                          />
                          <img src="/images/headlamp-v1.jpg" alt="Headlamp" />
                        </picture>
                        <div className="container">
                          <div
                            className="slide_text left_center Headlamptext"
                            style={{
                              animation: "initial",
                            }}
                          >
                            <h4>THE ILLUMINATORS</h4>
                            <p>
                              The first in its segment LED projection headlamps
                              with DRL whose design has been inspired by the
                              Revolt logo. Minimalistic in design and highly
                              effective in illuminating the road ahead for the
                              rider.{" "}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div id="video2" className="tab-pane">
                      <div className="rightbar_slide">
                        <picture>
                          <img src="/images/TAIL-LAMP1.jpg" alt="Tail Lamp" />
                        </picture>
                        <div className="container">
                          <div
                            className="slide_text left_center Headlamptext"
                            style={{
                              animation: "initial",
                            }}
                          >
                            <h4>THE ILLUMINATORS</h4>
                            <p>
                              A sleek and authoritative tail lamp has a design
                              inspired by the Revolt logo. A 270 degrees wide
                              throw of light will always make RV400's presence
                              noticeable.{" "}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div id="video3" className="tab-pane">
                      <div className="rightbar_slide">
                        <picture>
                          <source
                            media="(max-width: 420px)"
                            srcSet="/images/400-Indicator-mbl.jpg"
                          />
                          <img
                            src="/images/headlamp-imf3-v1.jpg"
                            alt="Indicators"
                          />
                        </picture>
                        <div className="container">
                          <div
                            className="slide_text left_center Headlamptext"
                            style={{
                              animation: "initial",
                            }}
                          >
                            <h4>THE ILLUMINATORS</h4>
                            <p>
                              LED high performance indicators which are bright
                              enough that the traffic will automatically pave a
                              way for you.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide className="video_bg_sld flex-last">
              <div className="rightbar_slide">
                <picture>
                  <img src="images/meter.jpg" alt="Bike Meter" />
                </picture>
                <div className="container">
                  {/*<h4 className="slide_ttl txtBlck">safety first, always</h4>*/}
                  <div className="slide_text left_center Digital-instrument rv_text">
                    <h4>DIGITAL INSTRUMENT CLUSTER</h4>
                    <p>
                      A digital display instrument cluster which gives you
                      real-time health vitals of your RV400. Speed, battery,
                      riding mode, a clock and even the temperature of the bike
                      and your ambience.
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

export default AestheticScreen;
