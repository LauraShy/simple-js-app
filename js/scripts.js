let pokemonList = [
  { name: 'Charmander', height: '0.6', types: ['fire'] },
  { name: 'Squirtle', height: '0.5', types: ['water'] },
  { name: 'Charizard', height: '1.7', types: ['flying', 'fire'] }
];

//this is the IIFE where you create the pokemonRepository
let pokemonRepository = (function () {
  function addListItem(pokemon) {
    let pokemonList = document.querySelector('.pokemon-list');
    let listpokemon = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('button-class');
    listpokemon.appendChild(button);
    pokemonList.appendChild(listpokemon);
  }
  return {
    addListItem: addListItem,
    add: function(pokemon) {
      pokemonList.push(pokemon);
    },
    getAll: function() {
      return pokemonList;
    }
  };
})();

pokemonRepository.add({ name: 'Weepinbell', height: '1.0', types: ['grass', 'poison']});
console.log(pokemonRepository.getAll());

pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
});

pokemonRepository.getAll().forEach(function(pokemon){
  // add more code later
});
