/* ── INIT GLOBAL ── */
document.addEventListener('DOMContentLoaded', () => {
    addFooter();
    addHeader();
    initPage();
});


function addFooter() {
    fetch("footer.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("footer").innerHTML = data;
        })
        .catch(error => console.error('Error loading footer:', error));
}

function addHeader() {
    fetch("header.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("header").innerHTML = data;
        })
        .catch(error => console.error('Error loading header:', error));
}

/* ── INIT PAGE ── */
function initPage() {

  /* ── NAVIGATION MULTI-PAGE ── */
  window.showPage = function (pageId) {
    document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));

    const page = document.getElementById("page-" + pageId);
    if (page) page.classList.add("active");

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* ── NAVBAR SCROLL ── */
  const navbar = document.getElementById("navbar");
  if (navbar) {
    window.addEventListener("scroll", () => {
      navbar.classList.toggle("scrolled", window.scrollY > 20);
    });
  }

  /* ── HAMBURGER ── */
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobileMenu");

  if (hamburger && mobileMenu) {
    hamburger.addEventListener("click", () => {
      mobileMenu.classList.toggle("open");
    });

    window.closeMobile = function () {
      mobileMenu.classList.remove("open");
    };
  }

  /* ── SCROLL REVEAL ── */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll(".reveal").forEach(el => {
    observer.observe(el);
  });

  /* ── ACCORDION ANCIENS EXÉCUTIFS ── */
  const annees = [
    { label: "2022–2023", img: null },
    { label: "2021–2022", img: "https://reelul.ca/wp-content/uploads/2023/04/337208580_162590003398513_5306916078086719740_n.jpg" },
    { label: "2020–2021", img: "https://reelul.ca/wp-content/uploads/2023/04/IMG_5912.jpeg" },
    { label: "2019–2020", img: "https://reelul.ca/wp-content/uploads/2023/04/2020.jpeg" },
    { label: "2018–2019", img: "https://reelul.ca/wp-content/uploads/2023/04/2019.jpeg" },
    { label: "2017–2018", img: "https://reelul.ca/wp-content/uploads/2023/04/2018.jpeg" },
    { label: "2016–2017", img: "https://reelul.ca/wp-content/uploads/2023/04/2017.jpeg" },
    { label: "2015–2016", img: "https://reelul.ca/wp-content/uploads/2023/04/2016.jpeg" },
    { label: "2014–2015", img: "https://reelul.ca/wp-content/uploads/2023/04/2015.jpeg" },
    { label: "2013–2014", img: "https://reelul.ca/wp-content/uploads/2023/04/2014.png" },
    { label: "2012–2013", img: "https://reelul.ca/wp-content/uploads/2023/04/2013.jpg" },
  ];

  const accordion = document.getElementById("annees-accordion");

  if (accordion) {
    annees.forEach((a) => {
      const item = document.createElement("div");
      item.className = "annee-item";

      const headerEl = document.createElement("div");
      headerEl.className = "annee-header";
      headerEl.innerHTML = `<h4>${a.label}</h4><span class="annee-chevron">▼</span>`;

      const body = document.createElement("div");
      body.className = "annee-body";

      body.innerHTML = a.img
        ? `<img src="${a.img}" alt="Exécutif ${a.label}" loading="lazy" />`
        : `<p style="color:var(--texte-doux); font-size:0.9rem; padding: 8px 0;">Photo non disponible.</p>`;

      headerEl.addEventListener("click", () => {
        const isOpen = body.classList.contains("open");

        document.querySelectorAll(".annee-body").forEach(b => b.classList.remove("open"));
        document.querySelectorAll(".annee-header").forEach(h => h.classList.remove("open"));

        if (!isOpen) {
          body.classList.add("open");
          headerEl.classList.add("open");
        }
      });

      item.appendChild(headerEl);
      item.appendChild(body);
      accordion.appendChild(item);
    });
  }

  /* ── RE-OBSERVER (si contenu dynamique) ── */
  const pageObs = new MutationObserver(() => {
    document.querySelectorAll(".reveal:not([data-observed])").forEach(el => {
      el.setAttribute("data-observed", "1");
      observer.observe(el);
    });
  });

  pageObs.observe(document.body, {
    subtree: true,
    attributes: true,
    attributeFilter: ["class"],
  });
}