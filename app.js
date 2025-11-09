// Controle das telas
const loginScreen = document.getElementById('loginScreen');
const menu = document.getElementById('menu');
const mapScreen = document.getElementById('mapScreen');
const animalScreen = document.getElementById('animalScreen');

document.getElementById('btnLogin').onclick = () => {
  menu.classList.add('hidden');
  loginScreen.classList.remove('hidden');
};

document.getElementById('btnMapa').onclick = () => {
  menu.classList.add('hidden');
  mapScreen.classList.remove('hidden');
};

document.getElementById('btnAnimais').onclick = () => {
  menu.classList.add('hidden');
  animalScreen.classList.remove('hidden');
};

document.getElementById('voltarMenu').onclick = () => {
  animalScreen.classList.add('hidden');
  menu.classList.remove('hidden');
};

document.getElementById('entrar').onclick = () => {
  loginScreen.classList.add('hidden');
  menu.classList.remove('hidden');
};

// Cadastro de animais
document.getElementById('addAnimal').onclick = () => {
  const nome = document.getElementById('nomeAnimal').value.trim();
  if (!nome) return alert("Digite o nome do animal!");
  adicionarAnimal(nome);

  const li = document.createElement('li');
  li.textContent = nome;
  document.getElementById('listaAnimais').appendChild(li);
  document.getElementById('nomeAnimal').value = "";
};







