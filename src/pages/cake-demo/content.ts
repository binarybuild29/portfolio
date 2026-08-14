// Content for the Gateau Studio bakery demo — a self-contained portfolio
// sample page under /portfolio/cake-demo. Kept local to this route since
// none of it is shared with the main BinaryBuilds site.

function unsplash(id: string, w = 1200) {
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;
}

export const NAV_LINKS = [
  { href: "#menu", label: "Menu" },
  { href: "#tastings", label: "Tastings" },
  { href: "#about", label: "Our Story" },
  { href: "#gallery", label: "Gallery" },
  { href: "#contact", label: "Contact" },
] as const;

export type Rating = {
  richness: number; // 0-5
  sweetness: number;
  texture: number;
  crunch: number;
};

export const RATING_LABELS: Record<keyof Rating, string> = {
  richness: "Richness & Intensity",
  sweetness: "Sweetness Level",
  texture: "Moisture & Texture",
  crunch: "Nut & Crunch Density",
};

export type Cake = {
  id: string;
  name: string;
  description: string;
  story: string;
  price: string;
  size: string;
  flavors: string[];
  rating: Rating;
  image: string;
  gallery: string[];
  badge?: string;
  featured?: boolean;
};

export const CAKES: Cake[] = [
  {
    id: "luce-di-fragola",
    name: "Luce di Fragola",
    description: "Strawberry mascarpone sponge with a whisper of almond.",
    story:
      "Built around ripe strawberry compote and whipped mascarpone, finished with toasted almond flakes. Our signature spring release, made in small batches with fruit sourced weekly. Layered with Madagascar vanilla glaze for a finish that reads far more restrained than it tastes.",
    price: "₹1,850",
    size: "1.5 kg · Serves 10–12",
    flavors: ["Strawberry", "Mascarpone", "Almond"],
    rating: { richness: 3, sweetness: 4, texture: 5, crunch: 2 },
    image: unsplash("photo-1464349095431-e9a21285b5f3"),
    gallery: [
      unsplash("photo-1464349095431-e9a21285b5f3", 900),
      unsplash("photo-1587668178277-295251f900ce", 900),
      unsplash("photo-1519869325930-281384150729", 900),
    ],
    badge: "Baker's Weekly Pick",
    featured: true,
  },
  {
    id: "noir-truffle",
    name: "Noir Truffle Cake",
    description: "Valrhona dark chocolate sponge, silky truffle ganache.",
    story:
      "Layered with 70% Valrhona cocoa sponge and a hand-whisked truffle ganache, this is our richest chocolate offering — deep, glossy, and unapologetically decadent. Belgian dark chocolate shavings finish every slice.",
    price: "₹2,100",
    size: "1.5 kg · Serves 10–12",
    flavors: ["Dark Chocolate", "Truffle", "Cocoa Nib"],
    rating: { richness: 5, sweetness: 3, texture: 4, crunch: 2 },
    image: unsplash("photo-1606313564200-e75d5e30476c"),
    gallery: [
      unsplash("photo-1606313564200-e75d5e30476c", 900),
      unsplash("photo-1578985545062-69928b1d9587", 900),
      unsplash("photo-1607478900766-efe13248b125", 900),
    ],
    badge: "Signature Collection",
  },
  {
    id: "velvet-rouge",
    name: "Velvet Rouge",
    description: "Classic red velvet with a tangy cream cheese finish.",
    story:
      "A slow-fermented buttermilk sponge, tinted with natural beet extract, layered with a lightly tangy cream cheese frosting — a house favorite for over a decade, requested at nearly every wedding tasting we run.",
    price: "₹1,950",
    size: "1.5 kg · Serves 10–12",
    flavors: ["Red Velvet", "Cream Cheese", "Vanilla"],
    rating: { richness: 4, sweetness: 4, texture: 4, crunch: 1 },
    image: unsplash("photo-1586985289906-406988974504"),
    gallery: [
      unsplash("photo-1586985289906-406988974504", 900),
      unsplash("photo-1550617931-e17a7b70dce2", 900),
      unsplash("photo-1562777717-dc6984f65a63", 900),
    ],
    badge: "Baker's Choice",
  },
  {
    id: "vanille-blanc",
    name: "Vanille Blanc",
    description: "Madagascar vanilla bean sponge, light buttercream.",
    story:
      "Whole Madagascar vanilla pods folded into a delicate sponge, finished with a barely-sweet Swiss buttercream — our most requested wedding tier, chosen for its restraint next to bolder groom's-cake flavors.",
    price: "₹1,700",
    size: "1.5 kg · Serves 10–12",
    flavors: ["Vanilla Bean", "Buttercream"],
    rating: { richness: 2, sweetness: 3, texture: 5, crunch: 1 },
    image: unsplash("photo-1533134242443-d4fd215305ad"),
    gallery: [
      unsplash("photo-1533134242443-d4fd215305ad", 900),
      unsplash("photo-1486427944299-d1955d23e34d", 900),
      unsplash("photo-1571115177098-24ec42ed204d", 900),
    ],
  },
  {
    id: "foret-noire",
    name: "Forêt Noire",
    description: "Dark chocolate, whipped cream, and black cherries.",
    story:
      "Our take on the Black Forest classic — kirsch-soaked chocolate sponge, clouds of whipped cream, and macerated black cherries between every layer. Shaved chocolate curls and whole cherries finish the top.",
    price: "₹2,050",
    size: "1.5 kg · Serves 10–12",
    flavors: ["Chocolate", "Cherry", "Kirsch"],
    rating: { richness: 4, sweetness: 3, texture: 4, crunch: 2 },
    image: unsplash("photo-1571115177098-24ec42ed204d"),
    gallery: [
      unsplash("photo-1571115177098-24ec42ed204d", 900),
      unsplash("photo-1606313564200-e75d5e30476c", 900),
      unsplash("photo-1524351199678-941a58a3df50", 900),
    ],
  },
  {
    id: "caramel-noisette",
    name: "Caramel Noisette",
    description: "Butterscotch sponge with hazelnut praline crunch.",
    story:
      "Caramelized butterscotch layers folded with a crushed hazelnut praline for a deep, nutty crunch in every bite — finished with a caramel drizzle and toasted whole hazelnuts along the base.",
    price: "₹1,900",
    size: "1.5 kg · Serves 10–12",
    flavors: ["Butterscotch", "Hazelnut", "Praline"],
    rating: { richness: 4, sweetness: 4, texture: 3, crunch: 5 },
    image: unsplash("photo-1621303837174-89787a7d4729"),
    gallery: [
      unsplash("photo-1621303837174-89787a7d4729", 900),
      unsplash("photo-1587668178277-295251f900ce", 900),
      unsplash("photo-1550617931-e17a7b70dce2", 900),
    ],
  },
  {
    id: "arc-en-ciel",
    name: "Arc-en-Ciel",
    description: "Six vibrant sponge layers, smooth vanilla frosting.",
    story:
      "A celebration cake built from six naturally tinted sponge layers, stacked tall and wrapped in a smooth vanilla buttercream — a favorite for milestone birthdays and anyone who wants the reveal-slice moment.",
    price: "₹2,200",
    size: "1.5 kg · Serves 12–14",
    flavors: ["Vanilla", "Rainbow Layers"],
    rating: { richness: 3, sweetness: 4, texture: 4, crunch: 1 },
    image: unsplash("photo-1558301211-0d8c8ddee6ec"),
    gallery: [
      unsplash("photo-1558301211-0d8c8ddee6ec", 900),
      unsplash("photo-1519869325930-281384150729", 900),
      unsplash("photo-1524351199678-941a58a3df50", 900),
    ],
  },
  {
    id: "new-york-classique",
    name: "New York Classique",
    description: "Baked cheesecake on a buttery biscuit crust.",
    story:
      "Slow-baked in a water bath for a dense, silky crumb, set on a hand-pressed biscuit crust — served with a citrus-bright compote on the side to cut through the richness.",
    price: "₹2,400",
    size: "1.3 kg · Serves 10–12",
    flavors: ["Cheesecake", "Biscuit Crust", "Citrus"],
    rating: { richness: 5, sweetness: 2, texture: 5, crunch: 3 },
    image: unsplash("photo-1524351199678-941a58a3df50"),
    gallery: [
      unsplash("photo-1524351199678-941a58a3df50", 900),
      unsplash("photo-1562777717-dc6984f65a63", 900),
      unsplash("photo-1607478900766-efe13248b125", 900),
    ],
  },
  {
    id: "petits-fours",
    name: "Petits Fours Box",
    description: "Six hand-finished mini cupcakes, assorted flavors.",
    story:
      "A curated box of our smallest-format bakes — six mini cupcakes across our most-loved flavors, piped and finished by hand for gifting or a small gathering that doesn't need a whole cake.",
    price: "₹1,200",
    size: "Box of 6",
    flavors: ["Assorted", "Mini Format"],
    rating: { richness: 3, sweetness: 4, texture: 4, crunch: 2 },
    image: unsplash("photo-1519869325930-281384150729"),
    gallery: [
      unsplash("photo-1519869325930-281384150729", 900),
      unsplash("photo-1587668178277-295251f900ce", 900),
      unsplash("photo-1550617931-e17a7b70dce2", 900),
    ],
  },
];

