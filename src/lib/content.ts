// Central, single-source-of-truth content for the site.
// Keeping nav, services, and other repeated content here avoids drift
// between pages that reference the same information.

// One-page site: nav links are in-page anchors, not routes.
export const NAV_LINKS = [
  { href: "#services", label: "Services" },
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
] as const;

export type Service = {
  slug: string;
  index: string;
  name: string;
  shortDescription: string;
  description: string;
  highlights: string[];
};

export const SERVICES: Service[] = [
  {
    slug: "websites",
    index: "01",
    name: "Websites",
    shortDescription:
      "Modern, responsive websites for businesses that want a professional online presence.",
    description:
      "We design and build fast, responsive websites that give your business a credible, professional presence online — from first sketch to a site you can confidently point customers to.",
    highlights: [
      "Custom design, not a generic template",
      "Responsive across mobile, tablet, and desktop",
      "Built for speed and search visibility",
      "Easy to hand off and maintain",
    ],
  },
  {
    slug: "ecommerce",
    index: "02",
    name: "E-commerce",
    shortDescription:
      "Online stores with product catalogs, carts, payments, and order management.",
    description:
      "We build online stores that make it simple to list products, take secure payments, and manage orders — so you can focus on running the business, not fighting the platform.",
    highlights: [
      "Product catalog and inventory setup",
      "Cart, checkout, and secure payments",
      "Order management and fulfillment flow",
      "Built to scale as your catalog grows",
    ],
  },
  {
    slug: "redesign",
    index: "03",
    name: "Website Redesign",
    shortDescription:
      "Transform outdated websites into modern, responsive experiences.",
    description:
      "If your current site feels dated, slow, or hard to use on mobile, we rebuild it into a modern, responsive experience — keeping what works and rethinking what doesn't.",
    highlights: [
      "Audit of current site and content",
      "Modern visual design and layout",
      "Full mobile responsiveness",
      "Improved load speed and usability",
    ],
  },
  {
    slug: "maintenance",
    index: "04",
    name: "Maintenance & Growth",
    shortDescription:
      "Content updates, performance improvements, basic SEO, and ongoing support.",
    description:
      "Once your site is live, we help keep it running well — content updates, performance tuning, basic SEO hygiene, and ongoing support when you need changes made.",
    highlights: [
      "Regular content and copy updates",
      "Performance and speed improvements",
      "Basic on-page SEO upkeep",
      "Ongoing support when issues come up",
    ],
  },
];

export type Project = {
  slug: string;
  name: string;
  category: string;
  serviceSlug: string;
  summary: string;
  year: string;
  /** Live URL, for real (non-placeholder) projects. */
  url?: string;
  /** Screenshot shown on the card, for real (non-placeholder) projects. */
  image?: string;
};

// Placeholder case studies — swap in real client work when available.
export const PROJECTS: Project[] = [
  {
    slug: "gateau-studio",
    name: "Gateau Studio",
    category: "Website",
    serviceSlug: "websites",
    summary:
      "An editorial-style site for a handcrafted-cake bakery — hover-driven product cards, a tasting collection, and an order form built to turn browsers into orders.",
    year: "2026",
    url: "https://cake-jade-nine.vercel.app",
    image: "/images/work/gateau-studio.jpg",
  },
  {
    slug: "adaa",
    name: "ADAA",
    category: "E-commerce",
    serviceSlug: "ecommerce",
    summary:
      "A full storefront for a contemporary Indian women's fashion label — product listing with filters and sort, a detail page with size/color selection, and a working cart and checkout flow.",
    year: "2026",
    url: "https://clothing-ten-psi.vercel.app",
    image: "/images/work/adaa.jpg",
  },
  {
    slug: "northfield-studio",
    name: "Northfield Studio",
    category: "Website",
    serviceSlug: "websites",
    summary:
      "A clean, content-first marketing site for an independent design studio, built to convert visitors into inquiries.",
    year: "2025",
  },
  {
    slug: "loomery-goods",
    name: "Loomery Goods",
    category: "E-commerce",
    serviceSlug: "ecommerce",
    summary:
      "A full online store for a home-goods brand, with a custom catalog, cart, and streamlined checkout.",
    year: "2025",
  },
  {
    slug: "harborline-legal",
    name: "Harborline Legal",
    category: "Redesign",
    serviceSlug: "redesign",
    summary:
      "A ground-up redesign of a decade-old law firm site, rebuilt to be fast, responsive, and easy to update.",
    year: "2024",
  },
  {
    slug: "pinegrove-cafe",
    name: "Pinegrove Café",
    category: "Website",
    serviceSlug: "websites",
    summary:
      "A warm, menu-forward site for a neighborhood café, with online ordering links and event updates.",
    year: "2024",
  },
  {
    slug: "atlas-supply-co",
    name: "Atlas Supply Co.",
    category: "E-commerce",
    serviceSlug: "ecommerce",
    summary:
      "A B2B storefront with tiered pricing, bulk ordering, and order-management tooling for a supply distributor.",
    year: "2024",
  },
  {
    slug: "verity-health",
    name: "Verity Health Partners",
    category: "Maintenance & Growth",
    serviceSlug: "maintenance",
    summary:
      "Ongoing performance tuning, content updates, and SEO upkeep for a growing healthcare practice's site.",
    year: "2024",
  },
];

