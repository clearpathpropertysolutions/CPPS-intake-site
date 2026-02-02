/*************************
 * CONFIG
 *************************/
const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbzAylOvhlPyFChh2pHMEnn97Ghp5zG70aW4S31Qbc-Y-f1JoRynJCdqCm_0rHETw35VOQ/exec";

/*************************
 * YEAR
 *************************/
document.getElementById("year").textContent = new Date().getFullYear();

/*************************
 * TAB SWITCHING
 *************************/
const tabs = document.querySelectorAll(".tab");
const heroButtons = document.querySelectorAll(".hero2__cta button");
const panels = document.querySelectorAll(".panel");

function switchTab(tab) {
  tabs.forEach(t => t.classList.remove("active"));
  panels.forEach(p => p.classList.remove("active"));

  document.querySelector(`.tab[data-tab="${tab}"]`).classList.add("active");
  document.getElementById(`panel-${tab}`).classList.add("active");
}

tabs.forEach(tab => {
  tab.addEventListener("click", () => switchTab(tab.dataset.tab));
});

heroButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    switchTab(btn.dataset.tab);
    document.getElementById("forms").scrollIntoView({ behavior: "smooth" });
  });
});

/*************************
 * FORM UTIL
 *************************/
function formToObject(form) {
  const data = {};
  const formData = new FormData(form);

  formData.forEach((value, key) => {
    if (data[key]) {
      if (!Array.isArray(data[key])) data[key] = [data[key]];
      data[key].push(value);
    } else {
      data[key] = value;
    }
  });

  return data;
}

async function sendForm(payload, msgEl, form) {
  msgEl.textContent = "Submitting…";

  try {
    const res = await fetch(SCRIPT_URL, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" }
    });

    const json = await res.json();

    if (json.success) {
      msgEl.textContent = "✅ Submitted successfully!";
      form.reset();
    } else {
      msgEl.textContent = "❌ Error: " + (json.error || "Submission failed");
    }
  } catch (err) {
    console.error(err);
    msgEl.textContent = "❌ Network error. Check console.";
  }
}

/*************************
 * SELLER FORM
 *************************/
const sellerForm = document.getElementById("sellerForm");
const sellerMsg = document.getElementById("sellerMsg");

sellerForm.addEventListener("submit", e => {
  e.preventDefault();

  const data = formToObject(sellerForm);

  sendForm(
    {
      formType: "SHEET_SELLERS",
      data
    },
    sellerMsg,
    sellerForm
  );
});

/*************************
 * BUYER FORM
 *************************/
const buyerForm = document.getElementById("buyerForm");
const buyerMsg = document.getElementById("buyerMsg");

buyerForm.addEventListener("submit", e => {
  e.preventDefault();

  const data = formToObject(buyerForm);

  sendForm(
    {
      formType: "SHEET_BUYERS",
      data
    },
    buyerMsg,
    buyerForm
  );
});