export const FEATURED_CAKE = CAKES.find((c) => c.featured) ?? CAKES[0];

export const ABOUT_IMAGE = unsplash("photo-1509440159596-0249088772ff", 1000);
export const HERO_IMAGE = unsplash("photo-1621303837174-89787a7d4729", 1400);

export const GALLERY_IMAGES = [
  unsplash("photo-1578985545062-69928b1d9587", 900),
  unsplash("photo-1607478900766-efe13248b125", 900),
  unsplash("photo-1562777717-dc6984f65a63", 900),
  unsplash("photo-1486427944299-d1955d23e34d", 900),
  unsplash("photo-1519869325930-281384150729", 900),
  unsplash("photo-1550617931-e17a7b70dce2", 900),
  unsplash("photo-1571115177098-24ec42ed204d", 900),
  unsplash("photo-1524351199678-941a58a3df50", 900),
];

export const TESTIMONIALS = [
  {
    name: "Ananya Kapoor",
    role: "Wedding client, Bengaluru",
    quote:
      "The wedding cake was even more beautiful in person than the design we discussed — and it tasted incredible too.",
  },
  {
    name: "Rohit Malhotra",
    role: "Birthday client, Bengaluru",
    quote:
      "Ordered a last-minute birthday cake and it turned out flawless. Gateau Studio is now our go-to bakery.",
  },
  {
    name: "Meera Iyer",
    role: "Corporate events, Bengaluru",
    quote:
      "Fresh ingredients you can actually taste. The Noir Truffle disappeared within minutes at our party.",
  },
];

export const CONTACT_INFO = {
  phone: "+91 98765 43210",
  email: "hello@gateaustudio.example",
  address: "12 Baker Street, Indiranagar, Bengaluru, KA 560038",
  hours: "Tue – Sun: 9:00 AM – 8:00 PM (Closed Mondays)",
};
