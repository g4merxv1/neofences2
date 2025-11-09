// gps.js - versão de depuração
// objeto que guarda marcadores por id
let animalMarkers = {};

// função pública para atualizar/colocar animal
function atualizarLocalizacaoAnimal(id, lat, lng) {
  console.log(`[gps] atualizarLocalizacaoAnimal id=${id} lat=${lat} lng=${lng}`);
  if (!window.map) {
    console.warn('[gps] window.map NÃO definido ainda');
    return;
  }

  if (animalMarkers[id]) {
    animalMarkers[id].setLatLng([lat, lng]);
    // atualiza popup com nova posição
    animalMarkers[id].getPopup().setContent(`<b>Animal ${id}</b><br>Lat: ${lat.toFixed(6)}<br>Lng: ${lng.toFixed(6)}`);
  } else {
    const icon = L.icon({
      iconUrl: "https://cdn-icons-png.flaticon.com/512/616/616408.png",
      iconSize: [40, 40],
      iconAnchor: [20, 20],
    });
    const m = L.marker([lat, lng], { icon }).addTo(window.map);
    m.bindPopup(`<b>Animal ${id}</b><br>Lat: ${lat.toFixed(6)}<br>Lng: ${lng.toFixed(6)}`);
    animalMarkers[id] = m;
    console.log('[gps] marcador criado para id=', id);
  }
}

// Simulação: pontos próximos a Caratinga
setInterval(() => {
  // pequena variação ao redor de Caratinga
  const lat = -19.788 + (Math.random() - 0.5) * 0.01;
  const lng = -42.139 + (Math.random() - 0.5) * 0.01;
  console.log('[gps] simulando coords', lat, lng);
  atualizarLocalizacaoAnimal(1, lat, lng);
}, 3000);

// export para debugging (opcional)
window._gpsDebug = { atualizarLocalizacaoAnimal, animalMarkers };
