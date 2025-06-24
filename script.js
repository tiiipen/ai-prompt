// ================== FETCH & LOAD TAB ==================
function loadTabContent(tabId, fileName) {
  fetch(fileName)
    .then(res => res.text())
    .then(html => {
      document.getElementById(tabId).innerHTML = html;
    });
}

// Load semua tab HTML eksternal sekali saja saat awal
loadTabContent('brainstorm', 'brainstorm.html');
loadTabContent('content', 'content.html');
loadTabContent('image', 'image.html');
loadTabContent('video', 'video.html');

// ================== TAB SWITCHING ==================
const tabIds = ['brainstorm', 'content', 'image', 'video'];
const tabButtons = document.querySelectorAll('.tab-grid button');

// Aktifkan tab brainstorming di awal
function switchTab(tabId) {
  tabIds.forEach(id => {
    document.getElementById(id).classList.remove('active');
  });
  document.getElementById(tabId).classList.add('active');
}

// Set default tab saat load
window.onload = () => switchTab('brainstorm');

// Event listener tombol tab
tabButtons.forEach((btn, idx) => {
  btn.addEventListener('click', () => switchTab(tabIds[idx]));
});

// ================== LOGIC BRAINSTORM ==================
function generateBrainstorm() {
  const val = id => document.getElementById(id)?.value.trim() || "";
  const output = `Berikut beberapa insight dari preferensi Anda:\n\n` +
    `📌 Minat: ${val("BS-interest")}\n` +
    `💪 Kekuatan: ${val("BS-strength")}\n` +
    `🎯 Tujuan: ${val("BS-purpose")}\n`;
  document.getElementById("brainstorm-output").textContent = output;
}
function resetBrainstorm() {
  document.querySelectorAll('#brainstorm input, #brainstorm select').forEach(el => el.value = "");
  document.querySelectorAll('#brainstorm input[type="checkbox"]').forEach(el => el.checked = false);
  document.getElementById("brainstorm-output").textContent = "";
}
function copyBrainstorm() {
  const text = document.getElementById("brainstorm-output")?.textContent;
  if (!text) return alert("Silakan generate ide terlebih dahulu.");
  navigator.clipboard.writeText(text);
  const btn = document.getElementById("copy-brainstorm-button");
  if (btn) {
    btn.textContent = "✔ Copied";
    setTimeout(() => btn.textContent = "Copy", 1500);
  }
}

// ================== LOGIC CONTENT ==================
const formatOptions = {
  Instagram: ["Reels", "Carousel", "IG Live"],
  YouTube: ["Shorts", "Full Video"],
  TikTok: ["TikTok Video", "TikTok Live"]
};

function updateFormatOptions() {
  const platform = document.getElementById("CG-platform")?.value;
  const select = document.getElementById("CG-format");
  if (!platform || !select) return;
  select.innerHTML = "";
  (formatOptions[platform] || []).forEach(opt => {
    const o = document.createElement("option");
    o.value = o.text = opt;
    select.appendChild(o);
  });
}

function generateContentPrompt() {
  const id = id => document.getElementById(id)?.value.trim() || "";
  const prompt = `Buatkan konten ${id("CG-outputType")} untuk platform ${id("CG-platform")} dengan format ${id("CG-format")}\n\n` +
    `🧠 Tema: ${id("CG-campaignName")}\n🏷️ Brand: ${id("CG-brand")}\n📦 Produk: ${id("CG-product")}\n👥 Audiens: ${id("CG-audience")}\n🎨 Gaya: ${id("CG-style")}\n🎯 Tujuan: ${id("CG-objective")}\n🧑‍💼 Persona: ${id("CG-persona")}\n📣 CTA: ${id("CG-cta")}\n📸 Visual: ${id("CG-visual")}\n📌 Keywords: ${id("CG-keywords")}\n`;
  document.getElementById("content-output").textContent = prompt;
}
function resetContentForm() {
  document.querySelectorAll('#content input, #content select').forEach(el => el.value = "");
  document.getElementById("content-output").textContent = "";
}
function copyPrompt() {
  const text = document.getElementById("content-output")?.textContent;
  if (!text) return alert("Silakan generate prompt terlebih dahulu.");
  navigator.clipboard.writeText(text);
  const btn = document.getElementById("copy-button");
  if (btn) {
    btn.textContent = "✔ Copied";
    setTimeout(() => btn.textContent = "Copy", 1500);
  }
}

// ================== LOGIC IMAGE ==================
function generateImagePrompt() {
  const get = id => document.getElementById(id)?.value.trim() || "";
  let prompt = `Prompt Gambar:\n\nJudul: ${get("TI-title")}\nObjek Utama: ${get("TI-mainObject")}\nLokasi: ${get("TI-location")}\nGaya: ${get("TI-artStyle")}\nMood: ${get("TI-mood")}\n`;
  prompt += `Warna: ${get("TI-colorPalette")}\nLighting: ${get("TI-lighting")}\nPose: ${get("TI-characterPose")}\nDetail: ${get("TI-additionalDetail")}\nFantasy: ${get("TI-fantasyElement")}\n`;
  document.getElementById("image-output").textContent = prompt;
}
function resetImageForm() {
  document.querySelectorAll('#image input, #image select').forEach(el => el.value = "");
  document.getElementById("image-output").textContent = "";
}
function copyImagePrompt() {
  const text = document.getElementById("image-output")?.textContent;
  if (!text) return alert("Silakan generate prompt terlebih dahulu.");
  navigator.clipboard.writeText(text);
  const btn = document.getElementById("copy-image-button");
  if (btn) {
    btn.textContent = "✔ Copied";
    setTimeout(() => btn.textContent = "Copy", 1500);
  }
}

// ================== LOGIC VIDEO ==================
function generateVideoPrompt() {
  const get = id => document.getElementById(id)?.value.trim() || "";
  const prompt = `Prompt Video:\n\nJudul: ${get("TV-title")}\nAdegan: ${get("TV-mainScene")}\nLokasi: ${get("TV-location")}\nStyle Visual: ${get("TV-visualStyle")}\nMood: ${get("TV-mood")}\nScript: ${get("TV-shortScript")}\nDialog: ${get("TV-dialogScript")}\nPacing: ${get("TV-pacingStyle")}\nTransisi: ${get("TV-cameraMovement")}\nOutput: ${get("TV-outputUseCase")}\n`;
  document.getElementById("video-output").textContent = prompt;
}
function resetVideoForm() {
  document.querySelectorAll('#video input, #video textarea, #video select').forEach(el => el.value = "");
  document.getElementById("video-output").textContent = "";
}
function copyVideoPrompt() {
  const text = document.getElementById("video-output")?.textContent;
  if (!text) return alert("Silakan generate prompt terlebih dahulu.");
  navigator.clipboard.writeText(text);
  const btn = document.getElementById("copy-video-button");
  if (btn) {
    btn.textContent = "✔ Copied";
    setTimeout(() => btn.textContent = "Copy", 1500);
  }
}
