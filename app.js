const mainScreen = document.querySelector('.main-screen')
const pokeName = document.querySelector('.poke-name');
const pokeId = document.querySelector('.poke-id');
const pokeFrontImage = document.querySelector('.poke-front-image');
const pokeBackImage = document.querySelector('.poke-back-image')
const pokeTypeOne = document.querySelector('.poke-type-one')
const pokeTypeTwo = document.querySelector('.poke-type-two')
const pokeWeight = document.querySelector('.poke-weight')
const pokeHeight = document.querySelector('.poke-height')

const apiURL = 'https://pokeapi.co/api/v2/pokemon/1'

const fetchData = async url  => {
  const res = await fetch(`${apiURL}`)
  const data = await res.json()
  console.log(data)

  mainScreen.classList.remove('hide')
  pokeName.textContent = data['name']
  pokeId.textContent = data['id']
  pokeWeight.textContent = data['weight']
  pokeHeight.textContent = data['height']

  const dataTypes = data['types']
  const dataFirstType = dataTypes[0]
  const dataSecondType = dataTypes[1]
  pokeTypeOne.textContent = dataFirstType['type']['name']

  if(dataSecondType) {
    pokeTypeTwo.classList.remove('hide')
    pokeTypeTwo.textContent = dataSecondType['type']['name']
  } else {
    pokeTypeTwo.classList.add('hide')
    pokeTypeTwo.textContent = '';
  }
}
fetchData()

// fetch('https://pokeapi.co/api/v2/pokemon/1') //res => response
//   .then(res => res.json())
//   .then(data => {
//     console.log(data)
//   })



