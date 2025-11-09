// Inicializa o mapa focado em Caratinga
window.map = L.map('map').setView([-19.789, -42.139], 14);

L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Grupo de elementos desenhados
const drawnItems = new L.FeatureGroup();
map.addLayer(drawnItems);

// Controle de desenho (somente polígonos)
const drawControl = new L.Control.Draw({
  draw: {
    polygon: {
      shapeOptions: {
        color: '#ffcc00',
        fillColor: '#fff300',
        fillOpacity: 0.4
      },
      allowIntersection: false,
      showArea: true
    },
    marker: false,
    polyline: false,
    circle: false,
    rectangle: false,
    circlemarker: false
  },
  edit: {
    featureGroup: drawnItems
  }
});
map.addControl(drawControl);

// Armazena cercas
window.cercas = [];

map.on(L.Draw.Event.CREATED, function (event) {
  const layer = event.layer;
  const nome = prompt("Digite um nome para esta cerca:");

  if (nome && nome.trim() !== "") {
    drawnItems.addLayer(layer);
    const coordenadas = layer.getLatLngs()[0].map(p => [p.lat, p.lng]);
    cercas.push({ nome, coordenadas });

    // Rótulo
    const centro = layer.getBounds().getCenter();
    const label = L.divIcon({ className: 'polygon-label', html: nome });
    L.marker(centro, { icon: label, interactive: false }).addTo(map);

    alert(`✅ Cerca "${nome}" criada com sucesso!`);
  }
});
