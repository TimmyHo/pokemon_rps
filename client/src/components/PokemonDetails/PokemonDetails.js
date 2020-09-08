import React from 'react';

// import classes from './PokemonDetails.module.css';

const pokemonDetails = (props) => {
    return (
        <div>
            <h1>{props.match.params.id} is AWESOME!!!</h1>
            <img src={"https://serebii.net/art/th/" + props.match.params.id + ".png"} alt="awesome" />
        </div>
    );
    
    // return (
    //     <div className={classes.PokemonCard}>
    //         <div className={classes.PokemonHeader}>
    //             #{props.pokedexId}: {props.pokemonName}
    //         </div>

    //         <div >
    //             <img className={classes.PokemonImage} src={props.imgUrl} alt={props.pokemonName}/>
    //         </div>
            
    //         <div>
    //             <strong>Type:</strong> {props.type1} {props.type2}
    //         </div>
    //     </div>
    // )
};

export default pokemonDetails;