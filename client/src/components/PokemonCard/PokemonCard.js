import React from 'react';
import { Link } from 'react-router-dom';

import classes from './PokemonCard.module.css';

const pokemonCard = (props) => (
    <div className={classes.PokemonCard}>
        <div className={classes.PokemonHeader}>
            #{props.pokedex_id}:<br/>
            {props.name}
        </div>

        <div>
            <img className={classes.PokemonImage} src={props.imageUrl} alt={props.name}/>
        </div>

        <Link to={"pokemon/"+props.pokedex_id} className={classes.Button}>
            INFO
        </Link>
    </div>
);

export default pokemonCard;