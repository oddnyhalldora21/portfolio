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

  const title = project.page
    ? h(
        "a",
        { class: "card__link", href: `#${project.page}` },
        project.title,
        h("span", { class: "card__arrow", "aria-hidden": "true" }, "→"),
      )
    : project.link
    ? h(
        "a",
        {
          class: "card__link",
          href: project.link,
          target: "_blank",
          rel: "noopener noreferrer",
        },
        project.title,
        h("span", { class: "card__arrow", "aria-hidden": "true" }, "↗"),
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
    { class: `card${project.page || project.link ? " card--linked" : ""}` },
    media,
    h(
      "div",
      { class: "card__body" },
      project.status
        ? h(
            "p",
            { class: `card__status card__status--${project.status.kind}` },
            project.status.label,
          )
        : null,
      h("h3", { class: "card__title" }, title),
      h("p", { class: "card__desc" }, project.description),
      tags,
      project.repo
        ? h(
            "a",
            {
              class: "card__repo",
              href: project.repo,
              target: "_blank",
              rel: "noopener noreferrer",
            },
            "GitHub",
            h("span", { "aria-hidden": "true" }, "↗"),
            h("span", { class: "visually-hidden" }, " (opens in a new tab)"),
          )
        : null,
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
      h(
        "h1",
        { id: "intro-title", class: "intro__title" },
        h("span", { class: "intro__title-faded" }, "Oddný"),
        " ",
        h("span", { class: "intro__title-solid" }, "Halldóra"),
      ),
      h("p", { class: "intro__lead" }, "FullStack programmer and UX/UI designer"),
    ),
    h(
      "section",
      { class: "projects", "aria-labelledby": "projects-title" },
      h("h2", { id: "projects-title", class: "section-title" }, "Projects"),
      h("ul", { class: "grid", role: "list" }, ...projects.map(projectCard)),
    ),
  );
}
