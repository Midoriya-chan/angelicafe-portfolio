/* ==============================================
   PORTFOLIO SETTINGS — EDIT THESE DETAILS FIRST
   ============================================== */
const SETTINGS = {
  // Prepare Email drafts a message addressed to Angelicafe.
  // The visitor must still send the message through their email app.
  contactEmail: "aisat.delacruz256666@gmail.com",
};

const projectDetails = {
  travel: {
    category: "LIFESTYLE / ADVENTURES",
    title: "Exploring New Places",
    description: "I love discovering beautiful places, enjoying a change of scenery, taking pictures, and creating happy memories. Little adventures help me recharge while balancing work and school.",
    features: ["Exploring", "Traveling", "Taking pictures", "Making memories"],
  },
  movies: {
    category: "ENTERTAINMENT / RELAXATION",
    title: "Movies & Series",
    description: "Watching movies and series is a fun way for me to relax and enjoy a peaceful break after my responsibilities for the day.",
    features: ["Movie nights", "Favorite series", "Relaxation", "Feel-good stories"],
  },
  cafes: {
    category: "LIFESTYLE / SELF-CARE",
    title: "Café Dates & Me Time",
    description: "I enjoy cozy cafés, trying food and drinks, and spending quality time with friends and family. Sometimes the happiest moments are the simplest ones.",
    features: ["Café visits", "Food trips", "Quality time", "Self-care"],
  },
};

const root = document.documentElement;
const sidebar = document.getElementById("sidebar");
const backdrop = document.getElementById("sidebar-backdrop");
const menuToggle = document.getElementById("menu-toggle");
const menuClose = document.getElementById("menu-close");
const themeToggle = document.getElementById("theme-toggle");
const navLinks = Array.from(document.querySelectorAll(".nav-link"));
const sections = Array.from(document.querySelectorAll("main section[id]"));
const progress = document.getElementById("scroll-progress");
const toast = document.getElementById("toast");
let toastTimer;
let lastFocusedElement = null;

/* Two shades of pink (saved locally). No dark mode for this design. */
try {
  const saved = localStorage.getItem("angelicafe-theme");
  root.dataset.theme = saved === "blush" ? "blush" : "light";
} catch (_) {
  root.dataset.theme = "light";
}
function syncThemeButton() {
  const blush = root.dataset.theme === "blush";
  themeToggle.setAttribute("aria-label", blush ? "Switch to white-pink theme" : "Switch to blush-pink theme");
  themeToggle.setAttribute("title", blush ? "White Pink" : "Blush Pink");
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.content = blush ? "#fff0f6" : "#fff9fc";
}
syncThemeButton();
themeToggle.addEventListener("click", () => {
  root.dataset.theme = root.dataset.theme === "light" ? "blush" : "light";
  try { localStorage.setItem("angelicafe-theme", root.dataset.theme); } catch (_) {}
  syncThemeButton();
});

/* Responsive side navigation. */
function setMenu(open) {
  sidebar.classList.toggle("is-open", open);
  backdrop.hidden = !open;
  document.body.classList.toggle("menu-open", open);
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Close navigation menu" : "Open navigation menu");
  if (open) {
    lastFocusedElement = document.activeElement;
    menuClose.focus();
  } else if (lastFocusedElement && window.innerWidth <= 900) {
    lastFocusedElement.focus();
    lastFocusedElement = null;
  }
}
menuToggle.addEventListener("click", () => setMenu(!sidebar.classList.contains("is-open")));
menuClose.addEventListener("click", () => setMenu(false));
backdrop.addEventListener("click", () => setMenu(false));
navLinks.forEach(link => link.addEventListener("click", () => {
  if (sidebar.classList.contains("is-open")) setMenu(false);
}));
window.addEventListener("resize", () => {
  if (window.innerWidth > 900 && sidebar.classList.contains("is-open")) setMenu(false);
});

