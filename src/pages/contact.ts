import { h } from "../lib/dom";

const EMAIL = "oddnyhalldora21@gmail.com";
const INSTAGRAM_URL = "https://www.instagram.com/oddny21";
const WHATSAPP_DISPLAY = "+354 893 2110";
const WHATSAPP_URL = "https://wa.me/3548932110";

function item(label: string, link: HTMLElement): HTMLElement {
  return h(
    "li",
    { class: "contact-list__item" },
    h("span", { class: "contact-list__label" }, label),
    link,
  );
}

export function renderContact(): HTMLElement {
  return h(
    "div",
    { class: "page page--contact" },
    h(
      "section",
      { class: "contact", "aria-labelledby": "contact-title" },
      h("h1", { id: "contact-title", class: "page-title" }, "Contact"),
      h(
        "ul",
        { class: "contact-list" },
        item("Email", h("a", { class: "contact-list__link", href: `mailto:${EMAIL}` }, EMAIL)),
        item(
          "Instagram",
          h(
            "a",
            { class: "contact-list__link", href: INSTAGRAM_URL, target: "_blank", rel: "noopener noreferrer" },
            "Instagram",
          ),
        ),
        item(
          "WhatsApp",
          h(
            "a",
            { class: "contact-list__link", href: WHATSAPP_URL, target: "_blank", rel: "noopener noreferrer" },
            WHATSAPP_DISPLAY,
          ),
        ),
      ),
    ),
  );
}
