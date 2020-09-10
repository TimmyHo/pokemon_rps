import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../axios';

import classes from './TrainerDetails.module.css';

class TrainerDetails extends Component {
    state = {
        trainer: null,
        error: false
    }

    componentDidMount() {
        axios.get(`/trainers/${this.props.match.params.tag}`)
        .then(response => {
            this.setState({trainer: response.data});
        })
        .catch(error => {
            this.setState({error: true});
        });
    }

    render() {
        let trainer = null;
        if (this.state.trainer !== null) {

            trainer = (
                <div className={classes.FlexContainer}>
                   {/* <div className={classes.TrainerHeader}> */}
                       <div className={classes.TrainerTag}>{this.state.trainer.trainerTag}</div>
                       <div className={classes.TrainerTagline}>{this.state.trainer.tagline}</div>
                   {/* </div> */}
                   <div className={classes.TrainerContent}>
                       <div className={classes.PokemonImageBox}>
                       <img className={classes.PokemonImage} src="https://www.serebii.net/xy/pokemon/099.png" alt="trainer's pokemon"/>
                       </div>
                       <img className={classes.TrainerImage} src={this.state.trainer.trainerImageUrl} alt="trainer image"/>
                       <div className={classes.InfoContainer}>
                           <div>Name: {this.state.trainer.name}</div>
                           <div className={classes.TrainerInfo}>{this.state.trainer.info}</div>
                        </div>
                   </div>
                </div>
            );
        }

        return (
            <div className={classes.TrainerPage}>
                {trainer}
                <div className={classes.LinksContainer}>
                <Link className={classes.Button} >
                    EDIT
                </Link>
                <Link to="/trainers" className={classes.Button}>
                    Back To Trainers
                </Link>
                </div>
            </div>
        );
    }
            
    
};

export default TrainerDetails;