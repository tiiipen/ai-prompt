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

  const textarea = document.createEl
