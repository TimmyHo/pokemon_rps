import React from 'react';
import { Link } from 'react-router-dom';

import classes from './PokemonCard.module.css';

const pokemonCard = (props) => (
    <div className={`${classes.PokemonCard} d-flex flex-column align-items-center m-2 p-2`}>
        <div className="text-center font-weight-bold">
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