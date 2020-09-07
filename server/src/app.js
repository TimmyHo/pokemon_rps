const express = require('express');

const db = require('./db/db');
const Pokemon = require('./models/pokemon');

const app = express();

const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send({
        title: 'Pokemon RPS'
    });
});

app.get('/pokemon', async (req, res) => {
    const allPokemon = await Pokemon.find({});
    
    res.send({
        data: allPokemon
    });
});

app.get('/pokemon/:id', async (req, res) => {
    const pokemon = await Pokemon.find({ 
        pokedex_id: parseInt(req.params.id) 
    });

    res.send({
        data: pokemon
    });
    
});

app.listen(port,  () => {
    console.log('Server is up on port '+port);
});