// ==========================
// CONFIG
// ==========================
const SHEET_URL = "PASTE_YOUR_DEPLOYED_WEB_APP_URL_HERE";

// ==========================
// TAB SWITCHING (THIS IS THE MISSING PART)
// ==========================
const tabs = document.querySelectorAll("[data-tab]");
const panels = {
  seller: document.getElementById("panel-seller"),
  buyer: document.getElementById("panel-buyer"),
};

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    const target = tab.dataset.tab;

    // activate tab buttons
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");

    // show correct panel
    Object.values(panels).forEach(p => p.classList.remove("active"));
    panels[target].classList.add("active");

    // scroll to forms
    document.getElementById("forms").scrollIntoView({ behavior: "smooth" });
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
    body: JSON.stringify({ formType: "SELLER", data })
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
    body: JSON.stringify({ formType: "BUYER", data })
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
