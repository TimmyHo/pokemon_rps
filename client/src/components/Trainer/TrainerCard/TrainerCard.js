import React from 'react';
import { Link } from 'react-router-dom';

import Button from '../../UI/Button/Button';

import classes from './TrainerCard.module.css';

const trainerCard = (props) => (
    <div className={`${classes.TrainerCard} m-2 p-2 d-flex flex-row`}>
        <img className={classes.TrainerImage} src={props.trainerImageUrl} alt={props.trainerTag}/>
        <div className="ml-4 mr-auto">
            {props.trainerTag}
            <img className={`${classes.PokemonImage}`} src={props.pokemonImageUrl} alt={props.trainerTag}/>
        </div>

        <div className="d-flex flex-column justify-content-between">
            <Button to={`/trainers/${props.trainerTag}`} text="View" />
            <Button to={`/trainers/${props.trainerTag}/edit`} text="Edit" />
            <Button onClick={() => props.delete(props.trainerTag)} text="Delete" />
        </div>
    </div>
);

export default trainerCard;