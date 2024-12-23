import { MetaTags } from "react-meta-tags";
import AIIntelligence from "../components/AIIntelligence";

function Intelligence() {
  return (
    <>
      <MetaTags>
        <title>Revolt Motors: Best-in-Class AI Features for Smart Riding</title>
        <meta
          name="description"
          content="Experience the future of electric bikes with Revolt. Rapid charging in 4.5 hrs, top speed of 85 km/h, and a range of 150 kms per charge. Upgrade to AI-enabled biking for effortless, efficient rides!"
        />
        <meta
          property="og:title"
          content="Revolt Motors: Best-in-Class AI Features for Smart Riding"
        />
        <meta
          property="og:description"
          content="Experience the future of electric bikes with Revolt. Rapid charging in 4.5 hrs, top speed of 85 km/h, and a range of 150 kms per charge. Upgrade to AI-enabled biking for effortless, efficient rides!"
        />
        <link rel="canonical" href="https://www.revoltmotors.com/ai-enabled" />
        <meta name="twitter:site" content="@RevoltMotorsIN" />
        <meta
          name="twitter:image"
          content="https://www.revoltmotors.com/images/revolt-motors-logo.svg"
        />
      </MetaTags>
      <section className="video-para mainBanner d-flex align-items-center">
        {/* <div className='container'>
                            <div className='row'>
                                    <div className='col-12'>
                                            <div className='video-title'>
                                                    <h1>THE CHARGING <span>MULTIVERSE</span></h1>
                                            </div>
                                    </div>
                            </div>
                        </div> */}

        <video id="custvideo3" playsinline="" muted loop autoPlay={true}>
          <source src="/images/ai-enabled.mp4" type="video/mp4" />
        </video>
      </section>

      <AIIntelligence dataClass="padding-top-100 padding-bottom-100"></AIIntelligence>
    </>
  );
}

export default Intelligence;
