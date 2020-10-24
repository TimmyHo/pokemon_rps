import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../../axios';

import classes from './PokedexDetails.module.css';

class PokedexDetails extends Component {
    state = {
        pokedexData: null,
        error: false
    }

    componentDidMount() {
        axios.get('/pokedex/'+this.props.match.params.id)
        .then(response => {
            this.setState({pokedexData: response.data});
        })
        .catch(error => {
            this.setState({error: true});
        });
    }

    getPokedexTypeImageComponent(pokedexType) {
        return (
            <img className={classes.PokedexTypeImage} src={'https://serebii.net/pokedex-bw/type/'+pokedexType+'.gif'} alt={pokedexType}/>
        );
    }

    render() {
        let pokedexUI = null;
        if (this.state.pokedexData !== null) {
            let pokedexType1 = this.state.pokedexData.type1 ? this.getPokedexTypeImageComponent(this.state.pokedexData.type1) : null;
            let pokedexType2 = this.state.pokedexData.type2 ? this.getPokedexTypeImageComponent(this.state.pokedexData.type2) : null;

            pokedexUI = (
                <div className={classes.GridContainer}>
                    <div className={classes.PageHeader}>
                        <div className={classes.PokedexName}>
                            #{this.state.pokedexData.pokedex_id}:<br/>
                            {this.state.pokedexData.name}
                        </div>
                        <div className={classes.PokedexClassification}>
                            {this.state.pokedexData.classification}
                        </div>
                    </div>

                    <div className={classes.ImagesContainer}>
                        <img className={classes.PokedexImage} src={this.state.pokedexData.imageUrl} alt={this.state.pokedexData.name}/><br></br>
                        <br />
                        <div className={classes.Header}>Sprites</div>
                        
                        <img className={classes.SpriteImage} src={this.state.pokedexData.spriteUrl} alt="normal sprite"/>

                        <img className={classes.SpriteImage} src={this.state.pokedexData.shinySpriteUrl} alt="shiny sprite"/>

                    </div>
            
                    <div className={classes.TypeContainer}>
                        <div className={classes.Header}>Type</div>
                        { pokedexType1 } { pokedexType2}
                    </div>
                    <div className={classes.StatsContainer}>
                    <div className={classes.Header}>Stats</div>
                        <div className={classes.StatsTable}>
                            <div>HP</div><div>{this.state.pokedexData.hitPoints}</div>
                            <div>ATT</div> <div>{this.state.pokedexData.attack}</div>
                            <div>DEF</div> <div>{this.state.pokedexData.defense}</div>
                            <div>SP ATT</div> <div>{this.state.pokedexData.specialAttack}</div>
                            <div>SP DEF</div> <div>{this.state.pokedexData.specialDefense}</div>
                            <div>SPD</div><div>{this.state.pokedexData.speed}</div>
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div className={classes.PokedexPage}>
                {pokedexUI}
                <Link to="/" className={classes.PokedexListButton}>
                    Back To Pokedex
                </Link>
            </div>
        );
    }
            
    
};

export default PokedexDetails;