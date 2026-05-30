// Static product catalogue — used directly by the frontend so the site works
// on any static host (Netlify, GitHub Pages, Vercel) without a backend.

export const PRODUCTS = [
  {
    id: "edible-salt",
    sku: "QS-ED-001",
    name: "Edible Pink Salt",
    category: "Food Grade",
    description:
      "Premium 100% natural Himalayan pink salt sourced from the Khewra mine. Untreated, unrefined, rich in trace minerals.",
    grades: ["Food Grade A", "Food Grade B", "Industrial"],
    granulation: [
      "Powder (0.3-0.5mm)",
      "Fine (0.5-1mm)",
      "Coarse (1-3mm)",
      "Granular (2-5mm)",
      "Crystals (5-25mm)",
    ],
    packaging: ["25kg PP bags", "50kg PP bags", "1 MT jumbo bags", "Custom retail"],
    moq: "20 MT (1x20ft container)",
    image:
      "https://images.pexels.com/photos/7779878/pexels-photo-7779878.jpeg?auto=compress&cs=tinysrgb&w=900&h=675&fit=crop",
  },
  {
    id: "salt-lamps",
    sku: "QS-LP-002",
    name: "Pink Salt Lamps",
    category: "Wellness",
    description:
      "Hand-carved Himalayan salt lamps in natural and crafted shapes. Includes electrical fittings and bulbs.",
    grades: ["Natural Shape", "Crafted (Pyramid, Sphere, Cube)", "USB Mini"],
    granulation: ["1-2 kg", "2-3 kg", "3-5 kg", "5-7 kg", "7-10 kg", "10-15 kg"],
    packaging: ["Single retail box", "Bulk carton", "Pallet"],
    moq: "500 pcs",
    image:
      "https://images.pexels.com/photos/6634303/pexels-photo-6634303.jpeg?auto=compress&cs=tinysrgb&w=900&h=675&fit=crop",
  },
  {
    id: "bath-salt",
    sku: "QS-BT-003",
    name: "Bath & Spa Salt",
    category: "Wellness",
    description:
      "Therapeutic grade pink salt for bath, spa and aromatherapy. Available in fine to coarse with optional essential oils.",
    grades: ["Spa A", "Bath B", "Foot Soak"],
    granulation: ["Fine (0.5-1mm)", "Medium (1-3mm)", "Coarse (2-5mm)"],
    packaging: ["1kg pouches", "5kg buckets", "25kg bags", "Bulk"],
    moq: "5 MT",
    image:
      "https://images.pexels.com/photos/6690148/pexels-photo-6690148.jpeg?auto=compress&cs=tinysrgb&w=900&h=675&fit=crop",
  },
  {
    id: "salt-bricks",
    sku: "QS-BR-004",
    name: "Salt Bricks & Tiles",
    category: "Construction",
    description:
      "Architectural pink salt bricks and tiles for salt rooms, halotherapy chambers and decorative walls.",
    grades: ["Standard", "Premium A", "Polished"],
    granulation: ["8x4x2 inch", "8x4x1 inch", "12x6x2 inch", "Custom cuts"],
    packaging: ["Wooden pallet", "Carton + foam"],
    moq: "2,000 pcs",
    image:
      "https://images.pexels.com/photos/10636881/pexels-photo-10636881.jpeg?auto=compress&cs=tinysrgb&w=900&h=675&fit=crop",
  },
  {
    id: "animal-licks",
    sku: "QS-AL-005",
    name: "Animal Salt Licks",
    category: "Agriculture",
    description:
      "Mineral-rich salt licks for cattle, horses, sheep and wildlife. Natural shapes or pressed blocks.",
    grades: ["Natural", "Pressed"],
    granulation: ["2-4 kg", "4-7 kg", "Custom"],
    packaging: ["Loose in bags", "Individual carton"],
    moq: "20 MT",
    image:
      "https://images.pexels.com/photos/5507586/pexels-photo-5507586.jpeg?auto=compress&cs=tinysrgb&w=900&h=675&fit=crop",
  },
  {
    id: "gourmet-grinder",
    sku: "QS-GR-006",
    name: "Gourmet Grinder Salt",
    category: "Food Grade",
    description:
      "Premium crystal grade for retail grinders. Uniform 2-5mm crystals, extra clean.",
    grades: ["Premium A", "Standard"],
    granulation: ["2-5mm crystals"],
    packaging: ["Bulk 25kg", "Private label retail"],
    moq: "10 MT",
    image:
      "https://images.pexels.com/photos/12174085/pexels-photo-12174085.jpeg?auto=compress&cs=tinysrgb&w=900&h=675&fit=crop",
  },
];

export const getProductById = (id) => PRODUCTS.find((p) => p.id === id);
