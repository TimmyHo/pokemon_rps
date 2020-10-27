import React, { Component } from 'react';
import axios from '../axios';

import Button from '../components/UI/Button/Button';
import TrainerCard from '../components/Trainer/TrainerCard/TrainerCard';

import classes from './TrainerList.module.css';

class TrainerList extends Component {
    state = {
        trainers: null,
        error: false
    }

    deleteTrainerHandler = (trainerTag) => {
        axios.delete('/trainers/'+trainerTag)
        .then(response => {
            let newTrainers = this.state.trainers;
            newTrainers = newTrainers.filter(newTrainer => newTrainer.trainerTag !== trainerTag);
    
            this.setState({trainers: newTrainers});
        })
        .catch(error => {
            this.setState({error: true});
        });
    }

    componentDidMount() {
        axios.get('/trainers')
        .then(response => {
            this.setState({trainers: response.data});
        })
        .catch(error => {
            this.setState({error: true});
        });
    }

    render() {
        let trainerList = null;
        
        if (this.state.trainers !== null) {
            trainerList = this.state.trainers.map((trainerData) => {
                return <TrainerCard 
                    key={trainerData.trainerTag}
                    delete={this.deleteTrainerHandler}
                    {...trainerData} 
                    pokemonImageUrl={trainerData.pokemonCompanion.pokedex.spriteUrl}
                />
            })
            .reduce((arr, el) => {
                return arr.concat(el); 
            }, []);
        }

    return (
      <div>
            <div className="h2 text-center mt-3">Trainers</div>
            <div className={classes.FloatingButtonContainer}>
            <Button to="/trainers/create" text="Create" />
            <Button to="/trainers/Login" text="Login" className="ml-2" />

            </div>
            <div>
                { trainerList }
            </div>
      </div>
    );
  }
}

export default TrainerList;
