const express = require('express');
const cors = require('cors');

const db = require('./db/db');
const PokedexData = require('./models/pokedexData');
const PokemonCreature = require('./models/pokemonCreature');
const Trainer = require('./models/trainer');

const app = express();

const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json()); // support json encoded bodies
app.use(express.urlencoded({ extended: true })); // support encoded bodies

app.get('/', (req, res) => {
    res.send({
        title: 'Pokemon RPS'
    });
});

app.get('/pokedex', async (req, res) => {
    const allPokedexData = await PokedexData.find({}, {
        pokedex_id: 1,
        name: 1,
        type1: 1,
        type2: 1,
        imageUrl: 1
    });
    
    res.send(allPokedexData);
});

app.get('/pokedex/:id', async (req, res) => {
    const pokedexData = await PokedexData.findOne({ 
        pokedex_id: parseInt(req.params.id) 
    });

    res.send(pokedexData);
});

app.get('/trainers', async (req, res) => {
    const allTrainers = await Trainer.find({});
    
    res.send(allTrainers);
});

app.post('/trainers', async (req, res) => {
    const pokedexData = await PokedexData.findOne({
        pokedex_id: parseInt(req.body.pokemonId) 
    });

    const pokemonCreature = new PokemonCreature({
        pokedex: pokedexData
    });

    const trainer = new Trainer({
        email: req.body.email,
        password: req.body.password,
        trainerImageUrl: req.body.imageUrl,
        trainerTag: req.body.tag,
        pokemonCompanion: pokemonCreature
    });

    try {
        await pokemonCreature.save();
        await trainer.save();
    } catch(e) {
        console.log('this is an error')
        console.log(e);
        if (e.code === 11000) {
            return res.status(422).send({
                message: 'email/trainer tag is already taken'
            });
        }
    }

    res.send(trainer);
});

app.get('/trainers/:tag', async (req, res) => {
    const trainer = await Trainer.findOne({
        trainerTag: req.params.tag 
    });
    
    res.send(trainer);
});

app.put('/trainers/:tag', async (req, res) => {
    const trainer = await Trainer.findOneAndUpdate({
        trainerTag: req.params.tag 
    }, {
        $set: {
            trainerImageUrl: req.body.imageUrl,
            trainerTag: req.body.tag,
            name: req.body.name,
            tagline: req.body.tagline,
            info: req.body.info,
        }
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