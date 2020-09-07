import React from 'react';
import './App.css';

import PokemonCard from './components/PokemonCard/PokemonCard';

function App() {
  return (
    <div className="App">
      <PokemonCard 
        pokemonName="Bulbasaur" 
        pokedexId="1" 
        imgUrl="https://www.serebii.net/pokemon/art/001.png" 
        type1="Grass" 
        type2="Poison" />
    </div>
  );
}

export default App;
