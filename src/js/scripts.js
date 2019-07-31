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
  setTimeout(function() {
    heading.reveal();
  }, 1000);

  /**
   * =======================
   * Navigation
   * =======================
   */
  $(".nav-toggle, .nav a").on("click", function() {
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
  });

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

  items.forEach(function(word, idx) {
    var chars = word.split("");

    chars.forEach(function(char) {
      tl.to(tmp, 0.1, {
        x: "+=" + 1,
        onComplete: function() {
          el.textContent += char;
        },
      });
    });

    tl.to(tmp, 1, {
      x: "+=" + 1,
    });

    chars.forEach(function(char) {
      tl.to(tmp, 0.05, {
        x: "+=" + 1,
        onComplete: function() {
          el.textContent = el.textContent.slice(0, -1);
        },
      });
    });
  });

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

  /**
   * =======================
   * Scroll Hint
   * =======================
   */

  var lastId;
  var menuItems = $("#nav-menu").find("[data-linked='true']");
  var scrollHints = $("#hint-content").find(".scroll-hint span");

  var scrollItems = menuItems.map(function() {
    var item = $($(this).attr("href"));
    if (item.length) {
      return item;
    }
  });

  $(window).scroll(function() {
    // Get container scroll position
    var fromTop = $(this).scrollTop() + 10;

    // Get id of current scroll item
    var cur = scrollItems.map(function() {
      if ($(this).offset().top < fromTop) return this;
    });

    // Get the id of the current element
    cur = cur[cur.length - 1];
    var id = cur && cur.length ? cur[0].id : "";

    if (lastId !== id) {
      lastId = id;

      // Set/remove active class
      menuItems
        .parent()
        .removeClass("active")
        .end()
        .filter("[href='#" + id + "']")
        .parent()
        .addClass("active");

      scrollHints
        .parent()
        .removeClass("active")
        .end()
        .filter("#" + id + "-hint")
        .parent()
        .addClass("active");
    }
  });
})();
