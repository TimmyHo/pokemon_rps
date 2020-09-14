import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';

import PokemonCard from './components/PokemonCard/PokemonCard';
import PokemonDetails from './components/PokemonDetails/PokemonDetails';
import PokemonList from './containers/PokemonList';

import TrainerDetails from './components/TrainerDetails/TrainerDetails';
import TrainerEdit from './components/TrainerEdit/TrainerEdit';
import TrainerCreate from './components/TrainerCreate/TrainerCreate';
import TrainerList from './containers/TrainerList';
import Navbar from './components/Navigation/Navbar';

function App() {
  return (
    <div className="App">
        <Navbar /> 
        <div className="Content">
          <Switch>
              <Route path='/trainers/create' exact component={TrainerCreate} />
              <Route path='/trainers/:tag/edit' component={TrainerEdit} />
              <Route path='/trainers/:tag' component={TrainerDetails} />
              <Route path='/trainers' component={TrainerList} />

              <Route path='/pokemon/:id' component={PokemonDetails} />
              <Route path='/' exact component={PokemonList} />
          </Switch>
        </div>
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
