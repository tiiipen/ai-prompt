// ==== TAB SWITCH + LOAD HTML ====
const baseURL = window.location.origin + window.location.pathname.replace(/\/[^\/]*$/, '/');

const tabUrls = {
  brainstorm: baseURL + 'brainstorm.html',
  content: baseURL + 'content.html',
  image: baseURL + 'image.html',
  video: baseURL + 'video.html'
};

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
  const interest = document.getElementById("interest")?.value.trim();
  const strength = document.getElementById("strength")?.value.trim();
  const purpose = document.getElementById("purpose")?.value.trim();

  if (!interest && !strength && !purpose) {
    alert("Silakan isi setidaknya satu field untuk memulai brainstorming.");
    return;
  }

  const output = `Berikut beberapa ide konten atau bisnis:\n\n` +
    (interest ? `📌 Topik: ${interest}\n` : '') +
    (strength ? `💪 Kekuatan: ${strength}\n` : '') +
    (purpose ? `🎯 Tujuan: ${purpose}\n` : '') +
    `\nContoh:\n` +
    `1. Akun edukasi seputar ${interest || 'topik'}\n` +
    `2. Konten tips dari ${strength || 'keahlian'}\n` +
    `3. Campaign untuk "${purpose || 'motivasi'}"`;

  document.getElementById("brainstorm-output").textContent = output;
}

function resetBrainstorm() {
  document.querySelectorAll('#brainstorm input[type="text"]').forEach(el => el.value = '');
  document.querySelectorAll('#brainstorm input[type="checkbox"]').forEach(el => el.checked = false);
  document.getElementById("brainstorm-output").textContent = "";
}

function copyBrainstorm() {
  const text = document.getElementById("brainstorm-output")?.textContent;
  if (!text) return alert("Silakan generate ide terlebih dahulu.");

  const textarea = document.createElement("textarea");
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);

  const btn = document.getElementById("copy-brainstorm-button");
  if (btn) {
    btn.textContent = "✔ Copied";
    setTimeout(() => btn.textContent = "Copy", 1500);
  }
}

// ==== CONTENT PROMPT ====
const formatOptions = {
  "Instagram": ["IG Post", "IG Story", "IG Carousel", "IG Reels"],
  "Youtube": ["YouTube Short", "YouTube Videos"],
  "TikTok": ["TikTok Video", "TikTok Live"]
};

