import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';

import { getTrainer } from './utils/auth';

import MainNavbar from './components/Navigation/MainNavbar';

import PokedexList from './containers/PokedexList';
import PokedexDetails from './components/Pokedex/PokedexDetails/PokedexDetails';

import TrainerList from './containers/TrainerList';
import TrainerCreate from './components/Trainer/TrainerCreate/TrainerCreate';
import TrainerLogin from './components/Trainer/TrainerLogin/TrainerLogin';
import TrainerLogout from './components/Trainer/TrainerLogout/TrainerLogout';
import TrainerDetails from './components/Trainer/TrainerDetails/TrainerDetails';
import TrainerEdit from './components/Trainer/TrainerEdit/TrainerEdit';

class App extends Component {
  state = {
    isLoggedIn: false,
    trainer: null
  }

  componentDidMount() {
    let trainer = getTrainer();

    this.setState({ isLoggedIn: trainer !== null, trainer: trainer });
  }

  updateAuthState = (loggedInState) => {
    let trainer = getTrainer();
    this.setState({isLoggedIn: loggedInState, trainer: trainer})
  }

  render() {
    return (
      <div className="App">
          <MainNavbar isLoggedIn={this.state.isLoggedIn} loginHandler={this.updateAuthState}/> 
          <div className="p-0 Content">
            <Switch>
                <Route path='/trainers/create' exact render={(props) => (
                  <TrainerCreate {...props} updateAuthHandler={this.updateAuthState} />)} />
                <Route path='/trainers/login' exact render={(props) => (
                  <TrainerLogin {...props} updateAuthHandler={this.updateAuthState} />)} />
                <Route path='/trainers/logout' exact render={(props) => (
                  <TrainerLogout {...props} updateAuthHandler={this.updateAuthState} />)} />

                <Route path='/trainers/:tag/edit' exact render={(props) => (
                  <TrainerEdit {...props} trainer={this.state.trainer} />)} />

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
}

export default App;
