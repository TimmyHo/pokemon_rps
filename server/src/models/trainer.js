const mongoose = require('mongoose');

const trainerSchema = new mongoose.Schema({
    trainerTag: {
        type: String,
        unique: true,
        required: true
    },
    trainerType: {
        type: String,
        enum: ['ADMIN', 'TEST', 'BOT', 'USER'],
        default: 'USER',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    trainerImageUrl: {
        type: String, 
        required: true
    },
    tagline: {
        type: String
    },
    info: {
        type: String
    }
}, {
    timestamps: false
});

const Trainer = mongoose.model('Trainer', trainerSchema);

module.exports = Trainer;