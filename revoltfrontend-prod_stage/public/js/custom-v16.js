$(window).on("load", function () {
  $(".pageload").hide();
});
$(document).ready(function () {
  //Product Banner
  $("#productinfo").owlCarousel({
    loop: false,
    animateOut: "fadeOut",
    animateIn: "fadeIn",
    margin: 0,
    nav: true,
    items: 1,
    dots: false,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    freeDrag: false,
    smartSpeed: 200,
    slideSpeed: 200,
  });
  $("#productinfo .owl-prev").html("RV400");
  // $("#productinfo .owl-next").html("RV300");
  $("#productinfo .owl-next").html("");

  $(".rv400-bike-switch li").on("click", function () {
    console.log("Clicked");
    $(this).addClass("active").siblings().removeClass("active");
    var bikeColro = $(this).data("bikeclr");
    var ColorName = $(this).find(".bikename").data("bikename");
    $("#colorname-400").find("span").text(ColorName);

    $(this)
      .closest(".item")
      .find("." + bikeColro)
      .show()
      .siblings()
      .hide();
    console.log(bikeColro);
    var rv400_url = "rv400_url";
    if (bikeColro == "redtheme") {
      $("#explore_product").attr("href", rv400_url + "?color=black");
    } else if (bikeColro == "blacktheme") {
      $("#explore_product").attr("href", rv400_url + "?color=red");
    } else if (bikeColro == "whitetheme") {
      $("#explore_product").attr("href", rv400_url + "?color=grey");
    }
  });

  $(".rv300-bike-switch li").on("click", function () {
    $(this).addClass("active").siblings().removeClass("active");
    var bikeColro = $(this).data("bikeclr");
    var ColorName = $(this).find(".bikename").data("bikename");
    $("#colorname-300").find("span").text(ColorName);

    $(this)
      .closest(".item")
      .find("." + bikeColro)
      .show()
      .siblings()
      .hide();
    console.log(bikeColro);
    if (bikeColro == "blacktheme") {
      $("#explore-product-rv300").attr("href", rv300_url + "?color=neon_black");
    }
    if (bikeColro == "redtheme") {
      $("#explore-product-rv300").attr(
        "href",
        rv300_url + "?color=smokey_grey",
      );
    }
    if (bikeColro == "whitethemess") {
      $("#explore-product-rv300").attr("href", rv300_url + "?color=mist_grey");
    }
    $(".rv300-bike-switch").show();
  });
  //Revolt Impact
  $("#revoltimpact").owlCarousel({
    loop: true,
    autoplay: true,
    lazyLoad: true,
    margin: 10,
    nav: false,
    items: 1,
    dots: true,
    smartSpeed: 1000,
    slideSpeed: 2000,
  });
  //Bike Feature slider
  $("#bikefeatures123 .owl-carousel").owlCarousel({
    loop: true,
    autoplay: true,
    lazyLoad: true,
    margin: 0,
    nav: false,
    items: 1,
    dots: true,
    smartSpeed: 1000,
    //slideSpeed: 2000,
  });
  //the why studo vide section
  $("#revo-why-studio-vid").owlCarousel({
    loop: true,
    autoplay: true,
    lazyLoad: true,
    margin: 10,
    nav: false,
    items: 3,
    dots: false,
    smartSpeed: 1000,
    slideSpeed: 2000,
    responsive: {
      0: {
        items: 1,
      },
      550: {
        items: 2,
      },
      800: {
        items: 3,
      },
    },
  });
  //bike feature active class
  var owl = $("#bikefeatures123 .owl-carousel");
  owl.on("changed.owl.carousel", function (e) {
    var current = e.item.index;
    //var src = $(e.target).find(".owl-item").eq(current).find("img").attr('src');
    var itemFeature = $(e.target)
      .find(".owl-item")
      .eq(current)
      .find(".item")
      .attr("data-bike");
    //console.log('Item Attributes is ' + itemFeature);
    $(".bike-ai-features li").each(function () {
      if ($(this).attr("class") == itemFeature) {
        $(this).addClass("active");
      } else {
        $(this).removeClass("active");
      }
    });
  });
  owl.on("changed.owl.carousel", function (e) {
    $(".bike-ai-features li").removeClass("current");
  });

  $(".bike-ai-features li").on("click", function () {
    $(this).addClass("current");
    $(this).siblings().removeClass("current");
    currentIndex = $(this).index();
    $("#bikefeatures123 .owl-dots").find(".owl-dot").eq(currentIndex).click();
    $("#bikefeatures123 .owl-dots")
      .find(".owl-dot")
      .eq(currentIndex)
      .addClass("active")
      .siblings()
      .removeClass("active");
  });

  $(".play-ai-video").on("click", function () {
    // pass video url
    var vidUrl = $(".bike-ai-features li.active").data("vidsrc");
    vidUrl += "?autoplay=1";
    $("#aienabled-modalbox").find("iframe").attr("src", vidUrl);
    $("#aienabled-modalbox").modal("show");
    // $("#aienabled-modalbox")[0].src += "&autoplay=1";
  });

  $("#aienabled-modalbox").on("hidden.bs.modal", function () {
    $("#aienabled-modalbox").find("iframe").attr("src", null);
  });
  $("#aienabled-modalbox .close").on("click", function () {
    $("#aienabled-modalbox").find("iframe").attr("src", null);
  });

  $("#menu-toggle").click(function () {
    $(".overlay").toggle();
    $("body").toggleClass("position-fixed");
    $(this).toggleClass("open");
    $(".bar").toggleClass("animate");
    $(".mobile-nav").toggleClass("invisible hide show");
    $(".collepslogo").fadeToggle(1000);
  });
  $(".mainbike.bike2").hide();
  $('.selbike123 input[type="radio"]').on("click", function () {
    //alert();
    var inputValue = $(this).attr("value");
    var targetBox = $("." + inputValue);
    $(".mainbike").not(targetBox).hide();
    $(targetBox).show();
  });
  // scroll div
  $(function () {
    $('a.gradlink[href*="#"]').click(function () {
      if (
        location.pathname.replace(/^\//, "") ==
          this.pathname.replace(/^\//, "") &&
        location.hostname == this.hostname
      ) {
        var target = $(this.hash);
        target = target.length
          ? target
          : $("[name=" + this.hash.slice(1) + "]");
        if (target.length) {
          $("html,body").animate(
            {
              scrollTop: target.offset().top - 30,
            },
            600,
          );
          return false;
        }
      }
    });
  });
  // dynamic modal video
  $(".imgbox").on("click", function () {
    var videoUrl = $(this).siblings(".motovideo").attr("data-src");
    $("#video-modalbox").find("iframe").attr("src", videoUrl);
    $("#video-modalbox").modal("show");
  });

  $("#video-modalbox").on("hidden.bs.modal", function () {
    $("#video-modalbox iframe").attr("src", null);
  });

  $("#video-modalbox .close").on("click", function () {
    $("#video-modalbox").find("iframe").attr("src", null);
  });

  //gallery custom js
  $(".hovericon").on("click", function () {
    $(this).parent().find("a").click();
  });
  // sound
  $(function () {
    $(".slider_inner").hover(
      function () {
        $(".angle").toggleClass("scl");
      },
      function () {
        $(".angle").toggleClass("scl");
      },
    );
  });
});
//AOS animation
// AOS.init();
// var s = skrollr.init({});
// s.refresh(document.querySelectorAll('[data-end]'));
// Video speed control
// var x = document.getElementById("custvideo");
// x.playbackRate = 0.3;
var elem = document.getElementById("custvideo");
function openFullscreen() {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) {
    /* Firefox */
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) {
    /* Chrome, Safari & Opera */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    /* IE/Edge */
    elem.msRequestFullscreen();
  }
}
$(document).ready(function () {
  //var findVideo = $(document).find('#custvideo');
  if ($("#custvideo").length) {
    $("#custvideo")[0].play();
    $(document).on("scroll", function () {
      if ($(document).scrollTop() > 50) {
        $("#custvideo")[0].pause();
        $("#custvideo").addClass("videoeffects");
      } else {
        $("#custvideo").removeClass("videoeffects");
        $("#custvideo")[0].play();
      }
    });
  }
});
//light box gallery
var groups = {};
$(".galleryItem").each(function () {
  var id = parseInt($(this).attr("data-group"), 10);
  if (!groups[id]) {
    groups[id] = [];
  }
  groups[id].push(this);
});
$.each(groups, function () {
  $(this).magnificPopup({
    type: "image",
    closeOnContentClick: true,
    closeBtnInside: false,
    gallery: {
      enabled: true,
    },
  });
});

// Revolt Countdown
/*const second = 1000,
      minute = second * 60,
      hour = minute * 60,
      day = hour * 24;

let countDown = new Date('Aug 28, 2019 00:00:00').getTime(),
    x = setInterval(function() {
      let now = new Date().getTime(),
          distance = countDown - now;
        document.getElementById('days').innerText = Math.floor(distance / (day)),
        document.getElementById('hours').innerText = Math.floor((distance % (day)) / (hour)),
        document.getElementById('minutes').innerText = Math.floor((distance % (hour)) / (minute)),
        document.getElementById('seconds').innerText = Math.floor((distance % (minute)) / second);
        //do something later when date is reached
        //if (distance < 0) {
        //  clearInterval(x);
        //  'IT'S MY BIRTHDAY!;
        //}
    }, second)*/
