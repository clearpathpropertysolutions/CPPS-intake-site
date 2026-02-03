const SHEET_URL = "https://script.google.com/macros/s/AKfycbwkSzp2fOiLvWR5n9Yhf88FQdQzvaL31zOcxilkzP7ENB4D10314cAtxB1HlqH7sSYvHw/exec";

// ==========================
// SELLER FORM
// ==========================
document.getElementById("sellerForm")?.addEventListener("submit", e => {
  e.preventDefault();

  const form = e.target;
  const data = Object.fromEntries(new FormData(form).entries());

  fetch(SHEET_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      formType: "Sellers",
      data
    })
  })
  .then(res => res.json())
  .then(() => {
    document.getElementById("sellerMsg").textContent =
      "Thanks — we received your property.";
    form.reset();
  })
  .catch(err => {
    document.getElementById("sellerMsg").textContent =
      "Submission failed.";
    console.error(err);
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
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      formType: "Buyers",
      data
    })
  })
  .then(res => res.json())
  .then(() => {
    document.getElementById("buyerMsg").textContent =
      "Buy box saved successfully.";
    form.reset();
  })
  .catch(err => {
    document.getElementById("buyerMsg").textContent =
      "Submission failed.";
    console.error(err);
  });
});
