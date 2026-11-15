// Edit this file to manage your catalog.
// s = stock quantity (0 = sold out, 1-5 = "Only N left"), o = old price (optional), h = card colour hue.
const SHOP = { whatsapp: "8801722874106", currency: "৳" }; // replace with your WhatsApp number (country code, no +)
const CATEGORIES = ["Electronics", "Fashion", "Home & Living", "Beauty", "Books & Stationery"];
const PRODUCTS = [
  { id: 1, n: "Wireless Earbuds Pro", c: "Electronics", p: 2890, o: 3500, s: 24, e: "🎧", h: 205 },
  { id: 2, n: "Smart Watch Active", c: "Electronics", p: 4950, o: 5900, s: 3, e: "⌚", h: 265 },
  { id: 3, n: "Power Bank 20000mAh", c: "Electronics", p: 1890, s: 0, e: "🔋", h: 150 },
  { id: 4, n: "Bluetooth Speaker", c: "Electronics", p: 2250, o: 2700, s: 12, e: "🔊", h: 15 },
  { id: 5, n: "Classic Denim Jacket", c: "Fashion", p: 2490, s: 8, e: "🧥", h: 215 },
  { id: 6, n: "Cotton Panjabi", c: "Fashion", p: 1650, o: 1950, s: 2, e: "👘", h: 40 },
  { id: 7, n: "Leather Wallet", c: "Fashion", p: 790, s: 40, e: "👛", h: 25 },
  { id: 8, n: "Running Sneakers", c: "Fashion", p: 3290, o: 3990, s: 0, e: "👟", h: 345 },
  { id: 9, n: "Ceramic Mug Set (4)", c: "Home & Living", p: 690, s: 30, e: "☕", h: 30 },
  { id: 10, n: "LED Desk Lamp", c: "Home & Living", p: 1290, o: 1490, s: 5, e: "💡", h: 50 },
  { id: 11, n: "Cotton Bedsheet Set", c: "Home & Living", p: 1890, s: 15, e: "🛏️", h: 180 },
  { id: 12, n: "Aroma Candle", c: "Home & Living", p: 450, s: 1, e: "🕯️", h: 320 },
  { id: 13, n: "Vitamin C Serum", c: "Beauty", p: 1150, o: 1400, s: 18, e: "🧴", h: 35 },
  { id: 14, n: "Herbal Face Wash", c: "Beauty", p: 350, s: 60, e: "🧼", h: 140 },
  { id: 15, n: "Argan Hair Oil", c: "Beauty", p: 480, s: 0, e: "💆", h: 280 },
  { id: 16, n: "Hardcover Notebook Set", c: "Books & Stationery", p: 320, s: 50, e: "📓", h: 190 },
  { id: 17, n: "Bestseller Novel Pack (3)", c: "Books & Stationery", p: 1200, o: 1500, s: 4, e: "📚", h: 10 },
  { id: 18, n: "Gel Pen Collection", c: "Books & Stationery", p: 220, s: 80, e: "🖊️", h: 240 }
];
