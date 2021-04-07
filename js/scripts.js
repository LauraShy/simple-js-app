let pokemonList = [];

//this is the IIFE where you create the pokemonRepository
let pokemonRepository = (function () {
  function addListItem(pokemon) {
    let pokemonList = document.querySelector('.pokemon-list');
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
    function add(pokemon) {
      pokemonList.push(pokemon);
  }

  function loadList() {
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
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
      showModal(pokemon.name, pokemon.height)
    });
  }
  
  function showModal(title, text) {
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
  
    let titleElement = document.createElement('h1');
    titleElement.innerText = title;
  
    let contentElement = document.createElement('p');
    contentElement.innerText = text;
  
    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(contentElement);
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
  } 
  
  document.querySelector('#show-modal').addEventListener('click', () => {
    showModal('Modal title', 'This is the modal content!');
  });
  
  function hideModal() {
    let modalContainer = document.querySelector('#modal-container');
    modalContainer.classList.remove('is-visible');
  } 

  return {
    add: add,
    getAll: function() {
      return pokemonList;
    },
    loadList: loadList,
    addListItem: addListItem
  }; 
})();

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});
