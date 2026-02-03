const SHEET_URL = "https://script.google.com/macros/s/AKfycbz8iiM_mZvgXCVYzQXUAeV4BMFnnuSVI4gZpjalIDnqsJ725fdWjRPNB25PI3Q81O0WjQ/exec"; // must end with /exec

document.addEventListener("DOMContentLoaded", () => {
  // ==========================
  // TAB SWITCHING
  // ==========================
  const tabButtons = document.querySelectorAll(".tab, .hero2__cta button");

  const panels = {
    seller: document.getElementById("panel-seller"),
    buyer: document.getElementById("panel-buyer"),
  };

  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const tab = btn.dataset.tab;
      if (!tab) return;

      document.querySelectorAll(".tab").forEach((t) => t.classList.remove("active"));
      document.querySelector(`.tab[data-tab="${tab}"]`)?.classList.add("active");

      Object.values(panels).forEach((p) => p?.classList.remove("active"));
      panels[tab]?.classList.add("active");
    });
  });

  // ==========================
  // FORM DATA (supports checkboxes)
  // ==========================
  function formToObject(form) {
    const fd = new FormData(form);
    const obj = {};

    // normal fields
    for (const [k, v] of fd.entries()) {
      // if multiple same-name fields exist (checkboxes), we’ll handle below
      if (obj[k] === undefined) obj[k] = v;
    }

    // checkbox multi-values:
    // Seller: name="tags"
    // Buyer:  name="dealTypes"
    const tags = fd.getAll("tags");
    if (tags.length) obj.tags = tags.join(", ");

    const dealTypes = fd.getAll("dealTypes");
    if (dealTypes.length) obj.dealTypes = dealTypes.join(", ");

    // optIn checkbox (Buyer)
    obj.optIn = fd.get("optIn") ? "Yes" : "No";

    return obj;
  }

  async function postToSheet(formType, form) {
    const data = formToObject(form);

    const res = await fetch(SHEET_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ formType, data }),
    });

    const text = await res.text();
    if (!res.ok) throw new Error(text || "Request failed");
    if (text.toLowerCase().startsWith("error:")) throw new Error(text);
    return text;
  }

  // SELLER
  const sellerForm = document.getElementById("sellerForm");
  const sellerMsg = document.getElementById("sellerMsg");

  sellerForm?.addEventListener("submit", async (e) => {
    e.preventDefault();
    sellerMsg.textContent = "Submitting…";

    try {
      await postToSheet("Sellers", sellerForm);
      sellerMsg.textContent = "Thanks — we received your property.";
      sellerForm.reset();
    } catch (err) {
      sellerMsg.textContent = "Submission failed: " + (err?.message || "");
    }
  });

  // BUYER
  const buyerForm = document.getElementById("buyerForm");
  const buyerMsg = document.getElementById("buyerMsg");

  buyerForm?.addEventListener("submit", async (e) => {
    e.preventDefault();
    buyerMsg.textContent = "Submitting…";

    try {
      await postToSheet("Buyers", buyerForm);
      buyerMsg.textContent = "Buy box saved successfully.";
      buyerForm.reset();
    } catch (err) {
      buyerMsg.textContent = "Submission failed: " + (err?.message || "");
    }
  });
});
