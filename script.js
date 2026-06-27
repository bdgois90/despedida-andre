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

function startGame() {
  const saved = localStorage.getItem("missions");

  if (saved) {
    remaining = JSON.parse(saved);
  } else {
    remaining = [...allMissions];
  }

  nextMission();
}

function nextMission() {
  if (remaining.length === 0) {
    document.body.innerHTML = `
      <div style="color:white;text-align:center;padding:40px">
        <h1>🎉 MISSÃO CUMPRIDA</h1>
        <p>O André sobreviveu ao último dia de liberdade!</p>
      </div>
    `;
    localStorage.removeItem("missions");
    return;
  }

  const i = Math.floor(Math.random() * remaining.length);
  current = remaining[i];
  remaining.splice(i, 1);

  localStorage.setItem("missions", JSON.stringify(remaining));

  renderMission();
}

function renderMission() {
  document.querySelector(".card").innerHTML = `
    <h2>🎯 MISSÃO</h2>

    <p style="font-size:18px;margin:20px 0;">
      ${current}
    </p>

    <button onclick="nextMission()">✅ CONCLUIR MISSÃO</button>

    <button onclick="openCamera()" style="margin-top:10px;background:#333;color:white;">
      📸 ABRIR CÂMARA
    </button>
  `;
}

function openCamera() {
  // abre câmara real do iPhone
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*";
  input.capture = "environment";
  input.click();
}
