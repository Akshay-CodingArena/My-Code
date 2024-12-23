$(document).ready(function () {
  function openNav() {
    document.getElementById("mySidenav").style.width = "350px";
  }

  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }

  var url_red = "/images/eclipse-red/";
  var url_black = "/images/cosmic-black/";
  var url_neonblack = "/images/mist_grey/";
  var url_stealth = "/images/stealth_black/";
  var url_smokey_gray = "/images/mist_grey/";
  var url_yellow = "/images/lighting-yellow/";
  var url_blue = "/images/india_blue/";
  ext_rv300 = ".png";
  //var ext = ".webp";
  var ext = ".png";
  var car;
  function init() {
    car = $(".product1").ThreeSixty({
      totalFrames: 34,
      endFrame: 34,
      currentFrame: 1,
      imgList: ".threesixty_images",
      progress: ".spinner",
      imagePath: url_red,
      filePrefix: "",
      ext: ext,
      height: 450,
      width: 300,
      navigation: true,
      responsive: true,
      autoplayDirection: 1,
      playSpeed: 1000,
    });
  }

  var car1;
  function initnew() {
    car1 = $(".product2").ThreeSixty({
      totalFrames: 34,
      endFrame: 34,
      currentFrame: 1,
      imgList: ".threesixty_images",
      progress: ".spinner",
      imagePath: url_black,
      filePrefix: "",
      ext: ext,
      height: 450,
      width: 300,
      navigation: true,
      responsive: true,
      autoplayDirection: 1,
      playSpeed: 1000,
    });
  }

  var car3;
  function initnew3red() {
    car3 = $(".product3").ThreeSixty({
      totalFrames: 34,
      endFrame: 34,
      currentFrame: 1,
      imgList: ".threesixty_images",
      progress: ".spinner",
      imagePath: url_neonblack,
      filePrefix: "",
      ext: ext_rv300,
      height: 450,
      width: 300,
      navigation: true,
      responsive: true,
      autoplayDirection: 1,
      playSpeed: 1000,
    });
  }

  var car4;
  function initnew3black() {
    car4 = $(".product4").ThreeSixty({
      totalFrames: 34,
      endFrame: 34,
      currentFrame: 1,
      imgList: ".threesixty_images",
      progress: ".spinner",
      imagePath: url_smokey_gray,
      filePrefix: "",
      ext: ext_rv300,
      height: 450,
      width: 300,
      navigation: true,
      responsive: true,
      autoplayDirection: 1,
      playSpeed: 1000,
    });
  }
  var car5;
  function initnew5mistgrey() {
    car5 = $(".product5").ThreeSixty({
      totalFrames: 34,
      endFrame: 34,
      currentFrame: 1,
      imgList: ".threesixty_images",
      progress: ".spinner",
      imagePath: url_blue,
      filePrefix: "",
      ext: ".png",
      height: 450,
      width: 300,
      navigation: true,
      responsive: true,
      autoplayDirection: 1,
      playSpeed: 1000,
    });
  }
  var car6;
  function initnew6stealth() {
    car6 = $(".product6").ThreeSixty({
      totalFrames: 34,
      endFrame: 34,
      currentFrame: 1,
      imgList: ".threesixty_images",
      progress: ".spinner",
      imagePath: url_stealth,
      filePrefix: "",
      ext: ".png",
      height: 450,
      width: 300,
      navigation: true,
      responsive: true,
      autoplayDirection: 1,
      playSpeed: 1000,
    });
  }
  var car7;
  function initnew7yellow() {
    car6 = $(".product7").ThreeSixty({
      totalFrames: 36,
      endFrame: 36,
      currentFrame: 1,
      imgList: ".threesixty_images",
      progress: ".spinner",
      imagePath: url_yellow,
      filePrefix: "",
      ext: ".png",
      height: 450,
      width: 300,
      navigation: true,
      responsive: true,
      autoplayDirection: 1,
      playSpeed: 1000,
    });
  }

  $(function () {
    console.log("I am Loaded");
    var id = setInterval(() => {
      try {
        init();
        initnew();
        initnew3red();
        initnew3black();
        initnew5mistgrey();
        initnew6stealth();
        initnew7yellow();
        clearInterval(id);
      } catch (e) {
        console.log(e);
      }
    }, 100);
  });
});
