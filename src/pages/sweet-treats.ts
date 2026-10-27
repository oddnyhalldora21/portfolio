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

/**
 * Photos and video: put the files in /public/images/sweet-treats/ and set
 * `src` below, e.g. "/images/sweet-treats/home.png" or ".../demo.mp4".
 */
const demoVideo: Media = { label: "Demo video", alt: "Sweet Treats app demo" };

const screenshots: Media[] = [
  { label: "Home", alt: "Sweet Treats home screen" },
  { label: "Recipe page", alt: "A recipe page in Sweet Treats" },
  { label: "Saved", alt: "Saved recipes and collections" },
  { label: "Profile", alt: "A profile page in Sweet Treats" },
];

const features: { title: string; text: string }[] = [
  {
    title: "Find something to bake",
    text: "Tap “Surprise me” when you can't decide, browse categories (seasonal ones like Halloween too), or search, with your recent searches saved. The All Recipes grid loads 30 at a time, so everything stays quick.",
  },
  {
    title: "Recipe pages",
    text: "Every recipe has a photo, difficulty, prep and bake time, oven temperature and servings, even ranges like “Bake 20–25 min”. Plus ingredients, numbered steps and notes for tips, swaps and storage.",
  },
  {
    title: "Save & organise",
    text: "Keep favourites in All Saved or sort them into your own collections. Rename, move and remove, with a friendly check before anything gets deleted.",
  },
  {
    title: "Your own recipes",
    text: "Add your own creations with a photo, notes and bake times, and keep them private or share them. The form is made for phones, with a Next/Done bar above the keyboard and a no-bake toggle.",
  },
  {
    title: "Profile",
    text: "Your avatar, name, bio and username, with little stats for your favourites and recipes.",
  },
];

const stack: { name: string; text: string }[] = [
  { name: "Flutter (Dart)", text: "Built and tested on iOS" },
  { name: "Riverpod", text: "State for the recipe catalogue, your recipes, profile and saved recipes" },
  { name: "Supabase", text: "Postgres, Auth and Storage" },
  { name: "Row Level Security", text: "Everyone can only change their own recipes and collections" },
];

const roadmap = [
  "Follow other bakers, and see what they've added recently",
  "Multiple photos per recipe, for the method steps",
  "Comments on recipes",
  "A social-style feed",
  "Chill and freeze times",
];

export function renderSweetTreats(): HTMLElement {
  return h(
    "div",
    { class: "page page--project" },
    backLink(),

    projectHero({
      status: { kind: "in-development", label: "MVP · In development" },
      title: "Sweet Treats",
      lead: "A cosy little recipe box for bakers. Around 300 cakes, cookies and desserts in your pocket, with room for your own.",
      tags: ["Flutter", "Dart", "Riverpod", "Supabase"],
    }),

    h("div", { class: "project-video" }, mediaBlock(demoVideo, "video", "phone", { showLabel: true })),

    section(
      "About",
      prose(
        "Sweet Treats is a baking and dessert recipe app I built with Flutter and Supabase. It's a place to find something sweet to bake, keep the recipes you love, and write down your own, with photos, notes and bake times so you never forget the little tip that made it perfect.",
        "Under the frosting it's a real full-stack project: state management with Riverpod, a Postgres backend with sign-in and photo storage, and security rules so everyone's recipes stay their own.",
      ),
    ),

    shotGrid(screenshots, "phone"),

    section("What it does", featureList(features)),

    section(
      "How it's built",
      stackList(stack),
      prose(
        "Lists are built lazily and images are decoded at card size, which smoothed out stutter on the category pages. And deleting a collection never deletes the recipes inside. They stay safe in All Saved.",
      ),
    ),

    section(
      "A bug I'm proud of squashing",
      prose(
        "A swipe-back glitch only showed up on a real iPhone, never in the simulator or on the web. So I screen-recorded the phone and went through the video frame by frame with ffmpeg.",
        "It turned out swipe-back was asking “can I go back?” instead of “am I the first page?”, and the answer changed mid-swipe. The fix? One line.",
      ),
    ),

    section(
      "Still in the oven",
      h("ul", { class: "roadmap-list" }, ...roadmap.map((item) => h("li", {}, item))),
    ),
  );
}
