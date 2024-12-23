import React, { useEffect } from "react";
import MetaTags from "react-meta-tags";
import clevertap from "clevertap-web-sdk";

function MediaScreen() {
  const media = [
    {
      title: "Revolt Motors Y-o-Y sales surge 197% to 1,994 units",
      discription: "",
      date: "Wednesday, December 4, 2024",
      link: "https://auto.economictimes.indiatimes.com/news/two-wheelers/revolt-motors-y-o-y-sales-surge-197-to-1994-units/115964331",
    },
    {
      title: "Revolt Motors e-motorcycle sales triple to 1,994 units in Nov",
      discription: "",
      date: "Wednesday, December 4, 2024",
      link: "https://www.ptinews.com/story/business/revolt-motors-e-motorcycle-sales-triple-to-1-994-units-in-nov/2041565",
    },
    {
      title:
        "Revolt Motors expands operations to Sri Lanka with RV400 & RV400 BRZ e-bikes",
      discription: "",
      date: "Friday, November 29, 2024",
      link: "https://auto.hindustantimes.com/auto/electric-vehicles/revolt-motors-expands-operations-to-sri-lanka-with-rv400-rv400-brz-ebikes-41732859852117.html",
    },
    {
      title: "Revolt Motors forays into Sri Lanka with RV400 and RV400 BRZ",
      discription: "",
      date: "Thursday, November 28, 2024",
      link: "https://auto.economictimes.indiatimes.com/news/two-wheelers/revolt-motors-forays-into-sri-lanka-with-rv400-and-rv400-brz/115762811",
    },

    {
      title: "Revolt Motors opens its first dealership in Colombo, Sri Lanka",
      discription: "",
      date: "Thursday, November 28, 2024",
      link: "https://www.business-standard.com/markets/capital-market-news/revolt-motors-opens-its-first-dealership-in-colombo-sri-lanka-124112800159_1.html",
    },
    {
      title:
        "Revolt RV1 commuter electric bike launched at Rs 85k, gets up to 160 km range",
      discription: "",
      date: "Tuesday, September 17, 2024",
      link: "https://www.financialexpress.com/auto/bike-news/revolt-rv1-commuter-electric-bike-launched-at-rs-85k-gets-up-to-160-km-range/3614138/",
    },
    {
      title: "EV maker Revolt Motors launches RV1..",
      discription: "",
      date: "Tuesday, September 17, 2024",
      link: " https://economictimes.indiatimes.com/industry/renewables/ev-maker-revolt-motors-launches-rv1-here-is-the-price-and-range-and-specs-of-new-bike/articleshow/113430575.cms?from=mdr",
    },
    {
      title: "EV maker Revolt Motors launches RV1..",
      discription: "",
      date: "Tuesday, September 17, 2024",
      link: " https://economictimes.indiatimes.com/industry/renewables/ev-maker-revolt-motors-launches-rv1-here-is-the-price-and-range-and-specs-of-new-bike/articleshow/113430575.cms?from=mdr",
    },

    {
      title: "Revolt RV1 Launched At ₹ 84,990; Offers 100 Kilometres Range..",
      discription: "",
      date: "Tuesday, September 17, 2024",
      link: "https://www.ndtv.com/auto/revolt-rv1-launched-at-rs-84-990-offers-100-kilometres-range-6591724",
    },
    {
      title: "Revolt Motors enters Sri Lankan market with electric motorcycles",
      discription: "",
      date: "Monday, September 16, 2024",
      link: "https://www.thehindubusinessline.com/markets/stock-markets/revolt-motors-enters-sri-lankan-market-with-electric-motorcycles/article68647391.ece",
    },
    {
      title: "Revolt Motors secures approval for subsidy...",
      discription: "",
      date: "Tuesday, July  30, 2024",
      link: "https://auto.economictimes.indiatimes.com/news/two-wheelers/revolt-motors-secures-approval-for-subsidy-under-emps/112133947",
    },
    {
      title: "Revolt Motors Wows At Sri Lanka EV Auto Show 2024...",
      discription: "",
      date: "Friday, July  12, 2024",
      link: "https://www.drivespark.com/two-wheelers/2024/revolt-motors-electric-bikes-sri-lanka-ev-auto-show-2024-011-052641.html",
    },
    {
      title: 'Revolt Motors makes EV more affordable with "4 Chauke Offer"',
      discription: "",
      date: "Wednesday, July  10, 2024",
      link: "https://www.business-standard.com/markets/capital-market-news/revolt-motors-makes-ev-more-affordable-with-4-chauke-offer-124071000570_1.html",
    },
    {
      title: "Rattanindia Enterprises reduces electric bike prices...",
      discription: "",
      date: "Wednesday, May  08, 2024",
      link: "https://www.thehindubusinessline.com/markets/rattanindia-enterprises-reduces-electric-bike-prices/article68152313.ece",
    },
    {
      title:
        "Revolt Motors expands to 115 dealerships with 15 new outlets across India...",
      discription: "",
      date: "Wednesday, February  21, 2024",
      link: "https://www.cnbctv18.com/auto/revolt-motors-expands-to-115-dealerships-with-15-new-outlets-across-india-19100341.htm",
    },

    {
      title:
        "Revolt RV400 BRZ launched at 1.34 lakh, gets up to 150 km of range...",
      discription: "",
      date: "Tuesday, January  23, 2024",
      link: "https://auto.hindustantimes.com/auto/electric-vehicles/revolt-rv400-brz-launched-at-rs-1-34-lakh-gets-up-to-150-km-of-range-41705991138939.html",
    },

    {
      title: "Revolt RV400 launched in new colour scheme...",
      discription: "",
      date: "Wednesday, December 13, 2023",
      link: "https://www.financialexpress.com/auto/electric-vehicles/revolt-rv400-launched-in-new-colour-scheme/3337315/",
    },
    {
      title:
        "Revolt Motors Introduces This New Colour Option With The RV400...",
      discription: "",
      date: "Tuesday, November 09, 2023",
      link: "https://www.timesnownews.com/auto/electric-vehicles/revolt-introduces-this-new-colour-option-with-the-rv400-article-105561494",
    },
    {
      title:
        "EV stock jumps more than 6% after it received an order from Adani Green...",
      discription: "",
      date: "Thursday, November 09, 2023",
      link: "https://tradebrains.in/features/ev-stock-jumps-more-than-6-after-it-received-an-order-from-adani-green-for-supply-of-e-bikes/",
    },
    {
      title: "Revolt RV400 electric motorcycle arrives in new...",
      discription: "",
      date: "Wednesday,February 22, 2023",
      link: "https://auto.hindustantimes.com/auto/electric-vehicles/revolt-rv400-electric-motorcycle-arrives-in-new-lightning-yellow-colour-41702367895767.html",
    },
    {
      title: "Revolt Motors crosses 100 dealerships...",
      discription: "",
      date: "Monday, December 04, 2023",
      link: "https://www.thehindubusinessline.com/markets/revolt-motors-crosses-100-dealerships-rattanindia-stock-rises/article67604003.ece",
    },
    {
      title: "Revolt Motors adds new Eclipse Red colour...",
      discription: "",
      date: "Tuesday, November 28, 2023",
      link: "https://auto.hindustantimes.com/auto/electric-vehicles/revolt-motors-adds-new-eclipse-red-colour-scheme-to-rv400-electric-motorcycle-41701166852397.html",
    },
    {
      title: "Revolt Motors to provide electric bikes for Adani...",
      discription: "",
      date: "Thursday, November 09, 2023",
      link: "https://www.business-standard.com/companies/news/revolt-motors-to-provide-electric-bikes-for-adani-green-energy-ltd-123110900304_1.html",
    },
    {
      title: "Revolt Motors launches limited edition RV400 electric...",
      discription: "",
      date: "Wednesday, August 23, 2023",
      link: "https://www.business-standard.com/industry/auto/revolt-motors-launches-limited-edition-rv400-electric-motorcycle-details-123082300267_1.html",
    },
    {
      title: "Revolt RV400 e-motorcycle bookings re-open...",
      discription: "",
      date: "Wednesday,February 22, 2023",
      link: "https://www.financialexpress.com/auto/bike-news/revolt-rv400-e-motorcycle-bookings-re-open-check-price-specs/2988223/",
    },
    {
      title: "Revolt Motors selects former Ola Electric boss...",
      discription: "",
      date: "Tuesday,March 21, 2023",
      link: "https://www.moneycontrol.com/news/business/markets/revolt-motors-appoints-pankaj-sharma-as-chief-business-officer-10282861.html",
    },
    {
      title: "Revolt RV400 e-motorcycle now available in 50 cities...",
      discription: "",
      date: "Tuesday, March 28, 2023",
      link: "https://www.financialexpress.com/auto/bike-news/revolt-rv400-e-motorcycle-now-available-in-50-cities-check-price-specs/3024103/",
    },
    {
      title: "RattanIndia Enterprises acquires EV maker...",
      discription: "",
      date: "Saturday, Jan 14, 2023",
      link: "https://economictimes.indiatimes.com/industry/renewables/rattanindia-enterprises-acquires-ev-maker-revolt-motors/articleshow/96991655.cms",
    },
    ///
    {
      title:
        "Revolt Motors expands its retail presence on the Western coast...",
      discription: "",
      date: "Saturday, June 11, 2022",
      link: "https://orissadiary.com/revolt-motors-expands-its-retail-presence-on-the-western-coast-opens-its-third-store-in-gujarat/amp/",
    },
    {
      title: "Revolt Motors on an expansion spree; announces the opening...",
      discription: "",
      date: "Thursday, April 07, 2022",
      link: "https://www.apnnews.com/revolt-motors-on-an-expansion-spree-announces-the-opening-of-two-new-stores-in-andhra-pradesh/",
    },
    {
      title: "Revolt Motors Opens Lifestyle Experience Cafe in Noida...",
      discription: "NEWS18",
      date: "Sunday, February 06, 2022",
      link: "https://www.news18.com/news/auto/revolt-motors-opens-lifestyle-experience-cafe-in-noida-21st-retail-store-in-india-4741037.html",
    },
    {
      title: "Revolt Motors opens its first store in Bihar: RV400 now...",
      discription: "FINANCIAL EXPRESS",
      date: "Thursday, October 21, 2021",
      link: "https://www.financialexpress.com/auto/bike-news/revolt-motors-opens-its-first-store-in-bihar-rv400-now-available-in-23-cities/2517452/",
    },
    {
      title: "Revolt Motors to fully localize product range by January",
      discription: "BUSINESS STANDARD",
      date: "Thursday, October 21, 2021",
      link: "https://www.business-standard.com/article/pti-stories/revolt-motors-eyes-100pc-localisation-by-january-to-re-open-bookings-of-rv400-on-oct-21-121102000910_1.html",
    },
    {
      title:
        "Revolt Motors sells out e-bikes within minutes of opening online sales",
      discription: "BUSINESS STANDARD",
      date: "Friday, July 15, 2021",
      link: "https://www.business-standard.com/article/companies/revolt-motors-sells-out-e-bikes-within-minutes-of-opening-online-sales-121071501137_1.html",
    },
  ];

  useEffect(() => {
    clevertap.event.push("Page View", {
      "Page Name": "Media Page",
      "Page Url": window.location.href,
    });
  }, []);
  function limitChar(text, count, insertDots) {
    return (
      text.slice(0, count) + (text.length > count && insertDots ? "..." : "")
    );
  }

  return (
    <>
      <MetaTags id="press">
        <title>Revolt Electric Bike: Media Highlights & Press Releases</title>
        <meta
          name="description"
          content="Explore the latest buzz surrounding Revolt Motors electric bike. Stay updated with press coverage, media releases, and exciting features. Proud member of the Fortune 500 community."
        />
        <meta
          property="og:title"
          content="Revolt Electric Bike: Media Highlights & Press Releases"
        />
        <meta
          property="og:description"
          content="Explore the latest buzz surrounding Revolt Motors electric bike. Stay updated with press coverage, media releases, and exciting features. Proud member of the Fortune 500 community."
        />
        <meta name="twitter:site" content="@RevoltMotorsIN" />
        <meta
          name="twitter:image"
          content="https://www.revoltmotors.com/images/revolt-motors-logo.svg"
        />
        <link rel="canonical" href="https://www.revoltmotors.com/press" />
      </MetaTags>

      <section className="banner-slider">
        <img src="/images/press-image-1.jpg" />
      </section>

      <section className="">
        <ul className="press_list_grid">
          {media.map((item) => {
            return (
              <li>
                <h5>
                  <a href={item.link} target="_blank">
                    {item.title}
                  </a>
                </h5>
                <div className="release_date">
                  <div className="newer_dt">
                    <p>{item.discription}</p>
                    <span>{item.date}</span>
                  </div>
                  <a href={item.link} target="_blank">
                    <img src="/images/right-arrow-black.png" loading="lazy" />
                  </a>
                </div>
              </li>
            );
          })}

          <li>
            <h5>
              <a
                href="https://www.autocarindia.com/bike-news/revolt-e-bike-gets-arai-range-of-156km-to-launch-in-early-june-412402"
                target="_blank"
              >
                Revolt e-motorcycle gets ARAI range...
              </a>
            </h5>
            <div className="release_date">
              <div className="newer_dt">
                <p>Autocar India</p>
                <span>Thursday, 18 Apr 2019</span>
              </div>
              <a
                href="https://www.autocarindia.com/bike-news/revolt-e-bike-gets-arai-range-of-156km-to-launch-in-early-june-412402"
                target="_blank"
              >
                <img src="/images/right-arrow-black.png" loading="lazy" />
              </a>
            </div>
          </li>

          <li>
            <h5>
              <a
                href="https://www.thehindubusinessline.com/companies/micromax-enters-into-two-wheeler-segment/article26734614.ece"
                target="_blank"
              >
                Micromax enters into two-wheeler segment...
              </a>
            </h5>
            <div className="release_date">
              <div className="newer_dt">
                <p>The Hindu Business Line</p>
                <span>Thursday, 04 Apr 2019</span>
              </div>
              <a
                href="https://www.thehindubusinessline.com/companies/micromax-enters-into-two-wheeler-segment/article26734614.ece"
                target="_blank"
              >
                <img src="/images/right-arrow-black.png" loading="lazy" />
              </a>
            </div>
          </li>
          <li>
            <h5>
              <a
                href="https://www.thehindu.com/business/micromax-co-founder-to-make-ai-based-electric-motorcycle/article26737864.ece"
                target="_blank"
              >
                Micromax co-founder to make AI-based electric...
              </a>
            </h5>
            <div className="release_date">
              <div className="newer_dt">
                <p>The Hindu</p>
                <span>Thursday, 04 Apr 2019</span>
              </div>
              <a
                href="https://www.thehindu.com/business/micromax-co-founder-to-make-ai-based-electric-motorcycle/article26737864.ece"
                target="_blank"
              >
                <img src="/images/right-arrow-black.png" loading="lazy" />
              </a>
            </div>
          </li>
          <li>
            <h5>
              <a
                href="https://auto.ndtv.com/news/revolt-motors-to-launch-indias-first-a-i-enabled-motorcycle-in-june-2019-2018071"
                target="_blank"
              >
                Revolt Motors To Launch India's First...
              </a>
            </h5>
            <div className="release_date">
              <div className="newer_dt">
                <p>NDTV</p>
                <span>Thursday, 04 Apr 2019</span>
              </div>
              <a
                href="https://auto.ndtv.com/news/revolt-motors-to-launch-indias-first-a-i-enabled-motorcycle-in-june-2019-2018071"
                target="_blank"
              >
                <img src="/images/right-arrow-black.png" loading="lazy" />
              </a>
            </div>
          </li>
          <li>
            <h5>
              <a
                href="https://inc42.com/buzz/micromax-cofounder-rahul-sharma-launches-an-ai-enabled-motorcycle-brand/"
                target="_blank"
              >
                Micromax's Rahul Sharma Launches An AI-Enabled...
              </a>
            </h5>
            <div className="release_date">
              <div className="newer_dt">
                <p>Inc42</p>
                <span>Thursday, 04 Apr 2019</span>
              </div>
              <a
                href="https://inc42.com/buzz/micromax-cofounder-rahul-sharma-launches-an-ai-enabled-motorcycle-brand/"
                target="_blank"
              >
                <img src="/images/right-arrow-black.png" loading="lazy" />
              </a>
            </div>
          </li>
          <li>
            <h5>
              <a
                href="https://www.timesnownews.com/auto/bike-news/article/rahul-sharmas-new-venture-revolt-intellicorp-to-launch-ai-enabled-bike-in-june/394394"
                target="_blank"
              >
                Rahul Sharma's New Venture, Revolt Intellicorp...
              </a>
            </h5>
            <div className="release_date">
              <div className="newer_dt">
                <p>Times Drive</p>
                <span>Thursday, 04 Apr 2019</span>
              </div>
              <a
                href="https://www.timesnownews.com/auto/bike-news/article/rahul-sharmas-new-venture-revolt-intellicorp-to-launch-ai-enabled-bike-in-june/394394"
                target="_blank"
              >
                <img src="/images/right-arrow-black.png" loading="lazy" />
              </a>
            </div>
          </li>
          <li>
            <h5>
              <a
                href="http://overdrive.in/news-cars-auto/revolt-motors-to-launch-ai-powered-electric-motorcycle-in-june/"
                target="_blank"
              >
                Revolt Motors to launch AI-powered electric motorcycle...
              </a>
            </h5>
            <div className="release_date">
              <div className="newer_dt">
                <p>Overdrive</p>
                <span>Thursday, 04 Apr 2019</span>
              </div>
              <a
                href="http://overdrive.in/news-cars-auto/revolt-motors-to-launch-ai-powered-electric-motorcycle-in-june/"
                target="_blank"
              >
                <img src="/images/right-arrow-black.png" loading="lazy" />
              </a>
            </div>
          </li>
          <li>
            <h5>
              <a
                href="https://auto.economictimes.indiatimes.com/news/two-wheelers/motorcycles/micromax-co-founder-rahul-sharma-ventures-into-electric-mobility-space/68722689"
                target="_blank"
              >
                Micromax: Micromax co-founder Rahul Sharma ventures into
                electric mobility...
              </a>
            </h5>
            <div className="release_date">
              <div className="newer_dt">
                <p>The Economic Times Auto</p>
                <span>Thursday, 04 Apr 2019</span>
              </div>
              <a
                href="https://auto.economictimes.indiatimes.com/news/two-wheelers/motorcycles/micromax-co-founder-rahul-sharma-ventures-into-electric-mobility-space/68722689"
                target="_blank"
              >
                <img src="/images/right-arrow-black.png" loading="lazy" />
              </a>
            </div>
          </li>
          <li>
            <h5>
              <a
                href="https://www.autocarindia.com/bike-news/ai-enabled-revolt-electric-motorcycle-to-launch-in-june-2019-412205"
                target="_blank"
              >
                Revolt to launch India’s first AI-enabled E-motorcycle...
              </a>
            </h5>
            <div className="release_date">
              <div className="newer_dt">
                <p>Autocar</p>
                <span>Thursday, 04 Apr 2019</span>
              </div>
              <a
                href="https://www.autocarindia.com/bike-news/ai-enabled-revolt-electric-motorcycle-to-launch-in-june-2019-412205"
                target="_blank"
              >
                <img src="/images/right-arrow-black.png" loading="lazy" />
              </a>
            </div>
          </li>
          <li>
            <h5>
              <a
                href="https://www.livehindustan.com/business/story-micromax-co-founder-rahul-sharma-will-soon-launch-electric-motorcycles-2475077.html"
                target="_blank"
              >
                "Micromax Co-Founder Rahul...
              </a>
            </h5>
            <div className="release_date">
              <div className="newer_dt">
                <p>Hndustan</p>
                <span>Thursday, 04 Apr 2019</span>
              </div>
              <a
                href="https://www.livehindustan.com/business/story-micromax-co-founder-rahul-sharma-will-soon-launch-electric-motorcycles-2475077.html"
                target="_blank"
              >
                <img src="/images/right-arrow-black.png" loading="lazy" />
              </a>
            </div>
          </li>
          <li>
            <h5>
              <a
                href="https://www.business-standard.com/article/pti-stories/micromax-co-founder-rahul-sharma-forays-into-electric-two-wheeler-segment-119040400800_1.html"
                target="_blank"
              >
                Micromax co-founder Rahul Sharma enters electric...
              </a>
            </h5>
            <div className="release_date">
              <div className="newer_dt">
                <p>Business Standard</p>
                <span>Thursday, 04 Apr 2019</span>
              </div>
              <a
                href="https://www.business-standard.com/article/pti-stories/micromax-co-founder-rahul-sharma-forays-into-electric-two-wheeler-segment-119040400800_1.html"
                target="_blank"
              >
                <img src="/images/right-arrow-black.png" loading="lazy" />
              </a>
            </div>
          </li>
          <li>
            <h5>
              <a
                href="https://tech.economictimes.indiatimes.com/news/startups/micromax-co-founder-rahul-sharma-launches-his-new-e-bike-venture-revolt-intellicorp/68723732"
                target="_blank"
              >
                Micromax co-founder Rahul Sharma launches his new...{" "}
              </a>
            </h5>
            <div className="release_date">
              <div className="newer_dt">
                <p>ET Tech</p>
                <span>Thursday, 04 Apr 2019</span>
              </div>
              <a
                href="https://tech.economictimes.indiatimes.com/news/startups/micromax-co-founder-rahul-sharma-launches-his-new-e-bike-venture-revolt-intellicorp/68723732"
                target="_blank"
              >
                <img src="/images/right-arrow-black.png" loading="lazy" />
              </a>
            </div>
          </li>
          <li>
            <h5>
              <a
                href="https://www.btvi.in/news/micromax-co-founder-rahul-sharma-forays-into-electric-two-wheeler-segment/131283"
                target="_blank"
              >
                Micromax co-founder Rahul Sharma forays into...
              </a>
            </h5>
            <div className="release_date">
              <div className="newer_dt">
                <p>BTVI</p>
                <span>Thursday, 04 Apr 2019</span>
              </div>
              <a
                href="https://www.btvi.in/news/micromax-co-founder-rahul-sharma-forays-into-electric-two-wheeler-segment/131283"
                target="_blank"
              >
                <img src="/images/right-arrow-black.png" loading="lazy" />
              </a>
            </div>
          </li>
          <li>
            <h5>
              <a
                href="http://www.millenniumpost.in/business/micromax-co-founder-rahul-sharma-rings-in-to-electric-two-wheeler-segment-347621"
                target="_blank"
              >
                Micromax co-founder Rahul Sharma...
              </a>
            </h5>
            <div className="release_date">
              <div className="newer_dt">
                <p>Millennium Post</p>
                <span>Thursday, 04 Apr 2019</span>
              </div>
              <a
                href="http://www.millenniumpost.in/business/micromax-co-founder-rahul-sharma-rings-in-to-electric-two-wheeler-segment-347621"
                target="_blank"
              >
                <img src="/images/right-arrow-black.png" loading="lazy" />
              </a>
            </div>
          </li>
          <li>
            <h5>
              <a
                href="https://eavesrock.in/ndtv/auto-news/revolt-motors-to-launch-indias-first-a-i-enabled-motorcycle-in-june-2019/"
                target="_blank"
              >
                Revolt Motors To Launch India's First A.I...
              </a>
            </h5>
            <div className="release_date">
              <div className="newer_dt">
                <p>Eavesrock</p>
                <span>Thursday, 04 Apr 2019</span>
              </div>
              <a
                href="https://eavesrock.in/ndtv/auto-news/revolt-motors-to-launch-indias-first-a-i-enabled-motorcycle-in-june-2019/"
                target="_blank"
              >
                <img src="/images/right-arrow-black.png" loading="lazy" />
              </a>
            </div>
          </li>
          <li>
            <h5>
              <a
                href="https://www.thrustzone.com/revolt-motors-a-new-manufacturer-in-electric-two-wheeler-market-coming-soon/"
                target="_blank"
              >
                Revolt Motors - A New Manufacturer In Electric...
              </a>
            </h5>
            <div className="release_date">
              <div className="newer_dt">
                <p>Thrustzone</p>
                <span>Thursday, 04 Apr 2019</span>
              </div>
              <a
                href="https://www.thrustzone.com/revolt-motors-a-new-manufacturer-in-electric-two-wheeler-market-coming-soon/"
                target="_blank"
              >
                <img src="/images/right-arrow-black.png" loading="lazy" />
              </a>
            </div>
          </li>
          <li>
            <h5>
              <a
                href="https://hindi.timesnownews.com/auto/article/micromax-co-founder-rahul-sharma-new-venture-revolt-of-e-motorcycles-launched/394549"
                target="_blank"
              >
                मोबाइल के बाद अब इलेक्ट्रिक बाइक...
              </a>
            </h5>
            <div className="release_date">
              <div className="newer_dt">
                <p>Times Now</p>
                <span>Thursday, 04 Apr 2019</span>
              </div>
              <a
                href="https://hindi.timesnownews.com/auto/article/micromax-co-founder-rahul-sharma-new-venture-revolt-of-e-motorcycles-launched/394549"
                target="_blank"
              >
                <img src="/images/right-arrow-black.png" loading="lazy" />
              </a>
            </div>
          </li>
          <li>
            <h5>
              <a
                href="https://www.news18.com/news/auto/micromax-co-founder-rahul-sharma-to-launch-revolt-electric-motorcycle-in-june-2019-2089255.html"
                target="_blank"
              >
                Micromax Co-founder Rahul Sharma...
              </a>
            </h5>
            <div className="release_date">
              <div className="newer_dt">
                <p>News18</p>
                <span>Thursday, 04 Apr 2019</span>
              </div>
              <a
                href="https://www.news18.com/news/auto/micromax-co-founder-rahul-sharma-to-launch-revolt-electric-motorcycle-in-june-2019-2089255.html"
                target="_blank"
              >
                <img src="/images/right-arrow-black.png" loading="lazy" />
              </a>
            </div>
          </li>
          <li>
            <h5>
              <a
                href="https://www.financialexpress.com/auto/bike-news/revolt-intellicorp-announces-indias-first-ai-enabled-e-motorcycle-150-km-range-4g-lte-sim-more-micromax-electric-motorcycle-1538119/1538119/"
                target="_blank"
              >
                "Revolt Intellicorp announces India's first AI-enabled
                e-motorcycle...
              </a>
            </h5>
            <div className="release_date">
              <div className="newer_dt">
                <p>Financial Express</p>
                <span>Thursday, 04 Apr 2019</span>
              </div>
              <a
                href="https://www.financialexpress.com/auto/bike-news/revolt-intellicorp-announces-indias-first-ai-enabled-e-motorcycle-150-km-range-4g-lte-sim-more-micromax-electric-motorcycle-1538119/1538119/"
                target="_blank"
              >
                <img src="/images/right-arrow-black.png" loading="lazy" />
              </a>
            </div>
          </li>
          <li>
            <h5>
              <a
                href="https://www.financialexpress.com/auto/bike-news/revolt-intellicorp-announces-indias-first-ai-enabled-e-motorcycle-150-km-range-4g-lte-sim-more-micromax-electric-motorcycle-1538119/1538119/"
                target="_blank"
              >
                "Revolt Intellicorp announces India's first AI-enabled
                e-motorcycle...
              </a>
            </h5>
            <div className="release_date">
              <div className="newer_dt">
                <p>Financial Express</p>
                <span>Thursday, 04 Apr 2019</span>
              </div>
              <a
                href="https://www.financialexpress.com/auto/bike-news/revolt-intellicorp-announces-indias-first-ai-enabled-e-motorcycle-150-km-range-4g-lte-sim-more-micromax-electric-motorcycle-1538119/1538119/"
                target="_blank"
              >
                <img src="/images/right-arrow-black.png" loading="lazy" />
              </a>
            </div>
          </li>
          <li>
            <h5>
              <a
                href="https://m.dailyhunt.in/news/india/english/bike+dekho-epaper-bikedeko/all+new+revolt+electric+motorcycle+to+launch+in+june-newsid-112874648"
                target="_blank"
              >
                "All-new Revolt Electric Motorcycle To Launch In June...
              </a>
            </h5>
            <div className="release_date">
              <div className="newer_dt">
                <p>Daily Hunt</p>
                <span>Thursday, 04 Apr 2019</span>
              </div>
              <a
                href="https://m.dailyhunt.in/news/india/english/bike+dekho-epaper-bikedeko/all+new+revolt+electric+motorcycle+to+launch+in+june-newsid-112874648"
                target="_blank"
              >
                <img src="/images/right-arrow-black.png" loading="lazy" />
              </a>
            </div>
          </li>
          <li>
            <h5>
              <a
                href="https://www.thehindubusinessline.com/news/micromax-co-founder-rahul-sharma-gets-into-electric-two-wheeler-biz/article26734739.ece"
                target="_blank"
              >
                Micromax co-founder Rahul Sharma gets into electric...
              </a>
            </h5>
            <div className="release_date">
              <div className="newer_dt">
                <p>The Hindu BusinessLine</p>
                <span>Thursday, 04 Apr 2019</span>
              </div>
              <a
                href="https://www.thehindubusinessline.com/news/micromax-co-founder-rahul-sharma-gets-into-electric-two-wheeler-biz/article26734739.ece"
                target="_blank"
              >
                <img src="/images/right-arrow-black.png" loading="lazy" />
              </a>
            </div>
          </li>
          <li>
            <h5>
              <a
                href="https://www.autox.com/news/bike-news/revolt-motors-to-launch-indias-first-connected-e-motorcycle-in-june-2019-105811/"
                target="_blank"
              >
                Revolt Motors to launch India's first 'connected'...
              </a>
            </h5>
            <div className="release_date">
              <div className="newer_dt">
                <p>AutoX</p>
                <span>Thursday, 04 Apr 2019</span>
              </div>
              <a
                href="https://www.autox.com/news/bike-news/revolt-motors-to-launch-indias-first-connected-e-motorcycle-in-june-2019-105811/"
                target="_blank"
              >
                <img src="/images/right-arrow-black.png" loading="lazy" />
              </a>
            </div>
          </li>
          <li>
            <h5>
              <a
                href="http://onlineandyou.com/automobile/micromax-co-founder-rahul-sharma-rolls-out-its-ai-enabled-motorcycle-brand-revolt.html"
                target="_blank"
              >
                "Micromax co-founder Rahul Sharma rolls out...
              </a>
            </h5>
            <div className="release_date">
              <div className="newer_dt">
                <p>Online and You</p>
                <span>Thursday, 04 Apr 2019</span>
              </div>
              <a
                href="http://onlineandyou.com/automobile/micromax-co-founder-rahul-sharma-rolls-out-its-ai-enabled-motorcycle-brand-revolt.html"
                target="_blank"
              >
                <img src="/images/right-arrow-black.png" loading="lazy" />
              </a>
            </div>
          </li>
          <li>
            <h5>
              <a
                href="https://newsjizz.com/154905-co-founder-of-micromax-rahul-sharma-moves-into-the-electric-two-wheeler-segment.html"
                target="_blank"
              >
                "Co-founder of Micromax, Rahul Sharma, moves into...
              </a>
            </h5>
            <div className="release_date">
              <div className="newer_dt">
                <p>Newsjizz</p>
                <span>Thursday, 04 Apr 2019</span>
              </div>
              <a
                href="https://newsjizz.com/154905-co-founder-of-micromax-rahul-sharma-moves-into-the-electric-two-wheeler-segment.html"
                target="_blank"
              >
                <img src="/images/right-arrow-black.png" loading="lazy" />
              </a>
            </div>
          </li>
          <li>
            <h5>
              <a
                href="https://www.devdiscourse.com/article/business/467710-micromax-co-founder-says-company-to-start-investing-in-electric-motorcycles"
                target="_blank"
              >
                Micromax co founder says company to start investing...
              </a>
            </h5>
            <div className="release_date">
              <div className="newer_dt">
                <p>Devdiscourse</p>
                <span>Thursday, 04 Apr 2019</span>
              </div>
              <a
                href="https://www.devdiscourse.com/article/business/467710-micromax-co-founder-says-company-to-start-investing-in-electric-motorcycles"
                target="_blank"
              >
                <img src="/images/right-arrow-black.png" loading="lazy" />
              </a>
            </div>
          </li>
          <li>
            <h5>
              <a
                href="https://smartinvestor.business-standard.com/market/story-577283-storydet-Micromax_co_founder_Rahul_Sharma_enters_electric_two_wheeler_segment.htm#.XKbJ35gzbak"
                target="_blank"
              >
                Micromax co-founder Rahul Sharma enters electric ...
              </a>
            </h5>
            <div className="release_date">
              <div className="newer_dt">
                <p>Smart Investor</p>
                <span>Thursday, 04 Apr 2019</span>
              </div>
              <a
                href="https://smartinvestor.business-standard.com/market/story-577283-storydet-Micromax_co_founder_Rahul_Sharma_enters_electric_two_wheeler_segment.htm#.XKbJ35gzbak"
                target="_blank"
              >
                <img src="/images/right-arrow-black.png" loading="lazy" />
              </a>
            </div>
          </li>
          <li>
            <h5>
              <a
                href="https://www.bikewale.com/news/39286-revolt-to-introduce-aienabled-electric-bike-in-india.html"
                target="_blank"
              >
                Revolt to introduce AI-enabled electric bike in India - BikeWale
              </a>
            </h5>
            <div className="release_date">
              <div className="newer_dt">
                <p>Bikewale</p>
                <span>Thursday, 04 Apr 2019</span>
              </div>
              <a
                href="https://www.bikewale.com/news/39286-revolt-to-introduce-aienabled-electric-bike-in-india.html"
                target="_blank"
              >
                <img src="/images/right-arrow-black.png" />
              </a>
            </div>
          </li>
          <li>
            <h5>
              <a
                href="https://hindi.indiatvnews.com/paisa/business-micromax-co-founder-rahul-sharma-forays-into-electric-two-wheeler-segment-630830"
                target="_blank"
              >
                माइक्रोमैक्स के सह-संस्थापक राहुल शर्मा ने रखे...{" "}
              </a>
            </h5>
            <div className="release_date">
              <div className="newer_dt">
                <p>India TV</p>
                <span>Thursday, 04 Apr 2019</span>
              </div>
              <a
                href="https://hindi.indiatvnews.com/paisa/business-micromax-co-founder-rahul-sharma-forays-into-electric-two-wheeler-segment-630830"
                target="_blank"
              >
                <img src="/images/right-arrow-black.png" loading="lazy" />
              </a>
            </div>
          </li>
          <li className="empty-box"></li>
        </ul>
      </section>
    </>
  );
}

export default MediaScreen;
