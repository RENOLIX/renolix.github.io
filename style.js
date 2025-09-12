// === INITIALISATION SUPABASE ===
const supabaseUrl = "https://votre-projet.supabase.co";
const supabaseKey = "public-anon-key";
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

// === MENU MOBILE ===
function toggleMenu() {
  document.querySelector("nav").classList.toggle("active");
}

// === SOUS-MENU RÉALISATIONS ===
const realisationsBtn = document.getElementById("realisations-btn");
const submenu = document.getElementById("realisations-submenu");
if (realisationsBtn) {
  realisationsBtn.addEventListener("click", (e) => {
    e.preventDefault();
    submenu.style.display = submenu.style.display === "block" ? "none" : "block";
  });
}

// === PROFILE DROPDOWN ===
const profileBtn = document.getElementById("profileButton");
const profileDropdown = document.getElementById("profileDropdown");

if (profileBtn) {
  profileBtn.addEventListener("click", () => {
    const isOpen = profileDropdown.style.display === "flex";
    profileDropdown.style.display = isOpen ? "none" : "flex";
  });
}

// === AUTHENTIFICATION SUPABASE ===
async function checkAuth() {
  const { data: { session } } = await supabase.auth.getSession();
  const loggedInDiv = document.getElementById("profile-logged-in");
  const loggedOutDiv = document.getElementById("profile-logged-out");
  const emailSpan = document.getElementById("profileEmail");

  if (session) {
    loggedInDiv.classList.remove("hidden");
    loggedOutDiv.classList.add("hidden");
    if (emailSpan) emailSpan.textContent = session.user.email;
  } else {
    loggedOutDiv.classList.remove("hidden");
    loggedInDiv.classList.add("hidden");
  }
}

// Déconnexion
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    await supabase.auth.signOut();
    location.reload();
  });
}

// Vérification de session au chargement
checkAuth();
