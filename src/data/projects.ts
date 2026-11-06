/**
 * Your projects. Add, remove or edit entries here — the Home page renders
 * them in this order.
 *
 * - `image` is optional. Put image files in /public/images/ and reference
 *   them as "/images/my-project.jpg", or use a full https:// URL.
 * - `link` is optional. If set, the card links to it (opens in a new tab).
 * - `repo` is optional. If set, the card shows a small "GitHub" link to it.
 * - `page` is optional. If set, the card links to that page on this site,
 *   e.g. "/projects/sweet-treats". It takes priority over `link`.
 * - `status` is optional. `kind` sets the style ("live", "in-development"
 *   or "completed"),
 *   `label` is the text shown on the card.
 */
export interface ProjectStatus {
  kind: "live" | "in-development" | "completed";
  label: string;
}

export interface Project {
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  link?: string;
  page?: string;
  repo?: string;
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
    status: { kind: "in-development", label: "In development" },
    description:
      "A recipe app and social platform for home cooks and bakers. Share what you make, discover what others are cooking, and keep your own recipe collection close.",
    tags: ["Flutter", "Dart", "Riverpod", "Supabase"],
    page: "/projects/sweet-treats",
  },
  {
    title: "Article & Author API",
    status: { kind: "completed", label: "Completed · Backend" },
    description:
      "A REST API for articles and authors, with Zod validation and consistent, friendly error responses across every endpoint.",
    repo: "https://github.com/oddnyhalldora21/tix-api",
    tags: ["TypeScript", "Node.js", "Express", "Zod"],
    page: "/projects/article-api",
  },
];
