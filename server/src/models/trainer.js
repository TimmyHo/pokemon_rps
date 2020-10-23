const mongoose = require('mongoose');

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
    }
}, {
    timestamps: false
});

const Trainer = mongoose.model('Trainer', trainerSchema);

module.exports = Trainer;