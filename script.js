// ==========================
// CONFIG
// ==========================
const SHEET_URL = "const SHEET_URL = "https://script.google.com/macros/s/AKfycbxD1-b7JrXa1F3llTG_HBAYo6RxgxSomqs-9FPI09VedmTGFmleV2w4j99MKZU3gSm5kw/exec";

// ==========================
// SELLER FORM SUBMIT
// ==========================
document.getElementById("sellerForm")?.addEventListener("submit", (e) => {
  e.preventDefault();
  const form = e.target;

  const fd = new FormData(form);

  // IMPORTANT: tell Apps Script which sheet to write to
  fd.append("formType", "seller");

  fetch(SHEET_URL, {
    method: "POST",
    mode: "no-cors",   // ✅ required for GitHub Pages → Apps Script
    body: fd
  });

  document.getElementById("sellerMsg").textContent =
    "✅ Submitted! We received your property.";
  form.reset();
});

// ==========================
// BUYER FORM SUBMIT
// ==========================
document.getElementById("buyerForm")?.addEventListener("submit", (e) => {
  e.preventDefault();
  const form = e.target;

  const fd = new FormData(form);

  // IMPORTANT: tell Apps Script which sheet to write to
  fd.append("formType", "buyer");

  fetch(SHEET_URL, {
    method: "POST",
    mode: "no-cors",   // ✅ required for GitHub Pages → Apps Script
    body: fd
  });

  document.getElementById("buyerMsg").textContent =
    "✅ Saved! We received your buy box.";
  form.reset();
});
