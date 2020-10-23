import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';

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
        <div className="p-0 Content">
          <Switch>
              <Route path='/trainers/create' exact component={TrainerCreate} />
              <Route path='/trainers/:tag/edit' component={TrainerEdit} />
              <Route path='/trainers/:tag' component={TrainerDetails} />
              <Route path='/trainers' component={TrainerList} />

              <Route path='/pokemon/:id' component={PokemonDetails} />
              
              <Route path='/pokemon' component={PokemonList} />
              <Route path='/' exact component={PokemonList} />
          </Switch>
        </div>
    </div>
  );
}

export default App;
