// script.js

// year in footer
document.getElementById("year").textContent = new Date().getFullYear();

// TAB SWITCHING
const tabButtons = document.querySelectorAll("[data-tab]");
const sellerPanel = document.getElementById("panel-seller");
const buyerPanel = document.getElementById("panel-buyer");

function setActive(tab) {
  // buttons (top tabs + hero buttons)
  document.querySelectorAll(".tab").forEach(b => b.classList.remove("active"));
  document.querySelectorAll(".hero2__cta .btn").forEach(b => b.classList.remove("active"));

  // activate all matching buttons
  document.querySelectorAll(`[data-tab="${tab}"]`).forEach(b => b.classList.add("active"));

  // panels
  sellerPanel.classList.toggle("active", tab === "seller");
  buyerPanel.classList.toggle("active", tab === "buyer");
}

tabButtons.forEach(btn => {
  btn.addEventListener("click", () => setActive(btn.dataset.tab));
});

// default
setActive("seller");

// OPTIONAL: basic submit messages (keeps your Google Sheets hook separate)
document.getElementById("sellerForm")?.addEventListener("submit", (e) => {
  e.preventDefault();
  document.getElementById("sellerMsg").textContent = "Submitted! We’ll reach out soon.";
  e.target.reset();
});

document.getElementById("buyerForm")?.addEventListener("submit", (e) => {
  e.preventDefault();
  document.getElementById("buyerMsg").textContent = "Saved! We’ll send matching deals.";
  e.target.reset();
});
