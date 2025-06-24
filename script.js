// ==== BASE PATH untuk Fetch Tab ====
const baseURL = window.location.origin + window.location.pathname.replace(/\/[^\/]*$/, '/');

const tabUrls = {
  brainstorm: baseURL + 'brainstorm.html',
  content: baseURL + 'content.html',
  image: baseURL + 'image.html',
  video: baseURL + 'video.html'
};

// ==== SWITCH TAB + LOAD HTML ====
function switchTab(tab) {
  document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.tab-grid button').forEach(el => el.classList.remove('active'));

  const target = document.getElementById(tab);
  const button = document.querySelector(`.tab-grid button[onclick="switchTab('${tab}')"]`);

  if (target && button) {
    target.classList.add('active');
    button.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (!target.dataset.loaded) {
      fetch(tabUrls[tab])
        .then(res => res.text())
        .then(html => {
          target.innerHTML = html;
          target.dataset.loaded = "true";

          if (tab === "content") updateFormatOptions();
        })
        .catch(err => {
          target.innerHTML = `<p style="color:red;">Gagal memuat konten: ${err.message}</p>`;
        });
    }
  }
}

// ==== BRAINSTORM ====
function generateBrainstorm() {
  const val = id => document.getElementById(id)?.value.trim() || "";

  const output = `Berikut beberapa insight dari preferensi Anda:\n\n` +
    `📌 Minat: ${val("BS-interest")}\n` +
    `💪 Kekuatan: ${val("BS-strength")}\n` +
    `🎯 Tujuan: ${val("BS-purpose")}\n` +
    `🎞️ Format Favorit: ${val("BS-formatPref")}\n` +
    `📱 Platform: ${val("BS-platformPref")}\n` +
    `\nGunakan insight ini sebagai dasar ide konten yang sesuai dengan gaya, tujuan, dan waktu Anda.`;

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

// ==== CONTENT GENERATOR ====
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

// ==== IMAGE PROMPT ====
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

// ==== VIDEO PROMPT ====
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

// ==== DEFAULT LOAD TAB ====
window.onload = () => switchTab('brainstorm');
