const SHEET_URL = "https://script.google.com/macros/s/AKfycbzVbQjy_GjwwojfH1rJQbWSp0z02ooy5j9nxIGTMGpTx2w5K2a3Z3uBcc8iO6oKOtx6mg/exec";
// ==========================
// SELLER FORM
// ==========================
document.getElementById("sellerForm")?.addEventListener("submit", e => {
  e.preventDefault();

  const form = e.target;
  const data = Object.fromEntries(new FormData(form).entries());

  fetch(SHEET_URL, {
  method: "POST",
  headers: { "Content-Type": "text/plain;charset=utf-8" },
  body: JSON.stringify({
    formType: "Sellers",
    data
  })
})
.then(r => r.text())
.then(() => {
  document.getElementById("sellerMsg").textContent =
    "Thanks — we received your property.";
  form.reset();
})
.catch(() => {
  document.getElementById("sellerMsg").textContent =
    "Error submitting form.";
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
  headers: { "Content-Type": "text/plain;charset=utf-8" },
  body: JSON.stringify({
    formType: "Buyers",
    data
  })
})
.then(r => r.text())
.then(() => {
  document.getElementById("buyerMsg").textContent =
    "Buy box saved successfully.";
  form.reset();
})
.catch(() => {
  document.getElementById("buyerMsg").textContent =
    "Error submitting form.";
});
