import React, { Component } from 'react';
import axios from '../../../axios';

class TrainerLogout extends Component {
    componentDidMount() {
        axios.post(`/trainers/logout`)
        .then(response => {
          console.log('LOGOUT RESPONSE', response);
            this.props.history.push('/');
        })
        .catch(error => {
            console.log(error);
        });
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="mt-3 mx-auto h4">Logging out...</div>
            </div>
        );  
    }
};

export default TrainerLogout;