function updateFormatOptions() {
  const platform = document.getElementById("platform")?.value;
  const formatSelect = document.getElementById("format");
  if (!platform || !formatSelect) return;

  formatSelect.innerHTML = "";
  (formatOptions[platform] || []).forEach(format => {
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

  let prompt = `Buatkan konten ${data.format} untuk platform ${data.platform} yang mempromosikan brand "${data.brand}".\nProduk/Jasa: ${data.product}.\nTarget audiens: ${data.audience}.\n`;

  if (data.style) prompt += `Gaya bahasa: ${data.style}.\n`;
  if (data.objective) prompt += `Tujuan kampanye: ${data.objective}.\n`;
  if (data.cta) prompt += `Call to action: ${data.cta}.\n`;
  if (data.persona) prompt += `Karakter/tone brand: ${data.persona}.\n`;
  if (data.visual) prompt += `Referensi visual: ${data.visual}.\n`;
  if (data.language) prompt += `Dialek/bahasa: ${data.language}.\n`;
  if (data.moment) prompt += `Momen/konteks: ${data.moment}.\n`;
  if (data.role) prompt += `Role AI: ${data.role}.\n`;
  if (data.goal) prompt += `Goal atau tugas AI: ${data.goal}.\n`;
  if (data.tone) prompt += `Tone konten: ${data.tone}.\n`;
  if (data.constraint) prompt += `Batasan: ${data.constraint}.\n`;

  prompt += `Konten harus engaging, relevan, dan sesuai brief.\nBerikan 3 versi atau ide berbeda dari prompt ini.`;

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
  const text = document.getElementById("content-output")?.textContent;
  if (!text) return alert("Silakan generate prompt terlebih dahulu.");

  const textarea = document.createElement("textarea");
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);

  const btn = document.getElementById("copy-button");
  if (btn) {
    btn.textContent = "✔ Copied";
    setTimeout(() => btn.textContent = "Copy", 1500);
  }
}

// ==== VIDEO PROMPT ====
function generateVideoPrompt() {
  const ids = [
    "TV-title", "TV-mainScene", "TV-location", "TV-visualStyle", "TV-mood",
    "TV-scriptStyle", "TV-shortScript", "TV-dialogScript", "TV-cameraMovement",
    "TV-lighting", "TV-framingStyle", "TV-dialogTone", "TV-voiceoverStyle",
    "TV-pacingStyle", "TV-emotionImpact", "TV-callToAction", "TV-trendHook",
    "TV-brandVisualType", "TV-outputUseCase", "TV-cameraType", "TV-lensType",
    "TV-aperture", "TV-isoSetting", "TV-shutterSpeed", "TV-frameRate"
  ];

  const data = Object.fromEntries(ids.map(id => [id, getVal(id)]));

  let prompt = `Buatkan skrip video dengan topik "${data["TV-title"]}".\n`;
  if (data["TV-mainScene"]) prompt += `Adegan utama: ${data["TV-mainScene"]}.\n`;
  if (data["TV-location"]) prompt += `Lokasi: ${data["TV-location"]}.\n`;
  if (data["TV-visualStyle"]) prompt += `Gaya visual: ${data["TV-visualStyle"]}.\n`;
  if (data["TV-mood"]) prompt += `Mood/Tone: ${data["TV-mood"]}.\n`;
  if (data["TV-scriptStyle"]) prompt += `Gaya naskah: ${data["TV-scriptStyle"]}.\n`;
  if (data["TV-shortScript"]) prompt += `Narasi pendek: ${data["TV-shortScript"]}.\n`;
  if (data["TV-dialogScript"]) prompt += `Contoh dialog:\n${data["TV-dialogScript"]}\n`;
  if (data["TV-cameraMovement"]) prompt += `Style kamera: ${data["TV-cameraMovement"]}.\n`;
  if (data["TV-lighting"]) prompt += `Lighting: ${data["TV-lighting"]}.\n`;
  if (data["TV-framingStyle"]) prompt += `Framing visual: ${data["TV-framingStyle"]}.\n`;
  if (data["TV-dialogTone"]) prompt += `Tone dialog: ${data["TV-dialogTone"]}.\n`;
  if (data["TV-voiceoverStyle"]) prompt += `Voiceover: ${data["TV-voiceoverStyle"]}.\n`;
  if (data["TV-pacingStyle"]) prompt += `Ritme/Pacing: ${data["TV-pacingStyle"]}.\n`;
  if (data["TV-emotionImpact"]) prompt += `Emosi yang ditargetkan: ${data["TV-emotionImpact"]}.\n`;
  if (data["TV-callToAction"]) prompt += `CTA: ${data["TV-callToAction"]}.\n`;
  if (data["TV-trendHook"]) prompt += `Hook gaya tren: ${data["TV-trendHook"]}.\n`;
  if (data["TV-brandVisualType"]) prompt += `Branding visual: ${data["TV-brandVisualType"]}.\n`;
  if (data["TV-outputUseCase"]) prompt += `Tujuan output: ${data["TV-outputUseCase"]}.\n`;
  if (data["TV-cameraType"]) prompt += `Jenis kamera: ${data["TV-cameraType"]}.\n`;
  if (data["TV-lensType"]) prompt += `Lensa: ${data["TV-lensType"]}.\n`;
  if (data["TV-aperture"]) prompt += `Aperture: ${data["TV-aperture"]}.\n`;
  if (data["TV-isoSetting"]) prompt += `ISO: ${data["TV-isoSetting"]}.\n`;
  if (data["TV-shutterSpeed"]) prompt += `Shutter speed: ${data["TV-shutterSpeed"]}.\n`;
  if (data["TV-frameRate"]) prompt += `Frame rate: ${data["TV-frameRate"]}.\n`;

  prompt += `\nTampilkan skrip lengkap beserta 2 variasi lain dengan tone berbeda.`;

  document.getElementById("video-output").textContent = prompt;
}

function resetVideoPrompt() {
  document.querySelectorAll("#video input, #video select, #video textarea").forEach(el => el.value = "");
  document.getElementById("video-output").textContent = "";
}

function copyVideoPrompt() {
  const text = document.getElementById("video-output")?.textContent;
  if (!text) return alert("Silakan generate prompt terlebih dahulu.");

  const textarea = document.createElement("textarea");
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);

  const btn = document.getElementById("copy-video-button");
  if (btn) {
    btn.textContent = "✔ Copied";
    setTimeout(() => btn.textContent = "Copy", 1500);
  }
}

// ==== AUTO LOAD DEFAULT TAB ====
window.onload = () => switchTab('brainstorm');
