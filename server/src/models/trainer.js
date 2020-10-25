const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PokemonCreature = require('./pokemonCreature');

const trainerSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    trainerTag: {
        type: String,
        unique: true,
        required: true
    },
    trainerImageUrl: {
        type: String, 
        required: true
    },
    trainerType: {
        type: String,
        enum: ['ADMIN', 'TEST', 'BOT', 'USER'],
        default: 'USER',
        required: true
    },
    pokemonCompanion: { 
        type: Schema.Types.ObjectId, 
        ref: PokemonCreature
    }
}, {
    timestamps: false
});


const Trainer = mongoose.model('Trainer', trainerSchema);

module.exports = Trainer;