export const PROCESS_STEPS = [
  {
    index: "01",
    title: "Discover",
    description:
      "We start by understanding your business, your audience, and what the site needs to accomplish — no assumptions, no filler questions.",
  },
  {
    index: "02",
    title: "Design",
    description:
      "We design the look and structure of your site around your goals, sharing early concepts so direction is agreed on before we build.",
  },
  {
    index: "03",
    title: "Build",
    description:
      "We build the site to be fast, responsive, and accessible — writing clean, maintainable code from the start.",
  },
  {
    index: "04",
    title: "Launch",
    description:
      "We test across devices, fix edge cases, and launch — with a walkthrough so you know how to manage your new site.",
  },
  {
    index: "05",
    title: "Support",
    description:
      "After launch, we're available for updates, improvements, and the occasional 'can we change this' request.",
  },
] as const;

export const FAQS = [
  {
    question: "What kind of websites does BinaryBuilds build?",
    answer:
      "We build modern, responsive websites for small and growing businesses, including business websites, landing pages, online stores, portfolio websites, and custom web solutions. We tailor each website to the business's goals, audience, and requirements.",
  },
  {
    question: "How much does a website cost?",
    answer:
      "The cost depends on the type of website, number of pages, features, and level of customization required. We offer affordable solutions for small businesses, with simple websites starting from ₹X,XXX and larger or more feature-rich projects priced according to their requirements.",
  },
  {
    question: "How long does it take to build a website?",
    answer:
      "A simple business website can usually be completed within 7–14 days, while larger websites and e-commerce projects may take longer depending on their features and requirements. We'll discuss the estimated timeline before starting the project so you know what to expect.",
  },
  {
    question: "Will my website work on mobile phones?",
    answer:
      "Yes. Every website we build is designed to be responsive, meaning it adapts to different screen sizes including smartphones, tablets, laptops, and desktops. Since many customers browse businesses from their phones, we give particular attention to the mobile experience.",
  },
  {
    question: "Will I be able to update my website myself?",
    answer:
      "Yes, if your project includes a CMS or admin dashboard. For example, if you have an online store, we can provide a system that allows you to add, edit, or remove products, update prices, manage images, and make other content changes without needing to contact a developer every time. For simpler websites, we can also provide ongoing maintenance and update services.",
  },
  {
    question: "Do I need to buy a domain and hosting?",
    answer:
      "You'll need a domain (yourbusiness.com, for example) and hosting for most websites. Don't worry if you're unfamiliar with these — we can help you choose the appropriate setup, connect your domain, and deploy your website. The domain and hosting costs are generally separate from the website development fee.",
  },
  {
    question: "Can you redesign my existing website?",
    answer:
      "Absolutely. If your current website looks outdated, isn't mobile-friendly, loads slowly, or no longer represents your business, we can redesign it with a more modern interface, better structure, improved responsiveness, and a stronger user experience.",
  },
  {
    question: "Do you provide website maintenance after launch?",
    answer:
      "Yes. We can provide ongoing support for things such as content updates, product changes, bug fixes, performance improvements, and adding new features. You can choose ongoing support if you don't want to manage the technical side of your website yourself.",
  },
] as const;
