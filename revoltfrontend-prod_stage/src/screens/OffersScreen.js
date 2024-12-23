import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import MetaTags from "react-meta-tags";

function OffersScreen() {
  const navigate = useNavigate();
  return (
    <>
      <div className="image-abts">
        <Link to="/book">
          <img
            className="desktop"
            src="/images/newhomepage/BannersDesktop/revolt_banner.webp"
            alt="RV400 BRZ"
          />
          <img
            className="mobile"
            src="/images/newhomepage/BannersMobile/revolt_banner_2.webp"
            alt="RV400 BRZ"
          />{" "}
        </Link>
      </div>

      <section
        className="product-spec padding-top-100"
        id="mainproduct_Collapse"
      >
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-6">
              <div className="theme-content mob-bl text-center">
                <h3 className="m-0">Offers On RV400</h3>
              </div>
              <div className="bike-info-card-section  my-4 mx-0">
                <div className="product-card offer-product">
                  <div className="product-head text-center bg-white">
                    <figure className="m-0">
                      <img
                        src={"/images/400.png"}
                        alt="book?model=RV400"
                        className="rounded"
                        style={{ maxWidth: " 100%", background: "white" }}
                      />
                    </figure>
                  </div>
                  <div className="product-body">
                    <h5 className="bike-model">Revolt RV400 </h5>
                    <p className="font-weight-bold fs-8 mt-2">Festive Offer</p>
                    <p className="m-0 text-left">
                      Get flat ₹10,000 off* + Additional benefits worth up to
                      ₹23,200* on RV400
                    </p>
                  </div>
                  <hr />
                  <div className="product-footer">
                    <button
                      type="button"
                      className="book-now m-0"
                      onClick={() => {
                        navigate("/book?model=RV400");
                      }}
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 ">
              <div className="theme-content mob-bl text-center">
                <h3 className="m-0">Offers On RV400 BRZ</h3>
              </div>
              <div className="bike-info-card-section my-4 mx-0">
                <div className="product-card offer-product">
                  <div className="product-head text-center bg-white">
                    <figure className="m-0">
                      <img
                        src={"/images/BRZ.png"}
                        alt="rv400"
                        className="rounded"
                        style={{ maxWidth: " 100%" }}
                      />
                    </figure>
                  </div>
                  <div className="product-body">
                    <h5 className="bike-model">Revolt RV400 BRZ</h5>
                    <p className="font-weight-bold fs-8 mt-2">Festive Offer</p>
                    <p className="m-0 text-left">
                      Get flat ₹15,000 off* + Additional benefits worth up to
                      ₹25,700* on RV400 BRZ
                    </p>
                  </div>
                  <hr />
                  <div className="product-footer">
                    <button
                      type="button"
                      className="book-now m-0"
                      onClick={() => {
                        navigate("/book");
                      }}
                    >
                      Book Now
                    </button>
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

export default OffersScreen;
