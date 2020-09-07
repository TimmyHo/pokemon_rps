import React from 'react';


import classes from './PokemonCard.module.css';


const pokemonCard = (props) => (
    <div className={classes.PokemonCard}>
        <div className={classes.PokemonHeader}>
            #{props.pokedexId}: {props.pokemonName}
        </div>

        <div >
            <img className={classes.PokemonImage} src={props.imgUrl} alt={props.pokemonName}/>
        </div>
        
        <div>
            <strong>Type:</strong> {props.type1} {props.type2}
        </div>
    </div>
);

export default pokemonCard;