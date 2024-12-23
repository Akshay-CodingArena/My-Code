$(document).ready(function () {
  var sync1 = $("#revo-dna");
  var sync2 = $("#revo-dna1");
  var slidesPerPage = 1;
  var syncedSecondary = true;

  sync1
    .owlCarousel({
      items: 1,
      smartSpeed: 2000,
      //slideSpeed: 3000,
      nav: true,
      mouseDrag: false,
      autoplay: false,
      dots: true,
      loop: true,
    })
    .on("changed.owl.carousel", syncPosition);

  sync2
    .on("initialized.owl.carousel", function () {
      sync2.find(".owl-item").eq(0).addClass("current");
    })
    .owlCarousel({
      items: 1,
      dots: true,
      nav: true,
      autoplay: false,
      mouseDrag: false,
      smartSpeed: 900,
      //slideSpeed: 3000,
      navText: ["<span>&#8249;</span>", "<span>&#8250;</span>"],
    })
    .on("changed.owl.carousel", syncPosition2);

  function syncPosition(el) {
    //if you set loop to false, you have to restore this next line
    //var current = el.item.index;

    //if you disable loop you have to comment this block
    var count = el.item.count - 1;
    var current = Math.round(el.item.index - el.item.count / 2 - 0.5);

    if (current < 0) {
      current = count;
    }
    if (current > count) {
      current = 0;
    }

    //end block

    sync2
      .find(".owl-item")
      .removeClass("current")
      .eq(current)
      .addClass("current");
    var onscreen = sync2.find(".owl-item.active").length - 1;
    var start = sync2.find(".owl-item.active").first().index();
    var end = sync2.find(".owl-item.active").last().index();

    if (current > end) {
      sync2.data("owl.carousel").to(current, 600, true);
    }
    if (current < start) {
      sync2.data("owl.carousel").to(current - onscreen, 600, true);
    }
  }

  function syncPosition2(el) {
    if (syncedSecondary) {
      var number = el.item.index;
      sync1.data("owl.carousel").to(number, 600, true);
    }
  }

  sync2.on("click", ".owl-item", function (e) {
    e.preventDefault();
    var number = $(this).index();
    sync1.data("owl.carousel").to(number, 600, true);
  });
});
