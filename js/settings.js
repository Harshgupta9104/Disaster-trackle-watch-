function setTheme(mode) {
  document.body.className = mode;
  localStorage.setItem("theme", mode);
}

(function () {
  const saved = localStorage.getItem("theme");
  if (saved) document.body.classList.add(saved);
})();
