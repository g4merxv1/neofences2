// Inicializa o mapa
var map = L.map('map').setView([-15.7801, -47.9292], 4);

// Adiciona o mapa base
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Adiciona o vidro azul (overlay)
var overlay = document.createElement("div");
overlay.id = "overlay";
document.body.appendChild(overlay);

// Variáveis de controle
let modoEdicaoCerca = false;
let pontosCerca = [];
let cercaAtual = null;

// Função para alternar modo de edição
function ativarEdicaoCerca() {
  modoEdicaoCerca = !modoEdicaoCerca;
  pontosCerca = [];

  if (cercaAtual) {
    map.removeLayer(cercaAtual);
    cercaAtual = null;
  }

  alert(
    modoEdicaoCerca
      ? "Modo de edição de cerca ATIVADO\nClique para adicionar pontos.\nDuplo clique para finalizar."
      : "Modo de edição de cerca DESATIVADO"
  );
}

// Captura cliques no mapa para criar pontos
map.on("click", function (e) {
  if (!modoEdicaoCerca) return;

  pontosCerca.push([e.latlng.lat, e.latlng.lng]);

  // Se já tiver um desenho, remove o anterior
  if (cercaAtual) map.removeLayer(cercaAtual);

  // Mostra o polígono parcial enquanto adiciona pontos
  cercaAtual = L.polygon(pontosCerca, {
    color: "yellow",
    weight: 4,
    fillColor: "rgba(255,255,0,0.2)",
    fillOpacity: 0.3,
  }).addTo(map);
});

// Duplo clique finaliza a cerca
map.on("dblclick", function () {
  if (modoEdicaoCerca && pontosCerca.length > 2) {
    if (cercaAtual) map.removeLayer(cercaAtual);
    cercaAtual = L.polygon(pontosCerca, {
      color: "yellow",
      weight: 4,
      fillColor: "rgba(255,255,0,0.3)",
      fillOpacity: 0.4,
    }).addTo(map);
    modoEdicaoCerca = false;
    pontosCerca = [];
    alert("Cerca criada e exibida no mapa!");
  }
});




