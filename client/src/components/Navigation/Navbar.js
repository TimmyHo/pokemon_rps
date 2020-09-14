import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './Navbar.module.css';

const navbar = () => {
    return (
        <div className={classes.Navbar}>
            <div className={classes.NavigationItem}>
                <NavLink exact activeClassName={classes.active} to='/'>Pokemon</NavLink>
            </div>
            <div className={classes.NavigationItem}>
                <NavLink activeClassName={classes.active}  to='/trainers'>Trainers</NavLink>
            </div>
        </div>
    );
}

export default navbar;