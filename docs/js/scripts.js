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
  $(".nav-toggle").on("click", (function() {
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
   * Background Tween
   * =======================
   */
  var color = {
    blue: "#0d245f",
    purple: "#3A0D5A",
    cherry: "#93104F",
    pink: "#E53655",
    red: "#AB1515",
    orange: "#DA6F0D",
    yellow: "#FFB402",
    green: "#4D7B1E",
    teal: "#0AB092",
    cyan: "#0A88B0",
    gray: "#212121",
  };

  var section = {
    hero: color.purple,
    services: color.blue,
    project1: "#ad5851",
    project2: "#0c1938",
    about: color.cyan,
    tech: color.cherry,
    contact: color.purple,
  };

  var duration = 0.5;

  var controller = new ScrollMagic.Controller({
    globalSceneOptions: { duration: 500 },
  });

  new ScrollMagic.Scene({
    triggerElement: "#hero",
  })
    .setTween("body, .dynamic-bg", {
      backgroundColor: section.hero,
    })
    // .setClassToggle("#hero-hint", "active")
    .addIndicators()
    .addTo(controller);

  new ScrollMagic.Scene({
    triggerElement: "#services",
  })
    .setTween("body, .dynamic-bg", {
      backgroundColor: section.services,
    })
    // .setClassToggle("#services-hint", "active")
    .addIndicators()
    .addTo(controller);

  new ScrollMagic.Scene({
    triggerElement: "#projects",
  })
    .setTween("body, .dynamic-bg", {
      backgroundColor: section.project1,
    })
    // .setClassToggle("#projects-hint", "active")
    .addIndicators()
    .addTo(controller);

  new ScrollMagic.Scene({
    triggerElement: "#project_market",
  })
    .setTween("body, .dynamic-bg", {
      backgroundColor: section.project1,
    })
    .addIndicators()
    .addTo(controller);

  new ScrollMagic.Scene({
    triggerElement: "#project_trilliant",
  })
    .setTween("body, .dynamic-bg", {
      backgroundColor: section.project2,
    })
    .addIndicators()
    .addTo(controller);

  new ScrollMagic.Scene({
    triggerElement: "#tech",
  })
    .setTween("body, .dynamic-bg", {
      backgroundColor: section.tech,
    })
    .addIndicators()
    .addTo(controller);

  new ScrollMagic.Scene({
    triggerElement: "#about",
  })
    .setTween("body, .dynamic-bg", {
      backgroundColor: section.about,
    })
    .addIndicators()
    .addTo(controller);

  new ScrollMagic.Scene({
    triggerElement: "#contact",
  })
    .setTween("body, .dynamic-bg", {
      backgroundColor: section.contact,
    })
    .addIndicators()
    .addTo(controller);

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

  $(".js-slider").on("init", (function() {
    console.log("hi");
  }));

  $(".js-slider").on("afterChange", (function(event, slick, currentSlide, nextSlide) {
    console.log(event + "," + slick + "," + currentSlide + "," + nextSlide);
  }));
})();

// Select all links with hashes
$('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .click((function(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") &&
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $("html, body").animate(
          {
            scrollTop: target.offset().top,
          },
          1000,
          (function() {
            // Callback after animation
            // Must change focus!
            var $target = $(target);
            $target.focus();
            if ($target.is(":focus")) {
              // Checking if the target was focused
              return false;
            } else {
              $target.attr("tabindex", "-1"); // Adding tabindex for elements not focusable
              $target.focus(); // Set focus again
            }
          })
        );
      }
    }
  }));
