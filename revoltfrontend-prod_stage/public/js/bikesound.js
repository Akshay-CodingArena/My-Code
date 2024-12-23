$(document).ready(function () {
  //Bike Sound section
  $(function () {
    $(".revolt-data").click(function () {
      $(".revolt-data").removeClass("active-sound");
      $(this).addClass("active-sound");

      mysrc = $(this).attr("data-src");

      soundWave = $("." + mysrc);
      console.log(mysrc);

      $(".soundwave .soundbg").not(soundWave).hide();

      $(soundWave).fadeIn("slow");

      if ($(this).hasClass("move-new")) {
        pauseAudio();
        $(".revolt-data").removeClass("move-new");
        $(".revolt-data").removeClass("active-sound");
      } else {
        switch (mysrc) {
          case "A":
            playAudioA();
            break;
          case "B":
            playAudioB();
            break;
          case "C":
            playAudioC();
            break;
          case "D":
            playAudioD();
            break;
        }
        $(this).attr("play", 1);
        $(".revolt-data").removeClass("move-new");
        $(this).toggleClass("move-new");
      }
    });

    $(".mutedcust1").click(function () {
      $(".mutedcust1").hide();
      $(".soundcust1").show();
      $("video").prop("muted", false);
    });
    $(".soundcust1").click(function () {
      $(".mutedcust1").show();
      $(".soundcust1").hide();
      $("video").prop("muted", true);
    });
  });

  //Audio files
  var A = document.getElementById("audio-outer1");
  var B = document.getElementById("audio-outer2");
  var C = document.getElementById("audio-outer3");
  var D = document.getElementById("audio-outer4");

  function playAudioA() {
    A.play();
    console.log(A.play());
    B.pause();
    C.pause();
    D.pause();
  }
  function playAudioB() {
    B.play();
    C.pause();
    D.pause();
    A.pause();
  }
  function playAudioC() {
    B.pause();
    C.play();
    D.pause();
    A.pause();
  }
  function playAudioD() {
    B.pause();
    C.pause();
    D.play();
    A.pause();
  }
  function pauseAudio() {
    if (A) {
      B.pause();
      C.pause();
      D.pause();
      A.pause();
    }
  }
  $(window).blur(function () {
    pauseAudio();
  });
  // });
  // $(document).ready(function () {
  $(document).on("scroll", function () {
    if (A) {
      $(document).on("scroll", function () {
        A.pause();
        B.pause();
        C.pause();
        D.pause();

        $(".revolt-data").removeClass("move-new");
        $(".revolt-data").removeClass("active-sound");
      });
    }
  });
});
