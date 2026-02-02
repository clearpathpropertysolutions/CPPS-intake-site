const API_URL = "PASTE_YOUR_APPS_SCRIPT_WEB_APP_URL_HERE";

document.getElementById("year").textContent = new Date().getFullYear();

/* Tabs */
function setTab(which) {
  document.querySelectorAll(".tab").forEach(b =>
    b.classList.toggle("active", b.dataset.tab === which)
  );

  document.querySelectorAll(".panel").forEach(p =>
    p.classList.toggle("active", p.id === `panel-${which}`)
  );

  document.querySelectorAll(".hero2__cta button").forEach(b => {
    const isActive = b.dataset.tab === which;
    b.classList.toggle("gold", isActive);
    b.classList.toggle("btn-outline", !isActive);
  });
}

document.querySelectorAll("[data-tab]").forEach(btn => {
  btn.addEventListener("click", () => setTab(btn.dataset.tab));
});
setTab("seller");

/* Forms */
function formToObject(form) {
  const fd = new FormData(form);
  const obj = {};
  for (const [k, v] of fd.entries()) obj[k] = v;
  return obj;
}

async function postJSON(payload) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(payload),
  });
  return res.json();
}

const sellerForm = document.getElementById("sellerForm");
const sellerMsg = document.getElementById("sellerMsg");

sellerForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  sellerMsg.textContent = "Submitting...";
  try {
    const data = formToObject(sellerForm);
    data.type = "seller";
    const out = await postJSON(data);

    if (out.ok) {
      sellerMsg.textContent = "✅ Submitted. We’ll contact you shortly.";
      sellerForm.reset();
    } else {
      sellerMsg.textContent = "❌ Error: " + (out.error || "Unknown error");
    }
  } catch (err) {
    sellerMsg.textContent = "❌ Error: " + err.message;
  }
});

const buyerForm = document.getElementById("buyerForm");
const buyerMsg = document.getElementById("buyerMsg");

buyerForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  buyerMsg.textContent = "Submitting...";
  try {
    const data = formToObject(buyerForm);
    data.type = "buyer";
    const out = await postJSON(data);

    if (out.ok) {
      buyerMsg.textContent = "✅ Submitted. We’ll send deals that match.";
      buyerForm.reset();
    } else {
      buyerMsg.textContent = "❌ Error: " + (out.error || "Unknown error");
    }
  } catch (err) {
    buyerMsg.textContent = "❌ Error: " + err.message;
  }
});
