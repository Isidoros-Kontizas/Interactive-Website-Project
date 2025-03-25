document.addEventListener("DOMContentLoaded", function () {
  gsap.registerPlugin(ScrollTrigger);

  gsap.utils.toArray(".fade-in").forEach((element) => {
    gsap.from(element, {
      opacity: 0,
      y: 100,
      duration: 1.0,
      ease: "power1.out",
      scrollTrigger: {
        trigger: element,
        start: "top 65%",
        toggleActions: "play none none none",
      },
    });
  });
});
