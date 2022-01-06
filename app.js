// DOM
const mainScreen = document.querySelector('.main-screen')
const pokeName = document.querySelector('.poke-name');
const pokeId = document.querySelector('.poke-id');
const pokeFrontImage = document.querySelector('.poke-front-image');
const pokeBackImage = document.querySelector('.poke-back-image');
const pokeTypeOne = document.querySelector('.poke-type-one');
const pokeTypeTwo = document.querySelector('.poke-type-two');
const pokeWeight = document.querySelector('.poke-weight');
const pokeHeight = document.querySelector('.poke-height');
const pokeListItems = document.querySelectorAll('.list-item');
const prevButton = document.querySelector('.left-button');
const nextButton = document.querySelector('.right-button');

//CONSTANTS & VARIABLES
const apiLeftSideURL = 'https://pokeapi.co/api/v2/pokemon/';
const apiRightSideURL = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=20';
let prevURL = null;
let nextURL = null;

//FUNCTIONS
const resetType = () => {
  mainScreen.classList.remove('hide');
  mainScreen.classList.remove('normal');
  mainScreen.classList.remove('fighting');
  mainScreen.classList.remove('flying');
  mainScreen.classList.remove('poison');
  mainScreen.classList.remove('ground');
  mainScreen.classList.remove('rock');
  mainScreen.classList.remove('bug');
  mainScreen.classList.remove('ghost');
  mainScreen.classList.remove('steel');
  mainScreen.classList.remove('fire');
  mainScreen.classList.remove('water');
  mainScreen.classList.remove('grass');
  mainScreen.classList.remove('electric');
  mainScreen.classList.remove('psychic');
  mainScreen.classList.remove('ice');
  mainScreen.classList.remove('dragon');
  mainScreen.classList.remove('dark');
  mainScreen.classList.remove('fairy');
}

const handleListItemClick =  event => {
  if(!event.target) return;

  const listItems = event.target.textContent;
  const listItemsArray = listItems.split(' ');
  const id = listItemsArray[0];
  fetchPokeData(id);
}

const handlePrevButton = () => {
  if(prevURL) {
    fetchRightSide(prevURL);
  }
}

const handleNextButton = () => {
  if(nextURL) {
    fetchRightSide(nextURL);
  }
}

//FETCH
const fetchLeftSide = async url => { 
  const res = await fetch(url);
  const data = await res.json();
  

  const pokeTypes  = data['types'];
  pokeTypeOne.textContent = pokeTypes[0]['type']['name'];
  if(pokeTypes[1]) {
    pokeTypeTwo.textContent = pokeTypes[1]['type']['name'];
  } else {
    pokeTypeTwo.classList.add('hide');
    pokeTypeTwo.textContent = '';
  }
  resetType()
  pokeName.textContent = data['name'];
  pokeId.textContent = '#' + data['id'].toString().padStart(3, '0');
  pokeFrontImage.src = data['sprites']['front_default'];
  pokeBackImage.src = data['sprites']['back_default'];
  pokeWeight.textContent = data['weight'];
  pokeHeight.textContent = data['height'];
}

const fetchRightSide = async url => {
  const res = await fetch(url);
  const data = await res.json();

  const { previous, results, next } = data;
  prevURL = previous;
  nextURL = next;
  for(let i = 0; i < pokeListItems.length; i++) {
    const pokeListItem = pokeListItems[i];
    const resultId = results[i];
    if(resultId) {
      const { name, url} = resultId;
      const urlArray = url.split('/');
      const id = urlArray[6];
      pokeListItem.textContent = id + ' - ' + name;
    } else {
      pokeListItem = '';
    }
  }
}

const fetchPokeData = async id => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const data = await res.json();

  const pokeTypes  = data['types'];
  pokeTypeOne.textContent = pokeTypes[0]['type']['name'];
  if(pokeTypes[1]) {
    pokeTypeTwo.textContent = pokeTypes[1]['type']['name'];
  } else {
    pokeTypeTwo.classList.add('hide');
    pokeTypeTwo.textContent = '';
  }
  resetType();
  pokeName.textContent = data['name'];
  pokeId.textContent = '#' + data['id'].toString().padStart(3, '0');
  pokeFrontImage.src = data['sprites']['front_default'];
  pokeBackImage.src = data['sprites']['back_default'];
  pokeWeight.textContent = data['weight'];
  pokeHeight.textContent = data['height'];
  mainScreen.classList.add(pokeTypeOne.textContent);
}

//EVENT LISTNERS
prevButton.addEventListener('click', handlePrevButton);
nextButton.addEventListener('click', handleNextButton);
for (const pokeListItem of pokeListItems) {
  pokeListItem.addEventListener('click', handleListItemClick);
}

//INITIALIZE
fetchLeftSide(`${apiLeftSideURL}`);
fetchRightSide(`${apiRightSideURL}`);