/* Scroll progress and active-page sidebar highlight. */
let scrollScheduled = false;
function updateScrollProgress() {
  const scrollMax = document.documentElement.scrollHeight - window.innerHeight;
  const percentage = scrollMax > 0 ? Math.min(100, Math.max(0, window.scrollY / scrollMax * 100)) : 0;
  progress.style.width = `${percentage}%`;
  scrollScheduled = false;
}
window.addEventListener("scroll", () => {
  if (!scrollScheduled) { scrollScheduled = true; requestAnimationFrame(updateScrollProgress); }
}, { passive: true });
updateScrollProgress();

function setActiveNav(id) {
  navLinks.forEach(link => {
    const active = link.getAttribute("href") === `#${id}`;
    link.classList.toggle("active", active);
    if (active) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
}
if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(entries => {
    const candidates = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
    if (candidates.length) setActiveNav(candidates[0].target.id);
  }, { rootMargin: "-20% 0px -45% 0px", threshold: [0, 0.1, 0.25, 0.45, 0.7] });
  sections.forEach(section => sectionObserver.observe(section));
} else {
  setActiveNav(location.hash.replace("#", "") || "home");
}

/* Scroll-in reveal animations with accessibility fallback. */
const revealNodes = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: "0px 0px 45px 0px" });
  revealNodes.forEach(node => revealObserver.observe(node));
} else {
  revealNodes.forEach(node => node.classList.add("visible"));
}

/* Accessible project-detail dialog. */
const dialog = document.getElementById("project-dialog");
const dialogClose = document.getElementById("dialog-close");
function openProject(key) {
  const item = projectDetails[key];
  if (!item) return;
  document.getElementById("dialog-category").textContent = item.category;
  document.getElementById("dialog-title").textContent = item.title;
  document.getElementById("dialog-description").textContent = item.description;
  const features = document.getElementById("dialog-features");
  features.replaceChildren();
  item.features.forEach(feature => {
    const element = document.createElement("span");
    element.textContent = `♡  ${feature}`;
    features.append(element);
  });
  dialog.showModal();
}
document.querySelectorAll("[data-project]").forEach(button => {
  button.addEventListener("click", () => openProject(button.dataset.project));
});
dialogClose.addEventListener("click", () => dialog.close());
dialog.addEventListener("click", event => {
  if (event.target === dialog) dialog.close();
});

/* Contact form: opens local mail app, never claims to send to a server. */
function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 4600);
}
const contactForm = document.getElementById("contact-form");
function getContactMessage() {
  const data = new FormData(contactForm);
  return {
    subject: String(data.get("subject") || "").trim(),
    body: `Hello Angelicafe,\n\n${String(data.get("message") || "").trim()}\n\nFrom: ${String(data.get("name") || "").trim()}\nEmail: ${String(data.get("email") || "").trim()}`,
  };
}
async function copyContactText() {
  if (!contactForm.reportValidity()) return;
  const { subject, body } = getContactMessage();
  const value = `Subject: ${subject}\n\n${body}`;
  try {
    if (navigator.clipboard && window.isSecureContext) await navigator.clipboard.writeText(value);
    else {
      const textArea = document.createElement("textarea");
      textArea.value = value;
      textArea.style.position = "fixed";
      textArea.style.opacity = "0";
      document.body.appendChild(textArea);
      textArea.select();
      if (!document.execCommand("copy")) throw new Error("Copy not supported");
      textArea.remove();
    }
    showToast("Message copied! You can paste it into your email app.");
  } catch (_) {
    showToast("Could not copy automatically. Select and copy your message manually.");
  }
}
document.getElementById("copy-message").addEventListener("click", copyContactText);
contactForm.addEventListener("submit", event => {
  event.preventDefault();
  if (!contactForm.reportValidity()) return;
  const email = SETTINGS.contactEmail.trim();
  if (!email || email === "your.email@example.com") {
    showToast("Email is not configured yet. Please use Copy Message.");
    return;
  }
  const { subject, body } = getContactMessage();
  const link = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  showToast("Opening your email app with a prepared draft. You still need to press Send.");
  window.location.href = link;
});

/* Automatically keep the copyright year current. */
document.getElementById("year").textContent = new Date().getFullYear();

/* Keyboard close for mobile menu. Native <dialog> handles Escape itself. */
document.addEventListener("keydown", event => {
  if (event.key === "Escape" && sidebar.classList.contains("is-open")) setMenu(false);
});
