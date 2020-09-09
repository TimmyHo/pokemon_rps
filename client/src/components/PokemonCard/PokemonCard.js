import React from 'react';
import { Link } from 'react-router-dom';

import classes from './PokemonCard.module.css';

const pokemonCard = (props) => (
    <div className={classes.PokemonCard}>
        <div className={classes.PokemonHeader}>
            #{props.pokedexId}:<br/>
            {props.pokemonName}
        </div>

        <div>
            <img className={classes.PokemonImage} src={props.imgUrl} alt={props.pokemonName}/>
        </div>

        <Link to={"pokemon/"+props.pokedexId} className={classes.Button}>
            INFO
        </Link>
    </div>
);

export default pokemonCard;