import React, { Component } from 'react';

// import classes from './MainNavbar.module.css';


class Navbar extends Component
{


  render() {

  const links = [
    !this.props.isLoggedIn && { label: 'Create', href: '/trainers/create' },
    !this.props.isLoggedIn && { label: 'Login', href: '/trainers/login' },
    this.props.isLoggedIn && { label: 'Logout', href: '/trainers/logout' },
  ]
  .filter(linkConfig => linkConfig)
  .map(({ label, href }) => {
    return (
        <a key={href} className="nav-item nav-link" href={href}>{label}</a>
    );
  });

    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark fixed-top">
            <a className="navbar-brand" href="/">Pokemon RPS</a>
            <div className="navbar-nav">
                <a className="nav-item nav-link" href="/pokedex">Pokedex</a>
                <a className="nav-item nav-link" href="/trainers">Trainers</a> 
            </div>
            <div className="navbar-nav ml-auto">
                {links}
            </div>
        </nav>
    );
              }
}

export default Navbar;