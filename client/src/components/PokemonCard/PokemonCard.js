import React from 'react';
import { Link } from 'react-router-dom';

import classes from './PokemonCard.module.css';

const pokemonCard = (props) => (
    <div className={classes.PokemonCard}>
        <div className={classes.PokemonHeader}>
            #{props.pokedexId}: {props.pokemonName}
        </div>

        <div>
            <img className={classes.PokemonImage} src={props.imgUrl} alt={props.pokemonName}/>
        </div>

        <div className={classes.Links}>
            <Link to={"pokemon/"+props.pokedexId}>
                <div className={classes.Button}>
                    INFO
                </div>
            </Link>
        </div>
    </div>
  
);

export default pokemonCard;