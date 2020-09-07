const mongoose = require('mongoose');

const pokemonSchema = new mongoose.Schema({
    pokedex_id : {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    type1: {
        type: String, 
        required: true
    },
    type2: {
        type: String
    },
    imageUrl: {
        type: String,
        required: true
    }
}, {
    timestamps: false
});

const Pokemon = mongoose.model('Pokemon', pokemonSchema);

module.exports = Pokemon;