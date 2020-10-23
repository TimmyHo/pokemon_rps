import React, { Component } from 'react';
import axios from '../../../axios';

import Button from '../../UI/Button/Button';

import classes from './TrainerCreate.module.css';

class TrainerCreate extends Component {
    
    maleTrainerSprite = '/img/sprites/male_trainer.png';
    femaleTrainerSprite = '/img/sprites/female_trainer.png';

    state = {
        email: '',
        password1: '',
        password2: '',
        imageUrl: this.maleTrainerSprite,
        tag: '',

        error: false
    }

    createTrainerHandler = () => {
        //   axios.post('/trainers', {
        //       imageUrl: this.state.imageUrl,
        //       tag: this.state.tag,
        //       tagline: this.state.tagline,
        //       name: this.state.name,
        //       info: this.state.info
        //   })
        //  .then(response => {
        //      this.props.history.push(`/trainers/${response.data.trainerTag}`);
        //  })
        //  .catch(error => {
        //      alert(error.response.data.message);
        //      this.setState({error: true});
        //  });
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

            default:
                break;
        }
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
        return (
            <div className="container-fluid d-flex flex-column w-50">
                <div className="mt-3 h2 text-center">Create Trainer</div>
                <div className={`${classes.BoxedInfo} p-2`}>
                    <div className="h4 text-center font-italic"><u>Account Info</u></div>
                    <div className="row mt-3">   
                        <label className="col-5 text-right my-auto">
                            E-mail
                        </label>
                        <div className="col-7">
                            <input className={`${classes.NativeInput}`} type="text" name="email" onChange={this.handleChange} value={this.state.email}/>
                        </div> 
                    </div>
                    <div className="row mt-2">   
                        <label className="col-5 text-right my-auto">
                            Password
                        </label>
                        <div className="col-7">
                            <input className={`${classes.NativeInput}`} type="password" name="password1" onChange={this.handleChange} value={this.state.password1}/>
                        </div> 
                    </div>
                    <div className="row mt-2 ">   
                        <label className="col-5 text-right my-auto">
                            Confirm Password
                        </label>
                        <div className="col-7">
                            <input className={`${classes.NativeInput}`} type="password" name="password2" onChange={this.handleChange} value={this.state.password2}/>
                        </div> 
                    </div>
                </div>

                <div className={`${classes.BoxedInfo} p-2 mt-4`}>
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
                            <img className={classes.TrainerSprite} src={this.maleTrainerSprite} alt="male trainer"/>
                        </label>
                        <label className={classes.SpriteOption}>
                        <input 
                                type="radio" 
                                name="imageUrl" 
                                value={this.femaleTrainerSprite} 
                                checked={this.state.imageUrl === this.femaleTrainerSprite} 
                                onChange={this.handleChange}/>
                            <img className={classes.TrainerSprite} src={this.femaleTrainerSprite} alt="female trainer"/>
                        </label>
                        </div>
                    </div>
                    <div className="row mt-2">   
                        <label className="col-5 text-right my-auto">
                            Trainer Tag
                        </label>
                        <div className="col-7">
                            <input className={`${classes.NativeInput}`} type="text" name="tag" onChange={this.handleChange} value={this.state.tag}/>
                        </div> 
                    </div>
                </div>  
                <div className="row mt-2">
                    <Button onClick={this.createTrainerHandler} text="Create" />
                    
                    <Button to="/trainers" text="Back" />
                </div>
            </div>
        );          
    }
};

export default TrainerCreate;