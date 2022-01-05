// -------------------- DOM Objects -------------------- \\
const mainScreen = document.querySelector('.main-screen')
const pokeName = document.querySelector('.poke-name');
const pokeId = document.querySelector('.poke-id');
const pokeFrontImage = document.querySelector('.poke-front-image');
const pokeBackImage = document.querySelector('.poke-back-image')
const pokeTypeOne = document.querySelector('.poke-type-one')
const pokeTypeTwo = document.querySelector('.poke-type-two')
const pokeWeight = document.querySelector('.poke-weight')
const pokeHeight = document.querySelector('.poke-height')
const pokeListItems = document.querySelectorAll('.list-item')
const leftButton = document.querySelector('.left-button')
const rightButton = document.querySelector('.right-button')


// -------------------- Constants e Variables -------------------- \\
const apiLeftSideURL = 'https://pokeapi.co/api/v2/pokemon/0'
const apiRightSideURL = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=20'
const TYPES = [
  'normal', 'fighting', 'flying',
  'poison', 'ground', 'rock',
  'bug', 'ghost', 'steel',
  'fire', 'water', 'grass',
  'electric', 'psychic', 'ice',
  'dragon', 'dark', 'fairy'
];
let prevUrl = null;
let nextUrl = null; 

// -------------------- Functions -------------------- \\
const resetScreen = () => {
  mainScreen.classList.remove('hide')
  for (const type of TYPES) {
    mainScreen.classList.remove(type)
  }
}

const handleLeftButtonCLick = () => {
  if (prevUrl) {
    fetchRightSide(prevUrl)
  }
}

const handleRightButtonCLick = () => {
  if (nextUrl) {
    fetchRightSide(nextUrl); 
  }
}

const handleListItemClick = e => {
  if(!e.target) return;

  const listItem = e.target;
  if(!listItem.textContent) return;
  const id = listItem.textContent.split('.')[0];
  fetchPokeData(id)
}


// -------------------- Fetch -------------------- \\
//get data for left side of screen
const fetchLeftSide = async url  => { 
  const res = await fetch(`${apiLeftSideURL}`)
  const data = await res.json()
  resetScreen()

  const dataTypes = data['types'];
  const dataFirstType = dataTypes[0];
  const dataSecondType = dataTypes[1];
  pokeTypeOne.textContent = dataFirstType['type']['name'];
  if(dataSecondType) {
    pokeTypeTwo.classList.remove('hide');
    pokeTypeTwo.textContent = dataSecondType['type']['name'];
  } else {
    pokeTypeTwo.classList.add('hide');
    pokeTypeTwo.textContent = '';
  }
  mainScreen.classList.add(dataFirstType['type']['name']);
  pokeName.textContent = data['name'];
  pokeId.textContent = '#' + data['id'].toString().padStart(3, '0');
  pokeWeight.textContent = data['weight'];
  pokeHeight.textContent = data['height'];
  pokeFrontImage.src = data['sprites']['front_default'];
  pokeBackImage.src = data['sprites']['back_default'];
}
//get data for right side of screen
const fetchRightSide = async url => {
  const res = await fetch(url)
  const data = await res.json()

  const { results, previous, next } = data;
  prevUrl = previous;
  nextUrl = next;

  for (let i = 0; i < pokeListItems.length; i++) {
    const pokeListItem = pokeListItems[i];
    const resultData = results[i];

    if(resultData) {
      const { name, url } = resultData;
      const urlArray = url.split('/')
      const id = urlArray[urlArray.length - 2];
      pokeListItem.textContent = id + '.' + name;
    } else {
      pokeListItems.textContent = '';
    }
  }
}

const fetchPokeData = async id => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
  const data = await res.json()
  resetScreen()

  const dataTypes = data['types'];
  const dataFirstType = dataTypes[0];
  const dataSecondType = dataTypes[1];
  pokeTypeOne.textContent = dataFirstType['type']['name'];
  if(dataSecondType) {
    pokeTypeTwo.classList.remove('hide');
    pokeTypeTwo.textContent = dataSecondType['type']['name'];
  } else {
    pokeTypeTwo.classList.add('hide');
    pokeTypeTwo.textContent = '';
  }
  mainScreen.classList.add(dataFirstType['type']['name']);
  pokeName.textContent = data['name'];
  pokeId.textContent = '#' + data['id'].toString().padStart(3, '0');
  pokeWeight.textContent = data['weight'];
  pokeHeight.textContent = data['height'];
  pokeFrontImage.src = data['sprites']['front_default'];
  pokeBackImage.src = data['sprites']['back_default'];
}


// -------------------- Event Listener -------------------- \\
leftButton.addEventListener('click', handleLeftButtonCLick);
rightButton.addEventListener('click', handleRightButtonCLick);
for (const pokeListItem of pokeListItems ) {
  pokeListItem.addEventListener('click', handleListItemClick)
}


// -------------------- Initialize -------------------- \\
fetchLeftSide()
fetchRightSide('https://pokeapi.co/api/v2/pokemon?offset=0&limit=20')


