import React from 'react';
import { Link } from 'react-router-dom';
import classes from './Button.module.css';

const button = (props) => {
    return (
      <Link to={props.to} className={classes.Button}>
        {props.text}
      </Link>
    );
}

export default button;