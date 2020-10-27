import React from 'react';

// import classes from './MainNavbar.module.css';

const navbar = () => {
    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark fixed-top">
            <a class="navbar-brand" href="#">Pokemon RPS</a>
            
            <div className="navbar-nav ml-auto">
                <a class="nav-item nav-link" href="/pokedex">Pokedex</a>
                <a class="nav-item nav-link" href="/trainers">Trainers</a>
            </div>
        </nav>
    );
}

export default navbar;