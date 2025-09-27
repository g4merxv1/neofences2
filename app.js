// === Inicialização do mapa ===
const map = L.map('map').setView([-23.55052, -46.633308], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// FeatureGroup para armazenar linhas de cercas
const drawnItems = new L.FeatureGroup().addTo(map);

// Controle Leaflet Draw
const drawControl = new L.Control.Draw({
  draw: {
    polyline: { shapeOptions: { color: 'yellow', weight:4 } },
    polygon: false, rectangle: false, circle: false, marker: false, circlemarker:false
  },
  edit: { featureGroup: drawnItems }
});

// Marcadores de animais
let animalMarkers = [];

// Painel de informações
const infoPanel = document.getElementById('infoPanel');

// === Funções dos botões ===
document.getElementById('btnView').addEventListener('click', ()=>{
  map.removeControl(drawControl);
  infoPanel.innerHTML = 'Modo Visualizar: apenas mapa.';
});

document.getElementById('btnEditArea').addEventListener('click', ()=>{
  map.addControl(drawControl);
  infoPanel.innerHTML = 'Modo Editar Área: desenhe linhas amarelas representando cercas.';
});

document.getElementById('btnEditAnimals').addEventListener('click', ()=>{
  map.removeControl(drawControl);
  infoPanel.innerHTML = 'Clique no mapa para adicionar um novo animal.';
});

map.on(L.Draw.Event.CREATED, function (e) {
  const layer = e.layer;
  drawnItems.addLayer(layer);
});

// Adicionar animais ao clicar no mapa
map.on('click', function(e){
  if(infoPanel.innerHTML.includes('novo animal')){
    const code = prompt('Digite o código do animal:');
    if(code){
      const marker = L.marker(e.latlng).addTo(map).bindPopup('Animal: ' + code);
      animalMarkers.push(marker);
    }
  }
});

// Configurações
document.getElementById('btnSettings').addEventListener('click', ()=>{
  infoPanel.innerHTML = 'Configurações: opções padrão do site.';
});

// Notificações (simulação)
document.getElementById('btnNotifications').addEventListener('click', ()=>{
  let alerts = '';
  animalMarkers.forEach(marker=>{
    drawnItems.eachLayer(line=>{
      if(!line.getBounds().contains(marker.getLatLng())){
        alerts += 'Animal '+marker.getPopup().getContent()+' ultrapassou o limite!<br>';
      }
    });
  });
  infoPanel.innerHTML = alerts || 'Nenhum alerta no momento.';
});

