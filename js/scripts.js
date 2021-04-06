let pokemonList = [
  { name: 'Charmander', height: '0.6', types: ['fire'] },
  { name: 'Squirtle', height: '0.5', types: ['water'] },
  { name: 'Charizard', height: '1.7', types: ['flying', 'fire'] }
];

//this is the IIFE where you create the pokemonRepository
let pokemonRepository = (function () {
  function addListItem(pokemon) {
    let pokemonList = document.querySelector('.pokemon-list');
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
    let listpokemon = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('button-class');
    button.addEventListener('click', function () {
      showDetails(pokemon)
    });
    listpokemon.appendChild(button);
    pokemonList.appendChild(listpokemon);
  }

  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      // Now we add the details to the item
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (e) {
      console.error(e);
    });
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      console.log(pokemon);
    });
  }

  return {
    add: add,
    getAll: getAll,
    loadList: loadList
  };
})();

pokemonRepository.add({ name: 'Weepinbell', height: '1.0', types: ['grass', 'poison']});
console.log(pokemonRepository.getAll());

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});


