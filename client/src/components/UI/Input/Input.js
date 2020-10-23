import React from 'react';

import classes from './Input.module.css';

const input = (props) => {
    return (
      <input {...props} className={`${classes.Input} p-1`} />
    );
}

export default input;