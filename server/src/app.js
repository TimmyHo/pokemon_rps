const express = require('express');
const cors = require('cors');

const db = require('./db/db');
const Pokemon = require('./models/pokemon');
const Trainer = require('./models/trainer');

const app = express();

const port = process.env.PORT || 5000;


app.use(cors());

app.get('/', (req, res) => {
    res.send({
        title: 'Pokemon RPS'
    });
});

app.get('/pokemon', async (req, res) => {
    const allPokemon = await Pokemon.find({}, {
        pokedex_id: 1,
        name: 1,
        type1: 1,
        type2: 1,
        imageUrl: 1
    });
    
    res.send(allPokemon);
});

app.get('/pokemon/:id', async (req, res) => {
    const pokemon = await Pokemon.findOne({ 
        pokedex_id: parseInt(req.params.id) 
    });

    res.send(pokemon);
});

app.get('/trainers', async (req, res) => {
    const allTrainers = await Trainer.find({});
    
    res.send(allTrainers);
});

app.get('/trainers/:tag', async (req, res) => {
    const trainer = await Trainer.findOne({
        trainerTag: req.params.tag 
    });
    
    res.send(trainer);
});

app.delete('/trainers/:tag', async (req, res) => {
    await Trainer.deleteOne({
        trainerTag: req.params.tag 
    });
    
    res.send({message: 'Deleted '+req.params.tag});
});

app.listen(port,  () => {
    console.log('Server is up on port '+port);
});