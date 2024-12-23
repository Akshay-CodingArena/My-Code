import React, { useEffect } from "react";
import MetaTags from "react-meta-tags";
import clevertap from "clevertap-web-sdk";

function AboutusScreen() {
  useEffect(() => {
    clevertap.event.push("Page View", {
      "Page Name": "About Us",
      "Page Url": window.location.href,
    });
  }, []);

  return (
    <>
      <MetaTags id="about">
        <title>About Us - Revolt Motors</title>

        <meta
          name="description"
          content="Revolt Motors is India's leading EV company, recognised in Fortune 500, serving in 110+ cities in India. Join the movement towards a sustainable and thrilling future with Revolt Motors - pioneering the evolution of transportation.

"
        />
        <meta
          property="og:title"
          content="About Us - Revolt Motors
"
        />
        <meta
          property="og:description"
          content="Book the unlimited motorcycle RV400 from Revolt motors. Don't wait. Get your own #RevoltUNLIMITED now. Visit your nearest Revolt Hub.
"
        />
        <meta name="twitter:site" content="@RevoltMotorsIN" />
        <meta
          name="twitter:image"
          content="https://www.revoltmotors.com/images/revolt-motors-logo.svg"
        />
        <link rel="canonical" href="https://www.revoltmotors.com/about-us" />
      </MetaTags>
      <div className="abt-page-new">
        <section className="mobile-image">
          <img alt="Revolt Motors" src="/images/about-us-banner.jpg" />
        </section>

        <section
          className="banner-aboutus padding-top-60 padding-bottom-100"
          style={{ backgroundImage: "url(/images/abt.jpg)" }}
        >
          <div className="container">
            <div className="row">
              <div className="col-12 col-lg-5">
                <div className="video-title color-black">
                  <h1>
                    WELCOME TO THE<span>REVOLUTION!</span>
                  </h1>
                  <p>
                    <b>“Get your motor runnin' … Head out on the highway”</b>
                  </p>
                  <p>
                    Hair flowing with the wind, the smell of rubber burning over
                    the tarmac and the feeling of being a free bird flying past
                    everybody else. Irreplaceable! Biking is a passion - yes, we
                    know! And we’re here to juice up your biking experience by
                    giving you the pleasure of being on a motorbike, yet you
                    playing the role of knight in shining armor in the mortal’s
                    campaign of “Save The Earth!”. Seriously, let’s contribute
                    to the society we’ve got so much from? Well, it all starts
                    with you!
                  </p>
                  <p>
                    Revolt Motors is the next-gen mobility company, created for
                    the smart world. With technology at its roots and a
                    class-apart product in the works, Revolt has introduced
                    India’s first AI-enabled motorcycle without compromising on
                    the performance or aesthetics of a regular ride.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="page-section padding-top-60 padding-bottom-100">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-12 col-md-4 b-lo">
                <div className="theme-content no-case">
                  <h3>Vision</h3>
                  <p className="mb-0">
                    Democratising clean commute using next-gen mobility
                    solutions.
                  </p>
                </div>
              </div>
              <div className="col-12 col-md-4">
                <div className="theme-content no-case">
                  <h3>Mission</h3>
                  <p className="mb-0">
                    To create a future of next-gen mobility with 100%
                    accessibility and 0% fuel residue.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="page-section padding-top-60 padding-bottom-100 gallery-page">
          <div className="container">
            <div className="row align-items-center gap-mo">
              <div className="col-12 col-md-6">
                <div className="theme-content">
                  <h3>OUR IDENTITY</h3>
                  <p>
                    In with the new, is something achieved by a few. Merging
                    passion with purpose, Revolt on the road will give city
                    dwellers a revolutionary way to commute and connect,
                    charting the future for generations to come.
                  </p>
                  <p className="mb-0">
                    Its identity is founded at the convergence of two directions
                    — the back arrow signifying learnings and values of the past
                    and, the forward arrow, clean energy for the future.
                    Together, like its namesake, Revolt takes the Revolution
                    ahead, going against the grain to herald in a new dimension
                    of the next-gen mobility.
                  </p>
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="img-space abtbs-img">
                  <img alt="Revolt" src="/images/logo-black-large.png" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default AboutusScreen;
