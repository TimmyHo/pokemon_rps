import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';

import PokemonCard from './components/PokemonCard/PokemonCard';
import PokemonDetails from './components/PokemonDetails/PokemonDetails';
import PokemonList from './containers/PokemonList';

import TrainerList from './containers/TrainerList';

function App() {
  return (
    <div className="App">
          <Switch>
            <Route path='/trainers' component={TrainerList} />
            <Route path='/pokemon/:id' component={PokemonDetails} />
            <Route path='/' exact component={PokemonList} />
          </Switch>
      {/* <PokemonList /> */}
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
