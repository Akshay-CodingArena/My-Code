import { Link } from "react-router-dom";
import React from "react";

const BannersHomeScreen = ({ data }) => {
  return (
    <>
      {data ? (
        data?.map((item) => (
          <div className="slider-banner">
            <div className="banner-slider">
              <Link
                to={
                  item.mobile.redirect_link?.replace(
                    window.location.origin,
                    "",
                  ) ?? ""
                }
              >
                <div style={{ position: "relative" }}>
                  <picture>
                    <source
                      media="(max-width: 768px)"
                      srcSet={item.mobile_url}
                    />
                    <img
                      style={{
                        postion: "absolute",
                        top: "0px",
                        left: "0px",
                      }}
                      // onLoad={()=>{
                      //   document.querySelectorAll("#low_banner")[0].style.visibility="hidden"}
                      //   }
                      src={item.desktop_url}
                      loading="lazy"
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
        ))
      ) : (
        <div id="banners-container" className="slider-banner">
          <div className="banner-slider">
            <picture>
              <source
                media="(max-width: 768px)"
                srcSet="/images/newhomepage/BannersMobile/Revolt_Zero-Downpayment_Low.jpg"
              />
              <img
                style={{
                  postion: "absolute",
                  top: "0px",
                  left: "0px",
                }}
                src="/images/newhomepage/BannersDesktop/Revolt_Zero-Downpayment_Low.jpg"
                loading="lazy"
                alt=""
              />
            </picture>
          </div>
        </div>
      )}
    </>
  );
};

export default BannersHomeScreen;
