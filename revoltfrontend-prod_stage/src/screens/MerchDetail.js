import React from "react";
import { Link } from "react-router-dom";
import data from "../data";
import { MetaTags } from "react-meta-tags";
function MerchDetail() {
  console.warn(data.productData);
  return (
    <>
      <MetaTags>
        <title>Revolt Merchandise Store - Revolt Motors</title>
        <meta
          name="description"
          content=" Revolt tshirts, helmets from Revolt Merchandise store"
        />

        <meta
          property="og:title"
          content="Revolt Merchandise Store
          "
        />
        <meta
          property="og:description"
          content="Revolt tshirts, helmets from Revolt Merchandise store"
        />
        <link rel="canonical" href="https://www.revoltmotors.com/merch" />
        <meta name="twitter:site" content="@RevoltMotorsIN" />
        <meta
          name="twitter:image"
          content="https://www.revoltmotors.com/images/revolt-motors-logo.svg"
        />
      </MetaTags>

      <section className="inner-banner">
        <a href="https://www.amazon.in/stores/page/3BE6129A-9E66-478F-AE1F-61719B73ECF3?ingress=3">
          <img src="/images/t-shirt-banner.jpg" alt="t-shirt banner" />
        </a>
        <div className="container">{/* <h1>T-Shirts</h1> */}</div>
      </section>

      <nav aria-label="breadcrumb">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <ol class="breadcrumb">
                <li class="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li class="breadcrumb-item active" aria-current="page">
                  T-Shirts
                </li>
              </ol>
            </div>
          </div>
        </div>
      </nav>

      <section className="merch-product padding-top-100">
        <div className="container">
          <div className="row g-4">
            {data.productData.map((item) => {
              return (
                <div className="col-lg-3 col-sm-4" key={item.id}>
                  <div className="merch-product-list">
                    <div className="m-product-img">
                      <img src={item.src} />
                    </div>
                    <div className="m-product-content">
                      <h3>{item.title}</h3>
                      {/* <small>{item.desc}</small>
                        <h4>&#8377;{item.price}/-  <s>&#8377;{item.crossprice}</s></h4> */}
                      <a
                        href={item.link}
                        className="m-product-btn"
                        target="_blank"
                      >
                        Buy Now
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      {/* <section className="text-center py-5">
    <Link className="view-more" to="/">View More</Link>
</section> */}

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

export default MerchDetail;
