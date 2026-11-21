// ---------- Helpers ----------
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

const esc = (s = "") =>
  String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

const DATA = window.PORTFOLIO || { experience: [], projects: [], featured: [] };
const ALL_ITEMS = [...DATA.experience, ...DATA.projects];
const findItem = id => ALL_ITEMS.find(i => i.id === id);

const LINK_LABELS = { github: "GitHub", live: "Live site", paper: "Paper" };

// ---------- Basics ----------
function setYear() {
  const y = $("#year");
  if (y) y.textContent = new Date().getFullYear();
}

function setActiveNav() {
  const path = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  $$(".nav-link").forEach(a => {
    if ((a.getAttribute("href") || "").toLowerCase() === path) {
      a.classList.add("is-active");
      a.setAttribute("aria-current", "page");
    }
  });
}

// Theme is applied before paint by the inline script in <head>; this just wires the button.
function initTheme() {
  const root = document.documentElement;
  const btn = $("#themeToggle");
  if (!btn) return;

  const SUN = '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';
  const MOON = '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>';

  const label = () => {
    const dark = root.dataset.theme !== "light";
    btn.innerHTML = `${dark ? SUN : MOON}<span class="theme-text">${dark ? "Light" : "Dark"}</span>`;
    btn.setAttribute("aria-label", `Switch to ${dark ? "light" : "dark"} mode`);
  };
  label();

  btn.addEventListener("click", () => {
    root.dataset.theme = root.dataset.theme === "light" ? "dark" : "light";
    try { localStorage.setItem("theme", root.dataset.theme); } catch {}
    label();
  });
}

// ---------- Scroll effects ----------
function initScrollProgress() {
  const bar = $(".scroll-progress");
  if (!bar) return;
  let ticking = false;
  const update = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    bar.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
    ticking = false;
  };
  addEventListener("scroll", () => {
    if (!ticking) { requestAnimationFrame(update); ticking = true; }
  }, { passive: true });
  addEventListener("resize", update);
  update();
}

let revealObserver;
function observeReveals(root = document) {
  const els = $$(".reveal:not(.is-visible)", root);
  if (!("IntersectionObserver" in window)) {
    els.forEach(el => el.classList.add("is-visible"));
    return;
  }
  revealObserver ??= new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add("is-visible");
        revealObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
  els.forEach(el => revealObserver.observe(el));
}

function initHeaderShadow() {
  const header = $(".site-header");
  if (!header) return;
  const update = () => header.classList.toggle("is-scrolled", scrollY > 8);
  addEventListener("scroll", update, { passive: true });
  update();
}

// ---------- Cards ----------
function cardHTML(item, index) {
  const meta = [item.org, item.period].filter(Boolean).map(esc).join(" · ");
  const tags = (item.tags || []).map(t => `<span class="tag">${esc(t)}</span>`).join("");
  return `
    <article class="item-card reveal" style="--i:${index}">
      <div class="item-main">
        ${item.kicker ? `<p class="card-kicker">${esc(item.kicker)}</p>` : ""}
        <h3 class="item-title">
          <button class="item-open" type="button" data-open="${esc(item.id)}">${esc(item.title)}</button>
        </h3>
        ${meta ? `<p class="item-meta">${meta}</p>` : ""}
        ${item.summary ? `<p class="item-summary">${esc(item.summary)}</p>` : ""}
        ${tags ? `<div class="tags">${tags}</div>` : ""}
        ${item.video ? `<button class="item-chip" type="button" data-open="${esc(item.id)}"><span aria-hidden="true">▶</span> Watch demo video</button>` : ""}
        ${item.links?.live ? `<a class="item-chip" href="${esc(item.links.live)}" target="_blank" rel="noopener noreferrer"><span aria-hidden="true">↗</span> Live site</a>` : ""}
      </div>
      <span class="item-cta" aria-hidden="true">Details <span class="arrow">→</span></span>
    </article>`;
}

function renderLists() {
  $$("[data-list]").forEach(container => {
    const key = container.dataset.list;
    const items = key === "featured"
      ? (DATA.featured || []).map(findItem).filter(Boolean)
      : DATA[key] || [];
    container.innerHTML = items.map(cardHTML).join("");
  });
}

