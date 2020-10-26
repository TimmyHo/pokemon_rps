import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';



import MainNavbar from './components/Navigation/MainNavbar';

import PokedexList from './containers/PokedexList';
import PokedexDetails from './components/Pokedex/PokedexDetails/PokedexDetails';

import TrainerList from './containers/TrainerList';
import TrainerCreate from './components/Trainer/TrainerCreate/TrainerCreate';
import TrainerLogin from './components/Trainer/TrainerLogin/TrainerLogin';
import TrainerDetails from './components/Trainer/TrainerDetails/TrainerDetails';
import TrainerEdit from './components/Trainer/TrainerEdit/TrainerEdit';

function App() {
  return (
    <div className="App">
        <MainNavbar /> 
        <div className="p-0 Content">
          <Switch>
              <Route path='/trainers/create' exact component={TrainerCreate} />
              <Route path='/trainers/login' exact component={TrainerLogin}/>
              <Route path='/trainers/:tag/edit' component={TrainerEdit} />
              <Route path='/trainers/:tag' component={TrainerDetails} />
              <Route path='/trainers' component={TrainerList} />

              <Route path='/pokedex/:id' component={PokedexDetails} />
              <Route path='/pokedex' component={PokedexList} />
              <Route path='/' exact component={PokedexList} />
          </Switch>
        </div>
    </div>
  );
}

export default App;
