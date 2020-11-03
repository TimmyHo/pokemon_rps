const express = require('express');
const cors = require('cors');
const cookieSession = require('cookie-session');

const db = require('./db/db');
const requireAuth = require('./middleware/requireAuth');
const currentTrainer = require('./middleware/currentTrainer');

const PokedexData = require('./models/pokedexData');
const PokemonCreature = require('./models/pokemonCreature');
const Trainer = require('./models/trainer');


const app = express();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json()); // support json encoded bodies

app.use(
    cookieSession({
      signed: false,
      // secure: process.env.NODE_ENV !== 'test'
    })
  );

app.get('/', (req, res) => {
    res.send({
        title: 'Pokemon RPS'
    });
});

app.get('/pokedex', currentTrainer, async (req, res) => {
    const allPokedexData = await PokedexData.find({}, {
        pokedex_id: 1,
        name: 1,
        type1: 1,
        type2: 1,
        imageUrl: 1
    });
    
    res.send(allPokedexData);
});

app.get('/pokedex/:id', currentTrainer, async (req, res) => {
    const pokedexData = await PokedexData.findOne({ 
        pokedex_id: parseInt(req.params.id) 
    });

    res.send(pokedexData);
});

app.get('/trainers', currentTrainer, async (req, res) => {
    const allTrainers = await Trainer.find({
    }).populate({
        path: 'pokemonCompanion',
        populate: {
            path: 'pokedex'
        }
    });
    
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
            
        req.session = {
            jwt: token
        }

        res.status(201).send(trainer);
    } catch(e) {
        console.log(`Error: ${e}`);
        if (e.code === 11000) {
            return res.status(422).send({
                message: 'email/trainer tag is already taken'
            });
        }
    }
});

app.get('/trainers/:tag', currentTrainer, async (req, res) => {
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
            password: req.body.password,
            trainerImageUrl: req.body.imageUrl
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

        req.session = {
            jwt: token
        }

        console.log(token);
        res.send(trainer);
    } catch (e) {
        console.log(e);
        res.status(400).send(e);
    }
});

app.post('/trainers/logout', currentTrainer, requireAuth, async (req, res) => {
    try {
        req.trainer.tokens = req.trainer.tokens.filter((token) => jwt in req.session && token.token !== req.session.jwt);
        await req.trainer.save();

        req.session = null;

        res.send();
    } catch (e) {
        res.status(500).send();
    }
});

app.post('/trainers/logoutAll', currentTrainer, requireAuth, async (req, res) => {
    try {
        req.trainer.tokens = [];

        await req.trainer.save();
        req.session = null;

        res.send();
    } catch (e) {
        res.status(500).send();
    }
});

app.listen(port,  () => {
    console.log('Server is up on port '+port);
});