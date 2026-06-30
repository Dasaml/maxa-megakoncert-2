(function() {
  /* ==========================================================================
     1. POMOCNÉ FUNKCE A SCROLLOVÁNÍ
  ========================================================================== */
  const select = (el, all = false) => {
    el = el.trim();
    if (all) {
      return [...document.querySelectorAll(el)];
    } else {
      return document.querySelector(el);
    }
  };

  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener);
  };

  const scrollto = (el) => {
    const targetElement = select(el);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  /* Efekt pro scrollující navbar */
  const selectNavbar = select('#navbar');
  if (selectNavbar) {
    const navbarScrolled = () => {
      if (window.scrollY > 100) {
        selectNavbar.classList.add('navbar-scrolled');
      } else {
        selectNavbar.classList.remove('navbar-scrolled');
      }
    };
    window.addEventListener('load', navbarScrolled);
    onscroll(document, navbarScrolled);
  }

  /* ==========================================================================
     2. OVLÁDÁNÍ MENU (Hamburger a plynulý scroll pro všechny kotvy)
  ========================================================================== */
  const menu = select(".menu");
  const hamburger = select(".hamburger");
  const menuIcon = select(".svg-menu");
  const closeIcon = select(".svg-menu-close");
  
  const allAnchorLinks = select('a[href^="#"]', true);

  function toggleMenu() {
    if (!menu || !menuIcon || !closeIcon || !hamburger) return;

    menu.classList.toggle("showMenu");
    const isMenuNowOpen = menu.classList.contains("showMenu");
    
    hamburger.setAttribute("aria-expanded", isMenuNowOpen);
    
    if (isMenuNowOpen) {
      closeIcon.style.display = "block";
      menuIcon.style.display = "none";
    } else {
      closeIcon.style.display = "none";
      menuIcon.style.display = "block";
    }
  }

  if (hamburger) {
    hamburger.addEventListener("click", toggleMenu);
  }

  allAnchorLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");

      if (menu && menu.classList.contains("showMenu")) {
        toggleMenu();
      }

      if (href && href.startsWith("#") && href !== "#") {
        e.preventDefault();
        scrollto(href);
      }
    });
  });
})();