/* === SUPABASE CONFIG === */
const supabaseUrl = "https://kawlncpapaxdzjyhnhhz.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imthd2xuY3BhcGF4ZHpqeWhuaGh6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY4NjkwMjEsImV4cCI6MjA3MjQ0NTAyMX0.jm-6Ll26WU-y0EMCBMR7Zv_aX7XU3iPomuMZNofps2U";
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

/* === MENU BURGER === */
function toggleMenu() {
  document.getElementById("nav-links").classList.toggle("active");
}

/* === SOUS-MENU RÉALISATIONS === */
const realisationsBtn = document.getElementById("realisations-btn");
const realisationsSubmenu = document.getElementById("realisations-submenu");

realisationsBtn.addEventListener("click", (e) => {
  e.preventDefault();
  realisationsSubmenu.style.display =
    realisationsSubmenu.style.display === "block" ? "none" : "block";
});

/* === PROFILE DROPDOWN === */
const profileButton = document.getElementById("profileButton");
const profileDropdown = document.getElementById("profileDropdown");

profileButton.addEventListener("click", () => {
  const expanded = profileButton.getAttribute("aria-expanded") === "true";
  profileButton.setAttribute("aria-expanded", !expanded);
  profileDropdown.style.display = expanded ? "none" : "flex";
});

// Fermer le menu si clic en dehors
document.addEventListener("click", (e) => {
  if (!profileButton.contains(e.target) && !profileDropdown.contains(e.target)) {
    profileDropdown.style.display = "none";
    profileButton.setAttribute("aria-expanded", "false");
  }
});

/* === SUPABASE AUTH === */
const profileLoggedIn = document.getElementById("profile-logged-in");
const profileLoggedOut = document.getElementById("profile-logged-out");
const profileEmail = document.getElementById("profileEmail");
const navAuthLink = document.getElementById("navAuthLink");
const logoutBtn = document.getElementById("logoutBtn");

async function checkAuth() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    profileLoggedIn.classList.remove("hidden");
    profileLoggedOut.classList.add("hidden");
    profileEmail.textContent = user.email;
    if (navAuthLink) navAuthLink.style.display = "none";
  } else {
    profileLoggedIn.classList.add("hidden");
    profileLoggedOut.classList.remove("hidden");
    if (navAuthLink) navAuthLink.style.display = "inline-block";
  }
}

// Déconnexion
if (logoutBtn) {
  logoutBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    await supabase.auth.signOut();
    checkAuth();
  });
}

// Vérifier auth au chargement
checkAuth();
