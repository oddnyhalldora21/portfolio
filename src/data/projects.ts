/**
 * Your projects. Add, remove or edit entries here — the Home page renders
 * them in this order.
 *
 * - `image` is optional. Put image files in /public/images/ and reference
 *   them as "/images/my-project.jpg", or use a full https:// URL.
 * - `link` is optional. If set, the card links to it (opens in a new tab).
 * - `page` is optional. If set, the card links to that page on this site,
 *   e.g. "/projects/sweet-treats". It takes priority over `link`.
 * - `status` is optional. `kind` sets the style ("live", "in-development"
 *   or "school"),
 *   `label` is the text shown on the card.
 */
export interface ProjectStatus {
  kind: "live" | "in-development" | "school";
  label: string;
}

export interface Project {
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  link?: string;
  page?: string;
  tags?: string[];
  status?: ProjectStatus;
}

export const projects: Project[] = [
  {
    title: "Llum Studio",
    status: { kind: "live", label: "Live" },
    description:
      "An e-commerce site for a lighting brand, with product browsing, cart and checkout, designed with an editorial feel.",
    tags: ["React", "TypeScript", "Vite", "Tailwind CSS", "Supabase"],
    link: "https://llum-studio.vercel.app/",
    page: "/projects/llum-studio",
  },
  {
    title: "Sweet Treats",
    status: { kind: "in-development", label: "MVP · In development" },
    description:
      "A baking and dessert recipe app with around 300 recipes. You can save favourites into collections and add your own recipes with photos, notes and bake times.",
    tags: ["Flutter", "Dart", "Riverpod", "Supabase"],
    page: "/projects/sweet-treats",
  },
  {
    title: "Article & Author API",
    status: { kind: "school", label: "School project · Backend final" },
    description:
      "A REST API for articles and their authors, with Zod validation and friendly, consistent error messages. My final project for the backend semester.",
    tags: ["TypeScript", "Node.js", "Express", "Zod"],
    page: "/projects/article-api",
  },
];
