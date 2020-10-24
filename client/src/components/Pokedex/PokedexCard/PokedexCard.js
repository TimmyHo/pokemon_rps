import React from 'react';

import Button from '../../UI/Button/Button';

import classes from './PokedexCard.module.css';

const PokedexCard = (props) => (
    <div className={`${classes.PokedexCard} d-flex flex-column align-items-center m-2 p-2`}>
        <div className="text-center font-weight-bold">
            #{props.pokedex_id}:<br/>
            {props.name}
        </div>

        <div>
            <img className={classes.PokedexImage} src={props.imageUrl} alt={props.name}/>
        </div>

        <Button to={"Pokedex/"+props.pokedex_id} text="Info"/>
    </div>
);

export default PokedexCard;