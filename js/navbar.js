// =========================
// NAVBAR LOADER
// =========================
document.addEventListener("DOMContentLoaded", () => {
  const navbarContainer = document.getElementById("navbar-container");

  // If container is missing, stop safely
  if (!navbarContainer) {
    console.warn("[Navbar] Container not found");
    return;
  }

  // Prevent duplicate loading
  if (navbarContainer.dataset.loaded === "true") {
    return;
  }

  fetch("navbar.html")
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }
      return response.text();
    })
    .then(html => {
      navbarContainer.innerHTML = html;
      navbarContainer.dataset.loaded = "true";

      console.log("[Navbar] Loaded successfully");
    })
    .catch(error => {
      console.error("[Navbar] Failed to load:", error);

      // Optional fallback (won't break layout)
      navbarContainer.innerHTML = `
        <header class="navbar">
          <div class="brand">
            <div class="brand-badge">A</div>
            <div class="brand-text">AIDEXAN</div>
          </div>
        </header>
      `;
    });
});
