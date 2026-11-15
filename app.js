const $ = (id) => document.getElementById(id);
const money = (n) => SHOP.currency + n.toLocaleString("en-IN");
let cat = "All", cart = {};
try { cart = JSON.parse(localStorage.getItem("hj-cart")) || {}; } catch (e) {}
const save = () => { try { localStorage.setItem("hj-cart", JSON.stringify(cart)); } catch (e) {} };
const status = (s) => s === 0 ? { t: "Sold out", k: "out" } : s <= 5 ? { t: "Only " + s + " left", k: "low" } : { t: "In stock", k: "in" };

function renderCats() {
  $("cats").innerHTML = ["All", ...CATEGORIES].map((c) =>
    `<button class="${c === cat ? "on" : ""}" data-c="${c}">${c}</button>`).join("");
}

function renderGrid() {
  const q = $("q").value.trim().toLowerCase(), sort = $("sort").value;
  let list = PRODUCTS.filter((p) => (cat === "All" || p.c === cat) && (p.n + p.c).toLowerCase().includes(q));
  if (sort === "lh") list.sort((a, b) => a.p - b.p);
  if (sort === "hl") list.sort((a, b) => b.p - a.p);
  if (sort === "av") list.sort((a, b) => (b.s > 0) - (a.s > 0));
  $("title").textContent = (cat === "All" ? "All products" : cat) + " (" + list.length + ")";
  $("grid").innerHTML = list.length ? list.map((p) => {
    const st = status(p.s), off = p.o ? Math.round((1 - p.p / p.o) * 100) : 0;
    return `<article class="card ${st.k}">
      <div class="img" style="--h:${p.h}"><span>${p.e}</span>${off ? `<i class="off">-${off}%</i>` : ""}</div>
      <div class="info"><small>${p.c}</small><h3>${p.n}</h3>
      <div class="price"><b>${money(p.p)}</b>${p.o ? `<s>${money(p.o)}</s>` : ""}</div>
      <div class="foot"><span class="tag ${st.k}">${st.t}</span>
      <button class="add" data-id="${p.id}" ${p.s === 0 ? "disabled" : ""}>${p.s === 0 ? "Unavailable" : "Add to cart"}</button></div></div></article>`;
  }).join("") : `<p class="empty">No products match your search. Try another keyword or category.</p>`;
}

function renderCart() {
  const ids = Object.keys(cart), items = ids.map((id) => ({ p: PRODUCTS.find((x) => x.id == id), q: cart[id] }));
  const total = items.reduce((s, i) => s + i.p.p * i.q, 0);
  $("count").textContent = items.reduce((s, i) => s + i.q, 0);
  $("total").textContent = money(total);
  $("checkout").disabled = !items.length;
  $("items").innerHTML = items.length ? items.map(({ p, q }) => `<div class="row">
    <div class="thumb" style="--h:${p.h}">${p.e}</div>
    <div class="meta"><b>${p.n}</b><span>${money(p.p)}</span>
    <div class="qty"><button data-m="${p.id}" aria-label="Decrease">−</button><em>${q}</em><button data-p="${p.id}" aria-label="Increase">+</button></div></div>
    <button class="rm" data-r="${p.id}" aria-label="Remove">✕</button></div>`).join("")
    : `<p class="empty">Your cart is empty. Add something you like.</p>`;
  save();
}

const toggle = (open) => { $("drawer").classList.toggle("open", open); $("shade").classList.toggle("open", open); };

document.addEventListener("click", (e) => {
  const t = e.target.closest("button"); if (!t) return;
  const d = t.dataset;
  if (d.c) { cat = d.c; renderCats(); renderGrid(); }
  if (d.id) { const p = PRODUCTS.find((x) => x.id == d.id); if ((cart[p.id] || 0) < p.s) cart[p.id] = (cart[p.id] || 0) + 1; renderCart(); toggle(true); }
  if (d.p) { const p = PRODUCTS.find((x) => x.id == d.p); if (cart[p.id] < p.s) cart[p.id]++; renderCart(); }
  if (d.m) { if (--cart[d.m] <= 0) delete cart[d.m]; renderCart(); }
  if (d.r) { delete cart[d.r]; renderCart(); }
});
$("openCart").onclick = () => toggle(true);
$("closeCart").onclick = $("shade").onclick = () => toggle(false);
document.addEventListener("keydown", (e) => e.key === "Escape" && toggle(false));
$("q").oninput = $("sort").onchange = renderGrid;
$("checkout").onclick = () => {
  const lines = Object.keys(cart).map((id) => { const p = PRODUCTS.find((x) => x.id == id); return `• ${p.n} x${cart[id]} = ${money(p.p * cart[id])}`; });
  const msg = "Hi Habijabi, I want to order:\n" + lines.join("\n") + "\nTotal: " + $("total").textContent;
  window.open("https://wa.me/" + SHOP.whatsapp + "?text=" + encodeURIComponent(msg), "_blank");
};
$("yr").textContent = new Date().getFullYear();
// drop cart items that no longer exist or exceed stock
Object.keys(cart).forEach((id) => { const p = PRODUCTS.find((x) => x.id == id); if (!p || p.s === 0) delete cart[id]; else cart[id] = Math.min(cart[id], p.s); });
renderCats(); renderGrid(); renderCart();
