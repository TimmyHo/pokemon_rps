const express = require('express');
const cors = require('cors');

const db = require('./db/db');
const auth = require('./middleware/auth');

const PokedexData = require('./models/pokedexData');
const PokemonCreature = require('./models/pokemonCreature');
const Trainer = require('./models/trainer');


const app = express();

const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json()); // support json encoded bodies

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

        const token = await trainer.generateAuthToken();
            
        res.status(201).send({ trainer, token });
    } catch(e) {
        console.log('this is an error')
        console.log(e);
        if (e.code === 11000) {
            return res.status(422).send({
                message: 'email/trainer tag is already taken'
            });
        }
    }
});

app.get('/trainers/:tag', async (req, res) => {
    const trainer = await Trainer.findOne({
        trainerTag: req.params.tag 
    }).populate({
        path: 'pokemonCompanion',
        populate: {
            path: 'pokedex'
        }
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
    
    res.send({ message: 'Deleted '+req.params.tag});
});


app.post('/trainers/login', async (req, res) => {
    try {
        const trainer = await Trainer.findByCredentials(req.body.email, req.body.password)

        console.log(trainer);
        const token = await trainer.generateAuthToken();

        console.log(token);
        res.send({ trainer, token });
    } catch (e) {
        console.log(e);
        res.status(400).send(e);
    }
});

app.post('/trainers/logout', auth, async (req, res) => {
    try {
        req.trainer.tokens = req.trainer.tokens.filter((token) => token.token !== req.token);
        await req.trainer.save();
        res.send();
    } catch (e) {
        res.status(500).send();
    }
});

app.post('/trainers/logoutAll', auth, async (req, res) => {
    try {
        req.trainer.tokens = [];

        await req.trainer.save();
        res.send();
    } catch (e) {
        res.status(500).send();
    }
});

app.listen(port,  () => {
    console.log('Server is up on port '+port);
});