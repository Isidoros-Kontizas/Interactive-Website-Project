gsap.registerPlugin(ScrollTrigger);

// Select all sections that contain scrolling items
const scrollSections = document.querySelectorAll(".scroll-section");

scrollSections.forEach((section) => {
  const wrapper = section.querySelector(".wrapper");
  const items = wrapper.querySelectorAll(".item");

  initVerticalScroll(section, items);
});

function initVerticalScroll(section, items) {
  // Set initial position of each item below the viewport
  items.forEach((item, index) => {
    if (index !== 0) {
      gsap.set(item, { yPercent: 150 });
    }
  });

  // Create a timeline
  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      pin: true,
      start: "top top",
      end: () => `+=${items.length * 90}%`,
      scrub: 1,
      invalidateOnRefresh: true,
      // markers: true,
    },
    defaults: { ease: "none" },
  });

  // Animate each item
  items.forEach((item, index) => {
    timeline.to(item, {
      scale: 0.9,
      borderRadius: "10px",
    });

    // Slide the next item into view from below
    if (items[index + 1]) {
      timeline.to(items[index + 1], { yPercent: 0 }, "<");
    }
  });
}

ScrollTrigger.config({
  smoothScrolling: true,
});

gsap.to(".item", {
  scrollTrigger: {
    trigger: ".scroll-section",
    start: "top center",
    end: "bottom center",
    scrub: 0.5,
  },
  opacity: 1,
  y: 5,
});
