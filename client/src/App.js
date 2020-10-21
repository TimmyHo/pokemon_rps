import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';


import Container from 'react-bootstrap/Container';

import PokemonDetails from './components/Pokemon/PokemonDetails/PokemonDetails';
import PokemonList from './containers/PokemonList';

import TrainerDetails from './components/Trainer/TrainerDetails/TrainerDetails';
import TrainerEdit from './components/Trainer/TrainerEdit/TrainerEdit';
import TrainerCreate from './components/Trainer/TrainerCreate/TrainerCreate';
import TrainerList from './containers/TrainerList';
import MainNavbar from './components/Navigation/MainNavbar';

function App() {
  return (
    <div className="App">
        <MainNavbar /> 
        <Container fluid className="p-0">
          <PokemonList /> 
        </Container>
        {/* <div className="container-fluid">
          <Switch>
              <Route path='/trainers/create' exact component={TrainerCreate} />
              <Route path='/trainers/:tag/edit' component={TrainerEdit} />
              <Route path='/trainers/:tag' component={TrainerDetails} />
              <Route path='/trainers' component={TrainerList} />

              <Route path='/pokemon/:id' component={PokemonDetails} />
              
              <Route path='/pokemon' component={PokemonList} />
              <Route path='/' exact component={PokemonList} />
          </Switch>
        </div> */}
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
