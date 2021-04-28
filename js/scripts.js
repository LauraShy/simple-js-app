let pokemonList = [];
//this is the IIFE where you create the pokemonRepository
let pokemonRepository = (function () {
  function addListItem(pokemon) {
    let pokemonList = $('.pokemon-list');
    let listpokemon = $(
      '<li class="list-group-item list-group-item-action"></li>'
    );
    let button = $(
      '<button type="button" class="btn btn-block " data-toggle="modal" data-target="#modal-container">' +
        pokemon.name +
        '</button>'
    );
    listpokemon.append(button);
    pokemonList.append(listpokemon);
    clickPokemonButtonHandler(button, pokemon);
  }
  function add(pokemon) {
    pokemonList.push(pokemon);
  }
  function clickPokemonButtonHandler(button, pokemonObject) {
    button.on('click', function (event) {
      // TODO: clear out old modal data
      showDetails(pokemonObject);
    });
  }
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      console.log(pokemon);
      var $nameElement = $('<h5>' + pokemon.name + '</h5>');
      $('#pokemon-name').html($nameElement);
      // Render pokemon image
      $('#pokemon-image').attr('src', pokemon.imageUrl);
      // Render pokemon height
      var $heightElement = $('<p> Pokemon Height: ' + pokemon.height + '</p>');
      $('#pokemon-height').html($heightElement);
      // Render pokemon types using array
      var $typeElement = $('<p> Pokemon Type: ' + pokemon.types + '</p>');
      $('#pokemon-type').html($typeElement);
    });
  }
  function loadList() {
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        // Now we add the details to the item
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types.map(function (pokemon) {
          return pokemon.type.name;
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }
  return {
    add: add,
    getAll: function () {
      return pokemonList;
    },
    loadList: loadList,
    addListItem: addListItem,
  };
})();
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});