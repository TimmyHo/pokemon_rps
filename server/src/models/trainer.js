const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
        enum: ['ADMIN', 'TEST', 'BOT', 'trainer'],
        default: 'trainer',
        required: true
    },
    pokemonCompanion: { 
        type: Schema.Types.ObjectId, 
        ref: PokemonCreature
    },
    tokens: [{
            type: String,
            required: true  
    }],
}, {
    timestamps: false, 
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.password;
            delete ret.tokens;
        }
    }
});

trainerSchema.statics.findByCredentials = async (email, password) => {
    const trainer = await Trainer.findOne({ email });

    if (!trainer) {
        throw new Error('Unable to login');
    }

    const isMatch = await bcrypt.compare(password, trainer.password);

    if (!isMatch) {
        throw new Error('Unable to login');
    }
    
    return trainer;
}

trainerSchema.methods.generateAuthToken = async function () {
    const trainer = this;
    const token = jwt.sign({ id: trainer._id.toString(), tag: trainer.trainerTag, trainerType: trainer.trainerType }, process.env.JWT_SECRET);
    
    trainer.tokens = trainer.tokens.concat(token);
    await trainer.save();
    
    return token;
}

// Hash the plain text password before saving
trainerSchema.pre('save', async function (next) {
    const trainer = this;
    
    if (trainer.isModified('password')) {
        trainer.password = await bcrypt.hash(trainer.password, 8);
    }

    next();
});

// // Delete trainer tasks when trainer is removed
// trainerSchema.pre('remove', async function (next) {
//     const trainer = this;

//     await PokemonCreature.deleteMany({ owner: trainer._id });

//     next();
// });

const Trainer = mongoose.model('Trainer', trainerSchema);

module.exports = Trainer;