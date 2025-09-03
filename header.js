// header.js

// Charger le header
fetch('header.html')
  .then(response => response.text())
  .then(data => {
    document.body.insertAdjacentHTML('afterbegin', data);
    initHeader(); // On initialise les interactions après l'insertion
  });

// Fonction pour gérer le menu et Firebase
function initHeader() {
  // MENU TOGGLE
  const navLinks = document.getElementById('nav-links');
  document.querySelector('.menu-toggle').addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  // SUBMENU
  document.getElementById('realisations-btn').addEventListener('click', function(e){
    e.preventDefault();
    const submenu = document.getElementById('realisations-submenu');
    submenu.style.display = (submenu.style.display === "flex") ? "none" : "flex";
    submenu.style.flexDirection = "column";
  });

  // MENU PROFIL
  const profileIcon = document.getElementById('profileIcon');
  const profileMenu = document.getElementById('profileMenu');
  profileIcon.addEventListener('click', function(e){
    e.preventDefault();
    profileMenu.style.display = (profileMenu.style.display === "block") ? "none" : "block";
  });
  document.addEventListener('click', function(e){
    if(!profileIcon.contains(e.target) && !profileMenu.contains(e.target)){
      profileMenu.style.display = 'none';
    }
  });

  // --- FIREBASE ---
  import('https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js').then(({initializeApp}) => {
    import('https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js').then(({getAuth, onAuthStateChanged, signOut}) => {
      const firebaseConfig = {
        apiKey: "AIzaSyCK_JRF3Pzml-7JvYLpbXHTXIc7ntjCIXY",
        authDomain: "renolix.firebaseapp.com",
        projectId: "renolix",
        storageBucket: "renolix.firebasestorage.app",
        messagingSenderId: "693930423888",
        appId: "1:693930423888:web:d9eabdb9cce3e646ee8355"
      };
      const app = initializeApp(firebaseConfig);
      const auth = getAuth(app);

      onAuthStateChanged(auth, user => {
        profileMenu.innerHTML = '';
        if(user){
          const logoutLink = document.createElement('a');
          logoutLink.href = "#";
          logoutLink.textContent = "Déconnexion";
          logoutLink.addEventListener('click', async (e)=>{
            e.preventDefault();
            await signOut(auth);
            window.location.reload();
          });
          profileMenu.appendChild(logoutLink);
        } else {
          const loginLink = document.createElement('a');
          loginLink.href = "login.html";
          loginLink.textContent = "Se connecter";
          const registerLink = document.createElement('a');
          registerLink.href = "register.html";
          registerLink.textContent = "S'inscrire";
          profileMenu.appendChild(loginLink);
          profileMenu.appendChild(registerLink);
        }
      });
    });
  });
}