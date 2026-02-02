// Tabs + Panels
const tabs = document.querySelectorAll(".tab, .hero2__cta .btn");
const sellerPanel = document.getElementById("panel-seller");
const buyerPanel = document.getElementById("panel-buyer");

function activate(which) {
  // Tabs (top)
  document.querySelectorAll(".tab").forEach(t => {
    t.classList.toggle("active", t.dataset.tab === which);
  });

  // Panels
  sellerPanel.classList.toggle("active", which === "seller");
  buyerPanel.classList.toggle("active", which === "buyer");
}

// Click handling
tabs.forEach(btn => {
  btn.addEventListener("click", () => {
    const which = btn.dataset.tab;
    if (!which) return;
    activate(which);
    document.getElementById("forms")?.scrollIntoView({ behavior: "smooth" });
  });
});

// Default view
activate("seller");

// Year in footer
const y = document.getElementById("year");
if (y) y.textContent = new Date().getFullYear();

/* OPTIONAL: FormData -> object helper (keeps checkbox arrays) */
function formToObject(form) {
  const fd = new FormData(form);
  const obj = {};
  for (const [k, v] of fd.entries()) {
    if (obj[k] !== undefined) {
      obj[k] = Array.isArray(obj[k]) ? [...obj[k], v] : [obj[k], v];
    } else {
      obj[k] = v;
    }
  }
  return obj;
}
