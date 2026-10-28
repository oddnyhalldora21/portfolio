import { h } from "../lib/dom";
import {
  backLink,
  featureList,
  projectHero,
  prose,
  section,
  shotGrid,
  stackList,
  type Media,
} from "./project-parts";

/**
 * Screenshots: put the files in /public/images/article-api/ and set `src`
 * below, e.g. "/images/article-api/postman.png". To drop the screenshot row
 * entirely, remove `shotGrid(...)` from the page below.
 */
const screenshots: Media[] = [
  { label: "A request in Postman", alt: "Creating an author with a POST request in Postman" },
  { label: "A validation error", alt: "The API answering a bad request with a 400 validation error" },
];

type Method = "GET" | "POST" | "DELETE";

const endpoints: { group: string; routes: { method: Method; path: string; text: string }[] }[] = [
  {
    group: "Articles",
    routes: [
      { method: "GET", path: "/api/articles", text: "All articles" },
      { method: "GET", path: "/api/articles/:id", text: "One article" },
      { method: "POST", path: "/api/articles", text: "Create an article" },
      { method: "DELETE", path: "/api/articles/:id", text: "Delete an article" },
    ],
  },
  {
    group: "Authors",
    routes: [
      { method: "GET", path: "/api/authors", text: "All authors" },
      { method: "GET", path: "/api/authors/:id", text: "One author" },
      { method: "GET", path: "/api/authors/:id/articles", text: "Everything an author has written" },
      { method: "POST", path: "/api/authors", text: "Create an author" },
      { method: "DELETE", path: "/api/authors/:id", text: "Delete an author" },
    ],
  },
];

const features: { title: string; text: string }[] = [
  {
    title: "Checks before it trusts",
    text: "Every request body is checked against a Zod schema before it reaches a route, so empty names and broken emails never get saved.",
  },
  {
    title: "Errors that make sense",
    text: "One error handler catches everything and answers in the same shape every time: 400 for bad input, 404 when something isn't there, 500 when something breaks.",
  },
  {
    title: "Tidy REST design",
    text: "Clear, predictable URLs for articles and authors, including a route that lists everything a single author has written.",
  },
  {
    title: "Type-safe throughout",
    text: "Written in TypeScript with ES Modules, so mistakes show up while writing the code instead of when the API is running.",
  },
];

const stack: { name: string; text: string }[] = [
  { name: "Node.js + Express", text: "The server and routes" },
  { name: "TypeScript", text: "Type safety across the whole API" },
  { name: "Zod", text: "Validation schemas and middleware" },
  { name: "ES Modules", text: "Modern import / export in Node" },
  { name: "JSON files", text: "Simple file-based storage for articles and authors" },
];

const badRequest = `POST /api/authors
{
  "name": "",
  "email": "invalid-email"
}`;

const badResponse = `400 Bad Request
{
  "error": {
    "status": 400,
    "message": "Validation failed",
    "details": [ ... ]
  }
}`;

function endpointTable(): HTMLElement {
  return h(
    "div",
    { class: "endpoints" },
    ...endpoints.map((group) =>
      h(
        "div",
        { class: "endpoints__group" },
        h("h3", { class: "feature-list__title" }, group.group),
        h(
          "ul",
          { class: "endpoints__list", role: "list" },
          ...group.routes.map((route) =>
            h(
              "li",
              {},
              h("span", { class: `endpoints__method endpoints__method--${route.method.toLowerCase()}` }, route.method),
              h("code", { class: "endpoints__path" }, route.path),
              h("span", { class: "endpoints__text" }, route.text),
            ),
          ),
        ),
      ),
    ),
  );
}

function codeBlock(label: string, code: string): HTMLElement {
  return h(
    "figure",
    { class: "code-example" },
    h("figcaption", { class: "code-example__label" }, label),
    h("pre", { class: "code-block" }, h("code", {}, code)),
  );
}

export function renderArticleApi(): HTMLElement {
  return h(
    "div",
    { class: "page page--project" },
    backLink(),

    projectHero({
      status: { kind: "completed", label: "Completed · Backend" },
      title: "Article & Author API",
      lead: "A tidy little REST API for articles and the people who write them. My final project for the backend semester.",
      tags: ["TypeScript", "Node.js", "Express", "Zod"],
    }),

    section(
      "About",
      prose(
        "This API keeps track of articles and their authors. You can list, look up, create and delete both, and ask for everything a single author has written.",
        "The real focus was doing the backend basics properly: checking every piece of incoming data, and making sure that when something goes wrong, the API says so clearly and in the same way every time.",
      ),
    ),

    shotGrid(screenshots, "wide"),

    section("What it does", featureList(features)),

    section("The endpoints", endpointTable()),

    section(
      "Validation in action",
      prose(
        "Send it an author with an empty name and a made-up email, and it politely says no, explaining exactly which fields are wrong.",
      ),
      h(
        "div",
        { class: "code-examples" },
        codeBlock("You send", badRequest),
        codeBlock("It answers", badResponse),
      ),
    ),

    section("How it's built", stackList(stack)),
  );
}
