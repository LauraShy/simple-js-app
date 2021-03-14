let pokemonList = [
  { name: 'Charmander', height: '0.6', types: ['fire'] },
  { name: 'Squirtle', height: '0.5', types: ['water'] },
  { name: 'Charizard', height: '1.7', types: ['flying', 'fire'] }
];

pokemonList.forEach(function(pokemon) {
  if (pokemon.height <1.3 && pokemon.height >0.6){
    document.write(pokemon.name + ", " + pokemon.height + " height, is a medium pokemon." + "<br>");
  } else if (pokemon.height <0.7){
    document.write(pokemon.name + ", " + pokemon.height + " height, is a small pokemon." + "<br>");
  } else {
    document.write(pokemon.name + ", " + pokemon.height + " height, is a large pokemon. Wow! That\'s big!" + "<br>");
  }
})
