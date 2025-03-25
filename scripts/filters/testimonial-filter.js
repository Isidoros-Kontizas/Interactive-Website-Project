// Dom elements
const reviewsContainer = document.getElementById("review-container");

// Render Reviews
function renderReviews(reviews) {
  if (!reviews || reviews.length === 0) {
    reviewsContainer.innerHTML = `
     <div class="no-results-wrapper">
  <p class="no-results">No reviews found for your current filters.</p>
</div>
    `;
    return;
  }

  let finalUI = "";
  for (const review of reviews) {
    finalUI += getReviewBlock(review);
  }
  reviewsContainer.innerHTML = finalUI;
}

function getReviewBlock(review) {
  return `
    <div class="testimonial-card">
      <div class="testimonial-image">
        <img src="${review.imageUrl}" alt="User ${review.name}" />
      </div>
      <div class="testimonial-text">
        <p class="testimonial-quote">${review.quote}, ${review.location}</p>
        <div class="testimonial-author">
          <p class="name">— ${review.name}</p>
          <div class="rating">
            ${createStarsRating(review.rating)}
          </div>
        </div>
      </div>
    </div>
  `;
}

function createStarsRating(rating) {
  const checked = `<span class="star">&#9733;</span>`;
  const unchecked = `<span class="star">&#9734;</span>`;
  let starsUI = "";

  for (let i = 0; i < rating; i++) {
    starsUI += checked;
  }
  for (let i = 0; i < 5 - rating; i++) {
    starsUI += unchecked;
  }
  return starsUI;
}

// Create Stars
function createStars(rating) {
  let stars = "";
  for (let i = 0; i < rating; i++) {
    stars += `<span class="star">★</span>`;
  }
  return stars;
}

// Filter button with stars
document.getElementById("filter-1").innerHTML = createStars(1);
document.getElementById("filter-2").innerHTML = createStars(2);
document.getElementById("filter-3").innerHTML = createStars(3);
document.getElementById("filter-4").innerHTML = createStars(4);
document.getElementById("filter-5").innerHTML = createStars(5);

function filterReviews(rating) {
  getData(rating);
}

function sort(order) {
  getData(null, order);
}

//Reset Filters
function resetFilters() {
  getData();
}

// Fetch Data
function getData(rating, sorting) {
  fetch("./data/testimonial.json")
    .then((res) => res.json())
    .then((data) => {
      let filteredReviews = data.reviews;

      if (rating) {
        filteredReviews = filteredReviews.filter(
          (review) => parseInt(review.rating) === parseInt(rating)
        );
      }

      if (sorting) {
        filteredReviews = filteredReviews.sort((a, b) =>
          sorting === "asc"
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name)
        );
      }

      renderReviews(filteredReviews);
    });
}

// Load data
getData();
