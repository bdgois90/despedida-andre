const allMissions = [
  "Tirar foto com um empregado de um bar",
  "Abraçar um poste como se fosse o amor da vida dele",
  "Fazer uma pose de modelo numa passadeira",
  "Pedir alguém em casamento de joelhos",
  "Selfie com um grupo de desconhecidos",
  "Foto com um casal aleatório",
  "Brindar com desconhecidos",
  "Fazer pose de Titanic num banco",
  "Tirar foto com um cão ou animal",
  "Fazer de estátua humana por 10 segundos",
  "Tirar selfie com alguém de óculos de sol",
  "Fazer uma foto tipo capa de revista",
  "Dançar no meio da rua por 10 segundos",
  "Pedir a alguém para dar um conselho de casamento",
  "Tirar foto dentro de um bar com ambiente épico",
  "Fazer pose de super-herói",
  "Fingir que está a fazer discurso de casamento",
  "Tirar foto com alguém vestido de forma estranha",
  "Sentar-se no chão como turista perdido",
  "Fazer uma foto de grupo em forma de coração"
];

let remainingMissions = [];
let currentMission = "";

function startGame() {
  const saved = localStorage.getItem("remainingMissions");

  if (saved) {
    remainingMissions = JSON.parse(saved);
  } else {
    remainingMissions = [...allMissions];
  }

  nextMission();
}

function nextMission() {
  if (remainingMissions.length === 0) {
    document.body.innerHTML = `
      <div style="color:white;text-align:center;padding:40px">
        <h1>🎉 MISSÃO CUMPRIDA</h1>
        <p>O André sobreviveu ao último dia de liberdade!</p>
      </div>
    `;
    localStorage.removeItem("remainingMissions");
    return;
  }

  const index = Math.floor(Math.random() * remainingMissions.length);
  currentMission = remainingMissions[index];

  remainingMissions.splice(index, 1);

  localStorage.setItem("remainingMissions", JSON.stringify(remainingMissions));

  showMission();
}

function showMission() {
  document.querySelector(".card").innerHTML = `
    <h2>🎯 MISSÃO</h2>

    <p style="font-size:18px;margin:20px 0;">
      ${currentMission}
    </p>

    <button onclick="nextMission()">✅ CONCLUIR MISSÃO</button>

    <button onclick="openCamera()" style="margin-top:10px;background:#333;color:white;">
      📸 ABRIR CÂMARA
    </button>
  `;
}

function openCamera() {
  window.location.href = "camera://";
}
