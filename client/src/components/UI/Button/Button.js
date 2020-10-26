import React from 'react';
import { Link } from 'react-router-dom';
import classes from './Button.module.css';

const button = (props) => {
    let buttonDiv = '';
    let allClasses = classes.Button;

    if (props.className) {
      allClasses += ' '+props.className;
    }

    if (props.to) {
      buttonDiv = (
        <Link {...props} className={allClasses}>
          {props.text}
        </Link>
      );
    } else {
      buttonDiv = (
        <button {...props} className={allClasses}>
          {props.text}
        </button>
      )
    }

    return buttonDiv;
}

export default button;