import React from 'react';
import { NavLink } from 'react-router-dom';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';


import classes from './MainNavbar.module.css';

const navbar = () => {
    return (
        <Navbar bg="primary" variant="dark" sticky="top">
        <Navbar.Brand href="#home">Navbar</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#features">Features</Nav.Link>
          <Nav.Link href="#pricing">Pricing</Nav.Link>
        </Nav>
      </Navbar>
    );
    
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