import React, { Component } from 'react';
import axios from '../../../axios';

import { getTrainer } from '../../../utils/auth';

import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';

import classes from './TrainerEdit.module.css';

class TrainerEdit extends Component {
    maleTrainerSprite = '/img/sprites/male_trainer.png';
    femaleTrainerSprite = '/img/sprites/female_trainer.png';

    state = {
        email: '',
        password1: '',
        password2: '',
        imageUrl: this.maleTrainerSprite,
        tag: '',
        chosenPokemonId: 1,
        error: false
    }

    editTrainerHandler = () => {
        if (this.state.password1 !== this.state.password2) {
            alert('Your passwords do not match!');
            return;
        }

        const updateValsObj = { imageUrl: this.state.imageUrl }

        if (this.state.password1 !== '') {
            updateValsObj.password = this.state.password1;
        }

        axios.put(`/trainers/${this.state.tag}`, updateValsObj)
        .then(response => {
            this.props.history.push(`/trainers/${response.data.trainerTag}`);
        })
        .catch(error => {
            alert(error.response.data.message);
            this.setState({error: true});
        });
    }

    handleChange = (event) => {
        switch (event.target.name) {
            // case 'email':
            //     this.setState({email: event.target.value});
            //     break;
            case 'password1':
                this.setState({password1: event.target.value});
                break;
            case 'password2':
                this.setState({password2: event.target.value});
                break;
            case 'imageUrl':
                this.setState({imageUrl: event.target.value});
                break;
            // case 'tag':
            //     this.setState({tag: event.target.value});
            //     break;
            // case 'chosenPokemonId':
            //     this.setState({chosenPokemonId: Number(event.target.value)});
            //     break;
            default:
                break;
        }
      }

    componentDidMount() {
        const trainer = getTrainer();

        if (this.props.match.params.tag != trainer.tag) {
            return this.props.history.push('/trainers');
        }

        axios.get(`/trainers/${this.props.match.params.tag}`)
        .then(response => {
            const trainer = response.data;
            this.setState({
                email: trainer.email,
                imageUrl: trainer.trainerImageUrl,
                tag: trainer.trainerTag,
                chosenPokemonId: Number(trainer.pokemonCompanion.pokedex.pokedex_id)
            });
        })
        .catch(error => {
            console.log(error);
            this.setState({error: true});
        });
    }

    render() {

        console.log(`STATE: ${this.state.imageUrl} with male ${this.maleTrainerSprite} and female ${this.femaleTrainerSprite}`);
        return (
            <div className="container-fluid">
                <div className="mt-3 mx-auto h2 text-center">Edit Trainer</div>
                <div className={`${classes.BoxedInfo} p-2 mx-auto`}>
                    <div className="h4 text-center font-italic"><u>Account Info</u></div>
                    <div className="row mt-3">   
                        <label className="col-3 text-right my-auto">
                            E-mail
                        </label>
                        <div className="col-9">
                            <Input type="text" name="email" disabled value={this.state.email}/>
                        </div> 
                    </div>
                    <div className="row mt-2">   
                        <label className="col-3 text-right my-auto">
                            Password
                        </label>
                        <div className="col-9">
                            <Input type="password" name="password1" onChange={this.handleChange} value={this.state.password1}/>
                        </div> 
                    </div>
                    <div className="row mt-2">   
                        <label className="col-3 text-right my-auto">
                            Confirm Password
                        </label>
                        <div className="col-9">
                            <Input type="password" name="password2" onChange={this.handleChange} value={this.state.password2}/>
                        </div> 
                    </div>
                </div>

                <div className={`${classes.BoxedInfo} p-2 mt-3 mx-auto`}>
                    <div className="h4 text-center font-italic"><u>Trainer Info</u></div>
                    <div className="row mt-2"> 
                        <div className="mx-auto">
                            <label className={classes.SpriteOption}>
                                <input 
                                    type="radio" 
                                    name="imageUrl" 
                                    value={this.maleTrainerSprite} 
                                    checked={this.state.imageUrl === this.maleTrainerSprite} 
                                    onChange={this.handleChange}/>
                                <img className={classes.Sprite} src={this.maleTrainerSprite} alt="male trainer"/>
                            </label>
                            <label className={classes.SpriteOption}>
                            <input 
                                    type="radio" 
                                    name="imageUrl" 
                                    value={this.femaleTrainerSprite} 
                                    checked={this.state.imageUrl === this.femaleTrainerSprite} 
                                    onChange={this.handleChange}/>
                                <img className={classes.Sprite} src={this.femaleTrainerSprite} alt="female trainer"/>
                            </label>
                        </div>
                    </div>
                    <div className="row mt-2">   
                        <label className="col-3 text-right my-auto">
                            Trainer Tag
                        </label>
                        <div className="col-9">
                            <Input type="text" name="tag" disabled value={this.state.tag}/>
                        </div> 
                    </div>

                    <div className="mt-2 h6 text-center font-italic">Your Pokemon</div>
                    <div className="row mt-2"> 
                        <div className="mx-auto">
                            <label className={`${classes.SpriteOption} m-1`} key={this.state.chosenPokemonId}>
                                <input 
                                    type="radio" 
                                    name="chosenPokemonId" 
                                    value={this.state.chosenPokemonId} 
                                    checked
                                    disabled
                                    onChange={this.handleChange}/>
                                <img className={classes.Sprite} src={`https://www.serebii.net/xy/pokemon/${String(this.state.chosenPokemonId).padStart(3, '0')}.png`} alt={`Pokemon #${this.state.chosenPokemonId}`}/>
                            </label>
                        </div>
                    </div>
                </div>  
                <div className="row mt-2">
                    <div className="mx-auto">
                        <span className="mr-1">
                            <Button className="mr-2" onClick={this.editTrainerHandler} text="Save" />
                        </span>
                        <span className="ml-1">
                            <Button className="mr-2" to="/trainers" text="Back" />
                        </span>
                    </div>
                </div>
            </div>
        );
    }
};

export default TrainerEdit;