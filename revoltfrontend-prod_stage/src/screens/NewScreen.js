import React from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import MetaTags from "react-meta-tags";
function NewScreen() {
  const settings = {
    arrows: false,
    centerMode: true,
    centerPadding: "150px",
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    speed: 2500,
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
          centerPadding: "0px",
          slidesToShow: 1,
        },
      },
    ],
  };

  const homeSlide = {
    speed: 2500,
    autoplay: true,
    autoplaySpeed: 5000,
    infinite: true,
    pauseOnHover: false,
    pauseOnFocus: false,
    dots: true,
    vertical: true,
  };

  return (
    <>
      <section className="banner-page home-slider">
        <Slider {...homeSlide}>
          <div className="slider-banner">
            <div className="banner-slider">
              <a href="https://www.amazon.in/stores/page/3BE6129A-9E66-478F-AE1F-61719B73ECF3?ingress=3">
                <img
                  className="desktop"
                  src="/images/newhomepage/BannersDesktop/home-banner1.jpg"
                  alt=""
                />
                <img
                  className="mobile"
                  src="/images/newhomepage/BannersMobile/24.png"
                  alt=""
                />
              </a>
            </div>
          </div>

          <div className="slider-banner">
            <div className="banner-slider">
              <a href="https://www.amazon.in/stores/page/3BE6129A-9E66-478F-AE1F-61719B73ECF3?ingress=3">
                <img
                  className="desktop"
                  src="/images/newhomepage/BannersDesktop/home-banner1.jpg"
                  alt=""
                />
                <img
                  className="mobile"
                  src="/images/newhomepage/BannersMobile/24.png"
                  alt=""
                />
              </a>
            </div>
          </div>
        </Slider>
      </section>

      <section className="new-arrivals padding-top-100">
        <h2 className="text-center heading">NEW ARRIVALS</h2>
        <Slider {...settings}>
          <div>
            <a href="https://www.amazon.in/stores/page/3BE6129A-9E66-478F-AE1F-61719B73ECF3?ingress=3">
              <div className="new-arrival-list">
                <div className="nal-img">
                  <img
                    src="/images/new-arrival/new-arrival1.jpg"
                    alt=""
                    className="img-fluid"
                  />
                  <img
                    src="/images/new-arrival/rv-logo.png"
                    alt=""
                    className="rv-log"
                  />
                </div>
                <div className="nal-hover">T-shirt</div>
              </div>
            </a>
          </div>
          <div>
            <a href="https://www.amazon.in/stores/page/3BE6129A-9E66-478F-AE1F-61719B73ECF3?ingress=3">
              <div className="new-arrival-list">
                <div className="nal-img">
                  <img
                    src="/images/new-arrival/new-arrival2.jpg"
                    alt=""
                    className="img-fluid"
                  />
                  <img
                    src="/images/new-arrival/rv-logo.png"
                    alt=""
                    className="rv-log"
                  />
                </div>
                <div className="nal-hover">T-shirt</div>
              </div>
            </a>
          </div>
          <div>
            <a href="https://www.amazon.in/stores/page/3BE6129A-9E66-478F-AE1F-61719B73ECF3?ingress=3">
              <div className="new-arrival-list">
                <div className="nal-img">
                  <img
                    src="/images/new-arrival/new-arrival3.jpg"
                    alt=""
                    className="img-fluid"
                  />
                  <img
                    src="/images/new-arrival/rv-logo.png"
                    alt=""
                    className="rv-log"
                  />
                </div>
                <div className="nal-hover">T-shirt</div>
              </div>
            </a>
          </div>
          <div>
            <a href="https://www.amazon.in/stores/page/3BE6129A-9E66-478F-AE1F-61719B73ECF3?ingress=3">
              <div className="new-arrival-list">
                <div className="nal-img">
                  <img
                    src="/images/new-arrival/new-arrival4.jpg"
                    alt=""
                    className="img-fluid"
                  />
                  <img
                    src="/images/new-arrival/rv-logo.png"
                    alt=""
                    className="rv-log"
                  />
                </div>
                <div className="nal-hover">T-shirt</div>
              </div>
            </a>
          </div>
          <div>
            <a href="https://www.amazon.in/stores/page/3BE6129A-9E66-478F-AE1F-61719B73ECF3?ingress=3">
              <div className="new-arrival-list">
                <div className="nal-img">
                  <img
                    src="/images/new-arrival/new-arrival5.jpg"
                    alt=""
                    className="img-fluid"
                  />
                  <img
                    src="/images/new-arrival/rv-logo.png"
                    alt=""
                    className="rv-log"
                  />
                </div>
                <div className="nal-hover">T-shirt</div>
              </div>
            </a>
          </div>
          <div>
            <a href="https://www.amazon.in/stores/page/3BE6129A-9E66-478F-AE1F-61719B73ECF3?ingress=3">
              <div className="new-arrival-list">
                <div className="nal-img">
                  <img
                    src="/images/new-arrival/new-arrival6.jpg"
                    alt=""
                    className="img-fluid"
                  />
                  <img
                    src="/images/new-arrival/rv-logo.png"
                    alt=""
                    className="rv-log"
                  />
                </div>
                <div className="nal-hover">T-shirt</div>
              </div>
            </a>
          </div>
          <div>
            <a href="https://www.amazon.in/stores/page/3BE6129A-9E66-478F-AE1F-61719B73ECF3?ingress=3">
              <div className="new-arrival-list">
                <div className="nal-img">
                  <img
                    src="/images/new-arrival/new-arrival7.jpg"
                    alt=""
                    className="img-fluid"
                  />
                  <img
                    src="/images/new-arrival/rv-logo.png"
                    alt=""
                    className="rv-log"
                  />
                </div>
                <div className="nal-hover">T-shirt</div>
              </div>
            </a>
          </div>
          <div>
            <a href="https://www.amazon.in/stores/page/3BE6129A-9E66-478F-AE1F-61719B73ECF3?ingress=3">
              <div className="new-arrival-list">
                <div className="nal-img">
                  <img
                    src="/images/new-arrival/new-arrival8.jpg"
                    alt=""
                    className="img-fluid"
                  />
                  <img
                    src="/images/new-arrival/rv-logo.png"
                    alt=""
                    className="rv-log"
                  />
                </div>
                <div className="nal-hover">T-shirt</div>
              </div>
            </a>
          </div>
        </Slider>
      </section>

      <section className="category-collection padding-top-100">
        <div className="container-fluid p-0">
          <h2 className="text-uppercase text-center heading">
            Category Collection
          </h2>

          <div className="row g-0">
            <div className="col-lg-6 col-sm-6">
              <div className="category-list">
                <Link to="/">
                  <img
                    src="/images/category/__780X522-01.jpg"
                    alt=""
                    className="img-fluid"
                  />
                </Link>
                <div className="hover product-hover">
                  <div className="hover-product-content">
                    <div className="hpc-icon">
                      <img src="images/revolt-t-shirt.svg" alt="" />
                      <Link to="/merch" className="explore-more">
                        Explore More <i class="fa fa-long-arrow-right"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6 col-sm-6">
              <div className="category-list">
                <Link to="/">
                  <img
                    src="/images/category/jacket.png"
                    alt=""
                    className="img-fluid"
                  />
                </Link>
                <div className="hover">
                  <div className="coming-soon">Coming Soon... </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6 col-sm-6">
              <div className="category-list">
                <Link to="/">
                  <img
                    src="/images/category/helmet.png"
                    alt=""
                    className="img-fluid"
                  />
                </Link>
                <div className="hover">
                  <div className="coming-soon">Coming Soon... </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6 col-sm-6">
              <div className="category-list">
                <Link to="/">
                  <img
                    src="/images/category/jeans.png"
                    alt=""
                    className="img-fluid"
                  />
                </Link>
                <div className="hover">
                  <div className="coming-soon">Coming Soon... </div>
                </div>
              </div>
            </div>

            {/* <div className="col-lg-6 col-sm-6">
                <div className="category-list">
                    <Link to='/'>
                      <img src="/images/category/shirt.png" alt="" className='img-fluid' />
                    </Link>
                    <div className="hover">
                      <div className="coming-soon">Coming Soon... </div>
                    </div>
                </div>
              </div>    */}
          </div>
        </div>
      </section>
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
            {/* <div className="col-6 col-sm-6 col-md-6 col-lg-3">
                          <div className="link-sec">
                              <Link to="/notifyme">
                                  <div className="d-flex align-items-center justify-content-center">
                                      <div className="logo-f lo-2" />
                                      <div className="lp-cont">
                                      Unlock Your City
                                      </div>
                                  </div>
                              </Link>
                          </div>
                      </div> */}
            <div className="col-6 col-sm-6 col-md-6 col-lg-3">
              <div className="link-sec">
                <Link to="/about-us">
                  <div className="d-flex align-items-center justify-content-center">
                    <div className="logo-f lo-2" />
                    <div className="lp-cont">About Us</div>
                  </div>
                </Link>
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
    </>
  );
}

export default NewScreen;
