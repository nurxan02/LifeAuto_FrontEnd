$(".bolt").each(function (e) {
  var bolt = $(this),
    div = $(this).children("div");

  bolt.addClass("animate");

  var tween = new TimelineMax({
    onComplete() {
      bolt.removeClass("animate");
      repeat();
    },
  })
    .set(div, {
      rotation: 360,
    })
    .to(div, 0.7, {
      y: 80,
      rotation: 370,
    })
    .to(div, 0.6, {
      y: -140,
      rotation: 20,
    })
    .to(div, 0.1, {
      rotation: -24,
      y: 80,
    })
    .to(div, 0.8, {
      ease: Back.easeOut.config(1.6),
      rotation: 0,
      y: 0,
    });

  function repeat() {
    setTimeout(() => {
      bolt.addClass("animate");
      tween.restart();
      bolt.addClass("d-none");
    }, 400);
  }
});
