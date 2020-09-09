import React from 'react';
import { Link } from 'react-router-dom';

import classes from './TrainerCard.module.css';

const trainerCard = (props) => (
    <div className={classes.TrainerCard}>
        <div>
            <img src={props.picUrl} alt={props.trainerTag}/>
        </div>
        <div className={classes.TagContainer}>
            {props.trainerTag}
        </div>


        <div className={classes.ActionsContainer}>
            <Link to="/" className={classes.Button}>
                VIEW
            </Link>
            <Link to="/" className={classes.Button}>
                EDIT
            </Link>
            <Link to="/" className={classes.Button}>
                DELETE
            </Link>
        </div>
    </div>
);

export default trainerCard;