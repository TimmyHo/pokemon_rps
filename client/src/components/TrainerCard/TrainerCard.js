import React from 'react';
import { Link } from 'react-router-dom';

import classes from './TrainerCard.module.css';

const trainerCard = (props) => (
    <div className={classes.TrainerCard}>
        <div>
            <img src={props.trainerImageUrl} alt={props.trainerTag}/>
        </div>
        <div className={classes.TagContainer}>
            {props.trainerTag}
        </div>

        <div className={classes.ActionsContainer}>
            <Link to={"/trainers/"+props.trainerTag} className={classes.Button}>
                VIEW
            </Link>
            <Link to="/" className={classes.Button}>
                EDIT
            </Link>
            <div className={classes.Button} onClick={() => props.delete(props.trainerTag)}>
                DELETE
            </div>
        </div>
    </div>
);

export default trainerCard;