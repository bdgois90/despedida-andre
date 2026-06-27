const allMissions = [
  "Tirar foto com um empregado de um bar",
  "Abraçar um poste/árvore como se fosse o amor da vida dele",
  "Fazer uma pose de modelo numa passadeira",
  "Falar em inglês para alguém a começar com: Where are you from?",
  "Selfie com um grupo de desconhecidos",
  "Foto com um casal aleatório",
  "Brindar ao casamento com desconhecidos",
  "Fazer pose de Titanic num banco",
  "Tirar foto com um animal",
  "Fazer de estátua humana por 10 segundos",
  "Tirar selfie com alguém de óculos de sol",
  "Fazer uma foto tipo capa de revista",
  "Pedir a alguém para tirar foto ao grupo de copo na mão",
  "Pedir a alguém um conselho de casamento",
  "Tirar foto dentro de um bar com o grupo",
  "Fazer pose de super-herói",
  "Pagar uma rodada e tirar foto",
  "Tirar foto com alguém vestido de forma estranha",
  "Fazer um coração com as mãos com um desconhecido",
  "Fingir que adormeceu num banco de jardim"
];

let remaining = [];
let current = "";
let total = allMissions.length;
let completed = 0;

function startGame() {
  const saved = localStorage.getItem("missions");
  const savedCompleted = localStorage.getItem("completed");

  if (saved) {
    remaining = JSON.parse(saved);
    completed = parseInt(savedCompleted || "0");
  } else {
    remaining = [...allMissions];
    completed = 0;
  }

  nextMission();
}

function nextMission() {
  if (remaining.length === 0) {
    showFinal();
    localStorage.clear();
    return;
  }

  const i = Math.floor(Math.random() * remaining.length);
  current = remaining[i];
  remaining.splice(i, 1);

  completed++;

  localStorage.setItem("missions", JSON.stringify(remaining));
  localStorage.setItem("completed", completed);

  renderMission();
}

function renderMission() {
  const progress = Math.round((completed / total) * 100);

  document.querySelector(".card").innerHTML = `
    <h2>🎯 MISSÃO</h2>

    <div style="margin:10px 0;font-size:14px;">
      ${completed}/${total} concluídas
    </div>

    <div style="background:#333;border-radius:10px;height:8px;margin-bottom:20px;">
      <div style="width:${progress}%;background:gold;height:8px;border-radius:10px;"></div>
    </div>

    <p style="font-size:18px;margin:20px 0;">
      ${current}
    </p>

    <button onclick="nextMission()">✅ CONCLUIR MISSÃO</button>

    <button onclick="openCamera()" style="margin-top:10px;background:#333;color:white;">
      📸 ABRIR CÂMARA
    </button>
  `;

  checkMedal();
}

function checkMedal() {
  if (completed === 5) alert("🥉 Medalha desbloqueada: Sobreviveu ao início!");
  if (completed === 10) alert("🥈 Medalha desbloqueada: Já não há volta a dar!");
  if (completed === 15) alert("🥇 Medalha desbloqueada: Quase no fim!");
}

function showFinal() {
  document.body.innerHTML = `
    <div style="color:white;text-align:center;padding:40px">
      <h1>🎉 MISSÃO CUMPRIDA</h1>
      <p style="font-size:18px;margin-top:10px;">
        O André sobreviveu ao último dia de liberdade!
      </p>

      <h2 style="margin-top:20px;">🏆 20/20 MISSÕES</h2>

      <p style="margin-top:20px;">Memórias criadas para sempre 🍻</p>
    </div>
  `;

  launchConfetti();
}

function launchConfetti() {
  const duration = 3 * 1000;
  const end = Date.now() + duration;

  (function frame() {
    const timeLeft = end - Date.now();

    const confetti = document.createElement("div");
    confetti.style.position = "fixed";
    confetti.style.width = "10px";
    confetti.style.height = "10px";
    confetti.style.background = "gold";
    confetti.style.left = Math.random() * window.innerWidth + "px";
    confetti.style.top = "-10px";
    confetti.style.opacity = "0.8";
    confetti.style.borderRadius = "50%";

    document.body.appendChild(confetti);

    let fall = setInterval(() => {
      confetti.style.top = confetti.offsetTop + 5 + "px";
      if (confetti.offsetTop > window.innerHeight) {
        confetti.remove();
        clearInterval(fall);
      }
    }, 16);

    if (timeLeft > 0) {
      requestAnimationFrame(frame);
    }
  })();
}

function openCamera() {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*";
  input.capture = "environment";
  window.location.href = "photos-redirect://";;
}
