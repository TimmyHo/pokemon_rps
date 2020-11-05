import React, { Component } from 'react';
import axios from '../../../axios';

import Button from '../../UI/Button/Button';

import classes from './TrainerDetails.module.css';

class TrainerDetails extends Component {
    state = {
        trainer: null,
        pokedex: null,
        error: false
    }

    componentDidMount() {
        axios.get(`/trainers/${this.props.match.params.tag}`,)
        .then(response => {
            this.setState({trainer: response.data, pokedex: response.data.pokemonCompanion.pokedex});
        })
        .catch(err => {
            console.log(err);
            this.setState({error: true});
        });
    }

    render() {
        let trainer = null;
        if (this.state.trainer !== null) {
            trainer = (
                <div className={`${classes.TrainerInfoContainer} mx-auto mt-4 p-3 d-flex flex-column`}>
                    <div><span>Trainer: </span><span className="font-italic">{this.state.trainer.trainerTag}</span></div>
                    
                    <div className={`${classes.ImageContainer} d-flex flex-row`}>
                        <img className={`${classes.TrainerImage} my-auto`} src={this.state.trainer.trainerImageUrl} alt="trainer"/>
                       
                        <div className={classes.PokemonImageBox}>
                            <img className={classes.PokemonImage} src={this.state.pokedex.spriteUrl} alt="trainer's pokemon"/>
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div className={classes.TrainerPage}>
                {trainer}
                <div className="mt-3 d-flex-inline text-center">
                    <span className="mr-1">
                        <Button className="mr-2" to={`/trainers/${this.props.match.params.tag}/edit`} text="Edit" />
                    </span>
                    <span className="ml-1">
                        <Button className="mr-2" to="/trainers" text="Back" />
                    </span>
                </div>
            </div>
        );
    }
};

export default TrainerDetails;