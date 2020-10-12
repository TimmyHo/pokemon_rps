import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../../axios';

import classes from './TrainerCreate.module.css';

class TrainerCreate extends Component {
    
    maleTrainerSprite = 'https://archives.bulbagarden.net/media/upload/c/ca/Spr_FRLG_Red.png';
    femaleTrainerSprite = 'https://archives.bulbagarden.net/media/upload/2/2b/Spr_FRLG_Leaf.png';

    state = {
        imageUrl: this.maleTrainerSprite,
        tag: '',
        tagline: '',
        name: '',
        info: '',

        error: false
    }

    createTrainerHandler = () => {
         axios.post('/trainers', {
             imageUrl: this.state.imageUrl,
             tag: this.state.tag,
             tagline: this.state.tagline,
             name: this.state.name,
             info: this.state.info
         })
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
            case 'imageUrl':
                this.setState({imageUrl: event.target.value});
                break;
            case 'tag':
                this.setState({tag: event.target.value});
                break;
            case 'name':
                this.setState({name: event.target.value});
                break;
            case 'tagline':
                this.setState({tagline: event.target.value});
                break;
            case 'info':
                this.setState({info: event.target.value});
                break;
            default:
                break;
        }
      }

    componentDidMount() {
        // axios.get(`/trainers/${this.props.match.params.tag}`)
        // .then(response => {
        //     this.setState({trainer: response.data});
        // })
        // .catch(error => {
        //     this.setState({error: true});
        // });
    }

    render() {
        return (
            <div className={classes.TrainerPage}>
                <div className={classes.CreateHeader}>Create Trainer</div>

                <div className={classes.SpriteContainer}>
                    <label className={classes.SpriteOption}>
                        <input 
                            type="radio" 
                            name="imageUrl" 
                            value={this.maleTrainerSprite} 
                            checked={this.state.imageUrl === this.maleTrainerSprite} 
                            onChange={this.handleChange}/>
                        <img className={classes.TrainerSprite} src={this.maleTrainerSprite} alt='male trainer'/>
                    </label>
                    <label className={classes.SpriteOption}>
                    <input 
                            type="radio" 
                            name="imageUrl" 
                            value={this.femaleTrainerSprite} 
                            checked={this.state.imageUrl === this.femaleTrainerSprite} 
                            onChange={this.handleChange}/>
                        <img className={classes.TrainerSprite} src={this.femaleTrainerSprite} alt='female trainer'/>
                    </label>
                </div>
                 
                <div className={classes.TrainerInputContainer}>
                     
                <label>
                    Trainer Tag 
                    <span className={`${classes.Tooltip} ${classes.InfoIcon}`}>?
                        <span className={classes.TooltipText}>
                            A unique id (like a friendcode).<br/>
                            Contains only letters and numbers.
                        </span>
                    </span>
                </label>
                <input className={classes.NativeInput} type="text" name="tag" onChange={this.handleChange} value={this.state.tag}/>
           
                <label>
                    Name
                    <span className={`${classes.Tooltip} ${classes.InfoIcon}`}>?
                        <span className={classes.TooltipText}>Your name.</span>
                    </span>
                </label>
                <input className={classes.NativeInput} type="text" name="name" onChange={this.handleChange} value={this.state.name} />
                    <div className={classes.InputSpacer}/>
                <label>
                    Tagline
                    <span className={`${classes.Tooltip} ${classes.InfoIcon}`}>?
                        <span className={classes.TooltipText}>A catchy tagline.</span>
                    </span>
                </label>
                <input className={classes.NativeInput} type="text" name="tagline" onChange={this.handleChange}  value={this.state.tagline}/>
                <label>
                    Info
                    <span className={`${classes.Tooltip} ${classes.InfoIcon}`}>?
                        <span className={classes.TooltipText}>Anything you want other people to know about you.</span>
                    </span>
                </label>
                <textarea className={`${classes.NativeInput} ${classes.InputArea}`} name="info" onChange={this.handleChange}  value={this.state.info}/>
                </div>

                <div className={classes.LinksContainer}>
                    <button onClick={this.createTrainerHandler} className={`${classes.NativeButton} ${classes.Button}`}>
                        CREATE
                    </button>
                        
                    <Link to="/trainers" className={classes.Button}>
                    Back
                    </Link>
                </div>
            </div>
        );
    }
};

export default TrainerCreate;