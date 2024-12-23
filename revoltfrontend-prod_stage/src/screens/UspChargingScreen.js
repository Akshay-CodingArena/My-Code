import React from "react";
// import RevoltMap from '../components/revoltmap';
import MetaTags from "react-meta-tags";
function UspChargingScreen() {
  return (
    <>
      <MetaTags id="charging">
        <title>
          Revolt Electric Bikes: Fast & Smart Charging with Best-in-Class IP67
          Battery
        </title>
        <link rel="canonical" href="https://www.revoltmotors.com/charging" />
        <meta
          name="description"
          content="Experience effortless rides with Revolt electric bikes featuring best-in-class technology, including an IP67 battery and other innovative battery features. Enjoy fast and smart charging capabilities, ensuring smooth and effortless electric bike adventures.

"
        />
      </MetaTags>
      <section className="video-para mainBanner d-flex align-items-center">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="video-title">
                <h1>
                  THE CHARGING <span>MULTIVERSE</span>
                </h1>
              </div>
            </div>
          </div>
        </div>

        <video id="custvideo3" muted loop autoPlay={true} playsinline="">
          <source src="/images/Revolt-Video-New.mp4" type="video/mp4" />
          <source src="/images/Revolt-Video-New.ogg" type="video/ogg" />
        </video>
      </section>

      <section className="onboard padding-top-100">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="top-nav-check">
                <ul className="nav nav-tabs-new usp_chaging_new justify-content-between">
                  <li className="nav-item ">
                    <a
                      className="nav-link active"
                      href="#tab-1"
                      data-toggle="tab"
                    >
                      On-board charging
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#tab-2" data-toggle="tab">
                      portable charging
                    </a>
                  </li>
                  {/* <li className="nav-item">
                                                       <a href="#tab-3" className="nav-link" data-toggle="tab">Revolt Switch Stations</a>
                                                  </li>
                                                  <li className="nav-item last">
                                                       <a href="#tab-4" className="nav-link" data-toggle="tab">SOS Delivery</a>
                                                  </li> */}
                </ul>
              </div>

              <div className="bottomTabContent">
                <div className="tab-content">
                  <div className="tab-pane fade in active show" id="tab-1">
                    <div className="row align-items-center">
                      <div className="col-6">
                        <div className="tab-lCont">
                          <h4>Park It And Charge it!</h4>
                          <p>
                            This is the most convenient way to charge the
                            battery. Just plug your RV’s charger into a standard
                            15 Amp power socket and let the motorcycle feed
                            itself.
                          </p>
                          <p>
                            <b>Stop. Plug-in. Charge.</b>
                          </p>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="img-sd">
                          <img
                            alt="Revolt RV400"
                            src="images/onboading-charger.jpg"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="tab-pane fade" id="tab-2">
                    <div className="row align-items-center">
                      <div className="col-6">
                        <div className="tab-lCont">
                          <h4>Charge it like your phone</h4>
                          <p>
                            If you do not have a power source near the RV400,
                            simply remove the battery and charge it in the
                            confines of your home or office.
                          </p>
                          <p>
                            <b>Remove. Carry. Charge.</b>
                          </p>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="img-sd">
                          <img
                            alt="Battery And Charger For Electric Bike"
                            src="/images/charger-battery-new.jpg"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <div className="tab-pane fade" id="tab-3">
                                                         <div className='row align-items-center'>
                                                                <div className='col-6'>
                                                                       <div className='tab-lCont'>
                                                                              <h4>Grab energy within seconds</h4>
                                                                              <p>If you are on the move and the low battery indicator is on, you can visit the nearest Revolt Switch Station through the MyRevolt app and exchange your drained-out battery for a fresh one in no time.</p>
                                                                              <p><b>Find. Switch. Zoom off.</b></p>
                                                                       </div>
                                                                </div>
                                                                <div className='col-6'>
                                                                       <div className='img-sd'>
                                                                              <img alt='' src='/images/charging-meter1.png' />
                                                                       </div> 
                                                                </div>
                                                         </div> 
                                                   </div>  */}
                  {/* <div className="tab-pane fade" id="tab-4">
                                                         <div className='row align-items-center'>
                                                                <div className='col-6'>
                                                                       <div className='tab-lCont'>
                                                                              <h4>We always have your back</h4>
                                                                              <p>In case, you run out of battery charge and do not have access to any of the above battery charging options leaving you stranded, you can order a fully-charged battery through the MyRevolt app and we will come to the rescue.</p>
                                                                              <p><b>Grounded. Messaged. Rescued.</b></p>
                                                                              <p>Delivery time: 90 minutes (may vary depending on traffic conditions)</p>
                                                                       </div>
                                                                </div>
                                                                <div className='col-6'>
                                                                       <div className='img-sd'>
                                                                              <img alt='' src='/images/charge-car.png' />
                                                                       </div> 
                                                                </div>
                                                         </div>  
                                                   </div>   */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="least-about padding-top-100 padding-bottom-100">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-12 col-md-6">
              <div className="theme-content padding-rd">
                <h3>
                  THE ARSENAL OF <br></br>REVOLT'S ENERGY
                </h3>
                <p>
                  Revolt Motorcycles’ are powered by their sophisticated yet
                  simple batteries which store the energy to move the revolution
                  forward. Time has come to abolish the morning ritual of
                  queuing at petrol pumps.
                </p>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="text-img">
                <img
                  alt="Battery And Charger For Electric Bike"
                  src="/images/revoltcharging.jpg"
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12 col-md-4">
              <div className="en-box">
                <div className="icon-place">
                  <img alt="Touch Safe Icon" src="/images/touch-safe.jpg" />
                </div>
                <h3>Touch-safe</h3>
                <p>
                  All batteries are tested for safety and are touch safe.
                  Although, it's durability will shock some people.
                </p>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="en-box">
                <div className="icon-place">
                  <img
                    alt="Portable Charging Icon"
                    src="/images/easily-portable.jpg"
                  />
                </div>
                <h3>Easily portable</h3>
                <p>
                  A sleek and compatible design makes the battery easily
                  portable to your home or office,
                </p>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="en-box">
                <div className="icon-place">
                  <img
                    alt="Weather Proofing Icon"
                    src="/images/waether-proffing.jpg"
                  />
                </div>
                <h3>Weather proofing</h3>
                <p>
                  Tested in all types of weathers. It's robust, strong and
                  faithful.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="identity padding-top-100 padding-bottom-100"
        style={{ backgroundImage: 'url("images/inbg_bike.jpg")' }}
      >
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="theme-content white-color text-center">
                <h3>TECHNICAL SPECS</h3>
              </div>
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="col-md-9 col-lg-7 col-12">
              <div className="table-spec">
                <table>
                  <tbody>
                    <tr>
                      <td>Battery type</td>
                      <td>Lithium-ion</td>
                    </tr>
                    <tr>
                      <td>Portable Charger</td>
                      <td>15Amp</td>
                    </tr>
                    <tr>
                      <td>Voltage/Wattage</td>
                      <td>72V, 3.24kWh</td>
                    </tr>
                    <tr>
                      <td>Charging time</td>
                      <td>
                        0-75% in 3 hours and
                        <br />
                        0-100% in 4.5 hours
                      </td>
                    </tr>
                    <tr>
                      <td>Warranty</td>
                      <td>
                        Revolt Motors provides a warranty on Battery for 5 years
                        or 75,000 Kilometres *, whichever occurs first, and on
                        Charger for 2 years only, from the date of purchase.
                      </td>
                    </tr>
                  </tbody>
                </table>
                <p style={{ "font-size": "12px", "margin-top": "10px" }}>
                  * "Standard warranty shall be for 3 years or 40,000 kilometers
                  (whichever occurs first) on Vehicle and 3.25 years or 40,000
                  kilometers (whichever occurs first) on Battery, from the date
                  of purchase of vehicle. Remaining period / kilometers of
                  warranty shall be treated as extended warranty and shall be
                  provided by Revolt’s authorized service provider only, subject
                  to subscription in Revolt Protect Plan. Customer can subscribe
                  to Revolt Protect Plan at nominal subscription charge.
                  Customer to contact authorized service provider to avail
                  extended warranty".
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <RevoltMap></RevoltMap> */}
    </>
  );
}

export default UspChargingScreen;
