import { h } from "../lib/dom";
import type { ProjectStatus } from "../data/projects";

/**
 * Building blocks shared by the project pages (Sweet Treats, Llum Studio…).
 *
 * Media: leave `src` empty to show a placeholder. Once you have the files, put
 * them in /public/images/<project>/ and set `src`, e.g. "/images/llum-studio/home.png".
 */
export interface Media {
  label: string;
  alt: string;
  src?: string;
}

/** "phone" is tall like an app screen; "wide" is landscape like a website. */
export type MediaShape = "phone" | "wide";

export function mediaBlock(
  media: Media,
  kind: "video" | "image",
  shape: MediaShape,
  options: { showLabel?: boolean } = {},
): HTMLElement {
  const shapeClass = `media--${shape}`;
  if (!media.src) {
    return h(
      "div",
      {
        class: `media-placeholder ${shapeClass}`,
        role: "img",
        "aria-label": `${media.label} coming soon`,
      },
      options.showLabel ? h("span", { class: "media-placeholder__label" }, media.label) : null,
      h("span", { class: "media-placeholder__note" }, "Coming soon"),
    );
  }
  if (kind === "video") {
    return h("video", {
      class: `media-frame ${shapeClass}`,
      src: media.src,
      autoplay: true,
      muted: true,
      loop: true,
      playsinline: true,
      "aria-label": media.alt,
    });
  }
  return h("img", {
    class: `media-frame ${shapeClass}`,
    src: media.src,
    alt: media.alt,
    loading: "lazy",
    decoding: "async",
  });
}

/** A row of captioned screenshots. */
export function shotGrid(shots: Media[], shape: MediaShape, label = "Screenshots"): HTMLElement {
  return h(
    "ul",
    { class: `project-shots project-shots--${shape}`, role: "list", "aria-label": label },
    ...shots.map((shot) =>
      h(
        "li",
        {},
        mediaBlock(shot, "image", shape),
        h("p", { class: "project-shots__caption" }, shot.label),
      ),
    ),
  );
}

export function backLink(): HTMLElement {
  return h("a", { class: "back-link", href: "#/" }, "← All projects");
}

export function projectHero(options: {
  status: ProjectStatus;
  title: string;
  lead: string;
  tags: string[];
  liveUrl?: string;
  liveLabel?: string;
}): HTMLElement {
  return h(
    "header",
    { class: "project-hero" },
    h(
      "p",
      { class: `card__status card__status--${options.status.kind}` },
      options.status.label,
    ),
    h("h1", { class: "page-title project-hero__title" }, options.title),
    h("p", { class: "project-hero__lead" }, options.lead),
    // Tags on the left; the live-site link (if any) at the far right.
    h(
      "div",
      { class: "project-hero__meta" },
      h(
        "ul",
        { class: "card__tags project-hero__tags", "aria-label": "Tags" },
        ...options.tags.map((tag) => h("li", {}, tag)),
      ),
      options.liveUrl
        ? h(
            "a",
            {
              class: "project-hero__live",
              href: options.liveUrl,
              target: "_blank",
              rel: "noopener noreferrer",
            },
            options.liveLabel ?? "Visit the live site",
            h("span", { "aria-hidden": "true" }, " ↗"),
            h("span", { class: "visually-hidden" }, " (opens in a new tab)"),
          )
        : null,
    ),
  );
}

export function section(title: string, ...children: (Node | null)[]): HTMLElement {
  return h(
    "section",
    { class: "project-section" },
    h("h2", { class: "section-title" }, title),
    ...children,
  );
}

export function prose(...paragraphs: string[]): HTMLElement {
  return h("div", { class: "prose" }, ...paragraphs.map((text) => h("p", {}, text)));
}

export function featureList(features: { title: string; text: string }[]): HTMLElement {
  return h(
    "ul",
    { class: "feature-list", role: "list" },
    ...features.map((f) =>
      h("li", {}, h("h3", { class: "feature-list__title" }, f.title), h("p", {}, f.text)),
    ),
  );
}

export function stackList(stack: { name: string; text: string }[]): HTMLElement {
  return h(
    "dl",
    { class: "stack-list" },
    ...stack.flatMap((s) => [h("dt", {}, s.name), h("dd", {}, s.text)]),
  );
}
