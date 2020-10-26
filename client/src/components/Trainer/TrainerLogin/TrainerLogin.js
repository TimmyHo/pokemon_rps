import React, { Component } from 'react';
import axios from '../../../axios';

import Button from '../../UI/Button/Button';
import Input from '../../UI/Input/Input';

import classes from './TrainerLogin.module.css';

class TrainerLogin extends Component {
    state = {
        email: '',
        password: '',
        error: false
    }

    loginHandler = () => {
        if (this.state.email === '') {
            alert('Please input your email');
            return;
        }
        else if (this.state.password === '') {
            alert('Please input a password');
            return;
        }

        axios.post('/trainers/login', {
            email: this.state.email,
            password: this.state.password,
        })
        .then(response => {
            this.props.history.push(`/trainers/${response.data.trainer.trainerTag}`);
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
            case 'password':
                this.setState({password: event.target.value});
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
                <div className="mt-3 mx-auto h2 text-center">Trainer Login</div>
                <div className={`${classes.BoxedInfo} p-2 mx-auto`}>
                    <div className="row mt-3">   
                        <label className="col-5 text-right my-auto">
                            E-mail
                        </label>
                        <div className="col-7">
                            <Input type="text" name="email" onChange={this.handleChange} value={this.state.email}/>
                        </div> 
                    </div>
                    <div className="row mt-2">   
                        <label className="col-5 text-right my-auto">
                            Password
                        </label>
                        <div className="col-7">
                            <Input type="password" name="password" onChange={this.handleChange} value={this.state.password1}/>
                        </div> 
                    </div>
                </div>

                <div className="row mt-2">
                    <div className="mx-auto">
                        <span className="mr-1">
                            <Button className="mr-2" onClick={this.loginHandler} text="Login" />
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

export default TrainerLogin;