import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../axios';

import classes from './PokemonDetails.module.css';

class PokemonDetails extends Component {
    state = {
        pokemon: null,
        error: false
    }

    componentDidMount() {
        axios.get('/pokemon/'+this.props.match.params.id)
        .then(response => {
            this.setState({pokemon: response.data});
        })
        .catch(error => {
            this.setState({error: true});
        });
    }

    getPokemonTypeImageComponent(pokemonType) {
        return (
            <img className={classes.PokemonTypeImage} src={'https://serebii.net/pokedex-bw/type/'+pokemonType+'.gif'} alt={pokemonType}/>
        );
    }

    render() {
        let pokemon = null;
        if (this.state.pokemon !== null) {
            let pokemonType1 = this.state.pokemon.type1 ? this.getPokemonTypeImageComponent(this.state.pokemon.type1) : null;
            let pokemonType2 = this.state.pokemon.type2 ? this.getPokemonTypeImageComponent(this.state.pokemon.type2) : null;

            pokemon = (
                <div className={classes.GridContainer}>
                    <div className={classes.PageHeader}>
                        <div className={classes.PokemonName}>
                            #{this.state.pokemon.pokedex_id}:<br/>
                            {this.state.pokemon.name}
                        </div>
                        <div className={classes.PokemonClassification}>
                            {this.state.pokemon.classification}
                        </div>
                    </div>

                    <div className={classes.ImagesContainer}>
                        <img className={classes.PokemonImage} src={this.state.pokemon.imageUrl} alt={this.state.pokemon.name}/><br></br>
                        <br />
                        <div className={classes.Header}>Sprites</div>
                        
                        <img className={classes.SpriteImage} src={this.state.pokemon.spriteUrl} alt="normal sprite"/>

                        <img className={classes.SpriteImage} src={this.state.pokemon.shinySpriteUrl} alt="shiny sprite"/>

                    </div>
            
                    <div className={classes.TypeContainer}>
                        <div className={classes.Header}>Type</div>
                        { pokemonType1 } { pokemonType2}
                    </div>
                    <div className={classes.StatsContainer}>
                    <div className={classes.Header}>Stats</div>
                        <div className={classes.StatsTable}>
                            <div>HP</div><div>{this.state.pokemon.hitPoints}</div>
                            <div>ATT</div> <div>{this.state.pokemon.attack}</div>
                            <div>DEF</div> <div>{this.state.pokemon.defense}</div>
                            <div>SP ATT</div> <div>{this.state.pokemon.specialAttack}</div>
                            <div>SP DEF</div> <div>{this.state.pokemon.specialDefense}</div>
                            <div>SPD</div><div>{this.state.pokemon.speed}</div>
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div className={classes.PokemonPage}>
                {pokemon}
                <Link to="/" className={classes.PokemonListButton}>
                    Back To Pokemons
                </Link>
            </div>
        );
    }
            
    
};

export default PokemonDetails;