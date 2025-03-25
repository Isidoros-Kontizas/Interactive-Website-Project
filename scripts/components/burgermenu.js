document.addEventListener("DOMContentLoaded", function () {
  const toggler = document.getElementById("menu-toggler");
  const menuWrap = document.querySelector(".menu-wrap");

  document.addEventListener("click", function (event) {
    if (!toggler.checked) return;

    if (!menuWrap.contains(event.target)) {
      toggler.checked = false;
    }
  });
});
