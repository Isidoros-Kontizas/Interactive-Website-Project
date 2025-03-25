document.addEventListener("DOMContentLoaded", () => {
  // Select the lightbox elements
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const closeBtn = document.querySelector(".lightbox .close-button");
  const prevBtn = document.getElementById("prev");
  const nextBtn = document.getElementById("next");

  // All gallery links to an array
  const galleryLinks = Array.from(
    document.querySelectorAll(".showcase-gallery .container a")
  );
  // Array of image URLs
  const images = galleryLinks.map((link) => link.getAttribute("href"));

  let currentIndex = 0;

  // Function to update the lightbox image
  function updateLightbox() {
    lightboxImg.src = images[currentIndex];
  }

  // Open lightbox on image click
  galleryLinks.forEach((link, index) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      currentIndex = index;
      updateLightbox();
      lightbox.style.display = "flex";
    });
  });

  // Close lightbox with (x) button
  closeBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    lightbox.style.display = "none";
  });

  // Previous image
  prevBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateLightbox();
  });

  // Next image
  nextBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex + 1) % images.length;
    updateLightbox();
  });

  // Close lightbox when clicking outside the image
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      lightbox.style.display = "none";
    }
  });
});
