// gps.js
let animalMarkers = {}; // Guardará os marcadores dos animais no mapa

// Função que recebe coordenadas de um animal e o mostra no mapa
function atualizarLocalizacaoAnimal(id, lat, lng) {
  if (animalMarkers[id]) {
    // Atualiza posição se o marcador já existir
    animalMarkers[id].setLatLng([lat, lng]);
  } else {
    // Cria novo marcador
    const icon = L.icon({
      iconUrl: "https://cdn-icons-png.flaticon.com/512/616/616408.png",
      iconSize: [40, 40],
      iconAnchor: [20, 20],
    });

    const marker = L.marker([lat, lng], { icon }).addTo(map);
    marker.bindPopup(`<b>Animal ${id}</b><br>Lat: ${lat}<br>Lng: ${lng}`);
    animalMarkers[id] = marker;
  }
}

// ======= SIMULAÇÃO DE SINAL GPS =======
setInterval(() => {
  // Gera coordenadas simuladas perto de um ponto fixo
  const lat = -19.450 + Math.random() * 0.01;
  const lng = -42.540 + Math.random() * 0.01;

  atualizarLocalizacaoAnimal(1, lat, lng);
}, 3000); // Atualiza a cada 3 segundos
