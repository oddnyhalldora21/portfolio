import "./style.css";
import { h } from "./lib/dom";
import { renderHome } from "./pages/home";
import { renderContact } from "./pages/contact";
import { renderSweetTreats } from "./pages/sweet-treats";

const SITE_NAME = "Oddný Halldóra";

interface Route {
  title: string;
  render: () => HTMLElement;
}

const routes: Record<string, Route> = {
  "/": { title: SITE_NAME, render: renderHome },
  "/contact": { title: `Contact — ${SITE_NAME}`, render: renderContact },
  "/projects/sweet-treats": { title: `Sweet Treats — ${SITE_NAME}`, render: renderSweetTreats },
};

function renderNotFound(): HTMLElement {
  return h(
    "div",
    { class: "page" },
    h("h1", { class: "page-title" }, "Page not found"),
    h("p", { class: "page-lead" }, "That page doesn't exist."),
    h("p", {}, h("a", { class: "button", href: "#/" }, "Back to home")),
  );
}

const main = document.getElementById("main")!;
let firstRender = true;

function currentPath(): string {
  const path = location.hash.replace(/^#/, "") || "/";
  return path.length > 1 ? path.replace(/\/$/, "") : path;
}

function render() {
  const path = currentPath();
  const route = routes[path];

  main.replaceChildren(route ? route.render() : renderNotFound());
  document.title = route ? route.title : `Not found — ${SITE_NAME}`;

  document.querySelectorAll<HTMLAnchorElement>("[data-route]").forEach((link) => {
    if (link.dataset.route === path) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });

  // Move focus to the new content on navigation so screen-reader and
  // keyboard users land at the top of the page (but not on initial load).
  if (!firstRender) {
    window.scrollTo(0, 0);
    main.focus({ preventScroll: true });
  }
  firstRender = false;
}

// "#main" would be treated as a route, so handle the skip link manually.
document.querySelector("[data-skip-link]")?.addEventListener("click", (event) => {
  event.preventDefault();
  main.focus();
});

document.querySelectorAll("[data-year]").forEach((el) => {
  el.textContent = String(new Date().getFullYear());
});

window.addEventListener("hashchange", render);
render();
