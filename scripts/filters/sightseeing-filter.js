document.addEventListener("DOMContentLoaded", function () {
  const filterMenuItems = document.querySelectorAll(".filter-menu li");
  const sightseeingGroups = document.querySelectorAll(".sightseeing-group");
  const headingElement = document.querySelector(".sightseeing-heading");
  const paragraphElement = document.querySelector(".sightseeing-paragraph");

  // Map each filter to a heading & paragraph
  const contentMap = {
    default: {
      heading: "Top Picks",
      paragraph: "Check out these must-see spots that capture London's spirit.",
    },
    landmarks: {
      heading: "Must-See Landmarks",
      paragraph: "Visit London's most iconic sites and striking architecture.",
    },
    experiences: {
      heading: "Activities & Adventures",
      paragraph: "Try the best experiences and thrills London has to offer.",
    },
    explore: {
      heading: "Discover the City",
      paragraph: "Uncover hidden gems and local favorites all across London.",
    },
  };

  // Show "default"
  setActiveFilter("default");

  // Click events for each item
  filterMenuItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      const filter = item.getAttribute("data-filter");

      filterMenuItems.forEach((el) => el.classList.remove("active"));
      item.classList.add("active");

      setActiveFilter(filter);
    });
  });

  function setActiveFilter(filter) {
    // Hide all groups
    sightseeingGroups.forEach((group) => {
      group.style.display = "none";
    });

    // Show only the group that matches filter
    const activeGroup = document.querySelector(
      `.sightseeing-group[data-category="${filter}"]`
    );
    if (activeGroup) {
      activeGroup.style.display = "flex";
    }
    // Update heading & paragraph from the contentmap
    if (contentMap[filter]) {
      headingElement.textContent = contentMap[filter].heading;
      paragraphElement.textContent = contentMap[filter].paragraph;
    } else {
      //If the filter doesn't exist for some reason from the content map filter.
      // We have this as text.
      headingElement.textContent = "Explore London";
      paragraphElement.textContent =
        "No specific information available for this filter.";
    }
  }
});
