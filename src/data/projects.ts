/**
 * Your projects. Add, remove or edit entries here — the Home page renders
 * them in this order.
 *
 * - `image` is optional. Put image files in /public/images/ and reference
 *   them as "/images/my-project.jpg", or use a full https:// URL.
 * - `link` is optional. If set, the card links to it.
 */
export interface Project {
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  link?: string;
  tags?: string[];
}

export const projects: Project[] = [
  {
    // PLACEHOLDER — replace with a real project
    title: "Placeholder project one",
    description:
      "A short description of what this project is, what you did and why it matters. One or two sentences is plenty.",
    tags: ["Design", "Research"],
    link: "https://example.com",
  },
  {
    // PLACEHOLDER — replace with a real project
    title: "Placeholder project two",
    description:
      "Another example. This one has no link, so the card is not clickable — that's fine too.",
    tags: ["Writing"],
  },
  {
    // PLACEHOLDER — replace with a real project
    title: "Placeholder project three",
    description:
      "An example with an image. Drop a file in /public/images/ and point `image` at it.",
    image: "/images/placeholder.svg",
    imageAlt: "Abstract placeholder illustration",
    tags: ["Development"],
    link: "https://example.com",
  },
];
