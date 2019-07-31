/*!
 * epikode v1.0.0: Epikode Studio Inc official website. We provide full-service end to end digital solutions. We build websites, ecommerce platforms, web applications, mobile apps, and offer maintenance services. We are based in and around Vancouver Canada area.
 * (c) 2019 
 * ISC License
 * https://github.com/epikode
 */

(function() {
  /**
   * =======================
   * Heading Animation
   * =======================
   */
  var heading = baffle(".baffle");
  heading.set({
    speed: 100,
    characters: "EPIKODE",
  });
  heading.start();
  setTimeout((function() {
    heading.reveal();
  }), 1000);

  /**
   * =======================
   * Navigation
   * =======================
   */
  $(".nav-toggle, .nav a").on("click", (function() {
    $(".nav, .nav-toggle").toggleClass("open");
    $("body").toggleClass("nav-open");

    if ($(".nav").hasClass("open")) {
      $(".nav").css("transition-delay", "0s");
      $(".layer1").css("transition-delay", "0.4s");
      $(".layer2").css("transition-delay", "0.7s");
      $(".layer3").css("transition-delay", "0.85s");
      $(".nav-menu *").css("transition-delay", "1s");
    } else {
      $(".nav").css("transition-delay", "1s");
      $(".layer1").css("transition-delay", "0.6s");
      $(".layer2").css("transition-delay", "0.3s");
      $(".layer3").css("transition-delay", "0.15s");
      $(".nav-menu *").css("transition-delay", "0s");
    }
  }));

  /**
   * =======================
   * Hero Tagline Scroll Animation
   * =======================
   */
  var el = document.getElementById("scroll-text");
  var items = el.dataset.items.split(", ");

  TweenMax.to(el.nextElementSibling, 0.6, {
    opacity: 0,
    repeat: -1,
    ease: Linear.easeNone,
  });

  var tl = new TimelineMax({
    repeat: -1,
  });

  var tmp = {
    x: 0,
  };

  items.forEach((function(word, idx) {
    var chars = word.split("");

    chars.forEach((function(char) {
      tl.to(tmp, 0.1, {
        x: "+=" + 1,
        onComplete: function() {
          el.textContent += char;
        },
      });
    }));

    tl.to(tmp, 1, {
      x: "+=" + 1,
    });

    chars.forEach((function(char) {
      tl.to(tmp, 0.05, {
        x: "+=" + 1,
        onComplete: function() {
          el.textContent = el.textContent.slice(0, -1);
        },
      });
    }));
  }));

  /**
   * =======================
   * Slick Slider
   * =======================
   */
  $(".js-slider").slick({
    dots: false,
    // infinite: true,
    speed: 300,
    slidesToShow: 1,
    // centerMode: true,
    variableWidth: true,
    prevArrow: "",
    nextArrow: $(".slider-next"),
  });
})();
