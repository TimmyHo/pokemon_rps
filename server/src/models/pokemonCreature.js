const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PokedexData = require('./pokedexData');

const pokemonCreatureSchema = new mongoose.Schema({
    pokedex: { 
        type: Schema.Types.ObjectId, 
        ref: PokedexData
    }
}, {
    timestamps: false
});

const PokemonCreature = mongoose.model('PokemonCreature', pokemonCreatureSchema);

module.exports = PokemonCreature;