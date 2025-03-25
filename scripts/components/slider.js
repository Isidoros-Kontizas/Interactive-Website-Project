// Making variables and selecting track (container that holds the slides)
const track = document.querySelector(".carousel__track");
const slides = Array.from(track.children); // The slides to an array with array.from
const nextButton = document.querySelector(".carousel__button--right"); // The buttons (right and left) - (next and previous)
const prevButton = document.querySelector(".carousel__button--left");
const toggleButton = document.querySelector(".carousel__button--toggle");
const dotsNav = document.querySelector(".carousel__nav"); // The navigation dots and converting them to an array
const dots = Array.from(dotsNav.children);

// Setting the width of a slide to know how much to move the carousel
const slideWidth = slides[0].getBoundingClientRect().width;

// Positioning each slide in the correct horizontal position.
const setSlidePosition = (slide, index) => {
  slide.style.left = slideWidth * index + "px";
};
slides.forEach(setSlidePosition);

// Moving the carousel to the desired slide.
const moveToSlide = (track, currentSlide, targetSlide) => {
  if (!targetSlide) return;
  track.style.transform = "translateX(-" + targetSlide.style.left + " )";
  currentSlide.classList.remove("current-slide");
  targetSlide.classList.add("current-slide");
};

// Updating the dots to active to show the active current dot
const updateDots = (currentDot, targetDot) => {
  currentDot.classList.remove("current-slide");
  targetDot.classList.add("current-slide");
};

// Arrow Function / Click Event
// Moving to the left the slide with previous button
let timeoutId;
prevButton.addEventListener("click", (e) => {
  stopInterval();
  pauseCarousel();

  const currentSlide = track.querySelector(".current-slide");
  const prevSlide =
    currentSlide.previousElementSibling || slides[slides.length - 1];
  const currentDot = dotsNav.querySelector(".current-slide");
  const prevDot = currentDot.previousElementSibling || dots[dots.length - 1];
  const prevIndex = slides.findIndex((slide) => slide === prevSlide);

  moveToSlide(track, currentSlide, prevSlide);
  updateDots(currentDot, prevDot);

  // Start autoplay again after 5 seconds
  if (timeoutId) clearTimeout(timeoutId); // Clear previous timeout if exists
  timeoutId = setTimeout(() => {
    if (!autoPlayActive) {
      autoPlayActive = true;
      startInterval(intervalTime);

      // Update the toggle button image to show play
      toggleButton.innerHTML = `<img src="./images/Slider/pause-solid.svg" alt="Pause" />`;
    }
  }, 5000);
});

// Arrow Function / Click Event
// Moving to the right the slide with next button
nextButton.addEventListener("click", (e) => {
  stopInterval();
  pauseCarousel();

  const currentSlide = track.querySelector(".current-slide");
  const nextSlide = currentSlide.nextElementSibling || slides[0];
  const currentDot = dotsNav.querySelector(".current-slide");
  const nextDot = currentDot.nextElementSibling || dots[0];
  const nextIndex = slides.findIndex((slide) => slide === nextSlide);

  moveToSlide(track, currentSlide, nextSlide);
  updateDots(currentDot, nextDot);

  // Start autoplay again after 5 seconds
  if (timeoutId) clearTimeout(timeoutId);
  timeoutId = setTimeout(() => {
    if (!autoPlayActive) {
      autoPlayActive = true;
      startInterval(intervalTime);

      toggleButton.innerHTML = `<img src="./images/Slider/pause-solid.svg" alt="Pause" />`;
    }
  }, 5000);
});

// Arrow Function / Click Event
// Moving to the selected slide with the dots
dotsNav.addEventListener("click", (e) => {
  const targetDot = e.target.closest("button");
  if (!targetDot) return;
  stopInterval();
  pauseCarousel();

  const currentSlide = track.querySelector(".current-slide");
  const currentDot = dotsNav.querySelector(".current-slide");
  const targetIndex = dots.findIndex((dot) => dot === targetDot);
  const targetSlide = slides[targetIndex];

  moveToSlide(track, currentSlide, targetSlide);
  updateDots(currentDot, targetDot);

  if (timeoutId) clearTimeout(timeoutId); // Clear previous timeout if exists
  timeoutId = setTimeout(() => {
    if (!autoPlayActive) {
      autoPlayActive = true;
      startInterval(intervalTime);

      toggleButton.innerHTML = `<img src="./images/Slider/pause-solid.svg" alt="Pause" />`;
    }
  }, 5000);
});

// Setting default Interval
let myInterval;
let intervalTime = 3000;

function startInterval(mSeconds = intervalTime) {
  if (!myInterval) {
    myInterval = setInterval(showNext, mSeconds);
  }
}

function stopInterval() {
  clearInterval(myInterval);
  myInterval = null;
}

function showNext() {
  const currentSlide = track.querySelector(".current-slide");
  const nextSlide = currentSlide.nextElementSibling || slides[0];
  const currentDot = dotsNav.querySelector(".current-slide");
  const nextDot = currentDot.nextElementSibling || dots[0];
  const nextIndex = slides.findIndex((slide) => slide === nextSlide);

  moveToSlide(track, currentSlide, nextSlide);
  updateDots(currentDot, nextDot);
}

// Starting default interval time
startInterval(intervalTime);

// Arrow Function / Click Event
// Toggle Play/Pause Button with one image and changing the image of the play button
let autoPlayActive = true;

toggleButton.addEventListener("click", () => {
  if (autoPlayActive) {
    stopInterval();
    toggleButton.innerHTML = `<img src="./images/Slider/play-solid.svg" alt="Pause" />`;
  } else {
    startInterval(intervalTime);
    toggleButton.innerHTML = `<img src="./images/Slider/pause-solid.svg" alt="Pause" />`;
  }

  autoPlayActive = !autoPlayActive;
});

// Arrow Function
// Stopping the interval when there is a manual change and changing the image to Play
const pauseCarousel = () => {
  stopInterval();
  autoPlayActive = false;
  toggleButton.innerHTML = `<img src="./images/Slider/play-solid.svg" alt="Pause" />`;
};
