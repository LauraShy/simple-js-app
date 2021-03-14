let pokemonList = [
  { name: 'Charmander', height: '0.6', types: ['fire'] },
  { name: 'Squirtle', height: '0.5', types: ['water'] },
  { name: 'Charizard', height: '1.7', types: ['flying', 'fire'] }
];

let pokemonRepository = (function () {
  let pokemonList = [];

  return {
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

(function () {
  pokemonList.forEach(function(pokemon) {
    if (pokemon.height <1.3 && pokemon.height >0.6){
      document.write(pokemon.name + ", " + pokemon.height + " height, is a medium pokemon." + "<br>");
    } else if (pokemon.height <0.7){
      document.write(pokemon.name + ", " + pokemon.height + " height, is a small pokemon." + "<br>");
    } else {
      document.write(pokemon.name + ", " + pokemon.height + " height, is a large pokemon. Wow! That\'s big!" + "<br>");
    }
  });
})();
