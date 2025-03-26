$(function () {
  "use strict";
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother, ScrollToPlugin);
  let e = gsap.timeline();
  e
    .to(".mil-preloader", {
      height: 0,
      ease: "sine",
      duration: 0.4,
      delay: "2.3",
    })
    .to(".mil-preloader .mil-load", {
      width: "calc(100% - 30px)",
      ease: "linear",
      duration: "1.3",
      delay: "-2.3",
    })
    .to(".mil-preloader .mil-load", {
      opacity: 0,
      ease: "sine",
      duration: "0.4",
      delay: "-0.6",
    })
    .to(".mil-preloader p", {
      scale: 0.5,
      opacity: 0,
      ease: "sine",
      duration: 0.4,
      delay: "-0.7",
      onComplete: function () {
        ScrollTrigger.refresh();
      },
    }),
    gsap.to(".mil-progress", {
      height: "100%",
      ease: "sine",
      scrollTrigger: { scrub: 0.3 },
    }),
    gsap.fromTo(
      ".progress-wrap",
      { yPercent: 100, autoAlpha: 0 },
      {
        yPercent: 0,
        autoAlpha: 1,
        scrollTrigger: { start: 500, toggleActions: "play none none reverse" },
      }
    ),
    document.querySelector(".progress-wrap").addEventListener("click", (e) => {
      gsap.to(window, { scrollTo: 0, duration: 0.55 });
    }),
    $(".mil-back-to-top").on("click", function () {
      gsap.to(window, { scrollTo: "0", duration: 1, ease: "sine" });
    });
  let t = document.querySelectorAll(".mil-up");
  t.forEach((e) => {
    gsap.fromTo(
      e,
      { opacity: 0, y: 50, scale: 0.98, ease: "sine" },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        scrollTrigger: { trigger: e, toggleActions: "play none none reverse" },
      }
    );
  });
  let i = document.querySelectorAll(".mil-scale-img");
  i.forEach((e) => {
    var t = $(e).data("value-1"),
      i = $(e).data("value-2");
    gsap.fromTo(
      e,
      { ease: "sine", scale: t },
      {
        scale: i,
        scrollTrigger: {
          trigger: e,
          scrub: !0,
          toggleActions: "play none none reverse",
        },
      }
    );
  });
  var a = $(".mil-pricing-table-price"),
    o = $("#year"),
    l = $("#month");
  o.on("click", function () {
    $(this).addClass("mil-active"),
      l.removeClass("mil-active"),
      a.each(function () {
        $(this).text($(this).data("year-price"));
      });
  }),
    l.on("click", function () {
      $(this).addClass("mil-active"),
        o.removeClass("mil-active"),
        a.each(function () {
          $(this).text($(this).data("month-price"));
        });
    });
  let r = $(".mil-counter");
  r.each(function (e, t) {
    var i = $(this),
      a = { val: 0 },
      o = i.data("number"),
      l = (o + "").split("."),
      r = l.length > 1 ? l[1].length : 0;
    gsap.to(a, {
      val: o,
      duration: 1.8,
      scrollTrigger: { trigger: t, toggleActions: "play none none reverse" },
      onUpdate: function () {
        i.text(a.val.toFixed(r));
      },
    });
  }),
    ScrollTrigger.create({
      start: "top -70",
      end: 99999,
      toggleClass: { className: "mil-active", targets: ".mil-top-panel" },
    }),
    $(".mil-menu-btn").on("click", function () {
      $(".mil-menu-btn , .mil-top-menu").toggleClass("mil-active");
    }),
    $(window).on("scroll", function () {
      var e = $(window).scrollTop(),
        t = $(window).width() > 768;
      (t && e >= 60) || !t
        ? $(".mil-top-panel").addClass("mil-active")
        : $(".mil-top-panel").removeClass("mil-active");
    }),
    new Swiper(".mil-testimonials-1", {
      slidesPerView: 1,
      spaceBetween: 0,
      parallax: !0,
      effect: "fade",
      speed: 600,
      pagination: { el: ".mil-testi-pagination", clickable: !0 },
      navigation: { prevEl: ".mil-testi-prev", nextEl: ".mil-testi-next" },
    }),
    new Swiper(".mil-testimonials-2", {
      slidesPerView: 1,
      spaceBetween: 30,
      speed: 600,
      pagination: { el: ".mil-testi-pagination", clickable: !0 },
      breakpoints: { 992: { slidesPerView: 2 } },
    });
  let n = gsap.utils.toArray(".mil-accordion-group"),
    s = gsap.utils.toArray(".mil-accordion-menu"),
    c = n.map(function e(t) {
      let i = t.querySelector(".mil-accordion-menu"),
        a = t.querySelector(".mil-accordion-content"),
        o = t.querySelector(".mil-accordion-content p"),
        l = t.querySelector(".mil-accordion-icon"),
        r = t.querySelector(".mil-accordion-icon i");
      gsap.set(a, { height: "auto", ease: "sine" }),
        gsap.set(o, { opacity: 1, ease: "sine" }),
        gsap.set(r, { rotate: 180 });
      let n = gsap
        .timeline()
        .from(a, {
          onStart: function () {
            $(l).addClass("mil-active");
          },
          onComplete: function () {
            ScrollTrigger.refresh();
          },
          height: 0,
        })
        .from(o, { opacity: 0 }, "-=.2")
        .from(r, { rotate: 90 }, 0)
        .reverse();
      return function (e) {
        e === i
          ? (n.reversed(!n.reversed()), $(l).removeClass("mil-active"))
          : (n.reverse(), $(l).removeClass("mil-active"));
      };
    });
  s.forEach((e) => {
    e.addEventListener("click", () => {
      var t;
      return (t = e), void c.forEach((e) => e(t));
    });
  }),
    $(".mfp-image").magnificPopup(),
    $(".has-popup-video").magnificPopup({
      disableOn: 700,
      type: "iframe",
      iframe: {
        patterns: {
          youtube_short: {
            index: "youtu.be/",
            id: "youtu.be/",
            src: "https://www.youtube.com/",
          },
        },
      },
      removalDelay: 160,
      preloader: !1,
      fixedContentPos: !1,
      mainClass: "mfp-fade",
      callbacks: {
        markupParse: function (e, t, i) {
          e.find("iframe").attr("allow", "autoplay");
        },
      },
    });
});

const trigger = document.getElementById("contact-trigger");
const overlay = document.getElementById("contact-overlay");

trigger.addEventListener("click", () => {
  overlay.classList.add("active");
});

overlay.addEventListener("click", (e) => {
  if (e.target === overlay) {
    overlay.classList.remove("active");
  }
});
