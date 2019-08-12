/*!
 * epikode v1.0.0: Epikode Studio Inc official website. We provide full-service end to end digital solutions. We build websites, ecommerce platforms, web applications, mobile apps, and offer maintenance services. We are based in and around Vancouver Canada area.
 * (c) 2019 
 * ISC License
 * https://github.com/epikode
 */

/**
 * =======================
 * Process Accordion
 * =======================
 */

(function() {
  $(".accord-toggle").on("click", (function() {
    var toggleTarget = $($(this).data("toggle"));
    if ($(this).hasClass("active")) {
      // Active block, close on click
      $(this).removeClass("active");
      toggleTarget.slideUp(280, "swing").removeClass("active");
    } else {
      $(".accord-toggle").removeClass("active");
      $(".accord-content")
        .removeClass("active")
        .slideUp(280, "swing");
      // Inactive block, open on click
      $(this).addClass("active");
      toggleTarget
        .delay(280)
        .slideDown(280, "swing")
        .addClass("active");
      // .slideDown(280, "swing", function() {
      //   scrollToView($(this).parent());
      // });
    }
  }));

  // Scroll page
  // var scrollToView = function(element) {
  //   var elementTop = $(element).offset().top;
  //   var elementHeight = element.height();
  //   var windowHeight = $(window).height();
  //   // Scroll to top of element if elementHeight > windowHeight
  //   var scrollTo = elementTop;
  //   // Scroll to middle of page if elementHeight < windowHeight
  //   if (elementHeight < windowHeight) {
  //     scrollTo = elementTop - (windowHeight / 2 - elementHeight / 2);
  //   }
  //   $("html, body").animate({ scrollTop: [scrollTo, "swing"] }, 350);
  // };
})();

/**
 * =======================
 * Background Tween
 * =======================
 */

(function() {
  var color = {
    blue: "#0a268c",
    purple: "#37005f",
    cherry: "#93104F",
    pink: "#E53655",
    red: "#AB1515",
    orange: "#c24e16",
    yellow: "#FFB402",
    green: "#478804",
    teal: "#0AB092",
    cyan: "#048094",
    gray: "#212121",
  };

  var section = {
    hero: color.purple,
    services: color.cherry,
    service_app: color.orange,
    project1: "#944f48",
    project2: "#041835",
    about: color.cyan,
    process: color.green,
    tech: color.blue,
    contact: color.purple,
  };

  var controller = new ScrollMagic.Controller({
    globalSceneOptions: { duration: 400 },
  });

  new ScrollMagic.Scene({
    triggerElement: "#hero",
  })
    .setTween("body, .dynamic-bg", {
      backgroundColor: section.hero,
    })
    // .addIndicators()
    .addTo(controller);

  new ScrollMagic.Scene({
    triggerElement: "#services",
  })
    .setTween("body, .dynamic-bg", {
      backgroundColor: section.services,
    })
    // .addIndicators()
    .addTo(controller);

  new ScrollMagic.Scene({
    triggerElement: "#service_app",
  })
    .setTween("body, .dynamic-bg", {
      backgroundColor: section.service_app,
    })
    // .addIndicators()
    .addTo(controller);

  new ScrollMagic.Scene({
    triggerElement: "#projects",
  })
    .setTween("body, .dynamic-bg", {
      backgroundColor: section.project1,
    })
    // .addIndicators()
    .addTo(controller);

  new ScrollMagic.Scene({
    triggerElement: "#project_market",
  })
    .setTween("body, .dynamic-bg", {
      backgroundColor: section.project1,
    })
    // .addIndicators()
    .addTo(controller);

  new ScrollMagic.Scene({
    triggerElement: "#project_trilliant",
  })
    .setTween("body, .dynamic-bg", {
      backgroundColor: section.project2,
    })
    // .addIndicators()
    .addTo(controller);

  new ScrollMagic.Scene({
    triggerElement: "#tech",
  })
    .setTween("body, .dynamic-bg", {
      backgroundColor: section.tech,
    })
    // .addIndicators()
    .addTo(controller);

  new ScrollMagic.Scene({
    triggerElement: "#about",
  })
    .setTween("body, .dynamic-bg", {
      backgroundColor: section.about,
    })
    // .addIndicators()
    .addTo(controller);

  new ScrollMagic.Scene({
    triggerElement: "#process",
  })
    .setTween("body, .dynamic-bg", {
      backgroundColor: section.process,
    })
    // .addIndicators()
    .addTo(controller);

  new ScrollMagic.Scene({
    triggerElement: "#contact",
  })
    .setTween("body, .dynamic-bg", {
      backgroundColor: section.contact,
    })
    // .addIndicators()
    .addTo(controller);
})();

(function() {
  /**
   * =======================
   * Heading Animation
   * =======================
   */
  var heading = baffle(".baffle");
  heading.set({
    speed: 80,
    characters: "~+;$@!=*EPIKODE",
  });
  heading.start();
  setTimeout((function() {
    heading.reveal();
  }), 1200);

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
  $(".js-slider").each((function(index) {
    $(this).attr("data-slider", index);
    $(this).slick({
      dots: false,
      infinte: false,
      speed: 300,
      slidesToShow: 1,
      variableWidth: true,
      prevArrow: "",
      nextArrow: $(this)
        .parents(".project-block")
        .find(".slider-next"),
    });
  }));

  /**
   * =======================
   * Scroll Hint
   * =======================
   */

  var lastId;
  var menuItems = $("#nav-menu").find("[data-linked='true']");
  var scrollHints = $("#hint-content").find(".scroll-hint span");

  var scrollItems = menuItems.map((function() {
    var item = $($(this).attr("href"));
    if (item.length) {
      return item;
    }
  }));

  $(window).scroll((function() {
    var currentId;
    var atBottomOfPage = $(this).scrollTop() + $(this).height() > $(document).height() - 300;
    if (atBottomOfPage) {
      currentId = "contact";
    } else {
      // Get container scroll position
      var fromTop = $(this).scrollTop() + 1;

      // Get id of current scroll item
      var current = scrollItems.map((function() {
        if ($(this).offset().top < fromTop) return this;
      }));

      // Get the id of the current element
      current = current[current.length - 1];
      currentId = current && current.length ? current[0].id : "";
    }

    if (lastId !== currentId) {
      lastId = currentId;

      // Set/remove active class
      menuItems
        .parent()
        .removeClass("active")
        .end()
        .filter("[href='#" + currentId + "']")
        .parent()
        .addClass("active");

      scrollHints
        .parent()
        .removeClass("active")
        .end()
        .filter("#" + currentId + "-hint")
        .parent()
        .addClass("active");
    }
  }));

  /**
   * =======================
   * Hit bottom of page
   * =======================
   */
  $(window).scroll((function() {
    var atBottomOfPage = $(this).scrollTop() + $(this).height() > $(document).height() - 300;
    if (atBottomOfPage) {
      $(".section-hint").addClass("page-end");
    } else {
      $(".section-hint").removeClass("page-end");
    }
  }));
})();

/**
 * =======================
 * Smooth Scrolling
 * =======================
 */
(function() {
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
              scrollTop: [target.offset().top, "swing"],
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
})();
