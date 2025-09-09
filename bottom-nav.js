(function(){
  function getSb(){
    if (window._sb && window._sb.auth && window._sb.auth.getUser) return window._sb;
    if (typeof supabaseClient !== 'undefined' && supabaseClient.auth && supabaseClient.auth.getUser) return supabaseClient;
    return null;
  }

  // Activer le lien actif
  function setActive(){
    var path = (location.pathname || "").toLowerCase();
    document.querySelectorAll('.bottom-nav .bn-item').forEach(function(a){
      var route = (a.getAttribute('data-route')||"").toLowerCase();
      if(!route) return;
      if(path.endsWith(route) || (route==='index.html' && (path.endsWith('/') || path===''))){
        a.classList.add('active');
      }
    });
  }
  setActive();

  // Redirection si lien protégé
  function guardAuthLink(e){
    var href = e.currentTarget.getAttribute('href');
    var sb = getSb();
    e.preventDefault();
    if(!sb){
      location.href = 'login.html?next='+encodeURIComponent(href);
      return;
    }
    sb.auth.getUser().then(({data:{user}})=>{
      if(user){ location.href = href; }
      else{ location.href = 'login.html?next='+encodeURIComponent(href); }
    }).catch(()=>{ location.href = 'login.html?next='+encodeURIComponent(href); });
  }
  document.querySelectorAll('.bottom-nav .bn-item[data-auth="required"]').forEach(a=>{
    a.addEventListener('click', guardAuthLink);
  });

  // Mettre à jour Profil selon la session
  function updateProfileLink(){
    var a = document.getElementById('bn-profile');
    var lbl = document.getElementById('bn-profile-label');
    if(!a || !lbl) return;
    var sb = getSb();
    if(!sb){
      a.setAttribute('href','login.html');
      lbl.textContent = 'Se connecter';
      a.setAttribute('data-auth','required');
      return;
    }
    sb.auth.getUser().then(({data:{user}})=>{
      if(user){
        a.setAttribute('href','profil.html');
        lbl.textContent = 'Profil';
        a.removeAttribute('data-auth');
      }else{
        a.setAttribute('href','login.html');
        lbl.textContent = 'Se connecter';
        a.setAttribute('data-auth','required');
      }
    });
    if(sb && sb.auth && sb.auth.onAuthStateChange){ sb.auth.onAuthStateChange(updateProfileLink); }
  }
  updateProfileLink();
})();