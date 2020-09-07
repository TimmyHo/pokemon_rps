import React from 'react';
import './App.css';

import PokemonCard from './components/PokemonCard/PokemonCard';
import PokemonList from './containers/PokemonList'

function App() {
  return (
    <div className="App">
      <PokemonList />
      {/* <PokemonCard 
        pokemonName="Bulbasaur" 
        pokedexId="1" 
        imgUrl="https://www.serebii.net/pokemon/art/001.png" 
        type1="Grass" 
        type2="Poison" /> */}
    </div>
  );
}

export default App;
