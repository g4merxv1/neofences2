let map, drawnItems, drawControl;
let mostrarCercas = true;

window.onload = function() {
  map = L.map("map").setView([-19.9, -43.9], 13);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19
  }).addTo(map);

  drawnItems = new L.FeatureGroup();
  map.addLayer(drawnItems);

  drawControl = new L.Control.Draw({
    draw: {
      polygon: false,
      rectangle: false,
      circle: false,
      circlemarker: false,
      marker: false,
      polyline: { shapeOptions: { color: "yellow" } }
    },
    edit: {
      featureGroup: drawnItems
    }
  });
  map.addControl(drawControl);

  map.on(L.Draw.Event.CREATED, function(event) {
    let layer = event.layer;
    drawnItems.addLayer(layer);
  });
};

function visualizarMapa() {
  map.removeControl(drawControl);
}

function editarArea() {
  map.addControl(drawControl);
}

function editarAnimais() {
  let lat = prompt("Latitude do animal:");
  let lng = prompt("Longitude do animal:");
  if (lat && lng) {
    L.marker([parseFloat(lat), parseFloat(lng)]).addTo(map).bindPopup("Animal");
  }
}

function abrirConfiguracoes() {
  mostrarCercas = !mostrarCercas;
  if (mostrarCercas) {
    map.addLayer(drawnItems);
    alert("Cercas visíveis");
  } else {
    map.removeLayer(drawnItems);
    alert("Cercas ocultas");
  }
}

function ativarNotificacoes() {
  alert("🔔 Notificações ativadas (simulação)");
}


