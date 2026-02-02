// ==========================
// CONFIG (ALWAYS AT THE TOP)
// ==========================
const SHEET_URL = "https://script.google.com/macros/s/AKfycbXXXXXXXXXXXX/exec";


// ==========================
// SELLER FORM SUBMIT
// ==========================
document.getElementById("sellerForm")?.addEventListener("submit", e => {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);
  const values = [];

  formData.forEach(v => values.push(v));

  fetch(SHEET_URL, {
    method: "POST",
    body: JSON.stringify({
      formType: "seller",
      values
    })
  })
  .then(() => {
    document.getElementById("sellerMsg").textContent =
      "Thanks — we received your property. We'll be in touch.";
    form.reset();
  })
  .catch(() => {
    document.getElementById("sellerMsg").textContent =
      "Something went wrong. Please try again.";
  });
});


// ==========================
// BUYER FORM SUBMIT
// ==========================
document.getElementById("buyerForm")?.addEventListener("submit", e => {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);
  const values = [];

  formData.forEach(v => values.push(v));

  fetch(SHEET_URL, {
    method: "POST",
    body: JSON.stringify({
      formType: "buyer",
      values
    })
  })
  .then(() => {
    document.getElementById("buyerMsg").textContent =
      "Buy box saved. We'll only send deals that fit.";
    form.reset();
  })
  .catch(() => {
    document.getElementById("buyerMsg").textContent =
      "Something went wrong. Please try again.";
  });
});
