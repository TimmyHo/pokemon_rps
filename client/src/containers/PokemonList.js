import React, { Component } from 'react';
import axios from '../axios';

import PokemonCard from '../components/PokemonCard/PokemonCard'

class App extends Component {
    state = {
        pokemon: null,
        error: false
    }

    componentDidMount() {
        axios.get('/pokemon')
        .then(response => {
            this.setState({pokemon: response.data})
        })
        .catch(error => {
            this.setState({error: true});
        });
    }

    render() {
        let pokemonList = null;
        
        if (this.state.pokemon !== null) {
            pokemonList = this.state.pokemon.map((pokemonData) => {
                return <PokemonCard
                    key={pokemonData.pokedex_id}
                    pokedexId={pokemonData.pokedex_id}
                    pokemonName={pokemonData.name} 
                    type1={pokemonData.type1} 
                    type2={pokemonData.type2} 
                    imgUrl={pokemonData.imageUrl} 
                />
            })
            .reduce((arr, el) => {
                return arr.concat(el); 
            }, []);
        }
    

    return (
      <div>
          <h1>Pokemons</h1>
        { pokemonList }
      </div>
    );
  }
}

export default App;
