// ---------- Helpers ----------
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

function setYear() {
  const y = $("#year");
  if (y) y.textContent = new Date().getFullYear();
}

function setActiveNav() {
  const path = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  $$(".nav-link").forEach(a => {
    const href = (a.getAttribute("href") || "").toLowerCase();
    if (href === path) a.classList.add("is-active");
  });
}

/*
function initTheme() {
  const root = document.documentElement;
  const saved = localStorage.getItem("theme");
  if (saved === "light" || saved === "dark") root.dataset.theme = saved;

  const btn = $("#themeToggle");
  if (!btn) return;

  btn.addEventListener("click", () => {
    const cur = root.dataset.theme || "dark";
    const next = cur === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    localStorage.setItem("theme", next);
  });
}
*/

function initTheme() {
  const root = document.documentElement;
  const btn = document.getElementById("themeToggle");

  const saved = localStorage.getItem("theme");
  if (saved === "light" || saved === "dark") {
    root.dataset.theme = saved;
  } else {
    root.dataset.theme = "dark";
  }

  updateThemeLabel();

  btn.addEventListener("click", () => {
    root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
    localStorage.setItem("theme", root.dataset.theme);
    updateThemeLabel();
  });

  function updateThemeLabel() {
    btn.textContent = root.dataset.theme === "dark" ? "Light" : "Dark";
  }
}


// ---------- Projects page: search + filter ----------
function initProjectTools() {
  const grid = $("#projectsGrid");
  if (!grid) return;

  const search = $("#projectSearch");
  const filter = $("#projectFilter");
  const empty = $("#noResults");

  const cards = $$(".project-card", grid);

  function apply() {
    const q = (search?.value || "").trim().toLowerCase();
    const f = (filter?.value || "all").toLowerCase();

    let visible = 0;

    cards.forEach(card => {
      const tags = (card.getAttribute("data-tags") || "").toLowerCase();
      const text = card.textContent.toLowerCase();

      const matchesQuery = !q || text.includes(q) || tags.includes(q);
      const matchesFilter = f === "all" || tags.split(/\s+/).includes(f);

      const show = matchesQuery && matchesFilter;
      card.style.display = show ? "" : "none";
      if (show) visible += 1;
    });

    if (empty) empty.hidden = visible !== 0;
  }

  search?.addEventListener("input", apply);
  filter?.addEventListener("change", apply);
  apply();
}

// ---------- Contact page: copy + mailto form ----------
function initContact() {
  const copyBtn = $("#copyEmail");
  const emailEl = $("#emailText");
  const toast = $("#copyToast");

  if (copyBtn && emailEl) {
    copyBtn.addEventListener("click", async () => {
      const email = emailEl.textContent.trim();
      try {
        await navigator.clipboard.writeText(email);
        if (toast) {
          toast.hidden = false;
          setTimeout(() => (toast.hidden = true), 1200);
        }
      } catch {
        // fallback: select text (best-effort)
        window.prompt("Copy email:", email);
      }
    });
  }

  const form = $("#contactForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const fd = new FormData(form);
    const name = (fd.get("name") || "").toString().trim();
    const from = (fd.get("from") || "").toString().trim();
    const msg = (fd.get("message") || "").toString().trim();

    const to = "you@example.com"; // <-- change this
    const subject = encodeURIComponent(`Portfolio message from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${from}\n\n${msg}\n`
    );

    // Mailto draft (GitHub Pages-friendly)
    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
  });
}

function initCopyButtons() {
  const toast = document.getElementById("copyToast");
  document.querySelectorAll("[data-copy]").forEach(btn => {
    btn.addEventListener("click", async () => {
      const text = btn.getAttribute("data-copy");
      try {
        await navigator.clipboard.writeText(text);
        if (toast) {
          toast.hidden = false;
          setTimeout(() => (toast.hidden = true), 1200);
        }
      } catch {
        window.prompt("Copy:", text);
      }
    });
  });
}


// ---------- Marquee: duplicate content for smoother loop (optional) ----------
function initMarquee() {
  const track = document.querySelector("[data-marquee]");
  if (!track) return;

  // Ensure enough content to scroll
  // If you change the text, this still works.
  const text = track.innerHTML;
  if (!text.includes(text)) {
    track.innerHTML = text + text;
  }
}

// ---------- Boot ----------
setYear();
setActiveNav();
initTheme();
initProjectTools();
initContact();
initMarquee();
initCopyButtons();
