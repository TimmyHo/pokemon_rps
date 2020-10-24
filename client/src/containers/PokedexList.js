import React, { Component } from 'react';
import axios from '../axios';

import PokedexCard from '../components/Pokedex/PokedexCard/PokedexCard';

import classes from './PokedexList.module.css';

class PokedexList extends Component {
    state = {
        pokedex: null,
        error: false
    }

    componentDidMount() {
        axios.get('/pokedex')
        .then(response => {
            console.log(response.data);
            this.setState({pokedex: response.data})
        })
        .catch(error => {
            this.setState({error: true});
        });
    }

    render() {
        let pokedexList = null;
        
        if (this.state.pokedex !== null) {
            pokedexList = this.state.pokedex.map((pokedexData) => {
                return <PokedexCard
                    key={pokedexData.pokedex_id}
       
                    {...pokedexData}
                />
            })
            .reduce((arr, el) => {
                return arr.concat(el); 
            }, []);
        }
    
        return (
            <div className={classes.PokedexBackground}>
                <div className="d-inline-flex flex-wrap justify-content-around mx-auto">
                    { pokedexList }
                </div> 
            </div>
        );
    }
}

export default PokedexList;
