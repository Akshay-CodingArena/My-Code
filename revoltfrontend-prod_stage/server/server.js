// ********************************* Imports Begin *****************************************

const express = require("express");
const compression = require("compression");
const path = require("path");
const fs = require("fs");
const os = require("os");
const React = require("react");
const bodyParser = require("body-parser");
require("dotenv").config();
const useragent = require("express-useragent");
const ReactDOMServer = require("react-dom/server");
const { bannersDataUpdate } = require("./utilities/bannersData");
const {
  AppIndex,
  HomeIndex,
  IndexFetcher,
  BRZFetcher,
} = require("./utilities/generateIndexFile");
const {
  headApp,
  bodyApp,
  headHome,
  bodyHome,
  criticalCss,
} = require("./utilities/contentPrepend");

// ----------------------------------- Imports End ----------------------------------------

// ********************************** Constants Declaration ********************************
const PORT = process.env.SERVER_PORT;
const REACT_APP_S3_BASE = process.env.REACT_APP_S3_BASE;
const app = express();
var bannersData = []; // Will be used for preloading banners
var homeHtml; // will contain the index.html for Homepage Loading
var appHtml; // will contain the index.html for whole Application
var infoHtml;

// ---------------------------------- Declaration End -------------------------------------

// ************************* Seperate Index HTML Prepartion *************************

const generateHTMLS = (indexHtml) => {
  appHtml = indexHtml.replace(
    `<head></head><body><div id="root">`,
    `<head>
        ${headApp}
        ${criticalCss}
        </head>
        <body><div id="root">
        
        ${bodyApp}`,
  );
  homeHtml = indexHtml.replace(
    `<head></head><body><div id="root">`,
    `<head>
    <link rel="preload" href="/images/logo-name.svg" as="image">
    <link rel="preload" href="/login_icon.png" as="image">
    <link rel="preload" href="/images/renterprise.svg" as="image">
    ${headHome}
    ${criticalCss}
    <body><div id="root">${bodyHome}`,
  );
};

const generateBRZ = (indexHtml, brzHtml) => {
  infoHtml = indexHtml.replace(
    `<head></head><body><div id="root">`,
    `<head>
    <link rel="preload" href="/images/logo-name.svg" as="image">
    <link rel="preload" href="/login_icon.png" as="image">
    <link rel="preload" href="/images/renterprise.svg" as="image">
    <script>
          window._banner_data = ${JSON.stringify([...bannersData])}
    </script>
    ${headHome}
    <body><div id="root">${bodyHome}`,
  );

  infoHtml = infoHtml.replace("<body>", `<body>${brzHtml}`);
};

// ----------------------- Index.html preparation Finished --------------------------

// ***********************  Middlewares **********************************

app.use(bodyParser.json());
app.use(useragent.express());
app.use(compression()); // gzip compress

// ----------------------- Middlewares End ---------------------------------

app.post("/updateBannerData", (req, res) => {
  let data = req.body;
  console.log("Data to update", data);
  bannersData = [...data];
  res.status(200).send({ message: "Data Updated Successfully" });
});

// *********************** Routes ********************************************

app.get("^/$", (req, res) => {
  console.log(HomeIndex);
  res.send(
    appHtml.replace(
      `<head>`,
      `<head>
      <script>
      window._banner_data = ${JSON.stringify([...bannersData])}
      </script>
      <link rel="preload" href="${req.useragent.isDesktop ? "/images/newhomepage/BannersDesktop/Revolt_Zero-Downpayment_Low.jpg" : "/images/newhomepage/BannersMobile/Revolt_Zero-Downpayment_Low.jpg"}" as="image">`
      // <link rel="preload" href="${req.useragent.isDesktop ? bannersData[0].desktop_url : bannersData[0].mobile_url}" as="image">`,
    ),
  );
});

app.use(express.static(path.resolve(__dirname, "..", "build"))); // Warning -- Do not move this
app.get("/rv400-brz", (req, res, next) => {
  return res.send(infoHtml);
});
app.get("*", (req, res, next) => {
  return res.send(
    appHtml.replace(
      `<head>`,
      `<head><script>
          window._banner_data = ${JSON.stringify([...bannersData])}
          </script>`,
    ),
  );
});

// app.get("/bannersData", (req, res) => {
//   return res.status(200).json(bannersData);
// });

// app.get("^/$", (req, res) => {
//   console.log("Hit Came");
//   fs.readFile(
//     path.resolve(__dirname, "..", "build", "index.html"),
//     "utf-8",
//     (err, data) => {
//       if (err) {
//         return res.status(500).send(`Some error occured ${err}`);
//       }
//       return res.send(
//         data.replace(
//           `<head>`,
//           `<head><script>
//                 window._banner_data = ${JSON.stringify([...bannersData])}
//                 var link = document.createElement('link');
//                 link.rel = 'preload'
//                 link.as = 'image'
//                 link.href = "${req.useragent.isDesktop ? bannersData[0].desktop_url : bannersData[0].mobile_url}"
//                 // Append the <link> element to the <head> of the document
//                 document.head.append(link)
//                 var link2 = document.createElement('link');
//                 link2.rel = 'preload'
//                 link2.as = 'image'
//                 link2.href = "${req.useragent.isDesktop ? "/images/newhomepage/BannersDesktop/Revolt_Zero-Downpayment_Low.jpg" : "/images/newhomepage/BannersMobile/Revolt_Zero-Downpayment_Low.jpg"}"
//                 // Append the <link> element to the <head> of the document
//                 document.head.append(link2)
//                 </script>`,
//         ),
//       );
//     },
//   );
// });

// app.use(express.static(path.resolve(__dirname, "..", "build")));

// app.get("*", (req, res, next) => {
//   fs.readFile(
//     path.resolve(__dirname, "..", "build", "index.html"),
//     "utf-8",
//     (err, data) => {
//       if (err) {
//         return res.status(500).send(`Some error occured ${err}`);
//       }
//       return res.send(
//         data.replace(
//           `<head>`,
//           `<head><script>
//               window._banner_data = ${JSON.stringify([...bannersData])}
//               </script>`,
//         ),
//       );
//     },
//   );
// });

app.listen(PORT, async () => {
  bannersData = await bannersDataUpdate();
  console.log("Frontend Server Running", bannersData);
  let indexHtml = await IndexFetcher();
  let brzHtml = await BRZFetcher();
  generateHTMLS(indexHtml);
  generateBRZ(indexHtml, brzHtml);
});
