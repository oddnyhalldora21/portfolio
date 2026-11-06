import { h } from "../lib/dom";
import {
  backLink,
  featureList,
  projectHero,
  prose,
  section,
  stackList,
} from "./project-parts";

const REPO_URL = "https://github.com/oddnyhalldora21/tix-api";

type Method = "GET" | "POST" | "PUT" | "DELETE";

interface Route {
  method: Method;
  path: string;
  text: string;
  /** Needs a JWT in the Authorization header. */
  auth?: boolean;
}

const endpoints: { group: string; routes: Route[] }[] = [
  {
    group: "Auth",
    routes: [
      { method: "POST", path: "/api/auth/register", text: "Create an account" },
      { method: "POST", path: "/api/auth/login", text: "Log in and get a token" },
    ],
  },
  {
    group: "Your account",
    routes: [
      { method: "GET", path: "/api/users/profile", text: "Your profile", auth: true },
      { method: "PUT", path: "/api/users/profile", text: "Change your name, email or password", auth: true },
      { method: "DELETE", path: "/api/users/account", text: "Delete your account", auth: true },
    ],
  },
  {
    group: "Events",
    routes: [
      { method: "GET", path: "/api/events", text: "All events, with optional filters" },
      { method: "GET", path: "/api/events/:id", text: "One event and its ticket types" },
    ],
  },
  {
    group: "Venues & categories",
    routes: [
      { method: "GET", path: "/api/venues", text: "All venues" },
      { method: "GET", path: "/api/venues/:id", text: "One venue" },
      { method: "GET", path: "/api/venues/:id/events", text: "Everything on at a venue" },
      { method: "GET", path: "/api/categories", text: "All categories" },
      { method: "GET", path: "/api/categories/:id", text: "One category" },
    ],
  },
  {
    group: "Bookings",
    routes: [
      { method: "POST", path: "/api/bookings", text: "Book tickets", auth: true },
      { method: "GET", path: "/api/bookings", text: "Your bookings, with event and venue", auth: true },
      { method: "DELETE", path: "/api/bookings/:id", text: "Cancel a booking", auth: true },
    ],
  },
];

const features: { title: string; text: string }[] = [
  {
    title: "Find something to see",
    text: "List every event with its venue and category, or filter by category, venue, city and dates. Open one event to see all its ticket types.",
  },
  {
    title: "Book and cancel",
    text: "Signed-in users can book tickets, see their bookings and cancel them. Booking and cancelling each run in a database transaction, so the number of tickets left always adds up.",
  },
  {
    title: "Rules that make sense",
    text: "You can't book more tickets than are left, or book for an event that's already happened. You can only cancel your own bookings, at least 24 hours before the event, and only once.",
  },
  {
    title: "Accounts and sign-in",
    text: "Register and log in to get a token that lasts 7 days. Passwords are hashed with bcrypt, and you can update or delete your own account.",
  },
  {
    title: "Checks before it trusts",
    text: "Every request body is checked with a Zod schema. Bad input gets a 400 that says exactly which fields are wrong.",
  },
  {
    title: "Tested against a real database",
    text: "31 integration tests across auth, bookings and events send real HTTP requests to the API, backed by PostgreSQL.",
  },
];

const stack: { name: string; text: string }[] = [
  { name: "Node.js + TypeScript", text: "Type safety across the whole API" },
  { name: "Express 5", text: "The server and routes" },
  { name: "PostgreSQL + pg-promise", text: "Six tables, parameterized queries and transactions" },
  { name: "JWT + bcrypt", text: "Sign-in tokens and password hashing" },
  { name: "Zod", text: "Validation schemas for every request body" },
  { name: "Vitest + Supertest", text: "Integration tests" },
];

/* Request → response examples, taken from the project README. */
interface Example {
  caption: string;
  method: Method;
  path: string;
  headers?: string[];
  body?: string;
  status: { code: number; text: string };
  response: string;
}

