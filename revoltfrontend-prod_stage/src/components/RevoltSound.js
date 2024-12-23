import React, { useEffect } from "react";

export default React.memo(function RevoltSound(props) {
  useEffect(() => {
    console.log("........Bewdoooooooo.................");
    if (!document.querySelector(".revolt-sound source")?.getAttribute("src")) {
      Array.from(document.querySelectorAll(".revolt-sound source")).forEach(
        (element, index) => {
          document.querySelectorAll(".revolt-sound audio")[index].src =
            element.getAttribute("audio-src");
        },
      );
    }
    if (props.loadScript) {
      props
        .loadScript("/js/bikesound.js")
        .then(() => console.log("Sounds loadded.................."));
    }
  }, []);

  return (
    <section className="page-section padding-top-60 padding-bottom-100 bike-bg">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6 col-12 col-md-7 col-sm-12">
            <div className="theme-content">
              <h3>YOU MAKE THE CHOICE. FOUR SOUNDS OR, NO SOUND AT ALL.</h3>
              <p>
                A first-in class innovation where Revolt brings to you four
                sounds in a motorcycle, all controlled through the MyRevolt App.
                Go on, select one of the four sounds of Revolt RV400
              </p>

              <div className="revolt-sound">
                <div>
                  <audio controls id="audio-outer1" preload="auto">
                    <source
                      id="audio-play1"
                      src="/audio/Revolt.mp3"
                      type="audio/mpeg"
                    />
                  </audio>
                  <audio controls id="audio-outer2" preload="auto">
                    <source
                      id="audio-play2"
                      src="/audio/Roar.mp3"
                      type="audio/mpeg"
                    />
                  </audio>
                  <audio controls id="audio-outer3" preload="auto">
                    <source
                      id="audio-play3"
                      src="/audio/Rage.mp3"
                      type="audio/mpeg"
                    />
                  </audio>
                  <audio controls id="audio-outer4" preload="auto">
                    <source
                      id="audio-play4"
                      src="/audio/Rebel.mp3"
                      type="audio/mpeg"
                    />
                  </audio>
                </div>
                <div className="row">
                  <div className="col-lg-6 col-12 col-sm-6">
                    <div className="revolt-data" data-src="A">
                      <div>Revolt</div>
                      <div>
                        <div className="vertical-lines">
                          <div className="vertical h-1"></div>
                          <div className="vertical h-2"></div>
                          <div className="vertical h-3"></div>
                          <div className="vertical h-4"></div>
                          <div className="vertical h-5"></div>
                          <div className="vertical h-6"></div>
                          <div className="vertical h-7"></div>
                          <div className="vertical h-8"></div>
                          <div className="vertical h-9"></div>
                          <div className="vertical h-10"></div>
                        </div>
                      </div>
                      <div>
                        <div className="play-icon"></div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-12 col-sm-6">
                    <div className="revolt-data" data-src="B">
                      <div>Rebel</div>
                      <div>
                        <div className="vertical-lines">
                          <div className="vertical h-1"></div>
                          <div className="vertical h-2"></div>
                          <div className="vertical h-3"></div>
                          <div className="vertical h-4"></div>
                          <div className="vertical h-5"></div>
                          <div className="vertical h-6"></div>
                          <div className="vertical h-7"></div>
                          <div className="vertical h-8"></div>
                          <div className="vertical h-9"></div>
                          <div className="vertical h-10"></div>
                        </div>
                      </div>
                      <div>
                        <div className="play-icon"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-6 col-12 col-sm-6">
                    <div className="revolt-data" data-src="C">
                      <div>Roar</div>
                      <div>
                        <div className="vertical-lines">
                          <div className="vertical h-1"></div>
                          <div className="vertical h-2"></div>
                          <div className="vertical h-3"></div>
                          <div className="vertical h-4"></div>
                          <div className="vertical h-5"></div>
                          <div className="vertical h-6"></div>
                          <div className="vertical h-7"></div>
                          <div className="vertical h-8"></div>
                          <div className="vertical h-9"></div>
                          <div className="vertical h-10"></div>
                        </div>
                      </div>
                      <div>
                        <div className="play-icon"></div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-12 col-sm-6">
                    <div className="revolt-data" data-src="D">
                      <div>Rage</div>
                      <div>
                        <div className="vertical-lines">
                          <div className="vertical h-1"></div>
                          <div className="vertical h-2"></div>
                          <div className="vertical h-3"></div>
                          <div className="vertical h-4"></div>
                          <div className="vertical h-5"></div>
                          <div className="vertical h-6"></div>
                          <div className="vertical h-7"></div>
                          <div className="vertical h-8"></div>
                          <div className="vertical h-9"></div>
                          <div className="vertical h-10"></div>
                        </div>
                      </div>
                      <div>
                        <div className="play-icon"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});
