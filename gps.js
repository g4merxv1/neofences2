// Ícone personalizado (vaca)
const cowIcon = L.icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/616/616408.png",
  iconSize: [40, 40],
  iconAnchor: [20, 20]
});

// Lista global de animais no mapa
window.animais = [];

// Função para adicionar animal no mapa
function adicionarAnimal(nome) {
  const pontoInicial = [-19.789 + (Math.random() * 0.01), -42.139 + (Math.random() * 0.01)];
  const marker = L.marker(pontoInicial, { icon: cowIcon }).addTo(map);
  marker.bindPopup(`🐄 ${nome}`);
  animais.push({ nome, marker });
}

// Simulação de movimento
setInterval(() => {
  animais.forEach((animal, index) => {
    const latlng = animal.marker.getLatLng();
    let novaLat = latlng.lat + (Math.random() - 0.5) * 0.001;
    let novaLng = latlng.lng + (Math.random() - 0.5) * 0.001;

    // Um animal pode ultrapassar o limite (index 0)
    if (index !== 0 && cercas.length > 0) {
      // Mantém o animal dentro da primeira cerca
      const dentro = dentroDaCerca([novaLat, novaLng], cercas[0].coordenadas);
      if (!dentro) return;
    }

    animal.marker.setLatLng([novaLat, novaLng]);
  });
}, 3000);

// Função para verificar se o ponto está dentro do polígono
function dentroDaCerca(ponto, cerca) {
  let [x, y] = ponto;
  let dentro = false;
  for (let i = 0, j = cerca.length - 1; i < cerca.length; j = i++) {
    let xi = cerca[i][0], yi = cerca[i][1];
    let xj = cerca[j][0], yj = cerca[j][1];
    let intersect = ((yi > y) != (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
    if (intersect) dentro = !dentro;
  }
  return dentro;
}

