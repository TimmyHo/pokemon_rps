import React from 'react';
// import { NavLink } from 'react-router-dom';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import classes from './MainNavbar.module.css';

const navbar = () => {
    return (
        <Navbar bg="danger" variant="dark" sticky="top">
        <Navbar.Brand className="my-auto" href="/">Pokemon RPS</Navbar.Brand>
        <Nav className="ml-auto">
          <Nav.Link href="/pokemon">Pokedex</Nav.Link>
          <Nav.Link href="/trainers">Trainers</Nav.Link>
        </Nav>
      </Navbar>
    );
    
    // return (
    //     <div className={classes.Navbar}>
    //         <div className={classes.NavigationItem}>
    //             <NavLink exact activeClassName={classes.active} to='/'>Pokemon</NavLink>
    //         </div>
    //         <div className={classes.NavigationItem}>
    //             <NavLink activeClassName={classes.active}  to='/trainers'>Trainers</NavLink>
    //         </div>  
    //     </div>
    // );
}

export default navbar;