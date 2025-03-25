/* FAQ Section */
document.addEventListener("DOMContentLoaded", function () {
  const faqItems = document.querySelectorAll(".faq-item");
  const searchInput = document.getElementById("faq-search");

  // Toggle FAQ answer visibility on question click
  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");

    question.addEventListener("click", function () {
      item.classList.toggle("active");
      faqItems.forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.classList.remove("active");
        }
      });
    });
  });

  // Search functionality for FAQ section
  searchInput.addEventListener("input", function () {
    const searchTerm = searchInput.value.toLowerCase();

    faqItems.forEach((item) => {
      const question = item
        .querySelector(".faq-question")
        .textContent.toLowerCase();
      if (question.includes(searchTerm)) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  });
});
