let pokemonList = [
    {
        name: 'Charmander',
        height: '0.6',
        types: ['fire']
    },
    {
        name: 'Squirtle',
        height: '0.5',
        types: ['water']
    },
    {
        name: 'Charizard',
        height: '1.7',
        types: ['flying', 'fire']
    }
];

for (let i=0; i < pokemonList.length; i++){
    if (pokemonList[i].height <1.3 && pokemonList[i].height >0.6){
      document.write(pokemonList[i].name + ", " + pokemonList[i].height + " height, is a medium pokemon." + "<br>");
    } else if (pokemonList[i].height <0.7){
      document.write(pokemonList[i].name + ", " + pokemonList[i].height + " height, is a small pokemon." + "<br>");
    } else {
      document.write(pokemonList[i].name + ", " + pokemonList[i].height + " height, is a large pokemon. Wow! That\'s big!" + "<br>");
    }
  }