import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from '../axios';

import TrainerCard from '../components/trainer/TrainerCard/TrainerCard';

import classes from './TrainerList.module.css';

class App extends Component {
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
                />
            })
            .reduce((arr, el) => {
                return arr.concat(el); 
            }, []);
        }
    

    return (
      <div>
            <div className={classes.TrainerTitle}>Trainers</div>
            <Link to="/trainers/create" className={classes.CreateButton}>
                CREATE
            </Link>
            <div>
                { trainerList }
            </div>
      </div>
    );
  }
}

export default App;