const examples: Example[] = [
  {
    caption: "Booking two tickets works, and the ticket count goes down.",
    method: "POST",
    path: "/api/bookings",
    headers: ["Authorization: Bearer <token>"],
    body: `{ "ticket_id": 1, "quantity": 2 }`,
    status: { code: 201, text: "Created" },
    response: `{
  "message": "Booking created successfully",
  "booking": {
    "id": 5,
    "user_id": 4,
    "ticket_id": 1,
    "quantity": 2,
    "total_price": "17800.00",
    "booking_date": "2026-11-06T13:06:08.565Z",
    "status": "confirmed"
  }
}`,
  },
  {
    caption: "A made-up email and a short password get a clear no, field by field.",
    method: "POST",
    path: "/api/auth/register",
    body: `{ "name": "Anna", "email": "not-an-email", "password": "123" }`,
    status: { code: 400, text: "Bad Request" },
    response: `{
  "error": "Validation failed",
  "details": [
    {
      "origin": "string",
      "code": "invalid_format",
      "format": "email",
      "pattern": "/^(?!\\\\.)(?!.*\\\\.\\\\.)([A-Za-z0-9_'+\\\\-\\\\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\\\\-]*\\\\.)+[A-Za-z]{2,}$/",
      "path": ["email"],
      "message": "Invalid email format"
    },
    {
      "origin": "string",
      "code": "too_small",
      "minimum": 6,
      "inclusive": true,
      "path": ["password"],
      "message": "Password must be at least 6 characters"
    }
  ]
}`,
  },
  {
    caption: "Asking for an event that doesn't exist.",
    method: "GET",
    path: "/api/events/99999",
    status: { code: 404, text: "Not Found" },
    response: `{ "error": "Event not found" }`,
  },
];

function methodLabel(method: Method): HTMLElement {
  return h("span", { class: `endpoints__method endpoints__method--${method.toLowerCase()}` }, method);
}

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
              methodLabel(route.method),
              h("code", { class: "endpoints__path" }, route.path),
              h(
                "span",
                { class: "endpoints__text" },
                route.text,
                route.auth
                  ? h("span", { class: "endpoints__auth", title: "Needs a sign-in token" }, "JWT")
                  : null,
              ),
            ),
          ),
        ),
      ),
    ),
  );
}

function apiExample(example: Example): HTMLElement {
  const statusKind = example.status.code < 300 ? "ok" : "warn";
  return h(
    "figure",
    { class: "api-example" },
    h("figcaption", { class: "api-example__caption" }, example.caption),
    h(
      "div",
      { class: "api-example__box" },
      h(
        "div",
        { class: "api-example__request" },
        h(
          "p",
          { class: "api-example__line" },
          methodLabel(example.method),
          h("code", { class: "endpoints__path" }, example.path),
        ),
        ...(example.headers ?? []).map((header) =>
          h("pre", { class: "api-example__code api-example__code--muted" }, h("code", {}, header)),
        ),
        example.body ? h("pre", { class: "api-example__code" }, h("code", {}, example.body)) : null,
      ),
      h(
        "div",
        { class: "api-example__response" },
        h(
          "p",
          { class: "api-example__line" },
          h(
            "span",
            { class: `api-example__status api-example__status--${statusKind}` },
            `${example.status.code} ${example.status.text}`,
          ),
        ),
        h("pre", { class: "api-example__code" }, h("code", {}, example.response)),
      ),
    ),
  );
}

export function renderTixApi(): HTMLElement {
  return h(
    "div",
    { class: "page page--project" },
    backLink(),

    projectHero({
      status: { kind: "completed", label: "Completed · Backend" },
      title: "Tix API",
      lead: "The backend for a ticket shop. Find a concert, book your tickets, and change your mind in time. My final project for the backend semester.",
      tags: ["TypeScript", "Node.js", "Express", "PostgreSQL", "JWT", "Zod"],
      liveUrl: REPO_URL,
      liveLabel: "View the code on GitHub",
    }),

    section(
      "About",
      prose(
        "Tix API is a REST API for booking event tickets. You can browse concerts, sports and other events, filter them by city, venue, category or date, create an account, book tickets and cancel bookings.",
        "The fun part was the rules. Tickets can sell out, events can be in the past, and bookings can only be cancelled in time. Each booking and cancellation runs in a database transaction, so the number of tickets left always matches what's actually been booked.",
        "I built it as my final project for the backend semester of the Full Stack Development diploma at NTV Promennt.",
      ),
    ),

    section(
      "Requests in action",
      h("div", { class: "api-examples" }, ...examples.map(apiExample)),
    ),

    section("What it does", featureList(features)),

    section(
      "The endpoints",
      prose("Routes marked JWT need a sign-in token, which you get when you register or log in."),
      endpointTable(),
    ),

    section(
      "How it's built",
      stackList(stack),
      prose(
        "The database has six tables: users, venues, categories, events, tickets and bookings. Every query is parameterized, and the booking and cancelling logic lives in the models.",
      ),
    ),
  );
}
