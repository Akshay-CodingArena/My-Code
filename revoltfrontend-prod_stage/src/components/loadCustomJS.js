import React, { useEffect } from "react";
import { useLocation } from "react-router";

// class ImportScript extends React.Component{
function ImportScript() {
  console.log("Scripts Imported");
  const location = useLocation();
  console.log(location.key);
  //

  useEffect(() => {
    try {
      document.querySelectorAll(".dynamicJS").forEach((e) => e.remove());

      var element = document.getElementById("fixed-menu");
      element.classList.remove("active");
    } catch {}

    //  function random(length) {
    //     var result           = '';
    //     var characters       = '0123456789';
    //     var charactersLength = characters.length;
    //     for ( var i = 0; i < length; i++ ) {
    //         result += characters.charAt(Math.floor(Math.random() * charactersLength));
    //     }
    //     return result;
    //  }

    //  var randomNumber = random(10);

    function loadScript(url) {
      return new Promise(function (resolve, reject) {
        let script = document.createElement("script");
        script.setAttribute("class", "dynamicJS");
        script.setAttribute("defer", "defer");
        script.src = url;
        script.async = false;
        script.onload = function () {
          resolve(url);
        };
        script.onerror = function () {
          reject(url);
        };
        document.body.appendChild(script);
      });
    }

    let scripts = [
      "https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js",
      "https://unpkg.com/aos@2.3.1/dist/aos.js",
      "/js/bootstrap.min.js",
      "/js/owl.carousel.js",
      // "/js/testimonials-slider.js",
      "/js/threesixty.min-v1.js",
      // "/js/jquery.fancybox.pack.js?v=2.1.5",
      "/js/swiper.min.js",
      "/js/jquery.singlePageNav.min.js",
      "/js/rv-400-inner-v12.js",
      "/js/main.js",
      "/js/custom-v16.js",
      "/js/header-v1.js",
      "/js/new.js",
    ];

    // save all Promises as array
    let promises = [];
    scripts.forEach(function (url) {
      promises.push(loadScript(url));
    });

    Promise.all(promises)
      .then(function () {
        // console.log('all scripts loaded');
      })
      .catch(function (script) {
        // console.log(script + ' failed to load');
      });
  }, [location.key]);

  // render() {
  return <></>;
  //}
}

export default ImportScript;
