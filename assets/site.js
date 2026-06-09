const rfqButton = document.querySelector("[data-copy-rfq]");
const rfqNote = document.querySelector("[data-copy-note]");
const rfqFields = {
  part: document.querySelector("[data-rfq-part]"),
  qty: document.querySelector("[data-rfq-qty]"),
  notes: document.querySelector("[data-rfq-notes]"),
};

function buildRfqText() {
  const part = rfqFields.part?.value.trim() || "[part number / photo / drawing]";
  const qty = rfqFields.qty?.value.trim() || "[quantity]";
  const notes = rfqFields.notes?.value.trim() || "[material, pressure, size, standard, delivery target]";

  return [
    "RiteGrit RFQ",
    "",
    `Item: ${part}`,
    `Quantity: ${qty}`,
    `Specs / notes: ${notes}`,
    "",
    "Please check:",
    "- correct product direction",
    "- first offer or market read",
    "- sample path if practical",
    "- expected lead time and document needs",
  ].join("\n");
}

async function copyText(text) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
}

rfqButton?.addEventListener("click", async () => {
  try {
    await copyText(buildRfqText());
    if (rfqNote) {
      rfqNote.textContent = "RFQ text copied. Paste it into email, WeChat, or SMS.";
    }
  } catch {
    if (rfqNote) {
      rfqNote.textContent = "Copy failed. Select the fields and send them manually.";
    }
  }
});
