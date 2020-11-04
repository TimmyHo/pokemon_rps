import React from 'react';

// import classes from './MainNavbar.module.css';

const navbar = (props) => {
  const links = [
    !props.trainer && { label: 'Sign-Up', href: '/trainers/create' },
    !props.trainer && { label: 'Sign-In', href: '/trainers/login' },
    props.trainer && { label: 'Sign-Out', href: '/trainers/logout' },
    { label: 'Pokedex', href: '/pokedex' },
    { label: 'Trainers', href: '/trainers' },
  ]
  .filter(linkConfig => linkConfig)
  .map(({ label, href }) => {
    return (

        <a key={href} className="nav-item nav-link" href={href}>{label}</a>
      
    );
  });


    console.log('NAVBAR PROPS:', props)

    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark fixed-top">
            <a className="navbar-brand" href="/">Pokemon RPS</a>
            
            <div className="navbar-nav ml-auto">
                {links}
                {/* <a className="nav-item nav-link" href="/pokedex">Pokedex</a>
                <a className="nav-item nav-link" href="/trainers">Trainers</a> */}
            </div>
        </nav>
    );
}

export default navbar;