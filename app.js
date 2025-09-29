// Inicializa o mapa
var map = L.map('map').setView([-15.7801, -47.9292], 4);

// Adiciona o mapa base
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Overlay de vidro azul
var overlay = document.createElement("div");
overlay.id = "overlay";
document.body.appendChild(overlay);

// Variáveis para edição de cercas
let modoEdicaoCerca = false;
let pontosCerca = [];
let cercaAtual = null;

// Ativar/Desativar edição de cercas
function ativarEdicaoCerca() {
  modoEdicaoCerca = !modoEdicaoCerca;
  pontosCerca = [];

  if (cercaAtual) {
    map.removeLayer(cercaAtual);
    cercaAtual = null;
  }

  alert(modoEdicaoCerca ? "Modo de edição de cerca ATIVADO\nClique no mapa para adicionar pontos.\nClique duplo para fechar a cerca." 
                        : "Modo de edição de cerca DESATIVADO");
}

// Clique no mapa para adicionar pontos da cerca
map.on("click", function (e) {
  if (!modoEdicaoCerca) return;

  pontosCerca.push([e.latlng.lat, e.latlng.lng]);

  // Se já existir uma cerca provisória, remove antes de desenhar de novo
  if (cercaAtual) {
    map.removeLayer(cercaAtual);
  }

  // Desenha polígono aberto (vai se fechando conforme adiciona pontos)
  cercaAtual = L.polygon(pontosCerca, { color: "yellow", weight: 3, fillOpacity: 0.1 }).addTo(map);
});

// Duplo clique fecha o polígono
map.on("dblclick", function () {
  if (modoEdicaoCerca && pontosCerca.length > 2) {
    if (cercaAtual) {
      map.removeLayer(cercaAtual);
    }
    cercaAtual = L.polygon(pontosCerca, { color: "yellow", weight: 3, fillOpacity: 0.3 }).addTo(map);
    pontosCerca = [];
    modoEdicaoCerca = false;
    alert("Cerca finalizada!");
  }
});




