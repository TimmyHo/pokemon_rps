import React, { Component } from 'react';
import axios from '../../../axios';

import Button from '../../UI/Button/Button';
import Input from '../../UI/Input/Input';

import classes from './TrainerCreate.module.css';

class TrainerCreate extends Component {
    maleTrainerSprite = '/img/sprites/male_trainer.png';
    femaleTrainerSprite = '/img/sprites/female_trainer.png';
    starterPokemonIdList = [1,4,7,25]

    state = {
        email: '',
        password1: '',
        password2: '',
        imageUrl: this.maleTrainerSprite,
        tag: '',
        chosenPokemonId: 1,
        error: false
    }

    createTrainerHandler = () => {
        if (this.state.email === '') {
            alert('Please input your email');
            return;
        }
        else if (this.state.password1 === '' || this.state.password2 === '') {
            alert('Please input a password');
            return;
        }
        else if (this.state.tag === '') {
            alert('Please choose your trainer tag');
            return;
        }
        if (this.state.password1 !== this.state.password2) {
            alert('Your passwords do not match!');
            return;
        }

        axios.post('/trainers', {
            email: this.state.email,
            password: this.state.password1,
            imageUrl: this.state.imageUrl,
            tag: this.state.tag,
            pokemonId: this.state.chosenPokemonId
        })
        .then(response => {
            
            this.props.updateAuthHandler(true);
            this.props.history.push(`/trainers/${response.data.trainerTag}`);
        })
        .catch(error => {
            alert(error.response.data.message);
            this.setState({error: true});
        });
    }

    handleChange = (event) => {
        switch (event.target.name) {
            case 'email':
                this.setState({email: event.target.value});
                break;
            case 'password1':
                this.setState({password1: event.target.value});
                break;
            case 'password2':
                this.setState({password2: event.target.value});
                break;
            case 'imageUrl':
                this.setState({imageUrl: event.target.value});
                break;
            case 'tag':
                this.setState({tag: event.target.value});
                break;
            case 'chosenPokemonId':
                this.setState({chosenPokemonId: Number(event.target.value)});
                break;
            default:
                break;
        }
    }

    // componentDidMount() {
    //      axios.get(`/trainers/${this.props.match.params.tag}`)
    //      .then(response => {
    //          this.setState({trainer: response.data});
    //      })
    //      .catch(error => {
    //          this.setState({error: true});
    //      });
    // }

    render() {
        return (
            <div className="container-fluid">
                <div className="mt-3 mx-auto h2 text-center">Create Trainer</div>
                <div className={`${classes.BoxedInfo} p-2 mx-auto`}>
                    <div className="h4 text-center font-italic"><u>Account Info</u></div>
                    <div className="row mt-3">   
                        <label className="col-3 text-right my-auto">
                            E-mail
                        </label>
                        <div className="col-9">
                            <Input type="text" name="email" onChange={this.handleChange} value={this.state.email}/>
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
                            <Input type="text" name="tag" onChange={this.handleChange} value={this.state.tag}/>
                        </div> 
                    </div>

                    <div className="mt-2 h6 text-center font-italic">Choose Your Pokemon</div>
                    <div className="row mt-2"> 
                        <div className="mx-auto">
                            {this.starterPokemonIdList.map(pokemonId => (
                                <label className={`${classes.SpriteOption} m-1`} key={pokemonId}>
                                    <input 
                                        type="radio" 
                                        name="chosenPokemonId" 
                                        value={pokemonId} 
                                        checked={this.state.chosenPokemonId === pokemonId} 
                                        onChange={this.handleChange}/>
                                    <img className={classes.Sprite} src={`https://www.serebii.net/xy/pokemon/${String(pokemonId).padStart(3, '0')}.png`} alt={`Pokemon #${pokemonId}`}/>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>  
                <div className="row mt-2">
                    <div className="mx-auto">
                        <span className="mr-1">
                            <Button className="mr-2" onClick={this.createTrainerHandler} text="Create" />
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

export default TrainerCreate;