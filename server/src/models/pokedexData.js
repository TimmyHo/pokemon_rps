const mongoose = require('mongoose');

const pokedexDataSchema = new mongoose.Schema({
    pokedex_id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    classification: {
        type: String,
        required: true
    },

    hitPoints: {
        type: String,
        required: true
    },
    attack: {
        type: String,
        required: true
    },
    defense: {
        type: String,
        required: true
    },
    specialAttack: {
        type: String,
        required: true
    },
    specialDefense: {
        type: String,
        required: true
    },
    speed: {
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
    },
    spriteUrl: {
        type: String,
        required: true
    },
    shinySpriteUrl: {
        type: String,
        required: true
    }
}, {
    timestamps: false
});

const PokedexData = mongoose.model('PokedexData', pokedexDataSchema);

module.exports = PokedexData;