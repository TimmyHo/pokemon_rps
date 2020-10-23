import React from 'react';
import { Link } from 'react-router-dom';
import classes from './Button.module.css';

const button = (props) => {
    let buttonDiv = '';
    if (props.to) {
      buttonDiv = (
        <Link {...props} className={classes.Button}>
          {props.text}
        </Link>
      );
    } else {
      buttonDiv = (
        <button {...props} onclick={props.onClick} className={classes.Button}>
          {props.text}
        </button>
      )
    }

    return buttonDiv;
}

export default button;