// ---------- Popup ----------
function initModal() {
  const dialog = $("#detailModal");
  if (!dialog) return;
  const body = $(".modal-body", dialog);
  let lastTrigger = null;

  function open(item, trigger) {
    lastTrigger = trigger;
    const meta = [item.org, item.period, item.location].filter(Boolean).map(esc).join(" · ");
    const paras = (item.description || []).map(p => `<p>${esc(p)}</p>`).join("");
    const bullets = (item.highlights || []).length
      ? `<ul class="modal-list">${item.highlights.map(h => `<li>${esc(h)}</li>`).join("")}</ul>` : "";
    const tags = (item.tags || []).map(t => `<span class="tag">${esc(t)}</span>`).join("");
    const links = Object.entries(item.links || {})
      .filter(([, url]) => url)
      .map(([k, url], i) =>
        `<a class="btn ${i === 0 ? "btn-accent" : ""}" href="${esc(url)}" target="_blank" rel="noopener noreferrer">${esc(LINK_LABELS[k] || k)} <span aria-hidden="true">↗</span></a>`)
      .join("");

    const v = item.video;
    const video = v ? `
      <figure class="modal-media">
        <video controls playsinline preload="metadata"${v.poster ? ` poster="${esc(v.poster)}"` : ""}>
          <source src="${esc(v.src)}" type="video/mp4" />
        </video>
        ${v.caption ? `<figcaption>${esc(v.caption)}</figcaption>` : ""}
      </figure>` : "";

    body.innerHTML = `
      ${item.kicker ? `<p class="card-kicker">${esc(item.kicker)}</p>` : ""}
      <h2 class="modal-title" id="modalTitle">${esc(item.title)}</h2>
      ${meta ? `<p class="item-meta">${meta}</p>` : ""}
      ${video}
      <div class="modal-text">${paras}${bullets}</div>
      ${tags ? `<div class="tags">${tags}</div>` : ""}
      ${links ? `<div class="modal-links">${links}</div>` : ""}`;

    document.documentElement.classList.add("modal-open");
    dialog.showModal();
    dialog.scrollTop = 0;
  }

  function close() {
    $$("video", dialog).forEach(v => v.pause());
    dialog.classList.add("is-closing");
    const done = () => {
      dialog.classList.remove("is-closing");
      dialog.close();
    };
    matchMedia("(prefers-reduced-motion: reduce)").matches ? done() : setTimeout(done, 180);
  }

  dialog.addEventListener("close", () => {
    document.documentElement.classList.remove("modal-open");
    lastTrigger?.focus();
  });
  dialog.addEventListener("cancel", e => { e.preventDefault(); close(); });
  dialog.addEventListener("click", e => {
    if (e.target === dialog || e.target.closest("[data-close]")) close();
  });

  document.addEventListener("click", e => {
    const btn = e.target.closest("[data-open]");
    if (!btn) return;
    const item = findItem(btn.dataset.open);
    if (item) open(item, btn);
  });
}

// ---------- Contact: copy buttons ----------
function initCopyButtons() {
  const toast = $("#copyToast");
  $$("[data-copy]").forEach(btn => {
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

// ---------- Visit counter (GoatCounter — free, no backend, no cookies) ----------
// 1. Sign up at https://www.goatcounter.com and pick a site code, e.g. "balaji".
// 2. Put that code below. Leave it empty to disable tracking entirely.
// 3. (Optional) To show the public count in the footer, enable
//    Settings → "Allow adding visitor counts on your website" in GoatCounter.
const GOATCOUNTER_CODE = "balajirames03";
const SHOW_VISIT_COUNT = false;

function initAnalytics() {
  if (!GOATCOUNTER_CODE || location.protocol === "file:") return;
  const base = `https://${GOATCOUNTER_CODE}.goatcounter.com`;

  const s = document.createElement("script");
  s.async = true;
  s.src = "https://gc.zgo.at/count.js";
  s.dataset.goatcounter = `${base}/count`;
  document.head.appendChild(s);

  const footer = $(".footer-text");
  if (!SHOW_VISIT_COUNT || !footer) return;
  fetch(`${base}/counter/TOTAL.json`)
    .then(r => (r.ok ? r.json() : null))
    .then(d => {
      if (!d?.count) return;
      const el = document.createElement("span");
      el.className = "visit-count";
      el.textContent = `${d.count} visits`;
      footer.after(el);
    })
    .catch(() => {});
}

// ---------- Boot ----------
setYear();
setActiveNav();
initTheme();
renderLists();
initModal();
initCopyButtons();
initScrollProgress();
initHeaderShadow();
observeReveals();
initAnalytics();
