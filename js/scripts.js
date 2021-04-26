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
    // button.classList.add('btn');
    // button.classList.add('btn-block');
    // button.innerText = pokemon.name;

    // button.setAttribute('data-toggle', 'modal');
    // button.setAttribute('data-target', '#modal-container');

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

  /*function showModal(pokemon) {
    let modalContainer = document.querySelector('#modal-container');
    // Clear all existing modal content
    modalContainer.innerHTML = '';
    let modal = document.createElement('div');
    modal.classList.add('modal');
    // Add the new modal content
    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'Close';
    closeButtonElement.addEventListener('click', hideModal);
    let titleElement = document.createElement('h5').addClass('modal-title');
    titleElement.innerText = pokemon.name;
    let contentElement = document.createElement('p');
    contentElement.innerText = 'Pokemon Height: ' + pokemon.height;
    let pokemonImg = document.createElement("img");
    pokemonImg.classList.add('pokemon-img');
    pokemonImg.src = pokemon.imageUrl;
    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(contentElement);
    modal.appendChild(pokemonImg);
    modalContainer.appendChild(modal);
    modalContainer.classList.add('is-visible');
    window.addEventListener('keydown', (e) => {
      let modalContainer = document.querySelector('#modal-container');
      if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
        hideModal();  
      }
    });
    modalContainer.addEventListener('click', (e) => {
      // Since this is also triggered when clicking INSIDE the modal
      // We only want to close if the user clicks directly on the overlay
      let target = e.target;
      if (target === modalContainer) {
        hideModal();
      }
    }); 
  } */
  // function hideModal() {
  //   let modalContainer = document.querySelector('#modal-container');
  //   modalContainer.innerHTML = '';
  //   modalContainer.classList.remove('is-visible');
  // }

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