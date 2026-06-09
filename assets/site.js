const rfqButton = document.querySelector("[data-copy-rfq]");
const rfqNote = document.querySelector("[data-copy-note]");
const rfqFields = {
  name: document.querySelector("[data-rfq-name]"),
  contact: document.querySelector("[data-rfq-contact]"),
  part: document.querySelector("[data-rfq-part]"),
  qty: document.querySelector("[data-rfq-qty]"),
  notes: document.querySelector("[data-rfq-notes]"),
};

function buildRfqText() {
  const name = rfqFields.name?.value.trim() || "[name / company]";
  const contact = rfqFields.contact?.value.trim() || "[email / phone]";
  const part = rfqFields.part?.value.trim() || "[part number / photo / drawing]";
  const qty = rfqFields.qty?.value.trim() || "[quantity]";
  const notes = rfqFields.notes?.value.trim() || "[material, pressure, size, standard, delivery target]";

  return [
    "RiteGrit RFQ",
    "",
    `Name / company: ${name}`,
    `Contact: ${contact}`,
    `Item: ${part}`,
    `Quantity: ${qty}`,
    `Notes: ${notes}`,
    "",
    "Please check:",
    "- source direction",
    "- first market read",
    "- sample path if needed",
    "- lead time",
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
      rfqNote.textContent = "RFQ copied. Paste it into email, SMS, or WeChat.";
    }
  } catch {
    if (rfqNote) {
      rfqNote.textContent = "Copy failed. Select the fields and send them manually.";
    }
  }
});
