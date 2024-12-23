import React from "react";
import MetaTags from "react-meta-tags";
import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <>
      <MetaTags id="home">
        <title>Page Not Found - Revolt</title>

        <meta property="og:title" content="Page Not Found - Revolt" />
        <meta name="robots" content="noindex, nofollow" />
        <meta name="twitter:site" content="@RevoltMotorsIN" />
        <meta
          name="twitter:image"
          content="https://www.revoltmotors.com/images/revolt-motors-logo.svg"
        />
        <link rel="canonical" href="https://www.revoltmotors.com/404" />
      </MetaTags>
      <section className="Section404">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <Link className="sl-btn" to="/">
          Back Home
        </Link>
      </section>
    </>
  );
}

export default PageNotFound;
