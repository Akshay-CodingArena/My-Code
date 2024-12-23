// $(document).ready(function () {
//   function openNav() {
//     document.getElementById("mySidenav").style.width = "350px";
//   }

//   function closeNav() {
//     document.getElementById("mySidenav").style.width = "0";
//   }

//   var url_red = "/images/eclipse-red/";
//   var url_black = "/images/cosmic-black/";
//   var url_neonblack = "/images/mist_grey/";
//   var url_stealth = "/images/stealth_black/";
//   var url_smokey_gray = "/images/mist_grey/";
//   var url_yellow = "/images/lighting-yellow/";
//   var url_blue = "/images/india_blue/";
//   ext_rv300 = ".png";
//   //var ext = ".webp";
//   var ext = ".png";
//   var car;
//   function init() {
//     car = $(".product1").ThreeSixty({
//       totalFrames: 34,
//       endFrame: 34,
//       currentFrame: 1,
//       imgList: ".threesixty_images",
//       progress: ".spinner",
//       imagePath: url_red,
//       filePrefix: "",
//       ext: ext,
//       height: 450,
//       width: 300,
//       navigation: true,
//       responsive: true,
//       autoplayDirection: 1,
//       playSpeed: 1000,
//     });
//   }

//   var car1;
//   function initnew() {
//     car1 = $(".product2").ThreeSixty({
//       totalFrames: 34,
//       endFrame: 34,
//       currentFrame: 1,
//       imgList: ".threesixty_images",
//       progress: ".spinner",
//       imagePath: url_black,
//       filePrefix: "",
//       ext: ext,
//       height: 450,
//       width: 300,
//       navigation: true,
//       responsive: true,
//       autoplayDirection: 1,
//       playSpeed: 1000,
//     });
//   }

//   var car3;
//   function initnew3red() {
//     car3 = $(".product3").ThreeSixty({
//       totalFrames: 34,
//       endFrame: 34,
//       currentFrame: 1,
//       imgList: ".threesixty_images",
//       progress: ".spinner",
//       imagePath: url_neonblack,
//       filePrefix: "",
//       ext: ext_rv300,
//       height: 450,
//       width: 300,
//       navigation: true,
//       responsive: true,
//       autoplayDirection: 1,
//       playSpeed: 1000,
//     });
//   }

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
    totalFrames: 35,
    endFrame: 35,
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
    totalFrames: 35,
    endFrame: 35,
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

//   $(function () {
//     init();
//     initnew();
//     initnew3red();
//     initnew3black();
//     initnew5mistgrey();
//     initnew6stealth();
//     initnew7yellow();
//   });
// });
$(document).ready(function () {
  $(".fancybox").fancybox();
  $(".fancybox-effects-a").fancybox({
    helpers: {
      title: {
        type: "outside",
      },
      overlay: {
        speedOut: 0,
      },
    },
  });
});

$(document).ready(function () {
  var owl = $("#revo-dna");
  owl.owlCarousel({
    autoplay: true,
    items: 1,
    nav: true,
    loop: true,
    autoplayHoverPause: true,
    animateOut: "slideOutUp",
    animateIn: "slideInUp",
    autoplayTimeout: 5000,
    autoplayHoverPause: false,
  });
  $(".play").on("click", function () {
    owl.trigger("play.owl.autoplay", [1000]);
    console.log("play");
  });
  $(".stop").on("click", function () {
    owl.trigger("stop.owl.autoplay");
    console.log("stop");
  });

  var owl1 = $("#febikebox");
  owl.owlCarousel({
    autoplay: true,
    items: 1,
    nav: true,
    loop: true,
    autoplayHoverPause: true,
    animateOut: "slideOutUp",
    animateIn: "slideInUp",
    autoplayTimeout: 5000,
    autoplayHoverPause: false,
  });
  $(".play").on("click", function () {
    owl1.trigger("play.owl.autoplay", [1000]);
    console.log("play");
  });
  $(".stop").on("click", function () {
    owl1.trigger("stop.owl.autoplay");
    console.log("stop");
  });

  var owl2 = $("#revo-dna1");
  owl2.owlCarousel({
    autoplay: true,
    items: 1,
    nav: true,
    loop: true,
    autoplayHoverPause: true,
    animateOut: "slideOutUp",
    animateIn: "slideInUp",
    autoplayTimeout: 5000,
    autoplayHoverPause: false,
  });
  $(".play").on("click", function () {
    owl2.trigger("play.owl.autoplay", [1000]);
    console.log("play");
  });
  $(".stop").on("click", function () {
    owl2.trigger("stop.owl.autoplay");
    console.log("stop");
  });

  // for 360
  var owl360 = $("#productinfoss");
  owl360.owlCarousel({
    autoplay: false,
    items: 1,
    touchDrag: false,
    mouseDrag: false,
    nav: true,
    loop: false,
    autoplayHoverPause: false,
    animateOut: "slideOutUp",
    animateIn: "slideInUp",
    autoplayTimeout: 5000,
  });
  $(".play").on("click", function () {
    owl360.trigger("play.owl.autoplay", [1000]);
    console.log("play");
  });
  $(".stop").on("click", function () {
    owl360.trigger("stop.owl.autoplay");
    console.log("stop");
  });
});

