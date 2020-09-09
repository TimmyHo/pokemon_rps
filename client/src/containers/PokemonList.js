import React, { Component } from 'react';
import axios from '../axios';

import PokemonCard from '../components/PokemonCard/PokemonCard';

import classes from './PokemonList.module.css';

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
                    {...pokemonData}
                />
            })
            .reduce((arr, el) => {
                return arr.concat(el); 
            }, []);
        }
    
        return (
            <div className={classes.PokemonBackground}>
                <div className={classes.PokemonTitle}>Pokemons</div>
                <div className={classes.PokemonList}>
                    { pokemonList }
                </div>
            </div>
        );
    }
}

export default App;
