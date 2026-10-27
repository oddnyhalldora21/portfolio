import { h } from "../lib/dom";
import {
  backLink,
  featureList,
  mediaBlock,
  projectHero,
  prose,
  section,
  shotGrid,
  stackList,
  type Media,
} from "./project-parts";

const LIVE_URL = "https://llum-studio.vercel.app/";

/**
 * Screenshots: put the files in /public/images/llum-studio/ and set `src`
 * below, e.g. "/images/llum-studio/homepage.png".
 */
const homepage: Media = { label: "Homepage", alt: "The Llum Studio homepage" };

const lightsToggle: Media[] = [
  { label: "Lights off", alt: "The shop with the lights switched off" },
  { label: "Lights on", alt: "The shop with the lights switched on" },
];

const screenshots: Media[] = [
  { label: "Product page", alt: "A Llum Studio product page" },
  { label: "Cart drawer", alt: "The cart drawer open over the shop" },
];

const features: { title: string; text: string }[] = [
  {
    title: "Browse the collection",
    text: "27 lamps across 7 collections and 6 categories, from chandeliers and pendants to sconces and floor lamps. Search from the navbar, or filter by category or collection.",
  },
  {
    title: "Lights on, lights off",
    text: "A little switch that shows every product with the lights on or off, so you can see each lamp both as an object and as a glow.",
  },
  {
    title: "Your account",
    text: "Sign up and sign in with a stored profile. Your name shows up in the navbar and fills itself in at checkout.",
  },
  {
    title: "Cart & checkout",
    text: "Add, update and remove items from a cart drawer you can open on any page. Checkout creates a real order and shows a real order number at the end (no real money, though).",
  },
  {
    title: "Every screen size",
    text: "Fully responsive, so it feels just as calm on a phone as on a big desktop screen.",
  },
];

const stack: { name: string; text: string }[] = [
  { name: "React 19 + TypeScript", text: "The app itself, with React Router for the pages" },
  { name: "Vite", text: "Dev server and build" },
  { name: "Tailwind CSS + shadcn/ui", text: "Styling and UI components" },
  { name: "Zustand", text: "Cart and sign-in state" },
  { name: "React Query", text: "Loading products and creating orders" },
  { name: "Supabase", text: "Postgres database and authentication" },
  { name: "Vitest", text: "Tests" },
];

export function renderLlumStudio(): HTMLElement {
  return h(
    "div",
    { class: "page page--project" },
    backLink(),

    projectHero({
      status: { kind: "live", label: "Live" },
      title: "Llum Studio",
      lead: "A calm, editorial online shop for handmade lighting. Take your time, browse beautiful lamps, and flick the lights on to see them glow.",
      tags: ["React", "TypeScript", "Vite", "Tailwind CSS", "Supabase"],
      liveUrl: LIVE_URL,
    }),

    h("div", { class: "project-feature-shot" }, mediaBlock(homepage, "image", "wide", { showLabel: true })),

    section(
      "About",
      prose(
        "Llum Studio is a fictional high-end lighting store I designed and built with React, TypeScript and Supabase, inspired by In Common With. You can browse the collection, search and filter, sign in, fill up a cart and check out.",
        "The idea was simple: shopping should feel calm and unhurried. Smooth transitions between images, sections and pages echo the tactile, handmade feel of the lamps, and every interaction is meant to feel human and easy, so the focus stays where it belongs: on the light.",
      ),
    ),

    section(
      "Lights off, lights on",
      prose(
        "My favourite detail. One switch changes the whole shop, so you can see how each lamp looks switched off in a room, and how it glows when it's on.",
      ),
      shotGrid(lightsToggle, "wide", "Lights off and lights on"),
    ),

    shotGrid(screenshots, "wide"),

    section("What it does", featureList(features)),

    section(
      "How it's built",
      stackList(stack),
      prose(
        "The database has tables for products, profiles, orders and order items, all protected with row-level security. Orders are linked to your account when you're signed in, and saved as guest orders when you're not.",
      ),
    ),

    section(
      "Tested, too",
      prose(
        "25 tests across three files keep the important bits honest: 9 for the cart logic, 11 for checkout form validation and 5 for creating orders, including what happens when something goes wrong.",
      ),
    ),
  );
}
