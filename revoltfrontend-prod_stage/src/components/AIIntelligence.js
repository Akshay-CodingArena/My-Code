import { useState } from "react";
import { MetaTags } from "react-meta-tags";
import Slider from "react-slick";

function AIIntelligence(props) {
  const [nav3, setNav3] = useState();
  const [nav4, setNav4] = useState();

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

  return (
    <>
      <section className={`page-section ${props.dataClass}`}>
        <div id="intelligence"></div>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="theme-content d-none mob-bl">
                <h3>INDIA'S FIRST AI ENABLED MOTORCYCLE</h3>
              </div>
            </div>
          </div>
          <div className="row align-items-center mob-order">
            <div className="col-lg-6 col-12 col-md-6 col-sm-12">
              <div className="mob-content hidef">
                <h3>INDIA'S FIRST AI ENABLED MOTORCYCLE</h3>
                <Slider
                  {...settings}
                  vertical={true}
                  slidesToShow={4}
                  arrows={false}
                  autoplay={true}
                  speed={1200}
                  asNavFor={nav4}
                  ref={(slider4) => setNav3(slider4)}
                >
                  <li>Why can't you Geo-Locate your motorcycle?</li>
                  <li>Why can't you Change your motorcyle's sound?</li>
                  <li>Why can't you Geo-Fence your motorcycle?</li>
                  <li>
                    Why can’t you switch your motorcycle’s battery for a fresh
                    one?
                  </li>
                </Slider>
              </div>
            </div>
            <div className="col-lg-6 col-12 col-md-6 col-sm-12">
              <div className="font-img">
                <div id="phone-bg-list">
                  <div className="mobileslider123">
                    <Slider
                      arrows={false}
                      autoplay={true}
                      speed={1200}
                      asNavFor={nav3}
                      ref={(slider3) => setNav4(slider3)}
                    >
                      <div className="item">
                        <div className="sli-img">
                          <img
                            alt="Gps Tracker For Bike"
                            src="/images/locate-your-motorcycle.jpg"
                          />
                        </div>
                      </div>
                      <div className="item">
                        <div className="sli-img">
                          <img
                            alt="Electric Motorcycle Sound
"
                            src="/images/motorcycle-roar.jpg"
                          />
                        </div>
                      </div>
                      <div className="item">
                        <div className="sli-img">
                          <img
                            alt="Geo Fencing In Bike
                            "
                            src="/images/geo--fence-your-revolt.jpg"
                          />
                        </div>
                      </div>
                      <div className="item">
                        <div className="sli-img">
                          <img
                            alt="Swap Station"
                            src="/images/locate-a-swap-station.jpg"
                          />
                        </div>
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

export default AIIntelligence;
