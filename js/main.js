(function () {
  "use strict";

  const D = window.SITE_DATA;
  const T = window.I18N;
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let lang = "tr";

  /* ---------- helpers ---------- */
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const tx = (v) => (v && typeof v === "object" && !Array.isArray(v) ? v[lang] : v);

  const storage = {
    get(key) { try { return localStorage.getItem(key); } catch (e) { return null; } },
    set(key, val) { try { localStorage.setItem(key, val); } catch (e) { /* yok say */ } }
  };

  const ICONS = {
    github: '<path fill="currentColor" d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.56 9.56 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2z"/>',
    linkedin: '<path fill="currentColor" d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z"/>',
    x: '<path fill="currentColor" d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.21-6.82-5.97 6.82H1.67l7.73-8.84L1.25 2.25h6.83l4.71 6.23 5.45-6.23zm-1.16 17.52h1.83L7.08 4.13H5.12l11.96 15.64z"/>',
    mail: '<path fill="currentColor" d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/>',
    phone: '<path fill="currentColor" d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1.02l-2.2 2.2z"/>',
    pin: '<path fill="currentColor" d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z"/>',
    external: '<path fill="currentColor" d="M14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7zm5 16H5V5h7V3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7h-2v7z"/>'
  };
  const icon = (name, size = 20) => `<svg viewBox="0 0 24 24" width="${size}" height="${size}" aria-hidden="true">${ICONS[name]}</svg>`;

  /* ---------- render ---------- */
  function renderStatic() {
    $$("[data-field='name']").forEach((el) => (el.textContent = D.name));
    $$("[data-field='initials']").forEach((el) => (el.textContent = D.initials));
    $("#cvBtn").setAttribute("href", D.cvUrl);
    $("#year").textContent = new Date().getFullYear();
    $("#social").innerHTML = D.social
      .map((s) => `<a href="${esc(s.url)}" target="_blank" rel="noopener" aria-label="${esc(s.name)}">${icon(s.icon)}</a>`)
      .join("");
  }

  function renderI18n() {
    const dict = T[lang];
    $$("[data-i18n]").forEach((el) => {
      const val = dict[el.dataset.i18n];
      if (val !== undefined) el.innerHTML = val; // sabit, güvenilir metinler (bkz. i18n.js)
    });
    $$("[data-i18n-aria]").forEach((el) => {
      const val = dict[el.dataset.i18nAria];
      if (val !== undefined) el.setAttribute("aria-label", val);
    });
    $$("[data-lang-opt]").forEach((el) => el.classList.toggle("is-current", el.dataset.langOpt === lang));
  }

  function renderContent() {
    $("[data-field='tagline']").textContent = tx(D.tagline);
    $("#aboutText").innerHTML = tx(D.about).map((p) => `<p>${esc(p)}</p>`).join("");

    $("#stats").innerHTML = D.stats
      .map((s) => `<div class="stat"><div class="stat__value">${esc(s.value)}</div><div class="stat__label">${esc(tx(s.label))}</div></div>`)
      .join("");

    $("#skills").innerHTML = D.skills
      .map((g) => `
        <div class="skill-group">
          <p class="skill-group__title">${esc(tx(g.category))}</p>
          ${g.items.map((s) => `
            <div class="skill">
              <div class="skill__head"><span>${esc(s.name)}</span><span>${s.level}%</span></div>
              <div class="skill__bar"><div class="skill__fill" data-level="${s.level}"></div></div>
            </div>`).join("")}
        </div>`)
      .join("");

    $("#projectList").innerHTML = D.projects
      .map((p, i) => `
        <article class="card reveal">
          <div class="card__cover" style="background:${esc(p.gradient)}">
            <span class="card__num">${String(i + 1).padStart(2, "0")}</span>
          </div>
          <div class="card__body">
            <h3 class="card__title">${esc(tx(p.title))}</h3>
            <p class="card__desc">${esc(tx(p.description))}</p>
            <div class="tags">${p.tags.map((t) => `<span class="tag">${esc(t)}</span>`).join("")}</div>
            <div class="card__links">
              ${p.github ? `<a href="${esc(p.github)}" target="_blank" rel="noopener">${icon("github", 18)}${esc(T[lang]["projects.code"])}</a>` : ""}
              ${p.demo ? `<a href="${esc(p.demo)}" target="_blank" rel="noopener">${icon("external", 18)}${esc(T[lang]["projects.demo"])}</a>` : ""}
            </div>
          </div>
          <span class="card__glare"></span>
        </article>`)
      .join("");

    const timeline = (items) => items
      .map((it) => `
        <div class="tl-item reveal">
          <span class="tl-item__date">${esc(tx(it.date))}</span>
          <h3 class="tl-item__title">${esc(tx(it.title))}</h3>
          <p class="tl-item__place">${esc(tx(it.place))}</p>
          <p class="tl-item__desc">${esc(tx(it.description))}</p>
        </div>`)
      .join("");
    $("#panel-work").innerHTML = timeline(D.experience);
    $("#panel-edu").innerHTML = timeline(D.education);

    const c = D.contact;
    $("#contactList").innerHTML = `
      <li><span class="contact__icon">${icon("mail")}</span><a href="mailto:${esc(c.email)}">${esc(c.email)}</a></li>
      <li><span class="contact__icon">${icon("phone")}</span><a href="tel:${esc(c.phone.replace(/\s/g, ""))}">${esc(c.phone)}</a></li>
      <li><span class="contact__icon">${icon("pin")}</span><span>${esc(tx(c.location))}</span></li>`;

    const k = D.kvkk[lang];
    $("#kvkkTitle").textContent = k.title;
    $("#kvkkBody").innerHTML = k.sections.map((s) => `<h3>${esc(s.heading)}</h3><p>${esc(s.text)}</p>`).join("");

    observeReveal();
    initTilt();
  }

  function setLang(next) {
    lang = next;
    document.documentElement.lang = lang;
    storage.set("lang", lang);
    renderI18n();
    renderContent();
    typer.restart(tx(D.roles));
  }

  /* ---------- typewriter ---------- */
  const typer = (() => {
    const el = $("#typed");
    let words = [], wi = 0, ci = 0, deleting = false, timer = null;
    function tick() {
      const word = words[wi];
      ci += deleting ? -1 : 1;
      el.textContent = word.slice(0, ci);
      let delay = deleting ? 45 : 95;
      if (!deleting && ci === word.length) { deleting = true; delay = 1600; }
      else if (deleting && ci === 0) { deleting = false; wi = (wi + 1) % words.length; delay = 350; }
      timer = setTimeout(tick, delay);
    }
    return {
      restart(list) {
        clearTimeout(timer);
        words = list; wi = 0; ci = 0; deleting = false;
        if (reduceMotion) { el.textContent = words[0]; return; }
        tick();
      }
    };
  })();

  /* ---------- reveal & skill bars ---------- */
  const revealObserver = "IntersectionObserver" in window
    ? new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.classList.add("is-visible");
          $$(".skill__fill", e.target).forEach((f) => (f.style.width = f.dataset.level + "%"));
          revealObserver.unobserve(e.target);
        });
      }, { threshold: 0.15 })
    : null;

  function observeReveal() {
    $$(".reveal:not(.is-visible)").forEach((el) => {
      if (revealObserver) revealObserver.observe(el);
      else el.classList.add("is-visible");
    });
    // dil değişiminde yeniden çizilen, zaten görünür alandaki çubuklar
    $$(".reveal.is-visible .skill__fill").forEach((f) => (f.style.width = f.dataset.level + "%"));
    if (!revealObserver) $$(".skill__fill").forEach((f) => (f.style.width = f.dataset.level + "%"));
  }

  /* ---------- card tilt ---------- */
  function initTilt() {
    if (reduceMotion || !window.matchMedia("(hover: hover)").matches) return;
    $$(".card").forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width;
        const y = (e.clientY - r.top) / r.height;
        card.style.transform = `perspective(800px) rotateX(${(0.5 - y) * 8}deg) rotateY(${(x - 0.5) * 8}deg) translateY(-6px)`;
        card.style.setProperty("--gx", x * 100 + "%");
        card.style.setProperty("--gy", y * 100 + "%");
      });
      card.addEventListener("mouseleave", () => (card.style.transform = ""));
    });
  }

  /* ---------- nav ---------- */
  function initNav() {
    const nav = $("#nav"), burger = $("#burger"), menu = $("#navMenu");
    const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const closeMenu = () => { menu.classList.remove("is-open"); burger.setAttribute("aria-expanded", "false"); };
    burger.addEventListener("click", () => {
      const open = menu.classList.toggle("is-open");
      burger.setAttribute("aria-expanded", String(open));
    });
    $$(".nav__link").forEach((a) => a.addEventListener("click", closeMenu));

    if ("IntersectionObserver" in window) {
      const links = $$(".nav__link");
      const io = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) links.forEach((l) => l.classList.toggle("is-active", l.getAttribute("href") === "#" + e.target.id));
        });
      }, { rootMargin: "-45% 0px -50% 0px" });
      $$("main section[id]").forEach((s) => io.observe(s));
    }

    $("#langBtn").addEventListener("click", () => setLang(lang === "tr" ? "en" : "tr"));
  }

  /* ---------- tabs ---------- */
  function initTabs() {
    const tabs = $$(".tab");
    const select = (tab) => {
      tabs.forEach((t) => {
        const on = t === tab;
        t.classList.toggle("is-active", on);
        t.setAttribute("aria-selected", String(on));
        t.tabIndex = on ? 0 : -1;
        const panel = document.getElementById(t.getAttribute("aria-controls"));
        panel.hidden = !on;
        if (on) $$(".reveal", panel).forEach((el) => el.classList.add("is-visible"));
      });
    };
    tabs.forEach((t, i) => {
      t.addEventListener("click", () => select(t));
      t.addEventListener("keydown", (e) => {
        if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
        const next = tabs[(i + (e.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length];
        select(next); next.focus();
      });
    });
  }

  /* ---------- KVKK modal ---------- */
  function initModal() {
    const modal = $("#kvkkModal"), dialog = $(".modal__dialog", modal);
    let lastFocus = null;

    const open = () => {
      lastFocus = document.activeElement;
      modal.hidden = false;
      document.body.classList.add("no-scroll");
      dialog.scrollTop = 0;
      $(".modal__close", modal).focus();
    };
    const close = () => {
      modal.hidden = true;
      document.body.classList.remove("no-scroll");
      if (lastFocus) lastFocus.focus();
    };

    $$("[data-open-kvkk]").forEach((b) => b.addEventListener("click", open));
    $$("[data-close-modal]", modal).forEach((b) => b.addEventListener("click", close));
    document.addEventListener("keydown", (e) => {
      if (modal.hidden) return;
      if (e.key === "Escape") { close(); return; }
      if (e.key === "Tab") {
        const f = $$("button, a[href], [tabindex]:not([tabindex='-1'])", dialog);
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
  }

  /* ---------- form (demo) ---------- */
  function initForm() {
    const form = $("#contactForm"), toast = $("#toast");
    let toastTimer = null;

    form.addEventListener("input", (e) => {
      const field = e.target.closest(".field");
      if (field && e.target.checkValidity()) field.classList.remove("is-invalid");
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      let firstInvalid = null;
      $$("input, textarea", form).forEach((inp) => {
        const ok = inp.checkValidity();
        inp.closest(".field").classList.toggle("is-invalid", !ok);
        if (!ok && !firstInvalid) firstInvalid = inp;
      });
      if (firstInvalid) { firstInvalid.focus(); return; }

      form.reset();
      toast.textContent = T[lang]["form.toast"];
      toast.classList.add("is-visible");
      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 3500);
    });
  }

  /* ---------- init ---------- */
  const saved = storage.get("lang");
  const initial = saved === "tr" || saved === "en"
    ? saved
    : ((navigator.language || "tr").toLowerCase().startsWith("tr") ? "tr" : "en");

  renderStatic();
  initNav();
  initTabs();
  initModal();
  initForm();
  setLang(initial);
})();
