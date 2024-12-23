import React, { useEffect, useState } from "react";
import $ from "jquery";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import SwiperCore, { Mousewheel, Pagination } from "swiper";
import { Link } from "react-router-dom";
import { MetaTags } from "react-meta-tags";
SwiperCore.use([Mousewheel, Pagination]);

function ComfortScreen() {
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
      <MetaTags id="charging">
        <title>Revolt Electric Bikes: Unmatched Comfort Features</title>
        <link
          rel="canonical"
          href="https://www.revoltmotors.com/comfort
"
        />
        <meta
          name="description"
          content="Experience the epitome of comfort with Revolt Motors electric bikes. Discover ergonomic design and cutting-edge features for a smooth and enjoyable ride. Elevate your commuting experience today!
          "
        />
      </MetaTags>
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
                        Pump electricity into the veins of the RV400
                        <br />
                        with just a push of a button.
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>

              <SwiperSlide>
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
                    {/* <h4 className="slide_ttl">The ergonomics of Comfort</h4> */}
                    <div
                      className="slide_text black_txt ergonomics rv500_text"
                      data-animation-in="slideInDown"
                      data-animation-out="animate-out slideOutUp"
                    >
                      <h4>Remote Key</h4>
                      <p>
                        Keyless remote key equipped with lock, unlock, start and
                        locate-my-RV400
                        <br /> features. It literally is the key to the future.
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>

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
                        Adjust the RV400 to suit you, not the other way around.
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
                <div className="fixed_txt myrevoltapp-mob">
                  <h4 style={{ textTransform: "initial" }}>MyRevolt App</h4>
                </div>
                <div className="slide_tb_cnt myrevoltapp">
                  <div className="hide_mbl_676">
                    <div className="sld_tb_txt">
                      <div className="fixed_txt myrevoltapp-desk">
                        <h4 style={{ textTransform: "initial" }}>
                          MyRevolt App
                        </h4>
                        {/* <p>"The RV400 is the only motorcycle which has the highest ground clearance in its class...</p> */}
                      </div>
                      <div className="app_txt_btm">
                        <ul
                          className="nav tabbar_sld_ftr tb_btn_arw"
                          role="tablist"
                        >
                          <li className="nav-item">
                            <a
                              className="nav-link active"
                              data-toggle="tab"
                              href="#mobiletab1"
                            >
                              Just Swipe to Start/Stop
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              className="nav-link"
                              data-toggle="tab"
                              href="#mobiletab2"
                            >
                              Riding History
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              className="nav-link"
                              data-toggle="tab"
                              href="#mobiletab3"
                            >
                              Battery Status
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              className="nav-link"
                              data-toggle="tab"
                              href="#mobiletab4"
                            >
                              SOS Battery Delivery
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              className="nav-link"
                              data-toggle="tab"
                              href="#mobiletab5"
                            >
                              Geo-Locate/Geo-Fencing
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              className="nav-link"
                              data-toggle="tab"
                              href="#mobiletab6"
                            >
                              Revolt switch{" "}
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              className="nav-link"
                              data-toggle="tab"
                              href="#mobiletab7"
                            >
                              Customized sound
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="sld_tb_app">
                      <div className="tab-content">
                        <div id="mobiletab1" className="tab-pane active">
                          <div className="sld_mbl_scrn_view">
                            <div className="tab_mbl_view">
                              <img
                                alt="Swipe Start"
                                src="/images/App-Swipe-to-start-n123.png"
                              />
                            </div>
                            <div className="tab_txt_view">
                              <p>
                                Just swipe start or stop on the MyRevolt App to
                                switch your RV400 on or off.
                              </p>
                            </div>
                          </div>
                        </div>
                        <div id="mobiletab2" className="tab-pane">
                          <div className="sld_mbl_scrn_view">
                            <div className="tab_mbl_view">
                              <img
                                alt="Ride History"
                                src="/images/App-Riding-History-n123.png"
                              />
                            </div>
                            <div className="tab_txt_view">
                              <p>
                                View your past rides, routes, kms covered,
                                battery usage and much more through the MyRevolt
                                App.
                              </p>
                            </div>
                          </div>
                        </div>
                        <div id="mobiletab3" className="tab-pane">
                          <div className="sld_mbl_scrn_view">
                            <div className="tab_mbl_view">
                              <img
                                alt="Swipe Start"
                                src="/images/App-Swipe-to-start-n123.png"
                              />
                            </div>
                            <div className="tab_txt_view">
                              <p>
                                Check in real time the battery levels and the
                                available range through the MyRevolt App.{" "}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div id="mobiletab4" className="tab-pane">
                          <div className="sld_mbl_scrn_view">
                            <div className="tab_mbl_view">
                              <img
                                alt="Check Battery Status"
                                src="/images/App-Battery-Status-n123.png"
                              />
                            </div>
                            <div className="tab_txt_view">
                              <p>
                                If your battery dies during a ride, then just
                                send us an SOS battery request through the
                                MyRevolt App and we will reach you with a
                                charged one *
                              </p>
                            </div>
                          </div>
                        </div>
                        <div id="mobiletab5" className="tab-pane">
                          <div className="sld_mbl_scrn_view">
                            <div className="tab_mbl_view">
                              <img
                                alt="Geo Fencing"
                                src="/images/App-GeoFence-n123.png"
                              />
                            </div>
                            <div className="tab_txt_view">
                              <p>
                                Locate your RV400 from anywhere you want or put
                                a boundary on its movement and make it theft
                                proof, all through the MyRevolt App.{" "}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div id="mobiletab6" className="tab-pane">
                          <div className="sld_mbl_scrn_view">
                            <div className="tab_mbl_view">
                              <img
                                alt="Swipe Start"
                                src="/images/App-Swipe-to-start-n123.png"
                              />
                            </div>
                            <div className="tab_txt_view">
                              <p>
                                Switch your empty battery from any of our Revolt
                                switch stations. Just locate one on the MyRevolt
                                app, notify them of your arrival and exchange
                                your battery within minutes.
                              </p>
                            </div>
                          </div>
                        </div>
                        <div id="mobiletab7" className="tab-pane">
                          <div className="sld_mbl_scrn_view">
                            <div className="tab_mbl_view">
                              <img
                                alt="Customised Bike Sound"
                                src="/images/App-Custom-Sound-n123.png"
                              />
                            </div>
                            <div className="tab_txt_view">
                              <p>
                                Choose from four different pre-installed sounds
                                from the MyRevolt App and let your RV400 speak
                                the way you like.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    id="mbl_slide"
                    className="carousel slide slide_crs_mbl"
                    data-ride="carousel"
                    data-interval="false"
                  >
                    <div className="carousel-inner">
                      <div className="carousel-item active">
                        <img
                          alt="Battery Status"
                          src="/images/just-swipe-to-start-mbl.jpg"
                        />
                      </div>
                      <div className="carousel-item">
                        <img
                          alt="Check Ride History"
                          src="/images/riding-history-mbl.jpg"
                        />
                      </div>
                      <div className="carousel-item">
                        <img
                          alt="Battery Status"
                          src="/images/just-swipe-to-start-mbl.jpg"
                        />
                      </div>
                      <div className="carousel-item">
                        <img
                          alt="Change Battery From Home"
                          src="/images/order-a-battery-home-mbl.jpg"
                        />
                      </div>
                      <div className="carousel-item">
                        <img
                          alt="Geo Fencing"
                          src="/images/geo-fence-your-revolt-mbl.jpg"
                        />
                      </div>
                      <div className="carousel-item">
                        <img
                          alt="Swappable Electric Bike Battery"
                          src="/images/swtich-battery-mbl.jpg"
                        />
                      </div>
                      <div className="carousel-item">
                        <img
                          alt="Motorcycle Sound"
                          src="/images/motorcycle-roar-mbl.jpg"
                        />
                      </div>
                    </div>
                    <div className="slide_position_no">
                      <span className="crrn_no">1</span> / <span>7</span>
                    </div>
                    <ul className="carousel-indicators">
                      <li
                        data-target="#mbl_slide"
                        data-slide-to={0}
                        className="active"
                      >
                        <h5>Just Swipe to Start/Stop</h5>
                        <p>
                          Just swipe start or stop on the MyRevolt App to switch
                          your RV400 on or off.
                        </p>
                      </li>
                      <li data-target="#mbl_slide" data-slide-to={1}>
                        <h5>Riding History</h5>
                        <p>
                          View your past rides, routes, kms covered, battery
                          usage and much more through the MyRevolt App.
                        </p>
                      </li>
                      <li data-target="#mbl_slide" data-slide-to={2}>
                        <h5>Battery Status</h5>
                        <p>
                          Check in real time the battery levels and the
                          available range through the MyRevolt App.{" "}
                        </p>
                      </li>
                      <li data-target="#mbl_slide" data-slide-to={3}>
                        <h5>SOS Battery Delivery</h5>
                        <p>
                          If your battery dies during a ride, then just send us
                          an SOS battery request through the MyRevolt App and we
                          will reach you with a charged one *
                        </p>
                      </li>
                      <li data-target="#mbl_slide" data-slide-to={4}>
                        <h5>Geo-Locate/Geo-Fencing</h5>
                        <p>
                          Locate your RV400 from anywhere you want or put a
                          boundary on its movement and make it theft proof, all
                          through the MyRevolt App.{" "}
                        </p>
                      </li>
                      <li data-target="#mbl_slide" data-slide-to={5}>
                        <h5>Revolt switch </h5>
                        <p>
                          Switch your empty battery from any of our Revolt
                          switch stations. Just locate one on the MyRevolt app,
                          notify them of your arrival and exchange your battery
                          within minutes.
                        </p>
                      </li>
                      <li data-target="#mbl_slide" data-slide-to={6}>
                        <h5>Customized sound</h5>
                        <p>
                          Choose from four different pre-installed sounds from
                          the MyRevolt App and let your RV400 speak the way you
                          like.
                        </p>
                      </li>
                    </ul>
                    <a
                      className="carousel-control-prev"
                      href="#mbl_slide"
                      data-slide="prev"
                    >
                      <i className="fa fa-chevron-left" aria-hidden="true" />
                    </a>
                    <a
                      className="carousel-control-next"
                      href="#mbl_slide"
                      data-slide="next"
                    >
                      <i className="fa fa-chevron-right" aria-hidden="true" />
                    </a>
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
                        The RV400 has the highest ground clearance in its
                        segment. A commanding ground clearance of 200 mm will
                        let you and your RV400 keep moving smoothly on the roads
                        irrespective of the conditions.
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

export default ComfortScreen;
