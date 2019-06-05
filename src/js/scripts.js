/**
 * =======================
 * Heading Animation
 * =======================
 */
(function () {
	var heading = baffle('.baffle');
	heading.set({
		speed: 100,
		characters: '▒▮<>/'
	});
	heading.start();
	setTimeout(function () {
		heading.reveal();
	}, 1500);
})();

/**
 * =======================
 * Navigation
 * =======================
 */
(function () {
	$('.nav-toggle').on('click', function () {
		$('.nav, .nav-toggle').toggleClass('open');
		$('body').toggleClass('nav-open');

		if ($('.nav').hasClass('open')) {
			$('.nav').css('transition-delay', '0s');
			$('.layer1').css('transition-delay', '0.4s');
			$('.layer2').css('transition-delay', '0.7s');
			$('.layer3').css('transition-delay', '0.85s');
			$('.nav-menu *').css('transition-delay', '1s');
		} else {
			$('.nav').css('transition-delay', '1s');
			$('.layer1').css('transition-delay', '0.6s');
			$('.layer2').css('transition-delay', '0.3s');
			$('.layer3').css('transition-delay', '0.15s');
			$('.nav-menu *').css('transition-delay', '0s');
		}
	});
})();

/**
 * =======================
 * Tagline Scroll Animation
 * =======================
 */
(function () {
	var el = document.getElementById('scroll-text');
	var items = el.dataset.items.split(', ');

	TweenMax.to(el.nextElementSibling, 0.6, {
		opacity: 0,
		repeat: -1,
		ease: Linear.easeNone
	});

	var tl = new TimelineMax({
		repeat: -1
	});

	var tmp = {
		x: 0
	};

	items.forEach(function (word, idx) {
		var chars = word.split('');

		chars.forEach(function (char) {
			tl.to(tmp, 0.1, {
				x: '+=' + 1,
				onComplete: function () {
					el.textContent += char;
				}
			});
		});

		tl.to(tmp, 1, {
			x: '+=' + 1
		});

		chars.forEach(function (char) {
			tl.to(tmp, 0.05, {
				x: '+=' + 1,
				onComplete: function () {
					el.textContent = el.textContent.slice(0, -1);
				}
			});
		});
	});
})();

/**
 * Background Tween
 */
(function () {

	var colors = {
		purple: '#3a0d5a',
		orange: '#e34b1c',
		red: '#dc3545',
		teal: '#17a2b8',
		blue: '#283486',
	};

	var duration = 0.65;

	var controller = new ScrollMagic.Controller();

	new ScrollMagic.Scene({
			triggerElement: "main"
		})
		.on("enter", function (event) {
			$('body').addClass('position-main');
		})
		.on("leave", function (event) {
			$('body').removeClass('position-main');
		})
		.addTo(controller);

	new ScrollMagic.Scene({
			triggerElement: ".tween-bg-blue"
		})
		.setTween("body", duration, {
			backgroundColor: colors.blue,
		})
		.addTo(controller);

	new ScrollMagic.Scene({
			triggerElement: ".tween-bg-red"
		})
		.setTween("body", duration, {
			backgroundColor: colors.red
		})
		.addTo(controller);

	new ScrollMagic.Scene({
			triggerElement: ".tween-bg-orange"
		})
		.setTween("body", duration, {
			backgroundColor: colors.orange,
		})
		.addTo(controller);

	new ScrollMagic.Scene({
			triggerElement: ".tween-bg-teal"
		})
		.setTween("body", duration, {
			backgroundColor: colors.teal
		})
		.addTo(controller);

	new ScrollMagic.Scene({
			triggerElement: ".tween-bg-purple"
		})
		.setTween("body", duration, {
			backgroundColor: colors.purple
		})
		.addTo(controller);
})();