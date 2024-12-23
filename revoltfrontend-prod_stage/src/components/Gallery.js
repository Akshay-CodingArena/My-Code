import React, { Component } from "react";
import { Fancybox } from "@fancyapps/ui";
import Slider from "react-slick";

Fancybox.bind("[data-fancybox]", {
  selector: ".slick-slide:not(.slick-cloned)",
  hash: false,
});

// function Gallery() {
class Gallery extends Component {
  render() {
    return (
      <>
        <section className="page-section padding-top-60 padding-bottom-100 gallery-page gallery-slider">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="theme-content">
                  <h3>GALLERY</h3>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-8">
                <div className="gallery-img">
                  <Slider infinite={false} speed={1000}>
                    <div className="item">
                      <a
                        data-fancybox
                        href="https://www.youtube.com/watch?v=jloFevYatrU"
                      >
                        <i className="fa fa-play"></i>
                        <img
                          loading="lazy"
                          alt="Revolt Motors-Rv1
                          "
                          src="/images/gallery/rv1_06.jpg"
                        />
                      </a>
                    </div>
                    <div className="item">
                      <a data-fancybox href="/images/gallery/rv1_03.jpg">
                        <img
                          loading="lazy"
                          alt="Electric Bike
                              "
                          src="/images/gallery/rv1_03.jpg"
                        />{" "}
                      </a>
                    </div>
                    <div className="item">
                      <a data-fancybox href="/images/gallery/evnt9.png">
                        <img
                          loading="lazy"
                          alt="Headlamp"
                          src="/images/gallery/evnt9.png"
                        />{" "}
                      </a>
                    </div>
                    <div className="item">
                      <a data-fancybox href="/images/gallery/evnt5.png">
                        <img
                          loading="lazy"
                          alt="Headlamp"
                          src="/images/gallery/evnt5.png"
                        />{" "}
                      </a>
                    </div>
                    <div className="item">
                      <a data-fancybox href="/images/gallery/evnt10.png">
                        <img
                          loading="lazy"
                          alt="Headlamp"
                          src="/images/gallery/evnt10.png"
                        />{" "}
                      </a>
                    </div>
                    <div className="item">
                      <a
                        data-fancybox
                        href="https://www.youtube.com/embed/8evSC5jNq_o"
                      >
                        <i className="fa fa-play"></i>
                        <img
                          loading="lazy"
                          alt="Revolt Motors
                          "
                          src="/images/gallery/v-1.jpg"
                        />
                      </a>
                    </div>
                    <div className="item">
                      <a
                        data-fancybox
                        href="https://www.youtube.com/embed/ZRKz7upjfb4"
                      >
                        <i className="fa fa-play"></i>
                        <img
                          loading="lazy"
                          alt="Ev Bike
                          "
                          src="/images/gallery/v-2.jpg"
                        />
                      </a>
                    </div>
                    <div className="item">
                      <a
                        data-fancybox
                        href="https://www.youtube.com/embed/Xv-UJAsxmaY"
                      >
                        <i className="fa fa-play"></i>
                        <img
                          loading="lazy"
                          alt="Bike Location Tracker"
                          src="/images/gallery/v-3.jpg"
                        />
                      </a>
                    </div>
                    <div className="item">
                      <a
                        data-fancybox
                        href="https://www.youtube.com/embed/MwXqVYABtA0"
                      >
                        <i className="fa fa-play"></i>
                        <img
                          loading="lazy"
                          alt="Removable Battery Electric Bike "
                          src="/images/gallery/v-4.jpg"
                        />
                      </a>
                    </div>

                    <div className="item">
                      <a
                        data-fancybox
                        href="https://www.youtube.com/embed/dvDhsABlY_Q"
                      >
                        <i className="fa fa-play"></i>
                        <img
                          loading="lazy"
                          alt="Rechargeable Electric Bike"
                          src="/images/gallery/v-5.jpg"
                        />
                      </a>
                    </div>
                    <div className="item">
                      <a
                        data-fancybox
                        href="https://www.youtube.com/embed/pLz0_xONQEg"
                      >
                        <i className="fa fa-play"></i>
                        <img
                          loading="lazy"
                          alt="Revolt"
                          src="/images/gallery/v-6.jpg"
                        />
                      </a>
                    </div>
                    <div className="item">
                      <a
                        data-fancybox
                        href="https://www.youtube.com/embed/7hrigocQh38"
                      >
                        <i className="fa fa-play"></i>
                        <img
                          loading="lazy"
                          alt="Revolt Motors"
                          src="/images/gallery/v-7.jpg"
                        />
                      </a>
                    </div>
                  </Slider>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="row gop-30">
                  <div className="col-lg-12 col-sm-6 col-12 col-md-6">
                    <div className="dummy-img">
                      <Slider infinite={false} speed={1000}>
                        <div className="item">
                          <a data-fancybox href="/images/gallery/rv1_05.jpg">
                            <img
                              loading="lazy"
                              alt="Headlamp"
                              src="/images/gallery/rv1_05.jpg"
                            />{" "}
                          </a>
                        </div>
                        <div className="item">
                          <a data-fancybox href="/images/gallery/rv1_03.jpg">
                            <img
                              loading="lazy"
                              alt="Headlamp"
                              src="/images/gallery/rv1_03.jpg"
                            />{" "}
                          </a>
                        </div>

                        <div className="item">
                          <a data-fancybox href="/images/gallery/rv1_01.jpg">
                            <img
                              loading="lazy"
                              alt="Headlamp"
                              src="/images/gallery/rv1_01.jpg"
                            />{" "}
                          </a>
                        </div>
                        <div className="item">
                          <a data-fancybox href="/images/gallery/rv1_02.jpg">
                            <img
                              loading="lazy"
                              alt="Headlamp"
                              src="/images/gallery/rv1_02.jpg"
                            />{" "}
                          </a>
                        </div>
                        <div className="item">
                          <a data-fancybox href="/images/gallery/rv1_04.jpg">
                            <img
                              loading="lazy"
                              alt="Headlamp"
                              src="/images/gallery/rv1_04.jpg"
                            />{" "}
                          </a>
                        </div>
                        <div className="item">
                          <a data-fancybox href="/images/gallery/evnt1.png">
                            <img
                              loading="lazy"
                              alt="Electric Bike
                              "
                              src="/images/gallery/evnt1.png"
                            />{" "}
                          </a>
                        </div>
                        <div className="item">
                          <a data-fancybox href="/images/gallery/evnt8.png">
                            <img
                              loading="lazy"
                              alt="Electric Bike
                              "
                              src="/images/gallery/evnt8.png"
                            />{" "}
                          </a>
                        </div>
                        <div className="item">
                          <a data-fancybox href="/images/gallery/evnt15.png">
                            <img
                              loading="lazy"
                              alt="Electric Bike
                              "
                              src="/images/gallery/evnt15.png"
                            />{" "}
                          </a>
                        </div>
                        <div className="item">
                          <a data-fancybox href="/images/gallery/evnt6.png">
                            <img
                              loading="lazy"
                              alt="Electric Bike
                              "
                              src="/images/gallery/evnt6.png"
                            />{" "}
                          </a>
                        </div>
                        <div className="item">
                          <a data-fancybox href="/images/gallery/evnt12.png">
                            <img
                              loading="lazy"
                              alt="Electric Bike
                              "
                              src="/images/gallery/evnt12.png"
                            />{" "}
                          </a>
                        </div>
                        <div className="item">
                          <a data-fancybox href="/images/gallery/i-1.jpg">
                            <img
                              loading="lazy"
                              alt="Electric Bike
                              "
                              src="/images/gallery/i-1t.jpg"
                            />{" "}
                          </a>
                        </div>
                        <div className="item">
                          <a data-fancybox href="/images/gallery/i-1.jpg">
                            <img
                              loading="lazy"
                              alt="Electric Bike
                              "
                              src="/images/gallery/i-1t.jpg"
                            />{" "}
                          </a>
                        </div>
                        <div className="item">
                          <a data-fancybox href="/images/gallery/i-2.jpg">
                            <img
                              loading="lazy"
                              alt="Best Electric Bike"
                              src="/images/gallery/i-2t.jpg"
                            />{" "}
                          </a>
                        </div>
                        <div className="item">
                          <a data-fancybox href="/images/gallery/i-3.jpg">
                            <img
                              loading="lazy"
                              alt="Revolt Electric Bike"
                              src="/images/gallery/i-3t.jpg"
                            />{" "}
                          </a>
                        </div>
                        <div className="item">
                          <a data-fancybox href="/images/gallery/i-4.jpg">
                            <img
                              loading="lazy"
                              alt="Revolt Ev Bike"
                              src="/images/gallery/i-4t.jpg"
                            />{" "}
                          </a>
                        </div>
                        <div className="item">
                          <a data-fancybox href="/images/gallery/i-5.jpg">
                            <img
                              loading="lazy"
                              alt="Revolt RV 400"
                              src="/images/gallery/i-5t.jpg"
                            />{" "}
                          </a>
                        </div>
                        <div className="item">
                          <a data-fancybox href="/images/gallery/i-6.jpg">
                            <img
                              loading="lazy"
                              alt="Charging Electric Bike"
                              src="/images/gallery/i-6t.jpg"
                            />{" "}
                          </a>
                        </div>
                        <div className="item">
                          <a data-fancybox href="/images/gallery/i-7.jpg">
                            <img
                              loading="lazy"
                              alt="Revolt Battery Charger"
                              src="/images/gallery/i-7t.jpg"
                            />{" "}
                          </a>
                        </div>
                        <div className="item">
                          <a data-fancybox href="/images/gallery/i-8.jpg">
                            <img
                              loading="lazy"
                              alt="Electric Bike Suspension"
                              src="/images/gallery/i-8t.jpg"
                            />{" "}
                          </a>
                        </div>
                      </Slider>
                    </div>
                  </div>
                  <div className="col-lg-12 col-sm-6 col-12 col-md-6">
                    <div className="dummy-img">
                      <Slider infinite={false} speed={1000}>
                        <div className="item">
                          <a data-fancybox href="/images/gallery/i-9.jpg">
                            <img
                              loading="lazy"
                              alt="Headlamp"
                              src="/images/gallery/i-9t.jpg"
                            />{" "}
                          </a>
                        </div>
                        <div className="item">
                          <a data-fancybox href="/images/gallery/i-10.jpg">
                            <img
                              loading="lazy"
                              alt="Tail lamp"
                              src="/images/gallery/i-10t.jpg"
                            />{" "}
                          </a>
                        </div>
                        <div className="item">
                          <a data-fancybox href="/images/gallery/i-11.jpg">
                            <img
                              loading="lazy"
                              alt="Indicators"
                              src="/images/gallery/i-11t.jpg"
                            />{" "}
                          </a>
                        </div>
                        <div className="item">
                          <a data-fancybox href="/images/gallery/i-12.jpg">
                            <img
                              loading="lazy"
                              alt="Digital Display Screen"
                              src="/images/gallery/i-12t.jpg"
                            />{" "}
                          </a>
                        </div>
                        <div className="item">
                          <a data-fancybox href="/images/gallery/i-13.jpg">
                            <img
                              loading="lazy"
                              alt="Electric Start"
                              src="/images/gallery/i-13t.jpg"
                            />{" "}
                          </a>
                        </div>
                        <div className="item">
                          <a data-fancybox href="/images/gallery/i-14.jpg">
                            <img
                              loading="lazy"
                              alt="Revolt Electric Bike Safety System
                              "
                              src="/images/gallery/i-14t.jpg"
                            />{" "}
                          </a>
                        </div>
                        <div className="item">
                          <a data-fancybox href="/images/gallery/i-15.jpg">
                            <img
                              loading="lazy"
                              alt="Adjustable Foot Pegs"
                              src="/images/gallery/i-15t.jpg"
                            />{" "}
                          </a>
                        </div>
                      </Slider>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
}

export default Gallery;