$(document).ready(function () {
  $(window).scroll(function () {
    var nav = $(".navbar-fixed");
    var top = 100;
    if ($(window).scrollTop() >= top) {
      nav.addClass("fixed");
    } else {
      nav.removeClass("fixed");
    }
  });

  /* sin  in signup form */
  $(function () {
    $(".btn").click(function () {
      $(".form-signin").toggleClass("form-signin-left");
      $(".form-signup").toggleClass("form-signup-left");
      $(".frame").toggleClass("frame-long");
      $(".signup-inactive").toggleClass("signup-active");
      $(".signin-active").toggleClass("signin-inactive");
      $(".forgot").toggleClass("forgot-left");
      $(this).removeClass("idle").addClass("active");
    });
  });

  $(function () {
    $(".btn-signup").click(function () {
      $(".nav").toggleClass("nav-up");
      $(".form-signup-left").toggleClass("form-signup-down");
      $(".success").toggleClass("success-left");
      $(".frame").toggleClass("frame-short");
    });
  });

  $(function () {
    $(".btn-signin").click(function () {
      $(".btn-animate").toggleClass("btn-animate-grow");
      $(".welcome").toggleClass("welcome-left");
      $(".cover-photo").toggleClass("cover-photo-down");
      $(".frame").toggleClass("frame-short");
      $(".profile-photo").toggleClass("profile-photo-down");
      $(".btn-goback").toggleClass("btn-goback-up");
      $(".forgot").toggleClass("forgot-fade");
    });
  });

  /* step form */
  $(document).ready(function () {
    var current_fs, next_fs, pre_fs;
    var opacity;
    var current = 1;
    var steps = $("fieldset").length;
    setProgressBar(current);
    // $(".next").click(function () {
    //   current_fs = $(this).parent();
    //   next_fs = $(this).parent().next();
    //   $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
    //   next_fs.show();
    //   current_fs.animate(
    //     { opacity: 0 },
    //     {
    //       step: function (now) {
    //         opacity = 1 - now;
    //         current_fs.css({
    //           display: "none",
    //           position: "relative",
    //         });
    //         next_fs.css({ opacity: opacity });
    //       },
    //       duration: 500,
    //     }
    //   );
    //   setProgressBar(++current);
    // });
    $(".pre").click(function () {
      current_fs = $(this).parent();
      pre_fs = $(this).parent().prev();
      $("#progressbar li")
        .eq($("fieldset").index(current_fs))
        .removeClass("active");
      pre_fs.show();
      current_fs.animate(
        { opacity: 0 },
        {
          step: function (now) {
            opacity = 1 - now;
            current_fs.css({
              display: "none",
              position: "relative",
            });
            pre_fs.css({ opacity: opacity });
          },
          duration: 500,
        },
      );
      setProgressBar(--current);
    });
    function setProgressBar(curStep) {
      var percent = parseFloat(100 / steps) * curStep;
      percentpercent = percent.toFixed();
      $(".pbar").css("width", percent + "%");
    }
    $(".submit").click(function () {
      return false;
    });
  });
});

$(document).ready(function () {
  let slideIndex = 1;
  showSlides(slideIndex);

  function plusSlides(n) {
    showSlides((slideIndex += n));
  }

  function currentSlide(n) {
    showSlides((slideIndex = n));
  }

  function showSlides(n) {
    try {
      let i;
      let slides = document.getElementsByClassName("mySlides");
      let dots = document.getElementsByClassName("demo");
      let captionText = document.getElementById("caption");
      if (n > slides.length) {
        slideIndex = 1;
      }
      if (n < 1) {
        slideIndex = slides.length;
      }
      for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
      }
      for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
      }
      slides[slideIndex - 1].style.display = "block";
      dots[slideIndex - 1].className += " active";
      captionText.innerHTML = dots[slideIndex - 1].alt;
    } catch (Exception) {
      // console.log(Exception);
    }
  }
});

$(document).on("click", ".video-hover", function () {
  var video = $(".video-modalbox iframe").attr("data-src");
  $(".video-modalbox iframe").attr("src", video);
});

$(document).on("click", ".close", function () {
  $(".video-modalbox iframe").attr("src", "");
});
