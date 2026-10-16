import { h } from "../lib/dom";
import { projects, type Project } from "../data/projects";

function projectCard(project: Project): HTMLElement {
  const media = project.image
    ? h(
        "div",
        { class: "card__media" },
        h("img", {
          src: project.image,
          alt: project.imageAlt ?? "",
          loading: "lazy",
          decoding: "async",
        }),
      )
    : null;

  const title = project.link
    ? h(
        "a",
        {
          class: "card__link",
          href: project.link,
          target: "_blank",
          rel: "noopener noreferrer",
        },
        project.title,
        h("span", { class: "card__arrow", "aria-hidden": "true" }, " ↗"),
        h("span", { class: "visually-hidden" }, " (opens in a new tab)"),
      )
    : project.title;

  const tags =
    project.tags && project.tags.length > 0
      ? h(
          "ul",
          { class: "card__tags", "aria-label": "Tags" },
          ...project.tags.map((tag) => h("li", {}, tag)),
        )
      : null;

  return h(
    "li",
    { class: `card${project.link ? " card--linked" : ""}` },
    media,
    h(
      "div",
      { class: "card__body" },
      h("h3", { class: "card__title" }, title),
      h("p", { class: "card__desc" }, project.description),
      tags,
    ),
  );
}

export function renderHome(): HTMLElement {
  return h(
    "div",
    { class: "page page--home" },
    h(
      "section",
      { class: "intro", "aria-labelledby": "intro-title" },
      h("p", { class: "intro__eyebrow" }, "Hi, I'm"),
      h("h1", { id: "intro-title", class: "intro__title" }, "Oddný Halldóra"),
      // PLACEHOLDER — replace with your own one-line description
      h(
        "p",
        { class: "intro__lead" },
        "[Placeholder] A one-line description of who you are and what you make.",
      ),
      h(
        "p",
        { class: "intro__actions" },
        h("a", { class: "button", href: "#/contact" }, "Get in touch"),
      ),
    ),
    h(
      "section",
      { class: "projects", "aria-labelledby": "projects-title" },
      h("h2", { id: "projects-title", class: "section-title" }, "Selected work"),
      h("ul", { class: "grid", role: "list" }, ...projects.map(projectCard)),
    ),
  );
}
