import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';
import './App.css';

import MainNavbar from './components/Navigation/MainNavbar';

import PokedexList from './containers/PokedexList';
import PokedexDetails from './components/Pokedex/PokedexDetails/PokedexDetails';

import TrainerList from './containers/TrainerList';
import TrainerCreate from './components/Trainer/TrainerCreate/TrainerCreate';
import TrainerLogin from './components/Trainer/TrainerLogin/TrainerLogin';
import TrainerLogout from './components/Trainer/TrainerLogout/TrainerLogout';
import TrainerDetails from './components/Trainer/TrainerDetails/TrainerDetails';
import TrainerEdit from './components/Trainer/TrainerEdit/TrainerEdit';

function App() {
  console.log('COOKIES - JWT', Cookies.get('jwt'));

  const userJwt = Cookies.get('jwt');
  let trainer = null;
  if (userJwt) {
    trainer = jwt.decode(userJwt);
  }

  return (
    <div className="App">
        <MainNavbar trainer={trainer} /> 
        <div className="p-0 Content">
          <Switch>
              <Route path='/trainers/create' exact component={TrainerCreate} />
              <Route path='/trainers/login' exact component={TrainerLogin}/>
              <Route path='/trainers/logout' exact component={TrainerLogout}/>
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
