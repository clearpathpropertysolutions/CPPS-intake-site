const SHEET_URL = "https://script.google.com/macros/s/AKfycbzAylOvhlPyFChh2pHMEnn97Ghp5zG70aW4S31Qbc-Y-f1JoRynJCdqCm_0rHETw35VOQ/exec";

// ==========================
// TAB SWITCHING (CRITICAL)
// ==========================
const tabs = document.querySelectorAll(".tab, .hero2__cta button");
const panels = {
  seller: document.getElementById("panel-seller"),
  buyer: document.getElementById("panel-buyer"),
};

tabs.forEach(btn => {
  btn.addEventListener("click", () => {
    const tab = btn.dataset.tab;

    // toggle tab buttons
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
    document.querySelector(`.tab[data-tab="${tab}"]`)?.classList.add("active");

    // toggle panels
    Object.values(panels).forEach(p => p.classList.remove("active"));
    panels[tab]?.classList.add("active");
  });
});
// ==========================
// SELLER FORM
// ==========================
document.getElementById("sellerForm")?.addEventListener("submit", e => {
  e.preventDefault();

  const form = e.target;
  const data = Object.fromEntries(new FormData(form).entries());

  fetch(SHEET_URL, {
    method: "POST",
    body: JSON.stringify({
      formType: "Sellers",   // ✅ MATCHES SHEET TAB
      data
    })
  })
  .then(() => {
    document.getElementById("sellerMsg").textContent =
      "Thanks — we received your property.";
    form.reset();
  })
  .catch(() => {
    document.getElementById("sellerMsg").textContent =
      "Error submitting form.";
  });
});


// ==========================
// BUYER FORM
// ==========================
document.getElementById("buyerForm")?.addEventListener("submit", e => {
  e.preventDefault();

  const form = e.target;
  const data = Object.fromEntries(new FormData(form).entries());

  fetch(SHEET_URL, {
    method: "POST",
    body: JSON.stringify({
      formType: "Buyers",    // ✅ MATCHES SHEET TAB
      data
    })
  })
  .then(() => {
    document.getElementById("buyerMsg").textContent =
      "Buy box saved successfully.";
    form.reset();
  })
  .catch(() => {
    document.getElementById("buyerMsg").textContent =
      "Error submitting form.";
  });
});
