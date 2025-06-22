function switchTab(tab) {
  document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.tab-buttons button').forEach(el => el.classList.remove('active'));
  document.getElementById(tab).classList.add('active');
  document.getElementById('btn-' + tab).classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ==== BRAINSTORM ====

function generateBrainstorm() {
  const interest = document.getElementById("interest").value.trim();
  const strength = document.getElementById("strength").value.trim();
  const purpose = document.getElementById("purpose").value.trim();

  if (!interest && !strength && !purpose) {
    alert("Silakan isi setidaknya satu field untuk memulai brainstorming.");
    return;
  }

  const output = Berikut beberapa ide konten atau bisnis:\n\n +
    (interest ? 📌 Topik: ${interest}\n : '') +
    (strength ? 💪 Kekuatan: ${strength}\n : '') +
    (purpose ? 🎯 Tujuan: ${purpose}\n : '') +
    \nContoh:\n1. Akun edukasi seputar ${interest || 'topik'}\n2. Konten tips dari ${strength || 'keahlian'}\n3. Campaign untuk "${purpose || 'motivasi'}";

  document.getElementById("brainstorm-output").textContent = output;
}

function resetBrainstorm() {
  document.querySelectorAll('#brainstorm input[type="text"]').forEach(el => el.value = '');
  document.querySelectorAll('#brainstorm input[type="checkbox"]').forEach(el => el.checked = false);
  document.getElementById("brainstorm-output").textContent = "";
}

function copyBrainstorm() {
  const text = document.getElementById("brainstorm-output").textContent;
  if (!text) return alert("Silakan generate ide terlebih dahulu.");

  const textarea = document.createElement("textarea");
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);

  const btn = document.getElementById("copy-brainstorm-button");
  btn.textContent = "✔ Copied";
  setTimeout(() => btn.textContent = "Copy", 1500);
}

// ==== CONTENT PROMPT ====

const formatOptions = {
  "Instagram": ["IG Post", "IG Story", "IG Carousel", "IG Reels"],
  "Youtube": ["YouTube Short", "YouTube Videos"],
  "TikTok": ["TikTok Video", "TikTok Live"]
};

function updateFormatOptions() {
  const platform = document.getElementById("platform").value;
  const formatSelect = document.getElementById("format");
  formatSelect.innerHTML = "";
  formatOptions[platform].forEach(format => {
    const option = document.createElement("option");
    option.value = format;
    option.text = format;
    formatSelect.appendChild(option);
  });
}

function getVal(id) {
  return document.getElementById(id)?.value.trim() || "";
}

function generatePrompt() {
  const ids = [
    "brand", "product", "audience", "platform", "format", "style",
    "objective", "cta", "persona", "visual", "language", "moment",
    "role", "goal", "tone", "constraint", "outputType"
  ];

  const data = Object.fromEntries(ids.map(id => [id, getVal(id)]));
  let prompt = Buatkan konten ${data.format} untuk platform ${data.platform} yang mempromosikan brand "${data.brand}".\nProduk/Jasa: ${data.product}.\nTarget audiens: ${data.audience}.\n;

  if (data.style) prompt += Gaya bahasa: ${data.style}.\n;
  if (data.objective) prompt += Tujuan kampanye: ${data.objective}.\n;
  if (data.cta) prompt += Call to action: ${data.cta}.\n;
  if (data.persona) prompt += Karakter/tone brand: ${data.persona}.\n;
  if (data.visual) prompt += Referensi visual: ${data.visual}.\n;
  if (data.language) prompt += Dialek/bahasa: ${data.language}.\n;
  if (data.moment) prompt += Momen/konteks: ${data.moment}.\n;
  if (data.role) prompt += Role AI: ${data.role}.\n;
  if (data.goal) prompt += Goal atau tugas AI: ${data.goal}.\n;
  if (data.tone) prompt += Tone konten: ${data.tone}.\n;
  if (data.constraint) prompt += Batasan: ${data.constraint}.\n;

  prompt += Konten harus engaging, relevan, dan sesuai brief.\nBerikan 3 versi atau ide berbeda dari prompt ini.;

  document.getElementById("content-output").textContent = prompt;
}

function resetForm() {
  document.querySelectorAll("#content input, #content select").forEach(el => {
    if (el.type === "checkbox") el.checked = false;
    else el.value = "";
  });
  document.getElementById("content-output").textContent = "";
}

function copyPrompt() {
  const text = document.getElementById("content-output").textContent;
  if (!text) return alert("Silakan generate prompt terlebih dahulu.");

  const textarea = document.createElement("textarea");
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);

  const btn = document.getElementById("copy-button");
  btn.textContent = "✔ Copied";
  setTimeout(() => btn.textContent = "Copy", 1500);
}

window.addEventListener("load", updateFormatOptions);
